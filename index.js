const inquirer = require("inquirer");
const db = require("./db/connection");
const {getDepts, addDept} = require("./assets/js/departments");
const {getRoles, addRole} = require("./assets/js/roles");
const {getEmployees, addEmployee, updateRole} = require("./assets/js/employees");

const departments = [];
const roles = [];
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
    },
    // {
    //     type: "list",
    //     name: "test",
    //     message: "test",
    //     choices: testArray
    // }
]

class Option {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

async function updateDepartments() {
    await getDepts()
    .then(res => {
        res.map(item => {
            departments.push(new Option(item.name, item.id));
        });
        console.log(departments);
    });
}

async function updateRoles() {
    await getRoles()
    .then(res => {
        res.map(item => {
            roles.push(new Option(item.job_title, item.id));
        });
        console.log(roles);
    });
}

async function updateEmployees() {
    await getEmployees()
    .then(res => {
        res.map(item => {
            employees.push(new Option(item.employee_name, item.id));
        });
        console.log(employees);
    });
}

async function deptDet() {
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Please enter the name of this department.",
    }])
    .then(async res => {
        await addDept(res.name);
    });
}

async function start() {
    await updateDepartments();
    await updateRoles();
    await updateEmployees();
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
                    console.log(employees);
                    console.log("\n");
                    console.table(employees);
                    start();
                    break;
                /*case "View employees by manager":
                case "View employees by department":*/ 
                case "Add department":
                    await deptDet()
                    start();
                    break;
                case "Add role":
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "dept",
                            message: "Please select a department.",
                            choices: departments
                        }
                    ])
                    .then(res => {
                        console.log(res);
                    })
                    break;
                case "Add employee":
                case "Update employee role":
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

start();

// INQUIRER
// stringify returned promises vs constructor classes
// each type of command triggers a different instance of inquirer?

// add a dept: post dept -> what is the dept's name?
// add a role: post role, get depts -> what is the title of this position? What is the salary for this position? What department does this role belong to (dropdown)?
// add an employee: post employee, get roles, get employees -> first name? last name? role (dropdown)? manager (dropdown)?

// update employee role: get employees, get roles, put employee

// validations (don't forget to add error handling for database) and .catch
// deparments should be unique?