const db = require("../../db/connection");
require("console.table");

async function getDepts() {
    const sql = `SELECT * FROM departments
                ORDER BY name ASC`;
    let dept = await db.promise().query(sql)
        .then(res => {
            return res[0];
        })
    return dept;
}

async function addDept(name) {
    const sql = `INSERT INTO departments (name)
                VALUES(?)`;
    await db.promise().query(sql, [name], (err, result) => {
        console.log(result);
    });
}

module.exports = {
    getDepts,
    addDept
}