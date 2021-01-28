const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name : String ,
});


const brandModel = mongoose.model('Brand',brandSchema)

module.exports = brandModel;