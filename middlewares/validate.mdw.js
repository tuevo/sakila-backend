const ajv = require('ajv');
const httpStatus = require('http-status');

module.exports = schema => (req, res, next) => {
  const validator = new ajv({ allErrors: true });
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