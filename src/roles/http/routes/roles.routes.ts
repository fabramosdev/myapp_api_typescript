import { Router } from 'express';
import {
  createRoleValidator,
  deleteRolesValidator,
  listRolesValidator,
  putRolesValidator,
  showRolesValidator,
} from '@roles/validators';
import { container } from 'tsyringe';
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController';
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController';
import { ShowRoleController } from '@roles/useCases/showRole/ShowRoleController';
import { UpdateRoleController } from '@roles/useCases/updateRole/UpdateRoleController';
import { DeleteRoleController } from '@roles/useCases/deleteRole/DeleteRoleController';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';

const rolesRouter = Router();

const createRolesController = container.resolve(CreateRoleController);
const listRolesController = container.resolve(ListRolesController);
const showRolesController = container.resolve(ShowRoleController);
const updateRolesController = container.resolve(UpdateRoleController);
const deleteRolesController = container.resolve(DeleteRoleController);

/**
 * Auth Middleware for all routes
 */
rolesRouter.use(isAuthenticated);

rolesRouter.post('/', createRoleValidator, (request, response): any => {
  return createRolesController.handle(request, response);
});

rolesRouter.get('/', listRolesValidator, (request, response): any => {
  return listRolesController.handle(request, response);
});

rolesRouter.get('/:id', showRolesValidator, (request, response): any => {
  return showRolesController.handle(request, response);
});

rolesRouter.put('/:id', putRolesValidator, (request, response): any => {
  return updateRolesController.handle(request, response);
});

rolesRouter.delete('/:id', deleteRolesValidator, (request, response): any => {
  return deleteRolesController.handle(request, response);
});

export { rolesRouter };
