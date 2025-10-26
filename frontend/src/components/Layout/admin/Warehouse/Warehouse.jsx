import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../../../Helper/api'
import { useNavigate } from 'react-router-dom'
import { FaAnglesRight } from "react-icons/fa6";
const Warehouse = () => {
    //Lấy ra danh mục sản phẩm từ api
    const [listCategory, setListCategory] = useState([])
    useEffect(() => {
        getCategory()
    }, [])
    const getCategory = () => {
        axios.get(`${api}/category`)
            .then((res) => {
                setListCategory(res.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    //chi tiết sản phẩm trong kho hàng
    const navigate = useNavigate();
    const listProductCategory = (name) => {
        axios.get(`${api}/listProductCategory/${name}`)
            .then((res) => {
                navigate('/admin/detailwarehouse',
                    { state: res.data }
                )
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    // Hàm tính tổng số lượng sản phẩm trong kho theo danh mục

    return (

        <div className='border m-1 p-1'>
            <div>
                <h6 className='p-1 m-1 font-medium text-17'>
                    Tổng kho của các danh mục:
                </h6>
            </div>
            <div className='flex gap-2 grid '>
                {
                    listCategory.map((data, index) => {

                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    listProductCategory(data.name);
                                }}
                                className="flex items-center gap-2 border rounded-md border-black p-2 hover:bg-gray-200 cursor-pointer"
                            >
                                <h6 className="font-bold">{data.name}</h6>
                                <FaAnglesRight className="animate-move" />
                                <h6 className="text-green-400 ml-[10px]">xem chi tiết</h6>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Warehouse