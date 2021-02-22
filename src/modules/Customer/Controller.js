const passport = require('passport');
const db = require('../../config/db');
const customerModel = require('../../models/Customers');
const bcrypt = require('bcrypt-nodejs');
const { head } = require('./Routes');
const { translateAliases } = require('../../models/Customers');
const { render } = require('ejs');
const express = require('express');




const get =(req,res)=> {
    customerModel.find({})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).send('error')
    })
}

// register
const store = async(req,res) => {
    const { fristName, lastName, phoneNumber, email, password} = await req.body
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt) //hash password $2a$10$yZwDB9y3wlPIkXfujOqF8OgZJlY/W2cfy2wgoVoWHiOEtCDPGDtZe'
    // console.log(passwordHash)
    const customerData = new customerModel({
        fristName : fristName,
        lastName : lastName,
        phoneNumber : phoneNumber ,
        email : email ,  
        password : passwordHash ,      
    })
    console.log(customerData)
    await customerData.save()
    .then(result => {
        // res.send(result)
        res.render('login')
        // res.status(201).send('item saved to database')
    })
    .catch(err => {
        // res.status(500).send('unable to save to database');
        console.log(err)
        res.send(err)
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
            phoneNumber : req.body.phoneNumber,
            email : req.body.email,
            password : req.body.password,
            
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

const register = (req,res) => {
    res.render('../../views/register.hbs')
}

const loginForm = (req,res) =>{
    res.render('../../..views/login.hbs')
}
const login = async(req,res) => {
    console.log('-----------')
    const {email, password} = await req.body
    // console.log(`email:${email} || password:${password}`)
    await customerModel.find({email:email},(err,data)=>{
                    if (err) {
                        throw err
                    } else if ( data.length == 0){
                        console.log('ไม่มี email')
                    } else if (data.length > 0 ){
                        // console.log(data[0].password)// มี data 
                        const passwordHash =  bcrypt.compareSync(password,data[0].password)
                        if (passwordHash == true) {
                            console.log("login succes")
                            return res.redirect('/car/')
                        } else if (passwordHash == false) {
                            console.log("can't login")
                            res.send({massage:"รหัสผ่านผิด"})
                        } 
                    }
                })
    }
module.exports={
    get, 
    store,
    getById,
    update,
    remove,
    register,
    login,
    loginForm
}
