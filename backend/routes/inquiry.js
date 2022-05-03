const express = require("express");
const router = express.Router();
const connection = require("../db");

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

    connection.query(`INSERT INTO inquiry (full_name, pick_up_location, pick_up_time, pick_up_date, drop_off_date,
        contact_no, email, no_of_passengers, drop_off_location, drop_off_time, vehicle_id) VALUES 
                ('${full_name}', '${pick_up_location}', '${pick_up_time}', '${pick_up_date}', '${drop_off_date}', '${contact_no}',
                '${email}', '${no_of_passengers}', '${drop_off_location}', '${drop_off_time}', ${vehicle_id})`,
        (error, results, fields) => {
            if (error) {
                res.json({ status: "error", msg: "Inquiry not created! " + error.message });
            } else {
                res.json({ status: "success", msg: "Inquiry created successfully!" });
            }

        });

});

// For update
// router.put("/:id", (req, res) => {

//     const { vehicle_no, vehicle_type, no_of_sheets, vehicle_color, contact_no, owner_name } = req.body;
//     const { id } = req.params;

//     connection.query(`SELECT COUNT(id) as inquiry_count FROM inquiry WHERE id = '${id}'`, (error, results, fields) => {
//         if (error) throw error;
//         details = results;
//         inquiry_count = details[0]['inquiry_count']

//         if (inquiry_count < 1) {
//             res.json({ status: "error", msg: "Inquiry not exist!" });
//         } else {

//             connection.query(`UPDATE inquiry SET full_name = '${full_name}', 
//                                 pick_up_location = '${pick_up_location}', pick_up_time = '${pick_up_time}', 
//                                 pick_up_date = '${pick_up_date}', drop_off_date = '${drop_off_date}', 
//                                 contact_no = '${contact_no}', email = '${email}', 
//                                 no_of_passengers = '${no_of_passengers}', drop_off_location = '${drop_off_location}', 
//                                 drop_off_time = '${drop_off_time}' WHERE id = '${id}'`, (error, results, fields) => {
//                 if (error) {
//                     res.json({ status: "error", msg: "Inquiry recode not updated!" });
//                 } else {
//                     res.json({ status: "success", msg: "Inquiry recode updated!" });
//                 }

//             });

//         }

//     });

// });


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