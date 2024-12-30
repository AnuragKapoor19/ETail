const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong Mongoose Object Id error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        error = new ErrorHandler(message, 400)
    }

    //Error while creating new product
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message)
        error = new ErrorHandler(message, 400)
    }

    //Handling Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        error = new ErrorHandler(message, 400)
    }

    //Handling wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = "Json web token is Invalid. Try Again!!"
        error = new ErrorHandler(message, 400)
    }

    //Handling expired jwt error
    if (err.name === "TokenExpiredError") {
        const message = "Token is expired"
        error = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message
    })
}

module.exports = errorMiddleware;