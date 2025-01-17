import React, { useState } from 'react'
import './ForgotPassword.css'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const [resetEmail, setresetEmail] = useState('')
    const handleResetEmailChange = (e) => {
        setresetEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/v1/password/forgot', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: resetEmail })
        })

        const data = await res.json()

        if (!data.success) {
            return console.log(data.message || data.error)
        }

        console.log(data.message)
        setresetEmail('')
    }
    return (
        <>
            <div className='reset-container d-flex justify-content-center align-items-center px-3' style={{ height: '100vh' }}>
                <form onSubmit={handleSubmit} className='col-sm-8 col-md-5 col-lg-5 p-5'>
                    <img src='https://thumbs.dreamstime.com/b/forgot-password-vector-icon-white-background-277222632.jpg' alt='logo' />
                    <h3 className="text-center w-100 mb-3 fw-bolder">Forgot Password</h3>
                    <span>Please enter the email address you'd like your password reset imformation sent to</span>
                    <div className="mt-4 mb-4">
                        <label htmlFor="resetEmail" className="form-label">Email address</label>
                        <input type="email" name='resetEmail' className="form-control border-warning fw-bold" id="resetEmail" placeholder="name@example.com" value={resetEmail} onChange={handleResetEmailChange} required />
                    </div>
                    <button type="submit" className="btn btn-warning w-100 fw-bold">Request reset link</button>
                    <div className='text-center w-100 mt-3'>
                        <Link className='text-decoration-none fw-bolder text-danger' to='/login'>Back to Login</Link>
                    </div>
                </form>
            </div>
        </>
    )
}
