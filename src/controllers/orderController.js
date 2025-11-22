const { validationResult } = require('express-validator');
const Order = require('../models/Order');

async function createOrder(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.user.id;
    const { items } = req.body;

    const order = await Order.createOrder(userId, items);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

async function listMyOrders(req, res, next) {
  try {
    const userId = req.user.id;
    const orders = await Order.findByUser(userId);
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

async function getMyOrder(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const data = await Order.findWithItems(id, userId);
    if (!data) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createOrder,
  listMyOrders,
  getMyOrder
};
