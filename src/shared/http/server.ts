import 'dotenv/config';
import 'reflect-metadata';
import { app } from './app';
import { dataSource } from '../typeorm/index';

dataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}. Data Source SQLite started.`);
  });
});
