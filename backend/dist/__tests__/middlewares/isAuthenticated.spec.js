"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthenticated_1 = require("@/middlewares/isAuthenticated");
const jsonwebtoken_1 = require("jsonwebtoken");
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));
describe('isAuthenticated Middleware', () => {
    const mockRequest = () => {
        return {
            headers: {},
        };
    };
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.end = jest.fn().mockReturnValue(res);
        return res;
    };
    const mockNext = jest.fn();
    it('should return 401 if no token is provided', () => {
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext;
        (0, isAuthenticated_1.isAuthenticated)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.end).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 401 if token is invalid', () => {
        const req = mockRequest();
        req.headers.authorization = 'Bearer invalid_token';
        const res = mockResponse();
        const next = mockNext;
        jsonwebtoken_1.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });
        (0, isAuthenticated_1.isAuthenticated)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.end).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
    it('should call next if token is valid', () => {
        const req = mockRequest();
        req.headers.authorization = 'Bearer valid_token';
        const res = mockResponse();
        const next = mockNext;
        jsonwebtoken_1.verify.mockReturnValue({ sub: 'user_id' });
        (0, isAuthenticated_1.isAuthenticated)(req, res, next);
        expect(jsonwebtoken_1.verify).toHaveBeenCalledWith('valid_token', process.env.JWT_SECRET);
        expect(req.user_id).toBe('user_id');
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.end).not.toHaveBeenCalled();
    });
});
