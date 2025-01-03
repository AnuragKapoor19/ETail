import React from 'react'
import { Link } from 'react-router-dom'
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
    return (
        <>
            <div className='d-flex p-2 justify-content-center align-items-center'>
                <div className='me-3'>
                    {shipping
                        ?
                        <Link to='/shipping' className=' btn btn-warning fw-bolder fs-5'>Shipping</Link>
                        :
                        <Link to='#!' className='btn btn-light fw-bolder fs-5 disabled'>Shipping</Link>
                    }
                </div>

                <div className='me-3'><TbArrowBigRightLinesFilled size={30}/></div>

                <div className='me-3'>
                    {confirmOrder
                        ?
                        <Link to='/confirm/order' className='btn btn-warning fw-bolder fs-5'>Confirm Order</Link>
                        :
                        <Link to='#!' className='btn btn-light fw-bolder fs-5 disabled'>Confirm Order</Link>
                    }
                </div>

                <div className='me-3'><TbArrowBigRightLinesFilled size={30}/></div>

                <div>
                    {payment
                        ?
                        <Link to='/payment' className='btn btn-warning fw-bolder fs-5'>Payment</Link>
                        :
                        <Link to='#!' className='btn btn-light fw-bolder fs-5 disabled'>Payment</Link>
                    }
                </div>
            </div>
        </>
    )
}
