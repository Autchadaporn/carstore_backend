const { Router } = require('express');
const express = require('express');
const { count } = require('../../models/Cars');
const app = express();
const carController = require('./controller');
var router = express.Router();
const multer  = require('multer');
const carModel = require('../../models/Cars');
const storage = multer.diskStorage({
    destination: 'src/upload',
    filename: function(req, file, cb) {
        cb(null,`${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({
    storage: storage ,
    limits: {
        fieldSize: 1024*1024*3
    }
}).single('carImage');



router.get('/',carController.get)
router.post('/store',upload,carController.store)
router.get('/store/:id',carController.getById)
router.post('/update/',carController.update) // update data
router.get('/edit/:id',carController.editId) // get data from ID
router.post('/updateId',upload,carController.updateId) // update by ID
router.delete('/store/:id',carController.remove)
router.get('/delete/:id',carController.deleteId)

    

module.exports = router;  