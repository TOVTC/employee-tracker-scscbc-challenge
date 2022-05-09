// SQL
// test table joins

// SELECT
// 	employees.id,
// 	concat(employees.last_name, ", ", employees.first_name) AS employee_name,
// 	roles.job_title,
// 	roles.salary,
// 	departments.name AS department,
// 	concat(managers.last_name, ", ", managers.first_name) AS manager_name
// FROM
// 	employees
// LEFT JOIN
// 	roles ON employees.role_id=roles.id
// LEFT JOIN
// 	departments ON roles.dept=departments.id
// LEFT JOIN
// 	employees managers ON employees.manager_id=managers.id;

// SELECT
// 	concat(employees.first_name, " ", employees.last_name) AS employee_name,
// 	roles.job_title,
// 	roles.salary,
// 	departments.name AS department
// FROM
// 	employees
// LEFT JOIN
// 	roles ON employees.role_id=roles.id
// LEFT JOIN
// 	departments ON roles.dept=departments.id;

// SELECT
// 	concat(employees.first_name, " ", employees.last_name) AS employee_name,
// 	concat(managers.first_name, " ", managers.last_name) AS manager_name,
// FROM 
// 	employees employees
// LEFT JOIN
// 	employees managers
// ON
// 	employees.manager_id=managers.id;

// SERVER
// get: view departments
// get: view roles
// get: view employees
// post: add a department
// post: add a role
// post: add an employee
// put: update an employee role

// router file for each type of table to handle specific types of requests?
// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

// maybe use constructor functions to create specific objects out of inquirer responses?

// INQUIRER
// stringify returned promises
// each type of command triggers a different instance of inquirer?
// object.data[...] - so for each item in the returned data array, join the values needed and push to inquirer options?

// BONUSES
// update employee manager
// view employees by manager
// view employees by department
// delete department, roles, employees
// view total utilized budget by department (combined salaries of all dept employees)

// validations and bonuses, change to asynchronous calls
// MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises
// having what you need to post/push be an object is beneficial
// if you're just getting data, you can use the console.table package to render rows using the data.array
// do you push properties of returned data objects into an array and use inquirer.prompt?