import { PrismaClient } from '@/app/generated/prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // More logs for debugging
});

console.log('prisma.ts: PrismaClient instance created');

export { prisma };