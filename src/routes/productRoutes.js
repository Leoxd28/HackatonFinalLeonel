const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const { authRequired, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);

router.post(
  '/',
  authRequired,
  adminOnly,
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
    body('stock').isInt({ min: 0 }).withMessage('El stock debe ser 0 o mayor'),
    body('category_id').isInt().withMessage('La categoría es obligatoria')
  ],
  productController.createProduct
);

router.put(
  '/:id',
  authRequired,
  adminOnly,
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
    body('stock').isInt({ min: 0 }).withMessage('El stock debe ser 0 o mayor'),
    body('category_id').isInt().withMessage('La categoría es obligatoria')
  ],
  productController.updateProduct
);

router.delete(
  '/:id',
  authRequired,
  adminOnly,
  productController.deleteProduct
);

module.exports = router;
