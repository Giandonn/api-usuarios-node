const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const PDFDocument = require('pdfkit');
const fs = require("fs");

const getBatimentosByUser = async (req, res) => {

    const { id } = req.params;

    try {
        let infos = await sequelize.query(
            'SELECT A.ID, A.BPM, A.USER_ID, B.NOME, DATE_FORMAT(A.CRIADO_EM, "%d/%m/%Y %H:%i:%s") AS CRIADO_EM, A.STATUS FROM BATIMENTOS A JOIN USUARIO B ON B.ID = A.USER_ID WHERE USER_ID = :id',
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

const geraPdf = (req, res) => {
    try {
        const doc = new PDFDocument({ size: "A4", margin: 50 });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=relatorio.pdf");

        doc.pipe(res);

        doc.fontSize(16).text("Relatório de Batimentos", { align: "center" });
        doc.moveDown(2);

        const tableTop = 120;
        const itemSpacing = 20;
        let y = tableTop;

        doc.fontSize(12).text("BPM", 50, y);
        doc.text("Paciente", 150, y);
        doc.text("Data", 300, y);
        doc.text("Status", 450, y);

        y += 20;

        req.body.forEach(item => {
            doc.text(item.BPM, 50, y);
            doc.text(item.NOME, 150, y);
            doc.text(item.CRIADO_EM, 300, y);
            doc.text(item.STATUS, 450, y);

            y += itemSpacing;

            // quebra de página automática
            if (y > doc.page.height - 50) {
                doc.addPage();
                y = 50; // reinicia y na nova página
            }
        });

        doc.end();
    } catch (err) {
        res.status(500).send("Erro ao gerar PDF: " + err.message);
    }
};

module.exports = {
    getBatimentosByUser,
    geraPdf
};