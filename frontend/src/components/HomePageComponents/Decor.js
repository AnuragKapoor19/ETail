import React, { useEffect, useState } from 'react'
import ProductCard from '../productCard'
import { Link } from 'react-router-dom'

export default function Decor() {

    const [products, setproducts] = useState([])

    const getProducts = async () => {
        try {
            let array = [];
            const res = await fetch('http://localhost:5000/api/v1/products', {
                method: 'GET'
            })

            const data = await res.json()

            if (!data.success) {
                return console.log("Error: ", data.message || data.error)
            }

            for (let i = 0; i < 3; i++) {
                array.push(data.products[i])
            }
            setproducts(array);
        } catch (error) {
            console.log("Enable to load server! Please Try again later")
        }
    }

    useEffect(() => {
        getProducts();
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <div className='decor-container d-flex justify-content-center'>
                <div className='decor-product-container mx-3 px-2 my-4 col col-lg-6 col-md-12 col-sm-12'>
                    <div className='d-flex justify-content-between'>
                        <h3 className='fw-bolder'>Furniture, decor & more</h3>
                        <Link className='text-dark'>View all</Link>
                    </div>
                    <span>Make your house feel like home.</span>
                    <div className='row justify-content-start my-3'>
                        {
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} col='4' />
                            ))
                        }
                    </div>
                </div>

                <div className='col-6 decor-img-container hidden'>
                    <img src='https://png.pngtree.com/background/20240413/original/pngtree-light-green-sofa-featuring-pastel-room-decor-with-flower-accents-cozy-picture-image_8478825.jpg' alt='furniture' />
                    <div className='decor-content'>
                        <span>Up to 20% off</span>
                        <h2 className='fw-bolder'>Where Style Meets Comfort</h2>
                        <Link className='btn btn-light rounded-5 border border-dark fw-bold mt-3'>Shop now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
