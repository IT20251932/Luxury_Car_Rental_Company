const express = require("express");
const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options = require('../helpers/options');
const router = express.Router();
const connection = require("../db");


// For pass history details
router.get("/", (req, res) => {
    const { date } = req.query;

    connection.query(`SELECT * FROM history WHERE Date = '${date}'`, (error, results, fields) => {
        if (error) throw error;

        const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8');
        const filename = Math.random() * 10000000000 + '_report.pdf';
        let array = [];

        results.forEach(d => {
            const dataset = {
                Invoice_ID: d.Invoice_ID,
                NIC: d.NIC,
                Date: d.Date,
                Porter_ID: d.Porter_ID,
            }
            array.push(dataset);
        });

        const document = {
            html: html,
            data: {
                results: array
            },
            path: './docs/' + filename
        }
        pdf.create(document, options)
            .then(() => {
                res.download("./docs/" + filename);

            }).catch(error => {
                console.log(error);
            });

    });

});

module.exports = router;