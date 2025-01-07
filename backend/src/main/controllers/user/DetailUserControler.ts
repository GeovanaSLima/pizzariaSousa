import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
  async handle(req: Request, res: Response) {
    const detailUserService = new DetailUserService();

    const user = await detailUserService.execute();

    res.json(user);
    return;
  }
}

export { DetailUserController };
