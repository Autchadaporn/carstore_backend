const { Router } = require('express');
const express = require('express');
const app = express();
const customerController = require('./controller');
var router = express.Router();


router.get('/',customerController.get)
router.post('/store',customerController.store)
router.get('/:id',customerController.getById)
router.put('/:id',customerController.update)
router.delete('/:id',customerController.remove)
    

module.exports = router;  