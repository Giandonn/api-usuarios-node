const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
const cors = require('cors');
const cron = require('node-cron');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFormattedDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function saveBpmAnormal(batimentos, status) {
    sequelize.query(
        'INSERT INTO BATIMENTOS (BPM, USER_ID, CRIADO_EM, STATUS) VALUES (?, ?, ?, ?)',
        {
            // depois pegar do usuario que esta logado
            replacements: [batimentos, 1 /*userId*/, getFormattedDate(), status != null ? status : null],
            type: QueryTypes.INSERT,
        }
    );
}

// cron.schedule('*/1 * * * * *', () => {
//     try {
const randomNumber = getRandomInt(50, 120);
//         let status = null;

//         if (randomNumber > 100) {
//             status = "ACIMA"
//         } else if (randomNumber < 60) {
//             status = "ABAIXO";
//         }

//         if (randomNumber > 100 || randomNumber < 60) {
//             saveBpmAnormal(randomNumber, status);
//         }
//     } catch (e) {
//         console.log('Erro: ', e);
//         return;
//     }

// });

const usuarioRoutes = require('./routes/usuarioRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const batimentosRoutes = require('./routes/batimentosRoutes');

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

// const sequelize = new Sequelize('projeto_database', 'api_user', 'senhaforte123', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

sequelize.authenticate()
    .then(() => {
        console.log('✅ Conectado ao MySQL');
        return sequelize.sync();
    })
    .then(() => {
        console.log('✅ Tabelas sincronizadas');
    })
    .catch(err => console.error(' Erro:', err));

app.use(usuarioRoutes);
app.use(servicoRoutes);
app.use(batimentosRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});