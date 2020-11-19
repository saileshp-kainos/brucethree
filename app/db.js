const mysql = require('mysql'); 
let dbconfig = require('./credentials.json'); 
const util = require ('util');
let db = null;


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
exports.loginUser = async (username, password) => {
    dbconfig.user = username;
    dbconfig.password = password;
    console.log(dbconfig)
    db = wrapDB(dbconfig);
 
    try {
        res = await testConnection();
    }catch (err){
        console.log('fail connection')
        return false;
    }

    if (db){
        return true;
    }
}
exports.getEmployees = async () => {
    var result = await getEmployees();
  
    return result;
  
}
exports.addEmployees = async(employee) => {
    return await addEmployee(employee);
}

exports.filterEmployees = async(department)=> {
    console.log(department)
    if (department == 'All'){
        return await getEmployees()
    }else{
        return await getFilterEmployees(department)
    }
    
}

exports.addSalesEmployee = async(employeeID, CommissionRate, TotalSales) => {
    return await addSalesEmployee(employeeID, CommissionRate, TotalSales);
}

getFilterEmployees = async (department) => {
    return await db.query( "SELECT EmployeeID, EmployeeName, EmployeeAddress, NINumber, StartingSalary, IBAN, BIC, Department FROM Employee WHERE department = ?", department);
}
getEmployees = async () => {
    return await db.query( "SELECT EmployeeID, EmployeeName, EmployeeAddress, NINumber, StartingSalary, IBAN, BIC, Department FROM Employee");
}
testConnection = async () => {
    return await db.query( "SELECT * FROM report");
}
addEmployee = async(employee) => {
    return await db.query("INSERT INTO Employee(EmployeeName,EmployeeAddress, NINumber, StartingSalary,IBAN,BIC, Department) VALUES (?,?,?,?,?,?,?)", [employee.EmployeeName, employee.EmployeeAddress, employee.NINumber, employee.StartingSalary, employee.IBAN, employee.BIC, employee.Department]);
}
addSalesEmployee = async(employeeID, CommissionRate, TotalSales) => {
    return await db.query("INSERT INTO SalesEmployee (EmployeeID, CommissionRate, SalesTotal) VALUES (?, ?, ?)", [employeeID, CommissionRate, TotalSales]);
}