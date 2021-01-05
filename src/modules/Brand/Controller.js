
const db = require('../../config/db')
const { collection } = require('../../models/Brand')
const BrandModel = require('../../models/Brand')

// get list
const get = (req,res) => {
    // BrandModel.find({},(err,result)=>{
    //     if (err){
    //         res.send('error')
    //     }else{
    //         res.json(result);
    //     }
    // })
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
        res.status(400).send('unable to save to database');
      });
}

 
const getById = (req,res)=>{
    BrandModel.findOne({_id : req.params.id})
    .then( result => {
        res.json(result)
    })
    .catch( err =>{
        res.send('error')
    })
}

const update = (req,res)=>{
    BrandModel.findByIdAndUpdate({_id : req.params.id},{ 
        $set :{
            name : req.body.name,
        }
    },(err,result)=>{
        if (err){
            res.send('Error !')
        }else{
            res.json(result)
        }
    })
}

const remove = (req,res)=>{
    BrandModel.deleteOne({_id : req.params.id},(err,result)=>{
        if (err){
            res.send('Error !')
        }else{
            res.json(result)
        }
    })
}


module.exports={
    get, 
    store,
    getById,
    update,
    remove
}