const db = require("../../db/connection");
require("console.table");

// view all departments
async function getDepts() {
    try {
        const sql = `SELECT * FROM departments
                    ORDER BY department_name ASC`;
        let dept = await db.promise().query(sql);
        if (!dept) {
            return [{message: "An error occurred."}];
        }
        if (dept[0].length === 0) {
            return [{message: "No entries to display."}];
        }
        return dept[0];
    }
    catch (err) {
        console.log(err);
    }
}

// add a department
async function addDept(name) {
    try {
        const sql = `INSERT INTO departments (department_name)
                    VALUES(?)`;
        let res = await db.promise().query(sql, [name], (err, result) => {
            if (err) {
                return;
            }
            return result;
        });
        if (res[0].warningStatus !== 0 || res[0].affectedRows !== 1) {
            console.log("An error occurred.");
            return;
        }
        console.log(`\nSuccessfully added entry - department id: ${res[0].insertId}.\nAdded ${res[0].affectedRows} row.\n`);
        return;
    }
    catch (err) {
        console.log(err);
    }
}

// delete a department
async function deleteDept(dept) {
    try {
        const sql = `DELETE FROM departments WHERE id = ?`;
        let res = await db.promise().query(sql, [dept], (err, result) => {
            if (err) {
                return false;
            }
            return result;
        });
        if (res[0].warningStatus !== 0 || res[0].affectedRows !== 1) {
            console.log("An error occurred.");
            return;
        }
        console.log(`\nSuccessfully deleted ${res[0].affectedRows} entry.\n`);
        return;
    }
    catch (err) {
        console.log(err);
    }
}

// view budget by department
async function viewBudget(department) {
    try {
        const sql = `SELECT
                        departments.department_name,
                        SUM(roles.salary) AS budget_used
                    FROM employees
                    LEFT JOIN roles ON employees.role_id=roles.id
                    LEFT JOIN departments ON roles.dept_id=departments.id
                    WHERE departments.id = ?;`;
        let res = await db.promise().query(sql, [department], (err, result) => {
            if (err) {
                return [{message: "An error occurred."}];
            }
            return result;
        });
        if (res[0][0].department_name === null) {
            return [{message: "No entries to display."}];
        }
        return res[0];
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getDepts,
    addDept,
    deleteDept,
    viewBudget
}