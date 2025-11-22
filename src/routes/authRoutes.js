const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authRequired } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Correo inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Correo inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
  ],
  authController.login
);

router.get('/profile', authRequired, authController.profile);

module.exports = router;
