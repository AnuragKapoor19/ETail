import React, { useState } from 'react'
import './DashboardSidebar.css'
import { Link } from 'react-router-dom'
import { MdDashboard, MdReviews } from "react-icons/md";
import { FaBorderAll, FaPlus, FaProductHunt, FaShoppingBasket, FaUsers } from "react-icons/fa";


export default function DashboardSidebar() {
  const [dropdown, setdropdown] = useState(false)

  const handleClick = () => {
    setdropdown(!dropdown)
  }

  return (
    <>
      <div className='dsidebar-container col-sm-12 col-md-2 col-lg-2 me-3 bg-dark text-light text-center'>
        <ul className='sidebar-ul'>

          <li className='my-3' onClick={() => setdropdown(false)}>
            <Link to='/admin/dashboard' className='text-decoration-none text-light fw-bold '><MdDashboard /> Dashboard</Link>
          </li>

          <li className='my-3'>
            <span onClick={handleClick} className='text-light fw-bold '><FaProductHunt /> Products</span>
            {dropdown &&
              <div className='for-lg flex-column ms-3 mt-2 align-items-start'>
                <Link to='/admin/products' className='text-decoration-none text-light fw-bold '><FaBorderAll /> All</Link>
                <Link to='/admin/new/product' className='text-decoration-none text-light fw-bold '><FaPlus /> Create</Link>
              </div>
            }
          </li>

          <li className='my-3' onClick={() => setdropdown(false)}>
            <Link to='/admin/orders' className='text-decoration-none text-light fw-bold '><FaShoppingBasket /> Orders</Link>
          </li>

          <li className='my-3' onClick={() => setdropdown(false)}>
            <Link to='/admin/users' className='text-decoration-none text-light fw-bold '><FaUsers /> Users</Link>
          </li>

          <li className='my-3' onClick={() => setdropdown(false)}>
            <Link to='/admin/reviews' className='text-decoration-none text-light fw-bold '><MdReviews /> Reviews</Link>
          </li>

        </ul>

        {dropdown &&
          <div className='for-sm bg-dark'>
            <Link to='/admin/products' className='text-decoration-none text-light fw-bold '><FaBorderAll /> All</Link>
            <Link to='/admin/new/product' className='text-decoration-none text-light fw-bold '><FaPlus /> Create</Link>
          </div>
        }
      </div>
    </>
  )
}
