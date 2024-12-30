import React from 'react'
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { ContextState } from '../contextAPI';

export default function ToggleMenu() {

    const { setuser, setisAuthenticated, settoggle, setloading, user } = ContextState();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await fetch('http://localhost:5000/api/v1/logout', {
            method: "GET",
            credentials: 'include'
        })

        const data = await res.json()

        if (!data.success) {
            console.log(data.error || data.message)
        } else {
            setuser()
            setisAuthenticated(false)
            settoggle(false)
            setloading(true)
            navigate('/')
        }
    }

    return (
        <>
            <div className="menu bg-dark py-1 px-2 rounded-3 z-1" style={{ position: 'absolute', top: '60px', right: '3px' }}>
                <div className="links d-flex flex-column">
                    <Link className='text-light text-decoration-none m-3 h5' to='/me/profile' onClick={() => settoggle(false)}>Profile</Link>
                    {user.role === 'admin'
                        ? <Link className='text-light text-decoration-none m-3 h5' to='/'>Dashboard</Link>
                        : ''
                    }
                    <Link className='text-light text-decoration-none m-3 h5' to='/my/orders' onClick={() => settoggle(false)}>Orders</Link>
                    <Link className='text-light text-decoration-none m-3 h5' onClick={handleLogout}>Logout <IoIosLogOut size={30} className='text-danger' /></Link>
                </div>
            </div>
        </>
    )
}
