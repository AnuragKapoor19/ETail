import React from 'react'
import './HomeStyle.css'
import { GrApple } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { ContextState } from '../../contextAPI';

export default function Apple() {
    const { setproduct } = ContextState()
    const navigate = useNavigate()
    const handleClick = async () => {
        const res = await fetch('http://localhost:5000/api/v1/product/676275f2b6c1f7419b7ffcab')

        const data = await res.json()

        setproduct(data.product)
        navigate('/productdetails')
    }

    return (
        <>
            <div className='apple-container w-100 my-5'>
                <img src='https://tecnologiatop.club/wp-content/uploads/2024/09/16-pro-758x425.jpg' alt='iphone16pro' />
                <div className='apple-top-content text-center w-100'>
                    <h1 className='d-flex align-items-center justify-content-center fw-bolder'><GrApple color='white' />iPhone 16 Pro</h1>
                    <h4>Built for Apple Intelligence</h4>
                </div>
                <div className='apple-bottom-content d-flex align-items-center w-100 justify-content-center'>
                    <div className='d-flex flex-column me-2'>
                        <h4>Pro Camera</h4>
                        <span>48MP Fusion Camera</span>
                    </div>

                    |

                    <div className='d-flex flex-column mx-2'>
                        <h4>A18 Chip</h4>
                        <span>with 6-core GPU</span>
                    </div>

                    |

                    <div className='d-flex flex-column ms-2'>
                        <h4>Camera Control</h4>
                        <span>Easier Way to Capture</span>
                    </div>
                </div>
                <div className='apple-buy d-flex justify-content-center w-100'>
                    <div onClick={handleClick} className='btn btn-info fw-bolder rounded-5 py-2 px-3'>Buy Now</div>
                </div>
            </div>
        </>
    )
}
