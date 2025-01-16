"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductByCategoryService = void 0;
const prisma_1 = __importDefault(require("@/prisma"));
class ListProductByCategoryService {
    async execute({ category_id }) {
        const productsByCategory = await prisma_1.default.product.findMany({
            where: { category_id },
        });
        return productsByCategory;
    }
}
exports.ListProductByCategoryService = ListProductByCategoryService;
