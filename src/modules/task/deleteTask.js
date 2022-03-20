const AppError = require("../../infra/AppError")
const taskIsDone = require("./taskIsDone")

module.exports = async ({ id, userId }) => {
  if (taskIsDone({ id, userId })) {
    throw new AppError('Task can`t be deleted, it`s finished.');
  }
  await deleteOneTask({ id, userId });
}
