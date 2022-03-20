const createTask = require('./createTask');
const deleteTask = require('./deleteTask');
const finishTask = require('./finishTask');
const { findTasks, findOneTask } = require('./model');
const updateTask = require('./updateTask');

module.exports.list = async (request, response) => {
  const { userId } = request.user;
  const tasks = await findTasks({ userId });
  return response.send({ tasks });
};

module.exports.get = async (request, response) => {
  const { userId } = request.user;
  const { id: projectId, taskId } = request.params;
  const task = await findOneTask({ id: taskId, projectId, userId });
  return response.send({ task });
};

module.exports.post = async (request, response) => {
  const { userId } = request.user;
  const { id: projectId } = request.params;
  const { taskName } = request.body;
  const task = await createTask({ projectId, taskName, userId });
  return response.send({ task });
};

module.exports.put = async (request, response) => {
  const { userId } = request.user;
  const { id: projectId, taskId } = request.params;
  const { taskName } = request.body;
  const task = await updateTask({
    id: taskId, taskName, projectId, userId,
  });
  return response.send({ task });
};

module.exports.finish = async (request, response) => {
  const { userId } = request.user;
  const { id: projectId, taskId } = request.params;
  const task = await finishTask({ id: taskId, projectId, userId });
  return response.send({ task });
};

module.exports.delete = async (request, response) => {
  const { userId } = request.user;
  const { taskId } = request.params;
  await deleteTask({ id: taskId, userId });
  return response.status(204).send();
};
