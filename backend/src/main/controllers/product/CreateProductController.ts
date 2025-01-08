import { CreateProductService } from '@/services/product/CreateProductService';
import { Request, Response } from 'express';

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProductService = new CreateProductService();

    if (!req.file) {
      throw new Error('Image is required');
    } else {
      const { originalname, filename: banner } = req.file;

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
}

export { CreateProductController };
