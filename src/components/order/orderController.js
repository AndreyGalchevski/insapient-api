const { isEmpty } = require('lodash');
const orderService = require('./orderService');

const createOrder = async (req, res) => {
  if (isEmpty(req.body) || isEmpty(req.body.transaction) || isEmpty(req.body.customerInfo)) {
    res.status(400).send('Bad Request');
  }
  const paymentPageUrl = await orderService.createOrder(req.body);
  if (!paymentPageUrl) {
    res.status(500).send({ error: 'Error creating order' });
  } else {
    res.send({ paymentPageUrl });
  }
};

const updateOrder = async (req, res) => {
  if (isEmpty(req.body)) {
    res.status(400).send('Bad Request');
  }

  const updatedOrder = await orderService.updateOrder(req.body);
  if (!updatedOrder) {
    res.status(500).send({ error: 'Error updating order' });
  } else {
    res.send({ updatedOrder });
  }
};

const deleteOrder = async (req, res) => {
  if (isEmpty(req.params)) {
    res.status(400).send('Bad Request');
  }
  const deletedOrder = await orderService.deleteOrder({ token: req.params.token });
  if (!deletedOrder) {
    res.status(500).send({ error: 'Error updating order' });
  } else {
    res.send({ deletedOrder });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder
};
