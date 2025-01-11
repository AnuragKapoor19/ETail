import React from 'react'
import './ToggleMenu.css'
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FaBagShopping } from "react-icons/fa6";
import { ContextState } from '../contextAPI';
import { AiOutlineAppstore } from 'react-icons/ai';
import { RiAlignItemLeftFill, RiAppsLine } from 'react-icons/ri';
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

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
            <div className="menu bg-dark py-1 px-2 z-1">
                <div className="links d-flex flex-column ms-2">
                    {user
                        ?
                        <>
                            <Link className='link text-light text-decoration-none m-3 h5' to='/me/profile' onClick={() => settoggle(false)}><CgProfile className='me-2' size='1.5rem' />Profile</Link>
                            {user.role === 'admin'
                                ? <Link className='link text-light text-decoration-none m-3 h5' to='/admin/dashboard' onClick={() => settoggle(false)}><MdDashboard className='me-2' size='1.5rem' /> Dashboard</Link>
                                : ''
                            }
                            <Link className='link text-light text-decoration-none m-3 h5' to='/my/orders' onClick={() => settoggle(false)}><RiAlignItemLeftFill className='me-2' size='1.5rem' />Orders</Link>
                        </>
                        :
                        <>
                            <div>
                                <FaBagShopping />
                                <div className='btn btn-warning'>Sign in or create account</div>
                            </div>
                        </>
                    }
                    <hr />
                    <Link className='link d-flex text-light text-decoration-none m-3 h5'><AiOutlineAppstore size='1.5rem' /> <h5 className='ms-2'>Departments</h5></Link>
                    <Link className='link d-flex text-light text-decoration-none m-3 h5'><RiAppsLine size='1.5rem' /> <h5 className='ms-2'>Services</h5></Link>
                    <hr />
                    {user &&
                        <Link className='link text-light text-decoration-none m-3 h5' onClick={handleLogout}><IoIosLogOut size={30} className='text-danger' /> Logout</Link>
                    }
                </div>
            </div>
        </>
    )
}
