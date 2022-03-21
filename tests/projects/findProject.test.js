const mockFindOneProject = jest.fn();

jest.mock('../../src/modules/projects/model', () => ({
  findOneProject: mockFindOneProject,
}));

const AppError = require('../../src/infra/AppError');
const findProject = require('../../src/modules/projects/findProject');

describe('findProject', () => {
  it('Should find project', async () => {
    const expected = { id: 1, userId: 1 };
    mockFindOneProject.mockResolvedValueOnce(expected);
    const project = await findProject(expected);
    expect(project).toEqual(expected);
  });

  it('Should throw error when project does not exists', async () => {
    const expected = { userId: 1 };
    mockFindOneProject.mockResolvedValueOnce(null);
    const create = () => findProject(expected);
    await expect(create).rejects.toBeInstanceOf(AppError);
  });
});
