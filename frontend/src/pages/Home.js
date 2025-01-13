import React, { useEffect } from 'react'
import Product from '../components/productCard';
import SyncLoader from "react-spinners/SyncLoader";
import { ContextState } from '../contextAPI';
// import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FirstComponent from '../components/HomePageComponents/FirstComponent';

export default function Home() {
    const { products, setproducts, setresPerPage, setproductsCount, currentPage, loading, setloading, keyword, minPrice, maxPrice , category, settoggle, isAuthenticated, isProductDeleted, isProductUpdated, isReviewDeleted} = ContextState();

    const getAllProducts = async () => {
        try {
            let link = `http://localhost:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[$lte]=${maxPrice}&price[$gte]=${minPrice}`;

            if(category){
                link = `http://localhost:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[$lte]=${maxPrice}&price[$gte]=${minPrice}&category=${category}`
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
    }, [currentPage, keyword, maxPrice, minPrice, category, isAuthenticated, loading, isProductDeleted, isProductUpdated, isReviewDeleted])

    return (
        <>
            <Header />
            <FirstComponent />
            <div className='products mx-3 px-2 my-4' onClick={()=> settoggle(false)}>
                <h3 className='fw-bolder'>Weekly deals</h3>
                <span>Up to 65% off</span>
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
                                    <Filter />
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

                {/* <Pagination /> */}
            </div>
            <Footer />
        </>
    )
}
