const db = require('../../config/db')

const customerModel = require('../../models/Customers')

const get =(req,res)=> {
    customerModel.find({})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).send('error')
    })
}

const store =(req,res) => {
    var customerData = {
        fristName : req.body.fristName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        phoneNumber : req.body.phoneNumber,
    }
    customerData = new customerModel(customerData)
    customerData.save() 
    .then(result => {
        res.status(201).send('item saved to database')
      })
    .catch(err => {
        res.status(500).send('unable to save to database');
      });
}

const getById = (req,res) => {
    customerModel.findById({_id : req.params.id})
    .then( result => {
        res.status(200).json(result)
    })
    .catch( err => {
        res.status(500).send('Error!')
    })
}

const update = async(req,res) => {
    const id  = { _id :req.params.id} 
    const updateCustomer = {
        $set:{
            fristName : req.body.fristName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password,
            phoneNumber : req.body.phoneNumber,
        }
    }
    await customerModel.findByIdAndUpdate(id,updateCustomer,{new:true})
    .then(result => {
        res.status(201).send('Update successfully')
    })
    .catch(err => {
        res.status(500).send('Could not update')
    })
}

const remove = async(req,res) => {
    const id = req.params.id
    await customerModel.deleteOne({_id:id})
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
