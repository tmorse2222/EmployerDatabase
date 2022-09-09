# EmployerDatabase
Tyler Morse<br>
Employer Database<br>
<br>
User Story:<br>
AS A business owner<br>
I WANT to be able to view and manage the departments, roles, and employees in my company<br>
SO THAT I can organize and plan my business<br>
<br>
Acceptance Criteria:<br>
GIVEN a command-line application that accepts user input<br>
WHEN I start the application<br>
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role<br>
WHEN I choose to view all departments<br>
THEN I am presented with a formatted table showing department names and department ids<br>
WHEN I choose to view all roles<br>
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role<br>
WHEN I choose to view all employees<br>
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to<br>
WHEN I choose to add a department<br>
THEN I am prompted to enter the name of the department and that department is added to the database<br>
WHEN I choose to add a role<br>
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database<br>
WHEN I choose to add an employee<br>
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database<br>
WHEN I choose to update an employee role<br>
THEN I am prompted to select an employee to update and their new role and this information is updated in the database<br>
Description:<br>
This application is executed through node.js, including "mysql2", "inquirer", and "jest" npms, as well as custom classes and OOP emplimentation. Once initiated, A series of prompts appear through the terminal requiring information to be passed to the new HTML file. Once complete, a pre-styled HTML file of project members and information will be created. Responsive on all screen sizes.
A link to a video demo of the application can be found <a href="https://drive.google.com/file/d/1BJ3A17VPO9xyPI7A9FYKqPIwEwAxX9tO/view">here<a>.