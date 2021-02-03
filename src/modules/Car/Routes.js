const { Router } = require('express');
const express = require('express');
const { count } = require('../../models/Cars');
const app = express();
const carController = require('./controller');
var router = express.Router();
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/upload');
    },
    filename: function(req, file, cb) {
        cb(null,`${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({
    storage: storage ,
    limits: {
        fieldSize: 1024*1024*3
    }
});



router.get('/store',carController.get)
router.post('/store',upload.single('carImage'),carController.store)
router.get('/store/:id',carController.getById)
router.put('/store/:id',carController.update)
router.delete('/store/:id',carController.remove)
    

module.exports = router;  