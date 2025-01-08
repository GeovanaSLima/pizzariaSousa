import { isAuthenticated } from '../../main/middlewares/isAuthenticated';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('isAuthenticated Middleware', () => {
  const mockRequest = () => {
    return {
      headers: {},
    } as Partial<Request>;
  };

  const mockResponse = () => {
    const res = {} as Partial<Response>;
    res.status = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = jest.fn();

  it('should return 401 if no token is provided', () => {
    const req = mockRequest() as Request;
    const res = mockResponse() as Response;
    const next = mockNext;

    isAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.end).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    const req = mockRequest() as Request;
    req.headers.authorization = 'Bearer invalid_token';

    const res = mockResponse() as Response;
    const next = mockNext;

    (verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    isAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.end).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if token is valid', () => {
    const req = mockRequest() as Request;
    req.headers.authorization = 'Bearer valid_token';

    const res = mockResponse() as Response;
    const next = mockNext;

    (verify as jest.Mock).mockReturnValue({ sub: 'user_id' });

    isAuthenticated(req, res, next);

    expect(verify).toHaveBeenCalledWith('valid_token', process.env.JWT_SECRET);
    expect(req.user_id).toBe('user_id');
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.end).not.toHaveBeenCalled();
  });
});
