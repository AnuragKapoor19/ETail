import React from 'react'
import { ContextState } from '../contextAPI'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import UpdatePassword from '../components/UpdatePassword';

export default function Profile() {

  const { user } = ContextState();

  return (
    <>
      <Header />
      <h3 className='text-center mt-4'>My Profile</h3>
      <div className="container d-flex justify-content-center align-items-center flex-wrap mt-5">
        <div className='img col-sm-8 col-md-5 col-lg-4 text-center p-5'>
          <img className='rounded-circle' src={user.avatar.url} alt={user.name} style={{ height: '13rem', width: '13rem' }} />
          <Link to='/me/updateprofile' className="btn btn-warning w-100 mt-5 text-decoration-none">Edit Profile</Link>
        </div>

        <div className="details col-sm-8 col-md-5 col-lg-4 py-5">
          <div className='mb-5'>
            <h3>Full Name</h3>
            <span>{user.name}</span>
          </div>

          <div className='mb-5'>
            <h3>Email Address</h3>
            <span>{user.email}</span>
          </div>

          <div className='mb-5'>
            <h3>Joined On</h3>
            <span>{String(user.createdAt).substring(0, 10)}</span>
          </div>

          <div>
            {
              user.role === "admin"
                ? ''
                : <div className="btn btn-danger w-100 mb-3">My Orders</div>
            }
            <UpdatePassword />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
