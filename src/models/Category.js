const BaseModel = require('./BaseModel');
const pool = require('../config/db');

class Category extends BaseModel {
  constructor() {
    super('categories', pool);
  }

  async create({ name, description }) {
    const [result] = await pool.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description]
    );
    return { id: result.insertId, name, description };
  }

  async update(id, { name, description }) {
    await pool.query(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    return this.findById(id);
  }
}

module.exports = new Category();
