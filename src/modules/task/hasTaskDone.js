const { findTasks } = require('./model');

module.exports = async ({ projectId, userId }) => {
  const taskDone = await findTasks({ projectId, userId, done: true });
  return taskDone.length > 0;
};
