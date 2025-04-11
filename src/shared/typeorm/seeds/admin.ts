import { v7 as uuid } from 'uuid';
import { dataSource } from '@shared/typeorm';
import { hash } from 'bcryptjs';

async function create() {
  const connection = await dataSource.initialize();
  /**
   * CREATE ROLE
   */
  const roleId = uuid();
  await connection.query(`
        INSERT INTO roles (id, name)
        values('${roleId}', 'T.I.')
    `);
  /**
   * CREATE USER
   */
  const userId = uuid();
  const password = await hash('12345', 10);
  await connection.query(`
    INSERT INTO users (id, name, email, password, "isAdmin", roleId)
    values('${userId}', 'admin', 'a@a.com', '${password}', true, '${roleId}')
`);

  await connection.destroy();
}

create().then(() => console.log('seed:admin script run successfully'));
