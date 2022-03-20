const createProject = require('./createProject');
const deleteProject = require('./deleteProject');
const updateProject = require('./updateProject');
const { findProjects, findOneProject } = require('./model');

module.exports.list = async (request, response) => {
  const { userId } = request.user;
  const projects = await findProjects({ userId });
  return response.send({ projects });
};

module.exports.get = async (request, response) => {
  const { userId } = request.user;
  const { id } = request.params;
  const project = await findOneProject({ id, userId });
  return response.send({ project });
};

module.exports.post = async (request, response) => {
  const { userId } = request.user;
  const { projectName } = request.body;
  const project = await createProject({ projectName, userId });
  return response.send({ project });
};

module.exports.put = async (request, response) => {
  const { userId } = request.user;
  const { id } = request.params;
  const { projectName } = request.body;
  const project = await updateProject({ id, projectName, userId });
  return response.send({ project });
};

module.exports.delete = async (request, response) => {
  const { userId } = request.user;
  const { id } = request.params;
  await deleteProject({ id, userId });
  return response.status(204).send();
};
