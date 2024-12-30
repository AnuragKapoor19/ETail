import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Fill } from "react-icons/ri";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ContextState } from '../contextAPI';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { cartItems, setcartItems , user} = ContextState();
    const [totalPrice, settotalPrice] = useState(0)
    const navigate = useNavigate()

    const handleDeleteClick = (id) => {
        setcartItems(cartItems.filter(item => item._id !== id))

        let items = JSON.parse(localStorage.getItem('cartItems'))

        items = items.filter(item => item._id !== id)

        localStorage.setItem('cartItems', JSON.stringify(items))
    }

    const handleCheckOut = ()=>{
        if(!user){
            navigate('/login')
        }
        else(
            navigate('/shipping')
        )
    }

    const calculatePrice = () => {
        let sum = 0
        // eslint-disable-next-line
        cartItems.map((item) => {
            sum += item.price*item.quantity
            settotalPrice(sum)
        })
    }

    useEffect(() => {
        calculatePrice();
        // eslint-disable-next-line
    }, [cartItems])

    return (
        <>
            <Header />

            <h3 className={`text-center mt-4 ${cartItems.length === 0 ? 'd-none' : ''}`}>Your Cart: <b>{cartItems.length} items</b></h3>
            <div className='cart-container row justify-content-center align-items-center m-1'>
                {cartItems.length === 0
                    ?
                    <div className='h4 text-center d-flex justify-content-center align-items-center' style={{ height: '80vh' }}> Cart is Empty !</div>
                    :
                    <>
                        <div className='cart-items m-3 col-sm-10 col-md-8 col-lg-8' style={{ overflowY: 'scroll', height: '75vh' }}>
                            <div className='d-flex justify-content-around'>
                                <h4 className='col-2 text-center'>Image</h4>
                                <h4 className='col-2 text-center'>Name</h4>
                                <h4 className='col-1 text-center'>Price</h4>
                                <h4 className='col-2 text-center'>Qty</h4>
                                <h4 className='col-1 text-center'>Del</h4>
                            </div>
                            {cartItems.map(item => (
                                <div key={item._id} className='card-item d-flex justify-content-around align-items-center border border-dark rounded-3 p-2 my-2'>
                                    <img src={item.images[0].url} alt='Product' className='col-2' />
                                    <span className='name fw-bolder fs-5 col-2 text-center'>{item.name}</span>
                                    <span className='price text-warning text-center h5 col-1'>${item.price}</span>
                                    <div className="count d-flex justify-content-center col-2">
                                        <div className="quantity text-dark p-2 d-flex justify-content-center align-items-center h5"><b>{item.quantity}</b></div>
                                    </div>
                                    <i className='btn col-1 text-danger' onClick={() => handleDeleteClick(item._id)}><RiDeleteBin6Fill size={30} /></i>
                                </div>
                            ))}
                        </div>
                    </>
                }
                <div className={`order-summary col-sm-8 col-md-6 col-lg-3 p-5 ${cartItems.length === 0 ? 'd-none' : ''}`}>
                    <h4>Order Summary</h4>
                    <hr />
                    <div className='items d-flex justify-content-between'>
                        <span>Items:</span>
                        <b>{cartItems.length}(Units)</b>
                    </div>

                    <div className='total d-flex justify-content-between'>
                        <span>Est. total:</span>
                        <b>${totalPrice}</b>
                    </div>

                    <hr />

                    <div className='btn btn-warning rounded-5 w-100' onClick={handleCheckOut}>Check Out</div>
                </div>
            </div>
            <Footer />
        </>
    )
}
