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

    // 🔹 LOG de depuração no Vercel
    console.log('🔹 Files recebidos:', req.files);

    // Verifica se o arquivo existe
    if (!req.files || !req.files['file']) {
      console.error('❌ Nenhuma imagem foi enviada');
      return res.status(400).json({ error: 'Image is required' });
    }

    const file = Array.isArray(req.files['file']) ? req.files['file'][0] : req.files['file'];

    if (!file || !file.tempFilePath) {
      console.error('❌ O arquivo não contém tempFilePath');
      return res.status(400).json({ error: 'File data is missing' });
    }

    try {
      console.log('🔹 Enviando arquivo para Cloudinary:', file.tempFilePath);

      const resultFile: UploadApiResponse = await cloudinary.uploader.upload(file.tempFilePath);

      console.log('✅ Upload bem-sucedido:', resultFile.secure_url);

      const product = await createProductService.execute({
        name,
        price,
        description,
        banner: resultFile.secure_url,
        category_id,
      });

      return res.json(product);
    } catch (error) {
      console.error('❌ Erro no upload:', error);
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  }
}

export { CreateProductController };
