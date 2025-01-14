import React from 'react'
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { ContextState } from '../contextAPI';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, col }) {
    const { setproduct } = ContextState();
    const navigate = useNavigate()

    const getProductDetails = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/product/${productId}`, {
                method: "GET"
            })

            const data = await response.json();

            if (!data.success) {
                return console.log("Error: ", data.message)
            }

            setproduct(data.product);

            navigate('/productdetails')

        } catch (error) {
            console.log('Error: ', error.message)
        }
    }

    return (
        <>
            <div key={product._id} className={`col z-0 ${col ? `col-${col}` : 'col-sm-6 col-md-6 col-lg-2 mb-3'}`}>
                <div className="card w-100 border-0" style={{ width: "18rem" }}>
                    <img src={product.images[0].url} className="card-img-top" alt="img1" height='250px' width='250px' />
                    <div className="card-body">
                        <h5 type='button' className="card-title text-warning" onClick={() => getProductDetails(product._id)} style={{ width: 'fit-content' }}>
                            {product.name}
                        </h5>
                        <div className='ratings mt-auto'>
                            {
                                (() => {
                                    const stars = []
                                    for (let i = 1; i <= 5; i++) {
                                        if (i <= Math.floor(product.ratings)) {
                                            stars.push(<IoIosStar size='1.5rem' color='orange' style={{ cursor: "pointer" }} />)
                                        }
                                        else {
                                            stars.push(<IoIosStarOutline size='1.5rem' color='orange' style={{ cursor: "pointer" }} />)
                                        }
                                    }
                                    return stars
                                })
                                    ()
                            }
                            <span id='no_of_reviews' className='h6'>({product.numofReviews} Review)</span>
                        </div>
                        <p className="card-text my-2 h5">${product.price}</p>
                        <div type="button" className="btn btn-warning rounded-0 w-100" onClick={() => getProductDetails(product._id)}>View Details</div>
                    </div>
                </div>
            </div>
        </>
    )
}
