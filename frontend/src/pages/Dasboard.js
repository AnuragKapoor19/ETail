import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaExclamationTriangle, FaShoppingCart } from "react-icons/fa";
import Header from '../components/Header'
import DashboardSidebar from '../components/DashboardSidebar';
import { ContextState } from '../contextAPI';
import { FaMoneyBill, FaProductHunt, FaUsers } from 'react-icons/fa6';

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

    // const metrics = [
    //     {
    //         title: "Total Amount",
    //         value: totalAmount,
    //         icon: <FaMoneyBill color="#4caf50" />,
    //         bgColor: "#e8f5e9",
    //     },
    //     {
    //         title: "Products",
    //         value: adminProducts.length,
    //         icon: <FaShoppingCart color="#1976d2" />,
    //         bgColor: "#e3f2fd",
    //     },
    //     {
    //         title: "Orders",
    //         value: adminOrders.length,
    //         icon: <FaShoppingCart color="#1976d2" />,
    //         bgColor: "#e3f2fd",
    //     },
    //     {
    //         title: "Users",
    //         value: allUsers.length,
    //         icon: <FaUsers color="#ff9800" />,
    //         bgColor: "#fff3e0",
    //     },
    //     {
    //         title: "Out of Stock",
    //         value: outOfStock,
    //         icon: <FaExclamationTriangle color="#d32f2f" />,
    //         bgColor: "#ffebee",
    //     },
    // ];

    return (
        <>
            <Header />
            <div className='big-d-container d-flex col-12'>
                <DashboardSidebar />

                <div className="dashboard-container row text-light col-sm-12 col-md-12 col-lg-9" style={{ height: 'fit-content' }}>
                    <h3 className='col-12 text-dark'>Dashboard</h3>

                    <div className='d-flex justify-content-between flex-column align-items-center col-12 p-0'>

                        <div className="total-amount col-12 bg-primary p-3 py-5 d-flex flex-column justify-content-center align-items-center fs-4">
                            <FaMoneyBill />
                            <span>Total Amount</span>
                            <b>${totalAmount}</b>
                        </div>

                        <div className='d-flex justify-content-between align-items-center col-12 p-0 fs-4'>

                            <div className="product-count bg-danger col-3 my-2 p-1 py-2 d-flex flex-column justify-content-center align-items-center">
                                <FaProductHunt />
                                <span>Products</span>
                                <b>{adminProducts.length}</b>
                                <hr className='border-top border-light w-100 m-0 p-0 mt-4' />
                                <Link className='btn d-flex justify-content-between w-100'>
                                    <span>View Details</span>
                                    <i><FaChevronRight size='10px' /></i>
                                </Link>
                            </div>

                            <div className="orders bg-info col-3 my-2 p-1 py-2 d-flex flex-column justify-content-center align-items-center">
                                <FaShoppingCart />
                                <span>Orders</span>
                                <b>{adminOrders.length}</b>
                                <hr className='border-top border-light w-100 m-0 p-0 mt-4' />
                                <Link className='btn d-flex justify-content-between w-100'>
                                    <span>View Details</span>
                                    <i><FaChevronRight size='10px' /></i>
                                </Link>
                            </div>

                            <div className="users bg-secondary col-3 my-2 p-1 py-2 d-flex flex-column justify-content-center align-items-center">
                                <FaUsers />
                                <span>Users</span>
                                <b>{allUsers.length}</b>
                                <hr className='border-top border-light w-100 m-0 p-0 mt-4' />
                                <Link className='btn d-flex justify-content-between w-100'>
                                    <span>View Details</span>
                                    <i><FaChevronRight size='10px' /></i>
                                </Link>
                            </div>

                            <div className="out-of-stock bg-success col-3 my-2 p-1 py-2 d-flex flex-column justify-content-center align-items-center">
                                <FaExclamationTriangle />
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
