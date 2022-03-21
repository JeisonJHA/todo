const mockFindOneProject = jest.fn();
const mockDeleteOneProject = jest.fn();
const mockDeleteTaskFromProject = jest.fn();

jest.mock('../../src/modules/projects/model', () => ({
  findOneProject: mockFindOneProject,
  deleteOneProject: mockDeleteOneProject,
}));

jest.mock('../../src/modules/task/deleteTaskFromProject', () => mockDeleteTaskFromProject);

const AppError = require('../../src/infra/AppError');
const deleteProject = require('../../src/modules/projects/deleteProject');

describe('deleteProject', () => {
  it('Should delete project', async () => {
    const expected = { projectName: 'React', userId: 1 };
    mockFindOneProject.mockResolvedValueOnce(expected);
    await deleteProject(expected);
    expect(mockDeleteTaskFromProject).toBeCalledTimes(1);
    expect(mockDeleteOneProject).toBeCalledTimes(1);
  });

  it('Should throw error when project does not exists', async () => {
    mockFindOneProject.mockResolvedValueOnce(null);
    const expected = { projectName: 'React', userId: 1 };
    const create = () => deleteProject(expected);
    await expect(create).rejects.toBeInstanceOf(AppError);
  });
});
