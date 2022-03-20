const AppError = require("../../infra/AppError");
const { findOneProject, insertOneProject } = require("./model")

function validateParam(projectName) {
  if (!projectName) {
    throw new AppError('Project name is required.');
  }
}

module.exports = async ({ projectName, userId }) => {
  validateParam(projectName);
  const projectExists = await findOneProject({ projectName, userId });
  if (projectExists) {
    throw new AppError('There`s already a project with this name.');
  }
  await insertOneProject({ projectName, userId });
  return findOneProject({ projectName, userId });
}
