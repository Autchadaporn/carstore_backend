const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    model:String,
    color:String,
    license_plate:String,
    price:String,
},{
    collection: 'carstore' //dbcollectionname
});


const CarModel = mongoose.model('Brand',carSchema)

module.exports = CarModel;