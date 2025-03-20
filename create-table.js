import "dotenv/config"; // Substitui require("dotenv").config()
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function createTable() {
  try {
    await sql`DROP TABLE IF EXISTS videos CASCADE;`;

    await sql`CREATE TABLE videos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      duration INT NOT NULL CHECK (duration > 0)
    );`;

    console.log("Tabela recriada com sucesso!");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  }
} 