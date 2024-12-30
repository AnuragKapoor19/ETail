const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const generateWebToken = (id)=>{
    const token = jwt.sign(id,process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_EXPIRES_TIME})
    return token;
}

module.exports = generateWebToken;