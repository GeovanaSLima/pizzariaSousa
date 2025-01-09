import { AddItemService } from '@/services/order/AddItemService';
import { Request, Response } from 'express';

class AddItemController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body;
    const addItem = new AddItemService();

    const order = await addItem.execute({ order_id, product_id, amount });

    res.json(order);
    return;
  }
}

export { AddItemController };
