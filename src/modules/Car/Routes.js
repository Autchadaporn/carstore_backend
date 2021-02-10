const { Router } = require('express');
const express = require('express');
const { count } = require('../../models/Cars');
const app = express();
const carController = require('./controller');
var router = express.Router();
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({storage : storage});



router.get('/store',carController.get)
router.post('/store',upload.single('carImage'),carController.store)
router.get('/:id',carController.getById)
router.put('/:id',carController.update)
router.delete('/:id',carController.remove)
    

module.exports = router;  