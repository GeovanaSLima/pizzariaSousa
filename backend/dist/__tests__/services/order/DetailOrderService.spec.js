"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/prisma"));
const DetailOrderService_1 = require("@/services/order/DetailOrderService");
jest.mock('@/prisma', () => ({
    item: {
        findMany: jest.fn(),
    },
}));
describe('DetailOrderService', () => {
    let detailOrderService;
    beforeEach(() => {
        detailOrderService = new DetailOrderService_1.DetailOrderService();
    });
    it('should return the details of the order', async () => {
        const mockOrderId = '1';
        const mockOrderDetails = [
            {
                id: 'item-1',
                amount: 2,
                order_id: mockOrderId,
                product_id: 'product-1',
                created_at: new Date('2025-01-09T04:24:34.790Z'),
                updated_at: new Date('2025-01-09T04:24:34.790Z'),
                product: {
                    id: 'product-1',
                    name: 'Product 1',
                    price: '10.00',
                    description: 'A sample product',
                    banner: 'product1.jpg',
                    category_id: '1',
                    created_at: new Date('2025-01-09T04:24:34.790Z'),
                    updated_at: new Date('2025-01-09T04:24:34.790Z'),
                },
                order: {
                    id: mockOrderId,
                    table: 1,
                    status: false,
                    draft: false,
                    name: null,
                    created_at: new Date('2025-01-09T04:24:34.790Z'),
                    updated_at: new Date('2025-01-09T04:24:34.790Z'),
                },
            },
        ];
        jest
            .mocked(prisma_1.default.item.findMany)
            .mockResolvedValueOnce(mockOrderDetails);
        const result = await detailOrderService.execute({ order_id: mockOrderId });
        expect(prisma_1.default.item.findMany).toHaveBeenCalledWith({
            where: { order_id: mockOrderId },
            include: { product: true, order: true },
        });
        expect(result).toEqual(mockOrderDetails);
    });
    it('should return an empty array if no items are found for the order', async () => {
        const mockOrderId = 'non-existent-order-id';
        jest.mocked(prisma_1.default.item.findMany).mockResolvedValueOnce([]);
        const result = await detailOrderService.execute({ order_id: mockOrderId });
        expect(prisma_1.default.item.findMany).toHaveBeenCalledWith({
            where: { order_id: mockOrderId },
            include: { product: true, order: true },
        });
        expect(result).toEqual([]);
    });
});
