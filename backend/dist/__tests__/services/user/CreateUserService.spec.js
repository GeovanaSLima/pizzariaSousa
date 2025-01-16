"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/prisma"));
const CreateUserService_1 = require("@/services/user/CreateUserService");
jest.mock('@/prisma', () => ({
    user: {
        findFirst: jest.fn(),
        create: jest.fn(),
    },
}));
describe('CreateUserService', () => {
    it('should throw an error if email is not provided', async () => {
        const createUserService = new CreateUserService_1.CreateUserService();
        await expect(createUserService.execute({
            name: 'John Doe',
            email: '',
            password: 'hashed_password',
        })).rejects.toThrow('Email is required');
        expect(prisma_1.default.user.findFirst).not.toHaveBeenCalled();
        expect(prisma_1.default.user.create).not.toHaveBeenCalled();
    });
    it('should throw an error if the user already exists', async () => {
        const createUserService = new CreateUserService_1.CreateUserService();
        const mockUser = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed_password',
            created_at: new Date("2025-01-09T04:24:34.790Z"),
            updated_at: new Date("2025-01-09T04:24:34.790Z"),
        };
        jest.mocked(prisma_1.default.user.findFirst).mockResolvedValueOnce(mockUser);
        await expect(createUserService.execute({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed_password',
        })).rejects.toThrow('User already exists');
        expect(prisma_1.default.user.findFirst).toHaveBeenCalledWith({
            where: { email: 'john@example.com' },
        });
    });
    it('should create a new user if it does not exist', async () => {
        const createUserService = new CreateUserService_1.CreateUserService();
        const mockUser = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed_password',
            created_at: new Date("2025-01-09T04:24:34.790Z"),
            updated_at: new Date("2025-01-09T04:24:34.790Z"),
        };
        jest.mocked(prisma_1.default.user.findFirst).mockResolvedValueOnce(null);
        jest.mocked(prisma_1.default.user.create).mockResolvedValueOnce(mockUser);
        const result = await createUserService.execute({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed_password',
        });
        expect(result).toEqual(mockUser);
        expect(prisma_1.default.user.findFirst).toHaveBeenCalledWith({
            where: {
                email: 'john@example.com',
            },
        });
        expect(prisma_1.default.user.create).toHaveBeenCalledWith({
            data: {
                name: 'John Doe',
                email: 'john@example.com',
                password: expect.any(String),
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    });
});
