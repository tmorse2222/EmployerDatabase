-- Creates new database
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;
-- Creates department table
CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);
-- Creates role table
CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
departmentID INT,
FOREIGN KEY (departmentID)
REFERENCES department(id)
ON DELETE SET NULL
);
-- Creates employee table
CREATE TABLE employee (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
roleID INT,
managerID INT,
FOREIGN KEY (roleID)
REFERENCES role(id)
ON DELETE SET NULL
);