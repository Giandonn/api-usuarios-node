const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('PROJETO_DATABASE', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// const sequelize = new Sequelize('projeto_database', 'api_user', 'senhaforte123', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

module.exports = sequelize;