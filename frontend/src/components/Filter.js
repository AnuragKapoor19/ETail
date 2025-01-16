import React, { useState } from 'react'
import './Filter.css'
import { FaDollarSign, FaFilter } from 'react-icons/fa6';
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

    const { setminPrice, setmaxPrice, setloading, setcategory } = ContextState();
    const [lprice, setlprice] = useState(0)
    const [hprice, sethprice] = useState(1000)
    const [selected, setselected] = useState(null)
    const [cat, setcat] = useState('')

    const handleMinChange = (e) => {
        setlprice(e.target.value)
    }

    const handleMaxChange = (e) => {
        sethprice(e.target.value)
    }

    const handleClick = () => {
        setminPrice(lprice)
        setmaxPrice(hprice)
        setloading(true)
        setcategory(cat)
    }

    return (
        <>
            <div className='filter'>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <FaFilter size='30px' />
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
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
                                        <div className={`cat btn m-1 fw-bold ${selected === category ? 'selected' : ''}`} onClick={() => {setcat(category); setselected(category)}} key={category}>
                                            {category}
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
        </>
    )
}
