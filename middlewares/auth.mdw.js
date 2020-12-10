const ajv = require('ajv');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const globalConfig = require('../config/global.config');

module.exports = (req, res, next) => {
  const accessToken = req.headers['x-access-token'];
  if (!accessToken) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      messages: ['Access token not found.']
    });
  }

  jwt.verify(accessToken, globalConfig.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        error_messages: [err.message]
      });
    }

    req.authUser = payload;
    next();
  });
}