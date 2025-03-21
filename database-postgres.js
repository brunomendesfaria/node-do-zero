import { randomUUID } from "node:crypto" 
import { sql } from './sql.js'

export class DatabasePostgres {

    async list(search){

        let videos 

        if(search){
          videos = await sql`select * from videos where title ilike ${'%'+search+'%'}`
        } else {
            videos = await sql `select * from videos`
        }
        return videos

    }
  
    async create (video){
        const videoId = randomUUID()
        const {title, description, duration} = video

        await sql `insert into videos (id, title, description, duration) values (${videoId}, ${title}, ${description}, ${duration})`

        

    }

    async update(id, video) {
        const { title, description, duration } = video;
    
        const result = await sql`
            UPDATE videos 
            SET title = ${title}, 
                description = ${description}, 
                duration = ${duration}
            WHERE id = ${id}
            RETURNING id
        `;
    
        return result.length > 0; // Retorna `true` se encontrou e atualizou
    }
    

    async delete(id) {
        const result = await sql`
            DELETE FROM videos 
            WHERE id = ${id}
            RETURNING id
        `;
    
        return result.length > 0; // Retorna `
    }
    
}