const express = require('express')
const router = express.Router()
const db = require('./db.js');

// Add your routes here - above the module.exports line
router.get('/list-employees', async (req, res) => {

    res.render('list-employees', {employees: await db.getEmployees()});
})


module.exports = router