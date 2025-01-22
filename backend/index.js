const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongodb = require("./db")
const cors = require('cors')
const errorMiddleware = require("./middlewares/error")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cloudinary = require('cloudinary')
dotenv.config()
const PORT = process.env.PORT

//Handling uncaught exceptions
process.on('uncaughtExceptions', (err) => {
    console.log("Error: ", err.message)
    console.log("Shutting down the server due to uncaught exception")
    process.exit(1)
})

//Connecting to database
mongodb()

app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true    //Accept cookies
}))

app.use(express.json({ limit: "50mb" }))

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

//Setting up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Importing routes or endpoints
app.use('/api/v1', require('./routes/productRoutes'))

app.use('/api/v1', require('./routes/userRoutes'))

app.use('/api/v1', require('./routes/orderRoutes'))

app.use('/api/v1', require('./routes/paymentRoutes'))

app.use(errorMiddleware)

const server = app.listen(PORT, () => {
    console.log(`Server running at Port ${PORT}`)
})

//Handling unhandled rejections
process.on('unhandledRejection', (err) => {
    console.log("Error: ", err.message)
    console.log("Shutting down the server due to unhandled promise rejection")

    server.close(() => {
        process.exit(1)
    })
})