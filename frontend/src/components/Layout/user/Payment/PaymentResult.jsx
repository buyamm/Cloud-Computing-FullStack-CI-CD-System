import React, { useEffect } from 'react';
import axios from 'axios';

const PaymentResult = () => {
    // Hàm xử lý callback
    const handlePaymentCallback = async () => {
        try {
            const response = await axios.post('/api/callback');
            const { status } = response.data;

            // Điều hướng dựa trên trạng thái thanh toán
            if (status === "success") {
                window.location.href = 'http://localhost:3000/user/cart';
            } else {
                alert('thanh toán thất bại');
                window.location.href = 'http://localhost:3000/user/cart';
            }
        } catch (error) {
            console.error("Error during payment callback:", error);
            alert('thanh toán thất bại');
            window.location.href = 'http://localhost:3000/user/cart';
        }
    };

    // Gọi hàm callback khi component này được render
    useEffect(() => {
        handlePaymentCallback();
    }, []);

    return (
        <div>Đang kiểm tra kết quả thanh toán...</div>
    );
};

export default PaymentResult;