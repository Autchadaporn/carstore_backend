const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    model:String,
    color:String,
    licensePlate:String,
    price:String,
});


const CarModel = mongoose.model('Car',carSchema)

module.exports = CarModel;