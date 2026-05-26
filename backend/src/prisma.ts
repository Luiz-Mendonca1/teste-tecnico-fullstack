import { PrismaClient } from '@prisma/client';
import { PrismaSQLite } from '@prisma/adapter-sqlite';
import Database from 'better-sqlite3';
import path from 'path';

const sqlite = new Database(path.resolve(__dirname, '../prisma/dev.db'));
const adapter = new PrismaSQLite(sqlite);

export const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
});