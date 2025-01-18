import React, { useState } from 'react'
import './Filter.css'
import { FaDollarSign, FaFilter, FaCheck } from 'react-icons/fa6';
import { ContextState } from '../contextAPI';


export default function Filter() {
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

    const brands = [
        'HP',
        'Samsung',
        'Apple',
        'StanFord',
        'Adidas'
    ]

    const { setminPrice, setmaxPrice, setloading, setcategory, setbrand, setcurrentPage } = ContextState();
    const [lprice, setlprice] = useState(0)
    const [hprice, sethprice] = useState(1000)
    const [selected, setselected] = useState(null)
    const [cat, setcat] = useState('')
    const [selectedseller, setselectedseller] = useState(null)
    const [seller, setseller] = useState('')

    const handleMinChange = (e) => {
        setlprice(e.target.value)
    }

    const handleMaxChange = (e) => {
        sethprice(e.target.value)
    }

    const handleCategory = (category) => {
        if (selected === category) {
            setcat('')
            setselected(null)
        }
        else {
            setcat(category);
            setselected(category)
        }
    }

    const handleBrand = (brand) => {
        if (selectedseller === brand) {
            setseller('')
            setselectedseller(null)
        }
        else {
            setseller(brand);
            setselectedseller(brand)
        }
    }

    const handleSelectCategory = (e) => {
        if (e.target.value === 'All') {
            setcat('')
        }
        else {
            setcat(e.target.value)
        }
    }

    const handleSelectBrand = (e) => {
        if (e.target.value === 'All') {
            setseller('')
        }
        else {
            setseller(e.target.value)
        }
    }

    const handleClick = () => {
        setminPrice(lprice)
        setmaxPrice(hprice)
        setloading(true)
        setcategory(cat)
        setbrand(seller)
        setcurrentPage(1)
    }

    return (
        <>
            <div className='filter col-lg-2'>
                <div className='filter-container p-2'>
                    <div className='d-flex justify-content-between align-items-center w-100'>
                        <h2><FaFilter /> Filter</h2>
                        <button className='btn btn-light' onClick={handleClick}><FaCheck size={30} /></button>
                    </div>
                    <hr />
                    <h3>Price</h3>
                    <div className='price d-flex justify-content-between mb-4'>
                        <div className='min-price d-flex border ps-1'>
                            <i className='d-flex align-items-center'><FaDollarSign /></i>
                            <input type='number' className='fw-bold border-0 ps-1' id='min-price-input' min='0' max="1000" step={100} value={lprice} onChange={handleMinChange} />
                        </div>
                        <span className='fs-5 fw-bolder'>-</span>
                        <div className='max-price d-flex border ps-1'>
                            <i className='d-flex align-items-center'><FaDollarSign /></i>
                            <input type='number' className='fw-bold border-0 ps-1' id='max-price-input' min='0' max="1000" step={100} value={hprice} onChange={handleMaxChange} />
                        </div>
                    </div>
                    <hr />
                    <h3>Category</h3>
                    <select className='mb-4' value={cat} onChange={handleSelectCategory}>
                        <option>All</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <hr />
                    <h3>Brand</h3>
                    <select className='mb-4' value={seller} onChange={handleSelectBrand}>
                        <option>All</option>
                        {brands.map(brand => (
                            <option key={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div className='filter-container2'>
                    <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <FaFilter size='30px' />
                    </button>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Filter Products</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-center">
                                    <h3 className='text-center text-danger'>Price</h3>
                                    <div className='price d-flex'>
                                        <label htmlFor='min-price-input' className='ms-1 fw-bold'>Min price: </label>
                                        <div className='min-price d-flex bg-warning rounded-3'>
                                            <i className='p-1 d-flex align-items-center'><FaDollarSign /></i>
                                            <input type='number' className='px-2 fw-bold rounded-end-3' id='min-price-input' min='0' max="1000" step={100} value={lprice} onChange={handleMinChange} />
                                        </div>
                                        <label htmlFor='max-price-input' className='ms-5 fw-bold'>Max price: </label>
                                        <div className='max-price d-flex bg-warning rounded-3'>
                                            <i className='p-1 d-flex align-items-center'><FaDollarSign /></i>
                                            <input type='number' className='px-2 fw-bold rounded-end-3' id='max-price-input' min='0' max="1000" step={100} value={hprice} onChange={handleMaxChange} />
                                        </div>
                                    </div>

                                    <div className='category mx-2 mt-5'>
                                        <h3 className='text-center text-danger'>Categories</h3>
                                        {categories.map((category) => (
                                            <div className={`cat btn m-1 fw-bold ${selected === category ? 'selected' : ''}`} onClick={() => handleCategory(category)} key={category}>
                                                {category}
                                            </div>
                                        ))}
                                    </div>

                                    <div className='brands mx-2 mt-5'>
                                        <h3 className='text-center text-danger'>Brands</h3>
                                        {brands.map((brand) => (
                                            <div className={`brand btn m-1 fw-bold ${selectedseller === brand ? 'selected' : ''}`} onClick={() => handleBrand(brand)} key={brand}>
                                                {brand}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Save Filters</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
