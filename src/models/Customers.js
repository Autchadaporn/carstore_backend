const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    fristName:String,
    lastName:String,
    email:String,
    password:String,
    phoneNumber:String,
});


const customerModel = mongoose.model('Customer',customerSchema)

module.exports = customerModel;