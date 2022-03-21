const mockFindTasks = jest.fn();
const mockDeleteManyTask = jest.fn();

jest.mock('../../src/modules/task/model', () => ({
  findTasks: mockFindTasks,
  deleteManyTask: mockDeleteManyTask,
}));

jest.mock('../../src/modules/projects/findProject', () => jest.fn().mockResolvedValue({ id: 1 }));

const AppError = require('../../src/infra/AppError');
const deleteTaskFromProject = require('../../src/modules/task/deleteTaskFromProject');

describe('deleteTaskFromProject', () => {
  beforeEach(() => {
    mockDeleteManyTask.mockClear();
  });

  it('Should delete task with the tasks not done', async () => {
    mockFindTasks.mockResolvedValueOnce([]);
    await deleteTaskFromProject({ projectId: 1, userId: 1 });
    expect(mockDeleteManyTask).toBeCalledTimes(1);
  });

  it('Should throw error when the task is done', async () => {
    mockFindTasks.mockResolvedValueOnce([{ done: true }]);
    const task = () => deleteTaskFromProject({ id: 1, userId: 1 });
    await expect(task).rejects.toBeInstanceOf(AppError);
  });
});
