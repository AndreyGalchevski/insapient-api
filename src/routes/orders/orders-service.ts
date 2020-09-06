import { ObjectID, Db, FilterQuery } from 'mongodb';

import MerchandisesService from '../merchandises/merchandises-service';
import { Order, OrdersService } from './orders-types';
import paypal from '../../utils/paypal';
import mailer from '../../utils/mailer';

const OrdersService = (db: Db): OrdersService => {
  const SHIPPING_COST = 10;

  const verifyPrices = async (order: Order) => {
    const verifiedOrder: Order = JSON.parse(JSON.stringify(order));

    const merchandisesService = MerchandisesService(db);

    verifiedOrder.transaction.item_list.items.forEach(async (item) => {
      const merchandise = await merchandisesService.getMerchandise(item.sku);
      item.price = merchandise.price; // eslint-disable-line no-param-reassign
      item.currency = 'USD'; // eslint-disable-line no-param-reassign
    });

    const verifiedTotal = verifiedOrder.transaction.item_list.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    verifiedOrder.transaction.amount = {
      total: verifiedTotal + SHIPPING_COST,
      currency: 'USD',
      details: {
        subtotal: verifiedTotal,
        shipping: SHIPPING_COST,
      },
    };

    return verifiedOrder;
  };

  const createOrder = async (data: Order) => {
    const verifiedOrder = await verifyPrices(data);

    const paypalOrder = JSON.parse(JSON.stringify(verifiedOrder));
    paypalOrder.transaction.item_list.items.forEach((item) => {
      if (item.size || item.size === '') {
        delete item.size; // eslint-disable-line no-param-reassign
      }
    });

    const { paymentId, token, paymentPageUrl } = await paypal.pay(paypalOrder.transaction);
    verifiedOrder.paymentId = paymentId;
    verifiedOrder.token = token;
    await db.collection<Order>('orders').insertOne(verifiedOrder);
    return paymentPageUrl;
  };

  const updateOrder = async (paymentID: string, payerID: string) => {
    const order = await db.collection<Order>('orders').findOne({ paymentId: paymentID });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const paymentResponse = await paypal.execute(payerID, paymentID, order.transaction.amount);
    if (paymentResponse.state === 'approved') {
      const merchandisesService = MerchandisesService(db);
      await merchandisesService.updateStock(order.transaction.item_list.items);

      mailer.sendShippingInformation(order);
      mailer.sendPaymentConfirmation(order);

      const updatedOrder = await db
        .collection<Order>('orders')
        .findOneAndUpdate({ _id: new ObjectID(order._id) }, { $set: { status: 'paid' } });

      return updatedOrder;
    }
    return null;
  };

  const deleteOrder = async (query: FilterQuery<Order>) => {
    const deletedOrder = await db.collection<Order>('orders').findOneAndDelete(query);
    return deletedOrder;
  };

  return Object.freeze({
    createOrder,
    updateOrder,
    deleteOrder,
  });
};

export default OrdersService;
