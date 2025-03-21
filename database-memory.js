import { randomUUID } from "node:crypto"
import { serialize } from "node:v8" 
export class DatabaseMemory{
    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries()).map((videoArray)=>{
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id,  
                ...data,
            }
        }).filter(video => {
            if (search){
                return video.title.includes(search)
            }
            return true
        })
     
    }

    create(video) {
        const videoID = randomUUID();
        this.#videos.set(videoID, video);
        return videoID; // Retornando o ID criado
    }
    

    update(id, video) {  
        if (this.#videos.has(id)) {
            const existingVideo = this.#videos.get(id);
            const updatedVideo = { ...existingVideo, ...video }; // Mantém os dados antigos e atualiza os novos
            this.#videos.set(id, updatedVideo);
            return true;
        }
        return false;
    }
    

    delete(id) {
        return this.#videos.delete(id); // Remove o item e retorna um booleano
    }
    

}