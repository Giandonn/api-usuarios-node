const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

const getBatimentosByUser = async (req, res) => {

    const { id } = req.params;

    try {
        let infos = await sequelize.query(
            'SELECT ID, BPM, USER_ID, DATE_FORMAT(CRIADO_EM, "%d/%m/%Y") AS CRIADO_EM, STATUS FROM BATIMENTOS WHERE USER_ID = :id',
            {
                replacements: { id },
                type: QueryTypes.SELECT,
            }
        );

        res.status(201).json(infos);
    } catch (err) {
        res.status(400).json({ mensagem: 'Nenhuma info desse usuario encontrada', erro: err.message });
    }
};

module.exports = {
    getBatimentosByUser
};