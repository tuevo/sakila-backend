const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const cors = require('cors');
const httpStatus = require('http-status');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/customers', require('./routes/customer.route'));
app.use('/api/addresses', require('./routes/address.route'));
app.use('/api/stores', require('./routes/store.route'));

app.use(function (req, res, next) {
  res.status(httpStatus.NOT_FOUND).send({
    error_messages: ['Endpoint not found!']
  })
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error_messags: ['Something broke!']
  });
});

app.listen(PORT, err => {
  if (err)
    throw err;

  console.log(`Sakila Backend is running at http://localhost:${PORT}`);
})