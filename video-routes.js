import { VideosDB } from '../db/index.js';

export async function videoRoutes(server) {
  server.post('/videos', async (request, reply) => {
    const id = await VideosDB.create(request.body);
    return reply.status(201).send({ id });
  });

  server.get('/videos', async (req) => {
    return await VideosDB.list(req.query.search || '');
  });

  server.put('/videos/:id', async (req, reply) => {
    const updated = await VideosDB.update(req.params.id, req.body);
    return updated
      ? reply.status(200).send({ message: 'Atualizado' })
      : reply.status(404).send({ error: 'Não encontrado' });
  });

  server.delete('/videos/:id', async (req, reply) => {
    const deleted = await VideosDB.delete(req.params.id);
    return deleted
      ? reply.status(204).send()
      : reply.status(404).send({ error: 'Não encontrado' });
  });
}
