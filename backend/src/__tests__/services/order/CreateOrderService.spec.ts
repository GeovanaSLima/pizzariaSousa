import prismaClient from '@/prisma';
import { CreateOrderService } from '@/services/order/CreateOrderService';

jest.mock('@/prisma', () => ({
  order: {
    create: jest.fn(),
  },
}));

describe('CreateOrderService', () => {
  it('should be able to create a new order when Table and Name are provided', async () => {
    const createOrderService = new CreateOrderService();
    const mockOrder = {
      id: '1',
      table: 1,
      name: 'John Doe',
      status: false,
      draft: true,
      created_at: new Date('2025-01-09T04:24:34.790Z'),
      updated_at: new Date('2025-01-09T04:24:34.790Z'),
    };

    jest.mocked(prismaClient.order.create).mockResolvedValueOnce(mockOrder);

    expect(
      await createOrderService.execute({ table: 1, name: 'John Doe' })
    ).toEqual(mockOrder);
    expect(prismaClient.order.create).toHaveBeenCalledWith({
      data: {
        table: 1,
        name: 'John Doe',
      },
    });
  });

  it('should be able to create a new order when Name is not provided', async () => {
    const createOrderService = new CreateOrderService();
    const mockOrder = {
      id: '1',
      table: 1,
      name: null,
      status: false,
      draft: true,
      created_at: new Date('2025-01-09T04:24:34.790Z'),
      updated_at: new Date('2025-01-09T04:24:34.790Z'),
    };

    jest.mocked(prismaClient.order.create).mockResolvedValueOnce(mockOrder);

    expect(await createOrderService.execute({ table: 1, name: '' })).toEqual(
      mockOrder
    );
    expect(prismaClient.order.create).toHaveBeenCalledWith({
      data: {
        table: 1,
        name: '',
      },
    });
  });
});
