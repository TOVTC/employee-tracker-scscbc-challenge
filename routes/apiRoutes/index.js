const router = require("express").Router();
router.use(require("./departmentRoutes"));
router.use(require("./rolesRoutes"));
router.use(require("./employeeRoutes"));

module.exports = router;