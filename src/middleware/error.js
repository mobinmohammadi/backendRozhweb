module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || (err.name === 'ValidationError' ? 400 : err.name === 'CastError' ? 404 : 500);
  res.status(status).json({ message: err.message || 'Internal server error' });
};
