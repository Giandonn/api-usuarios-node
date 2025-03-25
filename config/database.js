const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('usuarios', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;