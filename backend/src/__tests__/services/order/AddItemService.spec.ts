import prismaClient from '@/prisma';
import { AddItemService } from '@/services/order/AddItemService';

jest.mock('@/prisma', () => ({
  item: {
    create: jest.fn(),
  },
  order: {
    findFirst: jest.fn(),
  },
}));

describe('AddItemService', () => {
  it('should be able to add an item to an order', async () => {
    const addItemService = new AddItemService();
    const mockItem = {
      id: '1',
      order_id: '1',
      product_id: '1',
      amount: 1,
      created_at: new Date('2025-01-09T04:24:34.790Z'),
      updated_at: new Date('2025-01-09T04:24:34.790Z'),
    };

    jest.mocked(prismaClient.order.findFirst).mockResolvedValueOnce({
      id: '1',
      table: 1,
      name: 'John Doe',
      status: false,
      draft: true,
      created_at: new Date('2025-01-09T04:24:34.790Z'),
      updated_at: new Date('2025-01-09T04:24:34.790Z'),
    });
    jest.mocked(prismaClient.item.create).mockResolvedValueOnce(mockItem);

    expect(
      await addItemService.execute({
        order_id: '1',
        product_id: '1',
        amount: 1,
      })
    ).toEqual(mockItem);
    expect(prismaClient.item.create).toHaveBeenCalledWith({
      data: {
        order_id: '1',
        product_id: '1',
        amount: 1,
      },
    });
  });

  it('should not be able to add an item to an order that does not exist', async () => {
    const addItemService = new AddItemService();

    jest.mocked(prismaClient.order.findFirst).mockResolvedValueOnce(null);

    expect(
      addItemService.execute({
        order_id: '1',
        product_id: '1',
        amount: 1,
      })
    ).rejects.toThrow('Order not found');
  });
});
