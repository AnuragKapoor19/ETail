const mongoose = require('mongoose')
const validator = require("validator")
const crypto = require("crypto")
const Schema = mongoose.Schema

const userModel = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [30, "Your name should not exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email already exists! Try to login"],
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }

})

userModel.methods.getResetPasswordToken = function(){

    //Generate Token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //Hash and set to reset password token
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    //Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000   //Expires after 30 min

    return resetToken;

}

module.exports = mongoose.model("User", userModel)