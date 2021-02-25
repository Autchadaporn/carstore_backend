const { rejects } = require('assert')
const { json } = require('body-parser')
const { error } = require('console')
const db = require('../../config/db')
const { collection } = require('../../models/Cars')
const carModel = require('../../models/Cars')
const { options } = require('./Routes')


const get =(req,res)=> {
    carModel.find({})
    .then(result => {
        // res.status(200).render('Car/Carstore',{result:result})
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).send('error')
    })
}

const store = async(req,res) => {
    var carData = {
        brandId : req.body.brandId,
        adminId : req.body.adminId,
        model : req.body.model,
        color : req.body.color,
        licensePlate : req.body.licensePlate,
        price : req.body.price,
        carImage : req.file.filename,
    }
    carData = new carModel(carData)
    await carData.save() 
    .then(result => {
        res.status(201).send('item saved to database')
        // res.redirect('/car/')
      })
    .catch(err => {
        res.status(500).send('unable to save to database');
      });
}

const getById = (req,res) => {
    carModel.findById({_id : req.params.id})
    .then( result => {
        res.status(200).json(result)
    })
    .catch( err => {
        res.status(500).send('Error!')
    })
}

const update = async(req,res) => {
    const _id = {_id:req.params.id}
    var updateCar = {
        $set:{
            _id : req.params.id ,
            brandId : req.body.brandId ,
            adminId : req.body.adminId ,
            model : req.body.model,
            color : req.body.color,
            licensePlate : req.body.licensePlate,
            price : req.body.price,
            carImage : req.body.filename,
        }
    }
    console.log(updateCar)
    await carModel.updateOne(_id,updateCar,{new:true})
    .then(result => {
        res.status(201).send('Update successfully')
    })
    .catch(err => {
        res.status(500).send('Could not update')
    })
}

const remove = async(req,res) => {
    const id = req.params.id
    await carModel.deleteOne({_id:id})
    .then (result => {
        res.status(200).send('Deleted successfully')
    })
    .catch (err => {
        res.status(500).send(err)
    })
}
const editId =(req,res)=>{
    carModel.findById({_id:req.params.id},(err,data)=>{
        if (err) {
            throw err
        }
        res.render('Car/Formupdate',{data:data})
    })
}
const updateId = async(req,res) => {
    const _id = {_id:req.body.id}
    if (req.file){
        const image = req.file.filename
        var dataUpdate = {
            brandId : req.body.brandId ,
            adminId : req.body.adminId ,
            model : req.body.model,
            color : req.body.color,
            licensePlate : req.body.licensePlate,
            price : req.body.price,
            carImage : image
        }
    }else{
        var dataUpdate = {
            brandId : req.body.brandId ,
            adminId : req.body.adminId ,
            model : req.body.model,
            color : req.body.color,
            licensePlate : req.body.licensePlate,
            price : req.body.price,
        }
    }
    await carModel.updateOne(_id,{$set:dataUpdate},{new:true})
    .then(result => {
        res.redirect('/car/')
    })
    .catch(err => {
        res.send(err),json(err)
    })
}

const deleteId = async(req,res) =>{
    const _id ={_id:req.params.id}
    console.log(_id)
    await carModel.deleteOne(_id)
    .then(result =>{
        res.redirect('/car/')
    })
    .catch(err => {
        res.send(err),json(err)
    })
}

const searchBrand = async(req,res) => {
    const { brandId } = await req.body
    console.log(brandId)
    await carModel.find({brandId:brandId},(err,data)=> {
        if (err) throw err
        res.send(data)
    })
}
module.exports={
    get, 
    store,
    getById,
    update,
    remove,
    editId,
    updateId,
    deleteId,
    searchBrand
}
