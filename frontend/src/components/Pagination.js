import React from 'react'
import { ContextState } from '../contextAPI'

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
                <button className={`prev btn btn-danger ${currentPage === 1 ? 'disabled' : ' '}`} onClick={handlePrev}>Prev</button>
                <div className='page btn bg-warning mx-3'>{currentPage}</div>
                <button className={`next btn btn-primary ${currentPage === totalPages ? 'disabled' : ' '}`} onClick={handleNext}>Next</button>
            </div>

        </>
    )
}
