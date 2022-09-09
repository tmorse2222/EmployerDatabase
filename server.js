// Require dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
// Connect to database
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
// Create the start function, which prompts the user for what action they should take
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
        // Based on their answer, call the appropriate function
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
// Creates function allowing departments to be viewed
function viewAllDepartments() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
        start();
    });
};
// Creates function allowing roles to be viewed
function viewAllRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.table(results);
        start();
    });
};
// Creates function allowing employees to be viewed
function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.table(results);
        start();
    });
};
// Creates function allowing departments to be added
function addDepartment() {
    // Prompts user for department name
    inquirer.prompt({
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName'
    }).then((answer) => {
        // Inserts department name into department table
        db.query(`INSERT INTO department (name) VALUES (?)`, answer.departmentName, function (err, results) {
            console.table(results);
            console.log(`Department added!`);
            start();
        });
    });
};
// Creates function allowing roles to be added
function addRole() {
    // Creates array for depatment id choices
    const departmentArray = [];
    db.query(`SELECT id FROM department`, function (err, results) {
        // Loops through results and pushes id into department array
        for (let i = 0; i < results.length; i++) {
            departmentArray.push(results[i].id);
        }
    });
    // Prompts user for role title, salary, and department id
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
        // Converts salary and department id to integers
        const id = parseInt(answer.roleDepartment);
        const salary = parseInt(answer.roleSalary);
        // Inserts role title, salary, and department id into role table
        db.query(`INSERT INTO role (title, salary, departmentID) VALUES (?, ?, ?)`, [answer.roleName, salary, id], function (err, results) {
            console.table(results);
            console.log(`Role added!`);
            start();
        });
    });
};

function addEmployee() {
    // Creates array for role id choices
    const roleArray = [];
    // Creates array for manager id choices
    const managerArray = ["null",];
    // loops through employee table and pushes id into manager array
    db.query(`SELECT id FROM employee`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            managerArray.push(results[i].id);
        }
    });
    // loops through role table and pushes id into role array
    db.query(`SELECT id FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArray.push(results[i].id);
        }
    });
    // Prompts user for employee first name, last name, role id, and manager id
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
            type: 'list',
            message: 'What is the manager ID of the employee? Use null if no manager.',
            name: 'employeeManager',
            choices: managerArray
        }
    ]).then((answer) => {
        // conditionally converts manager id to integer if not null
        if (answer.employeeManager === "null") {
            let id = null;
            // converts role id to integer
            let role = parseInt(answer.employeeRole);
            // inserts employee first name, last name, role id, and manager id into employee table
            db.query(`INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES (?, ?, ?, ?)`, [answer.employeeFirstName, answer.employeeLastName, role, id], function (err, results) {
                console.table(results);
                console.log(`Employee added!`);
                start();  
            });       
        } else {
            // converts manager id and role id to integers
            let id = parseInt(answer.employeeManager);
            let role = parseInt(answer.employeeRole);
            // inserts employee first name, last name, role id, and manager id into employee table
            db.query(`INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES (?, ?, ?, ?)`, [answer.employeeFirstName, answer.employeeLastName, role, id], function (err, results) {
                console.table(results);
                console.log(`Employee added!`);
                start();
            });
    };
    });
};
// Creates function allowing employee roles to be updated
function updateEmployeeRole() {
    // Creates array for employee id choices
    const employeeIDs = [];
    // Creates array for role id choices
    const roleIDs = [];
    // loops through employee table and pushes id into employee id array
    db.query(`SELECT id FROM employee`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            employeeIDs.push(results[i].id);
        }
        // Asks user for employee id
        inquirer.prompt({
            type: 'list',
            message: 'Which employee would you like to update?',
            name: 'employeeID',
            choices: employeeIDs
        }).then((answer) => {
            // Converts employee id to integer
            const id = parseInt(answer.employeeID);
            // loops through role table and pushes id into role id array
            db.query(`SELECT id FROM role`, function (err, results) {
                for (let i = 0; i < results.length; i++) {
                    roleIDs.push(results[i].id);
                }
                // Asks user for new role id
                inquirer.prompt({
                    type: 'list',
                    message: 'What is the new role ID of the employee?',
                    name: 'employeeRole',
                    choices: roleIDs
                }).then((answer) => {
                    // Converts role id to integer
                    const roleID = parseInt(answer.employeeRole);
                    // Updates employee role id in employee table
                    db.query(`UPDATE employee SET roleID = ? WHERE id = ?`, [roleID, id], function (err, results) {
                        console.table(results);
                        console.log(`Employee role updated!`);
                        start();
                    });
                });
            });
        });
    });
};
// Creates function exiting application
function quit() {
    console.log(`Goodbye!`);
    process.exit();
};
// Calls start function on application start
start();