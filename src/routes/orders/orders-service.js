const { ObjectID } = require('mongodb');
const MerchandisesService = require('../merchandises/merchandises-service');
const paypal = require('../../utils/paypal');
const mailer = require('../../utils/mailer');

const OrdersService = db => {
  const SHIPPING_COST = 10;

  const verifyPrices = async order => {
    const verifiedOrder = JSON.parse(JSON.stringify(order));

    const merchandisesService = MerchandisesService(db);

    verifiedOrder.transaction.item_list.items.forEach(async item => {
      const merchandise = await merchandisesService.get(item.sku);
      item.price = merchandise.price;
      item.currency = 'USD';
    });

    const verifiedTotal = verifiedOrder.transaction.item_list.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    verifiedOrder.transaction.amount = {
      total: verifiedTotal + SHIPPING_COST,
      currency: 'USD',
      details: {
        subtotal: verifiedTotal,
        shipping: SHIPPING_COST
      }
    };

    return verifiedOrder;
  };

  const createOrder = async data => {
    const verifiedOrder = await verifyPrices(data);

    const paypalOrder = JSON.parse(JSON.stringify(verifiedOrder));
    paypalOrder.transaction.item_list.items.forEach(item => {
      if (item.size || item.size === '') {
        delete item.size;
      }
    });

    const { paymentId, token, paymentPageUrl } = await paypal.pay(paypalOrder.transaction);
    verifiedOrder.paymentId = paymentId;
    verifiedOrder.token = token;
    await db.collection('orders').insertOne(verifiedOrder);
    return paymentPageUrl;
  };

  const updateOrder = async (paymentID, data) => {
    const order = await db.collection('orders').findOne({ paymentId: paymentID });
    const paymentResponse = await paypal.execute(data.payerId, paymentID, order.transaction.amount);
    if (paymentResponse.state === 'approved') {
      const merchandisesService = MerchandisesService(db);
      await merchandisesService.updateStock(order.transaction.item_list.items);

      mailer.sendShippingInformation(order);
      mailer.sendPaymentConfirmation(order);

      const updatedOrder = await db
        .collection('orders')
        .findOneAndUpdate({ _id: new ObjectID(order._id) }, { status: 'paid' });

      return updatedOrder;
    }
    return null;
  };

  const deleteOrder = async query => {
    const deletedOrder = await db.collection('orders').findOneAndDelete(query);
    return deletedOrder;
  };

  return Object.freeze({
    createOrder,
    updateOrder,
    deleteOrder
  });
};

module.exports = OrdersService;
