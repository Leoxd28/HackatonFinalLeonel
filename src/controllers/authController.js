const { validationResult } = require('express-validator');
const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const data = await authService.register({ name, email, password });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const data = await authService.login({ email, password });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function profile(req, res) {
  res.json({ user: req.user });
}

module.exports = {
  register,
  login,
  profile
};
