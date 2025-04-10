const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const usuarioRoutes = require('./routes/usuarioRoutes');
const usuarioController = require('./controllers/usuarioController');

// Inicializa o app do Express
const app = express();

// Middleware para parsear o corpo das requisições em JSON
app.use(bodyParser.json());

// Configuração do Sequelize (conexão com o MySQL)
const sequelize = new Sequelize('PROJETO_DATABASE', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

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

app.use(usuarioRoutes);

// Chamando direto aqui para teste
usuarioController.loginUser();

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});