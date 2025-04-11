import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { secret } from '@config/auth';

type JwtPayloadProps = {
  sub: string;
};

export const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Failed to verify access token', 401);
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decodedToken = verify(token, secret);
    const { sub } = decodedToken as JwtPayloadProps;
    request.user = { id: sub };
    return next();
  } catch (error) {
    throw new AppError(error, 401);
  }
};
