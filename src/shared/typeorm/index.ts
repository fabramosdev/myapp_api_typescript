import { DataSource } from 'typeorm';
import { CreateRolesTable1743622486013 } from './migrations/1743622486013-CreateRolesTable';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [],
  migrations: [CreateRolesTable1743622486013],
});
