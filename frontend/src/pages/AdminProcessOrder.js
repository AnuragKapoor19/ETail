import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { ContextState } from '../contextAPI'

export default function AdminProcessOrder() {
    const { setisOrderUpdated, isOrderUpdated } = ContextState();
    const [order, setorder] = useState()
    const [orderStatus, setorderStatus] = useState()
    const [loading, setloading] = useState(true)
    const { id } = useParams()

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
            setorderStatus(data.order.orderStatus)
            setloading(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    setisOrderUpdated(false)

    useEffect(() => {
        getSingleOrder();
        //eslint-disable-next-line
    }, [isOrderUpdated])

    const handleChange = (e) => {
        setorderStatus(e.target.value)
    }

    const handleClick = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1//admin/order/${id}`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ orderStatus })
            })

            const data = await res.json()

            if (!data.success) {
                return console.log(data.error || data.message)
            }

            setisOrderUpdated(true)

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Header />
            <div className='big-d-container d-flex'>
                <DashboardSidebar />
                {loading
                    ?
                    <h4>Loading...</h4>
                    :
                    <div className='order-data-conatiner col-sm-12 col-md-12 col-lg-9 p-3'>

                        <h3 className='text-center mt-2 mb-5 fw-bolder'>Order Details</h3>

                        <div className="order d-flex flex-wrap align-items-center justify-content-between my-2">
                            <div><h4 className='fw-bold me-3'>Order ID: {order._id}</h4></div>
                            <div className='d-flex justify-content-start my-3'>
                                <select className='px-3 fw-bolder rounded me-3' onChange={handleChange} value={orderStatus}>
                                    <option>Processing</option>
                                    <option>Shipped</option>
                                    <option>Delivered</option>
                                </select>

                                <button className='btn btn-primary p-1 text-light' onClick={handleClick}>Update Status</button>
                            </div>
                        </div>

                        <hr />

                        <div className="shipping-info my-2">
                            <h4>Shipping Info</h4>

                            <div className="name d-flex justify-content-between fs-5 mt-3">
                                <span className='fw-bold'>Name</span>
                                <span className='sp'>{order.user.name}</span>
                            </div>

                            <div className="phone d-flex justify-content-between fs-5">
                                <span className='fw-bold'>Phone</span>
                                <span className='sp'>{order.shippingInfo.phoneNo}</span>
                            </div>

                            <div className="address d-flex justify-content-between fs-5">
                                <span className='fw-bold'>Address</span>
                                <span className='sp'>{order.shippingInfo.address},{order.shippingInfo.city},{order.shippingInfo.postalCode},{order.shippingInfo.country}</span>
                            </div>

                        </div>

                        <hr />

                        <div className='order-amount'>
                            <h4>Order Amount</h4>
                            <span className='fs-5 ms-2'>${order.totalPrice}</span>
                        </div>

                        <hr />

                        <div className='order-payment'>
                            <h4>Payment</h4>
                            <span className='fs-5 ms-2'>{!order.paymentInfo ? 'Payment Pending' : 'Paid'}</span>
                        </div>

                        <hr />

                        <div className='order-status'>
                            <h4>Order Status</h4>
                            <span className='fs-5 ms-2'>{order.orderStatus}</span>
                        </div>

                        <hr />

                        <div className="order-items my-2">
                            <h4>Order Items</h4>
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

                    </div>
                }
            </div>
        </>
    )
}
