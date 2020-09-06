import { Router, Request, Response } from 'express';

import OrdersService from './orders-service';
import { Controller } from '../../types';

const OrdersController = (): Controller => {
  const path = '/orders';
  const router = Router();

  const createOrder = async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({ error: 'Bad Request' });
    }
    const ordersService = OrdersService(req.app.locals.db);
    const paymentPageUrl = await ordersService.createOrder(req.body);
    if (!paymentPageUrl) {
      throw new Error('Error creating order');
    } else {
      return res.json({ data: paymentPageUrl });
    }
  };

  const updateOrder = async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({ error: 'Bad Request' });
    }
    const ordersService = OrdersService(req.app.locals.db);
    const updatedOrder = await ordersService.updateOrder(req.params.paymentID, req.body.payerID);
    if (!updatedOrder) {
      throw new Error('Error updating order');
    } else {
      return res.json({ data: updatedOrder });
    }
  };

  const deleteOrder = async (req: Request, res: Response) => {
    if (!req.query.token) {
      return res.status(400).json({ error: 'Bad Request' });
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
    router,
  });
};

export default OrdersController;
