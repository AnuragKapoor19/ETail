import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import toast from 'react-hot-toast'

export default function Orders() {
    const [orders, setorders] = useState([])
    const [loading, setloading] = useState(false)

    const getOrders = async () => {
        setloading(true)
        const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/me`, {
            method: "GET",
            credentials: 'include',
        })

        const data = await res.json()

        if (!data.success) {
            console.log(data.error || data.message)
            toast.error(data.error || data.message)
            return
        }

        setorders(data.orders)
        setloading(false)
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
                        {loading
                            ? <ClipLoader />
                            :
                            orders.length <= 0
                                ?
                                <h1>No Orders Yet!</h1>
                                :
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
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
