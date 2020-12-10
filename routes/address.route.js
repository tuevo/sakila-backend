const router = require('express').Router();
const httpStatus = require('http-status');
const addressModel = require('../models/address.model');
const auth = require('../middlewares/auth.mdw');

router.get('/', auth, async (req, res) => {
  const addresses = await addressModel.all();
  res.status(httpStatus.OK).json({
    status_code: httpStatus.OK,
    data: {
      addresses
    }
  });
})

module.exports = router;