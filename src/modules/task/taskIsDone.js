const { findOneTask } = require("./model");

module.exports = async (id) => {
  const taskExists = await findOneTask({ id });
  return taskExists?.done || false;
}
