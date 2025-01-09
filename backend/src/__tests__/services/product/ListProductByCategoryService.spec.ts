import prismaClient from '@/prisma';
import { ListProductByCategoryService } from '@/services/product/ListProductByCategoryService';

jest.mock('@/prisma', () => ({
  product: {
    findMany: jest.fn(),
  },
}));

describe('ListProductByCategoryService', () => {
  it('should return all products by category', async () => {
    const listProductByCategoryService = new ListProductByCategoryService();
    const category_id = '123';
    const mockProductsList = [
      {
        id: '1',
        category_id: '123',
        name: 'Coca-Cola',
        price: '5.00',
        banner: 'coca-cola.jpg',
        description: 'Coca-Cola lata 350ml',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '2',
        category_id: '123',
        name: 'Gurana',
        price: '5.00',
        banner: 'gurana.jpg',
        description: 'Guarana lata 350ml',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '3',
        category_id: '456',
        name: 'Calabresa',
        price: '55.00',
        banner: 'calabresa.jpg',
        description: 'Pizza de calabresa',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    jest
      .mocked(prismaClient.product.findMany)
      .mockResolvedValue(mockProductsList);

    const result = await listProductByCategoryService.execute({ category_id });

    expect(result).toEqual(mockProductsList);
    expect(prismaClient.product.findMany).toHaveBeenCalledWith({
      where: { category_id },
    });
  });
});
