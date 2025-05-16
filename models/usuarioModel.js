// models/usuarioModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOME: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    EMAIL: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    SENHA: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ESTADO: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    CIDADE: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    RUA: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    NUMERO: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    DATA_NASCIMENTO: {
        type: DataTypes.DATEONLY, // DATE no MySQL = DATEONLY no Sequelize
        allowNull: false
    }
},
    {
        tableName: 'USUARIO', // Especifica que está referenciando a tabela USUARIO no MySQL
        timestamps: false // Remove os campos createdAt e updatedAt que o Sequelize adiciona por padrão
    });

module.exports = Usuario;