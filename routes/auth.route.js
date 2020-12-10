const router = require('express').Router();
const httpStatus = require('http-status');
const validate = require('../middlewares/validate.mdw');
const loginSchema = require('../schemas/login.json');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const globalConfig = require('../config/global.config');

router.post('/', validate(loginSchema), async (req, res) => {
  const user = req.body;
  let authUser = await userModel.singleByUsername(user.username);
  if (!authUser) {
    return res.status(httpStatus.OK).json({
      authenticated: false
    });
  }

  if (!bcrypt.compare(user.password, authUser.password)) {
    return res.status(httpStatus.OK).json({
      authenticated: false
    });
  }

  authUser.accessToken = jwt.sign({
    userId: authUser.id
  }, globalConfig.JWT_SECRET_KEY, { expiresIn: 60 * 5 });

  delete authUser.password;

  res.status(httpStatus.OK).json({
    data: {
      authenticated: true,
      auth_user: authUser
    }
  });
});

module.exports = router;