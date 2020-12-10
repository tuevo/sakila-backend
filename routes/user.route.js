const router = require('express').Router();
const httpStatus = require('http-status');
const validate = require('../middlewares/validate.mdw');
const userSchema = require('../schemas/user.json');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

router.post('/', validate(userSchema), async (req, res) => {
  let user = req.body;
  if (user.password !== user.confirm_password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error_messages: ['Confirm password does not match.']
    })
  }

  const isDuplicateByUsername = await userModel.isDuplicateByUsername(user.username);
  if (isDuplicateByUsername) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error_messages: ['Username in used.']
    })
  }

  delete user.confirm_password;
  const passwordHash = bcrypt.hashSync(user.password, 10);
  user.password = passwordHash;
  user.rfToken = randomstring.generate();

  const newUserId = await userModel.add(user);
  let newUser = await userModel.singleById(newUserId);
  delete newUser.password;

  res.status(httpStatus.CREATED).json({
    data: {
      user: newUser
    }
  })
})

module.exports = router;