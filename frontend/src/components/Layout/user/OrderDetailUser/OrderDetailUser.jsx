import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiShop } from "react-icons/ci";
import formatPrice from '../../../Helper/formatPrice';
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaFacebookMessenger } from "react-icons/lia";
import scrollToTop from '../../../Helper/scroll';
const OrderDetailUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    const goback = () => navigate(-1)
    return (
        <div className='flex flex-col justify-center items-center my-2'>
            <div className='border border-black rounded-md p-2 container'>
                {/* trờ lại trang home  */}
                <div className='flex bg-gray-100 p-2 justify-between rounded-md'>
                    <div className='flex  items-center' onClick={goback}>
                        <IoIosArrowRoundBack className='text-red-500 text-[35px]' />
                        <p className=' pl-3 font-medium text-[16px]'>Quay lại </p>
                    </div>
                    <div className='flex items-center'>
                        <LiaFacebookMessenger size={30} className='text-red-500 ksnjdfs' />
                    </div>
                </div>
                {/* lịch sử đơn hàng  */}
                <h1 className='font-bold'>Chi tiết đơn hàng</h1>
                <div className='flex flex-col justify-center items-center'>
                    {
                        data.map((data, index) => {
                            return (
                                <div key={index} className=' w-full sm:w-[550px] md:w-[700px]  xl:w-[1024px]'>

                                    <div className='border border-gray-400 p-2 m-1 rounded-xl'>
                                        <div className='flex items-center justify-between p-1 border-b border-gray-300'>
                                            <div className='flex items-center gap-2'>
                                                <CiShop size={19} className='text-red-500' />
                                                <p className='font-bold text-red-500'> LSHOP-TECH  </p>
                                            </div>
                                        </div>
                                        <div className='flex  p-1'>
                                            <img src={data.image} alt="" className=' h-[60px] border border-gray-400 rounded-md p-1' />
                                            <div className='pl-3'>
                                                <h3 className='text-[12px] font-medium'>{data.name}</h3>
                                                <div className='flex gap-2'>
                                                    <h3 className='text-red-600 text-[12px]'>{formatPrice(data.realPrice)} đ</h3>
                                                    <h3 className='text-[12px]'>x {data.quantity}   </h3>
                                                    <h3 className='text-[12px] text-red-600 '>= {formatPrice(data.realPrice * data.quantity)} đ</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderDetailUser