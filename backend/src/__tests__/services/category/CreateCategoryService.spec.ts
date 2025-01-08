import prismaClient from '@/prisma';
import { CreateCategoryService } from '@/services/category/CreateCategoryService';

jest.mock('@/prisma', () => ({
  category: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

describe('CreateCategoryService', () => {
  it('should throw an error if category name is not provided', async () => {
    const createCategoryService = new CreateCategoryService();

    await expect(
      createCategoryService.execute({
        name: '',
      })
    ).rejects.toThrow('Category Name is required');

    expect(prismaClient.category.findFirst).not.toHaveBeenCalled();
    expect(prismaClient.category.create).not.toHaveBeenCalled();
  });
});
