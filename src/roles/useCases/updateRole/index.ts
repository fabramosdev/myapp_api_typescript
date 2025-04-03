import { RolesRepository } from '@roles/repositories/RolesRepository';
import { UpdateRoleUseCase } from './UpdateRoleUseCase';
import { UpdateRoleController } from './UpdateRoleController';

const rolesRepository = RolesRepository.getInstance();
const updateRolesUseCase = new UpdateRoleUseCase(rolesRepository);
export const updateRolesController = new UpdateRoleController(updateRolesUseCase);
