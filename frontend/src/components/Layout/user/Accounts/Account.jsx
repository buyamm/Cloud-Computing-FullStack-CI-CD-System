import React from 'react'
import { Outlet } from 'react-router-dom'

const Accounts = () => {
  return (
    <div style={{
      backgroundImage: `url('https://img.pikbest.com/ai/illus_our/20230418/64e0e89c52dec903ce07bb1821b4bcc8.jpg!w700wp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh', // Chiều cao toàn màn hình
      width: '100vw', // Chiều rộng toàn màn hình
    }}
      className='flex justify-center items-center'>
      <Outlet />

    </div>
  )
}

export default Accounts