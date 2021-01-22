const db = require('../../config/db')
const { collection } = require('../../models/Admin')
const adminModel = require('../../models/Admin')

const get =(req,res)=> {
    adminModel.find({})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).send('error')
    })
}

const store =(req,res) => {
    var adminData = {
        fristName : req.body.fristName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
    }
    adminData = new brandModel(adminData)
    adminData.save() 
    .then(result => {
        res.status(201).send('item saved to database')
      })
    .catch(err => {
        res.status(500).send('unable to save to database');
      });
}

const getById = (req,res) => {
    adminModel.findById({_id : req.params.id})
    .then( result => {
        res.status(200).json(result)
    })
    .catch( err => {
        res.status(500).send('Error!')
    })
}

const update = async(req,res) => {
    const id  = { _id :req.params.id} 
    const updateAdmin = {
        $set:{
            fristName : req.body.fristName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password,
        }
    }
    await adminModel.findByIdAndUpdate(id,updateAdmin,{new:true})
    .then(result => {
        res.status(201).send('Update successfully')
    })
    .catch(err => {
        res.status(500).send('Could not update')
    })
}

const remove = async(req,res) => {
    const id = req.params.id
    await adminModel.deleteOne({_id:id})
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
