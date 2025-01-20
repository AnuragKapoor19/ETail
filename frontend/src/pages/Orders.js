import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Orders() {
    const [orders, setorders] = useState([])

    const getOrders = async () => {
        const res = await fetch('http://localhost:5000/api/v1/orders/me', {
            method: "GET",
            credentials: 'include',
        })

        const data = await res.json()

        if (!data.success) {
            return console.log(data.error || data.message)
        }

        setorders(data.orders)
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <>
            <Header />
            <div style={{ minHeight: '50vh' }}>
                <div className='orders-container d-flex justify-content-center my-4'>
                    <div className='col-10 p-2 b-shadow text-center'>
                        <h3 className='mb-5'>My Orders</h3>
                        <table className='w-100' cellPadding="5px">
                            <thead>
                                <tr className='top-tr'>
                                    <th>Sr No.</th>
                                    <th>Order Id</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Items</th>
                                    <th>Details</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders && orders.map((order, index) => (
                                    <tr className='tr' key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order._id}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.orderStatus}</td>
                                        <td>{order.orderItems.length}Items</td>
                                        <td><Link to={`/order/${order._id}`} className='btn btn-warning w-100'>Details</Link></td>
                                    </tr>
                                ))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
