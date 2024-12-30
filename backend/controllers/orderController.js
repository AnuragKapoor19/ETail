const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//Create New Order
const createOrder = async (req, res) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        order
    })
}

//Get Single Order
const getSingleOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return res.status(404).json({
            success: false,
            error: "No Order found with this ID"
        })
    }

    res.status(200).json({
        success: true,
        order
    })

}

//Get Logged in user Orders
const myOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.id })

    if (!orders) {
        return res.status(404).json({
            success: false,
            error: "No Order found with this ID"
        })
    }

    res.status(200).json({
        success: true,
        orders
    })

}

//Admin Routes

//Get all orders infornation
const getAllOrders = async (req, res) => {
    const orders = await Order.find({})

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
}

//Update Order Status and Stock in Product model
const updateOrder = async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === "Delivered") {
        return res.status(400).json({
            success: false,
            error: "You have already deliverd this product"
        })
    }

    order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.orderStatus
    order.deliveredAt = Date.now()

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order Status Updated!"
    })
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id)

    product.stock -= quantity

    await product.save({ validateBeforeSave: false });
}

//Delete Order
const deleteOrder = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })
}



module.exports = { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder };
