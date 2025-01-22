import React, { useState } from 'react'
import { ContextState } from '../contextAPI'
import toast from 'react-hot-toast';

export default function UpdatePassword() {
    const [oldPassword, setoldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const { setisUpdated } = ContextState();

    const handleoldPassword = (e) => {
        setoldPassword(e.target.value)
    }

    const handleNewPassword = (e) => {
        setnewPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/v1/password/update', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ oldPassword, newPassword })
        })

        const data = await res.json()
        if (!data.success) {
            return console.log(data.message)
        }

        toast.success("Password Changed Successfully!")
        setisUpdated(true)
        setoldPassword('')
        setnewPassword('')
    }

    return (
        <>
            <button type="button" className="sidebar-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Change Password
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-dark">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-4 fw-bolder text-center text-warning w-100" id="exampleModalLabel">Update Password</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='w-100 text-center'>
                                    <img src='https://i.pinimg.com/736x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg' alt='logo' className='w-50'/>
                                </div>
                                <div className="mt-3 mb-5">
                                    <label htmlFor="oldPassword" className="form-label">Old Password</label>
                                    <input type="password" name='oldPassword' className="form-control border-warning fw-bold" id="oldPassword" value={oldPassword} onChange={handleoldPassword} required />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="newPassword" className="form-label">New Password</label>
                                    <input type="password" name='newPassword' className="form-control border-warning fw-bold" id="newPassword" value={newPassword} onChange={handleNewPassword} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
