import { NavLink } from 'react-router-dom';
import { HiOutlineHome, HiOutlineShoppingCart, HiOutlineClipboardList } from 'react-icons/hi';

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg flex justify-around items-center h-16 px-2 md:hidden">
      <NavLink to="/menu" className={({ isActive }) => `flex flex-col items-center text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}` }>
        <HiOutlineHome className="text-2xl mb-1" />
        القائمة
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => `flex flex-col items-center text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}` }>
        <HiOutlineShoppingCart className="text-2xl mb-1" />
        السلة
      </NavLink>
      <NavLink to="/order-tracking" className={({ isActive }) => `flex flex-col items-center text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}` }>
        <HiOutlineClipboardList className="text-2xl mb-1" />
        تتبع الطلب
      </NavLink>
    </nav>
  );
}
