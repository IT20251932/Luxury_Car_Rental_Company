const express = require("express");
const router = express.Router();
const connection = require("../db");

const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options = require('../helpers/options');


// Generate bookings report
router.get("/bookings_report", (req, res) => {

    connection.query(`SELECT inquiry.id, full_name, vehicle_no, inquiry.contact_no, email, pick_up_date, pick_up_time, 
                pick_up_location, drop_off_time, drop_off_date, drop_off_location FROM inquiry 
                INNER JOIN vehicle ON vehicle_id = vehicle.id
                WHERE inquiry.id not in (SELECT inquiry_id FROM booking WHERE status = 0)`, (error, results, fields) => {
        if (error) throw error;

        const html = fs.readFileSync(path.join(__dirname, '../views/booking_template.html'), 'utf-8');
        const filename = Math.random() * 10000000000 + '_booking_report.pdf';
        let array = [];

        results.forEach(d => {
            const dataset = {
                id: d.id,
                full_name: d.full_name,
                vehicle_no: d.vehicle_no,
                contact_no: d.contact_no,
                email: d.email,
                pick_up_date: d.pick_up_date,
                pick_up_time: d.pick_up_time,
                pick_up_location: d.pick_up_location,
                drop_off_time: d.drop_off_time,
                drop_off_date: d.drop_off_date,
                drop_off_location: d.drop_off_location,
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


// Generate vehicles report
router.get("/vehicles_report", (req, res) => {

    connection.query(`SELECT id, vehicle_no, vehicle_type, no_of_sheets, vehicle_color, 
                    contact_no, owner_name, price_per_hour, image FROM vehicle`, (error, results, fields) => {
        if (error) throw error;

        const html = fs.readFileSync(path.join(__dirname, '../views/vehicles_template.html'), 'utf-8');
        const filename = Math.random() * 10000000000 + '_vehicles_report.pdf';
        let array = [];

        results.forEach(d => {
            const dataset = {
                id: d.id,
                vehicle_no: d.vehicle_no,
                vehicle_type: d.vehicle_type,
                no_of_sheets: d.no_of_sheets,
                vehicle_color: d.vehicle_color,
                contact_no: d.contact_no,
                owner_name: d.owner_name,
                price_per_hour: d.price_per_hour
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


// Generate drivers report
router.get("/drivers_report", (req, res) => {

    connection.query(`SELECT id, first_name, last_name, nic, license_no, contact_no, email, registered_date 
                    FROM driver`, (error, results, fields) => {
        if (error) throw error;

        const html = fs.readFileSync(path.join(__dirname, '../views/drivers_template.html'), 'utf-8');
        const filename = Math.random() * 10000000000 + '_drivers_report.pdf';
        let array = [];

        results.forEach(d => {
            const dataset = {
                id: d.id,
                first_name: d.first_name,
                last_name: d.last_name,
                nic: d.nic,
                license_no: d.license_no,
                contact_no: d.contact_no,
                email: d.email,
                registered_date: d.registered_date
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