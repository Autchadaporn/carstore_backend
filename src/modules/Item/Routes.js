const { Router } = require('express');
const express = require('express');
const app = express();
const itemController = require('./controller');
var router = express.Router();


router.get('/',itemController.get)
router.post('/store',itemController.store)
router.get('/:id',itemController.getById)
router.put('/:id',itemController.update)
router.delete('/:id',itemController.remove)
    

module.exports = router;  