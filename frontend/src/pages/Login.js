import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContextState } from '../contextAPI'

export default function Login() {
    const { setloading, setuser, setisAuthenticated, isAuthenticated } = ContextState();
    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setloading(true)
        const response = await fetch('http://localhost:5000/api/v1/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })

        const data = await response.json()

        if (!data.success) {
            return console.log(data.message || data.error)
        }

        await setuser(data.user)
        await setisAuthenticated(true)
        navigate('/')
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [navigate, isAuthenticated])


    return (
        <>
            <div className='login-page'>
                <div className='div1' />
                <div className='div2' />
                <div className='login-container d-flex'>
                    <div className='login-form col-6'>
                        <h3 className='text-center fs-1'>Login</h3>
                        <form className='d-flex flex-column' onSubmit={handleSubmit}>
                            <div className="mt-3 mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" name='email' className="form-control border-warning fw-bold" id="email" placeholder="name@example.com" value={credentials.email} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name='password' className="form-control border-warning fw-bold" id="password" placeholder="password" value={credentials.password} onChange={handleChange} required />
                            </div>
                            <Link to='/forgotpassword' className="text-decoration-none">Forgot Password?</Link>
                            <button className='btn btn-warning mt-5' type='submit'>Login</button>
                            <Link to='/signin' className='text-decoration-none text-center'>Not a Member? Signup</Link>
                        </form>
                    </div>

                    <div className='login-image-container col-4'>
                        <img src='https://static.vecteezy.com/system/resources/thumbnails/012/697/735/small_2x/red-and-white-abstract-background-with-geometric-elements-for-modern-presentation-template-design-free-vector.jpg' alt='welcome' />
                        <h1>Welcome to ETail!</h1>
                        <span>Your shopping journey starts here. Let’s make it amazing!</span>
                    </div>
                </div>
            </div>
        </>
    )
}
