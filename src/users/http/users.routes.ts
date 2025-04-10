import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateUserController } from '@users/useCases/createUser/CreateUserController';
import { createUserValidator, listUsersValidator } from '@users/validators';
import { ListUsersController } from '@users/useCases/listUSers/ListUsersController';

const usersRouter = Router();

const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);

usersRouter.post('/', createUserValidator, (request, response): any => {
  return createUserController.handle(request, response);
});

usersRouter.get('/', listUsersValidator, (request, response): any => {
  return listUsersController.handle(request, response);
});

export { usersRouter };
