const AppError = require("../infra/AppError");

module.exports = (err, _request, response, _) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err.message);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error.' });
}
