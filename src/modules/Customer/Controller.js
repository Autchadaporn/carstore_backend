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

const login = async(req,res) => {
    console.log('-----------')
    const {email, password} = await req.body
    console.log(`email:${email} || password:${password}`)
    const user = await customerModel.find({email:email})
    if (user == null || user == undefined ){
        res.send('ไม่มี email')
    }else if ( user.length > 0 ) {
        console.log(`user=>> ${user}`)
        const passwordHash =  bcrypt.compareSync(password,user[0].password) // เปรียบเทียบ password ที่ถูก Hash 
            if ( passwordHash == true ) {
                console.log('รหัสผ่านถูกต้อง')
                res.render('Carstore.hbs') 
            } // รหัสผ่านถูกต้อง
            else if ( passwordHash == false ){
                console.log('รหัสไม่ผ่านถูกต้อง')
                res.render('login.hbs')
            } // รหัสผ่านไม่ถูกต้อง
    }else{
       res.send('else')
    }     
}
module.exports={
    get, 
    store,
    getById,
    update,
    remove,
    login,
}
