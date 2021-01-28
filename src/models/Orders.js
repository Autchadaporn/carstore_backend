const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId : String ,
    itemId : String,
    customerId : String,
    date : String,
    priceTotal : String,
    payment : String,
});


const orderModel = mongoose.model('Order',orderSchema)

module.exports = orderModel;