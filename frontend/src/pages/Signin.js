import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContextState } from '../contextAPI'

export default function Signin() {
  const { setloading, setuser, setisAuthenticated, isAuthenticated } = ContextState();
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({ name: '', email: '', password: '' })
  const [avatar, setavatar] = useState('')
  const [avatarPreview, setavatarPreview] = useState('https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png')

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  //Reading image from computer to upload on cloudinary
  const handleAvatarChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if(reader.readyState === 2){              //States of reader 0=created, 1=processing, 2=success to read data
          setavatarPreview(reader.result)
          setavatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/v1/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password , avatar: avatar})
    })

    const data = await response.json()

    if (!data.success) {
      return console.log(data.message || data.error)
    }

    await setuser(data.user)
    await setisAuthenticated(true)
    await setloading(true)
    navigate('/')
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [navigate, isAuthenticated])


  return (
    <>
      <div className="login-form d-flex justify-content-center align-items-center bg-danger" style={{ height: '100vh' }}>
        <div className="login border border-warning rounded-5 p-3 col-sm-8 col-md-4 col-lg-3 bg-light" >
          <h3 className='text-center fs-1'>Create Account</h3>
          <form className='d-flex flex-column' onSubmit={handleSubmit} encType='multipart/form-data'>

            <div className="mt-3 mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" name='name' className="form-control border-warning fw-bold" id="name" placeholder="name" value={credentials.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" name='email' className="form-control border-warning fw-bold" id="email" placeholder="name@example.com" value={credentials.email} onChange={handleChange} required />
            </div>

            <div className='mb-3'>
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" name='password' className="form-control border-warning fw-bold" id="password" placeholder="password" value={credentials.password} onChange={handleChange} required />
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
                  placeholder="Choose Avatar"
                  onChange={handleAvatarChange}
                  accept='images/*'
                  required
                />
              </div>
            </div>

            <button className='btn btn-warning mt-5' type='submit'>Signin</button>
            <Link to='/login' className='text-decoration-none text-center'>Already a User? Login</Link>
          </form>
        </div>
      </div>
    </>
  )
}

