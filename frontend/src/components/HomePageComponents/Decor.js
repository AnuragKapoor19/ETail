import React, { useEffect, useState } from 'react'
import ProductCard from '../productCard'
import { Link, useNavigate } from 'react-router-dom'
import { ContextState } from '../../contextAPI'

export default function Decor() {

    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(false)
    const { setcategory } = ContextState();
    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            setloading(true)
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/?category=Furniture`, {
                method: 'GET'
            })

            const data = await res.json()

            if (!data.success) {
                console.log("Error: ", data.message || data.error)
                setloading(false)
                return
            }

            setproducts(data.products);
            setloading(false)
        } catch (error) {
            console.log("Enable to load server! Please Try again later")
            setloading(false)
        }
    }

    useEffect(() => {
        getProducts();
        //eslint-disable-next-line
    }, [])

    const handleClick = async () => {
        await setcategory('Furniture')
        navigate('/shop')
    }

    const handleDecorClick = async () => {
        await setcategory('Decor')
        navigate('/shop')
    }

    return (
        <>
            <div className='decor-container d-flex justify-content-center'>
                <div className='decor-product-container mx-3 px-2 my-4 col col-lg-6 col-md-12 col-sm-12'>
                    <div className='d-flex justify-content-between'>
                        <h3 className='fw-bolder'>Furniture, decor & more</h3>
                        <Link onClick={handleClick} className='text-dark'>View all</Link>
                    </div>
                    <span>Make your house feel like home.</span>
                    <div className='row justify-content-start my-3'>
                        {
                            loading
                                ?
                                <h3>Loading...</h3>
                                :
                                products.slice(0, 3).map((product, index) => (
                                    <ProductCard key={index} product={product} collg='4' colmd='4' colsm='4' />
                                ))
                        }
                    </div>
                </div>

                <div className='col-6 decor-img-container hidden'>
                    <img src='https://png.pngtree.com/background/20240413/original/pngtree-light-green-sofa-featuring-pastel-room-decor-with-flower-accents-cozy-picture-image_8478825.jpg' alt='furniture' />
                    <div className='decor-content'>
                        <span>Up to 20% off</span>
                        <h2 className='fw-bolder'>Where Style Meets Comfort</h2>
                        <Link className='btn btn-light rounded-5 border border-dark fw-bold mt-3' onClick={handleDecorClick}>Shop now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
