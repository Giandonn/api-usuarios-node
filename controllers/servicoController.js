const Servico = require('../models/servicoModel');
const Usuario = require('../models/usuarioModel');

const cadastrarServico = async (req, res) => {
    const usuario_id = 1; // fixo, conforme pedido
    const descricao = 'Instalação de sistema solar residencial'; // descrição inventada

    try {
        // Verifica se o usuário existe antes de criar o serviço
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        const novoServico = await Servico.create({
            usuario_id,
            descricao,
            status: 0 // default = não concluído
        });

        res.status(201).json(novoServico);
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar serviço', erro: err.message });
    }
};

const cadastrarServicoDireto = async () => {
    const usuario_id = 1; // Quem criou
    const descricao = 'Serviço teste';
    const atribuiu_para_usuario_id = 2; // Quem vai realizar

    try {
        const criador = await Usuario.findByPk(usuario_id);
        const responsavel = await Usuario.findByPk(atribuiu_para_usuario_id);

        if (!criador) {
            console.log('Usuário criador não encontrado!');
            return;
        }

        if (!responsavel) {
            console.log('Usuário atribuído não encontrado!');
            return;
        }

        const novoServico = await Servico.create({
            usuario_id,
            atribuiu_para_usuario_id,
            descricao,
            status: false
        });

        console.log('Serviço criado com sucesso:\n');
        console.log('Notificando criador:\n', criador.EMAIL);
        console.log('Notificando atribuído:\n', responsavel.EMAIL);
        console.log('\nJSON do Serviço criado:\n', novoServico.toJSON());
    } catch (err) {
        console.log('Erro ao cadastrar serviço:', err.message);
    }
};

module.exports = {
    cadastrarServico,
    cadastrarServicoDireto
};