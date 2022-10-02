const inquirer = require('inquirer')

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
            name: 'first_name',
            message: 'What is thier role id?',
            when: (answers) => answers.openers === 'Add an employee'
        },
    ])
}

const followup = ({openers, department, role, first_name}) => {
    console.log(openers)
    if (openers === 'View all departments') {
        console.log('View all departments Log')
    } else if (openers === 'View all roles') {
        console.log('View all roles Log')
    } else if (openers === 'View all employees') {
        console.log('view all employees Log')
    } else if (department) {
        console.log(department)
    } else if (role) {
        console.log(role)
    } else if (first_name) {
        console.log(first_name)
    }
}


promptUser()
.then(followup)
    