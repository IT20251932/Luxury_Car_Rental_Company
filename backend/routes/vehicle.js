const express = require("express");
const fs = require('fs');
var multer = require("multer");

const router = express.Router();
const connection = require("../db");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})

// For get all
router.get("/", (req, res) => {

    let details = [];
    connection.query(`SELECT id, vehicle_no, vehicle_type, no_of_sheets, vehicle_color, contact_no, owner_name, price_per_hour, image FROM vehicle`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


router.get("/vacant", (req, res) => {

    let details = [];
    connection.query(`SELECT id, vehicle_no, vehicle_type, no_of_sheets, vehicle_color, contact_no, owner_name, price_per_hour, image FROM vehicle WHERE id not in 
                    (SELECT DISTINCT(vehicle_id) from inquiry where id in (SELECT DISTINCT(inquiry_id) from booking where status = 0))`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


router.get("/count", (req, res) => {

    let details = [];
    connection.query(`SELECT COUNT(id) as count FROM vehicle`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


router.get("/count/assigned", (req, res) => {

    let details = [];
    connection.query(`SELECT COUNT(id) as count FROM vehicle WHERE id in 
    (SELECT DISTINCT(vehicle_id) from inquiry where id in (SELECT DISTINCT(inquiry_id) from booking where status = 0))`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


router.get("/count/vacant", (req, res) => {

    let details = [];
    connection.query(`SELECT COUNT(id) as count FROM vehicle WHERE id not in 
    (SELECT DISTINCT(vehicle_id) from inquiry where id in (SELECT DISTINCT(inquiry_id) from booking where status = 0))`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


// For get all vehicle numbers
router.get("/vehicle_numbers/", (req, res) => {

    let details = [];
    connection.query(`SELECT id, vehicle_no FROM vehicle`,
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
    connection.query(`SELECT id, vehicle_no, vehicle_type, no_of_sheets, vehicle_color, contact_no, owner_name, price_per_hour, image FROM vehicle WHERE id = '${id}'`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});

// For insert
router.post("", upload.single('file'), (req, res) => {
    const { vehicle_no, vehicle_type, no_of_sheets, vehicle_color, contact_no, owner_name, price_per_hour, file, image_name } = req.body;

    connection.query(`SELECT COUNT(vehicle_no) as vehicle_count FROM vehicle WHERE vehicle_no = '${vehicle_no}'`, (error, results, fields) => {
        if (error) {
            res.json({ status: "error", msg: "Vehicle not created! " + error.message });
        } else {

            details = results;
            vehicle_count = details[0]['vehicle_count']

            if (vehicle_count > 0) {
                res.json({ status: "error", msg: "Vehicle number exist!" });
            } else {

                connection.query(`INSERT INTO vehicle (vehicle_no, vehicle_type, no_of_sheets, vehicle_color, contact_no, owner_name, price_per_hour, image) VALUES 
                ('${vehicle_no}', '${vehicle_type}', '${no_of_sheets}', '${vehicle_color}', '${contact_no}', '${owner_name}', '${price_per_hour}', '${image_name}')`,
                    (error, results, fields) => {
                        if (error) {
                            res.json({ status: "error", msg: "Vehicle not created!" });
                        } else {
                            res.json({ status: "success", msg: "Vehicle created successfully!" });
                        }

                    });

            }

        }

    });

});

// For update
router.put("/:id", (req, res) => {

    const { vehicle_no, vehicle_type, no_of_sheets, vehicle_color, contact_no, owner_name, price_per_hour } = req.body;
    const { id } = req.params;

    connection.query(`SELECT COUNT(id) as vehicle_count FROM vehicle WHERE id = '${id}'`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        vehicle_count = details[0]['vehicle_count']

        if (vehicle_count < 1) {
            res.json({ status: "error", msg: "Vehicle not exist!" });
        } else {

            connection.query(`UPDATE vehicle SET vehicle_no = '${vehicle_no}', 
                                vehicle_type = '${vehicle_type}', no_of_sheets = '${no_of_sheets}', 
                                vehicle_color = '${vehicle_color}', contact_no = '${contact_no}', 
                                owner_name = '${owner_name}', price_per_hour = '${price_per_hour}' WHERE id = '${id}'`, (error, results, fields) => {
                if (error) {
                    res.json({ status: "error", msg: "Vehicle recode not updated!" });
                } else {
                    res.json({ status: "success", msg: "Vehicle recode updated!" });
                }

            });

        }

    });

});


// For delete
router.delete("/:id", (req, res) => {

    const { id } = req.params;

    connection.query(`DELETE FROM vehicle WHERE id = ${id}`, (error, results, fields) => {

        if (error) {
            res.json({ status: "error", msg: "Vehicle not deleted. Try again later! " + error });
        } else {
            res.json({ status: "success", msg: "Vehicle delete successful!" });
        }

    });

});


module.exports = router;