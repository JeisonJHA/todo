const AppError = require('../../infra/AppError');
const { findOneProject, deleteOneProject } = require('./model');
const deleteTaskFromProject = require('../task/deleteTaskFromProject');

module.exports = async ({ id, userId }) => {
  const project = await findOneProject({ id, userId });
  if (!project) {
    throw new AppError('Project doesn`t exists.');
  }
  await deleteTaskFromProject({ projectId: id, userId });
  await deleteOneProject({ id, userId });
};
