const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const servicoRoutes = require('./routes/servicoRoutes');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());

// Configuração do Sequelize
const sequelize = new Sequelize('PROJETO_DATABASE', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log('✅ Conectado ao MySQL');
        return sequelize.sync();
    })
    .then(() => {
        console.log('✅ Tabelas sincronizadas');
    })
    .catch(err => console.error('❌ Erro:', err));

// Rotas
app.use(usuarioRoutes);
app.use(servicoRoutes);

// Porta
const port = 3000;
app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});