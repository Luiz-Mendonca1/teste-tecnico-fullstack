// Define o engine type antes de carregar o Prisma, para evitar valores inválidos.
process.env.PRISMA_CLIENT_ENGINE_TYPE = 'library';

const { PrismaClient } = require('@prisma/client');

// Usa a configuração gerada pelo Prisma (client) e a variável DATABASE_URL em .env
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
