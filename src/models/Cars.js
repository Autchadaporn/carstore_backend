const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    brandId      : String,
    adminId      : String,
    model        : String,
    color        : String,
    licensePlate : String,
    price        : String,
    carImage     : String,
});


const carModel = mongoose.model('Car',carSchema)

module.exports = carModel;