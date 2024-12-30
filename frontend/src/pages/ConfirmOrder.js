import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { ContextState } from '../contextAPI'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ConfirmOrder() {
    const navigate = useNavigate()
    const { shippingInfo, user, cartItems } = ContextState()

    let subtotal = 0;
    //eslint-disable-next-line
    cartItems.map(item => {
        subtotal += item.price * item.quantity
    })

    let shipping = subtotal > 200 ? 0 : 25
    let tax = (5 / 100 * subtotal)
    let totalPrice = subtotal + shipping + tax

    const handleProceed = () => {
        const orderData = { subtotal, shipping, tax, totalPrice }
        sessionStorage.setItem('orderData', JSON.stringify(orderData))
        navigate('/payment')
    }

    return (
        <>
            <Header />
            <CheckoutSteps shipping confirmOrder />
            <div className='order-container col-12 d-flex p-5 flex-wrap my-5'>
                <div className="1 col-sm-12 col-md-8 col-lg-8">
                    <div className="shippingInfo d-flex flex-column">
                        <h3 className='mb-3'>Shipping Info</h3>
                        <span className='name p-3 fs-5'><b>Name</b>: {user.name}</span>
                        <span className='phone p-3 fs-5'><b>Phone</b>: {shippingInfo.phoneNo}</span>
                        <span className='address p-3 fs-5'><b>Address</b>: {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country}</span>
                    </div>
                    <hr />
                    <div className="cartItems">
                        <h3 className='mb-3'>Your Cart Items</h3>
                        <div style={{ overflowY: 'scroll', height: '22vh' }}>
                            {cartItems.map((item) => (
                                <div key={item._id} className="d-flex justify-content-around align-items-center border border-dark rounded-3 p-2 my-2">
                                    <img src={item.images[0].url} alt={item.name} className='col-1' />
                                    <span className='name fw-bolder fs-5 col-5 text-center'>{item.name}</span>
                                    <span className='price text-warning text-center h5 col-3 col-sm-4'>${item.price} X {item.quantity} = <b>${item.quantity * item.price}</b></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`2 order-summary col-sm-12 col-md-4 col-lg-4 p-5 d-flex flex-column justify-content-center`}>
                    <h3>Order Summary</h3>
                    <hr />
                    <div className='subtotal d-flex justify-content-between'>
                        <span>Subtotal:</span>
                        <b>${subtotal}</b>
                    </div>

                    <div className='shipping d-flex justify-content-between'>
                        <span>Shipping:</span>
                        <b>${shipping}</b>
                    </div>

                    <div className='tax d-flex justify-content-between'>
                        <span>Tax:</span>
                        <b>${tax}</b>
                    </div>

                    <hr />

                    <div className='total d-flex justify-content-between'>
                        <span>Total:</span>
                        <b>${totalPrice}</b>
                    </div>

                    <hr />

                    <div className='btn btn-warning rounded-5 w-100' onClick={handleProceed}>Proceed to Payment</div>
                </div>
            </div>
            <Footer />
        </>
    )
}
