import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import api from '../../../Helper/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Đăng ký các thành phần cần thiết
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Revenue = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get(`${api}/revenue`)
            .then((response) => {
                setChartData(response.data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
            });
    }, []);

    if (!chartData) {
        return <p>Đang tải dữ liệu...</p>;
    }

    return (
        <div className='m-2'>
            <h2 className='font-semibold'>Biểu đồ doanh thu</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Doanh thu theo tháng ( Năm 2024 )' },
                    },
                    scales: {
                        x: { type: 'category' },
                        y: { type: 'linear' },
                    },
                }}
            />
        </div>
    );
}

export default Revenue