const BaseModel = require('./BaseModel');
const pool = require('../config/db');

class Product extends BaseModel {
  constructor() {
    super('products', pool);
  }

  async create({ name, description, price, stock, category_id }) {
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, stock, category_id]
    );
    return { id: result.insertId, name, description, price, stock, category_id };
  }

  async update(id, { name, description, price, stock, category_id }) {
    await pool.query(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?',
      [name, description, price, stock, category_id, id]
    );
    return this.findById(id);
  }
}

module.exports = new Product();
