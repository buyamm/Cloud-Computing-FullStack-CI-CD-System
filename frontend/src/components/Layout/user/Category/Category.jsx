import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../../../Helper/api';
import Items from '../Items/Items';
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaFacebookMessenger } from "react-icons/lia";
const Category = () => {

    const location = useLocation();
    const { listProduct, name } = location.state || {};

    return (
        <div className=' flex flex-col items-center'>
            <div className='container'>
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
                    <h2 className='text-[16px] font-bold my-2'>Danh sách sản phẩm: {name}</h2>
                    {
                        listProduct.length !== 0 ?
                            (<div className='grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                                {
                                    listProduct.map((product, index) => {
                                        return (
                                            <Items key={index} product={product} />
                                        )
                                    })
                                }
                            </div>) :
                            (<div>
                                không có sản phẩm nào
                            </div>)
                    }
                </div>
            </div>

        </div>
    )
}

export default Category