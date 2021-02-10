const express = require('express');
var mongoose = require('./config/db');
const app = express();
const path = require('path'); // เรียกใช้ module path 
var handlebars = require('express-handlebars'); // เรียกใช้ handlebar เป็น template engine

const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const brand = require('./modules/Brand/Routes');
const admin = require('./modules/Admin/Routes');
const customer = require('./modules/Customer/Routes');
const item = require('./modules/Item/Routes');
const order = require('./modules/Order/Routes');
const car = require('./modules/Car/Routes');

app.use(express.json())
const bodyParser = require('body-parser');
const { static } = require('express');
const { session } = require('passport');
app.use(bodyParser.json());
app.use('/upload/',express.static('upload'));

app.set('views', __dirname + '/views'); // general config
app.set('view engine','hbs');


app.get('/', (req, res) => {
  res.send('Hello World !')
  // res.render('login');
});



app.use('/brands',brand)
app.use('/admin',admin)
app.use('/customer',customer)
app.use('/item',item)
app.use('/order',order)
app.use('/car',car)


app.listen(3000, () => {
  console.log('Start server at port 3000.')
})

mongoose()