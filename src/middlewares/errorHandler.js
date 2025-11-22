function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
  res.status(500).json({
    message: err.message || 'Error interno del servidor'
  });
}

module.exports = { errorHandler };
