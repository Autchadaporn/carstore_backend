const db = require('../../config/db')
const { collection } = require('../../models/Admin')
const adminModel = require('../../models/Admin')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')
const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';
const refreshTokens = [];

const login = async(req,res)=>{
    console.log('-----------')
    const {email, password} = await req.body
    await adminModel.find({email:email},(err,data)=>{
                    if (err) {
                        throw err
                    } else if ( data.length == 0){
                        console.log('ไม่มี email')
                    } else if (data.length > 0 ){
                        // console.log(data[0].password)// มี data 
                        const passwordHash =  bcrypt.compareSync(password,data[0].password)
                        if (passwordHash == true) {
                            console.log("login")
                            const accessToken = jwt.sign({email:data[0].email}, accessTokenSecret, { expiresIn: '20m' })
                            const refreshToken = jwt.sign({email:data[0].email},refreshTokenSecret)
                            refreshTokens.push(refreshToken)
                            res.json({
                                accessToken,
                                refreshToken
                            }) 
                        } else if (passwordHash == false) {
                            console.log("can't login")
                            res.json({massage:"รหัสผ่านผิด"})
                        } 
                    }
                    return data
                })
}

const token = (req,res) => {
    const { token } = req.body; 
      if (!token) {
          return res.sendStatus(401);
      }
      if (!refreshTokens.includes(token)) {
          return res.sendStatus(403);
      }
      jwt.verify(token, refreshTokenSecret, (err, data) => {
          if (err) {
              return res.sendStatus(403);
          }
          const accessToken = jwt.sign({ email: data.emil}, accessTokenSecret, { expiresIn: '20m' });
          res.json({
              accessToken
          });
      });
   }

const logout = (req,res)=>{
    const { token } = req.body
    refreshTokens = refreshTokens.filter(t => t !== token)
    res.send("logout  success")
   }

const get =(req,res)=> {
    adminModel.find({})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).send('error')
    })
}

const store = async(req,res) => {
    const {fristName, lastName, email, password } = await req.body
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt)
    const adminData = new adminModel({
       fristName : fristName,
        lastName : lastName,
        email : email,
        password : passwordHash,
    })
    await adminData.save() 
    .then(result => {
        res.status(201).send('item saved to database')
      })
    .catch(err => {
        res.status(500).send('unable to save to database');
      });
}

const getById = (req,res) => {
    adminModel.findById({_id : req.params.id})
    .then( result => {
        res.status(200).json(result)
    })
    .catch( err => {
        res.status(500).send('Error!')
    })
}

const update = async(req,res) => {
    const id  = { _id :req.params.id} 
    const updateAdmin = {
        $set:{
            fristName : req.body.fristName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password,
        }
    }
    await adminModel.findByIdAndUpdate(id,updateAdmin,{new:true})
    .then(result => {
        res.status(201).send('Update successfully')
    })
    .catch(err => {
        res.status(500).send('Could not update')
    })
}

const remove = async(req,res) => {
    const id = req.params.id
    await adminModel.deleteOne({_id:id})
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
    remove,
    login,
    token,
    logout,
}
