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

    if(req.body.NINumber.length < 10){
        let result = await db.addEmployees(employee);
        console.log(result);
        res.redirect('/list-employees');
    } else {
        res.locals.errormessage = 'Failed to insert. Try again.';
        res.render('add-employee', req.body);
    }

})

module.exports = router