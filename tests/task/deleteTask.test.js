const mockFindOneTask = jest.fn();
const mockDeleteOneTask = jest.fn();

jest.mock('../../src/modules/task/model', () => ({
  findOneTask: mockFindOneTask,
  deleteOneTask: mockDeleteOneTask,
}));

jest.mock('../../src/modules/projects/findProject', () => jest.fn().mockResolvedValue({ id: 1 }));

const AppError = require('../../src/infra/AppError');
const deleteTask = require('../../src/modules/task/deleteTask');

describe('deleteTask', () => {
  beforeEach(() => {
    mockDeleteOneTask.mockClear();
  });

  it('Should delete task with the task not done', async () => {
    mockFindOneTask.mockResolvedValueOnce({ done: false });
    await deleteTask({ id: 1, userId: 1 });
    expect(mockDeleteOneTask).toBeCalledTimes(1);
  });

  it('Should not throw error when task does not exists', async () => {
    mockFindOneTask.mockResolvedValueOnce(null);
    await deleteTask({ id: 1, userId: 1 });
    expect(mockDeleteOneTask).toBeCalledTimes(1);
  });

  it('Should throw error when the task is done', async () => {
    mockFindOneTask.mockResolvedValueOnce({ done: true });
    const task = () => deleteTask({ id: 1, userId: 1 });
    await expect(task).rejects.toBeInstanceOf(AppError);
  });
});
