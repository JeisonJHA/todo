const AppError = require('../../infra/AppError');
const { findOneProject, updateOneProject } = require('./model');

function validateParams(projectName) {
  if (!projectName) {
    throw new AppError('Project name is required.');
  }
}

async function validateProjectExists(projectName, userId) {
  const project = await findOneProject({ projectName, userId });
  if (project) {
    throw new AppError('There`s already a project with this name.');
  }
}

async function validateProjectNameDoesNotExists(id, userId) {
  const project = await findOneProject({ id, userId });
  if (!project) {
    throw new AppError('Project doesn`t exists.');
  }
}

module.exports = async ({ id, projectName, userId }) => {
  validateParams(projectName);
  await validateProjectExists(id, userId);
  await validateProjectNameDoesNotExists(projectName, userId);

  await updateOneProject({ id }, { projectName });
  return findOneProject({ id });
};
