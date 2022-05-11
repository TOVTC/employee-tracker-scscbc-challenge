const db = require("../../db/connection");
require("console.table");

// view all roles
async function getRoles() {
    const sql = `SELECT roles.id, roles.job_title, roles.salary, departments.department_name AS department
                FROM roles
                LEFT JOIN departments ON roles.dept_id=departments.id
                ORDER BY job_title ASC;`;
    let role = await db.promise().query(sql)
    .then(res => {
        if (!res) {
            return [{message: "An error occurred."}];
        }
        if (res[0].length === 0) {
            return [{message: "No entries to display."}];
        }
        return res[0];
    })
    .catch(err => {
        console.log(err);
    });
    return role;
}

// add a role
async function addRole(title, salary, deptID) {
    const sql = `INSERT INTO roles (job_title, salary, dept_id)
                VALUES(?,?,?)`;
    await db.promise().query(sql, [title, salary, deptID], (err, result) => {
        if (err) {
            return;
        }
        return result;
    })
    .then(res => {
        if (res[0].warningStatus !== 0 || res[0].affectedRows !== 1) {
            console.log("An error occurred.");
            return;
        }
        console.log(`\nSuccessfully added entry - role id: ${res[0].insertId}.\nAdded ${res[0].affectedRows} row.\n`);
        return;
    })
    .catch(err => {
        console.log(err);
    });
}

// delete a role
async function deleteRole(role) {
    const sql = `DELETE FROM roles WHERE id = ?`
    await db.promise().query(sql, [role], (err, result) => {
        if (err) {
            return false;
        }
        return result;
    })
    .then(res => {
        if (res[0].warningStatus !== 0 || res[0].affectedRows !== 1) {
            console.log("An error occurred.");
            return;
        }
        console.log(`\nSuccessfully deleted ${res[0].affectedRows} entry.\n`);
        return;
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = {
    getRoles,
    addRole,
    deleteRole
}