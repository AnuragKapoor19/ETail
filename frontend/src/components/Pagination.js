import React from 'react'
import { ContextState } from '../contextAPI'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

export default function Pagination() {
    const { currentPage, setcurrentPage, resPerPage, productsCount, setloading } = ContextState();
    const totalPages = Math.ceil(productsCount / resPerPage);

    const handlePrev = ()=>{
        setcurrentPage(currentPage - 1)
        setloading(true)
    }

    const handleNext = ()=>{
        setcurrentPage(currentPage + 1)
        setloading(true)
    }

    return (
        <>
            <div className='pages d-flex justify-content-center my-5'>
                <button className={`prev btn rounded-circle border border-dark p-2 ${currentPage === 1 ? 'disabled' : ' '}`} onClick={handlePrev}><FaArrowLeft size={25}/></button>
                <div className='page rounded-circle bg-warning border border-dark fw-bolder px-3 fs-4 mx-3 d-flex align-items-center justify-content-center'>{currentPage}</div>
                <button className={`next btn rounded-circle border border-dark p-2 ${currentPage === totalPages ? 'disabled' : ' '}`} onClick={handleNext}><FaArrowRight size={25}/></button>
            </div>
        </>
    )
}
