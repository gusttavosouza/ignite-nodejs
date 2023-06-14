import fastify from 'fastify';
import { PrismaClient } from 'prisma/prisma-client';

export const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: 'Gustavo Roberto de Souza',
    email: 'gustavorobertotb@outlook.com',
  },
});
