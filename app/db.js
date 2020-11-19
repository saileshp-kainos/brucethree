const mysql = require('mysql'); 
const dbconfig = require('./credentials.json'); 
const util = require ('util');
const db = wrapDB(dbconfig);

function wrapDB (dbconfig) { 
    const pool = mysql.createPool(dbconfig) 
    return { 
        query(sql, args) { 
            console.log("in query in wrapper") 
            return util.promisify( pool.query ) 
            .call(pool, sql, args) 
        }, 
        release () { 
            return util.promisify( pool.releaseConnection ) 
            .call( pool ) 
        } 
    } 
}

exports.getEmployees = async () => {
    var result = await getEmployees();
    console.log(result);
    return result;
  
}
exports.addEmployees = async(employee) => {
    return await addEmployee(employee);
}

getEmployees = async () => {
    return await db.query( "SELECT EmployeeID, EmployeeName, EmployeeAddress, NINumber, StartingSalary, IBAN, BIC FROM Employee");
}

addEmployee = async(employee) => {
    return await db.query("INSERT INTO Employee(EmployeeName,EmployeeAddress, NINumber, StartingSalary,IBAN,BIC) VALUES (?,?,?,?,?,?)", [employee.EmployeeName, employee.EmployeeAddress, employee.NINumber, employee.StartingSalary, employee.IBAN, employee.BIC]);

}