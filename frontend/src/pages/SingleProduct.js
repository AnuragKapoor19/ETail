import React, { useEffect, useState } from 'react'
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import SyncLoader from "react-spinners/SyncLoader";
import { ContextState } from '../contextAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function SingleProduct() {
    const { product, setcartItems, cartItems, user, rating, setrating } = ContextState();
    const [loading, setloading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [comment, setcomment] = useState('')
    const [ratingValue, setratingValue] = useState('')

    const handleSubmit = async () => {
        try {
            if (!rating || !comment) {
                return alert('Please enter rating and comment')
            }
            const res = await fetch('http://localhost:5000/api/v1/new/review', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ rating: rating, comment: comment, productId: product._id })
            })

            const data = await res.json()

            if (!data.success) {
                return console.log(data.error || data.message)
            }

            toast.success("Review Added successfully!")

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleClick = (index) => {
        setrating(index + 1)
    }

    const handleRatingValue = () => {
        switch (rating) {
            case 1: setratingValue('Poor'); break;
            case 2: setratingValue('Fair'); break;
            case 3: setratingValue('Good'); break;
            case 4: setratingValue('Very Good'); break;
            case 5: setratingValue('Excellent'); break;
            default: break;
        }
    }

    useEffect(() => {
        handleRatingValue()
        //eslint-disable-next-line
    }, [rating])


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

            // let items = JSON.parse(localStorage.getItem('cartItems'))

            // items = cartItems.map((item) => {
            //     if (item._id === id) {
            //         item.quantity += quantity;
            //         return item
            //     }
            //     return item
            // })

            localStorage.setItem('cartItems', JSON.stringify(cartItems))

        }

        else {
            await setcartItems([...cartItems, product]);

            let items = JSON.parse(localStorage.getItem('cartItems'))

            items.push(product)

            localStorage.setItem('cartItems', JSON.stringify(items))
        }

        toast.success("Item added to cart!")

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
                                {product.images.length > 1 && <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" />}
                                {product.images.length > 2 && <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" />}
                                {product.images.length > 3 && <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4" />}
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={product.images[0].url} className="d-block" alt="img1" style={{ maxHeight: "500px", width: "600px" }} />
                                </div>

                                {product.images.length > 1 && <div className='carousel-item'>
                                    <img src={product.images[1].url} className="d-block" alt="img2" style={{ maxHeight: "500px", width: "600px" }} />
                                </div>}

                                {product.images.length > 2 && <div className='carousel-item'>
                                    <img src={product.images[2].url} className="d-block" alt="img3" style={{ maxHeight: "500px", width: "600px" }} />
                                </div>}

                                {product.images.length > 3 && <div className='carousel-item'>
                                    <img src={product.images[3].url} className="d-block" alt="img3" style={{ maxHeight: "500px", width: "600px" }} />
                                </div>}

                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: "black" }}></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: "black" }}></span>
                                <span className="visually-hidden">Next</span>
                            </button>

                        </div>
                    </div>

                    <div className="product_details col col-sm-12 col-md-12 col-lg-6">
                        <h3>{product.name}</h3>
                        <span className='product_id'>Product Id: {product._id}</span>

                        <hr />

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

                        <hr />

                        {product.reviews
                            ? <h4>{product.reviews.length} reviews for Ship Your Idea</h4>
                            : ''
                        }

                        {product.reviews && product.reviews.map((review) => (
                            <div className='reviews my-4'>
                                <div className='stars'>
                                    {
                                        (() => {
                                            const stars = []
                                            for (let i = 1; i <= 5; i++) {
                                                if (i <= Math.floor(review.rating)) {
                                                    stars.push(<IoIosStar size='1rem' color='orange' style={{ cursor: "pointer" }} />)
                                                }
                                                else {
                                                    stars.push(<IoIosStarOutline size='1rem' color='orange' style={{ cursor: "pointer" }} />)
                                                }
                                            }
                                            return stars
                                        })
                                            ()
                                    }
                                </div>
                                <span className='fw-bold'>{review.name}</span>
                                <p className='mt-3'>{review.comment}</p>
                            </div>
                        ))}

                        <div className="submitReview mt-5">
                            {!user
                                ?
                                <Link to={'/login'} type="button" className="btn btn-warning">
                                    Login to post a Review
                                </Link>
                                :
                                <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add review
                                </button>
                            }

                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Submit Review</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className='d-flex justify-content-between'>
                                                <div className='col-3'>
                                                    <img src={product.images[0].url} alt={product.name} className='w-100' />
                                                </div>
                                                <div className='col-10 ms-3 d-flex justify-content-center flex-column'>
                                                    <div className='fw-bold mb-1 fs-4'>{product.name}</div>
                                                    <div className="stars d-flex justify-content-between me-5">
                                                        {[...Array(5)].map((_, index) => (
                                                            <div>
                                                                {
                                                                    index >= rating
                                                                        ? <IoIosStarOutline size='2.5rem' color='orange' style={{ cursor: "pointer" }} onClick={() => handleClick(index)} />
                                                                        : <IoIosStar size='2.5rem' color='orange' style={{ cursor: "pointer" }} onClick={() => handleClick(index)} />
                                                                }
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span className='text-center col-10 fw-bolder text-warning mt-2'>{ratingValue}</span>
                                                </div>
                                            </div>

                                            <label htmlFor='description' className='fw-bold mt-3'>Description</label>
                                            <textarea id='description' className='rounded' rows="5" cols="60" value={comment} onChange={(e) => setcomment(e.target.value)} style={{ overflow: "auto", resize: "none", margin: "10px 0", padding: "5px" }}></textarea>

                                            {user &&
                                                <div className='user-profile'>
                                                    <div className='fw-bold mt-3'>Your Profile</div>
                                                    <div className='d-flex flex-column'>
                                                        <label htmlFor='name'>Name</label>
                                                        <input type='text' value={user.name} className='rounded fw-bold px-2' readOnly />
                                                    </div>

                                                    <div className='d-flex flex-column mt-3'>
                                                        <label htmlFor='email'>Email</label>
                                                        <input type='text' value={user.email} className='rounded fw-bold px-2' readOnly />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" aria-label="Close" onClick={handleSubmit}>Submit</button>
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
