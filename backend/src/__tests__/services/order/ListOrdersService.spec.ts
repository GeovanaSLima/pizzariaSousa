import prismaClient from '@/prisma';
import { ListOrdersService } from '@/services/order/ListOrdersService';

jest.mock('@/prisma', () => ({
  order: {
    findMany: jest.fn(),
  },
}));

describe('ListOrdersService', () => {
  it('should be able to list all orders', async () => {
    const listOrdersService = new ListOrdersService();
    const mockOrders = [
      {
        id: '1',
        table: 1,
        name: 'John Doe',
        status: false,
        draft: false,
        created_at: new Date('2025-01-09T04:24:34.790Z'),
        updated_at: new Date('2025-01-09T04:24:34.790Z'),
      },
    ];

    jest.mocked(prismaClient.order.findMany).mockResolvedValue(mockOrders);

    expect(await listOrdersService.execute()).toEqual(mockOrders);
    expect(prismaClient.order.findMany).toHaveBeenCalledWith({
      where: {
        draft: false,
        status: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  });
});
