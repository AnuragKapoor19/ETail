import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaBorderAll, FaPlus, FaProductHunt, FaShoppingBasket, FaUsers } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";


export default function DashboardSidebar() {
  const [dropdown, setdropdown] = useState(false)

  const handleClick = () => {
    setdropdown(!dropdown)
  }

  return (
    <>
      <div className='col-sm-3 col-md-2 col-lg-2 me-3 bg-dark text-light sidebar text-center' style={{ minHeight: '100vh' }}>
        <ul className='mt-5 d-flex align-items-start flex-column' style={{ listStyle: 'none', cursor: 'pointer' }}>

          <li className='my-3' onClick={() => setdropdown(false)}>
            <Link to='/admin/dashboard' className='text-decoration-none text-light fw-bold fs-5'><MdDashboard /> Dashboard</Link>
          </li>

          <li className='my-3'>
            <span onClick={handleClick} className='text-light fw-bold fs-5'><FaProductHunt /> Products <TiArrowSortedDown /></span>
            {dropdown &&
              <div className='d-flex flex-column ms-3 mt-2 align-items-start'>
                <Link to='/admin/products' className='text-decoration-none text-light fw-bold fs-5'><FaBorderAll /> All</Link>
                <Link to='/admin/new/product' className='text-decoration-none text-light fw-bold fs-5'><FaPlus /> Create</Link>
              </div>
            }
          </li>

          <li className='my-3' onClick={() => setdropdown(false)}>
            <Link to='/admin/dashboard' className='text-decoration-none text-light fw-bold fs-5'><FaShoppingBasket /> Orders</Link>
          </li>

          <li className='my-3' onClick={() => setdropdown(false)}>
            <Link to='/admin/dashboard' className='text-decoration-none text-light fw-bold fs-5'><FaUsers /> Users</Link>
          </li>

        </ul>
      </div>
    </>
  )
}
