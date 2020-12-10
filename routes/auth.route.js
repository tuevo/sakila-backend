const router = require('express').Router();
const httpStatus = require('http-status');
const validate = require('../middlewares/validate.mdw');
const authSchema = require('../schemas/auth.json');
const authRefreshSchema = require('../schemas/auth-refresh.json');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const globalConfig = require('../config/global.config');

router.post('/', validate(authSchema), async (req, res) => {
  const user = req.body;
  let authUser = await userModel.singleByUsername(user.username);
  if (!authUser) {
    return res.status(httpStatus.OK).json({
      data: {
        authenticated: false
      }
    });
  }

  if (!bcrypt.compare(user.password, authUser.password)) {
    return res.status(httpStatus.OK).json({
      data: {
        authenticated: false
      }
    });
  }

  authUser.accessToken = jwt.sign({
    userId: authUser.id
  }, globalConfig.JWT_SECRET_KEY, { expiresIn: globalConfig.JWT_EXPIRATION });

  delete authUser.password;

  res.status(httpStatus.OK).json({
    data: {
      authenticated: true,
      auth_user: authUser
    }
  });
});

router.post('/refresh', validate(authRefreshSchema), async (req, res) => {
  const { accessToken, refreshToken } = req.body;
  jwt.verify(
    accessToken,
    globalConfig.JWT_SECRET_KEY,
    { ignoreExpiration: true },
    async (err, payload) => {
      if (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          error_messages: [err.message]
        });
      }

      const { userId } = payload;
      const isValidRefreshToken = await userModel.isValidRefreshToken(userId, refreshToken);
      if (!isValidRefreshToken) {
        return res.status(httpStatus.BAD_REQUEST).json({
          error_messages: ['Invalid refresh token.']
        });
      }

      const newAccessToken = jwt.sign({ userId }, globalConfig.JWT_SECRET_KEY, { expiresIn: globalConfig.JWT_EXPIRATION });
      res.status(httpStatus.OK).json({
        data: {
          accessToken: newAccessToken
        }
      });
    }
  );
})

module.exports = router;