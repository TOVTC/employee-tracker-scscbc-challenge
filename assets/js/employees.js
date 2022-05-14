const db = require("../../db/connection");
require("console.table");

// view all employees
async function getEmployees() {
    try {
        const sql = `SELECT
                        employees.id,
                        concat(employees.last_name, ", ", employees.first_name) AS employee_name,
                        roles.job_title,
                        roles.salary,
                        departments.department_name AS department,
                        concat(managers.last_name, ", ", managers.first_name) AS manager_name
                    FROM employees
                    LEFT JOIN roles ON employees.role_id=roles.id
                    LEFT JOIN departments ON roles.dept_id=departments.id
                    LEFT JOIN employees managers ON employees.manager_id=managers.id
                    ORDER BY employee_name ASC;`;
        let employee = await db.promise().query(sql);
        if (!employee) {
            return [{message: "An error occurred."}];
        }
        if (employee[0].length === 0) {
            return [{message: "No entries to display."}];
        }
        return employee[0];
    }
    catch (err) {
        console.log(err);
    }
}

// load managers only
async function getManagers() {
    try {
        const sql = `SELECT
                        employees.id,
                        concat(employees.last_name, ", ", employees.first_name) AS employee_name,
                        roles.is_management
                    FROM employees
                    INNER JOIN roles ON employees.role_id=roles.id
                    WHERE is_management=true
                    ORDER BY employee_name ASC;`;
        let manager = await db.promise().query(sql);
        if (!manager) {
            return [{message: "An error occurred."}];
        }
        if (manager[0].length === 0) {
            return [{message: "No entries to display."}];
        }
        return manager[0];
    }
    catch (err) {
        console.log(err);
    }
}

// view employees by manager
async function getByManager(manager) {
    try {
        const sql = `SELECT
                        employees.id,
                        concat(employees.last_name, ", ", employees.first_name) AS employee_name,
                        roles.job_title,
                        roles.salary,
                        departments.department_name AS department,
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
        });
        if (employee[0].length === 0) {
            return [{message: "No entries to display."}];
        }
        return employee[0];
    }
    catch (err) {
        console.log(err);
    }
}

// view employees by department
async function getByDept(department) {
    try {
        const sql = `SELECT
                        employees.id,
                        concat(employees.last_name, ", ", employees.first_name) AS employee_name,
                        roles.job_title,
                        roles.salary,
                        departments.department_name AS department,
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
        });
        if (employee[0].length === 0) {
            return [{message: "No entries to display."}];
        }
        return employee[0];
    }
    catch (err) {
        console.log(err);
    }
}

// add an employee
async function addEmployee(firstName, lastName, role, manager) {
    try {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES(?,?,?,?)`;
        let res = await db.promise().query(sql, [firstName, lastName, role, manager], (err, result) => {
            if (err) {
                return false;
            }
            return result;
        });
        if (res[0].warningStatus !== 0 || res[0].affectedRows !== 1) {
            console.log("An error occurred.");
            return;
        }
        console.log(`\nSuccessfully added entry - employee id: ${res[0].insertId}.\nAdded ${res[0].affectedRows} row.\n`);
        return;
    }
    catch (err) {
        console.log(err);
    }
}

// update employee role
async function updateRole(newRole, employee) {
    try {
        const sql = `UPDATE employees SET role_id = ?
                    WHERE id = ?`;
        let res = await db.promise().query(sql, [newRole, employee], (err, result) => {
            if (err) {
                return false;
            }
            return result;
        });
        if (res[0].warningStatus !== 0 || res[0].affectedRows !== 1) {
            console.log("An error occurred.");
            return;
        }
        console.log(`\nSuccessfully updated ${res[0].changedRows} entry.\n`);
        return;
    }
    catch (err) {
        console.log(err);
    }
}

// update employee manager
async function updateManager(newManager, employee) {
    try {
        const sql = `UPDATE employees SET manager_id = ?
                    WHERE id = ?`;
        let res = await db.promise().query(sql, [newManager, employee], (err, result) => {
            if (err) {
                return false;
            }
            return result;
        });
        if (res[0].warningStatus !== 0 || res[0].affectedRows !== 1) {
            console.log("An error occurred.");
            return;
        }
        console.log(`\nSuccessfully updated ${res[0].changedRows} entry.\n`);
        return;
    }
    catch (err) {
        console.log(err);
    }
}

// delete an employee
async function deleteEmployee(employee) {
    try {
        const sql = `DELETE FROM employees WHERE id = ?`;
        let res = await db.promise().query(sql, [employee], (err, result) => {
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