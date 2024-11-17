const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const cors = require('cors'); 
const taskRoutes = require('./routes/taskRoutes'); // Importa as rotas de tarefas


dotenv.config();  // Carrega variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 5000; // Define a porta do servidor

// Conexão com o banco de dados
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,  // Desativa o log de SQL
});

// Configuração do CORS para permitir requisições do frontend
app.use(cors({
  origin: "http://localhost:8080",  // Permite acesso do frontend (localhost:8080)
}));

// Middleware para processamento de JSON
app.use(express.json());


// Autenticação da conexão com o banco de dados e sincronização de modelos
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync();  // Sincroniza os modelos com o banco
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

// Rota principal (opcional, apenas para testar se a API está funcionando)
app.get('/', (req, res) => {
  res.send('API do TaskHub está funcionando!');
});

// Usando as rotas de tarefas que você importou do arquivo taskRoutes.js
app.use('/api/tasks', taskRoutes);  // Aqui você inclui as rotas para tarefas definidas em outro arquivo

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
