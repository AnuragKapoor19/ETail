const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//Process stripe payments

const processPayment = async (req, res) => {
    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',

            metadata: { integration_check: 'accept_a_payment' }
        })

        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//Send stripe api key

const sendStripeApi = async (req, res) => {
    try {
        res.status(200).json({
            stripeApiKey: process.env.STRIPE_API_KEY
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {processPayment, sendStripeApi}