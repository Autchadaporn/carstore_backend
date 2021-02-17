const express = require('express');
var mongoose = require('./config/db');
var exphbs  = require('express-handlebars');
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
app.use(express.static('views'))

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const { static } = require('express');
const { session } = require('passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/upload/',express.static('upload'));

app.use(bodyParser.json());

app.use('/car',express.static('src/upload'));
app.use('/car/edit',express.static('src/upload'));

app.set('views', __dirname + '/views'); // general config
app.set('view engine','hbs');

app.get('/', (req, res) => {
  res.send('Hello World !')
});

app.get('/addcar',(req,res)=> {
  res.render('Car/Formadd')
})


app.use('/brands',brand);
app.use('/admin',admin);
app.use('/customer',customer);
app.use('/item',item);
app.use('/order',order);
app.use('/car',car);


app.listen(3000, () => {
  console.log('Start server at port 3000.');
});

mongoose();