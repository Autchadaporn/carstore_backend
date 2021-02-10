const { Router } = require('express');
const express = require('express');
const customerModel = require('../../models/Customers');
const app = express();
const customerController = require('./controller');
var router = express.Router();
router.get('/register',(req,res) => {
    res.render('register.hbs');
});
router.get('/login',(req,res) => {
    res.render('login.hbs')
})
router.get('/store',customerController.get)
router.post('/store',customerController.store)
router.get('/:id',customerController.getById)
router.put('/:id',customerController.update)
router.delete('/:id',customerController.remove)
<<<<<<< HEAD
router.get('/register',customerController.register)
    

=======
router.post('/login',customerController.login)
>>>>>>> feature/register
module.exports = router;  