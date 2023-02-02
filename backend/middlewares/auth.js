const jwt = require('jsonwebtoken');
const AuthError = require('../utils/AuthError');

const { JWT_SECRET } = require('../app');

const auth = (req, res, next) => {
  const { authorization } = req.cookies;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходима авторизация', 401));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthError('Необходима авторизация', 401));
  }
  req.user = payload;
  next();
};

module.exports = auth;