import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import VoiceSearch from './VoiceSearch';
import TextLimited from '../../../Helper/sliceText';
import { MdCancel } from 'react-icons/md';
import axios from 'axios';
import api from '../../../Helper/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const items = item.length;

// lấy đc giá trị từ input 
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    useEffect(() => {
        getItemSearch()
    }, [inputValue])

    // lấy ra sản phẩm timf kiếm bằng keyword
    const getItemSearch = () => {
        axios.post(`${api}/search`, { text: inputValue })
            .then((response) => {
                setItem(response.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }

    // chọn sản phẩm khi sản phẩm đã hiện ra
    const handleSearch = (id) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setInputValue('')
            navigate(`/user/detail?id=${id}`)
        }, 3000)
    }

    // xử lý tìm kiếm bằng giọng nói 
    const handleVoiceSearch = (query) => {
        console.log("Tìm kiếm:", query);
        setInputValue(query)
        // Gửi query lên server hoặc tìm kiếm trong dữ liệu local
    };
    return (
        <div className='flex justify-center items-center basis-7/12 md:basis-6/12 lg:basis-5/12  relative text-black'>
            {loading && <Loader loading={loading} />}
            <FaSearch className='absolute  left-1 text-gray-400' size={20} />
            <input value={inputValue} onChange={handleInputChange} style={{ outline: 'none' }} className='h-4/5 w-full rounded-md pl-7' type="text" placeholder='Bạn cần tìm gì ?' />

            <div className='absolute right-1 text-gray-400 cursor-pointer'>
                {inputValue.length > 0
                    ? <MdCancel  size={20} onClick={() => { setInputValue(''); }} />
                    : <VoiceSearch onSearch={handleVoiceSearch} />}
            </div>

            {
                items < 1 ? '' :
                    (<div className=' p-1 absolute bg-red-400 top-11 left-0 z-10 cursor-pointer w-[300px] sm:w-[350px] rounded-xl'>
                        {
                            item.slice(0, 5).map((data, index) => {
                                return (
                                    <div
                                        key={index}
                                        className='flex gap-2 m-1 bg-gray-200  hover:bg-gray-300 text-[12px]'
                                        onClick={() => { handleSearch(data._id) }}>
                                        <div className='w-[100px] flex justify-center items-center'>
                                            <img src={data.image} alt="" className='w-[50px] h-[50px]' />
                                        </div>
                                        <TextLimited text={data.name} max={60} />
                                    </div>
                                )
                            })
                        }
                    </div>)
            }

        </div>
    )
}

export default Search