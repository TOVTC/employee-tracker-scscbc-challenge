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

async function viewBudget(department) {
    const sql = `SELECT
                    departments.name AS department,
                    SUM(roles.salary) AS budget_used
                FROM employees
                LEFT JOIN roles ON employees.role_id=roles.id
                LEFT JOIN departments ON roles.dept_id=departments.id
                WHERE departments.id = ?;`;
    let budget = await db.promise().query(sql, [department], (err, res) => {
        console.log(res);
    })
    return budget[0];
}


async function addDept(name) {
    const sql = `INSERT INTO departments (name)
                VALUES(?)`;
    await db.promise().query(sql, [name], (err, result) => {
        console.log(result);
    });
}

async function deleteDept(dept) {
    const sql = `DELETE FROM departments WHERE id = ?`
    await db.promise().query(sql, [dept], (err, result) => {
        console.log(result);
    });
}

module.exports = {
    getDepts,
    viewBudget,
    addDept,
    deleteDept
}