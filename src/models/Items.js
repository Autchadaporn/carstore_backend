const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    carId:String,
    price:String,
});


const itemModel = mongoose.model('Item',itemSchema)

module.exports = itemModel;