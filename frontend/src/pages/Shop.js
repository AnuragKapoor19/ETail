import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Product from '../components/productCard';
import SyncLoader from "react-spinners/SyncLoader";
import { ContextState } from '../contextAPI';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';

export default function Shop() {

    const { products, setproducts, setresPerPage, setproductsCount, currentPage, loading, setloading, keyword, minPrice, maxPrice, category, brand, settoggle, isAuthenticated, isProductDeleted, isProductUpdated, isReviewDeleted } = ContextState();

    const getAllProducts = async () => {
        try {
            let link = `http://localhost:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[$lte]=${maxPrice}&price[$gte]=${minPrice}`;

            if (category !== '') {
                if (brand !== '') {
                    link = `http://localhost:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[$lte]=${maxPrice}&price[$gte]=${minPrice}&category=${category}&seller=${brand}`
                }
                else {
                    link = `http://localhost:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[$lte]=${maxPrice}&price[$gte]=${minPrice}&category=${category}`
                }
            }
            else {
                if (brand !== '') {
                    link = `http://localhost:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[$lte]=${maxPrice}&price[$gte]=${minPrice}&seller=${brand}`
                }
            }

            const response = await fetch(link, {
                method: "GET"
            })

            const data = await response.json();

            if (!data.success) {
                return console.log("Error: ", data.message)
            }

            setproducts(data.products);
            setproductsCount(data.productCount)
            setresPerPage(data.resPerPage)

            await setTimeout(() => {
                setloading(false)
            }, 1000);

        } catch (error) {
            setloading(false)
            console.log('Error: ', error.message)
        }
    }

    useEffect(() => {
        getAllProducts();
        // eslint-disable-next-line
    }, [currentPage, keyword, maxPrice, minPrice, category, brand, isAuthenticated, loading, isProductDeleted, isProductUpdated, isReviewDeleted])

    return (
        <>
            <Header />
            <div className='shop-container'>
                <div className='products mx-3 px-2 my-4' onClick={() => settoggle(false)}>
                    <div className='d-flex justify-content-between'>
                        <h3 className='fw-bolder'>Latest Products</h3>
                        <Filter />
                    </div>
                    <div className='row justify-content-start my-3'>
                        {loading
                            ?
                            <SyncLoader
                                cssOverride={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "80vh",
                                    width: "100vw"
                                }}
                                loading={loading}
                                size={20}
                            />
                            :
                            keyword
                                ?
                                <>
                                    <div className='d-flex justify-content-between'>
                                        <div className='h4 m-3'>
                                            <span>
                                                <i>Showing results for:</i>
                                            </span>

                                            <b className='mx-2'>
                                                {`${String(keyword).charAt(0).toUpperCase() + String(keyword).slice(1)}`}
                                            </b>
                                        </div>
                                    </div>
                                    {products.map((product) => (
                                        <Product key={product._id} product={product} />
                                    ))}
                                </>
                                :
                                products.map((product) => (
                                    <Product key={product._id} product={product} />
                                ))
                        }
                    </div>

                    <Pagination />
                </div>
            </div>
            <Footer />
        </>
    )
}
