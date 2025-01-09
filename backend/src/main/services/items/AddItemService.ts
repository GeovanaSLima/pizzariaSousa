import prismaClient from '@/prisma';

interface AddItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount }: AddItemRequest) {
    const orderExists = await prismaClient.order.findFirst({
      where: {
        id: order_id,
      },
    });

    if (!orderExists) {
      throw new Error('Order not found');
    }

    const order = await prismaClient.item.create({
      data: {
        order_id,
        product_id,
        amount,
      },
    });

    return order;
  }
}

export { AddItemService };
