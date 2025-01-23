import React, { useEffect, useState } from 'react'
import ProductCard from '../productCard'
import { Link } from 'react-router-dom'

export default function WeeklyDeals() {
    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(true)

    const getProducts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/v1/products', {
                method: 'GET'
            })

            const data = await res.json()

            if (!data.success) {
                return console.log("Error: ", data.message || data.error)
            }

            setproducts(data.products)
            setloading(false)

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
            <div className='weekly-products mx-3 px-2 my-4'>
                <div className='d-flex justify-content-between'>
                    <h3 className='fw-bolder'>Weekly deals</h3>
                    <Link to={'/shop'} className='text-dark'>View all</Link>
                </div>
                <span>Up to 65% off</span>
                {loading
                    ?
                    <h3>Loading...</h3>
                    :
                    <div className='row justify-content-start my-3'>
                        {
                            products.slice(0,6).map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))
                        }
                    </div>
                }
            </div>
        </>
    )
}
