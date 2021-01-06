
const db = require('../../config/db')
const { collection } = require('../../models/Brand')
const BrandModel = require('../../models/Brand')

// get list
const get = (req,res) => {
    BrandModel.find({})
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).send('error')
    })
}

const store = (req,res) => {   
    var brandData ={
        name : req.body.name,
    }
    brandData = new BrandModel(brandData)
    brandData.save() // save ลง database 
    .then(result => {
        res.status(201).send('item saved to database')
      })
    .catch(err => {
        res.status(500).send('unable to save to database');
      });
}

 
const getById = (req,res)=>{
    BrandModel.findById({_id : req.params.id})
    .then( result => {
        res.status(200).json(result)
    })
    .catch( err =>{
        res.status(500).send('Error!')
    })
}

const update = async(req,res)=>{
    const id  = {_id :req.params.id} 
    const updateName = {
        $set:{
            name : req.body.name,
        }
    }
    await BrandModel.findByIdAndUpdate(id,updateName,{new:true})
    .then(result =>{
        res.status(200).send('Update successfully')
    })
    .catch(err =>{
        res.status(500).send('Could not update')
    })
}

const remove = async(req,res)=>{
    const id = req.params.id

    await BrandModel.deleteOne({_id:id})
    .then (result =>{
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