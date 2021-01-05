const express = require('express');
var mongoose = require('./config/db');
const app = express();
const path = require('path') // เรียกใช้ module path 
const brand = require('./modules/Brand/Routes');
// const { nextTick } = require('process');
app.use(express.json())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => {
  res.send('Hello World !')

})
app.use('/brands',brand)



app.listen(3000, () => {
  console.log('Start server at port 3000.')
})

mongoose()