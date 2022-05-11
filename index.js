const inquirer = require("inquirer");
const {getDepts, viewBudget, addDept, deleteDept} = require("./assets/js/departments");
const {getRoles, addRole, deleteRole} = require("./assets/js/roles");
const {getEmployees, getManagers, getByManager, getByDept, addEmployee, updateRole, updateManager, deleteEmployee} = require("./assets/js/employees");

class Option {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

const dArr = [];
const rArr = [];
const mArr =[];
const eArr =[];

const mainMenu = [
    {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View all departments",//
                    "View all roles",//
                    "View all employees",//
                    "View employees by manager",//
                    "View employees by department",//
                    "Add department",//
                    "Add role",//
                    "Add employee",// 
                    "Update employee role",//
                    "Update employee manager",//
                    "Delete department",
                    "Delete role",
                    "Delete employee",
                    "View utilized budget by department",//
                    "Quit"],
        default: "Quit"
    }
]

const byMan = [
    {
        type: "list",
        name: "manager",
        message: "Filter by which manager?",
        choices: mArr
    }
]

const byDept = [
    {
        type: "list",
        name: "department",
        message: "Filter by which department?",
        choices: dArr
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
        choices: dArr
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
        choices: rArr
    },
    {
        type: "list",
        name: "manager",
        message: "Under which manager does this employee work?",
        choices: mArr
    }
]

const updRole = [
    {
        type: "list",
        name: "employee",
        message: "Which employee record would you like to update?",
        choices: eArr
    },
    {
        type: "list",
        name: "newRole",
        message: "What position does this employee hold?",
        choices: rArr
    }
]

const updMan = [
    {
        type: "list",
        name: "employee",
        message: "Which employee record would you like to update?",
        choices: eArr
    },
    {
        type: "list",
        name: "newManager",
        message: "Under which manager does this employee work?",
        choices: mArr
    }
]

const delDept = [
    {
        type: "list",
        name: "department",
        message: "Delete which department?",
        choices: dArr,
        default: "Cancel"
    }
]

const delRole = [
    {
        type: "list",
        name: "role",
        message: "Delete which role?",
        choices: rArr,
        default: "Cancel"
    }
]

const delEmp = [
    {
        type: "list",
        name: "employee",
        message: "Delete which employee?",
        choices: eArr,
        default: "Cancel"
    }
]

const deptBudget = [
    {
        type: "list",
        name: "department",
        message: "View utilized budget for which department?",
        choices: dArr
    }
]

async function updateDepts() {
    dArr.length = 0;
    await getDepts()
    .then(res => {
        res.map(item => {
            dArr.push(new Option(item.name, item.id));
        });
    });
}

async function updateRoles() {
    rArr.length = 0;
    await getRoles()
    .then(res => {
        res.map(item => {
            rArr.push(new Option(item.job_title, item.id));
        });
    });
}

async function updateManagers() {
    mArr.length = 0;
    await getManagers()
    .then(res => {
        res.map(item => {
            mArr.push(new Option(item.employee_name, item.id));
        });
    });
}

async function updateEmployees() {
    eArr.length = 0;
    await getEmployees()
    .then(res => {
        res.map(item => {
            eArr.push(new Option(item.employee_name, item.id));
        });
    });
}

function titleCase(str) {
    let strArr = str.split(" ");
    let newArr = strArr.map(word => {
        var capt = word.substring(1, 0).toUpperCase();
        var string = word.substring(1).toLowerCase();
        return capt += string;
    });
    return newArr.join(" ");
};

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
                case "View employees by manager":
                    inquirer.prompt(byMan)
                    .then(async res => {
                        let byManager = await getByManager(res.manager);
                        console.log("\n");
                        console.table(byManager);
                        start();
                    });
                    break;
                case "View employees by department": 
                    inquirer.prompt(byDept)
                    .then(async res => {
                        let byDept = await getByDept(res.department);
                        console.log("\n");
                        console.table(byDept);
                        start();
                    });
                    break;
                case "Add department":
                    inquirer.prompt(deptDet)
                    .then(async res => {
                        let name = titleCase(res.name);
                        await addDept(name);
                        await updateDepts();
                        start();
                    });
                    break;
                case "Add role":
                    inquirer.prompt(roleDet)
                    .then(async res => {
                        let name = titleCase(res.title);
                        await addRole(name, res.salary, res.dept, res.management);
                        await updateRoles();
                        start();
                    });
                    break;
                case "Add employee":
                    inquirer.prompt(employeeDet)
                    .then(async res => {
                        let firstName = titleCase(res.firstName);
                        let lastName = titleCase(res.lastName);
                        await addEmployee(firstName, lastName, res.role, res.manager);
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
                case "Update employee manager":
                    inquirer.prompt(updMan)
                    .then(async res => {
                        await updateManager(res.newManager, res.employee);
                        start();
                    })
                    break;
                case "Delete department":
                    dArr.unshift(new Option("Cancel", -1));
                    if (res.department !== -1) {
                        inquirer.prompt(delDept)
                        .then(async res => {
                            await deleteDept(res.department);
                            updateDepts();
                            start();
                        })
                    }
                    break;
                case "Delete role":
                    rArr.unshift(new Option("Cancel", -1));
                    if (res.department !== -1) {
                        inquirer.prompt(delRole)
                        .then(async res => {
                            await deleteRole(res.role);
                            updateRoles();
                            start();
                        })
                    }
                    break;
                case "Delete employee":
                    eArr.unshift(new Option("Cancel", -1));
                    if (res.department !== -1) {
                        inquirer.prompt(delEmp)
                        .then(async res => {
                            await deleteEmployee(res.employee);
                            updateEmployees();
                            updateManagers();
                            start();
                        })
                    }
                    break;
                case "View utilized budget by department":
                    inquirer.prompt(deptBudget)
                    .then(async res => {
                        let budget = await viewBudget(res.department);
                        console.log("\n");
                        console.table(budget);
                        start();
                    });
                    break;
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

// validations