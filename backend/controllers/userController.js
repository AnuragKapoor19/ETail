const User = require('../models/userModel')
const bcrypt = require("bcryptjs")
const { validationResult } = require('express-validator')
const generateWebToken = require('../utils/generateWebToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto")
const cloudinary = require('cloudinary')

//Register a new user
const registerUser = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    try {
        //To upload image to cloudinary and then store in database
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        })

        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: newPassword,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
            }
        })

        const data = {
            id: user._id
        }

        let token = await generateWebToken(data)

        res.status(200)
            .cookie('token', token, { expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 1000 * 60 * 60 * 24), httpOnly: true, sameSite: 'None', secure: true})
            .json({
                success: true,
                token,
                user
            })

    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//Login a User
const loginUser = async (req, res) => {

    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()
        })
    }

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User with this email does not exists!"
            })
        }

        const realPassword = await user.password
        const cmp = await bcrypt.compare(password, realPassword)
        if (!cmp) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password!"
            })
        }
        const data = {
            id: user._id
        }

        let token = await generateWebToken(data)

        res.status(200)
            .cookie(
                'token',
                token,
                {
                    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 1000 * 60 * 60 * 24),
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None'
                })
            .json({
                success: true,
                token,
                user
            })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Get User Profile
const getUser = async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "No User Exists"
        })
    }

    return res.status(200).json({
        success: true,
        user
    })
}

//Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found with this email"
        })
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    //Create reset password URL
    //const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;  //For Production

    const resetUrl = `http://localhost:3000/password/reset/${resetToken}`;   //For Developement

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it`

    try {

        const email = user.email
        const subject = 'ETail Password recovery'

        await sendEmail(email, subject, message)

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//Reset Password
const resetPassword = async (req, res) => {

    //Hash the token coming from url
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Password reset token is invalid or has been expired"
        })
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password does not match"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(req.body.password, salt)

    user.password = newPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password Changed Successfully"
    })

    // const data = {
    //     id: user._id
    // }

    // let token = await generateWebToken(data)

    // res.status(200).json({
    //     success: true,
    //     token,
    //     user
    // })
}

//Update Password
const updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password')  //Check if user is logged in or not

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Please login to update the password"
            })
        }
    
        let cmp = await bcrypt.compare(req.body.oldPassword, user.password)
    
        if (!cmp) {
            return res.status(401).json({
                success: false,
                message: 'Old Password does not match!'
            })
        }
    
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(req.body.newPassword, salt)
    
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated Successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

    // const data = {
    //     id: user._id
    // }

    // let token = await generateWebToken(data)

    // res.status(200).json({
    //     success: true,
    //     token,
    //     user
    // })
}

//Update Profile
const updateProfile = async (req, res) => {
    const id = req.user.id;

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //Update avatar
    if(req.body.avatar !== ''){
        const user = await User.findById(id)

        const public_id = user.avatar.public_id;
        
        const res = await cloudinary.v2.uploader.destroy(public_id)

        const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Profile Updated!"
    })
}

//Logout a user
const logoutUser = async (req, res) => {
    res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })

    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })
}

//Admin Routes

//Get All Users Information
const allUsers = async (req, res) => {
    const users = await User.find({})

    return res.status(200).json({
        success: true,
        users
    })
}

//Get Single User Information
const oneUser = async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(400).json({
            success: false,
            message: `User with Id: ${req.params.id} does not exists!`
        })
    }

    return res.status(200).json({
        success: true,
        user
    })
}

//Update User
const updateUser = async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    //Update avatar: TODO
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Profile Updated!"
    })
}

//Delete User
const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
        return res.status(400).json({
            success: false,
            message: `User with Id: ${req.params.id} does not exists!`
        })
    }

    const public_id = await user.avatar.public_id
    await cloudinary.v2.uploader.destroy(public_id)

    return res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
}

module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUser, updatePassword, updateProfile, allUsers, oneUser, updateUser, deleteUser };