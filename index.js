// SQL
// set up folders for SQL tables
// create databse and tables in my sql terminal before adding to .sql files
// departments, roles, employees
// departments: department names and id
// roles: job title, role id, department the role belongs to, salary for the role
// employees: id, first name, last name, job title, departments, salaries, managers

// departments (name and id)
// roles table (job title, role id, foreign key to dept table, salary for role)
// employees table (id, first name, last name, foreign key to role id + department + salary, foreign key to another employee - self-referring key)

// .env file
// db/
// db.sql
// schema.sql
// seeds.sql

// SERVER
// get: departments, roles, employees
// post: add a department
// post: add a role
// post: add an employee
// put: update an employee role
// router file for each type of table to handle specific types of requests?

// maybe use constructor functions to create specific objects out of inquirer responses?

// INQUIRER
// stringify returned promises
// each type of command triggers a different instance of inquirer?
// object.data[...] - so for each item in the returned data array, join the values needed and push to inquirer options?

// validations and bonuses, change to asynchronous calls
// MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises
// having what you need to post/push be an object is beneficial
// if you're just getting data, you can use the console.table package to render rows using the data.array
// do you push properties of returned data objects into an array and use inquirer.prompt?