import React from 'react'
import './HomeStyle.css'

export default function Offer() {
    return (
        <>
            <div className='offer-container my-5 mx-3 rounded-3'>
                <img className='card-image' src='https://e7.pngegg.com/pngimages/372/368/png-clipart-mastercard-visa-credit-card-american-express-company-mastercard-blue-company-thumbnail.png' alt='card' />
                <img className='card-image' src='https://gimgs2.nohat.cc/thumb/f/640/visa-mastercard-logo-png-download-2400-2400-free-transparent--comdlpng6953126.jpg' alt='card'/>
                <span className='fw-bolder ms-2'>Instant Discount: 10% OFF When You Pay Using Your Visa/Mastercard!</span>
            </div>
        </>
    )
}
