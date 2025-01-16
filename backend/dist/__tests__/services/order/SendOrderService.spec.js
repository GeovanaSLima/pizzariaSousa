"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/prisma"));
const SendOrderService_1 = require("@/services/order/SendOrderService");
jest.mock('@/prisma', () => ({
    order: {
        findUnique: jest.fn(),
        update: jest.fn(),
    },
}));
describe('SendOrderService', () => {
    let sendOrderService;
    beforeEach(() => {
        sendOrderService = new SendOrderService_1.SendOrderService();
    });
    it('should throw an error if the order is not found', async () => {
        const mockOrderId = 'non-existent-order-id';
        jest.mocked(prisma_1.default.order.findUnique).mockResolvedValueOnce(null);
        await expect(sendOrderService.execute({ order_id: mockOrderId })).rejects.toThrow('Order not found');
        expect(prisma_1.default.order.findUnique).toHaveBeenCalledWith({
            where: { id: mockOrderId },
        });
        expect(prisma_1.default.order.update).not.toHaveBeenCalled();
    });
    it('should update the order if it exists', async () => {
        const mockOrderId = '1';
        const mockOrder = {
            id: mockOrderId,
            table: 1,
            name: 'John Doe',
            status: false,
            draft: true,
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        };
        jest.mocked(prisma_1.default.order.findUnique).mockResolvedValueOnce(mockOrder);
        jest
            .mocked(prisma_1.default.order.update)
            .mockResolvedValueOnce({ ...mockOrder, draft: false });
        const result = await sendOrderService.execute({ order_id: mockOrderId });
        expect(prisma_1.default.order.findUnique).toHaveBeenCalledWith({
            where: { id: mockOrderId },
        });
        expect(prisma_1.default.order.update).toHaveBeenCalledWith({
            where: { id: mockOrderId },
            data: { draft: false },
        });
        expect(result).toEqual({ ...mockOrder, draft: false });
    });
});
