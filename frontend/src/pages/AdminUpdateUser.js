import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import DashboardSidebar from '../components/DashboardSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { ContextState } from '../contextAPI'

export default function AdminUpdateUser() {

    const { id } = useParams()
    const [loading, setloading] = useState(false)
    const [credentials, setcredentials] = useState({ name: '', email: '', role: '' })
    const { setisUserUpdated } = ContextState()
    const navigate = useNavigate()

    const getUser = async () => {
        try {
            setloading(true)
            const res = await fetch(`http://localhost:5000/api/v1/admin/user/${id}`, {
                method: "GET",
                credentials: 'include'
            })

            const data = await res.json()

            if (!data.success) {
                return console.log(data.error || data.message);
            }

            setcredentials({ name: data.user.name, email: data.user.email, role: data.user.role })
            setloading(false)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getUser()
        //eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setisUserUpdated(false)
        try {
            const res = await fetch(`http://localhost:5000/api/v1/admin/user/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, role: credentials.role })
            })

            const data = await res.json()

            if (data.success) {
                setisUserUpdated(true)
                console.log(data.message)
                navigate('/admin/users')
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Header />
            <div className='big-d-container update-container d-flex'>
                <DashboardSidebar />
                <div className='update-form-container d-flex align-items-center flex-column col-sm-12 col-md-12 col-lg-9'>
                    <h3 className='col-12 text-center fw-bolder mt-3'>Update User</h3>
                    {loading
                        ?
                        <h3>Loading...</h3>
                        :
                        <form className='p-5 col-sm-8 col-md-6 col-lg-6 mt-2 mb-4 border border-info border-5' onSubmit={handleSubmit}>
                            <div className='p-name d-flex flex-column mb-3'>
                                <label htmlFor='name' className='fw-bold fs-5' >Name</label>
                                <input type='text' id='name' className='rounded fs-5 py-1 px-2' name='name' onChange={handleChange} value={credentials.name} />
                            </div>

                            <div className='p-price d-flex flex-column mb-3'>
                                <label htmlFor='email' className='fw-bold fs-5'>Email</label>
                                <input type='email' id='email' className='rounded fs-5 py-1 px-2' name='email' onChange={handleChange} value={credentials.email} />
                            </div>

                            <div className='p-description d-flex flex-column mb-3'>
                                <label htmlFor='role' className='fw-bold fs-5'>Role</label>
                                <select id='role' className='rounded fs-5 py-1 px-2' name='role' onChange={handleChange} value={credentials.role}>
                                    <option>admin</option>
                                    <option>user</option>
                                </select>
                            </div>

                            <button type='submit' className='btn btn-warning py-2 w-100' >Update</button>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}
