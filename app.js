const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Middleware para parsear o corpo das requisições em JSON
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/usuarios', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

app.use(usuarioRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});