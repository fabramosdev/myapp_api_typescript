import { DataSource } from 'typeorm';
import { Role } from '@roles/entities/Role';
import { User } from '@users/entities/User';
import { RefreshToken } from '@users/entities/RefreshToken';

import { CreateRolesTable1743622486013 } from './migrations/1743622486013-CreateRolesTable';
import { CreateUsersTable1743766327769 } from './migrations/1743766327769-CreateUsersTable';
import { AddRoleIdToUsersTable1743766862153 } from './migrations/1743766862153-AddRoleIdToUsersTable';
import { CreateRefreshTokenTable1745013916536 } from './migrations/1745013916536-CreateRefreshTokenTable';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User, RefreshToken],
  migrations: [
    CreateRolesTable1743622486013,
    CreateUsersTable1743766327769,
    AddRoleIdToUsersTable1743766862153,
    CreateRefreshTokenTable1745013916536,
  ],
});
