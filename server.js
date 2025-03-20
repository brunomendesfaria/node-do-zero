import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    const videoID = await database.create({
        title,
        description, 
        duration
    });

    return reply.status(201).send({ id: videoID });
});

server.get('/videos', async (request, reply) => {
    const search = request.query.search || "";
    console.log(search);
    const videos = await database.list(search);

    return reply.send(videos);
});

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id 
    const { title, description, duration } = request.body;

    const updated = database.update(videoId, { title, description, duration });

    if (!updated) {
        return reply.status(404).send({ error: "Video not found" });
        console.log(updated)
    }

    return reply.status(204).send()// Enviando a resposta corretamente
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