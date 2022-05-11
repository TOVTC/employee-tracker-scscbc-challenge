const inquirer = require("inquirer");
const {getDepts, addDept, deleteDept, viewBudget} = require("./assets/js/departments");
const {getRoles, addRole, deleteRole} = require("./assets/js/roles");
const {getEmployees, getManagers, getByManager, getByDept, addEmployee, updateRole, updateManager, deleteEmployee} = require("./assets/js/employees");

// dynamic inquirer list options (departments, roles, managers, employees)
let dArr = [];
let rArr = [];
let mArr = [];
let eArr = [];

// creates name + value objects to translate name options to id
class Option {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

// dynamically update inquirer array options
async function updateDepts() {
    dArr.length = 0;
    await getDepts()
    .then(res => {
        res.map(item => {
            dArr.push(new Option(item.department_name, item.id));
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

// set incoming string values to title case
function titleCase(str) {
    let strArr = str.split(" ");
    let newArr = strArr.map(word => {
        var capt = word.substring(1, 0).toUpperCase();
        var string = word.substring(1).toLowerCase();
        return capt += string;
    });
    return newArr.join(" ");
}

// long inquirer prompts/prompts requiring additional validation
const mainMenu = [
    {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View all departments",
                    "View all roles",
                    "View all employees",
                    "View employees by manager",
                    "View employees by department",
                    "Add department",
                    "Add role",
                    "Add employee",
                    "Update employee role",
                    "Update employee manager",
                    "Delete department",
                    "Delete role",
                    "Delete employee",
                    "View utilized budget by department",
                    "Quit"],
        default: "Quit"
    }
]

// for add department
const deptDet = [
    {
        type: "input",
        name: "name",
        message: "Please enter the name of this department.",
        validate: res => {
            if (!res || res.length > 30) {
                console.log(" - response must be between 1 and 30 characters");
                return false;
            }
            return true;
        }
    }
]

// for add role
const roleDet = [
    {
        type: "input",
        name: "title",
        message: "Please enter the position title.",
        validate: res => {
            if (!res || res.length > 30) {
                console.log(" - response must be between 1 and 30 characters");
                return false;
            }
            return true;
        }
    }, 
    {
        type: "input",
        name: "salary",
        message: "What is the salary for this position?",
        validate: res => {
            if (!res || res % 1 != 0) {
                console.log(" - a numerical value is required");
                return false;
            } else {
                return true;
            }
        }
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

// for add employee
const employeeDet = [
    {
        type: "input",
        name: "firstName",
        message: "Please enter this employee's first name.",
        validate: res => {
            if (!res || res.length > 30) {
                console.log(" - response must be between 1 and 30 characters");
                return false;
            }
            return true;
        }
    }, 
    {
        type: "input",
        name: "lastName",
        message: "Please enter this employee's last name.",
        validate: res => {
            if (!res || res.length > 30) {
                console.log(" - response must be between 1 and 30 characters");
                return false;
            }
            return true;
        }
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

// loop and handle options
async function start() {
    inquirer.prompt(mainMenu)
        .then(async res => {
            switch(res.menu) {
            // View
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
            // View by
                case "View employees by manager":
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "manager",
                            message: "Filter by which manager?",
                            choices: mArr
                        }
                    ])
                    .then(async res => {
                        let byManager = await getByManager(res.manager);
                        console.log("\n");
                        console.table(byManager);
                        start();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    break;
                case "View employees by department": 
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "department",
                            message: "Filter by which department?",
                            choices: dArr
                        }
                    ])
                    .then(async res => {
                        let byDept = await getByDept(res.department);
                        console.log("\n");
                        console.table(byDept);
                        start();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    break;
            // Add
                case "Add department":
                    inquirer.prompt(deptDet)
                    .then(async res => {
                        let name = titleCase(res.name);
                        await addDept(name);
                        await updateDepts();
                        start();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    break;
                case "Add role":
                    inquirer.prompt(roleDet)
                    .then(async res => {
                        let name = titleCase(res.title);
                        await addRole(name, res.salary, res.dept, res.management);
                        await updateRoles();
                        start();
                    })
                    .catch(err => {
                        console.log(err);
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
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    break;
            // Update
                case "Update employee role":
                    inquirer.prompt([
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
                    ])
                    .then(async res => {
                        await updateRole(res.newRole, res.employee);
                        start();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    break;
                case "Update employee manager":
                    inquirer.prompt([
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
                    ])
                    .then(async res => {
                        await updateManager(res.newManager, res.employee);
                        start();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    break;
            // Delete - adds the option to cancel the delete action
                case "Delete department":
                    dArr.unshift(new Option("Cancel", -1));
                        inquirer.prompt([
                            {
                                type: "list",
                                name: "department",
                                message: "Delete which department?",
                                choices: dArr,
                                default: "Cancel"
                            }
                        ])
                        .then(async res => {
                            if (res.department !== -1) {
                                await deleteDept(res.department);
                            }
                            updateDepts();
                            start();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    break;
                case "Delete role":
                    rArr.unshift(new Option("Cancel", -1));
                        inquirer.prompt([
                            {
                                type: "list",
                                name: "role",
                                message: "Delete which role?",
                                choices: rArr,
                                default: "Cancel"
                            }
                        ])
                        .then(async res => {
                            if (res.role !== -1) {
                                await deleteRole(res.role);
                            }
                            updateRoles();
                            start();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    break;
                case "Delete employee":
                    eArr.unshift(new Option("Cancel", -1));
                        inquirer.prompt([
                            {
                                type: "list",
                                name: "employee",
                                message: "Delete which employee?",
                                choices: eArr,
                                default: "Cancel"
                            }
                        ])
                        .then(async res => {
                            if (res.employee !== -1) {
                                await deleteEmployee(res.employee);
                            }
                            updateEmployees();
                            updateManagers();
                            start();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    break;
            // Budget
                case "View utilized budget by department":
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "department",
                            message: "View utilized budget for which department?",
                            choices: dArr
                        }
                    ])
                    .then(async res => {
                        let budget = await viewBudget(res.department);
                        console.log("\n");
                        console.table(budget);
                        start();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    break;
            // Quit
                case "Quit":
                    process.exit();
            }
        })
        .catch(err => {
            console.log(err);
        });
}

async function load() {
    await updateDepts();
    await updateRoles();
    await updateManagers();
    await updateEmployees();
    start();
}

load();