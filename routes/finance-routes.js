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

  // PUT categoria
  server.put('/categorias/:id', async (request, reply) => {
    const { id } = request.params;
    const { nome } = request.body;

    await sql`UPDATE categorias SET nome = ${nome} WHERE id = ${id}`;
    return reply.status(200).send({ message: 'Categoria atualizada com sucesso!' });
  });

  // DELETE categoria (somente se não houver subcategoria)
  server.delete('/categorias/:id', async (request, reply) => {
    const { id } = request.params;

    const subcats = await sql`SELECT 1 FROM subcategorias WHERE categoria_id = ${id} LIMIT 1`;
    if (subcats.length > 0) {
      return reply.status(400).send({ error: 'Não é possível excluir categoria com subcategorias vinculadas.' });
    }

    await sql`DELETE FROM categorias WHERE id = ${id}`;
    return reply.status(204).send();
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

  server.put('/subcategorias/:id', async (request, reply) => {
    const { id } = request.params;
    const { nome, categoria_id } = request.body;

    await sql`
    UPDATE subcategorias
    SET nome = ${nome}, categoria_id = ${categoria_id}
    WHERE id = ${id}
  `;

    return reply.status(200).send({ message: "Subcategoria atualizada com sucesso!" });
  });


  server.delete('/subcategorias/:id', async (request, reply) => {
    const { id } = request.params;

    await sql`DELETE FROM subcategorias WHERE id = ${id}`;

    return reply.status(204).send();
  });


  // PARCEIROS
  server.post('/parceiros', async (request, reply) => {
    const {
      nome, documento, email, telefone, cep,
      logradouro, complemento, bairro, cidade,
      uf, classificacao
    } = request.body;

    const id = crypto.randomUUID();

    await sql`
      INSERT INTO parceiros (
        id, nome, documento, email, telefone, cep,
        logradouro, complemento, bairro, cidade,
        uf, classificacao
      ) VALUES (
        ${id}, ${nome}, ${documento}, ${email}, ${telefone}, ${cep},
        ${logradouro}, ${complemento}, ${bairro}, ${cidade},
        ${uf}, ${classificacao}
      )
    `;

    return reply.status(201).send({ id });
  });

  // PUT - Atualizar parceiro
  server.put('/parceiros/:id', async (request, reply) => {
    const { id } = request.params;
    const {
      nome, documento, email, telefone, cep,
      logradouro, complemento, bairro, cidade,
      uf, classificacao
    } = request.body;

    const result = await sql`
    UPDATE parceiros SET 
      nome = ${nome},
      documento = ${documento},
      email = ${email},
      telefone = ${telefone},
      cep = ${cep},
      logradouro = ${logradouro},
      complemento = ${complemento},
      bairro = ${bairro},
      cidade = ${cidade},
      uf = ${uf},
      classificacao = ${classificacao}
    WHERE id = ${id}
    RETURNING id
  `;

    if (result.length === 0) {
      return reply.status(404).send({ error: 'Parceiro não encontrado.' });
    }

    return reply.status(200).send({ message: 'Parceiro atualizado com sucesso!' });
  });

  // DELETE - Excluir parceiro
  server.delete('/parceiros/:id', async (request, reply) => {
    const { id } = request.params;

    // Verificar se parceiro está vinculado a lançamentos
    const vinculado = await sql`SELECT 1 FROM lancamentos WHERE parceiro_id = ${id} LIMIT 1`;
    if (vinculado.length > 0) {
      return reply.status(400).send({ error: 'Não é possível excluir um parceiro vinculado a lançamentos.' });
    }

    const result = await sql`DELETE FROM parceiros WHERE id = ${id} RETURNING id`;

    if (result.length === 0) {
      return reply.status(404).send({ error: 'Parceiro não encontrado.' });
    }

    return reply.status(204).send();
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
