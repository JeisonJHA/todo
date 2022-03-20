const AppError = require("../../infra/AppError");
const { findOneProject, deleteOneProject } = require("./model")
const { deleteManyTask } = require("../task/model")

module.exports = async (id) => {
  const project = await findOneProject({ id });
  if (!project) {
    throw new AppError('Project doesn`t exists.');
  }
  await Promise.all(
    [
      deleteOneProject({ id }),
      deleteManyTask({ projectId: id })
    ]
  );
}
