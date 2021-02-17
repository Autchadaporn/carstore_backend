const jwt = require("jsonwebtoken")
const fs = require("fs")

const authorization = ((req, res, next) => {
    const authorization = req.headers['authorization']  
    if(authorization===undefined) return res.status(401).json({
        "status": 401,
        "message": "Unauthorized"
    })   
    const token = req.headers['authorization'].split(' ')[1]
    if(token===undefined) return res.status(401).json({ // หากไมมีค่า token
        "status": 401,
        "message": "Unauthorized"
    })   
    const privateKey = fs.readFileSync(__dirname+'/../config/private.key')
    jwt.verify(token, privateKey, function(error, decoded) {
        if(error) return res.status(401).json({ // หาก error ไม่ผ่าน
            "status": 401,
            "message": "Unauthorized"
        })   
        console.log(error)
        console.log(decoded)     
        if(decoded.role===undefined || decoded.role!=='admin') return res.status(403).json({
            "status": 403,
            "message": "Forbidden"
        })   
        // ถ้าทุกอย่างผ่าน ทุกเงื่อนไข ก็ไปทำ middleware ฟังก์ชั่นในลำดับถัดไป
        next()
    })
})
 
module.exports = authorization  