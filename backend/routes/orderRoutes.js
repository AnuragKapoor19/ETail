const express = require("express")
const { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, } = require("../controllers/orderController")
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/protectRoute");


router.post('/order/new', isAuthenticatedUser, createOrder)

router.get('/order/:id', isAuthenticatedUser, getSingleOrder)

router.get('/orders/me', isAuthenticatedUser, myOrders)

router.get('/admin/orders', isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)

router.put('/admin/order/:id', isAuthenticatedUser, authorizeRoles("admin"), updateOrder)

router.delete('/admin/order/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

module.exports = router;
