require("dotenv").config();
const cors = require("cors");
const express = require("express");

const connection = require("./db");
connection.connect();
const app = express();

const PORT = process.env.PORT || 3008;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));

// Import routes
const vehicle_router = require("./routes/vehicle");
const driver_router = require("./routes/driver");
const inquiry_router = require("./routes/inquiry");
const booking_router = require("./routes/booking");
const admin_router = require("./routes/admin");
const user_router = require("./routes/user");
const report_router = require("./routes/report");

// Use routes
app.use("/vehicle", vehicle_router);
app.use("/driver", driver_router);
app.use("/inquiry", inquiry_router);
app.use("/booking", booking_router);
app.use("/admin", admin_router);
app.use("/user", user_router);
app.use("/report", report_router);

// Server run
app.listen(PORT, () => {
    console.log("server is running on - " + PORT);
});