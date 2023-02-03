const jwt = require('jsonwebtoken');
const AuthError = require('../utils/AuthError');

require('dotenv').config();

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.cookies;
  if (!authorization) {
    next(new AuthError('Необходима авторизация', 401));
  }

  let payload;
  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    next(new AuthError('Необходима авторизация', 401));
  }
  req.user = payload;
  next();
};

module.exports = auth;
