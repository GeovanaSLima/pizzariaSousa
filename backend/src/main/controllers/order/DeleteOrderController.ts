import { DeleteOrderService } from '../../services/order/DeleteOrderService';
import { Request, Response } from 'express';

class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;
    const deleteOrderService = new DeleteOrderService();

    const order = await deleteOrderService.execute({ order_id });

    res.json(order);
    return;
  }
}

export { DeleteOrderController };
