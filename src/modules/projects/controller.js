const createProject = require("./createProject");
const deleteProject = require("./deleteProject");
const { findProjects, findOneProject } = require("./model");
const updateProject = require("./routes/updateProject");

module.exports.list = async (_request, response) => {
  const projects = await findProjects();
  return response.send({ projects });
}

module.exports.get = async (request, response) => {
  const { id } = request.params;
  const project = await findOneProject({ id });
  return response.send({ project });
}

module.exports.post = async (request, response) => {
  const { projectName } = request.body
  const project = await createProject(projectName)
  return response.send({ project });
}

module.exports.put = async (request, response) => {
  const { id } = request.params;
  const { projectName } = request.body;
  const project = await updateProject(id, projectName);
  return response.send({ project });
}

module.exports.delete = async (request, response) => {
  const { id } = request.params;
  await deleteProject({ id })
  return response.status(204).send();
}
