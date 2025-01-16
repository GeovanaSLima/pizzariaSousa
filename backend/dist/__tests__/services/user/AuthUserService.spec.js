"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("@/prisma"));
const AuthUserService_1 = require("@/services/user/AuthUserService");
const bcrypt = __importStar(require("bcryptjs"));
jest.mock('@/prisma', () => ({
    user: {
        findFirst: jest.fn(),
    },
}));
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));
jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
}));
describe('AuthUserService', () => {
    it('should throw an error if email does not exist', async () => {
        const authUserService = new AuthUserService_1.AuthUserService();
        jest.mocked(prisma_1.default.user.findFirst).mockResolvedValueOnce(null);
        await expect(authUserService.execute({
            email: 'john@example.com',
            password: 'hashed_password',
        })).rejects.toThrow('User/password incorrect');
        expect(prisma_1.default.user.findFirst).toHaveBeenCalledWith({
            where: {
                email: 'john@example.com',
            },
        });
        expect(jsonwebtoken_1.sign).not.toHaveBeenCalled();
    });
    it('should throw an error if password does not match', async () => {
        const authUserService = new AuthUserService_1.AuthUserService();
        const mockUser = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed_password',
            created_at: new Date("2025-01-09T04:24:34.790Z"),
            updated_at: new Date("2025-01-09T04:24:34.790Z"),
        };
        jest.mocked(prisma_1.default.user.findFirst).mockResolvedValueOnce(mockUser);
        jest.mocked(bcrypt.compare).mockImplementation(async () => false);
        await expect(authUserService.execute({
            email: 'john@example.com',
            password: 'wrong_password',
        })).rejects.toThrow('User/password incorrect');
        expect(prisma_1.default.user.findFirst).toHaveBeenCalledWith({
            where: {
                email: 'john@example.com',
            },
        });
        expect(jsonwebtoken_1.sign).not.toHaveBeenCalled();
    });
    it('should return a token if email and password match', async () => {
        const authUserService = new AuthUserService_1.AuthUserService();
        const mockUser = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed_password',
            created_at: new Date("2025-01-09T04:24:34.790Z"),
            updated_at: new Date("2025-01-09T04:24:34.790Z"),
        };
        jest.mocked(prisma_1.default.user.findFirst).mockResolvedValueOnce(mockUser);
        jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
        jest.mocked(jsonwebtoken_1.sign).mockReturnValueOnce('token');
        const result = await authUserService.execute({
            email: 'john@example.com',
            password: 'hashed_password',
        });
        expect(result).toEqual({
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            token: 'token',
        });
        expect(prisma_1.default.user.findFirst).toHaveBeenCalledWith({
            where: {
                email: 'john@example.com',
            },
        });
        expect(jsonwebtoken_1.sign).toHaveBeenCalledWith({
            name: mockUser.name,
            email: mockUser.email,
        }, process.env.JWT_SECRET, {
            subject: mockUser.id,
            expiresIn: '30d',
        });
    });
});
