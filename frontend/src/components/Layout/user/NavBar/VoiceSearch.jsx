import React, { useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
const VoiceSearch = ({ onSearch }) => {
  const [listening, setListening] = useState(false);

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói!");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "vi-VN"; // Ngôn ngữ tiếng Việt
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Bạn đã nói:", transcript);
      onSearch(transcript); // Gửi kết quả tìm kiếm
    };

    recognition.onerror = (error) => {
      console.error("Lỗi nhận diện giọng nói:", error);
    };

    recognition.start();
  };

  return (
    <div>
      <div>
        <MdKeyboardVoice onClick={handleVoiceSearch} disabled={listening}  size={20}/>
      </div>

    </div>
  );
};

export default VoiceSearch;
