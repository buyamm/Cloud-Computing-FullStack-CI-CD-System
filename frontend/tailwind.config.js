/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        13: "13px",
        15: "15px",
        17: "17px",
        19: "19px",
        21: "21px",
        23: "23px",
        25: "25px",
        27: "27px",
      },
      keyframes: {
        move: {
          '0%, 100%': { transform: 'translateX(0)' }, // Vị trí ban đầu và cuối
          '50%': { transform: 'translateX(10px)' },  // Di chuyển sang phải
        },
      },
      animation: {
        move: 'move 1s infinite', // Thời lượng 1 giây, lặp vô hạn
      },
    },
  },
  plugins: [],
}
