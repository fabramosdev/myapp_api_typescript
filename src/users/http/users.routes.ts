import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateUserController } from '@users/useCases/createUser/CreateUserController';
import { createUserValidator } from '@users/validators';

const usersRouter = Router();

const createUserController = container.resolve(CreateUserController);

usersRouter.post('/', createUserValidator, (request, response): any => {
  return createUserController.handle(request, response);
});

export { usersRouter };
