import { RolesRepository } from '@roles/repositories/RolesRepository';
import { ShowRoleUseCase } from './ShowRoleUseCase';
import { ShowRoleController } from './ShowRoleController';

const rolesRepository = RolesRepository.getInstance();
const showRolesUseCase = new ShowRoleUseCase(rolesRepository);
export const showRolesController = new ShowRoleController(showRolesUseCase);
