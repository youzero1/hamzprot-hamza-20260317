import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Project } from '@/entities/Project';
import { Skill } from '@/entities/Skill';
import { ContactMessage } from '@/entities/ContactMessage';
import path from 'path';

const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : path.resolve(process.cwd(), 'data/portfolio.db');

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: DB_PATH,
    synchronize: true,
    logging: false,
    entities: [Project, Skill, ContactMessage],
  });

  await dataSource.initialize();
  return dataSource;
}
