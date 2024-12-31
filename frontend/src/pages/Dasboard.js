import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";
import Header from '../components/Header'
import DashboardSidebar from '../components/DashboardSidebar';

export default function Dasboard() {
    return (
        <>
            <Header />
            <DashboardSidebar />
            <div className="dashboard-container row text-light m-3">
                <h3 className='col-12 text-dark'>Dashboard</h3>

                <div className='d-flex justify-content-between flex-column align-items-center col-12 p-0'>

                    <div className="total-amount col-12 bg-primary p-3 d-flex flex-column justify-content-center align-items-center">
                        <span>Total Amount</span>
                        <b>$4523.63</b>
                    </div>

                    <div className='d-flex justify-content-between align-items-center col-12 p-0'>

                        <div className="products bg-danger col-3 my-2 p-1 d-flex flex-column justify-content-center align-items-center">
                            <span>Products</span>
                            <b>45</b>
                            <hr className='border-top border-light w-100 m-0 p-0 mt-4'/>
                            <Link className='btn d-flex justify-content-between w-100'>
                                <span>View Details</span>
                                <i><FaChevronRight size='10px' /></i>
                            </Link>
                        </div>

                        <div className="orders bg-info col-3 my-2 p-1 d-flex flex-column justify-content-center align-items-center">
                            <span>Orders</span>
                            <b>853</b>
                            <hr className='border-top border-light w-100 m-0 p-0 mt-4'/>
                            <Link className='btn d-flex justify-content-between w-100'>
                                <span>View Details</span>
                                <i><FaChevronRight size='10px' /></i>
                            </Link>
                        </div>

                        <div className="users bg-secondary col-3 my-2 p-1 d-flex flex-column justify-content-center align-items-center">
                            <span>Users</span>
                            <b>45</b>
                            <hr className='border-top border-light w-100 m-0 p-0 mt-4'/>
                            <Link className='btn d-flex justify-content-between w-100'>
                                <span>View Details</span>
                                <i><FaChevronRight size='10px' /></i>
                            </Link>
                        </div>

                        <div className="out-of-stock bg-success col-3 my-2 p-1 d-flex flex-column justify-content-center align-items-center">
                            <span>Out of Stock</span>
                            <b>4</b>
                            <hr className='border-top border-light w-100 m-0 p-0 mt-4'/>
                            <Link className='btn d-flex justify-content-between w-100'>
                                <span>View Details</span>
                                <i><FaChevronRight size='10px' /></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
