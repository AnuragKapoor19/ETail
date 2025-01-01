const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController")
const express = require('express')
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/protectRoute")
const router = express.Router()

router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles("admin"), newProduct)

router.get('/products', getProducts)

router.get('/product/:id', getSingleProduct)

router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles("admin"), updateProduct)

router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

router.put('/new/review', isAuthenticatedUser, createProductReview)

router.get('/reviews', isAuthenticatedUser, getProductReviews)

router.delete('/reviews', isAuthenticatedUser, deleteReview)

router.get('/admin/products', isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts)

module.exports = router;
