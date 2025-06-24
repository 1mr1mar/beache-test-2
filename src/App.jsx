import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "./Context/ThemeContext";
import { LanguageProvider } from "./Context/LanguageContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import OrderTracking from "./pages/OrderTracking";
import AdminRoutes from "./admin/AdminRoutes";

export default function AppRouter() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
            
            {/* Customer Routes */}
            <Route path="/" element={
              <div className="pb-16"> {/* padding bottom for navbar */}
                <Home />
                <Navbar />
              </div>
            } />
            <Route path="/menu" element={
              <div className="pb-16">
                <Menu />
                <Navbar />
              </div>
            } />
            <Route path="/cart" element={
              <div className="pb-16">
                <Cart />
                <Navbar />
              </div>
            } />
            <Route path="/order-tracking" element={
              <div className="pb-16">
                <OrderTracking />
                <Navbar />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
