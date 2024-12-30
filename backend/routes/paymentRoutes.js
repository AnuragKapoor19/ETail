const express = require('express')
const { processPayment, sendStripeApi } = require('../controllers/paymentController')
const { isAuthenticatedUser } = require('../middlewares/protectRoute')
const router = express.Router()

router.post('/payment/process', isAuthenticatedUser, processPayment)

router.get('/stripeapi', isAuthenticatedUser, sendStripeApi)


module.exports = router;