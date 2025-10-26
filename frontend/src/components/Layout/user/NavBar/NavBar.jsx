import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GiCartwheel } from "react-icons/gi";
import { PiShoppingCartThin } from "react-icons/pi";
import axios from 'axios';
import api from '../../../Helper/api';
import { IoCall } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import Footer from '../Footer/Footer';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import NavBarMobile from './NavBarMobile';
import Search from './Search';
import Category from './Category';


const NavBar = () => {
    //lấy thông tin từ local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // lấy ra list danh mục ( category)
    useEffect(() => {
        getListCategory()
    }, [])
    const [listCategory, setListCategory] = useState([])
    const getListCategory = () => {

        axios.get(`${api}/category`)
            .then((res) => {
                setListCategory(res.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    // đăng xuất tài khoản 
    const navigate = useNavigate()
    const logout = () => {
        navigate('/user/info', { state: user });
    }
    return (
        <>
            <ScrollToTopButton />

            <df-messenger
                intent="WELCOME"
                chat-title="ChatboxAI"
                agent-id="73daf731-fc51-4b0c-9c4d-c5d1781c51e7"
                language-code="en"
            ></df-messenger>

            <div class="  bg-red-600 flex flex-col items-center fixed top-0 right-0 left-0 z-10">
                <div className='flex  bg-red-600 p-2 gap-3 text-white  container'>

                    
                    {/* logo  */}
                    <div className=' basis-1/12 md:basis-3/12 xl:basis-2/12 '>
                        <Link to="home">
                            <div className='flex justify-center items-center gap-1 h-full'>
                                <h6 className='text-[20px] font-bold hidden md:block'>LSHOP-TECH </h6>
                                <h6 className=''><GiCartwheel size={30} /></h6>
                            </div>
                        </Link>
                    </div>

                    {/* danh mục  */}
                    <Category />

                    {/* Tìm kiếm sản phảma  */}

                    <Search />

                    {/* Liên hệ mua hàng  */}
                    <div className='bg-red-500 hover:bg-red-400 rounded-md hidden lg:block lg:basis-1/12  cursor-pointer '>

                        <Link to="address">
                            <div className='flex flex-col justify-center items-center h-full'>
                                <h6 className='xl:text-[20px] text-[15px]'><IoCall /></h6>
                                <h6 className='text-[10px]  '>0356.031.160 </h6>
                            </div>
                        </Link>
                    </div>


                    {/* tra cứu thông tin đơn hàng  */}
                    <div className='hidden bg-red-500 hover:bg-red-400 rounded-md md:block basis-1/12 cursor-pointer '>
                        <Link to="histories">
                            <div className='flex flex-col justify-center items-center h-full'>
                                <h6 className='xl:text-[20px] text-[15px]'><CiDeliveryTruck /></h6>
                                <h6 className='text-[10px] '>Đơn hàng </h6>
                            </div>
                        </Link>
                    </div>



                    {/* Giỏ hàng  */}
                    <div className='bg-red-500 hover:bg-red-400 p-1 rounded-md basis-2/12 md:basis-1/12'>

                        <Link to="cart">
                            <div className='flex flex-col justify-center items-center h-full'>
                                <h6 className='xl:text-[20px] text-[15px] relative'><PiShoppingCartThin />
                                </h6>
                                <h6 className='text-[10px] '>Giỏ hàng </h6>
                            </div>
                        </Link>
                    </div>



                    {/* Tài khoản  */}
                    <div className='bg-red-500  hover:bg-red-400  rounded-md p-1 basis-2/12 md:basis-1/12 cursor-pointer' onClick={logout}>
                        <div className='flex flex-col justify-center items-center h-full'>
                            <h6 className='xl:text-[20px] text-[15px]'><FaUserCircle /></h6>
                            <h6 className='text-[10px]'>{user.name}</h6>
                        </div>
                    </div>
                </div>


            </div>

            {/* Navbar khi ở màn hình mobile  */}
            <NavBarMobile listCategory={listCategory} />

            {/* <div className="overflow-y-auto pb-[80px] md:pb-0  overflow-x-hidden" style={{ height: 'calc(100vh - 50px)' }}> */}
            <div className='mt-[60px]'>
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default NavBar;