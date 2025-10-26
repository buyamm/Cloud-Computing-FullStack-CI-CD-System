import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CiShop } from "react-icons/ci";
import { MdNotificationsActive } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
const NavBarMobile = ({listCategory }) => {
    return (

        <ul className='md:hidden  rounded-t-lg flex flex-row gap-1 text-center  bg-gray-200 fixed bottom-0 w-full p-2 z-10 text-[10px]'>
            <li className='basis-1/5 flex flex-col items-center py-2' >

                <Link to="home">
                    <IoHomeOutline size={25} />
                </Link>
                <p className=' font-bold'>Trang chủ</p>

            </li>
            <li className='basis-1/5 flex flex-col items-center py-2'>
                <Link to="categorymobile" state={{listCategory}}>
                    <BiSolidCategoryAlt size={25} />
                </Link>
                <p className=' font-bold'>Danh mục</p>
            </li>
            <li className='basis-1/5 flex flex-col items-center py-2'>

                <Link to="address">
                    <CiShop size={25} />
                </Link>
                <p className=' font-bold'>Cửa hàng</p>
            </li>
            <li className='basis-1/5 flex flex-col items-center py-2'>

                <Link to="histories">
                    <CiDeliveryTruck size={25} />
                </Link>
                <p className=' font-bold'>Đơn hàng</p>
            </li>
            <li className='basis-1/5 flex flex-col items-center py-2'>

                <Link to="notice">
                    <MdNotificationsActive size={25} />
                </Link>
                <p className=' font-bold'>Thông báo</p>
            </li>

        </ul>
    )
}

export default NavBarMobile