"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class CreateProductController {
    async handle(req, res) {
        const { name, price, description, category_id } = req.body;
        const createProductService = new CreateProductService_1.CreateProductService();
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('Image is required');
        }
        else {
            const file = req.files['file'][0];
            const resultFile = await new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader
                    .upload_stream({}, function (error, result) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                })
                    .end(file.data);
            });
            const product = await createProductService.execute({
                name,
                price,
                description,
                banner: resultFile.url,
                category_id,
            });
            res.json(product);
            return;
        }
    }
}
exports.CreateProductController = CreateProductController;
