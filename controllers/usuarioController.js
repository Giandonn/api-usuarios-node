const Usuario = require('../models/usuarioModel');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, estado, cidade, rua, numero, dataNascimento } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ where: { EMAIL: email } });
        if (usuarioExistente) {
            return res.status(400).json({ mensagem: 'Já existe um usuário com este email!' });
        }

        const novoUsuario = await Usuario.create({
            NOME: nome,
            EMAIL: email,
            SENHA: senha,
            ESTADO: estado,
            CIDADE: cidade,
            RUA: rua,
            NUMERO: numero,
            DATA_NASCIMENTO: dataNascimento
        });

        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(400).json({ mensagem: 'Erro ao cadastrar usuário', erro: err.message });
    }
};


// Listar usuários
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensagem: 'Erro ao listar usuários' });
    }
};

const putUsuarios = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        await usuario.update({ nome, email, senha });
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro: err.message });
    }
};

const deleteUsuarios = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }

        await usuario.destroy();
        res.status(200).json({ mensagem: 'Usuário excluído com sucesso!' });
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao excluir usuário', erro: err.message });
    }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { EMAIL: email, SENHA: senha } });
    if (!usuario) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }
    // Login ok, pode mandar dados do usuário, token, etc.
    res.status(200).json({ mensagem: "Login realizado com sucesso", usuario: { id: usuario.ID, nome: usuario.NOME, email: usuario.EMAIL } });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro no servidor", erro: err.message });
  }
};

// async function loginUser() {
//     try {
//         let sql = 'SELECT * FROM USUARIO WHERE email = :email and senha = :senha';

//         const result = await sequelize.query(sql, {
//             replacements: { email: 'lucas@teste.com', senha: '123' },
//             type: QueryTypes.SELECT,
//         });

//         if (result) {
//             // Se der sucesso chamar a funcao para montar a tela principal
//             // utilizando a cidade para puxar os serviços especificos da localidade
//             console.log("Usuário logado com sucesso.");
//             console.log("Dados de retorno:", result);
//             return;
//         }

//     } catch (e) {
//         console.error(e);
//         return;
//     }
// };

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    putUsuarios,
    deleteUsuarios,
    loginUser
};