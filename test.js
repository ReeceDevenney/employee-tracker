const db = require('./db/connection');

depArr = []
roleArr = []
nameArr = []

async function departmentList() {
    const sql = `SELECT * FROM department;`
    await db.promise().query(sql)
        .then(([rows]) => {
            for (let i = 0; i < rows.length; i++) {
                id = rows[i].id
                title = rows[i].name
                combined = id + '. ' + title
                depArr.push(combined)
            }
        })
        .catch(console.log)
}

async function roleList() {
    const sql = `SELECT * FROM role;`
    await db.promise().query(sql)
        .then(([rows]) => {
            for (let i = 0; i < rows.length; i++) {
                id = rows[i].id
                title_temp = rows[i].title
                combined = id + '. ' + title_temp
                roleArr.push(combined)
            }
        })
        .catch(console.log)
}

async function nameList() {
    const sql = `SELECT CONCAT(first_name, ' ', last_name) AS full_name, employee.id FROM employee;`
    await db.promise().query(sql)
        .then(([rows]) => {
            for (let i = 0; i < rows.length; i++) {
                id = rows[i].id
                title_temp = rows[i].full_name
                combined = id + '. ' + title_temp
                nameArr.push(combined)
            }
            nameArr.push("NULL")
        })
        .catch(console.log)
}


const exctractID = (value) => {
    const tempval = value.split(".")
    return tempval[0]
    
}


module.exports = {departmentList, roleList, nameList, exctractID}
