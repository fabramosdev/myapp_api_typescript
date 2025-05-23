import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
// import path from 'node:path';
import { errors } from 'celebrate';
import swaggerUI from 'swagger-ui-express';
import { routes } from './routes';
import { AppError } from '@shared/errors/AppError';
import swaggerFile from '../../swagger.json';
import '@shared/container';
import uploadConfig from '@config/upload';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);
app.use(errors());
app.use((error: Error, request: Request, response: Response, next: NextFunction): any => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log(error);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
  next(); /** <== Verify Behavior */
});

export { app };
