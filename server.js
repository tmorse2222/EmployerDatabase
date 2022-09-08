const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'root',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

function start() {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: [
            'View all employees',
            'Add employee',
            'Update employee role',
            'View all roles',
            'Add role',
            'View all departments',
            'Add department',
            'Quit'
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'Add role':
                addRole();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Quit':
                quit();
                break;
        }
    });
};

function viewAllDepartments() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
        start();
    });
};

function viewAllRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.table(results);
        start();
    });
};

function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.table(results);
        start();
    });
};

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName'
    }).then((answer) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, answer.departmentName, function (err, results) {
            console.table(results);
            console.log(`Department added!`);
            start();
        });
    });
};

function addRole() {
    const departmentArray = [];
    db.query(`SELECT id FROM department`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            departmentArray.push(results[i].id);
        }
    });
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'roleSalary'
        },
        {
            type: 'list',
            message: 'What is the department ID of the role?',
            name: 'roleDepartment',
            choices: departmentArray
        }
    ]).then((answer) => {
        const id = parseInt(answer.roleDepartment);
        const salary = parseInt(answer.roleSalary);
        db.query(`INSERT INTO role (title, salary, departmentID) VALUES (?, ?, ?)`, [answer.roleName, salary, id], function (err, results) {
            console.table(results);
            console.log(`Role added!`);
            start();
        });
    });
};

function addEmployee() {
    const roleArray = [];
    db.query(`SELECT id FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArray.push(results[i].id);
        }
    });
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'employeeFirstName'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'employeeLastName'
        },
        {
            type: 'list',
            message: 'What is the role ID of the employee?',
            name: 'employeeRole',
            choices: roleArray
        },
        {
            type: 'input',
            message: 'What is the manager ID of the employee? If none, enter 0.',
            name: 'employeeManager',
            default: 0
        }
    ]).then((answer) => {
        const id = parseInt(answer.employeeRole);
        const managerID = parseInt(answer.employeeManager);
        db.query(`INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES (?, ?, ?, ?)`, [answer.employeeFirstName, answer.employeeLastName, id, managerID], function (err, results) {
            console.table(results);
            console.log(`Employee added!`);
            start();
        });
    });
};

start();