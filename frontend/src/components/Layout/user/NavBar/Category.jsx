import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from '../../../Helper/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { TbCategory } from 'react-icons/tb';
import { MdNavigateNext } from 'react-icons/md';

const Category = () => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getListCategory()
    }, [])

    // hiển thị danh mục
    const [category, setCategory] = useState(false)
    const handleCategory = () => {
        setCategory(!category)
    }
    // lấy ra list danh mục ( category)
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

    // lấy danh mục sản phẩm được click 
    const getItemCate = (name) => {
        try {
            setLoading(true)
            axios.get(`${api}/listProductCategory/${name}`)
                .then((res) => {
                    setTimeout(() => {
                        setCategory(!category);
                        setLoading(false)
                        navigate('/user/category', { state: { listProduct: res.data, name } });
                    }, 2000)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg-red-500 hover:bg-red-400 rounded-md hidden lg:block lg:basis-1/12 cursor-pointer relative'>
            {loading && <Loader loading={loading} />}

            <div className='h-full flex-col justify-center items-center flex ' onClick={handleCategory}>
                <h6 className='xl:text-[20px] text-[15px]'><TbCategory /></h6>
                <h6 className='text-[10px] '>Danh mục</h6>
            </div>
            {
                category &&
                <div>
                    {/* Danh mục xuất hiện */}
                    <div className='absolute z-30 top-[40px] right-[0px] bg-gray-200 w-[250px] text-black p-2 rounded-md'>
                        {
                            listCategory.map((data, index) => (
                                <div key={index} onClick={() => { getItemCate(data.name) }} className='flex justify-between items-center bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 m-1 rounded-md'>
                                    <h1 className='font-semibold text-[14px]'>{data.name}</h1>
                                    <MdNavigateNext size={20} />
                                </div>
                            ))
                        }
                    </div>

                    {/* Nền mờ */}
                    <div onClick={handleCategory} className="w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0"></div>
                </div>
            }
        </div>
    )
}

export default Category