import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function SingleOrder() {
    const { id } = useParams()
    const [order, setorder] = useState({})
    const [loading, setloading] = useState(true)

    const getSingleOrder = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/order/${id}`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await res.json()

            if (!data.success) {
                return console.log(data.error || data.message)
            }

            setorder(data.order)
            setloading(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getSingleOrder();
        //eslint-disable-next-line
    }, [])

    return (
        <>
        <Header />
            {loading
                ?
                <div>Loading....</div>
                :
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='order-container p-3 m-3 col-10'>

                        <hr />

                        <div className="order d-flex align-items-center my-2">
                            <h4 className='fw-bold me-3'>Order ID: {order._id}</h4>
                            <span className='text-warning bg-danger fw-bolder p-2 me-2 rounded-3'>{!order.paymentInfo ? 'Payment Pending' : 'Paid'}</span>
                            <span className='text-danger bg-warning fw-bolder p-2 rounded-3'>{order.orderStatus !== "Delivered" ? 'Unfulfilled' : 'Fulfilled'}</span>
                        </div>

                        <span className='fw-bold'>{order.CreatedAt}</span>

                        <hr />

                        <div className="shipping-info my-2">
                            <h4>Shipping Info</h4>

                            <div className="name d-flex justify-content-between fs-5 mt-3">
                                <span className='fw-bold'>Name</span>
                                <span>{order.user.name}</span>
                            </div>

                            <div className="phone d-flex justify-content-between fs-5">
                                <span className='fw-bold'>Phone</span>
                                <span>{order.shippingInfo.phoneNo}</span>
                            </div>

                            <div className="address d-flex justify-content-between fs-5">
                                <span className='fw-bold'>Address</span>
                                <span>{order.shippingInfo.address},{order.shippingInfo.city},{order.shippingInfo.postalCode},{order.shippingInfo.country}</span>
                            </div>

                        </div>

                        <hr />

                        <div className="order-items my-2">
                            <h4>Order Items</h4>
                            <span className='text-danger bg-warning p-1 rounded-3'>{order.orderStatus !== "Delivered" ? 'Unfulfilled' : 'Fulfilled'}</span>

                            <div className='mt-3'>
                            {order.orderItems.map((item) => (
                                <div key={item.name} className="order-item d-flex justify-content-between align-items-center my-2 border border-3 p-2 rounded rounded-3">
                                    <img src={item.image} alt={item.name} className='col-1' />
                                    <span className='fw-bolder col-4'>{item.name}</span>
                                    <span className='col-2 fw-bold'>{item.quantity} X ${item.price}</span>
                                    <span className='col-1 fw-bold'>${item.quantity * item.price}</span>
                                </div>
                            ))}
                            </div>
                        </div>

                        <hr />

                        <div className="order-summary my-2">
                            <h4>Order Summary</h4>
                            <span className='text-warning bg-danger p-1 rounded-3'>{!order.paymentInfo ? 'Payment Pending' : 'Paid'}</span>

                            <div className="subtotal d-flex justify-content-between fs-5 mt-3">
                                <span>Subtotal</span>
                                <span>${order.itemsPrice}</span>
                            </div>

                            <div className="tax d-flex justify-content-between fs-5">
                                <span>Tax</span>
                                <span>${order.taxPrice}</span>
                            </div>

                            <div className="shipping d-flex justify-content-between fs-5">
                                <span>Shipping</span>
                                <span>${order.shippingPrice}</span>
                            </div>

                            <div className="total fw-bolder d-flex justify-content-between fs-5">
                                <span>Total</span>
                                <span>${order.totalPrice}</span>
                            </div>
                        </div>

                        <hr />

                    </div>
                </div>
            }
            <Footer />
        </>
    )
}
