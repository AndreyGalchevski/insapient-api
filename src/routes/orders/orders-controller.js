const { Router } = require('express');
const OrdersService = require('./orders-service');

const OrdersController = () => {
  const path = '/orders';
  const router = Router();

  const createOrder = async (req, res) => {
    if (!req.body) {
      return req.status(400).json({ error: 'Bad Request' });
    }
    const ordersService = OrdersService(req.app.locals.db);
    const paymentPageUrl = await ordersService.createOrder(req.body);
    if (!paymentPageUrl) {
      throw new Error('Error creating order');
    } else {
      return res.json({ data: paymentPageUrl });
    }
  };

  const updateOrder = async (req, res) => {
    if (!req.body) {
      return req.status(400).json({ error: 'Bad Request' });
    }
    const ordersService = OrdersService(req.app.locals.db);
    const updatedOrder = await ordersService.updateOrder(req.params.paymentID, req.body);
    if (!updatedOrder) {
      throw new Error('Error updating order');
    } else {
      return res.json({ data: updatedOrder });
    }
  };

  const deleteOrder = async (req, res) => {
    if (!req.query.token) {
      return req.status(400).json({ error: 'Bad Request' });
    }
    const ordersService = OrdersService(req.app.locals.db);
    const deletedOrder = await ordersService.deleteOrder({ token: req.params.token });
    if (!deletedOrder) {
      throw new Error('Error deleting order');
    } else {
      return res.json({ data: deletedOrder });
    }
  };

  router.post(path, createOrder);
  router.patch(`${path}/:paymentID`, updateOrder);
  router.delete(`${path}/:token`, deleteOrder);

  return Object.freeze({
    router
  });
};

module.exports = OrdersController;
