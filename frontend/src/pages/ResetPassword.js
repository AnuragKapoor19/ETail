import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
    const { token } = useParams()     //Takes token from the URL or route
    const navigate = useNavigate()
    const [credentials, setcredentials] = useState({ password: '', confirmPassword: '' })
    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:5000/api/v1/password/reset/${token}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ password: credentials.password, confirmPassword: credentials.confirmPassword })
        })

        const data = await res.json();

        if (!data.success) {
            return console.log(data.message)
        }

        setcredentials({ password: '', confirmPassword: '' })
        console.log(data.message)
        navigate('/login')
    }

    return (
        <>
            <div className='reset_form_container d-flex justify-content-center align-items-center bg-dark' style={{ height: '100vh' }}>
                <form className='col-sm-8 col-md-4 col-lg-4 bg-danger rounded-5 text-light p-5 border' onSubmit={handleSubmit}>
                    <h3 className='text-center mb-5'>Reset Password</h3>
                    <div class="mb-5">
                        <label for="inputPassword" class="col-sm-2 col-form-label me-2">Password:</label>
                        <div class="col-sm-12">
                            <input type="password" class="form-control" id="inputPassword" name='password' value={credentials.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div class="mb-5">
                        <label for="inputConfirmPassword" class="col-sm-5 col-form-label me-2">Confirm-Password:</label>
                        <div class="col-sm-12">
                            <input type="password" class="form-control" id="inputConfirmPassword" name='confirmPassword' value={credentials.confirmPassword} onChange={handleChange} required />
                        </div>
                    </div>
                    <button className='btn btn-warning w-100 fw-bold' type='submit'>Reset Password</button>
                </form>
            </div>
        </>
    )
}
