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
            <div className='orders-container d-flex justify-content-center my-4' style={{ height: "90vh" }}>
                <div className='col-10 p-2 border border-5 rounded text-center'>
                    <h3 className='mb-5'>My Orders</h3>
                    <table className='w-100' cellPadding="5px" style={{ overflow: "scroll" }}>
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Order Id</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Items</th>
                                <th>Details</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders && orders.map((order) => (
                                <tr>
                                    <td>1</td>
                                    <td>{order._id}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.orderItems.length}Items</td>
                                    <td><Link to={`/order/${order._id}`} className='btn btn-warning'>Details</Link></td>
                                </tr>
                            ))
                            }
                        </tbody>

                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}
