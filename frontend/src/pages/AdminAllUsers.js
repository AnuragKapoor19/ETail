import React, { useEffect } from 'react'
import { IoTrashBin } from 'react-icons/io5'
import DashboardSidebar from '../components/DashboardSidebar'
import Header from '../components/Header'
import { MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { ContextState } from '../contextAPI'

export default function AdminAllUsers() {
    const { allUsers, setallUsers, isUserDeleted, isUserUpdated, setisUserDeleted } = ContextState()

    const getAllUsers = async () => {
        const res = await fetch('http://localhost:5000/api/v1/admin/users', {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()

        setallUsers(data.users)
    }

    if (allUsers.length === 0) {
        getAllUsers()
    }

    useEffect(() => {
        getAllUsers()
        //eslint-disable-next-line
    }, [isUserDeleted, isUserUpdated])

    const handleDelete = async (id) => {
        setisUserDeleted(false)
        const res = await fetch(`http://localhost:5000/api/v1/admin/user/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        const data = await res.json()

        if (!data.success) {
            return console.log(data.error || data.message);
        }

        setisUserDeleted(true)
        console.log(data.message);
    }

    return (
        <>
            <Header />
            <div className='big-d-container big-o-container d-flex'>
                <DashboardSidebar />
                <div className='users-container ms-1 d-flex justify-content-center my-4 col-sm-12 col-md-12 col-lg-9'>
                    <div className='col-11 p-2 b-shadow text-center'>
                        <h3 className='mb-5'>All Users</h3>
                        <table className='col-12 ' cellPadding="5px">
                            <thead>
                                <tr className='top-tr'>
                                    <th>User Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allUsers && allUsers.map((user) => (
                                    <tr className='tr'>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>${user.email}</td>
                                        <td>{user.role}</td>
                                        <td className='d-flex justify-content-center'>
                                            <Link to={`/admin/user/update/${user._id}`} className='btn btn-primary me-1'><MdEdit /></Link>
                                            <div className='btn btn-danger' onClick={() => handleDelete(user._id)}><IoTrashBin /></div>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
