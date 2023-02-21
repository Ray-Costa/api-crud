import { NextFunction, Request, Response } from 'express';
import { isTokenValid } from '../utils/jwt.verify';
import { AppError } from '../errors';

export const isOwnerOrAdmin = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;
  if (!token) {
    throw new AppError('Token is required', 401);
  }

  const { payload }: any = isTokenValid(token.replace('Bearer ', ''));

  if (payload.role === 'admin') {
    return next();
  } else if (payload.role === 'user' && request.params.id === payload.sub) {
    return next();
  } else {
    throw new AppError('Insufficient Permission', 403);
  }
}
