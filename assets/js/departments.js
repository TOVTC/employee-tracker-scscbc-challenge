const db = require("../../db/connection");
require("console.table");

function getDepts() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        console.log("\n");
        console.table(rows);
        return;
    });
}

//still to confirm
function addDept(name) {
    // add validation here
    const sql = `INSERT INTO departments (name)
                VALUES(?)`;
    db.query(sql, [name], (err, result) => {
        console.log(result);
    });
}

module.exports = {
    getDepts,
    addDept
}