"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/prisma"));
const CreateOrderService_1 = require("@/services/order/CreateOrderService");
jest.mock('@/prisma', () => ({
    order: {
        create: jest.fn(),
    },
}));
describe('CreateOrderService', () => {
    it('should be able to create a new order when Table and Name are provided', async () => {
        const createOrderService = new CreateOrderService_1.CreateOrderService();
        const mockOrder = {
            id: '1',
            table: 1,
            name: 'John Doe',
            status: false,
            draft: true,
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        };
        jest.mocked(prisma_1.default.order.create).mockResolvedValueOnce(mockOrder);
        expect(await createOrderService.execute({ table: 1, name: 'John Doe' })).toEqual(mockOrder);
        expect(prisma_1.default.order.create).toHaveBeenCalledWith({
            data: {
                table: 1,
                name: 'John Doe',
            },
        });
    });
    it('should be able to create a new order when Name is not provided', async () => {
        const createOrderService = new CreateOrderService_1.CreateOrderService();
        const mockOrder = {
            id: '1',
            table: 1,
            name: null,
            status: false,
            draft: true,
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        };
        jest.mocked(prisma_1.default.order.create).mockResolvedValueOnce(mockOrder);
        expect(await createOrderService.execute({ table: 1, name: '' })).toEqual(mockOrder);
        expect(prisma_1.default.order.create).toHaveBeenCalledWith({
            data: {
                table: 1,
                name: '',
            },
        });
    });
});
