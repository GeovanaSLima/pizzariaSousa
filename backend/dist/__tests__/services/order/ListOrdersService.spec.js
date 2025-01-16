"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/prisma"));
const ListOrdersService_1 = require("@/services/order/ListOrdersService");
jest.mock('@/prisma', () => ({
    order: {
        findMany: jest.fn(),
    },
}));
describe('ListOrdersService', () => {
    it('should be able to list all orders', async () => {
        const listOrdersService = new ListOrdersService_1.ListOrdersService();
        const mockOrders = [
            {
                id: '1',
                table: 1,
                name: 'John Doe',
                status: false,
                draft: false,
                created_at: new Date('2025-01-09T04:24:34.790Z'),
                updated_at: new Date('2025-01-09T04:24:34.790Z'),
            },
        ];
        jest.mocked(prisma_1.default.order.findMany).mockResolvedValue(mockOrders);
        expect(await listOrdersService.execute()).toEqual(mockOrders);
        expect(prisma_1.default.order.findMany).toHaveBeenCalledWith({
            where: {
                draft: false,
                status: false,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
    });
});
