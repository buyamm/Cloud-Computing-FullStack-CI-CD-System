import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TextLimited from '../../../Helper/sliceText'
import formatNumberWithCommas from '../../../Helper/formatPrice'
import './items.css';
const Items = (props) => {
  const { product } = props;
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  return (
    <Link to={`/user/detail?id=${product._id}`}>
      <div className='transition border border-gray-200 p-1 hover:p-0 h-auto rounded bg-slate-100 relative cursor-pointer hover:bg-slate-200 hover:border-red-400'>
        {
          product.discount === 0
            ? ""
            :
            <div className='absolute top-1 bg-red-500 left-0 p-1 rounded-r-lg'>
              <p className='font-bold text-[11px]'>Giảm {product.discount}%</p>
            </div>

        }
        <div className='flex justify-center items-center'>
          <img src={product.image} alt="" className='  h-[100px] m-2' />
        </div>
        <div className='font-medium text-[12px] h-[45px]'>
          <TextLimited text={product.name.length > 40 ? product.name : product.name + ' - Sản phẩm đang được bày bán với giá tốt'} max={45} />
        </div>
        <div className=''>
          <del><p className='text-[10px] pt-2 '> {formatNumberWithCommas(product.price)} đ</p></del>
        </div>
        <div className='mb-2'>
          <p className='text-red-400 text-[12px]'>Giá: {formatNumberWithCommas(product.realPrice)} đ</p>
        </div>
        <div className='bg-gray-200 rouneded  p-1 text-[11px] '>
          {/* <TextLimited text={product.description.length > 45 ? product.description : product.description + ' - Sản phẩm đang được bày bán với giá tốt..................'} max={45} /> */}
          <p className='font-semibold'>Xem chi tiết sản phẩm khi click vào sản phẩm ....</p>
        </div>

      </div>
    </Link>
  )
}

export default Items;
//rafce