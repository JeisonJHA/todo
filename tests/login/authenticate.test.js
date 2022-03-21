const { hashSync } = require('bcryptjs');

const mockFindUser = jest.fn();

jest.mock('../../src/modules/user/findUser', () => mockFindUser);

const AppError = require('../../src/infra/AppError');
const authenticate = require('../../src/modules/login/authenticate');

describe('authenticate', () => {
  beforeAll(() => {
    process.env.TOKEN_SECRET = 'teste';
  });

  it('Should authenticate user', async () => {
    mockFindUser.mockResolvedValueOnce({
      id: 1,
      password: hashSync('password', 8),
      userName: 'Jeison Azevedo',
    });
    const token = await authenticate('jeison', 'password');
    expect(token).toBeDefined();
  });

  it('Should throw error when password not match', async () => {
    mockFindUser.mockResolvedValueOnce({
      id: 1,
      password: hashSync('password', 8),
      userName: 'Jeison Azevedo',
    });
    const token = () => authenticate('jeison', 'wrong_password');
    await expect(token).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error when login was not informed', async () => {
    const token = () => authenticate('', 'password');
    await expect(token).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error when password was not informed', async () => {
    const token = () => authenticate('jeison', '');
    await expect(token).rejects.toBeInstanceOf(AppError);
  });
});
