// src/pages/Cart.jsx
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { HiOutlineTrash, HiOutlineCheckCircle, HiMinus, HiPlus } from 'react-icons/hi';

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-4 bg-[rgb(var(--color-background))]">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-[rgb(var(--color-text))]">
          سلة المشتريات 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="text-center p-8 rounded-2xl shadow-lg bg-[rgb(var(--color-background-secondary))]">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-[rgb(var(--color-text-secondary))]">سلتك فارغة حالياً.</p>
            <p className="text-sm mt-2 text-[rgb(var(--color-text-secondary))]">
              ابدأ التسوق لإضافة منتجات إلى سلتك
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl shadow flex items-center gap-3 bg-[rgb(var(--color-background-secondary))]"
              >
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-sm mb-1 truncate text-[rgb(var(--color-text))]">{item.name}</h2>
                  <p className="text-xs text-[rgb(var(--color-text-secondary))]">{item.price} DH</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow transition-all duration-200 bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))]"
                      disabled={item.quantity <= 1}
                      aria-label="نقص الكمية"
                    >
                      <HiMinus />
                    </button>
                    <span className="w-7 text-center font-bold text-base select-none text-[rgb(var(--color-text))]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full text-white shadow hover:bg-blue-600 active:scale-95 transition bg-blue-500"
                      aria-label="زيادة الكمية"
                    >
                      <HiPlus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center gap-1 text-red-500 hover:underline text-sm px-2 py-1 rounded transition-colors"
                  aria-label="حذف المنتج"
                >
                  <HiOutlineTrash className="text-lg" /> حذف
                </button>
              </div>
            ))}
            
            <div className="flex justify-between items-center mt-6 p-4 rounded-xl bg-[rgb(var(--color-background-secondary))]">
              <button
                onClick={clearCart}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold shadow transition-all duration-200 bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))]"
              >
                <HiOutlineTrash className="text-base" /> إفراغ السلة
              </button>
              <p className="font-bold text-lg text-[rgb(var(--color-success))]">
                المجموع: {total} DH
              </p>
            </div>
            
            <button
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow hover:bg-blue-700 active:scale-95 transition-all duration-200"
              onClick={() => window.alert('ميزة الدفع قادمة قريباً!')}
            >
              <HiOutlineCheckCircle className="text-xl" /> إتمام الطلب
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
