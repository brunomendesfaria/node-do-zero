import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';
import cors from '@fastify/cors';
import { financeRoutes } from './financeroutes.js';

await server.register(financeRoutes);


const server = fastify();
const database = new DatabasePostgres();

await database.createTables(); // ✅ Cria as tabelas se não existirem

// ✅ Se já estiver registrado, não tente registrar de novo!
if (!server.hasDecorator('corsPreflightEnabled')) {
  await server.register(cors, {
    origin: '*', // Ou use 'https://frontend-videos.onrender.com' para maior segurança
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // ✅ Certifique-se de incluir DELETE aqui
  });
}
 
server.post('/videos', async (request, reply) => {
    const { title, description, duration, gerero } = request.body;

    const videoID = await database.create({
        title,
        description, 
        duration
    });

    return reply.status(201).send({ id: videoID });
});

server.get('/videos', async (request, reply) => {
    const search = request.query.search || "";
    const videos = await database.list(search);
    return reply.send(videos);
  });
  

  server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration,genero } = request.body;

    const updated = await database.update(videoId, { title, description, duration, genero }); // 🔥 Adicionando await

    if (!updated) {
        return reply.status(404).send({ error: "Vídeo não encontrado" });
    }

    return reply.status(200).send({ message: "Vídeo atualizado com sucesso!" });
});


server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id;

    const deleted = database.delete(videoId);

    if (!deleted) {
        return reply.status(404).send({ error: "Video not found" });
    }

    return reply.status(204).send()// Corrigido para chamar `send()`
});
 
server.listen({
    host: '0.0.0.0',
    port: process.env.port ?? 3333,
})