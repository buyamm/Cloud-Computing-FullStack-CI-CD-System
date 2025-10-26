import React from 'react'
import { BsNewspaper } from "react-icons/bs";
import TextLimited from '../../../Helper/sliceText'
import { MdNavigateNext } from "react-icons/md";
const Notice = () => {
  const data = [
    { id: 1, title: 'Tin mới', text: 'bài báo nóng hổi sản phẩm mới chuẩn bị ra mắt Người tiêu dùng ra mắt' },
    { id: 2, title: 'Giỏ hàng', text: 'Mua sản phẩm chính hãng với ưu đãi hấp dẫn, freeship và đảm bảo tại Shopee. - .' },
    { id: 3, title: 'Túi xách', text: 'Chúng tôi cảm kết tất cả sản phẩm của shop đều là hàng chính hãng 100% từ Nhà ..' },
    { id: 4, title: 'Clgt', text: 'Chúng tôi cảm kết tất cả sản phẩm của shop đều là hàng chính hãng 100% từ Nhà ..' },
  ]
  return (
    <div className='p-1'>
      <div>
        {data.map((data) => {
          return <div key={data.id} className='flex items-center justify-between bg-red-50 hover:bg-red-100 p-1 mb-1 cursor-pointer' onClick={()=>alert(`Tính năng hiện đăng nâng cấp ${data.id}`)}>
            <div className='flex items-center  gap-4'>
              <BsNewspaper size={50} className='border border-red-500 p-2 rounded-full' />
              <div>
                <h3 className='font-semibold text-17'>{data.title}</h3>
                <TextLimited text={data.text} max={35} />
              </div>
            </div>
            <div>
              <MdNavigateNext size={25}/>
            </div>
          </div>
        })}
      </div>
      <div className='p-1 '>
        <h6 className='my-2 font-semibold'>Cập nhật đơn hàng</h6>
        {
          data.map((data)=>{
            return <div className=' bg-yellow-50 hover:bg-yellow-100 p-2 rounded-xl my-1'>
            <h6 className='flex gap-1 items-center'><h6 className='font-bold text-17'>Trạng thái: </h6> Đã được giao hàng</h6>
            <h6 className='flex gap-1 items-center'><h6 className='font-bold text-17'>Ngày Đặt hàng: </h6> 08/10/2024</h6>
            <h6>Đơn hàng <a className='text-blue-500'>abuyfvaber</a> {data.text}</h6>
          </div>
          })
        }
      </div>
      <div className='pb-[75px]'></div>

    </div>
  )
}

export default Notice