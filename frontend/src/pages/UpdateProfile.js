import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ContextState } from '../contextAPI'

export default function UpdateProfile() {
    const { user, setisUpdated } = ContextState()
    const [credentials, setcredentials] = useState({ name: user.name, email: user.email })
    const [avatar, setavatar] = useState('')
    const [avatarPreview, setavatarPreview] = useState(user.avatar.url)


    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleAvatarChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {              //States of reader 0=created, 1=processing, 2=success to read data
                    setavatarPreview(reader.result)
                    setavatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch('http://localhost:5000/api/v1/me/update', {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ name: credentials.name, email: credentials.email, avatar: avatar })
        })

        const data = await res.json();

        if (data.success) {
            setisUpdated(true)
        }

    }

    return (
        <>
            <Header />
            <div className='update-profile-container d-flex justify-content-center align-items-center flex-column m-5'>
                <form className='d-flex flex-column px-5 pb-5' onSubmit={handleSubmit} encType='multipart/form-data'>
                    <img className='logo' src='https://static.vecteezy.com/system/resources/thumbnails/006/467/668/small_2x/a-trendy-icon-of-profile-update-isometric-design-vector.jpg' alt='logo' />
                    <h2 className=' text-center text-warning fw-bolder'>Update Profile</h2>
                    <div className="mt-3 mb-5">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' className="form-control border-warning fw-bold" id="name" placeholder="name" value={credentials.name} onChange={handleChange} />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control border-warning fw-bold" id="email" placeholder="name@example.com" value={credentials.email} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="file-upload" className="form-label">Avatar</label>
                        <div className="preview-input d-flex">
                            <div className="preview">
                                <img src={avatarPreview} className=' border border-1 border-warning me-3' alt='Avatar Preview' style={{ maxWidth: '40px', maxHeight: '35px', borderRadius: '50%', objectFit: 'contain' }} />
                            </div>
                            <input
                                type="file"
                                name='avatar'
                                className="form-control border-warning fw-bold"
                                id="file-upload"
                                onChange={handleAvatarChange}
                                accept='images/*'
                            />
                        </div>
                    </div>

                    <button className='btn btn-warning mt-5 rounded-0' type='submit'>Update</button>
                </form>
            </div>
            <Footer />
        </>
    )
}
