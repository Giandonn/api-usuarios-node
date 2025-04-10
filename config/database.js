const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('PROJETO_DATABASE', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;