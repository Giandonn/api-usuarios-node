const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    }
});

// Remover o campo __v da resposta JSON
usuarioSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;  // Remove o campo __v
        return ret;
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;