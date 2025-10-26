import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../Helper/api';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [forgetPassword, setForgetPassword] = useState(false);
    // Lưu thông tin người dùng vào context để dùng trong ứng dụng
    const navigate = useNavigate();
    const handleForget = () => {
        setForgetPassword(!forgetPassword);
    };
    //handle đăng nhập
    const [acc, setAcc] = useState(null)
    // waiting login
    const [loading, setLoading] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault();
        // Thực hiện yêu cầu đăng nhập
        try {
            setLoading(true)
            axios.post(`${api}/login`, { username, password })
                .then((res) => {
                    // Lưu thông tin vào localStorage
                    if (res.data) {
                        setTimeout(() => {
                            setLoading(false)
                            const userData = { id: res.data._id, name: res.data.name, role: res.data.role };
                            // lưu thông tin vào localstorage 
                            if (res.data.role === 'admin') {
                                localStorage.setItem('admin', JSON.stringify(userData));
                            } else {
                                localStorage.setItem('user', JSON.stringify(userData));
                            }
                            // lấy thông tin luwu vafo useContext
                            // setUser(userData);

                            if (res.data.role === 'admin') {
                                navigate('/admin');
                            } else {
                                navigate('/user');
                            }
                        }, 3000)
                    } else {
                        setTimeout(() => {
                            setLoading(false)
                            setAcc("Tài khoản hoặc mật khẩu không chính xác");
                        }, 3000)
                    }
                })
        } catch (error) {
            console.log('lỗi: ' + error)
        }
    };




    return (
        <div className="border p-3 bg-[rgba(255,255,255,0.8)] w-[250px] flex flex-col items-center rounded-md">
            {
                loading &&
                <div className="flex justify-center items-center w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0">
                    <BeatLoader
                        color={'#DB142C'}
                        loading={loading}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }
            <h6 className="font-bold text-[22px]">Đăng nhập</h6>
            {acc && (
                <h6 className=" text-[11px] text-red-500">{acc}</h6>
            )}
            <form onSubmit={handleLogin} className="w-full">
                <div className="my-3 text-[12px] w-full">
                    <h6 className="font-bold">Tài khoản email:</h6>
                    <input
                        required
                        type="text"
                        placeholder="Nhập tài khoản email của bạn"
                        className="outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)] w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="my-3 text-[12px] w-full">
                    <h6 className="font-bold">Mật khẩu:</h6>
                    <input
                        required
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
                        className="outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)] w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p onClick={handleForget} className="p-1 text-end text-[10px] text-blue-600 hover:text-blue-700 cursor-pointer">
                        Quên mật khẩu !!!
                    </p>
                </div>

                <div className="my-3 flex justify-end text-[12px] gap-2">
                    <Link to="/account/register">
                        <button type="button" className="font-semibold p-2 bg-yellow-300 hover:bg-yellow-400 rounded-md">
                            Đăng ký
                        </button>
                    </Link>
                    <button type="submit" className="font-semibold p-2 bg-green-400 hover:bg-green-500 rounded-md">
                        Đăng nhập
                    </button>
                </div>
            </form>

            {forgetPassword && (
                <div onClick={handleForget} className="flex justify-center w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0">
                    <div className="flex flex-col items-center mt-[50px]">
                        <h6 className="text-[22px] font-bold">Thông báo</h6>
                        <p>VUI LÒNG LIÊN HỆ VỚI NGƯỜI QUẢN TRỊ ĐỂ CUNG CẤP LẠI TÀI KHOẢN</p>
                        <p>
                            FACEBOOK: <a href="https://www.facebook.com/datZeroNicekine" className="text-blue-600">Click here</a>
                        </p>
                        <p>ZALO: 0356.031.160</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login