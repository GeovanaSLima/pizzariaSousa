"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/prisma"));
const ListCategoryService_1 = require("@/services/category/ListCategoryService");
jest.mock('@/prisma', () => ({
    category: {
        findMany: jest.fn(),
    },
}));
describe('ListCategorySevice', () => {
    it('should return all categories created', async () => {
        const listCategoryService = new ListCategoryService_1.ListCategoryService();
        const mockCategoryList = [
            {
                id: '1',
                name: 'Bebidas',
                created_at: new Date('2025-01-09T04:24:34.790Z'),
                updated_at: new Date('2025-01-09T04:24:34.790Z'),
            },
            {
                id: '2',
                name: 'Pizzas',
                created_at: new Date('2025-01-09T04:24:34.790Z'),
                updated_at: new Date('2025-01-09T04:24:34.790Z'),
            },
        ];
        jest
            .mocked(prisma_1.default.category.findMany)
            .mockResolvedValue(mockCategoryList);
        const result = await listCategoryService.execute();
        expect(result).toEqual(mockCategoryList);
        expect(prisma_1.default.category.findMany).toHaveBeenCalledWith({
            select: {
                id: true,
                name: true,
            },
        });
    });
});
