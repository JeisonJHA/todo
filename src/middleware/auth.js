const { verify } = require("jsonwebtoken");
const AppError = require("../infra/AppError");

module.exports = (request, _response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Not authenticated.', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, process.env.TOKEN_SECRET);
    const { sub } = decoded;
    request.user = { id: sub };
    next();
  } catch (error) {
    throw new AppError('Not authenticated.', 401);
  }
}
