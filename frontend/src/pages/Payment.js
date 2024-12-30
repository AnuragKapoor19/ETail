import React from 'react'
import { ContextState } from '../contextAPI'
import CheckoutSteps from '../components/CheckoutSteps'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { BsBank2, BsFillCreditCard2BackFill, BsFillCreditCard2FrontFill } from "react-icons/bs";
import { FaGooglePay } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';


export default function Payment() {
  const { user, shippingInfo, cartItems } = ContextState()
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const options = {
    style: {
      base: {
        fontSize: '16px'
      },
      invalid: {
        color: 'red'
      }
    }
  }

  const orderData = JSON.parse(sessionStorage.getItem('orderData'))

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/v1/payment/process', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ amount: Math.round(orderData.totalPrice * 100) })
      })

      const data = await res.json()

      const clientSecret = data.client_secret;

      if (!stripe || !elements) {
        return
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email
          }
        }
      })

      if (result.error) {
        console.log(result.error.message)
      } else {

        //The payment is success or not
        if (result.paymentIntent.status === 'succeeded') {

          //ToDo New Order

          navigate('/success')
        } else {
          console.log("There is some issue while payment processing!");

        }

      }

    } catch (error) {
      console.log("Error while payment: ", error.message)
    }
  }

  return (
    <>
      <CheckoutSteps shipping confirmOrder payment />
      <div className="payment-form-container d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <form className='col-sm-7 col-md-5 col-lg-4 p-3 rounded-4 border border-3' onSubmit={handleSubmit}>
          <h3 className='w-100 text-center'>Payment</h3>
          <div className="name my-2">
            <label htmlFor='name'>Full Name</label>
            <input className='w-100 rounded-5 p-2 fw-bold' type='text' id='name' value={user.name} readOnly />
          </div>

          <div className="country mb-2">
            <label htmlFor='country'>Country</label>
            <input className='w-100 rounded-5 p-2 fw-bold' type='text' id='country' value={shippingInfo.country} readOnly />
          </div>

          <div className="address mb-2">
            <label htmlFor='address'>Address</label>
            <input className='w-100 rounded-5 p-2 fw-bold' type='text' id='address' value={`${shippingInfo.address},${shippingInfo.city}`} readOnly />
          </div>

          <div className="payment-method row justify-content-around my-3">
            <div className="d-flex flex-column card btn btn-primary border border-5 col-3">
              <i><BsFillCreditCard2BackFill size={25} /></i>
              <h6>Card</h6>
            </div>

            <div className="d-flex flex-column googlepay btn disabled btn-light border col-3">
              <i><FaGooglePay size={25} /></i>
              <h6>GooglePay</h6>
            </div>

            <div className="d-flex flex-column bank btn disabled btn-light border col-3">
              <i><BsBank2 size={25} /></i>
              <h6>Bank</h6>
            </div>
          </div>

          <div className="card-number my-3">
            <label htmlFor='cardNumber'>Card Number</label>
            <div className='d-flex'>
              <CardNumberElement className='rounded col-9' type='text' id='cardNumber' options={options} />
              <div className='icons d-flex justify-content-between col-3'>
                <i><RiVisaLine size={20} /></i>
                <i><FaCcMastercard size={20} /></i>
                <i><BsFillCreditCard2FrontFill size={20} /></i>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-between'>
            <div className="expire-date mb-3 col-6 me-3">
              <label htmlFor='expiryDate'>Expiration Date</label>
              <CardExpiryElement className='rounded' type='text' id='expiryDate' options={options} />
            </div>

            <div className="cvv-number mb-3 col-6">
              <label htmlFor='cvvNumber'>CVC Number</label>
              <CardCvcElement className='rounded' type='text' id='cvvNumber' options={options} />
            </div>
          </div>

          <button type='submit' className='btn btn-warning w-100 my-3 fw-bolder'>Pay {` - ${orderData ? orderData.totalPrice : ''}`}</button>
        </form>
      </div>
    </>
  )
}
