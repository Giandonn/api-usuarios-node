const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

router.post('/api/servico', servicoController.cadastrarServico);

module.exports = router;