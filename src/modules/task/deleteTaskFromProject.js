const AppError = require("../../infra/AppError");
const hasTaskDone = require("./hasTaskDone");
const { deleteManyTask } = require("./model");

module.exports = async ({ projectId, userId }) => {
  const hasDoneTask = await hasTaskDone({ projectId, userId });
  if (hasDoneTask) {
    throw new AppError('Can`t delete project tasks, there`s some finished task.');
  }
  await deleteManyTask({ projectId, userId });
}
