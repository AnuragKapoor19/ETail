import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar'
import { IoTrashBin } from "react-icons/io5";
import { ContextState } from '../contextAPI'
import { FcProcess } from "react-icons/fc";
import toast from 'react-hot-toast';

export default function AdminOrders() {
    const { adminOrders, setadminOrders, isOrderUpdated, isOrderDeleted, setisOrderDeleted } = ContextState();

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/admin/order/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            const data = await res.json()

            if (!data.success) {
                return console.log(data.error || data.message);
            }

            setisOrderDeleted(true)
            toast.success(data.message);

        } catch (error) {
            console.log(error.message);
        }
    }

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

    useEffect(() => {
        getAllorders()
        //eslint-disable-next-line
    }, [isOrderUpdated, isOrderDeleted])

    return (
        <>
            <Header />
            <div className='big-d-container big-o-container d-flex'>
                <DashboardSidebar />
                <div className='orders-container ms-1 d-flex justify-content-center my-4 col-sm-12 col-md-12 col-lg-9'>
                    <div className='order-box col-11 p-2 b-shadow text-center'>
                        <h3 className='mb-5'>All Orders</h3>
                        <table className='col-12' cellPadding="5px">
                            <thead>
                                <tr className='top-tr'>
                                    <th>Order Id</th>
                                    <th>No of Items</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {adminOrders && adminOrders.map((order) => (
                                    <tr className='tr'>
                                        <td>{order._id}</td>
                                        <td>{order.orderItems.length}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.orderStatus}</td>
                                        <td className='d-flex justify-content-center'>
                                            <Link to={`/admin/process/order/${order._id}`} className='btn btn-info me-1'><FcProcess /></Link>
                                            <div className='btn btn-danger' onClick={() => handleDelete(order._id)}><IoTrashBin /></div>
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
