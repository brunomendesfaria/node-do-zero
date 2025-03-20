# node-do-zero
🎥 Video API - Fastify + PostgreSQL (NeonDB)  - https://www.youtube.com/watch?v=hHM-hr9q4mo&amp;t=3980s


Aqui está uma descrição detalhada e profissional para o seu repositório no **GitHub**:

---

# 🎥 Video API - Fastify + PostgreSQL (NeonDB)

Este é um projeto de **API REST** para gerenciamento de vídeos, desenvolvido com **Fastify**, **PostgreSQL** (NeonDB) e **Node.js**. A API permite a criação, listagem, atualização e exclusão de vídeos no banco de dados.

## 🚀 Tecnologias Utilizadas

- **Node.js** (ambiente de execução)
- **Fastify** (framework web rápido e eficiente)
- **PostgreSQL** (banco de dados relacional)
- **NeonDB** (PostgreSQL serverless)
- **ES Modules** (`import/export`)
- **dotenv** (gerenciamento de variáveis de ambiente)

---

## 📌 Funcionalidades

- **[POST] /videos** → Criar um novo vídeo  
- **[GET] /videos** → Listar todos os vídeos  
- **[GET] /videos?search=** → Buscar vídeos por título  
- **[PUT] /videos/:id** → Atualizar um vídeo existente  
- **[DELETE] /videos/:id** → Excluir um vídeo  

---

## 📂 Estrutura do Projeto

```
📦 node-do-zero
 ┣ 📜 server.js            # Configuração do servidor Fastify
 ┣ 📜 database-postgres.js  # Classe para interação com PostgreSQL
 ┣ 📜 app.js               # Configuração da conexão com NeonDB
 ┣ 📜 create-table.js      # Script para criar a tabela no banco de dados
 ┣ 📜 .env                 # Arquivo com variáveis de ambiente
 ┣ 📜 package.json         # Dependências e configurações do projeto
 ┣ 📜 package-lock.json    # Lock das dependências
```

---

## 🔧 Como Executar o Projeto

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2️⃣ Instalar as Dependências
```bash
npm install
```

### 3️⃣ Criar o Arquivo `.env`
Crie um arquivo `.env` na raiz do projeto e adicione sua conexão com o PostgreSQL (NeonDB):

```
DATABASE_URL='postgresql://seu-usuario:senha@servidor-neon.tech/seu-banco?sslmode=require'
```

### 4️⃣ Criar a Tabela no Banco de Dados
```bash
node create-table.js
```

### 5️⃣ Iniciar o Servidor
```bash
npm run dev
```

O servidor estará disponível em **http://localhost:3333** 🚀

---

## 🎯 Exemplos de Requisição

### Criar um Novo Vídeo (POST)
```bash
curl -X POST http://localhost:3333/videos \
-H "Content-Type: application/json" \
-d '{"title": "Meu Vídeo", "description": "Descrição do vídeo", "duration": 300}'
```

### Listar Todos os Vídeos (GET)
```bash
curl -X GET http://localhost:3333/videos
```

### Atualizar um Vídeo (PUT)
```bash
curl -X PUT http://localhost:3333/videos/ID_DO_VIDEO \
-H "Content-Type: application/json" \
-d '{"title": "Título Atualizado", "description": "Nova descrição", "duration": 400}'
```

### Deletar um Vídeo (DELETE)
```bash
curl -X DELETE http://localhost:3333/videos/ID_DO_VIDEO
```

---

## 🛠 Melhorias Futuras

- ✅ Autenticação com JWT 🔐
- ✅ Paginação na listagem de vídeos 📑
- ✅ Upload de thumbnail para cada vídeo 📸
- ✅ Deploy na Vercel/Railway 🚀

---

📌 **Gostou do projeto?** ⭐ Deixe um star no repositório e contribua com melhorias!  
👨‍💻 **Autor:** [Seu Nome](https://github.com/seu-usuario)  

🚀 **Let's Code!** 🎬
