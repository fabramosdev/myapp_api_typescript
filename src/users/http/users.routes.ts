import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateUserController } from '@users/useCases/createUser/CreateUserController';
import { createUserValidator, listUsersValidator } from '@users/validators';
import { ListUsersController } from '@users/useCases/listUSers/ListUsersController';
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController';

const usersRouter = Router();

const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);

usersRouter.post('/', createUserValidator, (request, response): any => {
  return createUserController.handle(request, response);
});

usersRouter.get('/', listUsersValidator, (request, response): any => {
  return listUsersController.handle(request, response);
});

usersRouter.post('/login', (request, response): any => {
  return createLoginController.handle(request, response);
});

export { usersRouter };
