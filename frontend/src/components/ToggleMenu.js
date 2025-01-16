import React from 'react'
import './ToggleMenu.css'
import { IoIosLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaBagShopping } from "react-icons/fa6";
import { ContextState } from '../contextAPI';
import { RiAlignItemLeftFill } from 'react-icons/ri';
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { FaHome, FaShoppingBasket } from 'react-icons/fa';

export default function ToggleMenu() {

    const { setuser, setisAuthenticated, settoggle, setloading, user, setkeyword, setminPrice, setmaxPrice, setcategory } = ContextState();

    const handleClick = () => {
        setkeyword('')
        setloading(true)
        setminPrice(0)
        setmaxPrice(1000)
        setcategory('')
        settoggle(false)
    }

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
        }
    }

    return (
        <>
            <div className={`menu bg-dark py-1 px-2 z-1 ${!user && 'hide'}`}>
                <div className="links d-flex flex-column ms-2">
                    <Link to={'/'} className='hidden-option depart link text-light text-decoration-none m-3 h5' onClick={handleClick}><FaHome size='1.5rem' /> <h5 className='ms-2'>Home</h5></Link>
                    <Link to={'/shop'} className='hidden-option serv link text-light text-decoration-none m-3 h5' onClick={handleClick}><FaShoppingBasket size='1.5rem' /> <h5 className='ms-2'>Shop</h5></Link>
                    <hr className='hidden-option' />

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
                            <div className='sign text-center hidden-option'>
                                <FaBagShopping size='2rem' />
                                <Link to={'/login'} className='text-decoration-none fw-bold fs-5 btn btn-warning ms-3 rounded-5'>Sign in or create account</Link>
                            </div>
                        </>
                    }
                    {user &&
                        <>
                            <hr />
                            <Link className='link text-light text-decoration-none m-3 h5' onClick={handleLogout}><IoIosLogOut size={30} className='text-danger' />Logout</Link>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
