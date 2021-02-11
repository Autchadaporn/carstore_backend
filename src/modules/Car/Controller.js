const db = require('../../config/db')
const { collection } = require('../../models/Cars')
const carModel = require('../../models/Cars')


const get =(req,res)=> {
    carModel.find({})
    .then(result => {
        res.status(200).render('Car/Carstore',{result:result})
        // res.status(200).json(result)
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


module.exports={
    get, 
    store,
    getById,
    update,
    remove
}
