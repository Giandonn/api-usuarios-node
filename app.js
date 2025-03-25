const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Inicializa o app do Express
const app = express();

// Middleware para parsear o corpo das requisições em JSON
app.use(bodyParser.json());

// Configuração do Sequelize (conexão com o MySQL)
const sequelize = new Sequelize('usuarios', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Teste de conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao MySQL');
        // Sincroniza as tabelas com o banco de dados
        sequelize.sync()
            .then(() => {
                console.log('Tabelas sincronizadas');
            })
            .catch(err => console.log('Erro ao sincronizar as tabelas:', err));
    })
    .catch(err => console.log('Erro ao conectar ao MySQL:', err));

// Usar as rotas de usuário
app.use(usuarioRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});