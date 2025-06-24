// src/pages/Cart.jsx
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useLanguage } from '../Context/LanguageContext';
import { HiOutlineTrash, HiOutlineCheckCircle, HiMinus, HiPlus } from 'react-icons/hi';

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const { t } = useLanguage();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-4 bg-[rgb(var(--color-background))] pb-20">
      <div className="max-w-sm mx-auto">
        <h1 className="text-xl font-bold mb-6 text-center text-[rgb(var(--color-text))]">
          {t('cart_title')} 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="text-center p-6 rounded-xl shadow-lg bg-[rgb(var(--color-background-secondary))]">
            <div className="text-4xl mb-4">🛒</div>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">{t('cart_empty')}</p>
            <p className="text-xs mt-2 text-[rgb(var(--color-text-secondary))]">
              {t('cart_empty_desc')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl shadow flex items-center gap-3 bg-[rgb(var(--color-background-secondary))]"
              >
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-sm mb-1 truncate text-[rgb(var(--color-text))]">{item.name}</h2>
                  <p className="text-xs text-[rgb(var(--color-text-secondary))]">{item.price} {t('currency')}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow transition-all duration-200 bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] touch-manipulation"
                      disabled={item.quantity <= 1}
                      aria-label={t('cart_decrease')}
                    >
                      <HiMinus className="text-sm" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm select-none text-[rgb(var(--color-text))]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full text-white shadow hover:bg-blue-600 active:scale-95 transition bg-blue-500 touch-manipulation"
                      aria-label={t('cart_increase')}
                    >
                      <HiPlus className="text-sm" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center gap-1 text-red-500 hover:underline text-xs px-2 py-1 rounded transition-colors touch-manipulation"
                  aria-label={t('cart_remove')}
                >
                  <HiOutlineTrash className="text-sm" /> {t('cart_remove')}
                </button>
              </div>
            ))}
            
            <div className="flex justify-between items-center mt-4 p-3 rounded-xl bg-[rgb(var(--color-background-secondary))]">
              <button
                onClick={clearCart}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold shadow transition-all duration-200 bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] touch-manipulation"
              >
                <HiOutlineTrash className="text-sm" /> {t('cart_clear_cart')}
              </button>
              <p className="font-bold text-base text-[rgb(var(--color-success))]">
                {t('cart_total')} {total} {t('currency')}
              </p>
            </div>
            
            <button
              className="w-full mt-4 bg-blue-600 text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow hover:bg-blue-700 active:scale-95 transition-all duration-200 touch-manipulation"
              onClick={() => window.alert('ميزة الدفع قادمة قريباً!')}
            >
              <HiOutlineCheckCircle className="text-lg" /> {t('cart_checkout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
