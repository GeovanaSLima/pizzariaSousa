import prismaClient from '@/prisma';
import { FinishOrderService } from '@/services/order/FinishOrderService';

jest.mock('@/prisma', () => ({
  order: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

describe('FinishOrderService', () => {
  let finishOrderService: FinishOrderService;

  beforeEach(() => {
    finishOrderService = new FinishOrderService();
  });

  it('should throw an error if the order is not found', async () => {
    const mockOrderId = 'non-existent-order-id';

    jest.mocked(prismaClient.order.findUnique).mockResolvedValueOnce(null);

    await expect(
      finishOrderService.execute({ order_id: mockOrderId })
    ).rejects.toThrow('Order not found');

    expect(prismaClient.order.findUnique).toHaveBeenCalledWith({
      where: { id: mockOrderId },
    });
    expect(prismaClient.order.update).not.toHaveBeenCalled();
  });

  it('should update the order if it exists', async () => {
    const mockOrderId = '1';
    const mockOrder = {
      id: mockOrderId,
      table: 1,
      name: 'John Doe',
      status: true,
      draft: true,
      created_at: new Date('2025-01-09T04:24:34.790Z'),
      updated_at: new Date('2025-01-09T04:24:34.790Z'),
    };

    jest.mocked(prismaClient.order.findUnique).mockResolvedValueOnce(mockOrder);

    jest
      .mocked(prismaClient.order.update)
      .mockResolvedValueOnce({ ...mockOrder, status: true });

    const result = await finishOrderService.execute({ order_id: mockOrderId });

    expect(prismaClient.order.findUnique).toHaveBeenCalledWith({
      where: { id: mockOrderId },
    });
    expect(prismaClient.order.update).toHaveBeenCalledWith({
      where: { id: mockOrderId },
      data: { status: true },
    });

    expect(result).toEqual({ ...mockOrder, status: true });
  });
});
