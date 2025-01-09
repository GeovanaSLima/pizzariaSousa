import prismaClient from '@/prisma';
import { SendOrderService } from '@/services/order/SendOrderService';

jest.mock('@/prisma', () => ({
  order: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

describe('SendOrderService', () => {
  let sendOrderService: SendOrderService;

  beforeEach(() => {
    sendOrderService = new SendOrderService();
  });

  it('should throw an error if the order is not found', async () => {
    const mockOrderId = 'non-existent-order-id';

    jest.mocked(prismaClient.order.findUnique).mockResolvedValueOnce(null);

    await expect(
      sendOrderService.execute({ order_id: mockOrderId })
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
      status: false,
      draft: true,
      created_at: new Date('2025-01-09T04:24:34.790Z'),
      updated_at: new Date('2025-01-09T04:24:34.790Z'),
    };

    jest.mocked(prismaClient.order.findUnique).mockResolvedValueOnce(mockOrder);

    jest
      .mocked(prismaClient.order.update)
      .mockResolvedValueOnce({ ...mockOrder, draft: false });

    const result = await sendOrderService.execute({ order_id: mockOrderId });

    expect(prismaClient.order.findUnique).toHaveBeenCalledWith({
      where: { id: mockOrderId },
    });
    expect(prismaClient.order.update).toHaveBeenCalledWith({
      where: { id: mockOrderId },
      data: { draft: false },
    });

    expect(result).toEqual({ ...mockOrder, draft: false });
  });
});
