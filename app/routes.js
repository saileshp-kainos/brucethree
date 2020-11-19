const express = require('express')
const router = express.Router()
const db = require('./db.js');
let amILoggedIn = false;

// Add your routes here - above the module.exports line

router.use(function (req, res, next) { 
    console.log(amILoggedIn, req.url)
    if (!amILoggedIn && req.url != '/login-user'){
        console.log('redirect')
        res.render('user');
    }else{
        next();
    }
});
router.post('/filter-employees', async (req, res) => {
    employees = await db.filterEmployees(req.body.filter);
    res.render('list-employees', {employees, filterValue: req.body.filter});
})

router.get('/list-employees', async (req, res) => {
    res.render('list-employees', {employees: await db.getEmployees()});
})


// router.get('/home', function(req, res){ 
//     res.render('home'); 
// });

router.get('/add-employee', (req, res) => {
    res.render('add-employee', {});
})

router.get('/add-sales-employee', (req, res) => {
    res.render('add-sales-employee', {});
})

router.get('/', (req, res) => {
    res.render('home', {});
})
router.post('/login-user', async (req, res) => {
    console.log('test')
    con = await db.loginUser(req.body.username, req.body.password);
    
    console.log('test', con)
    if (con){
        res.render('home');
        amILoggedIn = true;
    }else{
        res.render('user', {errormessage: 'Failed to Connect, please enter the correct user and password'});
    }
})
router.get('/signout', (req, res) => {
    amILoggedIn = false;
    res.render('home', {});
})

router.post('/insert-employee', async (req, res) => {
    var employee = req.body;

    if(req.body.NINumber.length > 9){
        res.locals.errormessage = 'NI Number too long. Try again.';
        res.render('add-employee', req.body);
    } else if (req.body.NINumber.length == 0) {
        res.locals.errormessage = 'Empty NI Number';
        res.render('add-employee', req.body);
    } else if (req.body.EmployeeName.length == 0) {
        res.locals.errormessage = 'Empty Name';
        res.render('add-employee', req.body);
    } else if (req.body.StartingSalary.length == 0) {
        res.locals.errormessage = 'Empty Starting Salary';
        res.render('add-employee', req.body);
    } else if (req.body.EmployeeAddress.length == 0) {
        res.locals.errormessage = 'Empty Address';
        res.render('add-employee', req.body);
    } else if (req.body.IBAN.length > 0 && req.body.BIC == 0) {
        res.locals.errormessage = 'Please enter a valid BIC along with your IBAN';
        res.render('add-employee', req.body);
    } else if (req.body.BIC > 0 && req.body.IBAN.length == 0) {
        res.locals.errormessage = 'Please enter a valid IBAN along with your BIC';
        res.render('add-employee', req.body);
    } else if (!/^([a-zA-Z]){2}( )?([0-9]){2}( )?([0-9]){2}( )?([0-9]){2}( )?([a-zA-Z]){1}?$/.test(req.body.NINumber)) {
        res.locals.errormessage = 'Your National Insurance Number does not meet the valid format. Please enter a valid NI number.';
        res.render('add-employee', req.body);
    } else {
        let result = await db.addEmployees(employee);
        console.log(result);
        res.redirect('/list-employees');
    }
})


router.post('/insert-salesemployee', async (req, res) => {
    var employee = req.body;

    if(req.body.NINumber.length > 9){
        res.locals.errormessage = 'NI Number too long. Try again.';
        res.render('add-employee', req.body);
    } else if (req.body.NINumber.length == 0) {
        res.locals.errormessage = 'Empty NI Number';
        res.render('add-employee', req.body);
    } else if (req.body.EmployeeName.length == 0) {
        res.locals.errormessage = 'Empty Name';
        res.render('add-employee', req.body);
    } else if (req.body.StartingSalary.length == 0) {
        res.locals.errormessage = 'Empty Starting Salary';
        res.render('add-employee', req.body);
    } else if (req.body.EmployeeAddress.length == 0) {
        res.locals.errormessage = 'Empty Address';
        res.render('add-employee', req.body);
    } else if (req.body.IBAN.length > 0 && req.body.BIC == 0) {
        res.locals.errormessage = 'Please enter a valid BIC along with your IBAN';
        res.render('add-employee', req.body);
    } else if (req.body.BIC > 0 && req.body.IBAN.length == 0) {
        res.locals.errormessage = 'Please enter a valid IBAN along with your BIC';
        res.render('add-employee', req.body);
    } else if (!/^([a-zA-Z]){2}( )?([0-9]){2}( )?([0-9]){2}( )?([0-9]){2}( )?([a-zA-Z]){1}?$/.test(req.body.NINumber)) {
        res.locals.errormessage = 'Your National Insurance Number does not meet the valid format. Please enter a valid NI number.';
        res.render('add-employee', req.body);
    } else {
        employee.Department = "Sales";
        let result = await db.addEmployees(employee);
        console.log(result);
        if(result.insertId){
            db.addSalesEmployee(result.insertId, req.body.CommissionRate, req.body.TotalSales);
            res.redirect('/list-employees');
        }
    }
})

module.exports = router