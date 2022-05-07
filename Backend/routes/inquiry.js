const express = require("express");
const router = express.Router();
const connection = require("../db");

const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options = require('../helpers/options');
const sendMailer = require("../utils/mailer");

// For get all
router.get("/", (req, res) => {

    let details = [];
    connection.query(`SELECT inquiry.id, full_name, vehicle_no, inquiry.contact_no, email, pick_up_date, pick_up_time, 
    pick_up_location, drop_off_time, drop_off_date,
    drop_off_location FROM inquiry
    INNER JOIN vehicle ON vehicle_id = vehicle.id
     WHERE inquiry.id not in (SELECT inquiry_id FROM booking WHERE status = 0)`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});

// For get by id
router.get("/:id", (req, res) => {

    const { id } = req.params;

    let details = [];
    connection.query(`SELECT inquiry.id as id, full_name, pick_up_location, pick_up_time, pick_up_date, drop_off_date,
    inquiry.contact_no as contact_no, email, no_of_passengers, drop_off_location, drop_off_time, vehicle_no FROM inquiry 
                        INNER JOIN vehicle ON vehicle.id = inquiry.vehicle_id WHERE inquiry.id = '${id}'`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});

// For insert
router.post("", (req, res) => {
    const { full_name, pick_up_location, pick_up_time, pick_up_date, drop_off_date,
        contact_no, email, no_of_passengers, drop_off_location, drop_off_time, vehicle_id } = req.body;

    let query = `INSERT INTO inquiry (full_name, pick_up_location, pick_up_time, pick_up_date, drop_off_date,
        contact_no, email, no_of_passengers, drop_off_location, drop_off_time, vehicle_id) VALUES 
                ('${full_name}', '${pick_up_location}', '${pick_up_time}', '${pick_up_date}', '${drop_off_date}', '${contact_no}',
                '${email}', '${no_of_passengers}', '${drop_off_location}', '${drop_off_time}', ${vehicle_id})`;

    connection.query(query,
        (error, results, fields) => {
            if (error) {
                res.json({ status: "error", msg: "Inquiry not created! " + error.message });
            } else {

                connection.query(`SELECT vehicle_no, vehicle_type, vehicle_color, price_per_hour FROM vehicle WHERE id = ${vehicle_id}`, (error, results, fields) => {
                    if (error) throw error;

                    const html = fs.readFileSync(path.join(__dirname, '../views/inquiry_template.html'), 'utf-8');
                    const filename = Math.random() * 10000000000 + '_inquiry_report.pdf';
                    const filePath = "./docs/" + filename;

                    const document = {
                        html: html,
                        data: {
                            full_name: full_name,
                            pick_up_location: pick_up_location,
                            pick_up_time: pick_up_time,
                            pick_up_date: pick_up_date,
                            drop_off_date: drop_off_date,
                            contact_no: contact_no,
                            email: email,
                            no_of_passengers: no_of_passengers,
                            drop_off_location: drop_off_location,
                            drop_off_time: drop_off_time,
                            vehicle_id: vehicle_id,
                            vehicle_no: results[0].vehicle_no,
                            vehicle_type: results[0].vehicle_type,
                            vehicle_color: results[0].vehicle_color,
                            price_per_hour: results[0].price_per_hour
                        },
                        path: './docs/' + filename
                    }
                    pdf.create(document, options)
                        .then(() => {
                            res.download("./docs/" + filename);

                            let msgBody = `Hi,<br><br>
                                                Your inquiry placed successfully. 
                                                Please find inquiry attached in this mail.
                                                <br>
                                                <br>
                                                Thank you.
                                    `
                            sendMailer.sendEmailWithAttachment(email, "Luxury Car Rental Inquiry", msgBody, filename, filePath);

                        }).catch(error => {
                            console.log(error);
                        });

                });

                res.json({ status: "success", msg: "Inquiry created successfully!" });

            }

        });

});


// For delete
router.delete("/:id", (req, res) => {

    const { id } = req.params;

    connection.query(`DELETE FROM inquiry WHERE id = ${id}`, (error, results, fields) => {

        if (error) {
            res.json({ status: "error", msg: "Inquiry not deleted. Try again later! " + error });
        } else {
            res.json({ status: "success", msg: "Inquiry delete successful!" });
        }

    });

});


module.exports = router;