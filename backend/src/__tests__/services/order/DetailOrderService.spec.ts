import prismaClient from '@/prisma';
import { DetailOrderService } from '@/services/order/DetailOrderService';

jest.mock('@/prisma', () => ({
  item: {
    findMany: jest.fn(),
  },
}));

describe('DetailOrderService', () => {
  let detailOrderService: DetailOrderService;

  beforeEach(() => {
    detailOrderService = new DetailOrderService();
  });

  it('should return the details of the order', async () => {
    const mockOrderId = '1';
    const mockOrderDetails = [
      {
        id: 'item-1',
        amount: 2,
        order_id: mockOrderId,
        product_id: 'product-1',
        created_at: new Date('2025-01-09T04:24:34.790Z'),
        updated_at: new Date('2025-01-09T04:24:34.790Z'),
        product: {
          id: 'product-1',
          name: 'Product 1',
          price: '10.00',
          description: 'A sample product',
          banner: 'product1.jpg',
          category_id: '1',
          created_at: new Date('2025-01-09T04:24:34.790Z'),
          updated_at: new Date('2025-01-09T04:24:34.790Z'),
        },
        order: {
          id: mockOrderId,
          table: 1,
          status: false,
          draft: false,
          name: null,
          created_at: new Date('2025-01-09T04:24:34.790Z'),
          updated_at: new Date('2025-01-09T04:24:34.790Z'),
        },
      },
    ];

    jest
      .mocked(prismaClient.item.findMany)
      .mockResolvedValueOnce(mockOrderDetails);

    const result = await detailOrderService.execute({ order_id: mockOrderId });

    expect(prismaClient.item.findMany).toHaveBeenCalledWith({
      where: { order_id: mockOrderId },
      include: { product: true, order: true },
    });

    expect(result).toEqual(mockOrderDetails);
  });

  it('should return an empty array if no items are found for the order', async () => {
    const mockOrderId = 'non-existent-order-id';

    jest.mocked(prismaClient.item.findMany).mockResolvedValueOnce([]);

    const result = await detailOrderService.execute({ order_id: mockOrderId });

    expect(prismaClient.item.findMany).toHaveBeenCalledWith({
      where: { order_id: mockOrderId },
      include: { product: true, order: true },
    });

    expect(result).toEqual([]);
  });
});
