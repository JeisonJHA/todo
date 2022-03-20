const { compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const AppError = require('../../infra/AppError');
const findOneUser = require('../user/findUser');

function validateParams(login, password) {
  if (!login) {
    throw new AppError('Login is required.');
  }
  if (!password) {
    throw new AppError('Password is required.');
  }
}

module.exports = async (login, password) => {
  validateParams(login, password);
  const userExists = await findOneUser(login);
  if (!userExists || !compareSync(password, userExists.password)) {
    throw new AppError('Invalid login data.', 401);
  }
  const token = sign({
    userId: userExists.id,
    userName: userExists.userName,
  }, process.env.TOKEN_SECRET, {
    expiresIn: 60000,
  });
  return token;
};
