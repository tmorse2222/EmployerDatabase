INSERT INTO department (name)
VALUES ("Sales"),
       ("Marketing"),
       ("Engineering"),
       ("Human Resources");

INSERT INTO role (title, salary, departmentID)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 120000, 3),
       ("Software Engineer", 100000, 3),
       ("Account Manager", 80000, 2),
       ("Accountant", 75000, 4),
       ("Legal Team Lead", 120000, 4);

INSERT INTO employee (first_name, last_name, roleID, managerID)
VALUES ("John", "Doe", 1, NULL),
       ("Jane", "Doe", 2, 1),
       ("Mary", "Smith", 3, NULL),
       ("Mark", "Smith", 4, 3),
       ("Bill", "Gates", 5, NULL),
       ("Steve", "Jobs", 6, NULL),
       ("Larry", "Page", 7, NULL),
       ("Sergey", "Brin", 4, 3);