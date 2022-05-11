const db = require("../../db/connection");
require("console.table");

// view all departments
async function getDepts() {
    const sql = `SELECT * FROM departments
                ORDER BY department_name ASC`;
    let dept = await db.promise().query(sql)
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
    return dept;
}

// add a department
async function addDept(name) {
    const sql = `INSERT INTO departments (department_name)
                VALUES(?)`;
    await db.promise().query(sql, [name], (err, result) => {
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
        console.log(`\nSuccessfully added entry - department id: ${res[0].insertId}.\nAdded ${res[0].affectedRows} row.\n`);
        return;
    })
    .catch(err => {
        console.log(err);
    });
}

// delete a department
async function deleteDept(dept) {
    const sql = `DELETE FROM departments WHERE id = ?`
    await db.promise().query(sql, [dept], (err, result) => {
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

// view budget by department
async function viewBudget(department) {
    const sql = `SELECT
                    departments.department_name,
                    SUM(roles.salary) AS budget_used
                FROM employees
                LEFT JOIN roles ON employees.role_id=roles.id
                LEFT JOIN departments ON roles.dept_id=departments.id
                WHERE departments.id = ?;`;
    let budget = await db.promise().query(sql, [department], (err, result) => {
        if (err) {
            return [{message: "An error occurred."}];
        }
        return result;
    })
    .then(res => {
        if (res[0][0].department_name === null) {
            return [{message: "No entries to display."}];
        }
        return res[0];
    })
    .catch(err => {
        console.log(err);
    });
    return budget
}

module.exports = {
    getDepts,
    addDept,
    deleteDept,
    viewBudget
}