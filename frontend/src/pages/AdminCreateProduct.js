import React, { useState } from 'react'
import Header from '../components/Header'
import DashboardSidebar from '../components/DashboardSidebar'
import { useNavigate } from 'react-router-dom'

export default function AdminCreateProduct() {
    const navigate = useNavigate()
    const [details, setdetails] = useState({ name: '', price: '', description: '', seller: '', stock: '', category: '' })
    const [images, setimages] = useState([])
    const [imagesPreview, setimagesPreview] = useState([])
    const categories = [
        'Electronics',
        'Camera',
        'Laptop',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes',
        'Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const handleImages = (e) => {
        const files = Array.from(e.target.files)

        setimagesPreview([])
        setimages([])

        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setimagesPreview([...imagesPreview, reader.result])
                    setimages([...images, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const handleChange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/v1/admin/product/new', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ name: details.name, price: details.price, description: details.description, seller: details.seller, stock: details.stock, category: details.category, images: images })
            })

            const data = await res.json()

            if (!data.success) {
                return console.log(data.error || data.message)
            }

            alert('Product added successfully')
            navigate('/admin/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <div className='p-container d-flex'>
                <DashboardSidebar />
                <div className='form-container d-flex align-items-center flex-column col-sm-8 col-md-9 col-lg-9'>
                    <h3 className='col-12 text-center fw-bolder mt-3'>Create Product</h3>
                    <form className='p-5 col-sm-8 col-md-6 col-lg-6 mt-2 mb-4 border border-info border-5' onSubmit={handleSubmit}>
                        <div className='p-name d-flex flex-column mb-3'>
                            <label htmlFor='name' className='fw-bold fs-5' >Product Name</label>
                            <input type='text' id='name' className='rounded fs-5 py-1 px-2' name='name' onChange={handleChange} value={details.name} required/>
                        </div>

                        <div className='p-price d-flex flex-column mb-3'>
                            <label htmlFor='price' className='fw-bold fs-5'>Product Price (USD)</label>
                            <input type='number' id='price' className='rounded fs-5 py-1 px-2' name='price' onChange={handleChange} value={details.price} required/>
                        </div>

                        <div className='p-description d-flex flex-column mb-3'>
                            <label htmlFor='description' className='fw-bold fs-5'>Product Description</label>
                            <textarea rows={5} cols={5} id='description' className='rounded fs-5 py-1 px-2' style={{ resize: 'none' }} name='description' onChange={handleChange} value={details.description} required/>
                        </div>

                        <div className='p-seller d-flex flex-column mb-3'>
                            <label htmlFor='seller' className='fw-bold fs-5'>Product Seller</label>
                            <input type='text' id='seller' className='rounded fs-5 py-1 px-2' name='seller' onChange={handleChange} value={details.seller} required/>
                        </div>

                        <div className='p-stock d-flex flex-column mb-3'>
                            <label htmlFor='stock' className='fw-bold fs-5'>Product Stock</label>
                            <input type='number' id='stock' className='rounded fs-5 py-1 px-2' name='stock' onChange={handleChange} value={details.stock} required/>
                        </div>

                        <div className='p-category d-flex flex-column mb-3'>
                            <label htmlFor='category' className='fw-bold fs-5'>Product Category</label>
                            <select id='category' className='rounded fs-5 py-1 px-2' name='category' onChange={handleChange} value={details.category} required>
                                {categories.map((category) => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className='p-images d-flex flex-column mb-3'>
                            <label htmlFor='images' className='fw-bold fs-5'>Product Images</label>
                            <input type='file' id='images' name='images' onChange={handleImages} accept='images/*' required/>
                        </div>

                        <div className='d-flex flex-wrap mb-3'>
                            {imagesPreview.map(image => (
                                <img src={image} key={image} alt='Images Preview' className='mt-3 me-2' width='55' height='55' />
                            ))}
                        </div>

                        <button type='submit' className='btn btn-warning py-2 w-100' >Create Product</button>
                    </form>
                </div>
            </div>
        </>
    )
}
