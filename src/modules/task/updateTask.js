const AppError = require("../../infra/AppError");
const findProject = require("../projects/findProject");
const { findOneTask, updateOneTask } = require("./model");
const taskIsDone = require("./taskIsDone");

function validateParams(taskName) {
  if (!taskName) {
    throw new AppError('Task name is required.');
  }
}

module.exports = async ({ id, taskName, projectId, userId }) => {
  if (await taskIsDone(id)) {
    throw new AppError('Task is already done.');
  }
  validateParams(taskName);
  const project = await findProject({ id: projectId, userId });
  const taskExists = await findOneTask({ taskName, projectId: project.id });
  if (taskExists) {
    throw new AppError('There`s already a task with this name.');
  }
  await updateOneTask({ id }, { taskName });
  return findOneTask({ id });
}
