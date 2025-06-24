// src/components/ProductCard.jsx
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { HiOutlineShoppingCart } from 'react-icons/hi';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col items-center relative min-w-0 max-w-xs mx-auto">
      <div className="w-full flex justify-center">
        <img src={product.image} alt={product.name} className="rounded-xl w-full h-36 object-cover shadow-sm" loading="lazy" />
      </div>
      <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">{product.price} DH</span>
      <div className="w-full flex flex-col items-center mt-2 px-1">
        <h2 className="text-base font-bold text-center mb-1 truncate w-full">{product.name}</h2>
        <p className="text-xs text-gray-500 text-center mb-2 line-clamp-2 w-full">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl font-semibold text-sm shadow hover:bg-blue-700 active:scale-95 transition"
        >
          <HiOutlineShoppingCart className="text-lg" />
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
}
