import { DataSource } from 'typeorm';
import { Role } from '@roles/entities/Role';
import { User } from '@users/entities/User';

import {
  CreateRolesTable1743622486013,
  CreateUsersTable1743766327769,
  AddRoleIdToUsersTable1743766862153,
  CreateRefreshTokenTable1745013916536,
} from './migrations';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User],
  migrations: [
    CreateRolesTable1743622486013,
    CreateUsersTable1743766327769,
    AddRoleIdToUsersTable1743766862153,
    CreateRefreshTokenTable1745013916536,
  ],
});
