import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { financeRoutes } from './routes/finance-routes.js';
import { videoRoutes } from './routes/video-routes.js';
import { FinanceDB } from './db/index.js';

const server = fastify();

await FinanceDB.createTables();

await server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

await server.register(videoRoutes);
await server.register(financeRoutes);

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333
});