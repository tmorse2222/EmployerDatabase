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