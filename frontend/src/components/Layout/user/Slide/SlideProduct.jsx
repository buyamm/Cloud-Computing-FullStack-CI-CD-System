import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { MdNavigateNext } from "react-icons/md";
import axios from 'axios';
import api from '../../../Helper/api';
import { Link, useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import { Navigation, Pagination } from 'swiper/modules';
import Items from '../Items/Items';
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from '../../../../images/slide1.webp';
import slide2 from '../../../../images/slide2.webp';
import slide3 from '../../../../images/slide3.webp';
import slide4 from '../../../../images/slide4.webp';
import slide5 from '../../../../images/slide5.webp';
const SlideProduct = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000
    };
    useEffect(() => {
        getApi()
        
    }, []);

    //Lấy ra sản phẩm mới nhất
    const [product, setProduct] = useState([]);
    const getApi = () => {
        const selec = {
            category: [],
            price: []
        }
        axios.post(`${api}`, selec)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    const [loading, setLoading] = useState(false)

    return (
        <div className=' flex flex-col items-center bg-gray-100 p-1'>
            <div className='flex md:gap-6 pb-2  container justify-center items-center'>
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
                <div className='md:w-[100%] lg:w-[60%] w-full '>
                    <Slider {...settings} className=''>
                        <div className='bg-slate-100 '>
                            <img className='w-full rounded-md  border border-gray-500 ' src={slide1} alt="" />
                        </div>
                        <div className='bg-slate-100'>
                            <img className='w-full rounded-md  border border-gray-500 ' src={slide2} alt="" />
                        </div>
                        <div className='bg-slate-100'>
                            <img className='w-full rounded-md  border border-gray-500 ' src={slide3} alt="" />
                        </div>
                        <div className='bg-slate-100'>
                            <img className='w-full rounded-md  border border-gray-500 ' src={slide4} alt="" />
                        </div>
                        <div className='bg-slate-100'>
                            <img className='w-full rounded-md  border border-gray-500 ' src={slide5} alt="" />
                        </div>
                    </Slider>
                </div>
                <div className=' lg:w-[35%] hidden lg:block gap-2 border border-gray-400 rounded-md p-3'>
                    <h6 className='font-bold text-center'>Sản phẩm mới nhất </h6>
                    <div className=''>
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
                                {product.slice(5,20).map((product, productIndex) => (
                                    <SwiperSlide key={productIndex}>
                                        <Items product={product} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideProduct;