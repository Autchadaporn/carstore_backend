const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    fristName:String,
    lastName:String,
    email:String,
    password:String,
});


const adminModel = mongoose.model('Admin',adminSchema)

module.exports = adminModel;