import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import api from '../../../Helper/api';
import axios from 'axios';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import BeatLoader from "react-spinners/BeatLoader";

const InfoUser = () => {
   //lấy thông tin từ local storage
   const user = JSON.parse(localStorage.getItem('user'));

    const [loading, setLoading] = useState(false)
    // lấy dữ liệu từ page navbar 
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    //Đăng xuất tài khoản
    const logout = () => {
        setLoading(true)
        setTimeout(() => {
            alert('Đã đăng xuất tài khoản')
            setLoading(false)
            localStorage.removeItem('user'); // Xóa thông tin khỏi localStorage
            navigate('/')
        }, 3000);

    }

    //lấy thông tin của tài khoản của bạn khi qua trang này
    const [info, setInfo] = useState([])
    useEffect(() => {
        axios.post(`${api}/info`, { id: data.id })
            .then((res) => {
                setInfo(res.data)
            })
    }, [])
    const [hiddenPass, setHiddenPass] = useState(false)
    const handlePass = () => {
        setHiddenPass(!hiddenPass)
    }

    // đổi thông tin tài khoản
    const [changePass, setChangePass] = useState(false)
    const [newName, setNewName] = useState('')
    const [newPass, setNewPass] = useState('')
    const [passAgain, setPassAgain] = useState()

    const handleChangePass = () => {

        axios.post(`${api}/info`, { id: data.id })
            .then((res) => {
                setNewName(res.data.name)
                setNewPass(res.data.password)
            })
        setChangePass(!changePass)
    }
    const ChangeInfo = (e) => {

        const info = {
            id: data.id,
            name: newName,
            password: newPass,
        }
        e.preventDefault();
        if (newPass.length > 5) {
            if (newPass === passAgain) {
                setLoading(true)
                axios.post(`${api}/changeInfo`, info)
                    .then((res) => {
                        alert('Thay đổi thông tin thành công, vui lòng đăng nhập lại');
                        setLoading(false)
                        navigate('/')
                    })
            } else {
                alert('Mật khẩu xác nhận không đúng')
            }
        } else {
            alert('Tối thiểu 6 kí tự cho mật khẩu')
        }
    }
    return (
        <div className='flex flex-col justify-center items-center m-2'>
            {
                loading &&
                <div className="flex justify-center items-center w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0">
                    <BeatLoader
                        color={'#DB142C'}
                        loading={loading}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }

            <div className='border border-black rounded-md p-2 container'>
                {/* trờ lại trang home  */}
                <div className='flex bg-gray-100 p-2 justify-between rounded-md'>
                    <div className='flex  items-center'>
                        <Link to="/user">
                            <IoIosArrowRoundBack className='text-red-500 text-[35px]' />
                        </Link>

                        <p className=' pl-3 font-medium text-[16px]'>Quay lại </p>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer' onClick={logout}>
                        <p className=' pl-3 font-medium text-[16px]'>Đăng xuất </p>
                        <IoIosLogOut size={20} className='text-red-500' />
                    </div>
                </div>
                {/* lịch sử đơn hàng  */}
                <h1 className='font-bold'>Thông tin tài khoản </h1>
                <div className='sm:flex gap-2'>
                    <div>
                        <div className='flex gap-2 items-center m-2'>
                            <h6 className='font-bold'>Tên tài khoản: </h6>
                            <h6>{info.name}</h6>
                        </div>
                        <div className='flex gap-2 items-center m-2'>
                            <h6 className='font-bold'>Tài khoản: </h6>
                            <h6>{info.username}</h6>
                        </div>
                        <div className='flex items-center gap-2 m-2'>
                            <h6 className='font-bold'>Mật khẩu:</h6>
                            <input className='w-[100px]' type={hiddenPass ? 'text' : 'password'} value={info.password} style={{ outline: 'none' }} />
                            <div onClick={handlePass} className='cursor-pointer'>
                                {hiddenPass ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className=''>
                            {
                                changePass
                                    ?
                                    (<div>
                                        <form onSubmit={(e) => ChangeInfo(e)}>
                                            <div className='m-2'>
                                                <h6 className='font-semibold'>Tên tài khoản:</h6>
                                                <input
                                                    required
                                                    value={newName}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    type="text"
                                                    className='border border-gray-200 w-[300px] p-1 rounded-md'
                                                    style={{ outline: 'none' }} />
                                            </div>
                                            <div className='m-2'>
                                                <h6 className='font-semibold'>Mật khẩu mới:</h6>
                                                <input
                                                    required
                                                    value={newPass}
                                                    onChange={(e) => setNewPass(e.target.value)}
                                                    type="password"
                                                    className='border border-gray-200 w-[300px] p-1 rounded-md'
                                                    style={{ outline: 'none' }} />
                                            </div>
                                            <div className='m-2'>
                                                <h6 className='font-semibold'>Nhập lại mật khẩu mới:</h6>
                                                <input
                                                    required
                                                    value={passAgain}
                                                    onChange={(e) => setPassAgain(e.target.value)}
                                                    type="password"
                                                    className='border border-gray-200 w-[300px] p-1 rounded-md'
                                                    style={{ outline: 'none' }} />
                                            </div>
                                            <div className='gap-2 flex justify-end m-2'>
                                                <button onClick={handleChangePass} className='font-semibold p-2 rounded-md bg-red-500'>Hủy</button>
                                                <button type="submit" className='font-semibold p-2 rounded-md bg-yellow-300'>Thay đổi</button>
                                            </div>
                                        </form>
                                    </div>)
                                    :
                                    <button className='p-2 font-semibold rounded-md bg-yellow-300' onClick={handleChangePass}>Đổi thông tin</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InfoUser