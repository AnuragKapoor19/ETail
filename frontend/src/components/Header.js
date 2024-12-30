import React, { useState } from 'react'
import { FaBagShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { ContextState } from '../contextAPI';
import { Link } from 'react-router-dom';
import { CiMenuKebab } from "react-icons/ci";
import ToggleMenu from './ToggleMenu';

export default function Header() {
    const [word, setword] = useState('')
    const { toggle, settoggle } = ContextState();
    const { setkeyword, setloading, setminPrice, setmaxPrice, setcategory, user, cartItems } = ContextState()

    const handleChange = (e) => {
        setword(e.target.value)
    }

    const handleClick = () => {
        setkeyword(word)
        setloading(true)
    }

    const handleLogoClick = () => {
        setkeyword('')
        setword('')
        setloading(true)
        setminPrice(0)
        setmaxPrice(1000)
        setcategory('')
    }

    const handleToggleMenu = () => {
        settoggle(!toggle)
    }

    return (
        <>
            <div id='nav-row' className='d-flex justify-content-between align-items-center bg-dark p-1'>
                <Link to={'/'} className='text-decoration-none'>
                    <div id='logo' className='text-light d-flex justify-content-center align-items-center ms-4' onClick={handleLogoClick}>
                        <FaBagShopping size='2rem' />
                        <h3 className='mt-2'>ETail</h3>
                    </div>
                </Link>

                <div id='search-input' className='d-flex justify-content-center align-items-center bg-warning rounded-3'>
                    <input
                        type='text'
                        id='input'
                        placeholder='Enter Product Name...'
                        className='rounded-start-3 py-1 px-2'
                        style={{ border: "none", width: "40vw", fontSize: "Larger", fontWeight: "bold" }}
                        value={word}
                        onChange={handleChange}
                    />
                    <div id='search-btn' type='button' className='d-flex align-items-center px-3' onClick={handleClick}>
                        <FaSearch size="1.3rem" />
                    </div>
                </div>

                <div id='login-cart' className='d-flex text-light me-2 align-items-center'>
                    {user
                        ?
                        <>
                            <Link to='/cart' className='me-4 text-decoration-none text-light fw-bolder' id='cart'>
                                <span className='h6'>Cart</span>
                                <span id='cart_count' className='bg-warning px-1 rounded-1 ms-1 text-dark' style={{ fontSize: "large", fontWeight: "bold" }}>{cartItems.length}</span>
                            </Link>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img src={user.avatar.url} className='rounded-circle ms-2' style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} alt='Avatar' />
                                <div className='d-flex flex-column'>
                                    <span>Hi</span>
                                    <span className='fw-bold'>{String(user.name).split(' ')[0]}</span>
                                </div>
                                <i className='btn text-light border-0 ms-2' onClick={handleToggleMenu}><CiMenuKebab size={25} /></i>
                            </div>
                            {toggle
                                ? <ToggleMenu />
                                : ''
                            }
                        </>
                        :
                        <Link to='/login' id='login' className='btn btn-warning rounded-3 py-1 me-3' style={{ width: "5rem", height: "2rem" }}>
                            Login
                        </Link>
                    }

                </div>
            </div>
        </>
    )
}
