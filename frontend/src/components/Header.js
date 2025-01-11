// import React, { useState } from 'react'
// import { FaBagShopping } from "react-icons/fa6";
// import { FaSearch } from "react-icons/fa";
// import { ContextState } from '../contextAPI';
// import { Link } from 'react-router-dom';
// import { CiMenuKebab } from "react-icons/ci";
// import ToggleMenu from './ToggleMenu';

// export default function Header() {
//     const [word, setword] = useState('')
//     const { toggle, settoggle } = ContextState();
//     const { setkeyword, setloading, setminPrice, setmaxPrice, setcategory, user, cartItems } = ContextState()

//     const handleChange = (e) => {
//         setword(e.target.value)
//     }

//     const handleClick = () => {
//         setkeyword(word)
//         setloading(true)
//     }

//     const handleLogoClick = () => {
//         setkeyword('')
//         setword('')
//         setloading(true)
//         setminPrice(0)
//         setmaxPrice(1000)
//         setcategory('')
//     }

//     const handleToggleMenu = () => {
//         settoggle(!toggle)
//     }

//     return (
//         <>
//             <div id='nav-row' className='d-flex justify-content-between align-items-center bg-dark p-1'>
//                 <Link to={'/'} className='text-decoration-none'>
//                     <div id='logo' className='text-light d-flex justify-content-center align-items-center ms-4' onClick={handleLogoClick}>
//                         <FaBagShopping size='2rem' />
//                         <h3 className='mt-2'>ETail</h3>
//                     </div>
//                 </Link>

//                 <div id='search-input' className='d-flex justify-content-center align-items-center bg-warning rounded-3'>
//                     <input
//                         type='text'
//                         id='input'
//                         placeholder='Enter Product Name...'
//                         className='rounded-start-3 py-1 px-2'
//                         style={{ border: "none", width: "40vw", fontSize: "Larger", fontWeight: "bold" }}
//                         value={word}
//                         onChange={handleChange}
//                     />
//                     <div id='search-btn' type='button' className='d-flex align-items-center px-3' onClick={handleClick}>
//                         <FaSearch size="1.3rem" />
//                     </div>
//                 </div>

//                 <div id='login-cart' className='d-flex text-light me-2 align-items-center'>
//                     {user
//                         ?
//                         <>
//                             <Link to='/cart' className='me-4 text-decoration-none text-light fw-bolder' id='cart'>
//                                 <span className='h6'>Cart</span>
//                                 <span id='cart_count' className='bg-warning px-1 rounded-1 ms-1 text-dark' style={{ fontSize: "large", fontWeight: "bold" }}>{cartItems.length}</span>
//                             </Link>
//                             <div className='d-flex justify-content-center align-items-center'>
//                                 <img src={user.avatar.url} className='rounded-circle ms-2' style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} alt='Avatar' />
//                                 <div className='d-flex flex-column'>
//                                     <span>Hi</span>
//                                     <span className='fw-bold'>{String(user.name).split(' ')[0]}</span>
//                                 </div>
//                                 <i className='btn text-light border-0 ms-2' onClick={handleToggleMenu}><CiMenuKebab size={25} /></i>
//                             </div>
//                             {toggle
//                                 ? <ToggleMenu />
//                                 : ''
//                             }
//                         </>
//                         :
//                         <Link to='/login' id='login' className='btn btn-warning rounded-3 py-1 me-3' style={{ width: "5rem", height: "2rem" }}>
//                             Login
//                         </Link>
//                     }

//                 </div>
//             </div>
//         </>
//     )
// }

import React from 'react'
import { FaBagShopping, FaRegUser } from "react-icons/fa6";
import { AiOutlineAppstore } from "react-icons/ai";
import { RiAppsLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import './Header.css'
import ToggleMenu from './ToggleMenu';
import { ContextState } from '../contextAPI';

export default function Headers() {
    const { toggle, settoggle, cartItems } = ContextState();

    const handleToggleMenu = () => {
        settoggle(!toggle)
    }

    return (
        <>
            <div className='nav-container bg-dark py-3'>
                <div className='row-1 d-flex text-light justify-content-around align-items-center'>

                    <div className='menu-icon text-light' onClick={handleToggleMenu}>
                        <GiHamburgerMenu size='2rem' />
                    </div>

                    {toggle
                        ? <ToggleMenu />
                        : ''
                    }

                    <div className='logo d-flex text-light'>
                        <FaBagShopping size='2rem' />
                        <h3>ETail</h3>
                    </div>

                    <div className='departments'>
                        <AiOutlineAppstore size='1.5rem' />
                        <h5>Departments</h5>
                    </div>

                    <div className='services'>
                        <RiAppsLine size='1.5rem' />
                        <h5>Services</h5>
                    </div>

                    <div className='search-bar d-flex rounded-5 bg-light text-light justify-content-center align-items-center'>
                        <input type='text' placeholder='Search ETail' className='search-input border-0 fw-bold ' />
                        <IoMdSearch size="2.5rem" className='search-icon bg-warning rounded-circle' />
                    </div>

                    <div className='sign-in align-items-center'>
                        <FaRegUser size='1.5rem' />
                        <div className='ms-2'>
                            <span>Sign In</span>
                            <h5>Account</h5>
                        </div>
                    </div>

                    <div className='cart position-relative'>
                        <FiShoppingCart size='1.8rem' />
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartItems.length}
                            <span class="visually-hidden">unread messages</span>
                        </span>
                    </div>
                </div>
                <hr className='border border-light border-3' />
                <div className='row-2 d-flex justify-content-between align-items-center'>
                    <div className='links fs-5 fw-bold align-items-center'>
                        <Link className='link-1 text-decoration-none text-light mx-4'>Back to School</Link>
                        <Link className='link-2 text-decoration-none text-light mx-4'>Top Deals</Link>
                        <Link className='link-3 text-decoration-none text-light mx-4'>Deals of the Day</Link>
                        <Link className='link-4 text-decoration-none text-light mx-4'>Grocery & Essentials</Link>
                    </div>

                    <div className='offer'>
                        <span className='text-warning fw-bolder fs-5 fst-italic me-5'>Free Shipping on orders of above $200</span>
                    </div>
                </div>
            </div>
        </>
    )
}
