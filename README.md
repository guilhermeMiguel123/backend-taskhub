Documentação do Backend - TaskHub
Bem-vindo à documentação do backend do TaskHub! Este guia explica como configurar, executar e testar o backend para que ele funcione perfeitamente em sua máquina.

Pré-requisitos
Antes de começar, certifique-se de que você possui os seguintes itens instalados em sua máquina:

Node.js (versão 14 ou superior)
NPM (vem com o Node.js)
PostgreSQL (instalado e configurado)
Um editor de texto (recomendado: VS Code)
Passo a Passo para Configuração
1. Clone o Repositório
Faça o clone do repositório para sua máquina local:

bash
Copiar código
git clone <URL_DO_REPOSITÓRIO>
cd TaskHub-backend
2. Instale as Dependências
No diretório do projeto, execute:

bash
Copiar código
npm install
3. Configure o Arquivo .env
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env
Copiar código
DATABASE_URL=postgres://<SEU_USUÁRIO>:<SUA_SENHA>@localhost:5432/taskhub
JWT_SECRET=uma_chave_secreta_segura
DATABASE_URL: Configure com o usuário, senha e banco de dados do PostgreSQL.
JWT_SECRET: Defina uma chave secreta para o JWT (use uma string complexa para segurança).
4. Configure o Banco de Dados
Certifique-se de que o PostgreSQL está rodando. Crie um banco de dados chamado taskhub:

sql
Copiar código
CREATE DATABASE taskhub;
5. Execute as Migrations
Rode as migrations do Sequelize para criar as tabelas no banco:

bash
Copiar código
npx sequelize-cli db:migrate
6. Inicie o Servidor
Inicie o servidor Node.js:

bash
Copiar código
npm start
O servidor será iniciado na porta 5000 (ou a porta definida no .env):

yaml
Copiar código
Servidor rodando na porta 5000
Endpoints da API
1. Autenticação
Login (gera o token JWT):
Rota: POST /api/auth/login
Body (exemplo):
json
Copiar código
{
  "username": "usuario",
  "password": "senha"
}
Resposta:
json
Copiar código
{
  "token": "seu_token_jwt_aqui"
}
2. Tarefas (Rotas Protegidas)
Inclua o token JWT no cabeçalho Authorization: Bearer <seu_token> para acessar as rotas abaixo:

Criar uma Tarefa:

Rota: POST /api/tasks
Body:
json
Copiar código
{
  "title": "Título da Tarefa",
  "description": "Descrição da Tarefa"
}
Resposta: Retorna a tarefa criada.
Obter Todas as Tarefas:

Rota: GET /api/tasks
Resposta: Retorna todas as tarefas do banco.
Atualizar uma Tarefa:

Rota: PUT /api/tasks/:id
Body:
json
Copiar código
{
  "title": "Novo Título",
  "description": "Nova Descrição",
  "status": true
}
Resposta: Retorna a tarefa atualizada.
Deletar uma Tarefa:

Rota: DELETE /api/tasks/:id
Resposta: Retorna status 204 (sem conteúdo).
Testando a API
Use ferramentas como Postman, Insomnia, ou qualquer cliente HTTP para testar as rotas da API.

Configuração do Token JWT
Faça login em POST /api/auth/login para obter um token JWT.
Use o token JWT no cabeçalho das requisições protegidas:
makefile
Copiar código
Authorization: Bearer <seu_token>
Estrutura do Projeto
plaintext
Copiar código
TaskHub-backend/
├── controllers/       # Lógica das rotas (TaskController, AuthController)
├── middleware/        # Middleware de autenticação
├── models/            # Modelos Sequelize (User, Task)
├── routes/            # Rotas da API (taskRoutes, authRoutes)
├── migrations/        # Arquivos de migração do Sequelize
├── .env               # Variáveis de ambiente (não enviado ao repositório)
├── app.js             # Configuração principal do servidor
├── package.json       # Dependências do Node.js
└── README.md          # Documentação do projeto
#   T a s k h u b - b a c k e n d  
 