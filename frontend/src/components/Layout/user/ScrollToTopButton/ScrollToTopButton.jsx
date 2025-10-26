import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import scrollToTop from '../../../Helper/scroll';

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    // Xử lý sự kiện cuộn trang
    const handleScroll = () => {
        if (window.scrollY > 100) { // Hiển thị nút khi cuộn quá 300px
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    // Gắn sự kiện cuộn trang khi component mount
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Xử lý click để cuộn lên đầu trang

    return (
        <>
            {showButton && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "90px",
                        right: "25px",
                    }}
                    className="bg-red-500 z-50 h-[50px] w-[50px] text-[10px] text-white font-bold rounded-md"
                >
                    <div className="flex flex-col items-center ">
                        <FaChevronUp className="text-center text-[16px]" />
                        Lên đầu

                    </div>
                </button>
            )}
        </>
    );
};

export default ScrollToTopButton;
