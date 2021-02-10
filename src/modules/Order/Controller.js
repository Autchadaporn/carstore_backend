const db = require('../../config/db')
const { collection } = require('../../models/Orders')
const orderModel = require('../../models/Orders')

const get =(req,res)=> {
    orderModel.find({})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).send('error')
    })
}

const store =(req,res) => {
    var orderData = {
        orderId : req.body.orderId ,
        itemId : req.body.itemId,
        customerId : req.body.customerId,
        date : req.body.date,
        priceTotal : req.body.priceTotal,
        payment : req.body.payment,
    }
    orderData = new orderModel(orderData)
    orderData.save() 
    .then(result => {
        res.status(201).send('item saved to database')
      })
    .catch(err => {
        res.status(500).send('unable to save to database');
      });
}

const getById = (req,res) => {
    orderModel.findById({_id : req.params.id})
    .then( result => {
        res.status(200).json(result)
    })
    .catch( err => {
        res.status(500).send('Error!')
    })
}

const update = async(req,res) => {
    const id  = { _id :req.params.id} 
    const updateOrder = {
        $set:{
            orderId : req.body.orderId ,
            itemId : req.body.itemId,
            customerId : req.body.customerId,
            date : req.body.date,
            priceTotal : req.body.priceTotal,
            payment : req.body.payment,
        }
    }
    await orderModel.findByIdAndUpdate(id,updateOrder,{new:true})
    .then(result => {
        res.status(201).send('Update successfully')
    })
    .catch(err => {
        res.status(500).send('Could not update')
    })
}

const remove = async(req,res) => {
    const id = req.params.id
    await orderModel.deleteOne({_id:id})
    .then (result => {
        res.status(200).send('Deleted successfully')
    })
    .catch (err => {
        res.status(500).send(err)
    })
}


module.exports={
    get, 
    store,
    getById,
    update,
    remove
}
