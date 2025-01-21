import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import DashboardSidebar from '../components/DashboardSidebar'
import { IoTrashBin } from 'react-icons/io5'
import { ContextState } from '../contextAPI'

export default function AdminProductReviews() {
    const [productId, setproductId] = useState('')
    const [reviews, setreviews] = useState([])
    const { isReviewDeleted, setisReviewDeleted } = ContextState()

    const handleChange = (e) => {
        setproductId(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/api/v1/reviews/?id=${productId}`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()

        if (!data.success) {
            return console.log(data.error || data.message);
        }

        setreviews(data.reviews)
    }

    const getReviews = async () => {
        const res = await fetch(`http://localhost:5000/api/v1/reviews/?id=${productId}`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()

        if (!data.success) {
            return console.log(data.error || data.message);
        }

        setreviews(data.reviews)
    }

    useEffect(() => {
        productId && getReviews()
        //eslint-disable-next-line
    }, [isReviewDeleted])

    const handleDelete = async (reviewId) => {
        try {
            setisReviewDeleted(false)
            const res = await fetch(`http://localhost:5000/api/v1/reviews/?id=${productId}&reviewId=${reviewId}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            const data = await res.json()

            if (!data.success) {
                return console.log(data.error || data.message);
            }

            setisReviewDeleted(true)
            console.log(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            <div className='big-d-container d-flex'>
                <DashboardSidebar />
                <div className='update-form-container d-flex align-items-center flex-column col-sm-12 col-md-12 col-lg-9'>
                    <h3 className='col-12 text-center fw-bolder mt-3'>Product Reviews</h3>
                    <form className='p-5 col-sm-8 col-md-6 col-lg-6 mt-2 mb-4 border border-info border-5' onSubmit={handleSubmit}>

                        <div className='p-name d-flex flex-column mb-3'>
                            <label htmlFor='name' className='fw-bold fs-5' >Enter Product Id</label>
                            <input type='text' id='name' className='rounded fs-5 py-1 px-2' name='name' minLength='24' maxLength='24' onChange={handleChange} value={productId} required />
                        </div>

                        <button type='submit' className='btn btn-warning py-2 w-100' >Search</button>
                    </form>

                    {reviews.length <= 0
                        ?
                        <div className='fs-5'>No Reviews Yet!</div>
                        :
                        <div className='col-11 p-2 b-shadow text-center'>
                            <h3 className='mb-5'>All Reviews</h3>
                            <table className='col-12' cellPadding="5px">
                                <thead>
                                    <tr className='top-tr'>
                                        <th>Review ID</th>
                                        <th>Rating</th>
                                        <th>Comment</th>
                                        <th>User</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reviews && reviews.map((review) => (
                                        <tr className='tr'>
                                            <td>{review._id}</td>
                                            <td>{review.rating}</td>
                                            <td>{review.comment}</td>
                                            <td>{review.name}</td>
                                            <td>
                                                <div className='btn btn-danger' onClick={() => handleDelete(review._id)}><IoTrashBin /></div>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
