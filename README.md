# TaskHub Backend

TaskHub é uma aplicação de gerenciamento de tarefas que oferece funcionalidades de criação, leitura, atualização e exclusão de tarefas, com autenticação via JWT para garantir a segurança das rotas.

---

## **Pré-requisitos**

Antes de começar, você precisará ter o seguinte instalado:

- **Node.js** (versão 14 ou superior)
- **NPM** (vem com o Node.js)
- **PostgreSQL** (instalado e configurado)
- Um editor de código (recomendado: **VS Code**)

---

## **Configuração do Projeto**

### 1. Clone o Repositório
Faça o clone do repositório para sua máquina local:

```bash
git clone <URL_DO_REPOSITÓRIO>
cd TaskHub-backend





### 2. Instale as Dependências
Dentro do diretório do projeto, instale as dependências:

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
Certifique-se de que o PostgreSQL está rodando e crie o banco de dados:

sql
Copiar código
CREATE DATABASE taskhub;
5. Execute as Migrations
Rode as migrations do Sequelize para criar as tabelas no banco:

bash
Copiar código
npx sequelize-cli db:migrate
6. Inicie o Servidor
Para rodar o servidor, execute:

bash
Copiar código
npm start
O servidor será iniciado na porta 5000 (ou na porta configurada no .env), e você verá a seguinte mensagem no console:

yaml
Copiar código
Servidor rodando na porta 5000
Endpoints da API
Autenticação
Login (gera o token JWT)
Método: POST /api/auth/login
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
Tarefas (Rotas Protegidas)
Todas as rotas de tarefas estão protegidas e exigem um token JWT válido. Para obter o token, use a rota de login (/api/auth/login).

Inclua o token JWT no cabeçalho Authorization: Bearer <seu_token> nas requisições.

Criar uma Tarefa

Método: POST /api/tasks
Body:
json
Copiar código
{
  "title": "Título da Tarefa",
  "description": "Descrição da Tarefa"
}
Resposta: Retorna a tarefa criada.
Obter Todas as Tarefas

Método: GET /api/tasks
Resposta: Retorna todas as tarefas do banco.
Atualizar uma Tarefa

Método: PUT /api/tasks/:id
Body:
json
Copiar código
{
  "title": "Novo Título",
  "description": "Nova Descrição",
  "status": true
}
Resposta: Retorna a tarefa atualizada.
Deletar uma Tarefa

Método: DELETE /api/tasks/:id
Resposta: Retorna status 204 (sem conteúdo).
Testando a API
Obter o Token JWT
Faça uma requisição POST para /api/auth/login para obter o token JWT.
No corpo da requisição, passe as credenciais do usuário:
json
Copiar código
{
  "username": "usuario",
  "password": "senha"
}
O retorno será um token JWT que deve ser incluído nas requisições subsequentes.
Usar o Token JWT nas Rotas Protegidas
Para acessar as rotas de tarefas, inclua o token JWT no cabeçalho da requisição:

http
Copiar código
Authorization: Bearer <seu_token>
Estrutura do Projeto
Abaixo está a estrutura do projeto:

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
