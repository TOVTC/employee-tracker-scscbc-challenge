const router = require("express").Router();
const db = require("../../db/connection");

router.get("/employees", (req, res) => {
    const sql = `SELECT
                    employees.id,
                    concat(employees.last_name, ", ", employees.first_name) AS employee_name,
                    roles.job_title,
                    roles.salary,
                    departments.name AS department,
                    concat(managers.last_name, ", ", managers.first_name) AS manager_name
                FROM employees
                LEFT JOIN roles ON employees.role_id=roles.id
                LEFT JOIN departments ON roles.dept=departments.id
                LEFT JOIN employees managers ON employees.manager_id=managers.id;`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

module.exports = router;