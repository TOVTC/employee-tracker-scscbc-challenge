const router = require("express").Router();
const db = require("../../db/connection");

router.get("/roles", (req, res) => {
    const sql = `SELECT roles.id, roles.job_title, roles.salary, departments.name
                FROM roles
                LEFT JOIN departments ON roles.dept=departments.id;`;
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

router.post("/role", ({body}, res) => {
    // add validation here
    // if (errors) {
    //     res.status(400).json({error: errors});
    //     return;
    // }
    const sql = `INSERT INTO roles (job_title, salary, dept_id)
                    VALUES(?,?,?)`;
    const params = [body.job_title, body.salary, body.dept_id];
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

module.exports = router;