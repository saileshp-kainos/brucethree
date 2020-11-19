const express = require('express')
const router = express.Router()
const db = require('./db.js');

// Add your routes here - above the module.exports line
router.get('/list-employees', async (req, res) => {

    res.render('list-employees', {employees: await db.getEmployees()});
})

// router.get('/home', function(req, res){ 
//     res.render('home'); 
// });

router.get('/add-employee', (req, res) => {
    res.render('add-employee', {});
})
router.get('/', (req, res) => {
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
    } else if (req.body.IBAN.length == 0) {
        res.locals.errormessage = 'Empty IBAN';
        res.render('add-employee', req.body);
    } else if (req.body.BIC == 0) {
        res.locals.errormessage = 'Empty BIC';
        res.render('add-employee', req.body);
    } else {
        let result = await db.addEmployees(employee);
        console.log(result);
        res.redirect('/list-employees');
    }

})

module.exports = router