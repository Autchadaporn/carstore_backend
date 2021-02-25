const jwt = require("jsonwebtoken")
const adminModel = require('../models/Admin')
const db = require('./db')
const accessTokenSecret = 'youraccesstokensecret';
const authenticateJWT = (req, res, next) => {
   const authHeader = req.headers.authorization;
   if (authHeader) {
       const token = authHeader.split(' ')[1];
       jwt.verify(token, accessTokenSecret, (err, data) => {
           if (err) {
               return res.sendStatus(403);
           }
           req.data = data;
           next();
       });
   } else {
       res.sendStatus(401);
   }
};
module.exports = { 
   authenticateJWT
} 