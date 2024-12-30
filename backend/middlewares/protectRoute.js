const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const ErrorHandler = require("../utils/errorHandler");

//Check if user is authenticated or not
const isAuthenticatedUser = async (req, res, next) => {

    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login first!", 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)

    next();
}

//Handling user roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403))
        }
        next();
    }
}

module.exports = {isAuthenticatedUser, authorizeRoles};