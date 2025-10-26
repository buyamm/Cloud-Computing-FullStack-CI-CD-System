import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { PiRecycleBold } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from 'axios';
import api from '../../../Helper/api';
import formatPrice from '../../../Helper/formatPrice';
const ManagerUser = () => {
    const [listUser, setListUser] = useState([])
    useEffect(() => {
        try {
            axios.get(`${api}/listUser`)
                .then((res) => {
                    setListUser(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className='border border-black m-2 rounded-md'>
            <div className='p-2'>
                <h6 className='font-bold'>Thông tin tài khoản khách hàng</h6>
                <div>
                    <table className='w-full border-collapse'>
                        <thead className='border'>
                            <tr>
                                <th className='border'>STT</th>
                                <th className='border'>Tên khách hàng</th>
                                <th className='border'>Tài khoản email</th>
                                <th className='border'>Mật khẩu</th>
                                <th className='border'>Vai trò</th>
                                <th className='border'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listUser.map((data, index) => {
                                    return (
                                        <tr className='' key={index}>
                                            <th className='border text-center w-[5%] p-1'>{index + 1}</th>
                                            <td className='border w-[25%] p-1 text-[11px]'>{data.name}</td>
                                            <td className='border text-[11px]  w-[25%] text-center p-1 font-medium'>{data.username}</td>
                                            <td className='border text-[11px] w-[25%] text-center p-1 font-medium'>**********</td>
                                            <td className='border text-[11px]  w-[25%] text-center p-1 font-medium'>{data.role}</td>


                                            <td className='border p-1'>
                                                <div className='flex justify-center gap-6 '>
                                                    <RiDeleteBinLine className='text-red-300 cursor-pointer' onClick={() => {alert('Không thể xóa người dùng này : '+data._id) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManagerUser