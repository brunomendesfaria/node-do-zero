// db/videos-db.js
import { randomUUID } from 'node:crypto';
import { sql } from '../routes/sql.js';

export const VideosDB = {
  async list(search) {
    if (search) {
      return await sql`SELECT * FROM videos WHERE title ILIKE ${'%' + search + '%'}`;
    } else {
      return await sql`SELECT * FROM videos`;
    }
  },

  async create(video) {
    const id = randomUUID();
    const { title, description, duration, genero } = video;

    await sql`
      INSERT INTO videos (id, title, description, duration, genero)
      VALUES (${id}, ${title}, ${description}, ${duration}, ${genero})
    `;

    return id;
  },

  async update(id, video) {
    const { title, description, duration, genero } = video;

    const result = await sql`
      UPDATE videos
      SET title = ${title},
          description = ${description},
          duration = ${duration},
          genero = ${genero}
      WHERE id = ${id}
      RETURNING id
    `;

    return result.length > 0;
  },

  async delete(id) {
    const result = await sql`
      DELETE FROM videos WHERE id = ${id} RETURNING id
    `;
    return result.length > 0;
  }
};
