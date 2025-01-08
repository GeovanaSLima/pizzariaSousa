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

  it('should throw an error if category name already exists', async () => {
    const createCategoryService = new CreateCategoryService();
    const mockCategory = {
      id: '1',
      name: 'Bebidas',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest
      .mocked(prismaClient.category.findFirst)
      .mockResolvedValueOnce(mockCategory);

    await expect(
      createCategoryService.execute({
        name: 'Bebidas',
      })
    ).rejects.toThrow('Category already exists');

    expect(prismaClient.category.findFirst).toHaveBeenCalledWith({
      where: { name: 'Bebidas' },
    });
    expect(prismaClient.category.create).not.toHaveBeenCalled();
  });

  it('should create a new category if it does not exist', async () => {
    const createCategoryService = new CreateCategoryService();
    const mockCategory = {
      id: '1',
      name: 'Bebidas',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest.mocked(prismaClient.category.findFirst).mockResolvedValueOnce(null);
    jest
      .mocked(prismaClient.category.create)
      .mockResolvedValueOnce(mockCategory);

    const result = await createCategoryService.execute({ name: 'Bebidas' });

    expect(result).toEqual(mockCategory);
    expect(prismaClient.category.findFirst).toHaveBeenCalledWith({
      where: {
        name: 'Bebidas',
      },
    });
    expect(prismaClient.category.create).toHaveBeenLastCalledWith({
      data: {
        name: 'Bebidas',
      },
      select: {
        id: true,
        name: true,
      },
    });
  });
});
