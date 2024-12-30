const Product = require("../models/productModel");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

//Create new product
const newProduct = async (req, res) => {

    try {

        req.body.user = req.user.id;

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Get all products
const getProducts = async (req, res) => {

    try {
        const resPerPage = 4  //Products per page
        const productCount = await Product.countDocuments();  //Counts number of products in database

        const apiFeatures = await new APIFeatures(Product.find(), req.query)
            .search()                       //Class Method to search products according to their name
            .filter()                       //Class Method to search products related to various fields such as category etc.
            .pagination(resPerPage)         //Class Method to locate number of pages

        const products = await apiFeatures.query;

        res.status(200).json({
            success: 'true',
            count: products.length,  //Toatl products fetched at a time
            productCount,            //Total number of products in database
            resPerPage,
            products: products
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Get Single Product
const getSingleProduct = async (req, res, next) => {

    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404))
        }
        else {
            res.status(200).json({
                success: true,
                product: product
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Update Product
const updateProduct = async (req, res) => {

    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404))
        }
        else {
            product = await Product.findByIdAndUpdate(req.params.id, req.body)

            res.status(200).json({
                success: true,
                product: product
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Delete Product
const deleteProduct = async (req, res) => {

    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404))
        }
        else {
            await product.remove();

            res.status(200).json({
                success: true,
                message: "Product Deleted!"
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Create new review
const createProductReview = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;

        const review = {
            user: req.user.id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(400).json({
                success: false,
                message: `Product not found with id ${productId}`
            })
        }

        let isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

        if (isReviewed) {
            product.reviews.forEach((review) => {
                if (review.user.toString() === req.user._id.toString()) {
                    review.comment = comment;
                    review.rating = rating;
                }
            })
        }
        else {
            product.reviews.push(review);
            product.numofReviews = product.reviews.length;
        }

        let totalRatings = 0;

        Number(product.reviews.map((review) => {
            totalRatings += review.rating
        }))

        product.ratings = totalRatings / product.reviews.length

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//Get Product reviews
const getProductReviews = async (req, res) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return res.status(400).json({
            success: false,
            message: "Product not found"
        })
    }

    const reviews = await product.reviews

    res.status(200).json({
        success: true,
        reviews
    })
}

//Delete Review
const deleteReview = async (req, res) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return res.status(400).json({
            success: false,
            message: "Product not found"
        })
    }

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.reviewId.toString())

    const numofReviews = reviews.length

    let totalRatings = 0;

    Number(product.reviews.map((review) => {
        totalRatings += review.rating
    }))

    const ratings = totalRatings / reviews.length

    await Product.findByIdAndUpdate(req.query.id, {
        reviews,
        numofReviews,
        ratings
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(200).json({
        success: true,
        message: "Review Deleted!"
    })

}

module.exports = { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview }