import { sign } from 'jsonwebtoken';
import prismaClient from '../../main/prisma';
import { AuthUserService } from '../../main/services/user/AuthUserService';
import * as bcrypt from 'bcryptjs';

jest.mock('../../main/prisma', () => ({
  user: {
    findFirst: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

describe('AuthUserService', () => {
  it('should throw an error if email does not exist', async () => {
    const authUserService = new AuthUserService();

    jest.mocked(prismaClient.user.findFirst).mockResolvedValueOnce(null);

    await expect(
      authUserService.execute({
        email: 'john@example.com',
        password: 'hashed_password',
      })
    ).rejects.toThrow('User/password incorrect');

    expect(prismaClient.user.findFirst).toHaveBeenCalledWith({
      where: {
        email: 'john@example.com',
      },
    });

    expect(sign).not.toHaveBeenCalled();
  });
  it('should throw an error if password does not match', async () => {
    const authUserService = new AuthUserService();
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest.mocked(prismaClient.user.findFirst).mockResolvedValueOnce(mockUser);

    jest.mocked(bcrypt.compare).mockImplementation(async () => false);

    await expect(
      authUserService.execute({
        email: 'john@example.com',
        password: 'wrong_password',
      })
    ).rejects.toThrow('User/password incorrect');

    expect(prismaClient.user.findFirst).toHaveBeenCalledWith({
      where: {
        email: 'john@example.com',
      },
    });
    expect(sign).not.toHaveBeenCalled();
  });

  it('should return a token if email and password match', async () => {
    const authUserService = new AuthUserService();
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest.mocked(prismaClient.user.findFirst).mockResolvedValueOnce(mockUser);

    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

    (jest.mocked(sign) as jest.Mock).mockReturnValueOnce('token');

    const result = await authUserService.execute({
      email: 'john@example.com',
      password: 'hashed_password',
    });

    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      token: 'token',
    });

    expect(prismaClient.user.findFirst).toHaveBeenCalledWith({
      where: {
        email: 'john@example.com',
      },
    });
    expect(sign).toHaveBeenCalledWith(
      {
        name: mockUser.name,
        email: mockUser.email,
      },
      process.env.JWT_SECRET,
      {
        subject: mockUser.id,
        expiresIn: '30d',
      }
    );
  });
});
