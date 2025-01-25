const mongodb = require('../db')
const fs = require('fs')
const products = JSON.parse(fs.readFileSync('D:/Projects/E-Commerce Website/backend/data/product.json', 'utf-8'))
const productModel = require('../models/productModel')
const dotenv = require("dotenv")
const cloudinary = require('cloudinary')
dotenv.config()
mongodb();

//Setting up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImageToCloudinary = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'products',
        });

        let imageLinks = { "public_id": result.public_id, "url": result.secure_url }
        return imageLinks; // Return the uploaded image's
    } catch (error) {
        console.error(`Error uploading image: ${imagePath}`, error);
        throw error;
    }
};

const seedProducts = async () => {
    try {
        // await productModel.deleteMany();
        // console.log('Products Deleted!')

        // await productModel.insertMany(products)
        // console.log("Product Added!")

        for (const product of products) {
            const uploadedImages = [];

            // Upload each image to Cloudinary
            for (const image of product.images) {
                const uploadedImage = await uploadImageToCloudinary(image);
                uploadedImages.push(uploadedImage);
            }

            // Replace product images with Cloudinary URLs
            product.images = uploadedImages;

            // Save the product to the database
            const newProduct = new productModel(product);
            await newProduct.save();
        }

        console.log('All products added successfully!');

        process.exit()
    }
    catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedProducts()