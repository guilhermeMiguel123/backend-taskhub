// src/routes/taskRoutes.js

const express = require('express');
const router = express.Router();  // Criando o roteador para agrupar as rotas
const TaskController = require('../controllers/TaskController'); // Certifique-se de que o caminho está correto

// Definindo as rotas
router.post('/', TaskController.createTask);  // Rota para criar uma tarefa
router.get('/', TaskController.getTasks);    // Rota para obter todas as tarefas
router.put('/:id', TaskController.updateTask); // Rota para atualizar uma tarefa
router.delete('/:id', TaskController.deleteTask); // Rota para deletar uma tarefa

module.exports = router; // Exportando as rotas
// src/controllers/TaskController.js

const { Task } = require('../models/Task');  // Certifique-se de que o modelo Task está corretamente configurado

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body; // Obtém o título da tarefa
    if (!title) {
      return res.status(400).json({ message: 'Título da tarefa é obrigatório!' });
    }
    const newTask = await Task.create({ title }); // Cria a nova tarefa no banco
    res.status(201).json(newTask); // Retorna a tarefa criada
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a tarefa', error: error.message });
  }
};

// Obter todas as tarefas
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll(); // Busca todas as tarefas no banco
    res.status(200).json(tasks); // Retorna as tarefas
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar as tarefas', error: error.message });
  }
};

// Atualizar uma tarefa
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    task.title = title;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a tarefa', error: error.message });
  }
};

// Deletar uma tarefa
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    await task.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a tarefa', error: error.message });
  }
};
