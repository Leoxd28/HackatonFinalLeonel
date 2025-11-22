const express = require('express');
const { body } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const { authRequired, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', categoryController.listCategories);

router.post(
  '/',
  authRequired,
  adminOnly,
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio')
  ],
  categoryController.createCategory
);

router.put(
  '/:id',
  authRequired,
  adminOnly,
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio')
  ],
  categoryController.updateCategory
);

router.delete(
  '/:id',
  authRequired,
  adminOnly,
  categoryController.deleteCategory
);

module.exports = router;
