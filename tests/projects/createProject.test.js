const mockFindOneProject = jest.fn();
const mockInsertOneProject = jest.fn();

jest.mock('../../src/modules/projects/model', () => ({
  findOneProject: mockFindOneProject,
  insertOneProject: mockInsertOneProject,
}));

const AppError = require('../../src/infra/AppError');
const createProject = require('../../src/modules/projects/createProject');

describe('createProjects', () => {
  it('Should create project', async () => {
    mockFindOneProject.mockResolvedValueOnce(null);
    const expected = { projectName: 'React', userId: 1 };
    await createProject(expected);
    expect(mockInsertOneProject).toBeCalledWith(expected);
  });

  it('Should throw error when project already exists', async () => {
    const expected = { projectName: 'React', userId: 1 };
    mockFindOneProject.mockResolvedValueOnce(expected);
    const create = () => createProject(expected);
    await expect(create).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error when project name was not informed', async () => {
    const create = () => createProject({});
    await expect(create).rejects.toBeInstanceOf(AppError);
  });
});
