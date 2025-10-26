import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteUser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  // Kiểm tra nếu không có thông tin người dùng hoặc người dùng không phải user
  if (!user || user.role !== 'user') {
    // Nếu không phải user, chuyển hướng về trang login
    return <Navigate to="/account/login" />;
  }

  return children;
};

export default ProtectedRouteUser;
