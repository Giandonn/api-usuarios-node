const { Usuario } = require('../models/usuarioModel');

// Criar um novo usuário
const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Verifica se já existe um usuário com o mesmo email
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ mensagem: 'Já existe um usuário com este email!' });
        }

        // Criar o usuário
        const novoUsuario = await Usuario.create({ nome, email, senha });

        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(400).json({ mensagem: 'Erro ao cadastrar usuário', erro: err.message });
    }
};

// Listar usuários
const listarUsuarios = async (req, res) => {
    try {
        // Encontrar todos os usuários
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensagem: 'Erro ao listar usuários' });
    }
};

// Atualizar usuário
const putUsuarios = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        // Atualiza os dados do usuário
        await usuario.update({ nome, email, senha });
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro: err.message });
    }
};

// Excluir usuário
const deleteUsuarios = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }

        // Excluir o usuário
        await usuario.destroy();
        res.status(200).json({ mensagem: 'Usuário excluído com sucesso!' });
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao excluir usuário', erro: err.message });
    }
};

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    putUsuarios,
    deleteUsuarios
};
