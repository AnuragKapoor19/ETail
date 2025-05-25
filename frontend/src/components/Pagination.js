import React, { useEffect, useState } from 'react'
import { ContextState } from '../contextAPI'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

export default function Pagination({ length }) {
    const { currentPage, setcurrentPage, resPerPage, setloading, productsLength, productCount } = ContextState();
    const [totalPages, settotalPages] = useState(Math.ceil(productsLength < 8 ? productsLength / resPerPage : productCount / resPerPage))

    useEffect(() => {
        settotalPages(Math.ceil(productsLength < 8 ? productsLength / resPerPage : productCount / resPerPage));
    }, [productsLength, productCount, resPerPage])


    const handlePrev = () => {
        setcurrentPage(currentPage - 1)
        setloading(true)
    }

    const handleNext = () => {
        setcurrentPage(currentPage + 1)
        setloading(true)
    }

    return (
        <>
            <div className='pages d-flex justify-content-center align-items-center my-5' style={{height: '50px'}}>
                <button className={`prev btn border border-dark p-2 ${currentPage === 1 ? 'disabled' : ' '}`} onClick={handlePrev}><FaArrowLeft size={25} /></button>
                <div className='page bg-warning border border-dark fw-bolder px-3 fs-4 mx-3 d-flex align-items-center justify-content-center h-100'>{currentPage}</div>
                <button className={`next btn  border border-dark p-2 ${currentPage === totalPages ? 'disabled' : ' '}`} onClick={handleNext}><FaArrowRight size={25} /></button>
            </div>
        </>
    )
}
