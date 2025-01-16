import prismaClient from '../../prisma';

interface DeleteItemRequest {
  item_id: string;
}

class DeleteItemService {
  async execute({ item_id }: DeleteItemRequest) {
    const itemExists = await prismaClient.item.findUnique({
      where: { id: item_id },
    });

    if (!itemExists) {
      throw new Error('Item not found');
    }

    const item = await prismaClient.item.delete({
      where: { id: item_id },
    });

    return item;
  }
}

export { DeleteItemService };
