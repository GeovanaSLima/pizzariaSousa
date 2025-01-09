import prismaClient from '@/prisma';
import { DeleteOrderService } from '@/services/order/DeleteOrderService';

jest.mock('@/prisma', () => ({
  order: {
    delete: jest.fn(),
  },
}));

describe('DeleteOrderService', () => {
  it('should be able to delete an order', async () => {
    const deleteOrderService = new DeleteOrderService();
    const mockOrder = {
      id: '1',
      table: 1,
      name: 'John Doe',
      status: false,
      draft: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest.mocked(prismaClient.order.delete).mockResolvedValueOnce(mockOrder);

    expect(await deleteOrderService.execute({ order_id: '1' })).toEqual(
      mockOrder
    );
    expect(prismaClient.order.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });
});
