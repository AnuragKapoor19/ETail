import React, { useState } from 'react'
import { IoIosStarOutline } from "react-icons/io";
import SyncLoader from "react-spinners/SyncLoader";
import { ContextState } from '../contextAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SingleProduct() {
    const { product, setcartItems, cartItems } = ContextState();
    const [loading, setloading] = useState(true);
    const [quantity, setQuantity] = useState(1);


    setTimeout(() => {
        setloading(false)
    }, 1500);


    //Most Difficult Concept To add Item to cart
    const handleAddToCart = async (id) => {
        product.quantity = quantity;

        const isItemInCart = cartItems.find(item => item._id === id)

        if (isItemInCart) {
            setcartItems(
                cartItems.map((item) => {
                    if (item._id === id) {
                        item.quantity = quantity;
                        return item
                    }
                    return item
                })
            )

            let items = JSON.parse(localStorage.getItem('cartItems'))

            items = cartItems.map((item) => {
                if (item._id === id) {
                    item.quantity = quantity;
                    return item
                }
                return item
            })

            localStorage.setItem('cartItems', JSON.stringify(items))

        }

        else {
            await setcartItems([...cartItems, product]);

            let items = JSON.parse(localStorage.getItem('cartItems'))

            items.push(product)

            localStorage.setItem('cartItems', JSON.stringify(items))
        }

    }

    return (
        <>
            <Header />
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
                <div className="page row m-3 p-5">
                    <div className="image col col-sm-12 col-md-12 col-lg-6 d-flex justify-content-center align-items-center">
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                {product.images[1] ? <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button> : ''}
                                {product.images[3] ? <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button> : ''}
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={product.images[0].url} className="d-block" alt="img1" style={{ height: "500px", width: "600px" }} />
                                </div>
                                {product.images[1]
                                    ? <div className="carousel-item">
                                        <img src={product.images[1].url} className="d-block" alt="img2" style={{ height: "500px", width: "600px" }} />
                                    </div>
                                    : ''
                                }

                                {product.images[2]
                                    ? <div className="carousel-item">
                                        <img src={product.images[2].url} className="d-block" alt="img3" style={{ height: "500px", width: "600px" }} />
                                    </div>
                                    : ''
                                }

                            </div>

                            {product.images.length > 1
                                ?
                                <>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: "black" }}></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: "black" }}></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </>
                                :
                                ''
                            }
                        </div>
                    </div>

                    <div className="product_details col col-sm-12 col-md-12 col-lg-6">
                        <h3>{product.name}</h3>
                        <span className='product_id'>Product Id: {product._id}</span>

                        <hr />

                        <div className='ratings mt-auto'>
                            <IoIosStarOutline size='1.5rem' style={{ cursor: "pointer" }} />
                            <IoIosStarOutline size='1.5rem' style={{ cursor: "pointer" }} />
                            <IoIosStarOutline size='1.5rem' style={{ cursor: "pointer" }} />
                            <IoIosStarOutline size='1.5rem' style={{ cursor: "pointer" }} />
                            <IoIosStarOutline size='1.5rem' style={{ cursor: "pointer" }} />
                            <span id='no_of_reviews' className='h6'>({product.numofReviews} Review)</span>
                        </div>

                        <hr />

                        <h5 className='price'>${product.price}</h5>

                        <div className="add d-flex align-items-center my-4">
                            <div className="count d-flex">
                                <div className={`decr btn btn-danger mx-1 h5 ${quantity === 1 ? 'disabled' : ''}`} onClick={() => setQuantity(quantity - 1)}>-</div>
                                <div className="quantity p-2 d-flex justify-content-center align-items-center h5"><b>{quantity}</b></div>
                                <div className={`incr btn btn-primary mx-1 h5 ${quantity === product.stock ? 'disabled' : ''}`} onClick={() => setQuantity(quantity + 1)}>+</div>
                            </div>

                            <div className="addbtn btn btn-warning d-flex justify-content-center align-items-center p-3 mx-3 rounded-5" style={{ height: "20px", width: "fit-content" }} onClick={() => handleAddToCart(product._id)}>Add to cart</div>
                        </div>

                        <p className="status">
                            Status: <b className={product.stock > 0 ? 'text-success' : 'text-danger'}>{product.stock > 0 ? "Instock" : "Out of Stock"}</b>
                        </p>

                        <div className="description">
                            <h4>Description:</h4>
                            <p style={{ textAlign: "justify" }}>
                                {product.description}
                            </p>
                        </div>

                        <hr />

                        <div className="soldby">
                            Sold By: <b>{product.seller}</b>
                        </div>

                        <div className="submitReview mt-5">
                            <button type="button" className="btn btn-warning rounded-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Submit Your Review
                            </button>

                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Submit Review</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="stars">
                                                <IoIosStarOutline size='2rem' style={{ cursor: "pointer" }} />
                                                <IoIosStarOutline size='2rem' style={{ cursor: "pointer" }} />
                                                <IoIosStarOutline size='2rem' style={{ cursor: "pointer" }} />
                                                <IoIosStarOutline size='2rem' style={{ cursor: "pointer" }} />
                                                <IoIosStarOutline size='2rem' style={{ cursor: "pointer" }} />
                                            </div>

                                            <textarea rows="5" cols="60" style={{ overflow: "auto", resize: "none", margin: "10px 0", padding: "5px" }}></textarea>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-warning">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
            <Footer />
        </>
    )
}
