const AppError = require("../../infra/AppError");
const findProject = require("../projects/findProject");
const { findOneTask, updateOneTask } = require("./model");

module.exports = async ({ id, projectId, userId }) => {
  const project = await findProject({ id: projectId, userId });
  const filter = { id, projectId: project.id, userId }
  const task = await findOneTask(filter);
  if (!task) {
    throw new AppError('Task doesn`t exists.');
  }
  await updateOneTask(filter, { done: true, finishDate: new Date(Date.now()) });
  return findOneTask(filter);
}
