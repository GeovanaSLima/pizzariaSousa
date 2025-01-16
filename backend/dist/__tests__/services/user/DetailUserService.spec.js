"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DetailUserService_1 = require("@/services/user/DetailUserService");
const prisma_1 = __importDefault(require("@/prisma"));
jest.mock('@/prisma', () => ({
    user: {
        findFirst: jest.fn(),
    },
}));
describe('DetailUserService', () => {
    it('should return user information based on the user_id sent', async () => {
        const detailUserService = new DetailUserService_1.DetailUserService();
        const mockUser = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed_password',
            created_at: new Date('2025-01-09T04:24:34.790Z'),
            updated_at: new Date('2025-01-09T04:24:34.790Z'),
        };
        jest.mocked(prisma_1.default.user.findFirst).mockResolvedValueOnce(mockUser);
        const result = await detailUserService.execute(mockUser.id);
        expect(result).toEqual(mockUser);
        expect(prisma_1.default.user.findFirst).toHaveBeenCalledWith({
            where: {
                id: '1',
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    });
});
