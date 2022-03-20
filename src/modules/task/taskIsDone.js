const { findOneTask } = require("./model");

module.exports = async ({ id, userId }) => {
  const taskExists = await findOneTask({ id, userId });
  return taskExists?.done || false;
}
