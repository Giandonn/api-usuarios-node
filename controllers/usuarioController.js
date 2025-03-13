const Usuario = require('../models/usuarioModel');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const novoUsuario = new Usuario({ nome, email, senha });
        await novoUsuario.save();
        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(400).json({ mensagem: 'Erro ao cadastrar usuário', erro: err.message });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (err) {
        console.log(err);
        return;
    }
};

const putUsuarios = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        if (nome) usuario.nome = nome;
        if (email) usuario.email = email;
        if (senha) usuario.senha = senha;

        await usuario.save();

        res.status(200).json(usuario);
    } catch (e) {
        console.error("Erro: " + e);
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro: e.message });
    }
};

const deleteUsuarios = async (req, res) => {

    const { id } = req.params;

    try {
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            res.status(404).json({ mensagem: "Usuário não encontrado, Verifique!", codigo: "0" });
        }

        await Usuario.findOneAndDelete({ _id: id });

        res.status(200).json({ mensagem: 'Usuário excluído com sucesso!' });
    } catch (e) {
        res.status(500).json({ mensagem: 'Erro ao excluir usuário', erro: e.message });
    }
};

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    putUsuarios,
    deleteUsuarios
};