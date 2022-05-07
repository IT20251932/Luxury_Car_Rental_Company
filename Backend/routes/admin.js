const express = require("express");
const router = express.Router();
const connection = require("../db");

// For login
router.post("/login", (req, res) => {
    const { email, psw } = req.body;

    connection.query(`SELECT id, name, email FROM admin WHERE email = '${email}' AND psw = '${psw}'`,
        (error, results, fields) => {
            if (error) {
                res.json({ status: "error", msg: "Error Occur!.. " + error.message });
            } else {
                details = results;
                if (details.length > 0) {
                    res.json({
                        status: "success", msg: "Admin login successfully!",
                        details: details
                    });
                }
                else {
                    res.json({ status: "error", msg: "Admin credentials invalid!" });
                }
            }

        });

});

// For get all
router.get("/", (req, res) => {

    let details = [];
    connection.query(`SELECT id, name, email FROM admin`,
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
    connection.query(`SELECT id, name, email FROM admin WHERE id = '${id}'`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});

// For insert
router.post("", (req, res) => {
    const { id, name, email, psw } = req.body;

    connection.query(`INSERT INTO admin (id, name, email, psw) VALUES 
                ('${id}', '${name}', '${email}', '${psw}')`,
        (error, results, fields) => {
            if (error) {
                res.json({ status: "error", msg: "Admin not created!" });
            } else {
                res.json({ status: "success", msg: "Admin created successfully!" });
            }

        });

});

// For update
router.put("/:id", (req, res) => {

    const { name } = req.body;
    const { id } = req.params;

    connection.query(`SELECT COUNT(id) as admin_count FROM admin WHERE id = '${id}'`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        admin_count = details[0]['admin_count']

        if (admin_count < 1) {
            res.json({ status: "error", msg: "Admin not exist!" });
        } else {

            connection.query(`UPDATE admin SET name = '${name}' WHERE id = '${id}'`, (error, results, fields) => {
                if (error) {
                    res.json({ status: "error", msg: "Admin recode not updated!" });
                } else {
                    res.json({ status: "success", msg: "Admin recode updated!" });
                }

            });

        }

    });

});


// For update psw
router.put("password/:id", (req, res) => {

    const { psw } = req.body;
    const { id } = req.params;

    connection.query(`SELECT COUNT(id) as admin_count FROM admin WHERE id = '${id}'`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        admin_count = details[0]['admin_count']

        if (admin_count < 1) {
            res.json({ status: "error", msg: "Admin not exist!" });
        } else {

            connection.query(`UPDATE admin SET psw = '${psw}' WHERE id = '${id}'`, (error, results, fields) => {
                if (error) {
                    res.json({ status: "error", msg: "Admin recode not updated!" });
                } else {
                    res.json({ status: "success", msg: "Admin recode updated!" });
                }

            });

        }

    });

});


// For delete
router.delete("/:id", (req, res) => {

    const { id } = req.params;

    connection.query(`DELETE FROM admin WHERE id = ${id}`, (error, results, fields) => {

        if (error) {
            res.json({ status: "error", msg: "Admin not deleted. Try again later! " + error });
        } else {
            res.json({ status: "success", msg: "Admin delete successful!" });
        }

    });

});


module.exports = router;