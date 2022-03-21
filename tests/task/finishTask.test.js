const mockFindOneTask = jest.fn();
const mockUpdateOneTask = jest.fn();

jest.mock('../../src/modules/task/model', () => ({
  findOneTask: mockFindOneTask,
  updateOneTask: mockUpdateOneTask,
}));

jest.mock('../../src/modules/projects/findProject', () => jest.fn().mockResolvedValue({ id: 1 }));

const AppError = require('../../src/infra/AppError');
const finishTask = require('../../src/modules/task/finishTask');

jest.useFakeTimers();

describe('finishTask', () => {
  it('Should finish the task', async () => {
    mockFindOneTask.mockResolvedValueOnce({ done: false });
    mockFindOneTask.mockResolvedValueOnce(null);
    const filter = { id: 1, projectId: 1, userId: 1 };
    await finishTask(filter);
    expect(mockUpdateOneTask).toBeCalledWith(
      filter,
      { done: true, finishDate: new Date(Date.now()) },
    );
  });

  it('Should throw error when task does not exists', async () => {
    mockFindOneTask.mockResolvedValueOnce(null);
    const task = () => finishTask({
      id: 1, projectId: 1, userId: 1,
    });
    await expect(task).rejects.toBeInstanceOf(AppError);
  });
});
