import React, { useEffect } from 'react'
import Header from '../components/Header'
import { MdEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { Link } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import { ContextState } from '../contextAPI';

export default function AdminProducts() {
    const { adminProducts, setadminProducts } = ContextState()

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
    }, [])

    return (
        <>
            <Header />
            <div className='d-flex'>
                <DashboardSidebar />
                <div className='products-container ms-1 d-flex justify-content-center my-4 col-sm-8 col-md-9 col-lg-9'>
                    <div className='col-12 p-2 border border-5 rounded text-center'>
                        <h3 className='mb-5'>All Products</h3>
                        <table className='col-12 flex-column' cellPadding="5px" style={{ overflowY: "scroll" }}>
                            <thead>
                                <tr>
                                    <th>Product Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {adminProducts && adminProducts.map((product) => (
                                    <tr>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Link to='/admin/products' className='btn btn-primary me-1'><MdEdit /></Link>
                                            <Link to='/admin/products' className='btn btn-danger'><IoTrashBin /></Link>
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
