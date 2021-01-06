const { Router } = require('express');
const express = require('express');
const app = express();
const brandController = require('./controller');
var router = express.Router();


router.get('/',brandController.get)
router.post('/store',brandController.store)
router.get('/:id',brandController.getById)
router.put('/:id',brandController.update)
router.delete('/:id',brandController.remove)
    

module.exports = router;  