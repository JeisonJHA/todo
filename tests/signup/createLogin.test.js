const mockCreateUser = jest.fn();
const mockFindUser = jest.fn();

jest.mock('../../src/modules/user/findUser', () => mockFindUser);
jest.mock('../../src/modules/user/createUser', () => mockCreateUser);

const AppError = require('../../src/infra/AppError');
const createLogin = require('../../src/modules/singup/createLogin');

describe('createLogin', () => {
  it('Should create login', async () => {
    mockFindUser.mockResolvedValueOnce(null);
    await createLogin('jeison', 'password', 'Jeison Azevedo');
    expect(mockCreateUser).toBeCalledWith({
      login: 'jeison',
      password: expect.any(String),
      userName: 'Jeison Azevedo',
    });
  });

  it('Should throw error when user already exists', async () => {
    mockFindUser.mockResolvedValueOnce({});
    const create = () => createLogin('jeison', 'password', 'Jeison Azevedo');
    expect(create).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error when login was not informed', async () => {
    mockFindUser.mockResolvedValueOnce({});
    const create = () => createLogin('', 'password', 'Jeison Azevedo');
    expect(create).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error when password was not informed', async () => {
    mockFindUser.mockResolvedValueOnce({});
    const create = () => createLogin('jeison', '', 'Jeison Azevedo');
    expect(create).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error when user name was not informed', async () => {
    mockFindUser.mockResolvedValueOnce({});
    const create = () => createLogin('jeison', 'password', '');
    expect(create).rejects.toBeInstanceOf(AppError);
  });
});
