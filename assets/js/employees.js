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

async function getManagers() {
    const sql = `SELECT
                    employees.id,
                    concat(employees.last_name, ", ", employees.first_name) AS employee_name,
                    roles.is_management
                FROM employees
                INNER JOIN roles ON employees.role_id=roles.id
                WHERE is_management=true
                ORDER BY employee_name ASC;`;
    let manager = await db.promise().query(sql)
    .then(res => {
        return res[0];
    });
    return manager;
}

async function getByManager(manager) {
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
                WHERE managers.id = ?
                ORDER BY employee_name ASC;`;
    let employee = await db.promise().query(sql, [manager], (err, res) => {
        console.log(res);
    })
    return employee[0];
}

async function getByDept(department) {
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
                WHERE departments.id = ?
                ORDER BY employee_name ASC;`;
    let employee = await db.promise().query(sql, [department], (err, res) => {
        console.log(res);
    })
    return employee[0];
}

async function addEmployee(firstName, lastName, role, manager) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES(?,?,?,?)`;
    db.query(sql, [firstName, lastName, role, manager], (err, result) => {
        console.log(result);
    });
}

async function updateRole(newRole, employee) {
    const sql = `UPDATE employees SET role_id = ?
                WHERE id = ?`
    db.query(sql, [newRole, employee], (err, result) => {
        console.log(result);
    });
}

async function updateManager(newManager, employee) {
    const sql = `UPDATE employees SET manager_id = ?
                WHERE id = ?`
    db.query(sql, [newManager, employee], (err, result) => {
        console.log(result);
    });
}

async function deleteEmployee(employee) {
    const sql = `DELETE FROM employees WHERE id = ?`
    await db.promise().query(sql, [employee], (err, result) => {
        console.log(result);
    });
}

module.exports = {
    getEmployees,
    getManagers,
    getByManager,
    getByDept,
    addEmployee,
    updateRole,
    updateManager,
    deleteEmployee
}