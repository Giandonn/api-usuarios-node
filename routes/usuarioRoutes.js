const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/api/usuarios', usuarioController.cadastrarUsuario);
router.get('/api/usuarios', usuarioController.listarUsuarios);
router.put('/api/usuarios/:id', usuarioController.putUsuarios);
router.delete('/api/usuarios/:id', usuarioController.deleteUsuarios);

module.exports = router;