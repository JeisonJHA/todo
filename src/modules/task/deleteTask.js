const AppError = require("../../infra/AppError");
const { deleteOneTask } = require("./model");
const taskIsDone = require("./taskIsDone")

module.exports = async ({ id, userId }) => {
  if (await taskIsDone({ id, userId })) {
    throw new AppError('Task can`t be deleted, it`s finished.');
  }
  await deleteOneTask({ id, userId });
}
