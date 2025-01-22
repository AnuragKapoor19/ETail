import React, { useEffect } from 'react'
import Header from '../components/Header'
import { MdEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { Link } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import { ContextState } from '../contextAPI';
import toast from 'react-hot-toast';

export default function AdminProducts() {
    const { adminProducts, setadminProducts, isProductDeleted, setisProductDeleted, seteditProduct, isProductUpdated } = ContextState()

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/admin/product/${id}`, {
                method: "DELETE",
                credentials: 'include'
            })

            const data = await res.json()

            if (!data.success) {
                return console.log(data.message)
            }

            setisProductDeleted(true)
            toast.success(data.message)
        } catch (error) {
            console.log(error.message)
        }
    }

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

    if (adminProducts.length === 0) {
        getAdminProducts()
    }

    useEffect(() => {
        getAdminProducts()
        // eslint-disable-next-line
    }, [isProductDeleted, isProductUpdated])

    return (
        <>
            <Header />
            <div className='big-d-container big-o-container d-flex'>
                <DashboardSidebar />
                <div className='products-container ms-1 d-flex justify-content-center my-4 col-sm-12 col-md-12 col-lg-9'>
                    <div className='col-11 p-2 b-shadow text-center'>
                        <h3 className='mb-5'>All Products</h3>
                        <table className='col-12' cellPadding="5px" >
                            <thead>
                                <tr className='top-tr'>
                                    <th>Product Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {adminProducts && adminProducts.map((product) => (
                                    <tr className='tr'>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stock}</td>
                                        <td className='d-flex justify-content-center'>
                                            <Link to={`/admin/product/update/${product._id}`} onClick={() => seteditProduct(product)} className='btn btn-primary me-1'><MdEdit /></Link>
                                            <div className='btn btn-danger' onClick={() => handleDelete(product._id)}><IoTrashBin /></div>
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
