const express = require("express");
const router = express.Router();
const connection = require("../db");

// For get all
router.get("/", (req, res) => {

    let details = [];
    connection.query(`SELECT id, first_name, last_name, nic, license_no, contact_no, email, registered_date FROM driver`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


router.get("/assign", (req, res) => {

    let details = [];
    connection.query(`SELECT id, first_name, last_name, nic, license_no, contact_no, email, registered_date 
                        FROM driver WHERE id in (SELECT DISTINCT(driver_id) from booking where status = 0)`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


router.get("/vacant", (req, res) => {

    let details = [];
    connection.query(`SELECT id, first_name, last_name, nic, license_no, contact_no, email, registered_date 
                        FROM driver WHERE id not in (SELECT DISTINCT(driver_id) from booking where status = 0)`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


router.get("/count", (req, res) => {

    let details = [];
    connection.query(`SELECT COUNT(id) as count FROM driver`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


router.get("/count/assigned", (req, res) => {

    let details = [];
    connection.query(`SELECT COUNT(id) as count FROM driver WHERE id in (SELECT DISTINCT(driver_id) from booking where status = 0)`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


router.get("/count/vacant", (req, res) => {

    let details = [];
    connection.query(`SELECT COUNT(id) as count FROM driver WHERE id not in (SELECT DISTINCT(driver_id) from booking where status = 0)`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


// For get all names
router.get("/drivers_names/", (req, res) => {

    let details = [];
    connection.query(`SELECT id, first_name, last_name FROM driver`,
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
    connection.query(`SELECT id, first_name, last_name, nic, license_no, contact_no, email, registered_date FROM driver WHERE id = '${id}'`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});

// For insert
router.post("", (req, res) => {
    const { first_name, last_name, nic, license_no, contact_no, email, registered_date } = req.body;

    connection.query(`SELECT COUNT(nic) as driver_count FROM driver WHERE nic = '${nic}'`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        driver_count = details[0][' driver_count']

        if (driver_count > 0) {
            res.json({ status: "error", msg: "Driver nic exist!" });
        } else {

            connection.query(`INSERT INTO driver (first_name, last_name, nic, license_no, contact_no, email, registered_date) VALUES 
                ('${first_name}', '${last_name}', '${nic}', '${license_no}', '${contact_no}', '${email}', '${registered_date}')`,
                (error, results, fields) => {
                    if (error) {
                        res.json({ status: "error", msg: "Driver not created!" });
                    } else {
                        res.json({ status: "success", msg: "Driver created successfully!" });
                    }

                });

        }

    });

});

// For update
router.put("/:id", (req, res) => {

    const { first_name, last_name, nic, license_no, contact_no, email } = req.body;
    const { id } = req.params;

    connection.query(`SELECT COUNT(id) as driver_count FROM driver WHERE id = '${id}'`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        driver_count = details[0][' driver_count']

        if (driver_count < 1) {
            res.json({ status: "error", msg: "Driver not exist!" });
        } else {

            connection.query(`UPDATE driver SET first_name = '${first_name}', 
                                last_name = '${last_name}', nic = '${nic}', 
                                license_no = '${license_no}', contact_no = '${contact_no}', 
                                email = '${email}' WHERE id = '${id}'`, (error, results, fields) => {
                if (error) {
                    res.json({ status: "error", msg: "Driver recode not updated!" });
                } else {
                    res.json({ status: "success", msg: "Driver recode updated!" });
                }

            });

        }

    });

});


// For delete
router.delete("/:id", (req, res) => {

    const { id } = req.params;

    connection.query(`DELETE FROM driver WHERE id = ${id}`, (error, results, fields) => {

        if (error) {
            res.json({ status: "error", msg: "Driver not deleted. Try again later! " + error });
        } else {
            res.json({ status: "success", msg: "Driver delete successful!" });
        }

    });

});


module.exports = router;