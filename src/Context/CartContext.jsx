// src/context/CartContext.jsx
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const local = localStorage.getItem('cart');
    return local ? JSON.parse(local) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        toast.success('تمت زيادة الكمية في السلة');
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success('تمت إضافة المنتج إلى السلة');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) {
        toast('تم حذف المنتج من السلة', { icon: '🗑️' });
        return prev.filter((item) => item.id !== id);
      }
      toast.success('تم تحديث الكمية');
      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast('تم حذف المنتج من السلة', { icon: '🗑️' });
  };

  const clearCart = () => {
    setCart([]);
    toast('تم إفراغ السلة', { icon: '🧹' });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
