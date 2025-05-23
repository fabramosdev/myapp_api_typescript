import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { jwt } from '@config/auth';

type JwtPayloadProps = {
  sub: string;
};

export const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    });
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    });
  }

  try {
    const decodedToken = verify(token, jwt.secret);
    const { sub } = decodedToken as JwtPayloadProps;
    request.user = { id: sub };
    return next();
  } catch {
    return response.status(401).json({
      error: true,
      code: 'token.expired',
      message: 'Access token not present',
    });
  }
};
