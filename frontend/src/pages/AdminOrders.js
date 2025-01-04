import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar'
import { MdEdit } from 'react-icons/md'
import { IoTrashBin } from "react-icons/io5";
import { ContextState } from '../contextAPI'

export default function AdminOrders() {
    const { adminOrders, setadminOrders } = ContextState();

    const getAllorders = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/v1//admin/orders', {
                method: 'GET',
                credentials: 'include'
            })

            const data = await res.json()

            setadminOrders(data.orders)
        } catch (error) {
            console.log(error.message)
        }
    }

    if (adminOrders.length === 0) {
        getAllorders();
    }

    return (
        <>
            <Header />
            <div className='d-flex'>
                <DashboardSidebar />
                <div className='products-container ms-1 d-flex justify-content-center my-4 col-sm-8 col-md-9 col-lg-9'>
                    <div className='col-12 p-2 border border-5 rounded text-center'>
                        <h3 className='mb-5'>All Orders</h3>
                        <table className='col-12 flex-column' cellPadding="5px" style={{ overflowY: "scroll" }}>
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>No of Items</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {adminOrders && adminOrders.map((order) => (
                                    <tr>
                                        <td>{order._id}</td>
                                        <td>{order.orderItems.length}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.orderStatus}</td>
                                        <td>
                                            <Link to={`/admim/orders`} className='btn btn-primary me-1'><MdEdit /></Link>
                                            <div className='btn btn-danger'><IoTrashBin /></div>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
