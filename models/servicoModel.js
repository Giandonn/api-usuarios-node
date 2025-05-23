const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuarioModel');

const Servico = sequelize.define('Servico', {
    sequencia: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    atribuiu_para_usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'SERVICO',
    timestamps: false
});

// Associações
Servico.belongsTo(Usuario, { as: 'criador', foreignKey: 'usuario_id' });
Servico.belongsTo(Usuario, { as: 'responsavel', foreignKey: 'atribuiu_para_usuario_id' });

module.exports = Servico;