// src/components/ProductCard.jsx
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { HiOutlineShoppingCart, HiOutlineStar, HiOutlineHeart } from 'react-icons/hi';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
          loading="lazy" 
        />
        
        {/* Price Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {product.price} DH
        </div>
        
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100">
          <HiOutlineHeart className="text-lg" />
        </button>
        
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Rating (Mock) */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <HiOutlineStar key={i} className={`text-sm ${i < 4 ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">(4.2)</span>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold text-sm shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-200 group-hover:shadow-xl"
        >
          <HiOutlineShoppingCart className="text-lg" />
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
}
