const { isEmpty } = require('lodash');
const orderService = require('./orderService');

const createOrder = async (root, args, context, info) => {
  if (isEmpty(args.order)) {
    throw new Error('Bad Request');
  }
  const paymentPageUrl = await orderService.createOrder(args.order);
  if (!paymentPageUrl) {
    throw new Error('Error creating order');
  } else {
    return paymentPageUrl;
  }
};

const updateOrder = async (root, args, context, info) => {
  if (isEmpty(args.order)) {
    throw new Error('Bad Request');
  }
  const updatedOrder = await orderService.updateOrder(args.order);
  if (!updatedOrder) {
    throw new Error('Error updating order');
  } else {
    return updatedOrder;
  }
};

const deleteOrder = async (root, args, context, info) => {
  if (isEmpty(args)) {
    throw new Error('Bad Request');
  }
  const deletedOrder = await orderService.deleteOrder({ token: args.token });
  if (!deletedOrder) {
    throw new Error('Error deleting order');
  } else {
    return deletedOrder;
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder
};
