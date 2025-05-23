const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

// Criar novo serviço
router.post('/api/servicos', servicoController.postServico);

// Atualizar serviço para atribuir um responsável (usuário logado)
router.put('/api/servicos/:id', servicoController.putServico);

// Listar todos os serviços
router.get('/api/servicos', servicoController.getServicos);

module.exports = router;