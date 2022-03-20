const AppError = require('../../infra/AppError');
const { findOneProject } = require('./model');

module.exports = async ({ id, userId }) => {
  const project = await findOneProject({ id, userId });
  if (!project) {
    throw new AppError('Project doesn`t exists.');
  }
  return project;
}
