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


router.post('/insert-employee', async (req, res) => {
    var employee = req.body;
    let result = await db.addEmployees(employee);
    console.log(result);
    res.redirect('/list-employees');
})

module.exports = router