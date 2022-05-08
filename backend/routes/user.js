const express = require("express");
const router = express.Router();
const connection = require("../db");

// For get all
router.get("/", (req, res) => {

    let details = [];
    connection.query(`SELECT id, name, email, number FROM users`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});


// For get by id
router.get("/:email", (req, res) => {

    const { email } = req.params;

    let details = [];
    connection.query(`SELECT id, name, email, number FROM users WHERE email = '${email}'`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});

// For insert
router.post("", (req, res) => {
    const { name, email, number, psw } = req.body;

    connection.query(`SELECT COUNT(email) as users_count FROM users WHERE email = '${email}'`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        users_count = details[0][' users_count']

        if (users_count > 0) {
            res.json({ status: "error", msg: "users email exist!" });
        } else {

            connection.query(`INSERT INTO users (name, email, number, psw) VALUES 
                ('${name}', '${email}', '${number}', '${psw}')`,
                (error, results, fields) => {
                    if (error) {
                        res.json({ status: "error", msg: "Account not created!" });
                    } else {
                        res.json({ status: "success", msg: "Account created successfully!. Please Sign in" });
                    }

                });

        }

    });

});

router.post("/login", (req, res) => {
    const { email, psw } = req.body;
    connection.query(`SELECT id, name, email, number FROM users WHERE email = '${email}' AND psw = '${psw}'`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        users_count = details.length

        if (users_count < 1) {
            res.json({ status: "error", msg: "Check your credentials!" });
        } else {

            res.json({ status: "success", msg: "User Logged!", details: details });

        }

    });

});

// For update
router.put("/:email", (req, res) => {

    const { name, number } = req.body;
    const { email } = req.params;

    connection.query(`SELECT COUNT(email) as users_count FROM users WHERE email = '${email}'`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        users_count = details[0][' users_count']

        if (users_count < 1) {
            res.json({ status: "error", msg: "Account not exist!" });
        } else {

            connection.query(`UPDATE users SET name = '${name}', 
                                number = '${number}' WHERE email = '${email}'`, (error, results, fields) => {
                if (error) {
                    res.json({ status: "error", msg: "Account not updated!" });
                } else {
                    res.json({ status: "success", msg: "Account updated!" });
                }

            });

        }

    });

});


// For update
router.put("/psw/:id", (req, res) => {

    const { psw } = req.body;
    const { email } = req.params;

    connection.query(`SELECT COUNT(id) as users_count FROM users WHERE email = '${email}'`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        users_count = details[0][' users_count']

        if (users_count < 1) {
            res.json({ status: "error", msg: "Account not exist!" });
        } else {

            connection.query(`UPDATE users SET psw = '${psw}' WHERE email = '${email}'`, (error, results, fields) => {
                if (error) {
                    res.json({ status: "error", msg: "Account not updated!" });
                } else {
                    res.json({ status: "success", msg: "Account updated!" });
                }

            });

        }

    });

});


// For delete
router.delete("/:email", (req, res) => {

    const { email } = req.params;

    connection.query(`DELETE FROM users WHERE email = '${email}'`, (error, results, fields) => {

        if (error) {
            res.json({ status: "error", msg: "Account not deleted. Try again later! " + error });
        } else {
            res.json({ status: "success", msg: "Account delete successful!" });
        }

    });

});


module.exports = router;