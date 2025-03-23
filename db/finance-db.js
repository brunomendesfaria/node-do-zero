// db/finance-db.js
import { sql } from '../sql.js';

export const FinanceDB = {
  async createTables() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`CREATE TABLE IF NOT EXISTS categorias (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nome TEXT NOT NULL
    )`;

    await sql`CREATE TABLE IF NOT EXISTS subcategorias (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nome TEXT NOT NULL,
      categoria_id UUID REFERENCES categorias(id)
    )`;

    await sql`CREATE TABLE IF NOT EXISTS parceiros (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nome TEXT NOT NULL,
      classificacao TEXT CHECK (classificacao IN ('cliente', 'fornecedor', 'transportadora'))
    )`;

    await sql`CREATE TABLE IF NOT EXISTS lancamentos (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      tipo TEXT CHECK (tipo IN ('receita', 'despesa')),
      descricao TEXT,
      valor NUMERIC,
      parceiro_id UUID REFERENCES parceiros(id),
      subcategoria_id UUID REFERENCES subcategorias(id),
      quantidade_parcelas INTEGER,
      data_criacao TIMESTAMP DEFAULT now()
    )`;

    await sql`CREATE TABLE IF NOT EXISTS parcelas (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      lancamento_id UUID REFERENCES lancamentos(id),
      numero_parcela INTEGER,
      data_vencimento DATE,
      valor_parcela NUMERIC
    )`;

    console.log("✅ Tabelas criadas com sucesso no banco Neon");
  }
};
