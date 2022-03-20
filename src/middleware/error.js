const AppError = require('../infra/AppError');

module.exports = (err, _request, response) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err.message);
  console.log(err.stack);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error.' });
};
