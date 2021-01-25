const { Router } = require('express');
const express = require('express');
const app = express();
const carController = require('./controller');
var router = express.Router();


router.get('/',carController.get)
router.post('/store',carController.store)
router.get('/:id',carController.getById)
router.put('/:id',carController.update)
router.delete('/:id',carController.remove)
    

module.exports = router;  