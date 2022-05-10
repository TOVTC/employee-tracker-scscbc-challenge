const db = require("../../db/connection");
require("console.table");

async function getRoles() {
    const sql = `SELECT roles.id, roles.job_title, roles.salary, departments.name AS department
                FROM roles
                LEFT JOIN departments ON roles.dept_id=departments.id
                ORDER BY job_title ASC;`;
    let role = await db.promise().query(sql)
    .then(res => {
        return res[0]
    });
    return role;
}

// edit variables!
async function addRole(title, salary, deptID) {
    // add validation here
    const sql = `INSERT INTO roles (job_title, salary, dept_id)
                VALUES(?,?,?)`;
    await db.promise().query(sql, [title, salary, deptID], (err, result) => {
        console.log(result);
    });
}

module.exports = {
    getRoles,
    addRole
}