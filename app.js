const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/customers', require('./routes/customer.route'));

app.use(function (req, res, next) {
  res.status(404).send({
    error_message: 'Endpoint not found!'
  })
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({
    error_message: 'Something broke!'
  });
});

app.listen(PORT, err => {
  if (err)
    throw err;

  console.log(`Sakila Backend is running at http://localhost:${PORT}`);
})