import { DataSource } from 'typeorm';
import { Role } from '@roles/entities/Role';
import { CreateRolesTable1743622486013, CreateUsersTable1743766327769 } from './migrations';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role],
  migrations: [CreateRolesTable1743622486013, CreateUsersTable1743766327769],
});
