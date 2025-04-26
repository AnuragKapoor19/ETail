const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

// Detect environment and load correct file
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}

const generateWebToken = (id) => {
    const token = jwt.sign(id, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_TIME })
    return token;
}

module.exports = generateWebToken;