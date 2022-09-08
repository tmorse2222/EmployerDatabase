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
VALUES ("John", "Doe", 1, null),
       ("Jane", "Doe", 2, 1),
       ("Mary", "Smith", 3, null),
       ("Mark", "Smith", 4, 3),
       ("Bill", "Gates", 5, null),
       ("Steve", "Jobs", 6, null),
       ("Larry", "Page", 7, null),
       ("Sergey", "Brin", 4, null);