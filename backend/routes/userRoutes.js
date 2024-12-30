const express = require("express")
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUser, updatePassword, updateProfile, allUsers, oneUser, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router()
const { body } = require("express-validator");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/protectRoute");

router.post('/register',
    //name must have minimum length 5 characters
    body('name', 'Name too short').isLength({ min: 5 }),
    // username must be an email
    body('email', 'Invalid Email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password too short').isLength({ min: 6 }),
    registerUser
)


router.post('/login',
    // username must be an email
    body('email', 'Invalid Email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Please enter password').isLength({ min: 1 }),
    loginUser
)

router.get('/me', isAuthenticatedUser, getUser)

router.post('/password/forgot', forgotPassword)

router.put('/password/reset/:token', resetPassword)

router.put('/password/update', isAuthenticatedUser, updatePassword)

router.put('/me/update', isAuthenticatedUser, updateProfile)

router.get('/logout', logoutUser)

router.get('/admin/users', isAuthenticatedUser, authorizeRoles("admin"), allUsers)

router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), oneUser)

router.put('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), updateUser)

router.delete('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router;