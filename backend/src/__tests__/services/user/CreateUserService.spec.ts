import prismaClient from '@/prisma';
import { CreateUserService } from '@/services/user/CreateUserService';

jest.mock('@/prisma', () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

describe('CreateUserService', () => {
  it('should throw an error if email is not provided', async () => {
    const createUserService = new CreateUserService();

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: '',
        password: 'hashed_password',
      })
    ).rejects.toThrow('Email is required');

    expect(prismaClient.user.findFirst).not.toHaveBeenCalled();
    expect(prismaClient.user.create).not.toHaveBeenCalled();
  });

  it('should throw an error if the user already exists', async () => {
    const createUserService = new CreateUserService();
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password',
      created_at: new Date("2025-01-09T04:24:34.790Z"),
      updated_at: new Date("2025-01-09T04:24:34.790Z"),
    };

    jest.mocked(prismaClient.user.findFirst).mockResolvedValueOnce(mockUser);

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
      })
    ).rejects.toThrow('User already exists');

    expect(prismaClient.user.findFirst).toHaveBeenCalledWith({
      where: { email: 'john@example.com' },
    });
  });

  it('should create a new user if it does not exist', async () => {
    const createUserService = new CreateUserService();
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password',
      created_at: new Date("2025-01-09T04:24:34.790Z"),
      updated_at: new Date("2025-01-09T04:24:34.790Z"),
    };

    jest.mocked(prismaClient.user.findFirst).mockResolvedValueOnce(null);
    jest.mocked(prismaClient.user.create).mockResolvedValueOnce(mockUser);

    const result = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password',
    });

    expect(result).toEqual(mockUser);
    expect(prismaClient.user.findFirst).toHaveBeenCalledWith({
      where: {
        email: 'john@example.com',
      },
    });
    expect(prismaClient.user.create).toHaveBeenCalledWith({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: expect.any(String),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  });
});
