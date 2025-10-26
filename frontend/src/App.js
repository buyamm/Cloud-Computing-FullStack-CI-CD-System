import { useState } from "react";

import Layout from "./components/Layout/Layout";
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = true; // Giả sử role = 1 là admin
  return (
    <div className="overflow-x-hidden relative " >
     
      <Layout />

    </div>
  )
}


export default App;
