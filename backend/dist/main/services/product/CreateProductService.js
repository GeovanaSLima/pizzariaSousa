"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateProductService {
    async execute({ name, price, description, banner, category_id, }) {
        const requiredFields = { name, price, description, banner, category_id };
        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => !value)
            .map(([key]) => key);
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
        const normalizedName = name.toLowerCase();
        const normalizedDescription = description.toLowerCase();
        const productAlreadyExists = await prisma_1.default.product.findFirst({
            where: { name: normalizedName },
        });
        if (productAlreadyExists) {
            throw new Error('Product already exists');
        }
        const product = await prisma_1.default.product.create({
            data: {
                name: normalizedName,
                price,
                description: normalizedDescription,
                banner,
                category_id,
            },
        });
        return product;
    }
}
exports.CreateProductService = CreateProductService;
