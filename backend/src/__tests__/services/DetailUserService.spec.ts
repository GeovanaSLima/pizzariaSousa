import { DetailUserService } from '../../main/services/user/DetailUserService';
import prismaClient from '../../main/prisma';

jest.mock('../../main/prisma', () => ({
  user: {
    findFirst: jest.fn(),
  },
}));

describe('DetailUserService', () => {
  it('should return user information based on the user_id sent', async () => {
    const detailUserService = new DetailUserService();
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest.mocked(prismaClient.user.findFirst).mockResolvedValueOnce(mockUser);

    const result = await detailUserService.execute(mockUser.id);

    expect(result).toEqual(mockUser);
    expect(prismaClient.user.findFirst).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  });
});
