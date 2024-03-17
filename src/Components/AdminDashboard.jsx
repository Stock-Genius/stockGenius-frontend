import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "./Loader";
import { listUsers } from "../actions/action";
import ServerError from './ServerError';


function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo]);


    return (
        <div className="overflow-x-auto p-6">
            {loading && <Loader />}
            {error && <ServerError error={error} />}
            {
                users && (
                    <table className="min-w-full bg-white dark:border-none border border-gray-300 dark:bg-third">
                        <thead className='dark:text-white text-gray-700 dark:bg-secondary border-neutral-600 bg-gray-200'>
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Company</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">isActive</th>
                                <th className="px-6 py-3">Joined At</th>
                                <th className="px-6 py-3">Edit</th>
                                <th className="px-6 py-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody className='dark:text-neutral-400'>
                            {users.map((ele, i) => (


                                <tr key={i} className="text-sm md:text-base border-b dark:border-secondary dark:border-b dark:hover:bg-secondary hover:bg-gray-100 ">
                                    <td className="py-3 text-sm">
                                        <div className="flex items-center cursor-pointer ml-4">
                                            <div className='w-9 h-9 overflow-hidden rounded-md'>
                                                <img src={(ele.img && ele.img) || "/img/user.jpeg"} className="min-h-full min-w-full shrink-0 scale-125" alt='user' />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm text-black font-semibold dark:text-zinc-200">{ele.name}</p>
                                                <p className="text-xs text-gray-500">{ele.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">{ele.shopname}</td>
                                    <td className={`px-6 py-3`}>{ele.isAdmin ? "Admin" : "User"}</td>
                                    <td className={`px-6 py-3`}>
                                        <div className="flex items-center">
                                            <label className="relative cursor-pointer">
                                                <input type="checkbox" checked={ele.isActive && true} className="sr-only peer" />
                                                <div
                                                    className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]">
                                                </div>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-center">{ele?.createdAt.split('T')[0]}</td>
                                    <td className="px-6 py-3 text-center">
                                        <button
                                            //   onClick={(e) => {
                                            //     handlePopup(e, ele, ele._id);
                                            //   }}
                                            value="edit"
                                            className="bg-gray-200 dark:bg-main dark:hover:bg-primary px-2.5 py-1.5 rounded-full hover:bg-primary text-primary hover:text-white"
                                        >
                                            <i className="fas fa-pencil pointer-events-none"></i>
                                        </button>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <button
                                            //   onClick={(e) => {
                                            //     handlePopup(e, ele, ele._id);
                                            //   }}
                                            value="delete"
                                            className="bg-gray-200 dark:bg-main hover:bg-red-500 px-2.5 py-1.5 rounded-full dark:hover:bg-red-500 text-red-500 hover:text-white"
                                        >
                                            <i className="fas fa-trash pointer-events-none"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default AdminDashboard;


