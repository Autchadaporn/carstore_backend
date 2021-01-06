
const db = require('../../config/db')
const { collection } = require('../../models/Brand')
const BrandModel = require('../../models/Brand')

// get list
const get = (req,res) => {
    BrandModel.find({})
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send('error')
    })
}

const store = (req,res) => {   
    var brandData ={
        name : req.body.name,
    }
    brandData = new BrandModel(brandData)
    brandData.save() // save ลง database 
    .then(result => {
        // console.log(brandData)
        res.send('item saved to database'); // ส่งไปที่ postman    
      })
    .catch(err => {
        res.status(500).send('unable to save to database');
      });
}

 
const getById = (req,res)=>{
    BrandModel.findOne({_id : req.params.id})
    .then( result => {
        res.json(result)
    })
    .catch( err =>{
        res.send(err)
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
        res.json(result)
    })
    .catch(err =>{
        res.send(err)
    })
}

const remove = async(req,res)=>{
    const id = req.params.id

    await BrandModel.deleteOne({_id:id})
    .then (result =>{
        res.json(result)
    })
    .catch (err => {
        res.send(err)
    })
}


module.exports={
    get, 
    store,
    getById,
    update,
    remove
}