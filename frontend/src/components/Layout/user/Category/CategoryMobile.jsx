import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../../../Helper/api';
import Items from '../Items/Items';
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaFacebookMessenger } from "react-icons/lia";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
const CategoryMobile = () => {
    const location = useLocation();
    const { listCategory } = location.state || {};
    const [listCategoryMobile, setListCategoryMobile] = useState(listCategory)
    const [productsByCategory, setProductsByCategory] = useState({})

    useEffect(() => {
        listCategory.forEach((category) => {
            axios.get(`${api}/listProductCategory/${category.name}`)
                .then((res) => {
                    setProductsByCategory((prev) => ({
                        ...prev,
                        [category.name]: res.data
                    }))
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }, [listCategory])
    return (
        <div className=''>
            {/* trờ lại trang home  */}
            <div className='flex bg-gray-200 p-2 justify-between'>
                <div className='flex  items-center'>
                    <Link to="/user">
                        <IoIosArrowRoundBack className='text-red-500 text-[35px]' />
                    </Link>


                    <p className=' pl-3 font-medium text-[16px]'>Quay lại </p>
                </div>
                <div className='flex items-center'>
                    <LiaFacebookMessenger size={30} className='text-red-500' />
                </div>
            </div>
            <div className='m-2'>
                {listCategory.map((category, index) => (
                    <div key={index} className='my-4'>
                        <h2 className='text-[16px] font-bold my-2'>Danh sách sản phẩm: {category.name}</h2>

                        <div className='product-slider'>
                            {productsByCategory[category.name] && productsByCategory[category.name].length > 0 ? (
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={10}
                                    slidesPerView={2}
                                    navigation
                                    pagination={{ clickable: true }}
                                    style={{
                                        position: 'relative',
                                        padding: '0 0px' // Khoảng cách hai bên để chứa các nút điều hướng
                                    }}
                                >
                                    {productsByCategory[category.name].map((product, productIndex) => (
                                        <SwiperSlide key={productIndex}>
                                            <Items product={product} />
                                        </SwiperSlide>
                                    ))}

                                   
                                </Swiper>
                            ) : (
                                <p>Không có sản phẩm nào.</p>
                            )}
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default CategoryMobile