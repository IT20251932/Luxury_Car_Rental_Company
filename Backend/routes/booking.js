const express = require("express");
const router = express.Router();
const connection = require("../db");


router.get("/pending", (req, res) => {

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


router.get("/", (req, res) => {

    let details = [];
    connection.query(`SELECT booking.id as id, driver.first_name as driver_first_name, driver.last_name as driver_last_name, driver_id, full_name, 
    vehicle.vehicle_no as vehicle_no, inquiry.contact_no as contact_no, inquiry.email as email, pick_up_date, pick_up_time, 
    pick_up_location, drop_off_time, drop_off_date,
    drop_off_location, inquiry_id FROM booking  
    INNER JOIN inquiry ON booking.inquiry_id = inquiry.id
    INNER JOIN driver ON booking.driver_id = driver.id
    INNER JOIN vehicle ON vehicle_id = vehicle.id WHERE booking.status = 0`,
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
    connection.query(`SELECT booking.id as id, driver_id, driver.first_name as driver_first_name, driver.last_name as driver_last_name, full_name, 
                vehicle.vehicle_no as vehicle_no, inquiry.contact_no as contact_no, inquiry.email as email, pick_up_date, pick_up_time, 
                pick_up_location, drop_off_time, drop_off_date,
                drop_off_location, inquiry_id FROM booking  
                INNER JOIN inquiry ON booking.inquiry_id = inquiry.id
                INNER JOIN driver ON booking.driver_id = driver.id
                INNER JOIN vehicle ON vehicle_id = vehicle.id WHERE booking.id = '${id}'`,
        (error, results, fields) => {
            if (error) throw error;
            details = results;

            res.json(details);
        });

});

// For insert
router.post("", (req, res) => {
    const { driver_id, inquiry_id, status } = req.body;

    connection.query(`INSERT INTO booking (driver_id, inquiry_id, status) VALUES 
                (${driver_id}, ${inquiry_id}, ${status})`,
        (error, results, fields) => {
            if (error) {
                res.json({ status: "error", msg: "Booking not created!" + error.message });
            } else {
                res.json({ status: "success", msg: "Booking created successfully!" });
            }

        });

});

// For update
router.put("/:id", (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    connection.query(`SELECT COUNT(id) as booking_count FROM booking WHERE id = ${id}`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        booking_count = details[0]['booking_count']

        if (booking_count < 1) {
            res.json({ status: "error", msg: "Booking not exist!" });
        } else {

            connection.query(`UPDATE booking SET status = ${status} WHERE id = '${id}'`, (error, results, fields) => {
                if (error) {
                    res.json({ status: "error", msg: "Booking recode not updated!" });
                } else {
                    res.json({ status: "success", msg: "Booking recode updated!" });
                }

            });

        }

    });

});


router.put("/driver/:id", (req, res) => {

    const { id } = req.params;
    const { driver_id } = req.body;

    connection.query(`SELECT COUNT(id) as booking_count FROM booking WHERE id = ${id}`, (error, results, fields) => {
        if (error) throw error;
        details = results;
        booking_count = details[0]['booking_count']

        if (booking_count < 1) {
            res.json({ status: "error", msg: "Booking not exist!" });
        } else {

            connection.query(`UPDATE booking SET driver_id = ${driver_id} WHERE id = '${id}'`, (error, results, fields) => {
                if (error) {
                    res.json({ status: "error", msg: "Driver not updated!" });
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

    connection.query(`DELETE FROM booking WHERE id = ${id}`, (error, results, fields) => {

        if (error) {
            res.json({ status: "error", msg: "Booking not deleted. Try again later! " + error });
        } else {
            res.json({ status: "success", msg: "Booking delete successful!" });
        }

    });

});


module.exports = router;