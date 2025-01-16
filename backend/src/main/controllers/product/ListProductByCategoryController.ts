import { ListProductByCategoryService } from '../../services/product/ListProductByCategoryService';
import { Request, Response } from 'express';

class ListProductByCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;
    const listProductByCategoryService = new ListProductByCategoryService();

    const productsByCategory = await listProductByCategoryService.execute({
      category_id,
    });

    res.json(productsByCategory);
    return;
  }
}

export { ListProductByCategoryController };
