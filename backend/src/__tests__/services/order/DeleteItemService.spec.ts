import prismaClient from '@/prisma';
import { DeleteItemService } from '@/services/order/DeleteItemService';

jest.mock('@/prisma', () => ({
  item: {
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
}));

describe('DeleteItemService', () => {
  it('should be able to remove an item from an order', async () => {
    const deleteItemService = new DeleteItemService();
    const mockItem = {
      id: '1',
      order_id: '1',
      product_id: '1',
      amount: 1,
      created_at: new Date('2025-01-09T04:24:34.790Z'),
      updated_at: new Date('2025-01-09T04:24:34.790Z'),
    };

    jest.mocked(prismaClient.item.findUnique).mockResolvedValueOnce(mockItem);
    jest.mocked(prismaClient.item.delete).mockResolvedValueOnce(mockItem);

    expect(await deleteItemService.execute({ item_id: '1' })).toEqual(mockItem);
    expect(prismaClient.item.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('should throw an error if item does not exist', async () => {
    const deleteItemService = new DeleteItemService();

    jest.mocked(prismaClient.item.findUnique).mockResolvedValueOnce(null);

    expect(deleteItemService.execute({ item_id: '1' })).rejects.toThrow(
      'Item not found'
    );
    expect(prismaClient.item.delete).not.toHaveBeenCalled();
  });
});
