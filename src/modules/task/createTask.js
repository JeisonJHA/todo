const { findOneTask, insertOneTask } = require('./model');
const AppError = require('../../infra/AppError');
const findProject = require('../projects/findProject');

module.exports = async ({ projectId, taskName, userId }) => {
  const project = await findProject({ id: projectId, userId });
  const taskExists = await findOneTask({ projectId: project.id, taskName, userId });
  if (taskExists) {
    throw new AppError('There`s already a task with this name.');
  }
  await insertOneTask({ projectId, taskName, userId });
  return findOneTask({ projectId, taskName });
};
