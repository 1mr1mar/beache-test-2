// src/pages/Cart.jsx
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { HiOutlineTrash, HiOutlineCheckCircle, HiMinus, HiPlus } from 'react-icons/hi';

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">سلة المشتريات 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">سلتك فارغة حالياً.</p>
      ) : (
        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3 rounded-xl shadow flex items-center gap-3"
            >
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border" loading="lazy" />
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-sm mb-1 truncate">{item.name}</h2>
                <p className="text-xs text-gray-500">{item.price} DH</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed shadow"
                    disabled={item.quantity <= 1}
                    aria-label="نقص الكمية"
                  >
                    <HiMinus />
                  </button>
                  <span className="w-7 text-center font-bold text-base select-none">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white shadow hover:bg-blue-600 active:scale-95 transition"
                    aria-label="زيادة الكمية"
                  >
                    <HiPlus />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="flex items-center gap-1 text-red-500 hover:underline text-sm px-2 py-1 rounded"
                aria-label="حذف المنتج"
              >
                <HiOutlineTrash className="text-lg" /> حذف
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={clearCart}
              className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold shadow hover:bg-gray-200"
            >
              <HiOutlineTrash className="text-base" /> إفراغ السلة
            </button>
            <p className="font-bold text-lg text-green-600">المجموع: {total} DH</p>
          </div>
          <button
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow hover:bg-blue-700 active:scale-95 transition"
            onClick={() => window.alert('ميزة الدفع قادمة قريباً!')}
          >
            <HiOutlineCheckCircle className="text-xl" /> إتمام الطلب
          </button>
        </div>
      )}
    </div>
  );
}
