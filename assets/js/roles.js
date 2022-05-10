const db = require("../../db/connection");
require("console.table");

function getRoles() {
    const sql = `SELECT roles.id, roles.job_title, roles.salary, departments.name
                FROM roles
                LEFT JOIN departments ON roles.dept=departments.id;`;
    db.query(sql, (err, rows) => {
        console.table(rows);
    });
}

// edit variables!
function addRole() {
    // add validation here
    const sql = `INSERT INTO roles (job_title, salary, dept_id)
                VALUES(?,?,?)`;
    const params = [body.job_title, body.salary, body.dept_id];//edit this
    db.query(sql, params, (err, result) => {
        console.log(result);
    });
}

module.exports = {
    getRoles,
    addRole
}