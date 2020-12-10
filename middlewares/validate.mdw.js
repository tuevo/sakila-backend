const ajv = require('ajv');
const httpStatus = require('http-status');
const validator = new ajv({ allErrors: true });

const dateTimeRegex = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])');
validator.addFormat('YYYY-MM-DD', {
  validate: (dateTimeString) => dateTimeRegex.test(dateTimeString)
});

module.exports = schema => (req, res, next) => {
  const fn_validate = validator.compile(schema);
  const is_valid = fn_validate(req.body);
  if (!is_valid) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status_code: httpStatus.BAD_REQUEST,
      error_messages: fn_validate.errors.map(error => `"${error.dataPath.replace('.', '')}" ${error.message}`)
    });
  }

  next();
}