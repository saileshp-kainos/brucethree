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