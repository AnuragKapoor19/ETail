import React, { useState } from 'react'
import Logo from '../Logo.png';
import { FaBasketShopping, FaRegUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import './Header.css'
import ToggleMenu from './ToggleMenu';
import { ContextState } from '../contextAPI';
import { useNavigate } from 'react-router-dom';

export default function Headers() {
    const { toggle, settoggle, cartItems, user, setkeyword, setloading, setminPrice, setmaxPrice, setcategory, setbrand, setcurrentPage } = ContextState();
    const [word, setword] = useState('')
    const navigate = useNavigate()

    const handleToggleMenu = () => {
        settoggle(!toggle)
    }

    const handleChange = (e) => {
        setword(e.target.value)
    }

    const handleSearchClick = () => {
        setkeyword(word)
        setloading(true)
        setminPrice(0)
        setmaxPrice(1000)
        setcategory('')
        setbrand('')
        navigate('/shop')
    }

    const handleClick = () => {
        setkeyword('')
        setword('')
        setloading(true)
        setminPrice(0)
        setmaxPrice(1000)
        setcategory('')
        setbrand('')
        setcurrentPage(1)
    }

    const handleClick1 = async () => {
        await setcategory('Grocery and Food Items');
        navigate('/shop')
    }

    const handleClick2 = async () => {
        await setcategory('Grocery and Food Items');
        navigate('/shop')
    }

    const handleClick3 = async () => {
        await setcategory('Grocery and Food Items');
        navigate('/shop')
    }

    const handleClick4 = async () => {
        await setcategory('Grocery and Food Items');
        navigate('/shop')
    }

    return (
        <>
            <div className='nav-container bg-dark pb-3 pt-1'>
                <div className='row-1 d-flex text-light justify-content-around align-items-center'>

                    <div className='menu-icon text-light' onClick={handleToggleMenu}>
                        <GiHamburgerMenu size='2rem' />
                    </div>

                    {toggle
                        ? <ToggleMenu />
                        : ''
                    }

                    <div className='logo d-flex text-warning'>
                        {/* <FaBagShopping size='2rem' />
                        <h2>ETail</h2> */}
                        <img src={Logo} alt='logo' />
                    </div>

                    <Link to={'/'} className='Home text-decoration-none text-light' onClick={handleClick}>
                        <FaHome size='1.5rem' />
                        <h5>Home</h5>
                    </Link>

                    <Link to={'/shop'} className='Shop text-decoration-none text-light' onClick={handleClick} >
                        <FaBasketShopping size='1.5rem' />
                        <h5>Shop</h5>
                    </Link>

                    <div className='search-bar d-flex rounded-5 bg-light text-light justify-content-center align-items-center'>
                        <input type='text' placeholder='Search ETail' className='search-input border-0 fw-bold ' value={word} onChange={handleChange} />
                        <IoMdSearch size="2rem" className='search-icon text-dark' onClick={handleSearchClick} />
                    </div>

                    <div className='cart position-relative'>
                        <Link to={'/cart'} className='linktocart'><FiShoppingCart size='1.8rem' /></Link>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartItems.length}
                        </span>
                    </div>

                    {user
                        ?
                        <div className='hidden userAvatar justify-content-center align-items-center'>
                            <img src={user.avatar.url} className='rounded-circle me-2' style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} alt='Avatar' />
                            <div className='d-flex flex-column'>
                                <span className='fs-6'>Hi</span>
                                <span className='fw-bold fs-5'>{String(user.name).split(' ')[0]}</span>
                            </div>
                            <i className='dots3 btn text-light border-0 ms-2' onClick={handleToggleMenu}><CiMenuKebab size={27} /></i>
                        </div>
                        :
                        <Link to={'/login'} className='hidden sign-in align-items-center text-decoration-none text-light'>
                            <FaRegUser size='1.5rem' />
                            <div className='ms-2'>
                                <span>Sign In</span>
                                <h5>Account</h5>
                            </div>
                        </Link>
                    }

                </div>
                <hr className='border border-light border-3' />
                <div className='row-2 d-flex justify-content-between align-items-center'>
                    <div className='links fs-5 fw-bold align-items-center'>
                        <Link className='link-1 text-decoration-none text-light mx-4' onClick={handleClick1}>Back to School</Link>
                        <Link className='link-2 text-decoration-none text-light mx-4' onClick={handleClick2}>Top Deals</Link>
                        <Link className='link-3 text-decoration-none text-light mx-4' onClick={handleClick3}>Deals of the Day</Link>
                        <Link className='link-4 text-decoration-none text-light mx-4' onClick={handleClick4}>Grocery & Essentials</Link>
                    </div>

                    <div className='offer'>
                        <span className='text-warning fw-bolder fs-5 fst-italic'>Free Shipping on orders of above $200</span>
                    </div>
                </div>
            </div>
        </>
    )
}
