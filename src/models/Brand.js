const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name:String,
});


const BrandModel = mongoose.model('Brand',brandSchema)

module.exports = BrandModel;