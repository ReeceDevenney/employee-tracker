const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'openers',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
        },
        {
            type: 'input',
            name: 'department',
            message: 'Enter new department here',
            when: (answers) => answers.openers === 'Add a department'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Enter new role here',
            when: (answers) => answers.openers === 'Add a role'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this new role?',
            when: (answers) => answers.openers === 'Add a role'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id for this role?',
            when: (answers) => answers.openers === 'Add a role'
        },
        {
            type: 'input',
            name: 'first_name',
            message: 'What is thier first name?',
            when: (answers) => answers.openers === 'Add an employee'
        },
        {
            type: 'input',
            name: 'first_name',
            message: 'What is thier last name?',
            when: (answers) => answers.openers === 'Add an employee'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is thier last name?',
            when: (answers) => answers.openers === 'Add an employee'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is thier role ID?',
            when: (answers) => answers.openers === 'Add an employee'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is thier manager ID?',
            when: (answers) => answers.openers === 'Add an employee'
        },
        {
            type: 'input',
            name: 'emp_update_id',
            message: 'What is the ID of the employee you wish to update?',
            when: (answers) => answers.openers === 'Update an employee'
        },
        {
            type: 'input',
            name: 'role_update_id',
            message: 'What is the new role ID for this employee?',
            when: (answers) => answers.openers === 'Update an employee'
        },

    ])
}

async function followup({ openers, department, role, first_name, last_name, salary, department_id, manager_id, role_id, emp_update_id, role_update_id }) {
    if (openers === 'View all departments') {
        const sql = `SELECT * FROM department;`
        await db.promise().query(sql)
            .then(([rows]) => {
                console.table(rows);
            })
            .catch(console.log)
    } else if (openers === 'View all roles') {
        const sql = `SELECT role.*, department.name 
        AS department_name 
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id;`
        await db.promise().query(sql)
            .then(([rows]) => {
                console.table(rows);
            })
            .catch(console.log)
    } else if (openers === 'View all employees') {
        const sql = `SELECT e.id, e.first_name, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS Manager, role.title, role.salary, department.name AS department
        FROM employee e
        LEFT JOIN employee m ON
        m.id = e.manager_id
        LEFT JOIN role
        ON e.role_id = role.id
        LEFT JOIN department
        ON role.department_id = department.id;`
        await db.promise().query(sql)
            .then(([rows]) => {
                console.table(rows);
            })
            .catch(console.log)
    } else if (department) {
        const sql = `INSERT INTO department (name) VALUES (?)`
        const params = department
        await db.promise().query(sql, params)
            .then(([rows]) => {
                console.table(rows);
            })
            .catch(console.log)
    } else if (role) {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`
        const params = [role, salary, department_id]
        await db.promise().query(sql, params)
            .then(([rows]) => {
                console.table(rows);
            })
            .catch(console.log)
    } else if (first_name) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`
        const params = [first_name, last_name, role_id, manager_id]
        await db.promise().query(sql, params)
            .then(([rows]) => {
                console.table(rows);
            })
            .catch(console.log)
    } else if (emp_update_id) {
        const sql = `UPDATE employee SET role_id = ?
                    WHERE id = ?;`
        const params = [role_update_id, emp_update_id]
        await db.promise().query(sql, params)
            .then(([rows]) => {
                console.table(rows);
            })
            .catch(console.log)
    }
    promptUser()
    .then(followup)
}

// `SELECT employee.first_name, employee.last_name, role.title, role.salary, manager.fullname AS CONCAT (employee.first_name, '', employee.last_name)
//         FROM employee
//         LEFT JOIN role
//         ON employee.role_id = role.id;`


promptUser()
    .then(followup)
