import { CreateProductService } from '../../services/product/CreateProductService';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProductService = new CreateProductService();

    if (!req.files || !req.files['file']) {
      throw new Error('Image is required');
    }

    const file = Array.isArray(req.files['file'])
      ? req.files['file'][0]
      : req.files['file'];

    if (!file.data) {
      throw new Error('File data is missing');
    }

    const resultFile: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result as UploadApiResponse);
          })
          .end(file.data);
      }
    );

    const product = await createProductService.execute({
      name,
      price,
      description,
      banner: resultFile.url,
      category_id,
    });

    res.json(product);
  }
}

export { CreateProductController };
