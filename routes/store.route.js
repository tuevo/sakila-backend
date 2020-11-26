const router = require('express').Router();
const httpStatus = require('http-status');
const storeModel = require('../models/store.model');

router.get('/', async (req, res) => {
  const stores = await storeModel.all();
  res.status(httpStatus.OK).json({
    status_code: httpStatus.OK,
    data: {
      stores
    }
  });
})

module.exports = router;