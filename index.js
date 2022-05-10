const inquirer = require("inquirer");
const db = require("./db/connection");
const {getDepts} = require("./assets/js/departments");
const {getRoles, addRole} = require("./assets/js/roles");
const {getEmployees, addEmployee, updateRole} = require("./assets/js/employees");

db.connect(err => {
    if (err) throw err;
    console.log("Database Connected");
    start();
});

let testArray = ["option 1", "option 2", "option 3"]

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


function start() {
    inquirer.prompt(mainMenu)
        .then(res => {
            getDepts();
        })
}

// RESPONSE HANDLING
// one file for dept, role, emp of functions that make the actual API call to return data

// INQUIRER
// stringify returned promises vs constructor classes
// each type of command triggers a different instance of inquirer?
// object.data[...] - so for each item in the returned data array, join the values needed and push to inquirer options?
// maybe use constructor functions to create specific objects out of inquirer responses?

// view all depts: get depts
// view all roles: get roles
// view all employees: get employees

// add a dept: post dept -> what is the dept's name?
// add a role: post role, get depts -> what is the title of this position? What is the salary for this position? What department does this role belong to (dropdown)?
// add an employee: post employee, get roles, get employees -> first name? last name? role (dropdown)? manager (dropdown)?

// update employee role: get employees, get roles, put employee

// how to get both inquirer and server running on application startup
// validations and bonuses, change to asynchronous calls
// MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises
// post/push using constructor functions
// if you're just getting data, you can use the console.table package to render rows using the data.array
// do you push properties of returned data objects into an array and use inquirer.prompt? - the answer is yes, also choices can be OBJECTS with name and value properties