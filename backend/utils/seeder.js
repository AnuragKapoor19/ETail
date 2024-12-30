const mongodb = require('../db')
const products = require('../data/product.json')
const productModel = require('../models/productModel')
const dotenv = require("dotenv")
dotenv.config()
mongodb();

const seedProducts = async () => {
    try {
        await productModel.deleteMany();
        console.log('Products Deleted!')

        await productModel.insertMany(products)
        console.log("Product Added!")

        process.exit()
    }
    catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedProducts()