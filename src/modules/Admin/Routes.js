const { Router } = require('express');
const express = require('express');
const adminModel = require('../../models/Admin');
const app = express();
const adminController = require('./controller');
var router = express.Router();


router.get('/',adminController.get)
router.post('/store',adminController.store)
router.get('/:id',adminController.getById)
router.put('/:id',adminController.update)
router.delete('/:id',adminController.remove)
router.post('/login',adminController.login)
router.post('/token',adminController.token)
router.post('/logout',adminController.logout)

module.exports = router;  