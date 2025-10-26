import React, { useState } from 'react'


const Footer = () => {
    

    return (
        <div className="bg-gray-100 py-10">
            

            <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Chăm sóc khách hàng */}
                <div>
                    <h6 className="font-bold mb-4">CHĂM SÓC KHÁCH HÀNG</h6>
                    <ul className="space-y-2 text-sm">
                        <li>Trung Tâm Trợ Giúp</li>
                        <li>LSHOP-TECH Blog</li>
                        <li>LSHOP-TECH Mall</li>
                        <li>Hướng Dẫn Mua Hàng</li>
                        <li>Hướng Dẫn Bán Hàng</li>
                        <li>Thanh Toán</li>
                        <li>LSHOP-TECH Xu</li>
                        <li>Vận Chuyển</li>
                        <li>Trả Hàng & Hoàn Tiền</li>
                        <li>Liên Hệ LSHOP-TECH</li>
                        <li>Chính Sách Bảo Hành</li>
                    </ul>
                </div>

                {/* Về Shopee */}
                <div>
                    <h6 className="font-bold mb-4">VỀ LSHOP-TECH</h6>
                    <ul className="space-y-2 text-sm">
                        <li>Giới Thiệu Về LSHOP-TECH Việt Nam</li>
                        <li>Tuyển Dụng</li>
                        <li>Điều Khoản LSHOP-TECH</li>
                        <li>Chính Sách Bảo Mật</li>
                        <li>Chính Hãng</li>
                        <li>Kênh Người Bán</li>
                        <li>Flash Sales</li>
                        <li>Chương Trình Tiếp Thị Liên Kết LSHOP-TECH</li>
                        <li>Liên Hệ Với Truyền Thông</li>
                    </ul>
                </div>

                {/* Thanh Toán & Vận Chuyển */}
                <div>
                    <h6 className="font-bold mb-4">THANH TOÁN</h6>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <img src="/visa.png" alt="Visa" />
                        <img src="/mastercard.png" alt="Mastercard" />
                        <img src="/jcb.png" alt="JCB" />
                        <img src="/cod.png" alt="COD" />
                        <img src="/installment.png" alt="Trả góp" />
                        <img src="/shopee-pay.png" alt="Shopee Pay" />
                    </div>

                    <h6 className="font-bold mb-4">ĐƠN VỊ VẬN CHUYỂN</h6>
                    <div className="grid grid-cols-3 gap-2">
                        <img src="/shopee-xpress.png" alt="Shopee Xpress" />
                        <img src="/viettel.png" alt="Viettel Post" />
                        <img src="/vnpost.png" alt="VN Post" />
                        <img src="/ghn.png" alt="GHN Express" />
                        <img src="/jnt.png" alt="J&T Express" />
                        <img src="/best.png" alt="Best Express" />
                        <img src="/ninja.png" alt="Ninja Van" />
                        <img src="/grab.png" alt="Grab Express" />
                        <img src="/be.png" alt="Be" />
                    </div>
                </div>

                {/* Theo dõi và tải ứng dụng */}
                <div>
                    <h6 className="font-bold mb-4">THEO DÕI CHÚNG TÔI TRÊN</h6>
                    <ul className="space-y-2 text-sm">
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>LinkedIn</li>
                    </ul>

                    <h6 className="font-bold mb-4 mt-6">TẢI ỨNG DỤNG LSHOP-TECH NGAY THÔI</h6>
                    <div className="flex space-x-2">
                        <img src="/qrcode.png" alt="QR Code" className="w-16 h-16" />
                        <div className="flex flex-col space-y-2">
                            <img src="/appstore.png" alt="App Store" />
                            <img src="/googleplay.png" alt="Google Play" />
                            <img src="/appgallery.png" alt="App Gallery" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-5 mt-10 text-center text-xs text-gray-500">
                <p>© 2024 LSHOP-TECH. Tất cả các quyền được bảo lưu.</p>
                <p>Quốc gia & Khu vực: Singapore | Indonesia | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil | México | Colombia | Chile | Đài Loan</p>
            </div>
        </div>
    )
}

export default Footer