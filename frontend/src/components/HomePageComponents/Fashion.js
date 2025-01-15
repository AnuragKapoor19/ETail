import React from 'react'
import './HomeStyle.css'

export default function Fashion() {
    return (
        <>
            <div className='fashion-container my-3'>
                <h3 className='fw-bold mb-4'>The days get cooler, so do the trends</h3>
                <div className='big d-flex'>
                    <div className='men-fashion'>
                        <img className='fashion-image' src='https://static.vecteezy.com/system/resources/thumbnails/028/714/265/small_2x/fashion-week-male-model-isolated-on-gradient-background-with-a-place-for-text-photo.jpg' alt='men-fashion' />
                        <div className='fashion-content text-light w-50'>
                            <h1 className='fw-bolder'>Because Confidence is Always in Style.</h1>
                            <div className='btn btn-light rounded-5'>Shop now</div>
                        </div>
                    </div>

                    <div className='women-fashion'>
                        <img className='fashion-image' src='https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/02/40s-women-fashion-d2line-tips.png' alt='women-fashion' />
                        <div className='fashion-content w-50'>
                            <h1 className='fw-bolder'>Fashion That Celebrates the Queen in You.</h1>
                            <div className='btn btn-dark rounded-5'>Shop now</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
