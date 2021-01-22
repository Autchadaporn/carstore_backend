const { Router } = require('express');
const express = require('express');
const app = express();
const adminController = require('./controller');
var router = express.Router();


router.get('/',adminController.get)
router.post('/store',adminController.store)
router.get('/:id',adminController.getById)
router.put('/:id',adminController.update)
router.delete('/:id',adminController.remove)
    

module.exports = router;  