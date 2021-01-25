const db = require('../../config/db')
const { collection } = require('../../models/Items')
const itemModel = require('../../models/Items')

const get =(req,res)=> {
    itemModel.find({})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).send('error')
    })
}

const store =(req,res) => {
    var itemData = {
        carId : req.body.carId,
        price : req.body.price,
    }
    itemData = new itemModel(itemData)
    itemData.save() 
    .then(result => {
        res.status(201).send('item saved to database')
      })
    .catch(err => {
        res.status(500).send('unable to save to database');
      });
}

const getById = (req,res) => {
    itemModel.findById({_id : req.params.id})
    .then( result => {
        res.status(200).json(result)
    })
    .catch( err => {
        res.status(500).send('Error!')
    })
}

const update = async(req,res) => {
    const id  = { _id :req.params.id} 
    const updateItem = {
        $set:{
            carId : req.body.carId,
            price : req.body.price,
        }
    }
    await itemModel.findByIdAndUpdate(id,updateItem,{new:true})
    .then(result => {
        res.status(201).send('Update successfully')
    })
    .catch(err => {
        res.status(500).send('Could not update')
    })
}

const remove = async(req,res) => {
    const id = req.params.id
    await itemModel.deleteOne({_id:id})
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
