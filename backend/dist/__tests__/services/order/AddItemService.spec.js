"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/prisma"));
const AddItemService_1 = require("@/services/order/AddItemService");
jest.mock('@/prisma', () => ({
    item: {
        create: jest.fn(),
    },
    order: {
        findFirst: jest.fn(),
    },
}));
describe('AddItemService', () => {
    it('should be able to add an item to an order', async () => {
        const addItemService = new AddItemService_1.AddItemService();
        const mockItem = {
            id: '1',
            order_id: '1',
            product_id: '1',
            amount: 1,
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        };
        jest.mocked(prisma_1.default.order.findFirst).mockResolvedValueOnce({
            id: '1',
            table: 1,
            name: 'John Doe',
            status: false,
            draft: true,
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        });
        jest.mocked(prisma_1.default.item.create).mockResolvedValueOnce(mockItem);
        expect(await addItemService.execute({
            order_id: '1',
            product_id: '1',
            amount: 1,
        })).toEqual(mockItem);
        expect(prisma_1.default.item.create).toHaveBeenCalledWith({
            data: {
                order_id: '1',
                product_id: '1',
                amount: 1,
            },
        });
    });
    it('should not be able to add an item to an order that does not exist', async () => {
        const addItemService = new AddItemService_1.AddItemService();
        jest.mocked(prisma_1.default.order.findFirst).mockResolvedValueOnce(null);
        expect(addItemService.execute({
            order_id: '1',
            product_id: '1',
            amount: 1,
        })).rejects.toThrow('Order not found');
    });
});
