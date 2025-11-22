const app = require('./app');
const dotenv = require('dotenv');
const pool = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await pool.getConnection();
    console.log('✅ Conectado a la base de datos MySQL');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    process.exit(1);
  }
}

start();
