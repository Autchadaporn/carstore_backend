const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs');


const customerSchema = new Schema({
    fristName: {type: String},
    lastName: {type: String},
    phoneNumber: {type: String},
    email: {type: String},
    password: {type: String, required:true},    
});

const customerModel = mongoose.model('Customers',customerSchema);

module.exports = customerModel;