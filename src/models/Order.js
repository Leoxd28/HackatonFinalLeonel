const BaseModel = require('./BaseModel');
const pool = require('../config/db');

class Order extends BaseModel {
  constructor() {
    super('orders', pool);
  }

  async createOrder(userId, items) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      let total = 0;
      for (const item of items) {
        const [rows] = await connection.query('SELECT price FROM products WHERE id = ?', [item.product_id]);
        if (rows.length === 0) {
          throw new Error('Producto no encontrado');
        }
        const price = rows[0].price;
        total += price * item.quantity;
      }

      const [orderResult] = await connection.query(
        'INSERT INTO orders (user_id, total, status) VALUES (?, ?, "pending")',
        [userId, total]
      );

      const orderId = orderResult.insertId;

      for (const item of items) {
        const [rows] = await connection.query('SELECT price FROM products WHERE id = ?', [item.product_id]);
        const price = rows[0].price;
        await connection.query(
          'INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, price, price * item.quantity]
        );
      }

      await connection.commit();
      return { id: orderId, user_id: userId, total, status: 'pending' };
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async findByUser(userId) {
    const [rows] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
    return rows;
  }

  async findWithItems(orderId, userId) {
    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ? AND user_id = ?', [orderId, userId]);
    if (orders.length === 0) return null;
    const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
    return { order: orders[0], items };
  }
}

module.exports = new Order();
