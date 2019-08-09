const { cloneDeep } = require('lodash');

const OrderModel = require('./OrderModel');
const merchService = require('../merch/merchService');
const paypal = require('../../utils/paypal');
const mailer = require('../../utils/mailer');

const SHIPPING_COST = 10;

const verifyPrices = async order => {
  const verifiedOrder = cloneDeep(order);

  verifiedOrder.transaction.item_list.items.forEach(async item => {
    const merch = await merchService.getOne(item.sku);
    item.price = merch.price;
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
  try {
    const verifiedOrder = await verifyPrices(data);

    const paypalOrder = cloneDeep(verifiedOrder);
    paypalOrder.transaction.item_list.items.forEach(item => {
      if (item.size || item.size === '') {
        delete item.size;
      }
    });

    const { paymentId, token, paymentPageUrl } = await paypal.pay(paypalOrder.transaction);
    verifiedOrder.paymentId = paymentId;
    verifiedOrder.token = token;
    await OrderModel.create(verifiedOrder);
    return paymentPageUrl;
  } catch (error) {
    throw error;
  }
};

const updateOrder = async data => {
  try {
    const order = await OrderModel.findOne({ paymentId: data.paymentId }).lean();
    const paymentResponse = await paypal.execute(
      data.payerId,
      data.paymentId,
      order.transaction.amount
    );
    if (paymentResponse.state === 'approved') {
      await merchService.updateStock(order.transaction.item_list.items);

      mailer.sendShippingInformation(order);
      mailer.sendPaymentConfirmation(order);

      const updatedOrder = await OrderModel.findByIdAndUpdate(
        order._id,
        { status: 'paid' },
        { new: true }
      ).lean();

      return updatedOrder;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const deleteOrder = async filter => {
  try {
    const deletedOrder = await OrderModel.findOneAndDelete(filter);
    return deletedOrder;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder
};
