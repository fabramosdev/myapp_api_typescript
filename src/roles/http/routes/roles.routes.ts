import { RolesRepository } from '@roles/repositories/RolesRepository';
import { createRolesController } from '@roles/useCases';
import { Request, Response, Router } from 'express';

const rolesRouter = Router();
const rolesRepository = new RolesRepository();

rolesRouter.post('/', (request: Request, response: Response) => {
  return createRolesController.handle(request, response);
});

rolesRouter.get('/', (request: Request, response: Response) => {
  const roles = rolesRepository.findAll();
  return response.status(200).json(roles);
});

export { rolesRouter };
