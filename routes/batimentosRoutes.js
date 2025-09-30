const express = require('express');
const router = express.Router();
const batimentosController = require('../controllers/batimentosController');

router.get('/api/batimentos/:id', batimentosController.getBatimentosByUser);

module.exports = router;