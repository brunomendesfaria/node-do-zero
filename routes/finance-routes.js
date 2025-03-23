// finance-routes.js
import { randomUUID } from 'node:crypto';
import { sql } from '../sql.js';

export async function financeRoutes(server) {
  // CATEGORIAS
  server.post('/categorias', async (request, reply) => {
    const { nome } = request.body;
    await sql`INSERT INTO categorias (id, nome) VALUES (${randomUUID()}, ${nome})`;
    return reply.status(201).send();
  });

  server.get('/categorias', async () => {
    const categorias = await sql`SELECT * FROM categorias`;
    return categorias;
  });

  // SUBCATEGORIAS
  server.post('/subcategorias', async (request, reply) => {
    const { nome, categoria_id } = request.body;
    await sql`INSERT INTO subcategorias (id, nome, categoria_id) VALUES (${randomUUID()}, ${nome}, ${categoria_id})`;
    return reply.status(201).send();
  });

server.get('/subcategorias', async (req, reply) => {
  const result = await sql`
    SELECT 
      sub.id,
      sub.nome,
      sub.categoria_id,
      cat.nome AS categoria_nome
    FROM subcategorias sub
    JOIN categorias cat ON sub.categoria_id = cat.id
  `;

  return reply.send(result);
});

  // PARCEIROS
  server.post('/parceiros', async (request, reply) => {
    const { nome, classificacao } = request.body;
    await sql`INSERT INTO parceiros (id, nome, classificacao) VALUES (${randomUUID()}, ${nome}, ${classificacao})`;
    return reply.status(201).send();
  });

  server.get('/parceiros', async () => {
    const parceiros = await sql`SELECT * FROM parceiros`;
    return parceiros;
  });

  // LANÇAMENTOS
  server.post('/lancamentos', async (request, reply) => {
    const {
      tipo,
      descricao,
      valor,
      parceiro_id,
      subcategoria_id,
      quantidade_parcelas,
      vencimentos, // array de datas
      valores // array de valores
    } = request.body;

    const lancamentoId = randomUUID();

    await sql`
      INSERT INTO lancamentos (
        id, tipo, descricao, valor, parceiro_id, subcategoria_id, quantidade_parcelas
      )
      VALUES (
        ${lancamentoId}, ${tipo}, ${descricao}, ${valor}, ${parceiro_id}, ${subcategoria_id}, ${quantidade_parcelas}
      )
    `;

    for (let i = 0; i < quantidade_parcelas; i++) {
      await sql`
        INSERT INTO parcelas (
          id, lancamento_id, numero_parcela, data_vencimento, valor_parcela
        ) VALUES (
          ${randomUUID()}, ${lancamentoId}, ${i + 1}, ${vencimentos[i]}, ${valores[i]}
        )
      `;
    }

    return reply.status(201).send({ message: 'Lançamento criado com sucesso!' });
  });

  server.get('/lancamentos', async () => {
    const dados = await sql`
      SELECT l.*, p.nome as parceiro, s.nome as subcategoria, c.nome as categoria
      FROM lancamentos l
      LEFT JOIN parceiros p ON l.parceiro_id = p.id
      LEFT JOIN subcategorias s ON l.subcategoria_id = s.id
      LEFT JOIN categorias c ON s.categoria_id = c.id
    `;
    return dados;
  });
}
