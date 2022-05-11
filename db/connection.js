const mysql = require("mysql2");
// create connection to MySQL using .env values
require("dotenv").config();const db = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "employee_tracker_challenge"
});

module.exports = db;