import React from 'react'
import NavBar from './user/NavBar/NavBar';
import CategoryUser from './user/Category/Category';
import CategoryMobile from './user/Category/CategoryMobile';
import Home from './user/Home/Home';
import Notice from './user/Notice/Notice';
import Category from './admin/Category/Category';
import Detail from './user/Detail/Detail';
import Cart from './user/Cart/Cart';
import Checkout from './user/Checkout/Checkout';
import { Route, Routes, Navigate } from 'react-router-dom';
import Adminpage from './admin/AdminPage/Adminpage';
import Create from './admin/CRUDProducts/Create'
import Read from './admin/CRUDProducts/Read'
import Update from './admin/CRUDProducts/Update';
import Login from './user/Accounts/Login';
import Register from './user/Accounts/Register';
import Account from './user/Accounts/Account';
import Address from './user/Address/Address';
import Histories from "./user/Histories/Histories";
import Notification from './admin/Notification/Notification';
import PaymentResult from './user/Payment/PaymentResult';
import OrderDetailUser from './user/OrderDetailUser/OrderDetailUser';
import OrderDetail from './admin/OrderDetail/OrderDetail';
import InfoUser from './user/InfoUser/InfoUser';
import ManagerUser from './admin/ManagerUser/ManagerUser';
import Revenue from './admin/Revenue/Revenue';
import Warehouse from './admin/Warehouse/Warehouse';
import DetailW from './admin/Warehouse/Detail';
import NotFound from './NotFound/NotFound';
import ProtectedRouteUser from './ProtectedRoute/ProtectedRouteUser';
import ProtectedRouteAdmin from './ProtectedRoute/ProtectedRouteAdmin';

const Layout = () => {

  // const isAdmin = 0;
  return (

    <Routes>
      {/* Đặt trang login làm trang chính */}
      <Route path="/" element={<Navigate to="/account/login" />} />
      <Route path="/:id" element={<NotFound />} />

      {/* Account Routes */}
      <Route path="/account" element={<Account />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/account/:id" element={<NotFound />} />
      <Route path="/account/:id/:id" element={<NotFound />} />


      {/* Điều hướng theo role sau khi đăng nhập */}
      {/* <Route path="/redirect" element={isAdmin ? (<Navigate to="/admin" />) : (<Navigate to="/user" />)} /> */}

      <Route path="/admin" element={<ProtectedRouteAdmin><Adminpage /></ProtectedRouteAdmin>}>
        <Route index element={<Notification />} />
        <Route path="products" element={<ProtectedRouteAdmin><Read /></ProtectedRouteAdmin>} />
        <Route path="category" element={<ProtectedRouteAdmin><Category /></ProtectedRouteAdmin>} />
        <Route path="create" element={<ProtectedRouteAdmin><Create /></ProtectedRouteAdmin>} />
        <Route path="updateProduct" element={<ProtectedRouteAdmin><Update /></ProtectedRouteAdmin>} />
        <Route path="notification" element={<ProtectedRouteAdmin><Notification /></ProtectedRouteAdmin>} />
        <Route path="orderdetail" element={<ProtectedRouteAdmin><OrderDetail /></ProtectedRouteAdmin>} />
        <Route path="manageruser" element={<ProtectedRouteAdmin><ManagerUser /></ProtectedRouteAdmin>} />
        <Route path="revenue" element={<ProtectedRouteAdmin><Revenue /></ProtectedRouteAdmin>} />
        <Route path="warehouse" element={<ProtectedRouteAdmin><Warehouse /></ProtectedRouteAdmin>} />
        <Route path="detailwarehouse" element={<ProtectedRouteAdmin><DetailW /></ProtectedRouteAdmin>} />
      </Route>

      {/* User Routes - Bảo vệ user */}
      <Route path="/user" element={<ProtectedRouteUser><NavBar /></ProtectedRouteUser>}>
        <Route index element={<ProtectedRouteUser><Home /></ProtectedRouteUser>} />
        <Route path="home" element={<ProtectedRouteUser><Home /></ProtectedRouteUser>} />
        <Route path="info" element={<ProtectedRouteUser><InfoUser /></ProtectedRouteUser>} />
        <Route path="category" element={<ProtectedRouteUser><CategoryUser /></ProtectedRouteUser>} />
        <Route path="categorymobile" element={<ProtectedRouteUser><CategoryMobile /></ProtectedRouteUser>} />
        <Route path="notice" element={<ProtectedRouteUser><Notice /></ProtectedRouteUser>} />
        <Route path="detail" element={<ProtectedRouteUser><Detail /></ProtectedRouteUser>} />
        <Route path="checkout" element={<ProtectedRouteUser><Checkout /></ProtectedRouteUser>} />
        <Route path="cart" element={<ProtectedRouteUser><Cart /></ProtectedRouteUser>} />
        <Route path="histories" element={<ProtectedRouteUser><Histories /></ProtectedRouteUser>} />
        <Route path="orderdetailuser" element={<ProtectedRouteUser><OrderDetailUser /></ProtectedRouteUser>} />
        <Route path="payment" element={<ProtectedRouteUser><PaymentResult /></ProtectedRouteUser>} />
        <Route path="address" element={<ProtectedRouteUser><Address /></ProtectedRouteUser>} />
      </Route>

      {/* 404 Not Found */}
      <Route path="/:id" element={<NotFound />} />
      <Route path="/user/:id" element={<NotFound />} />
      <Route path="/user/:id/:id" element={<NotFound />} />
      <Route path="/admin/:id" element={<NotFound />} />
      <Route path="/admin/:id/:id" element={<NotFound />} />


    </Routes>

  )
}

export default Layout