import React, { useState } from 'react'

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
            <div className='d-flex justify-content-center align-items-center bg-dark' style={{height: '100vh'}}>
                <form onSubmit={handleSubmit} className='col-sm-8 col-md-5 col-lg-5 bg-light rounded-5 p-5'>
                    <h3 className="text-center w-100 mb-5 fw-bolder">Forgot Password</h3>
                    <div className="mt-3 mb-5">
                        <label htmlFor="resetEmail" className="form-label">Email address</label>
                        <input type="email" name='resetEmail' className="form-control border-warning fw-bold" id="resetEmail" placeholder="name@example.com" value={resetEmail} onChange={handleResetEmailChange} required />
                    </div>
                    <button type="submit" className="btn btn-warning w-100">Send Email</button>
                </form>
            </div>
        </>
    )
}
