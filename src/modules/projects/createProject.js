const AppError = require("../../infra/AppError");
const { findOneProject, insertOneProject } = require("./model")

function validateParam(projectName) {
  if (!projectName) {
    throw new AppError('Project name is required.');
  }
}

module.exports = async (projectName) => {
  validateParam(projectName);
  const projectExists = await findOneProject({ projectName });
  if (projectExists) {
    throw new AppError('There`s already a project with this name.');
  }
  await insertOneProject({ projectName });
  return findOneProject({ projectName });
}
