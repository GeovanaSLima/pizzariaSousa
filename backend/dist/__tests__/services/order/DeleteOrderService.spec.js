"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/prisma"));
const DeleteOrderService_1 = require("@/services/order/DeleteOrderService");
jest.mock('@/prisma', () => ({
    order: {
        delete: jest.fn(),
    },
}));
describe('DeleteOrderService', () => {
    it('should be able to delete an order', async () => {
        const deleteOrderService = new DeleteOrderService_1.DeleteOrderService();
        const mockOrder = {
            id: '1',
            table: 1,
            name: 'John Doe',
            status: false,
            draft: true,
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        };
        jest.mocked(prisma_1.default.order.delete).mockResolvedValueOnce(mockOrder);
        expect(await deleteOrderService.execute({ order_id: '1' })).toEqual(mockOrder);
        expect(prisma_1.default.order.delete).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });
});
