const mongoose = require("mongoose")

const mongodb = async()=>{
    await mongoose.connect(process.env.URI).then(()=>{
        console.log("Database Connected Succesfully")
    }).catch((error)=>{
        console.log("Error while connecting to database: ",error.message)
    })
}

module.exports = mongodb