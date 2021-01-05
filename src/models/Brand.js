const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name:String,
},{
    collection: 'carstore' //dbcollectionname
});


const BrandModel = mongoose.model('Brand',brandSchema)

module.exports = BrandModel;