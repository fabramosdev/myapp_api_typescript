import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { secret } from '@config/auth';

export const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Failed to verify access token', 401);
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    verify(token, secret);
    return next();
  } catch (error) {
    throw new AppError(error, 401);
  }
};
