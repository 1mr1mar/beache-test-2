import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './Context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <App />
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
