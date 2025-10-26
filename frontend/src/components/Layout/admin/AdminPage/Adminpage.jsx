import React, { useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Image } from '@cloudinary/react';
import axios from 'axios';
import { BiLogOut } from "react-icons/bi";
import { FaRegDotCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";
import { Outlet, Link, useNavigate } from "react-router-dom";


const Adminpage = () => {

    var avt = "data:image/png;base64,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"
    const data = [
        { id: 1, title: 'Sản phẩm', path: 'products' },
        { id: 2, title: 'Danh mục', path: 'category' },
        { id: 3, title: 'Báo cáo doanh thu', path: 'revenue' },
        { id: 4, title: 'Thông báo', path: 'notification' },
        { id: 5, title: 'Kho hàng', path: 'warehouse' },
        { id: 6, title: 'Người dùng', path: 'manageruser' },

    ]
    // lấy thông tin tuwf localstorage
    const user = JSON.parse(localStorage.getItem('admin'));
    const navigate = useNavigate();
    if (!user) {
        navigate('/')
    }
    const handleLogout = () => {
        localStorage.removeItem('admin');
        navigate('/account/login');
    };
    const [selected, setSelected] = useState(null)
    const handle = (id) => {
        setSelected(id)
    }
    return (
        <div className='m-1 flex border border-gray-500 '>
            <div className='w-[25%] border border-gray-500 bg-gray-400 h-[100vh] '>
                <div className='flex items-center p-2 gap-3'>
                    <img src={avt} alt="" className='w-[50px] h-[50px] rounded-full border p-1' />
                    <div className='text-15'>
                        <h2 className='font-semibold text-17'>{user.name} (admin)</h2>
                        <h2 className='flex items-center gap-1 cursor-pointer hover:bg-gray-200 rounded-xl p-1' onClick={handleLogout}><BiLogOut />Đăng xuất</h2>
                    </div>
                </div>
                {
                    data.map((data) => {

                        return (
                            <Link to={data.path}>
                                <div
                                    className='border-t border-gray-300 p-4 gap-2 flex items-center cursor-pointer hover:bg-gray-300'
                                    onClick={() => handle(data.id)}>
                                    <FaRegDotCircle className={`${selected === data.id ? 'text-white' : ''}`} />
                                    <div className='text-[16px] font-semibold'>{data.title}</div>
                                </div>
                            </Link>
                        )
                    })
                }

            </div>
            <div className='w-[75%] '>
                {/* Tìm kiếm sản phẩm  */}
                <div className='m-2 relative flex items-center gap-4'>
                    <IoSearch className='absolute text-[25px] cursor-pointer top-[10px] left-[5px]' />
                    <input
                        style={{ outline: 'none' }}
                        type="text"
                        placeholder='Bạn muốn tìm gì ?'
                        className=' pl-[30px] border border-gray-400 rounded-md w-full h-[40px] text-[16px]' />
                    <MdOutlineAdminPanelSettings className='text-[25px] cursor-pointer hover:text-red-500' />
                    <PiPhoneCallFill className='text-[25px] cursor-pointer hover:text-red-500' />
                </div>
                {/* Trang thay đối khi click vào  */}
                <div className="overflow-y-auto " style={{ height: 'calc(100vh - 80px)' }} >
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

export default Adminpage