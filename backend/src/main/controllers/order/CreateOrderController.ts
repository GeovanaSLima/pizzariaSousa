import { CreateOrderService } from '@/services/order/CreateOrderService';
import { Request, Response } from 'express';

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table, name } = req.body;
    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute({ table, name });

    res.json(order);
    return;
  }
}

export { CreateOrderController };
