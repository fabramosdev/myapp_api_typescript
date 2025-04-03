import { RolesRepository } from '@roles/repositories/RolesRepository';
import { DeleteRoleUseCase } from './DeleteRoleUseCase';
import { DeleteRoleController } from './DeleteRoleController';

const rolesRepository = RolesRepository.getInstance();
const deleteRolesUseCase = new DeleteRoleUseCase(rolesRepository);
export const deleteRolesController = new DeleteRoleController(deleteRolesUseCase);
