const router = require('express').Router();
const httpStatus = require('http-status');
const customerModel = require('../models/customer.model');

router.get('/', async (req, res) => {
  const customers = await customerModel.all();
  res.status(httpStatus.OK).json({
    data: {
      customers
    }
  });
})

module.exports = router;