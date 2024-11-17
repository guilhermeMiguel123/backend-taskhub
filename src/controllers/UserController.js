// src/controllers/UserController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');  // Certifique-se de importar o modelo de usuário correto

// Função para login
exports.login = async (req, res) => {
  const { email, password } = req.body;  // Recebe email e senha do corpo da requisição

  try {
    // Verifica se o usuário existe no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se a senha fornecida é correta
    const isPasswordValid = await bcrypt.compare(password, user.password);  // Compara com a senha criptografada
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Se as credenciais forem válidas, cria um token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },  // Informações a serem incluídas no token
      'secret-key',  // Use uma chave secreta segura (não deixe em código fonte em produção)
      { expiresIn: '1h' }  // Define a expiração do token (1 hora)
    );

    // Retorna o token JWT para o frontend
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar o login' });
  }
};

