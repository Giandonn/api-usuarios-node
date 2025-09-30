const Servico = require('../models/servicoModel');
const Usuario = require('../models/usuarioModel');

const postServico = async (req, res) => {
    const { usuarioId, descricao } = req.body;

    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        const novoServico = await Servico.create({
            usuario_id: usuarioId,
            descricao,
            status: false
        });

        res.status(201).json(novoServico);
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao criar serviço', erro: err.message });
    }
};

const putServico = async (req, res) => {
    const { id } = req.params;
    const usuarioLogadoId = req.user.id;
    try {
        const servico = await Servico.findByPk(id);
        if (!servico) {
            return res.status(404).json({ mensagem: 'Serviço não encontrado!' });
        }

        servico.atribuiu_para_usuario_id = usuarioLogadoId;
        await servico.save();

        res.status(200).json(servico);
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao atualizar serviço', erro: err.message });
    }
};

const getServicos = async (req, res) => {
    try {
        const servicos = await Servico.findAll({
            include: [
                { model: Usuario, as: 'criador', attributes: ['id', 'EMAIL'] },
                { model: Usuario, as: 'responsavel', attributes: ['id', 'EMAIL'] }
            ]
        });

        res.status(200).json(servicos);
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao buscar serviços', erro: err.message });
    }
};

module.exports = {
    postServico,
    putServico,
    getServicos
};