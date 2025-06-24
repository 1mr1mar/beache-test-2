import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <CartProvider>
      <App />
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </CartProvider>
  </StrictMode>,
)
