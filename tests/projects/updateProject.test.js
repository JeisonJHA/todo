const mockFindOneProject = jest.fn();
const mockUpdateOneProject = jest.fn();

jest.mock('../../src/modules/projects/model', () => ({
  findOneProject: mockFindOneProject,
  updateOneProject: mockUpdateOneProject,
}));

const AppError = require('../../src/infra/AppError');
const updateProject = require('../../src/modules/projects/updateProject');

describe('updateProjects', () => {
  it('Should update project', async () => {
    const expected = { id: 1, projectName: 'React', userId: 1 };
    mockFindOneProject.mockResolvedValueOnce(null);
    mockFindOneProject.mockResolvedValueOnce(expected);
    await updateProject(expected);
    expect(mockUpdateOneProject).toBeCalledWith(
      { id: expected.id },
      { projectName: expected.projectName },
    );
  });

  it('Should throw error when project name was not informed', async () => {
    const create = () => updateProject({});
    await expect(create).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error when project does not exists', async () => {
    const expected = { projectName: 'React', userId: 1 };
    mockFindOneProject.mockResolvedValueOnce(null);
    const create = () => updateProject(expected);
    await expect(create).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error when there is another project with the same name', async () => {
    const expected = { projectName: 'React', userId: 1 };

    mockFindOneProject.mockResolvedValueOnce(expected);
    mockFindOneProject.mockResolvedValueOnce(expected);
    const create = () => updateProject(expected);
    await expect(create).rejects.toBeInstanceOf(AppError);
  });
});
