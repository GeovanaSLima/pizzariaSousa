import { DeleteItemService } from '@/services/items/DeleteItemService';
import { Request, Response } from 'express';

class DeleteItemController {
  async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string;
    const deleteItemService = new DeleteItemService();
    const item = await deleteItemService.execute({ item_id });

    res.json(item);
    return;
  }
}

export { DeleteItemController };
