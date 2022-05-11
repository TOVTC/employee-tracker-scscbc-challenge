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
    let employee = await db.promise().query(sql, [manager], (err, result) => {
        if (err) {
            return [{message: "An error occurred."}];
        }
        return result;
    })
    .then(res => {
        if (res[0].length === 0) {
            return [{message: "No entries to display."}];
        }
        return res[0];
    })
    .catch(err => {
        console.log(err);
    });
    return employee;
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
    let employee = await db.promise().query(sql, [department], (err, result) => {
        if (err) {
            return [{message: "An error occurred."}];
        }
        return result;
    })
    .then(res => {
        if (res[0].length === 0) {
            return [{message: "No entries to display."}];
        }
        return res[0];
    })
    .catch(err => {
        console.log(err);
    });
    return employee;
}

async function addEmployee(firstName, lastName, role, manager) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES(?,?,?,?)`;
    await db.promise().query(sql, [firstName, lastName, role, manager], (err, result) => {
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
        console.log(`\nSuccessfully added entry - employee id: ${res[0].insertId}.\nAdded ${res[0].affectedRows} row.\n`);
        return;
    })
    .catch(err => {
        console.log(err);
    });
}

async function updateRole(newRole, employee) {
    const sql = `UPDATE employees SET role_id = ?
                WHERE id = ?`
    await db.promise().query(sql, [newRole, employee], (err, result) => {
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
        console.log(`\nSuccessfully updated ${res[0].changedRows} entry.\n`);
        return;
    })
    .catch(err => {
        console.log(err);
    });
}

async function updateManager(newManager, employee) {
    const sql = `UPDATE employees SET manager_id = ?
                WHERE id = ?`
    await db.promise().query(sql, [newManager, employee], (err, result) => {
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
        console.log(`\nSuccessfully updated ${res[0].changedRows} entry.\n`);
        return;
    })
    .catch(err => {
        console.log(err);
    });
}

async function deleteEmployee(employee) {
    const sql = `DELETE FROM employees WHERE id = ?`
    await db.promise().query(sql, [employee], (err, result) => {
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
    getEmployees,
    getManagers,
    getByManager,
    getByDept,
    addEmployee,
    updateRole,
    updateManager,
    deleteEmployee
}