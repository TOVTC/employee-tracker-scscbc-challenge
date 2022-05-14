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
    let d = await getDepts();
    d.map(item => {
            dArr.push(new Option(item.department_name, item.id));
        });
}

async function updateRoles() {
    rArr.length = 0;
    let r = await getRoles();
    r.map(item => {
        rArr.push(new Option(item.job_title, item.id));
    });
}

async function updateManagers() {
    mArr.length = 0;
    let m = await getManagers();
    m.map(item => {
        mArr.push(new Option(item.employee_name, item.id));
    });
}

async function updateEmployees() {
    eArr.length = 0;
    let e = await getEmployees();
    e.map(item => {
        eArr.push(new Option(item.employee_name, item.id));
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
    try {
        let res = await inquirer.prompt(mainMenu);
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
                try {
                    let vbm = await inquirer.prompt([
                        {
                            type: "list",
                            name: "manager",
                            message: "Filter by which manager?",
                            choices: mArr
                        }
                    ]);
                    let byManager = await getByManager(vbm.manager);
                    console.log("\n");
                    console.table(byManager);
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
            case "View employees by department": 
                try {
                    let vbd = await inquirer.prompt([
                        {
                            type: "list",
                            name: "department",
                            message: "Filter by which department?",
                            choices: dArr
                        }
                    ]);
                    let byDept = await getByDept(vbd.department);
                    console.log("\n");
                    console.table(byDept);
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
        // Add
            case "Add department":
                try {
                    let ad = await inquirer.prompt(deptDet);
                    let dName = titleCase(ad.name);
                    await addDept(dName);
                    await updateDepts();
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
            case "Add role":
                try {
                    let ar = await inquirer.prompt(roleDet);
                    let rName = titleCase(ar.title);
                    await addRole(rName, ar.salary, ar.dept, ar.management);
                    await updateRoles();
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
            case "Add employee":
                try {
                    let ae = await inquirer.prompt(employeeDet);
                    let firstName = titleCase(ae.firstName);
                    let lastName = titleCase(ae.lastName);
                    await addEmployee(firstName, lastName, ae.role, ae.manager);
                    await updateEmployees();
                    await updateManagers();
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
        // Update
            case "Update employee role":
                try {
                    let uer = await inquirer.prompt([
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
                    ]);
                    await updateRole(uer.newRole, uer.employee);
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
            case "Update employee manager":
                try {
                    let uem = await inquirer.prompt([
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
                    ]);
                    await updateManager(uem.newManager, uem.employee);
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
        // Delete - adds the option to cancel the delete action
            case "Delete department":
                try {
                    dArr.unshift(new Option("Cancel", -1));
                    let dd = await inquirer.prompt([
                        {
                            type: "list",
                            name: "department",
                            message: "Delete which department?",
                            choices: dArr,
                            default: "Cancel"
                        }
                    ]);
                    if (dd.department !== -1) {
                        await deleteDept(dd.department);
                    }
                    updateDepts();
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
            case "Delete role":
                try {
                    rArr.unshift(new Option("Cancel", -1));
                    let dr = await inquirer.prompt([
                        {
                            type: "list",
                            name: "role",
                            message: "Delete which role?",
                            choices: rArr,
                            default: "Cancel"
                        }
                    ]);
                    if (dr.role !== -1) {
                        await deleteRole(dr.role);
                    }
                    updateRoles();
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
            case "Delete employee":
                try {
                    eArr.unshift(new Option("Cancel", -1));
                    let de = await inquirer.prompt([
                        {
                            type: "list",
                            name: "employee",
                            message: "Delete which employee?",
                            choices: eArr,
                            default: "Cancel"
                        }
                    ]);
                    if (de.employee !== -1) {
                        await deleteEmployee(de.employee);
                    }
                    updateEmployees();
                    updateManagers();
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
        // Budget
            case "View utilized budget by department":
                try {
                    let vbbd = await inquirer.prompt([
                        {
                            type: "list",
                            name: "department",
                            message: "View utilized budget for which department?",
                            choices: dArr
                        }
                    ]);
                    let budget = await viewBudget(vbbd.department);
                    console.log("\n");
                    console.table(budget);
                    start();
                    break;
                }
                catch (err) {
                    console.log(err);
                }
        // Quit
            case "Quit":
                process.exit();
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function load() {
    await updateDepts();
    await updateRoles();
    await updateManagers();
    await updateEmployees();
    start();
}

load();