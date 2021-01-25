const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    itemId:String,
    customerId:String,
    date:String,
    priceTotal:String,
    payment:String,
});


const orderModel = mongoose.model('Order',orderSchema)

module.exports = orderModel;