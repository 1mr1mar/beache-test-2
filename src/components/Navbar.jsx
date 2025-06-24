import { NavLink } from 'react-router-dom';
import { HiOutlineHome, HiOutlineShoppingCart, HiOutlineClipboardList, HiOutlineViewGrid } from 'react-icons/hi';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-lg flex justify-around items-center h-16 px-2 md:hidden bg-[rgb(var(--color-background-secondary))] border-[rgb(var(--color-border))]">
      <NavLink 
        to="/" 
        className={({ isActive }) => `flex flex-col items-center text-xs transition-colors duration-200 ${
          isActive ? 'text-blue-600' : 'text-[rgb(var(--color-text-secondary))]'
        }`}
      >
        <HiOutlineHome className="text-2xl mb-1" />
        الرئيسية
      </NavLink>
      <NavLink 
        to="/menu" 
        className={({ isActive }) => `flex flex-col items-center text-xs transition-colors duration-200 ${
          isActive ? 'text-blue-600' : 'text-[rgb(var(--color-text-secondary))]'
        }`}
      >
        <HiOutlineViewGrid className="text-2xl mb-1" />
        القائمة
      </NavLink>
      <NavLink 
        to="/cart" 
        className={({ isActive }) => `flex flex-col items-center text-xs relative transition-colors duration-200 ${
          isActive ? 'text-blue-600' : 'text-[rgb(var(--color-text-secondary))]'
        }`}
      >
        <HiOutlineShoppingCart className="text-2xl mb-1" />
        {cartCount > 0 && (
          <span className="absolute -top-1 left-4 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold shadow">
            {cartCount}
          </span>
        )}
        السلة
      </NavLink>
      <NavLink 
        to="/order-tracking" 
        className={({ isActive }) => `flex flex-col items-center text-xs transition-colors duration-200 ${
          isActive ? 'text-blue-600' : 'text-[rgb(var(--color-text-secondary))]'
        }`}
      >
        <HiOutlineClipboardList className="text-2xl mb-1" />
        تتبع الطلب
      </NavLink>
    </nav>
  );
}
