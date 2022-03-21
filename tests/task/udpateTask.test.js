const mockFindOneTask = jest.fn();
const mockUpdateOneTask = jest.fn();

jest.mock('../../src/modules/task/model', () => ({
  findOneTask: mockFindOneTask,
  updateOneTask: mockUpdateOneTask,
}));

jest.mock('../../src/modules/projects/findProject', () => jest.fn().mockResolvedValue({ id: 1 }));

const AppError = require('../../src/infra/AppError');
const updateTask = require('../../src/modules/task/updateTask');

describe('updateTask', () => {
  it('Should update task', async () => {
    mockFindOneTask.mockResolvedValueOnce({ done: false });
    mockFindOneTask.mockResolvedValueOnce(null);
    await updateTask({
      id: 1, taskName: 'create tests', projectId: 1, userId: 1,
    });
    expect(mockUpdateOneTask).toBeCalledWith({ id: 1 }, { taskName: 'create tests' });
  });

  it('Should throw error when task is done', async () => {
    mockFindOneTask.mockResolvedValueOnce({ done: true });
    const task = () => updateTask({
      id: 1, taskName: 'create tests', projectId: 1, userId: 1,
    });
    await expect(task).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error when there is already a task with the same name', async () => {
    mockFindOneTask.mockResolvedValueOnce({ done: false });
    mockFindOneTask.mockResolvedValueOnce({});
    const task = () => updateTask({
      id: 1, taskName: 'create tests', projectId: 1, userId: 1,
    });
    await expect(task).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error when taskName was not provided', async () => {
    mockFindOneTask.mockResolvedValueOnce({ done: false });
    const task = () => updateTask({ id: 1, projectId: 1, userId: 1 });
    await expect(task).rejects.toBeInstanceOf(AppError);
  });
});
