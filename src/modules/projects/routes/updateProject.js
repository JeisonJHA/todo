const AppError = require("../../../infra/AppError");
const { findOneProject, updateOneProject } = require("../model")

function validateParams(projectName) {
  if (!projectName) {
    throw new AppError('Project name is required.');
  }
}

module.exports = async (id, projectName) => {
  validateParams(projectName)
  const project = await findOneProject({ id });
  if (!project) {
    throw Error('Project doesn`t exists.');
  }
  await updateOneProject({ id }, { projectName });
  return findOneProject({ id });
}
