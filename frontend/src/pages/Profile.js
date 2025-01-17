import React from 'react'
import { ContextState } from '../contextAPI'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import UpdatePassword from '../components/UpdatePassword';

export default function Profile() {
  const navigate = useNavigate()
  const { user } = ContextState();

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="profile-sidebar">
          <img
            src={user.avatar.url}
            alt={`${user.name}'s Avatar`}
            className="sidebar-avatar"
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button className="sidebar-btn" onClick={() => navigate('/me/updateprofile')}>
            Edit Profile
          </button>
          <UpdatePassword />

          {user.role === 'user' &&
            <button className="sidebar-btn">
              My Orders
            </button>
          }
        </div>
        <div className="profile-main">
          <h1>Welcome, {user.name}!</h1>
          <div className="profile-details">
            <h2>Profile Information</h2>
            <div className="profile-info-row">
              <p>
                <strong>Name:</strong>
              </p>
              <p>{user.name}</p>
            </div>
            <div className="profile-info-row">
              <p>
                <strong>Email:</strong>
              </p>
              <p>{user.email}</p>
            </div>
            <div className="profile-info-row">
              <p>
                <strong>Joined On:</strong>
              </p>
              <p>{String(user.createdAt).substring(0, 10)}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
