import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
    const { token } = useParams()     //Takes token from the URL or route
    const navigate = useNavigate()
    const [showPassword, setshowPassword] = useState(false)
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
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <form className='reset-form-container col-sm-8 col-md-4 col-lg-4 p-5 border' onSubmit={handleSubmit}>
                    <img src='https://cdn-icons-png.flaticon.com/512/6195/6195699.png' alt='logo' />
                    <h3 className='text-center mb-5 fw-bolder'>Reset Password</h3>
                    <div class="mb-5">
                        <label for="inputPassword" class="col-sm-2 col-form-label me-2">Password:</label>
                        <div class="col-sm-12">
                            <input type={`${showPassword ? 'text' : 'password'}`} class="form-control fw-bold" id="inputPassword" name='password' value={credentials.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div class="mb-5">
                        <label for="inputConfirmPassword" class="col-sm-5 col-form-label me-2">Confirm-Password:</label>
                        <div class="login-password-container col-sm-12">
                            <input type={`${showPassword ? 'text' : 'password'}`} class="form-control fw-bold" id="inputConfirmPassword" name='confirmPassword' value={credentials.confirmPassword} onChange={handleChange} required />
                            <i onClick={() => setshowPassword(!showPassword)}>{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</i>
                        </div>
                    </div>
                    <button className='btn btn-warning w-100 fw-bold' type='submit'>Reset Password</button>
                </form>
            </div>
        </>
    )
}
