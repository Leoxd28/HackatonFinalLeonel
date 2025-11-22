class BaseModel {
  constructor(tableName, db) {
    this.tableName = tableName;
    this.db = db;
  }

  async findAll() {
    const [rows] = await this.db.query(`SELECT * FROM ${this.tableName}`);
    return rows;
  }

  async findById(id) {
    const [rows] = await this.db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    return rows[0];
  }

  async deleteById(id) {
    await this.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    return true;
  }
}

module.exports = BaseModel;
