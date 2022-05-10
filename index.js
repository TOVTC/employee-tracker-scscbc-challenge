const inquirer = require("inquirer");
const db = require("./db/connection");
const {getDepts, addDept} = require("./assets/js/departments");
const {getRoles, addRole} = require("./assets/js/roles");
const {getEmployees, getManagers, addEmployee, updateRole} = require("./assets/js/employees");

class Option {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

const departments = [];
const roles = [];
const managers =[];
const employees =[];

const mainMenu = [
    {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View all departments",
                    "View all roles", 
                    "View all employees",
                    /*, "View employees by manager",
                    "View employees by department,"*/ 
                    "Add department", 
                    "Add role", 
                    "Add employee", 
                    "Update employee role", 
                    /*"Update employee manager", 
                    "Delete department",
                    "Delete role",
                    "Delete employee",
                    "View utilized budget by department"*/
                    "Quit"],
        default: "Quit"
    }
]

const deptDet = [
    {
        type: "input",
        name: "name",
        message: "Please enter the name of this department."
    }
]

const roleDet = [
    {
        type: "input",
        name: "title",
        message: "Please enter the position title."
    }, 
    {
        type: "input",
        name: "salary",
        message: "What is the salary for this position?"
    },
    {
        type: "list",
        name: "dept",
        message: "Within which department is this role?",
        choices: departments
    },
    {
        type: "confirm",
        name: "management",
        message: "Is this role a management position?",
        default: false
    }
]

const employeeDet = [
    {
        type: "input",
        name: "firstName",
        message: "Please enter this employee's first name."
    }, 
    {
        type: "input",
        name: "lastName",
        message: "Please enter this employee's last name."
    },
    {
        type: "list",
        name: "role",
        message: "What position does this employee hold?",
        choices: roles
    },
    {
        type: "list",
        name: "manager",
        message: "Under which manager does this employee work?",
        choices: managers
    }
]

const updRole = [
    {
        type: "list",
        name: "employee",
        message: "Which employee record would you like to update?",
        choices: employees
    },
    {
        type: "list",
        name: "newRole",
        message: "What position does this employee hold?",
        choices: roles
    }
]

async function updateDepts() {
    await getDepts()
    .then(res => {
        res.map(item => {
            departments.push(new Option(item.name, item.id));
        });
    });
}

async function updateRoles() {
    await getRoles()
    .then(res => {
        res.map(item => {
            roles.push(new Option(item.job_title, item.id));
        });
    });
}

async function updateManagers() {
    await getManagers()
    .then(res => {
        res.map(item => {
            managers.push(new Option(item.employee_name, item.id));
        });
    });
}

async function updateEmployees() {
    await getEmployees()
    .then(res => {
        res.map(item => {
            employees.push(new Option(item.employee_name, item.id));
        });
    });
}

async function start() {
    inquirer.prompt(mainMenu)
        .then(async res => {
            switch(res.menu) {
                case "View all departments":
                    let depts = await getDepts();
                    console.log("\n");
                    console.table(depts);
                    start();
                    break;
                case "View all roles":
                    let roles = await getRoles();
                    console.log("\n");
                    console.table(roles);
                    start();
                    break;
                case "View all employees":
                    let employees = await getEmployees();
                    console.log("\n");
                    console.table(employees);
                    start();
                    break;
                /*case "View employees by manager":
                case "View employees by department":*/ 
                case "Add department":
                    inquirer.prompt(deptDet)
                    .then(async res => {
                        await addDept(res.name);
                        await updateDepts();
                        start();
                    });
                    break;
                case "Add role":
                    inquirer.prompt(roleDet)
                    .then(async res => {
                        await addRole(res.title, res.salary, res.dept, res.management);
                        await updateRoles();
                        start();
                    });
                    break;
                case "Add employee":
                    inquirer.prompt(employeeDet)
                    .then(async res => {
                        await addEmployee(res.firstName, res.lastName, res.role, res.manager);
                        await updateEmployees();
                        await updateManagers();
                        start();
                    });
                    break;
                case "Update employee role":
                    inquirer.prompt(updRole)
                    .then(async res => {
                        await updateRole(res.newRole, res.employee);
                        start();
                    })
                    break;
                /*case "Update employee manager":
                case "Delete department":
                case "Delete role":
                case "Delete employee":
                case "View utilized budget by department":*/
                case "Quit":
                    process.exit();
            }
        })
}

async function load() {
    await updateDepts();
    await updateRoles();
    await updateManagers();
    await updateEmployees();
    start();
}

load();

// update employee role: get employees, get roles, put employee
// fix console.log(results) for add entry
// validations (don't forget to add error handling for database) and .catch
// deparments should be unique?