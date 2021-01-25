const { Router } = require('express');
const express = require('express');
const app = express();
const orderController = require('./controller');
var router = express.Router();


router.get('/',orderController.get)
router.post('/store',orderController.store)
router.get('/:id',orderController.getById)
router.put('/:id',orderController.update)
router.delete('/:id',orderController.remove)
    

module.exports = router;  