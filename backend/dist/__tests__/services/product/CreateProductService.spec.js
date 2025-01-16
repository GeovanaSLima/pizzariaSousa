"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/prisma"));
const CreateProductService_1 = require("@/services/product/CreateProductService");
jest.mock('@/prisma', () => ({
    product: {
        create: jest.fn(),
        findFirst: jest.fn(),
    },
}));
describe('CreateProductService', () => {
    const createProductService = new CreateProductService_1.CreateProductService();
    it('should throw an error if any product field is not provided', async () => {
        const mockRequest = {
            name: '',
            price: '',
            description: 'Description 1',
            banner: 'banner.jpg',
            category_id: '',
        };
        await expect(createProductService.execute(mockRequest)).rejects.toThrow('Missing required fields: name, price, category_id');
    });
    it('should throw an error if product already exists', async () => {
        const mockProduct = {
            id: '1',
            name: 'product 1',
            price: '10.00',
            description: 'description 1',
            banner: 'banner.jpg',
            category_id: '1',
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        };
        const mockRequest = {
            name: 'Product 1',
            price: '10.00',
            description: 'Description 1',
            banner: 'banner.jpg',
            category_id: '1',
        };
        jest
            .mocked(prisma_1.default.product.findFirst)
            .mockResolvedValueOnce(mockProduct);
        await expect(createProductService.execute(mockRequest)).rejects.toThrow('Product already exists');
        expect(prisma_1.default.product.findFirst).toHaveBeenCalledWith({
            where: { name: 'product 1' },
        });
    });
    it('should create a product successfully', async () => {
        const mockRequest = {
            name: 'Product 2',
            price: '20.00',
            description: 'Description 2',
            banner: 'banner2.jpg',
            category_id: '2',
        };
        const mockCreatedProduct = {
            id: '2',
            name: 'product 2',
            price: '20.00',
            description: 'description 2',
            banner: 'banner2.jpg',
            category_id: '2',
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        };
        jest.mocked(prisma_1.default.product.findFirst).mockResolvedValueOnce(null);
        jest
            .mocked(prisma_1.default.product.create)
            .mockResolvedValueOnce(mockCreatedProduct);
        const result = await createProductService.execute(mockRequest);
        expect(prisma_1.default.product.findFirst).toHaveBeenCalledWith({
            where: { name: 'product 2' },
        });
        expect(prisma_1.default.product.create).toHaveBeenCalledWith({
            data: {
                name: 'product 2',
                price: '20.00',
                description: 'description 2',
                banner: 'banner2.jpg',
                category_id: '2',
            },
        });
        expect(result).toEqual(mockCreatedProduct);
    });
});
