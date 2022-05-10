const db = require("../../db/connection");
require("console.table");

async function getEmployees() {
    const sql = `SELECT
                    employees.id,
                    concat(employees.last_name, ", ", employees.first_name) AS employee_name,
                    roles.job_title,
                    roles.salary,
                    departments.name AS department,
                    concat(managers.last_name, ", ", managers.first_name) AS manager_name
                FROM employees
                LEFT JOIN roles ON employees.role_id=roles.id
                LEFT JOIN departments ON roles.dept_id=departments.id
                LEFT JOIN employees managers ON employees.manager_id=managers.id
                ORDER BY employee_name ASC;`;
    let employee = await db.promise().query(sql)
    .then(res => {
        return res[0];
    });
    return employee;
}

// edit variables!
function addEmployee() {
    // add validation here
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES(?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    db.query(sql, params, (err, result) => {
        console.log(result);
    });
}


// edit variables!
function updateRole() {
    // add validation here
    const sql = `UPDATE employees SET role_id = ?
                WHERE id = ?`
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
        console.log(result);
    });
}

module.exports = {
    getEmployees,
    addEmployee,
    updateRole
}