INSERT INTO department (name)
VALUES
('Accounting'),
('Engineering'),
('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
('Junior Accountant', 50000.00, 1),
('Senior Accountant', 100000.00, 1),
('Junior Engineer', 65000.00, 2),
('Senior Accountant', 120000.00, 2),
('Marketing Intern', 35000.00, 3),
('Head of Marketing', 110000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 2, null),
('Jane', 'Doe', 1, 1),
('Adam', 'Smith', 1, 1),
('Ryan', 'Degraw', 4, null),
('Matt', 'White', 3, 4),
('Lenny', 'Lue', 6, null),
('Quincy', 'Adams', 5, 6),
('Reece', 'Devenney', 5, 6);
