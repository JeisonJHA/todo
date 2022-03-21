const mockFindOneTask = jest.fn();
const mockInsertOneTask = jest.fn();

jest.mock('../../src/modules/task/model', () => ({
  findOneTask: mockFindOneTask,
  insertOneTask: mockInsertOneTask,
}));

jest.mock('../../src/modules/projects/findProject', () => jest.fn().mockResolvedValue({ id: 1 }));

const AppError = require('../../src/infra/AppError');
const createTask = require('../../src/modules/task/createTask');

describe('createTask', () => {
  it('Should create task', async () => {
    mockFindOneTask.mockResolvedValueOnce(null);
    mockFindOneTask.mockImplementationOnce((data) => data);
    const taskToCreate = { projectId: 1, taskName: 'create tests' };
    const task = await createTask({ ...taskToCreate, userId: 1 });
    expect(task).toEqual(taskToCreate);
  });

  it('Should throw error when exists task with the same name', async () => {
    mockFindOneTask.mockResolvedValueOnce({});
    const taskToCreate = { projectId: 1, taskName: 'create tests' };
    const task = () => createTask({ ...taskToCreate, userId: 1 });
    await expect(task).rejects.toBeInstanceOf(AppError);
  });
});
