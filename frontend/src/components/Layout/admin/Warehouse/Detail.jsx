import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import formatPrice from '../../../Helper/formatPrice';

const Detail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    if (!data || data.length === 0) {
        console.log('Không có dữ liệu');
        return (
            <div className="border m-1 p-1">
                <h6>Không có dữ liệu</h6>
            </div>
        );
    }
    const wh = data.reduce((total, product) => total + product.warehouse, 0);

    return (
        <div className='border m-1 p-1'>
            <div className='text-15'>
                <h6 className='font-medium'>Sản phẩm: {data[0].category}</h6>
                <h6 className='font-medium'>Lưu kho: {wh} sản phẩm</h6>
            </div>
            <div className='my-2 text-13'>
                <table className='w-full border-collapse'>
                    <thead className='border'>
                        <tr>
                            <th className='border'>STT</th>
                            <th className='border'>Tên sp</th>
                            <th className='border'>Tồn kho</th>
                            <th className='border'>Giá bán</th>
                            <th className='border'>Hình ảnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((data, index) => {
                                return (
                                    <tr className='' key={index}>
                                        <th className='border text-center w-[5%] p-1'>{index + 1}</th>
                                        <td className='border w-[20%] p-1 text-[11px]'>{data.name}</td>
                                        <td className='border text-[11px] w-[10%] text-center p-1 font-medium'>
                                            <h6 className='text-red-500'>Tồn kho: {data.warehouse}</h6>
                                        </td>
                                        <td className='border text-[11px] w-[10%]  p-1 font-medium text-center'>
                                            <h6 className='text-red-500'> {formatPrice(data.realPrice)}đ</h6>
                                        </td>
                                        <td className='border p-1 w-[15%] '>
                                            <div className='flex justify-center items-center'>
                                                <img src={data.image} alt="" className='h-[100px] rounded-md ' />
                                            </div>
                                        </td>
                                       
                                        
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Detail