
  # Employee Tracker (Database)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)</br></br>
    
  This application uses MySQL, Node.js, and others to host and maintain a database of company employees. Users are able to interact with the database using the terminal to view, update, add, and delete department, role, and employee information.
  
  ## Table of Contents
  * [Bonus Features](#features)
  * [Built With](#built)
  * [Installation](#installation)
  * [Usage Information](#usage)
  * [Authors & Acknowledgements](#credits)
  * [License](#license)
  * [Contact](#questions)
  
  ## Bonus Features<a name="features"></a>
  This application additionally allows for users to update employee role and manager, view employees filtered by manager or department, delete department/role/employee entries, and view the total budget used per department (total salary of all employees).
    
  ## Built With<a name="built"></a>
  Built with:
  * JavaScript
  * Node.js
  * MySQL
  * npm dotenv
  * npm console.table
  * npm inquirer
  * npm mysql2

  ## Installation <a name="installation"></a>
  After cloning the repository, please update the sample.env file with your own credentials and change the file name back to ".env". After ensuring MySQL has been installed, use the MySQL terminal to run the SOURCE files to generate a template database - the seeds.sql file can be updated prior to running SOURCE to seed the database with user-relevant values. Then, install all runtime dependencies using "npm i" in GitBash (or equivalent). Enter "npm start" in the terminal to run the application.
  
  ## Usage Information<a name="usage"></a>
  This application provides a basic interface for interacting with an employee tracker database in MySQL. The database keeps track of departments, job titles, salaries, employee names, and employee managers.</br>
  Video walkthrough of how to use this application, [here](https://drive.google.com/drive/folders/1SKFLsBSltWagLwwMbXyQhPIatawglmnd?usp=sharing).</br>
  </br>![Employee Tracker (Database)](./employee-tracker.png "Employee Tracker (Database)")</br>
    
  
  ## Authors & Acknowledgements<a name="credits"></a>
  The following resources were particularly helpful in the construction of this application:</br>These articles [here](https://www.sqlshack.com/learn-sql-join-multiple-tables/) and [here](https://learnsql.com/blog/what-is-self-join-sql/) on SQL table joins and [this](https://www.w3schools.com/sql/func_sqlserver_concat.asp) article on concatenating column headings in SQL.</br></br>
  Special thanks to Kevin336's csv file [here](https://gist.github.com/kevin336/acbb2271e66c10a5b73aacf82ca82784) which I edited to make the example seeds for this database.
  
  Made by [TOVTC](https://github.com/TOVTC).
  
  ## License<a name="license"></a>
  This application uses the MIT License. For more information regarding usage, please visit [this link](https://opensource.org/licenses/MIT).
    
  ## Questions?<a name="questions"></a>
  Contact repository author via [GitHub](https://github.com/TOVTC).
    
  ## Assignment Information - SQL Challenge: Employee Tracker
  ### User Story
  AS A business owner</br>
  I WANT to be able to view and manage the departments, roles, and employees in my company</br>
  SO THAT I can organize and plan my business

  ### Acceptance Criteria
  GIVEN a command-line application that accepts user input</br>
  WHEN I start the application</br>
  THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role</br>
  WHEN I choose to view all departments</br>
  THEN I am presented with a formatted table showing department names and department ids</br>
  WHEN I choose to view all roles</br>
  THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role</br>
  WHEN I choose to view all employees</br>
  THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to</br>
  WHEN I choose to add a department</br>
  THEN I am prompted to enter the name of the department and that department is added to the database</br>
  WHEN I choose to add a role</br>
  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database</br>
  WHEN I choose to add an employee</br>
  THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database</br>
  WHEN I choose to update an employee role</br>
  THEN I am prompted to select an employee to update and their new role and this information is updated in the database</br>