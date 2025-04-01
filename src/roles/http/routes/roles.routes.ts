import { Request, Response, Router } from 'express';
import { v7 as uuid } from 'uuid';

const rolesRouter = Router();

const roles = [];

rolesRouter.post('/', (request: Request, response: Response) => {
  const { name } = request.body;
  const role = {
    id: uuid(),
    name,
    created_at: new Date(),
  };

  roles.push(role);

  return response.status(201).json({
    message: 'Role created',
    role,
  });
});

export { rolesRouter };
