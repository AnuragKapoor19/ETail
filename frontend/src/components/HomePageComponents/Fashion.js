import React from 'react'
import './HomeStyle.css'

export default function Fashion() {
    return (
        <>
            <div className='fashion-container my-3'>
                <h3 className='fw-bold mb-4'>The days get cooler, so do the trends</h3>
                <div className='big d-flex'>
                    <div className='men-fashion'>
                        <img className='fashion-image' src='https://res.cloudinary.com/anuragkapoor/image/upload/t_Fashion2/v1737025956/Fashion.png' alt='men-fashion' />
                        <div className='fashion-content text-light'>
                            <h1 className='menh1'>Fashion for the man who leads, not follows.</h1>
                            <div className='fashion-btn btn btn-light rounded-5'>Shop now</div>
                        </div>
                    </div>

                    <div className='women-fashion'>
                        <img className='fashion-image' src='https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/02/40s-women-fashion-d2line-tips.png' alt='women-fashion' />
                        <div className='fashion-content'>
                            <h1>Fashion That Celebrates the Queen in You.</h1>
                            <div className='fashion-btn btn btn-dark rounded-5'>Shop now</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
