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
                LEFT JOIN departments ON roles.dept_id=departments.id
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

router.post("/employee", ({body}, res) => {
    // add validation here
    // if (errors) {
    //     res.status(400).json({error: errors});
    //     return;
    // }
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES(?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: body
        });
    });
});

router.put("/employee/:id", (req, res) => {
    // add validation here
    // if (errors) {
    //     res.status(400).json({error: errors});
    //     return;
    // }
    const sql = `UPDATE employees SET role_id = ?
                WHERE id = ?`
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
            // check if a record was found
        } else if (!result.affectedRows) {
            res.json({
                message: "Employee not found"
            });
        } else {
            res.json({
                message: "success",
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

module.exports = router;