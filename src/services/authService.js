const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
  }

  async register({ name, email, password }) {
    const existing = await User.findByEmail(email);
    if (existing) {
      throw new Error('El correo ya está registrado');
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, passwordHash, role: 'customer' });
    const token = this.generateToken({ ...newUser, role: 'customer' });
    return { user: { id: newUser.id, name, email, role: 'customer' }, token };
  }

  async login({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }

    const token = this.generateToken(user);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }
}

module.exports = new AuthService();
