import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from '../../../Helper/api';
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaFacebookMessenger } from "react-icons/lia";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TiTickOutline } from "react-icons/ti";
import formatNumberWithCommas from '../../../Helper/formatPrice';
import BeatLoader from "react-spinners/BeatLoader";
import scrollToTop from '../../../Helper/scroll';

const Histories = () => {
    const [loading, setLoading] = useState(true)
    //lấy thông tin từ local storage
    const user = JSON.parse(localStorage.getItem('user'));
    // lấy ra tất cá các  order tử iduser name
    useEffect(() => {
        getHistories()
        scrollToTop();
    }, [])
    const [listOrder, setListOrder] = useState([])
    const getHistories = () => {
        try {
            axios.post(`${api}/getHistories`, { id: user.id })
                .then((res) => {
                    setListOrder(res.data)
                    setLoading(false)
                    // console.log(res.data)
                })
        } catch (error) {
            console.log("có lỗi xảy ra vui lòng kiểm tra: " + error)
        }
    }
    // chuyển qua trang order detail đồng thời truyền dữu liệu qua 

    const navigate = useNavigate()
    const getOrderDetail = (id) => {
        try {
            axios.post(`${api}/orderdetail`, { id })
                .then((res) => {
                    navigate('/user/orderdetailuser', { state: res.data });
                })
        } catch (error) {
            console.log('Lỗi: ' + error)
        }
    }

    const goback = () => navigate(-1)
    return (
        <div className='flex flex-col items-center p-2 '>
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
                    <div className='flex  items-center' onClick={goback}>
                        <IoIosArrowRoundBack className='text-red-500 text-[35px]' />
                        <p className=' pl-3 font-medium text-[16px]'>Quay lại </p>
                    </div>
                    <div className='flex items-center'>
                        <LiaFacebookMessenger size={30} className='text-red-500' />
                    </div>
                </div>
                {/* lịch sử đơn hàng  */}
                <h1 className='font-bold'>Lịch sử đơn hàng</h1>
                {
                    listOrder.map((data, index) => {
                        return (
                            <div key={index} onClick={() => { getOrderDetail(data._id) }}>

                                <div className='border border-gray-400 m-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 text-13'>
                                    <div className='flex justify-between text-[11px]'>
                                        <div className='flex gap-4 '>
                                            <h6 className='font-bold hidden md:block'>ID: {data._id}</h6>
                                            <h6 className='font-bold '>Ngày đặt: {new Date(data.createdAt).toLocaleString('vi-VN', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}</h6>
                                        </div>
                                        <div className='flex gap-2'>
                                            <h6 className='font-bold hidden md:block'>Trạng thái đơn hàng:</h6>
                                            {
                                                data.state === false
                                                    ?
                                                    <h6 className='text-yellow-500 flex'>Chưa xác nhận <TiTickOutline /></h6>
                                                    :
                                                    <h6 className='text-green-500 flex'>Đã xác nhận <TiTickOutline /></h6>
                                            }

                                        </div>
                                    </div>
                                    <hr />
                                    <div className='text-[11px]'>
                                        <h6>Địa chỉ giao: {data.address}</h6>
                                        <h6>Điện thoại: {data.phone}</h6>
                                        <h6>Ghi chú: {data.note}</h6>
                                        <h6>Tổng tiền: {formatNumberWithCommas(data.total)} VND</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Histories