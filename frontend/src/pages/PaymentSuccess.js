import React, { useEffect, useState } from 'react'
import { PiSealCheckFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom'

export default function PaymentSuccess() {
    const [countdown, setCountdown] = useState(10); // Initial countdown value
    const navigate = useNavigate(); // Hook for navigation
  
    useEffect(() => {
      if (countdown === 0) {
        navigate("/"); // Redirect to the home page
      }
  
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, [countdown, navigate])



    return (
        <>
            <div className='success-container d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
                <div className='col-sm-6 col-md-4 col-lg-4 d-flex flex-column align-items-center border border-5 px-3 py-5 rounded'>
                    <i className='mb-3'><PiSealCheckFill color='green' size={100} /></i>

                    <div className='text-center'>
                        <h1>Thank You!</h1>
                        <span className='fs-5'>Payment Done Successfully</span>
                    </div>

                    <span className='mt-4 text-center'>
                        You will be redirected to the home page shortly or click here to return to home page
                    </span>

                    <button className='btn btn-warning mt-3 w-100 fw-bolder' onClick={()=> navigate('/')}>Redirect ({countdown})</button>
                </div>
            </div>
        </>
    )
}
