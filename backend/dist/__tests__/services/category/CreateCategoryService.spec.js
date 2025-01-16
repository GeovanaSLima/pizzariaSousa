"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/prisma"));
const CreateCategoryService_1 = require("@/services/category/CreateCategoryService");
jest.mock('@/prisma', () => ({
    category: {
        findFirst: jest.fn(),
        create: jest.fn(),
    },
}));
describe('CreateCategoryService', () => {
    it('should throw an error if category name is not provided', async () => {
        const createCategoryService = new CreateCategoryService_1.CreateCategoryService();
        await expect(createCategoryService.execute({
            name: '',
        })).rejects.toThrow('Category Name is required');
        expect(prisma_1.default.category.findFirst).not.toHaveBeenCalled();
        expect(prisma_1.default.category.create).not.toHaveBeenCalled();
    });
    it('should throw an error if category name already exists', async () => {
        const createCategoryService = new CreateCategoryService_1.CreateCategoryService();
        const mockCategory = {
            id: '1',
            name: 'bebidas',
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        };
        jest
            .mocked(prisma_1.default.category.findFirst)
            .mockResolvedValueOnce(mockCategory);
        await expect(createCategoryService.execute({
            name: 'Bebidas',
        })).rejects.toThrow('Category already exists');
        expect(prisma_1.default.category.findFirst).toHaveBeenCalledWith({
            where: { name: 'bebidas' },
        });
        expect(prisma_1.default.category.create).not.toHaveBeenCalled();
    });
    it('should create a new category if it does not exist', async () => {
        const createCategoryService = new CreateCategoryService_1.CreateCategoryService();
        const mockCategory = {
            id: '1',
            name: 'bebidas',
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        };
        jest.mocked(prisma_1.default.category.findFirst).mockResolvedValueOnce(null);
        jest
            .mocked(prisma_1.default.category.create)
            .mockResolvedValueOnce(mockCategory);
        const result = await createCategoryService.execute({ name: 'Bebidas' });
        expect(result).toEqual(mockCategory);
        expect(prisma_1.default.category.findFirst).toHaveBeenCalledWith({
            where: {
                name: 'bebidas',
            },
        });
        expect(prisma_1.default.category.create).toHaveBeenLastCalledWith({
            data: {
                name: 'bebidas',
            },
            select: {
                id: true,
                name: true,
            },
        });
    });
});
