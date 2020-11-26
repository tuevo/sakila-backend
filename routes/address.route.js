const router = require('express').Router();
const httpStatus = require('http-status');
const addressModel = require('../models/address.model');

router.get('/', async (req, res) => {
  const addresses = await addressModel.all();
  res.status(httpStatus.OK).json({
    status_code: httpStatus.OK,
    data: {
      addresses
    }
  });
})

module.exports = router;