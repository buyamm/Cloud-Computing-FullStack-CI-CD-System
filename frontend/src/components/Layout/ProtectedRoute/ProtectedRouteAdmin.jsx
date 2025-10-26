import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  // Kiểm tra nếu không có thông tin người dùng hoặc người dùng không phải admin
  if (!admin || admin.role !== 'admin') {
    // Nếu không phải admin, chuyển hướng về trang login hoặc trang khác
    return <Navigate to="/account/login" />;
  }

  return children;
};

export default ProtectedRouteAdmin;
