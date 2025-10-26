import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiBoxList } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDownloadDone } from "react-icons/md";
import api from '../../../Helper/api';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const Create = () => {
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setproductPrice] = useState(1);
    const [discount, setDiscount] = useState(0);
    const [warehouse, setWarehouse] = useState(100);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');

    //selected category
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        // console.log(e.target.value)
    };


    //chọn hình ảnh
    const uploadImg = (selectedImage) => {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', 'nxl7uozr');
        axios.post("https://api.cloudinary.com/v1_1/dfv0n3vas/image/upload", formData)
            .then((res) => {
                const uploadedImageUrl = res.data.secure_url;
                setImageUrl(uploadedImageUrl);
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });
    };
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            uploadImg(selectedImage);
        }
    };
    //Lấy ra danh mục sản phẩm từ api
    const [listCategory, setListCategory] = useState([])
    useEffect(() => {
        getCategory()
    }, [])
    const getCategory = () => {
        axios.get(`${api}/category`)
            .then((res) => {
                setListCategory(res.data)
                // console.log(res.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    // lấy thông tin từ form
    const handleSubmit = (event) => {
        event.preventDefault();
        if(discount > 99){
            alert('không thể giảm hơn 99% được');
            return;
        }
        const realPrice = productPrice * (1 - (discount / 100)); // Giá sau giảm
        const roundedPrice = Math.round(realPrice); // Làm tròn giá trị
        const productData = {
            name: productName,
            price: productPrice,
            discount: discount,
            warehouse: warehouse,
            realPrice: roundedPrice,
            category: selectedCategory,
            description: productDescription,
            image: imageUrl ? imageUrl : 'https://res.cloudinary.com/dfv0n3vas/image/upload/v1728919650/samples/logo.png'
        };
        axios.post(`${api}/createProduct`, productData)
            .then((res) => {
                alert('Thêm sản phẩm thành công')
                navigate('/admin/products')
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    const goBack = () => {
        navigate(-1);  // Điều hướng trở lại trang trước đó
    };
    return (
        <div className='p-1 m-1 '>
            <div className='flex justify-end  text-[13px] text-green-400'>
                <div onClick={goBack} className='border border-green-400 p-2 flex items-center gap-2 font-semibold rounded-md hover:bg-gray-100 cursor-pointer'>
                    <p>Danh sách sản phẩm</p><CiBoxList size={16} />
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <h1 className='font-semibold text-[16px] '>Thêm sản phẩm</h1>
                <hr className='border border-black w-[80%]' />
            </div>
            <div className='p-3 text-[15px] font-medium'>
                <form onSubmit={handleSubmit}>
                    <div className='gap-5 flex '>
                        <div className='w-[70%]'>
                            {/* Tên sản phẩm  */}
                            <div className='m-2 gap-2 '>
                                <h6 className=''>Tên sản phẩm :</h6>
                                <input
                                    type="text"
                                    placeholder='Nhập tên sản phẩm...'
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className='border-2 w-full rounded-md p-1'
                                    required
                                />
                            </div>
                            {/* Giá sản phẩm  */}
                            <div className='m-2 gap-2 '>
                                <h6 className=''>Giá sản phẩm :</h6>
                                <input
                                    type="number"
                                    placeholder='Nhập giá sản phẩm...'
                                    value={productPrice}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10); // Chuyển đổi thành số nguyên
                                        if (value >= 0 || e.target.value === '') {
                                            setproductPrice(e.target.value); // Chỉ cập nhật nếu giá trị >= 0
                                        }
                                    }}
                                    className='border-2 w-full rounded-md p-1'
                                    required
                                />
                            </div>
                            {/* Danh mục sản phẩm  */}
                            <div className='m-2 gap-2 '>
                                <h6 className=''>Danh mục sản phẩm</h6>
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className='border-2 w-full rounded-md p-1 cursor-pointer'
                                    required
                                >
                                    <option value=''>Chọn danh mục</option>
                                    {listCategory.map((category, index) => (
                                        <option key={index} value={category.name} >{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Mô tả Sản phẩm  */}
                            <div className='m-2 gap-2 font-normal '>
                                <h6 className=''>Mô tả sản phẩm:</h6>

                                <CKEditor
                                    editor={ClassicEditor}

                                    data={productDescription}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setProductDescription(data);
                                    }}
                                />
                                {/* <div dangerouslySetInnerHTML={{ __html: productDescription }} /> */}
                            </div>
                        </div>
                        <div className='w-[30%]'>
                            {/* Giảm giá  */}
                            <div className='m-2 gap-2 '>
                                <h6 className=''>Giảm giá %:</h6>
                                <input
                                    type="number"
                                    placeholder='Bạn muốn giảm giá mấy % ? '
                                    value={discount}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10); // Chuyển đổi thành số nguyên
                                        if (value >= 0 || e.target.value === '') {
                                            setDiscount(e.target.value); // Chỉ cập nhật nếu giá trị >= 0
                                        }
                                    }}
                                    className='border-2 w-full rounded-md p-1'
                                    required
                                />
                            </div>
                            {/* Kho hàng  */}
                            <div className='m-2 gap-2 '>
                                <h6 className=''>Lưu kho:</h6>
                                <input
                                    type="number"
                                    placeholder='Sản phẩm có sẵn'
                                    value={warehouse}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10); // Chuyển đổi thành số nguyên
                                        if (value >= 0 || e.target.value === '') {
                                            setWarehouse(e.target.value); // Chỉ cập nhật nếu giá trị >= 0
                                        }
                                    }}
                                    className='border-2 w-full rounded-md p-1'
                                    required
                                />
                            </div>
                            {/* hình ảnh  */}
                            <div className='m-2 gap-2'>
                                <h6 className=''>Hình ảnh sản phẩm:</h6>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className='cursor-pointer my-2'
                                    required
                                />
                                <div className='w-[40%]'>
                                    {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />}
                                </div>
                            </div>
                            {/* submit  */}
                            <div className='m-2 gap-2 '>

                                <button
                                    type='submit'
                                    className='border-2 text-[13px] border-green-400 text-green-400 p-2 rounded-md hover:bg-gray-200 flex items-center'>
                                    Thêm sản phẩm <MdOutlineDownloadDone size={16} />
                                </button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create