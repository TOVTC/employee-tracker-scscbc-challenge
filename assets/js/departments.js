const db = require("../../db/connection");
require("console.table");

async function getDepts() {
    const sql = `SELECT * FROM departments`;
    let dept = await db.promise().query(sql)
        .then(res => {
            return res[0];
        })
    return dept;
}

async function addDept(name) {
    // add validation here
    const sql = `INSERT INTO departments (name)
                VALUES(?)
                ORDER BY name ASC`;
    await db.promise().query(sql, [name], (err, result) => {
        console.log(result);
    });
}

module.exports = {
    getDepts,
    addDept
}