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
    const { id } = req.params; // ID do serviço
    const usuarioLogadoId = req.user.id; // Pega do token/session, ajusta conforme seu auth
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


// const cadastrarServico = async (req, res) => {
//     const usuario_id = 1; // fixo, conforme pedido
//     const descricao = 'Instalação de sistema solar residencial'; // descrição inventada

//     try {
//         // Verifica se o usuário existe antes de criar o serviço
//         const usuario = await Usuario.findByPk(usuario_id);
//         if (!usuario) {
//             return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
//         }

//         const novoServico = await Servico.create({
//             usuario_id,
//             descricao,
//             status: 0 // default = não concluído
//         });

//         res.status(201).json(novoServico);
//     } catch (err) {
//         res.status(500).json({ mensagem: 'Erro ao cadastrar serviço', erro: err.message });
//     }
// };

// const cadastrarServicoDireto = async () => {
//     const usuario_id = 1; // Quem criou
//     const descricao = 'Serviço teste';
//     const atribuiu_para_usuario_id = 2; // Quem vai realizar

//     try {
//         const criador = await Usuario.findByPk(usuario_id);
//         const responsavel = await Usuario.findByPk(atribuiu_para_usuario_id);

//         if (!criador) {
//             console.log('Usuário criador não encontrado!');
//             return;
//         }

//         if (!responsavel) {
//             console.log('Usuário atribuído não encontrado!');
//             return;
//         }

//         const novoServico = await Servico.create ({
//             usuario_id,
//             atribuiu_para_usuario_id,
//             descricao,
//             status: false
//         });

//         console.log('Serviço criado com sucesso:\n');
//         console.log('Notificando criador:\n', criador.EMAIL);
//         console.log('Notificando atribuído:\n', responsavel.EMAIL);
//         console.log('\nJSON do Serviço criado:\n', novoServico.toJSON());
//     } catch (err) {
//         console.log('Erro ao cadastrar serviço:', err.message);
//     }
// };

module.exports = {
    postServico,
    putServico,
    getServicos
};