const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const usuarioRoutes = require('./routes/usuarioRoutes');
const usuarioController = require('./controllers/usuarioController');
const servicoController = require('./controllers/servicoController');

const app = express();

app.use(bodyParser.json());

// Configuração do Sequelize (conexão com o MySQL)
const sequelize = new Sequelize('PROJETO_DATABASE', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao MySQL');
        sequelize.sync()
            .then(() => {
                // console.log('Tabelas sincronizadas');
            })
            .catch(err => console.log('Erro ao sincronizar as tabelas:', err));
    })
    .catch(err => console.log('Erro ao conectar ao MySQL:', err));

app.use(usuarioRoutes);

// Chamando direto aqui para teste
// usuarioController.loginUser();

servicoController.cadastrarServicoDireto();

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});