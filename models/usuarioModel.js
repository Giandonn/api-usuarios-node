// models/usuarioModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataNascimento: {
        type: DataTypes.DATEONLY, // DATE no MySQL = DATEONLY no Sequelize
        allowNull: false
    }
},
    {
        tableName: 'USUARIO', // Especifica que está referenciando a tabela USUARIO no MySQL
        timestamps: false // Remove os campos createdAt e updatedAt que o Sequelize adiciona por padrão
    });

module.exports = Usuario;