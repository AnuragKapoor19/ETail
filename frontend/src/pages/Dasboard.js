import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";
import Header from '../components/Header'
import DashboardSidebar from '../components/DashboardSidebar';
import { ContextState } from '../contextAPI';

export default function Dasboard() {
    const { adminProducts, setadminProducts, isProductDeleted, isProductUpdated, adminOrders, setadminOrders, isOrderUpdated, isOrderDeleted, allUsers, setallUsers, isUserDeleted, isUserUpdated } = ContextState();
    const [totalAmount, settotalAmount] = useState(0)
    let outOfStock = 0;

    adminProducts.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1
        }
    });

    const getAdminProducts = async () => {
        const res = await fetch('http://localhost:5000/api/v1/admin/products', {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()

        if (!data.success) {
            return console.log(data.error || data.message)
        }

        setadminProducts(data.products)
    }

    useEffect(() => {
        getAdminProducts()
        //eslint-disable-next-line
    }, [isProductDeleted, isProductUpdated])

    const getAllorders = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/v1//admin/orders', {
                method: 'GET',
                credentials: 'include'
            })

            const data = await res.json()

            setadminOrders(data.orders)
            settotalAmount(data.totalAmount)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllorders();
        //eslint-disable-next-line
    }, [isOrderUpdated, isOrderDeleted])

    const getAllUsers = async () => {
        const res = await fetch('http://localhost:5000/api/v1/admin/users', {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()

        setallUsers(data.users)
    }

    useEffect(() => {
        getAllUsers()
        //eslint-disable-next-line
    }, [isUserDeleted, isUserUpdated])

    return (
        <>
            <Header />
            <div className='d-flex col-12'>
                <DashboardSidebar />
                <div className="dashboard-container row text-light m-3 col-sm-8 col-md-9 col-lg-9" style={{ height: 'fit-content' }}>
                    <h3 className='col-12 text-dark'>Dashboard</h3>

                    <div className='d-flex justify-content-between flex-column align-items-center col-12 p-0'>

                        <div className="total-amount col-12 bg-primary p-3 py-5 d-flex flex-column justify-content-center align-items-center fs-4">
                            <span>Total Amount</span>
                            <b>${totalAmount}</b>
                        </div>

                        <div className='d-flex justify-content-between align-items-center col-12 p-0 fs-4'>

                            <div className="products bg-danger col-3 my-2 p-1 py-2 d-flex flex-column justify-content-center align-items-center">
                                <span>Products</span>
                                <b>{adminProducts.length}</b>
                                <hr className='border-top border-light w-100 m-0 p-0 mt-4' />
                                <Link className='btn d-flex justify-content-between w-100'>
                                    <span>View Details</span>
                                    <i><FaChevronRight size='10px' /></i>
                                </Link>
                            </div>

                            <div className="orders bg-info col-3 my-2 p-1 py-2 d-flex flex-column justify-content-center align-items-center">
                                <span>Orders</span>
                                <b>{adminOrders.length}</b>
                                <hr className='border-top border-light w-100 m-0 p-0 mt-4' />
                                <Link className='btn d-flex justify-content-between w-100'>
                                    <span>View Details</span>
                                    <i><FaChevronRight size='10px' /></i>
                                </Link>
                            </div>

                            <div className="users bg-secondary col-3 my-2 p-1 py-2 d-flex flex-column justify-content-center align-items-center">
                                <span>Users</span>
                                <b>{allUsers.length}</b>
                                <hr className='border-top border-light w-100 m-0 p-0 mt-4' />
                                <Link className='btn d-flex justify-content-between w-100'>
                                    <span>View Details</span>
                                    <i><FaChevronRight size='10px' /></i>
                                </Link>
                            </div>

                            <div className="out-of-stock bg-success col-3 my-2 p-1 py-2 d-flex flex-column justify-content-center align-items-center">
                                <span>Unavailable</span>
                                <b>{outOfStock}</b>
                                <hr className='border-top border-light w-100 m-0 p-0 mt-4' />
                                <Link className='btn d-flex justify-content-between w-100'>
                                    <span>View Details</span>
                                    <i><FaChevronRight size='10px' /></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
