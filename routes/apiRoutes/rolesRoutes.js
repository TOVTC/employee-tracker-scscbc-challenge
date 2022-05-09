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

module.exports = router;