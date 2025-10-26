import React, { useEffect, useRef, useState } from 'react'
import Items from '../Items/Items'
import SlideProduct from '../Slide/SlideProduct';
import axios from 'axios';
import api from '../../../Helper/api'
import BeatLoader from "react-spinners/BeatLoader";
import './Home.css';
import scrollToTop from '../../../Helper/scroll';
import Loader from '../../Loader/Loader';
const Home = () => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([]);
    useEffect(() => {
        getProduct();
        getListCategory();
        scrollToTop()
    }, []);


    // lssay ra danh sách sản phẩm 
    const getProduct = () => {
        setLoading(true)
        const selec = {
            category: selectedCategories,
            price: selectedPrice
        }
        axios.post(`${api}`, selec)
            .then((res) => {
                setTimeout(() => {
                    setProduct(res.data)
                    if (res.data) {
                        setLoading(false)
                    }
                }, 1000)

            })
            .catch((error) => {
                console.log('lỗiii', error)
            })

    }
    // lấy ra danh sách category 
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

    const [selectedCategories, setSelectedCategories] = useState([]);
    const handleCheckboxCategory = (data) => {
        setSelectedCategories((prev) => {
            if (prev.includes(data.name)) {
                return prev.filter((item) => item !== data.name);
            } else {
                return [...prev, data.name];
            }
        });

    };
    // mức giá lựa chọn sản phẩm
    const Price = [
        { id: 1, price: 'Dưới 1 triệu VND ', },
        { id: 2, price: 'Từ 1 triệu VND - 2 triệu VND ' },
        { id: 3, price: 'Từ 2 triệu VND - 3 triệu VND ' },
        { id: 4, price: 'Từ 3 triệu VND - 4 triệu VND  ' },
        { id: 5, price: 'Trên 4 triệu VND' },
    ]
    const [selectedPrice, setSelectedPrice] = useState([]);
    const handleCheckboxPrice = (data) => {
        setSelectedPrice((prev) => {
            if (prev.includes(data.id)) {
                return prev.filter((item) => item !== data.id);
            } else {
                return [...prev, data.id];
            }
        });

    };
    // thực hiện lọc sản phẩmphẩm
    useEffect(() => {
        getProduct();
    }, [selectedCategories, selectedPrice]);

    const [hidden, setHidden] = useState(false)
    return (
        <div className='m-2  flex justify-center  '>

            {
                loading && <Loader />
            }
            <div className='container'>
                <SlideProduct />
                <hr />

                <div className='flex flex-col '>
                    {/* lựa chọn của khách hàng  */}
                    {
                        hidden ?
                            <div className="">
                                <h6 className='text-[16px] font-bold'>Lựa chọn của bạn </h6>
                                <div className='my-2 '>
                                    <h6 className='text-[13px] font-medium'>Danh mục sản phẩm </h6>
                                    <div className='flex gap-3 ' >
                                        {
                                            listCategory.map((data, index) => {
                                                return (
                                                    <div key={index} className='flex text-[12px] gap-1 '>
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleCheckboxCategory(data)}
                                                            checked={selectedCategories.includes(data.name)} />
                                                        <h6 className='font-semibold '>{data.name}</h6>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='my-2 '>
                                    <h6 className='text-[13px] font-medium'>Mức giá </h6>
                                    <div className='flex gap-2 '>
                                        {
                                            Price.map((data, index) => {
                                                return (
                                                    <div key={index} className='flex text-[12px] gap-1 '>
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleCheckboxPrice(data)}
                                                            checked={selectedPrice.includes(data.id)} />
                                                        <h6 className='font-semibold'>{data.price}</h6>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='my-2 '>
                                    <div className='flex gap-1 text-13'>
                                        <button className='boder p-1 bg-gray-200 hover:bg-gray-300  font-medium '
                                            onClick={() => {
                                                setHidden(false)
                                            }}>
                                            Rút gọn
                                        </button>
                                        <button className='boder p-1 bg-red-500 hover:bg-red-200  font-medium '
                                            onClick={() => {
                                                setSelectedCategories([])
                                                setSelectedPrice([])
                                            }}>
                                            Làm mới
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='flex justify-center'>
                                <button className=' font-medium m-1 p-1 bg-red-500 text-white' onClick={() => setHidden(true)}>
                                    Lọc sản phẩm
                                </button>
                            </div>
                    }

                    {/* list sản phẩm  */}
                    <div className=''>
                        <h3 className='text-[16px] font-bold'>Danh sách sản phẩm </h3>
                        {/* {product.length === 0
                            && <div className='w-full'>Xin lỗi, sản phẩm lọc theo yêu cầu của bạn không tồn tại !!! </div>
                        } */}
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 bg-gray-50 p-2 rounded-md'>

                            {product.length !== 0
                                ? product.map((product) => (
                                    <Items key={product._id} product={product} />
                                ))
                                :
                                <div className='w-full'>Xin lỗi, sản phẩm lọc theo yêu cầu của bạn không tồn tại !!! </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Home