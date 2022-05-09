DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    dept INT,
    CONSTRAINT fk_dept FOREIGN KEY (dept) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);


-- // departments (name and id)
-- // roles table (job title, role id, foreign key to dept table, salary for role)
-- // employees table (id, first name, last name, foreign key to role id + department + salary, foreign key to another employee - self-referring key)