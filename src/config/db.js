// // const express = require('express');
const mongoose = require('mongoose'); // ใช้ module mongoose db 

const uri = 'mongodb://mongo:27017/carstore';
// const dbName = 'carstore' // ระบุ url ที่ต้องการ connect 

// ส่งการเชื่อมต่อฐานข้อมูลไปใช้งาน
module.exports = () => {
    console.log('Connecting db')
    return new Promise((resolve, reject)=>{
        mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true }, (error, client) => {
            if (error) throw error
            console.log("Connected successfully to server")
            resolve(client) // resolve แก้ไขได้
        })
    })
}