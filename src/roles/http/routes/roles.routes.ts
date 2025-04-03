import { createRolesController } from '@roles/useCases/createRole';
import { deleteRolesController } from '@roles/useCases/deleteRole';
import { listRolesController } from '@roles/useCases/listRoles';
import { showRolesController } from '@roles/useCases/showRole';
import { updateRolesController } from '@roles/useCases/updateRole';
import { Router } from 'express';
import {
  createRoleValidator,
  deleteRolesValidator,
  listRolesValidator,
  putRolesValidator,
  showRolesValidator,
} from '@roles/validators';

const rolesRouter = Router();

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
