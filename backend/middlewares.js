function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    return next();
  }
  return res.status(401).json({
    message: '🙅‍♀️ - Unauthorized'
  });
};

module.exports = {
  notFound,
  errorHandler, 
  isAuth
};
