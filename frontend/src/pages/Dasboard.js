import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";
import Header from '../components/Header'
import DashboardSidebar from '../components/DashboardSidebar';
import { ContextState } from '../contextAPI';

export default function Dasboard() {
    const { adminProducts } = ContextState();
    let outOfStock = 0;

    adminProducts.forEach(product => {
        if(product.stock === 0){
            outOfStock +=1
        }
    });

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
                            <b>$4523.63</b>
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
                                <b>853</b>
                                <hr className='border-top border-light w-100 m-0 p-0 mt-4' />
                                <Link className='btn d-flex justify-content-between w-100'>
                                    <span>View Details</span>
                                    <i><FaChevronRight size='10px' /></i>
                                </Link>
                            </div>

                            <div className="users bg-secondary col-3 my-2 p-1 py-2 d-flex flex-column justify-content-center align-items-center">
                                <span>Users</span>
                                <b>45</b>
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
