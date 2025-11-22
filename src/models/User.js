const BaseModel = require('./BaseModel');
const pool = require('../config/db');

class User extends BaseModel {
  constructor() {
    super('users', pool);
  }

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  async create(userData) {
    const { name, email, passwordHash, role } = userData;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, role || 'customer']
    );
    return { id: result.insertId, ...userData };
  }
}

module.exports = new User();
