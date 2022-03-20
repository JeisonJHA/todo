const { verify } = require('jsonwebtoken');
const { findOneUser } = require('../modules/user/model');
const AppError = require('../infra/AppError');

module.exports = async (request, _response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Not authenticated.', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, process.env.TOKEN_SECRET);
    const { userId } = decoded;
    const user = await findOneUser({ id: userId });
    if (!user) throw Error();
    request.user = { userId };
    next();
  } catch (error) {
    throw new AppError('Not authenticated.', 401);
  }
};
