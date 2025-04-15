import multer from 'multer';
import uploadConfig from '@config/upload';
import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateUserController } from '@users/useCases/createUser/CreateUserController';
import { createUserValidator, listUsersValidator } from '@users/validators';
import { ListUsersController } from '@users/useCases/listUSers/ListUsersController';
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { UpdateAvatarController } from '@users/useCases/updateAvatar/UpdateAvatarController';

const usersRouter = Router();

const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);
const updateAvatarController = container.resolve(UpdateAvatarController);

const upload = multer(uploadConfig);

usersRouter.post('/', isAuthenticated, createUserValidator, (request, response): any => {
  return createUserController.handle(request, response);
});

usersRouter.get('/', isAuthenticated, listUsersValidator, (request, response): any => {
  return listUsersController.handle(request, response);
});

usersRouter.post('/login', (request, response): any => {
  return createLoginController.handle(request, response);
});

usersRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), (request, response): any => {
  return updateAvatarController.handle(request, response);
});

export { usersRouter };
