const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const { authRequired } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authRequired,
  [
    body('items').isArray({ min: 1 }).withMessage('Debe enviar al menos un producto'),
    body('items.*.product_id').isInt().withMessage('product_id debe ser entero'),
    body('items.*.quantity').isInt({ gt: 0 }).withMessage('quantity debe ser mayor a 0')
  ],
  orderController.createOrder
);

router.get('/', authRequired, orderController.listMyOrders);
router.get('/:id', authRequired, orderController.getMyOrder);

module.exports = router;
