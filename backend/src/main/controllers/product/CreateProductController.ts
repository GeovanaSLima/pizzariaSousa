import { CreateProductService } from '@/services/product/CreateProductService';
import { Request, Response } from 'express';

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;
    let banner = '';
    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      price,
      description,
      banner,
      category_id,
    });

    res.json(product);
    return;
  }
}

export { CreateProductController };
