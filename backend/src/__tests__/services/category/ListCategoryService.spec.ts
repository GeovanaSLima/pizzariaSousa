import prismaClient from '@/prisma';
import { ListCategoryService } from '@/services/category/ListCategoryService';

jest.mock('@/prisma', () => ({
  category: {
    findMany: jest.fn(),
  },
}));

describe('ListCategorySevice', () => {
  it('should return all categories created', async () => {
    const listCategoryService = new ListCategoryService();
    const mockCategoryList = [
      {
        id: '1',
        name: 'Bebidas',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '2',
        name: 'Pizzas',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    jest
      .mocked(prismaClient.category.findMany)
      .mockResolvedValue(mockCategoryList);

    const result = await listCategoryService.execute();

    expect(result).toEqual(mockCategoryList);
    expect(prismaClient.category.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        name: true,
      },
    });
  });
});
