import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { ContextState } from '../contextAPI'
import Header from '../components/Header';
import toast from 'react-hot-toast';

export default function AdminUpdateProduct() {
    const { editProduct, setisProductUpdated } = ContextState();
    const { id } = useParams()
    const [updateDetails, setupdateDetails] = useState({ name: editProduct ? editProduct.name : '', price: editProduct ? editProduct.price : 0, description: editProduct ? editProduct.description : '', seller: editProduct ? editProduct.seller : '', stock: editProduct ? editProduct.stock : 0, category: editProduct ? editProduct.category : '' })
    const [images, setimages] = useState([])
    const [imagesPreview, setimagesPreview] = useState([])
    const navigate = useNavigate()

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

    const [oldImages, setoldImages] = useState([])
    let oldImagesLink = []

    const setOldImg = () => {
        if (editProduct) {
            for (let i = 0; i < editProduct.images.length; i++) {
                oldImagesLink.push(editProduct.images[i].url)
            }

            setoldImages(oldImagesLink)
        }
    }

    useEffect(() => {
        setOldImg()
        //eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setupdateDetails({ ...updateDetails, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5000/api/v1/admin/product/${id}`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: updateDetails.name, price: updateDetails.price, description: updateDetails.description, seller: updateDetails.seller, stock: updateDetails.stock, category: updateDetails.category, images: images })
            })

            const data = await res.json()

            if (data.success) {
                navigate('/admin/products')
                setisProductUpdated(true)
                toast.success('Product Updated Successfully!')
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const handleImages = async (e) => {
        const files = await Array.from(e.target.files)
        setimages([])
        setimagesPreview([])
        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setimagesPreview([...imagesPreview, reader.result])
                    setimages([...images, reader.result])
                }
            }

            reader.readAsDataURL(file)
        });
    }

    return (
        <>
            <Header />
            <div className='big-d-container update-container d-flex'>
                <DashboardSidebar />
                <div className='update-form-container d-flex align-items-center flex-column col-sm-12 col-md-12 col-lg-9'>
                    <h3 className='col-12 text-center fw-bolder mt-3'>Update Product</h3>
                    <form className='p-5 col-sm-8 col-md-6 col-lg-6 mt-2 mb-4 b-shadow' onSubmit={handleSubmit}>
                        <div className='p-name d-flex flex-column mb-3'>
                            <label htmlFor='name' className='fw-bold fs-5' >Product Name</label>
                            <input type='text' id='name' className='rounded fs-5 py-1 px-2' name='name' onChange={handleChange} value={updateDetails.name} />
                        </div>

                        <div className='p-price d-flex flex-column mb-3'>
                            <label htmlFor='price' className='fw-bold fs-5'>Product Price (USD)</label>
                            <input type='number' id='price' className='rounded fs-5 py-1 px-2' name='price' onChange={handleChange} value={updateDetails.price} />
                        </div>

                        <div className='p-description d-flex flex-column mb-3'>
                            <label htmlFor='description' className='fw-bold fs-5'>Product Description</label>
                            <textarea rows={5} cols={5} id='description' className='rounded fs-5 py-1 px-2' style={{ resize: 'none' }} name='description' onChange={handleChange} value={updateDetails.description} />
                        </div>

                        <div className='p-seller d-flex flex-column mb-3'>
                            <label htmlFor='seller' className='fw-bold fs-5'>Product Seller</label>
                            <input type='text' id='seller' className='rounded fs-5 py-1 px-2' name='seller' onChange={handleChange} value={updateDetails.seller} />
                        </div>

                        <div className='p-stock d-flex flex-column mb-3'>
                            <label htmlFor='stock' className='fw-bold fs-5'>Product Stock</label>
                            <input type='number' id='stock' className='rounded fs-5 py-1 px-2' name='stock' onChange={handleChange} value={updateDetails.stock} />
                        </div>

                        <div className='p-category d-flex flex-column mb-3'>
                            <label htmlFor='category' className='fw-bold fs-5'>Product Category</label>
                            <select id='category' className='rounded fs-5 py-1 px-2' name='category' onChange={handleChange} value={updateDetails.category} >
                                {categories.map((category) => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className='d-flex mb-3 flex-column'>
                            <span className='fw-bold fs-5'>Old Images</span>
                            <div className='d-flex flex-wrap'>
                                {oldImages.map(image => (
                                    <img src={image} key={image} alt='Images Preview' className='mt-3 me-2' width='55' height='55' />
                                ))}
                            </div>
                        </div>

                        <div className='p-images d-flex flex-column mb-3'>
                            <label htmlFor='images' className='fw-bold fs-5 mb-2'>New Images</label>
                            <input type='file' id='images' name='images' onChange={handleImages} accept='images/*' />
                        </div>

                        <div className='d-flex flex-wrap mb-3'>
                            {imagesPreview.map(image => (
                                <img src={image} key={image} alt='Images Preview' className='mt-3 me-2' width='55' height='55' />
                            ))}
                        </div>

                        <button type='submit' className='btn btn-warning py-2 w-100' >Update Product</button>
                    </form>
                </div>
            </div>
        </>
    )
}
