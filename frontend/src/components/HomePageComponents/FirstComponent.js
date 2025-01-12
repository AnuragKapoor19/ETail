import React from 'react'
import './FirstComponent.css'
import { Link } from 'react-router-dom'

export default function FirstComponent() {
    return (
        <>
            <div className='card-container w-100 d-flex justify-content-center'>
                <div className='column-1 col-3 me-3'>
                    <div className='card1'>
                        <div className='content'>
                            <h5>All you need to study</h5>
                            <Link>Shop now</Link>
                        </div>
                    </div>

                    <div className='card2'>
                        <div className='content'>
                            <h5>Campus cooking and dining</h5>
                            <Link>Shop now</Link>
                        </div>
                    </div>

                    <div className='card3'>
                        <div className='content'>
                            <h5>Bath needs from $2</h5>
                            <Link>Shop now</Link>
                        </div>
                    </div>
                </div>

                <div className='column-2 col-6 me-3'>
                    <div className='card4'>
                        <div className='content'>
                            <span className='fs-5'>Get it as fast as today</span>
                            <h2>College prep</h2>
                            <Link className='btn btn-light text-dark border border-dark rounded-5 fw-bold'>Shop now</Link>
                        </div>
                    </div>

                    <div className='card5 d-flex'>
                        <div className='incard1 me-2'>
                            <div className='content'>
                                <h5>Sleep, study, repeat</h5>
                                <Link>Shop bedding</Link>
                            </div>
                        </div>

                        <div className='incard2'>
                            <div className='content'>
                                <h5>Up to 65% off</h5>
                                <Link>Shop now</Link>
                            </div>
                        </div>
                    </div>

                    <div className='card6'>
                        <div className='content'>
                            <h5>Free Shipping on Orders</h5>
                            <span>Terms apply.</span>
                        </div>
                    </div>
                </div>

                <div className='column-3 col-3'>
                    <div className='card7'>
                        <div className='content'>
                            <h5>Dorm decor from $2</h5>
                            <Link>Shop now</Link>
                        </div>
                    </div>

                    <div className='card8'>
                        <div className='content'>
                            <h5>Extra space, under $15</h5>
                            <Link>Shop storage</Link>
                        </div>
                    </div>

                    <div className='card9'>
                        <div className='content'>
                            <h5>Cool college looks</h5>
                            <Link>Shop now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
