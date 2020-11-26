const router = require('express').Router();
const httpStatus = require('http-status');
const customerModel = require('../models/customer.model');

router.get('/', async (req, res) => {
  const customers = await customerModel.all();
  customers.sort((a, b) => b.create_date - a.create_date);
  res.status(httpStatus.OK).json({
    status_code: httpStatus.OK,
    data: {
      customers
    }
  });
})

router.get('/:customer_id', async (req, res) => {
  const customer = await customerModel.single(req.params.customer_id);
  res.status(httpStatus.OK).json({
    status_code: httpStatus.OK,
    data: {
      customer
    }
  });
})

router.post('/', async (req, res) => {
  const newCustomerId = await customerModel.add(req.body);
  const newCustomer = await customerModel.single(newCustomerId);
  res.status(httpStatus.CREATED).json({
    status_code: httpStatus.CREATED,
    messages: ['Added customer successfully 🎉'],
    data: {
      newCustomer
    }
  })
})

router.delete('/:customer_id', async (req, res) => {
  const result = await customerModel.remove(req.params.customer_id);
  if (result === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      status_code: httpStatus.NOT_FOUND,
      error_messages: ['Customer not found.']
    });
  }

  res.status(httpStatus.OK).json({
    status_code: httpStatus.OK,
    messages: ['Removed customer successfully 🎉'],
    data: {}
  });
})

module.exports = router;