import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import OrderTracking from "./pages/OrderTracking";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="pb-16"> {/* padding bottom for navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
        </Routes>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}
