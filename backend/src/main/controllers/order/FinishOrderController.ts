import { FinishOrderService } from '@/services/order/FinishOrderService';
import { Request, Response } from 'express';

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;
    const finishOrder = new FinishOrderService();
    const order = await finishOrder.execute({ order_id });

    res.json(order);
    return;
  }
}

export { FinishOrderController };
