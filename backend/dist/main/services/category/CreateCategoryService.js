"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateCategoryService {
    async execute({ name }) {
        if (name === '') {
            throw new Error('Category Name is required');
        }
        const normalizedName = name.toLowerCase();
        const categoryAlreadyExists = await prisma_1.default.category.findFirst({
            where: {
                name: normalizedName,
            },
        });
        if (categoryAlreadyExists) {
            throw new Error('Category already exists');
        }
        const category = await prisma_1.default.category.create({
            data: {
                name: normalizedName,
            },
            select: {
                id: true,
                name: true,
            },
        });
        return category;
    }
}
exports.CreateCategoryService = CreateCategoryService;
