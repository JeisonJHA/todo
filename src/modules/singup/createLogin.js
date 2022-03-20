const { hashSync } = require('bcryptjs');

const AppError = require('../../infra/AppError');
const findOneUser = require('../user/findUser');
const insertOneUser = require('../user/createUser');

function validateParams(login, password, userName) {
  if (!login) {
    throw new AppError('Login is required.');
  }
  if (!password) {
    throw new AppError('Password is required.');
  }
  if (!userName) {
    throw new AppError('User name is required.');
  }
}

module.exports = async (login, password, userName) => {
  validateParams(login, password, userName);
  const userExists = await findOneUser(login);
  if (userExists) {
    throw new AppError('User already exists');
  }
  await insertOneUser({ login, password: hashSync(password, 8), userName });
};
