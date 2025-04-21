import multer from 'multer';
import { Router } from 'express';
import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import {
  createUserValidator,
  listUsersValidator,
  refreshTokenValidator,
  updateProfileValidator,
} from '@users/validators';

import { CreateUserController } from '@users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController';
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController';
import { UpdateAvatarController } from '@users/useCases/updateAvatar/UpdateAvatarController';
import { ShowProfileController } from '@users/useCases/showProfile/ShowProfileController';
import { UpdateProfileController } from '@users/useCases/updateProfile/UpdateProfileController';
import { CreateAccessAndRefreshTokenController } from '@users/useCases/createAccessAndRefreshToken/CreateAccessAndRefreshTokenController';
import { addUserInfoToRequest } from './middlewares/addUserInfoToRequest';

const usersRouter = Router();

const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);
const updateAvatarController = container.resolve(UpdateAvatarController);
const showProfileController = container.resolve(ShowProfileController);
const updateProfileController = container.resolve(UpdateProfileController);
const createAccessAndRefreshTokenController = container.resolve(
  CreateAccessAndRefreshTokenController,
);

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

usersRouter.post(
  '/refresh_token',
  addUserInfoToRequest,
  refreshTokenValidator,
  (request, response): any => {
    return createAccessAndRefreshTokenController.handle(request, response);
  },
);

usersRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), (request, response): any => {
  return updateAvatarController.handle(request, response);
});

usersRouter.get('/profile', isAuthenticated, (request, response): any => {
  return showProfileController.handle(request, response);
});

usersRouter.put('/profile', isAuthenticated, updateProfileValidator, (request, response): any => {
  return updateProfileController.handle(request, response);
});

export { usersRouter };
