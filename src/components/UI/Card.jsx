// src/components/ProductCard.jsx
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useLanguage } from '../../Context/LanguageContext';
import { HiOutlineShoppingCart, HiOutlineStar, HiOutlineHeart } from 'react-icons/hi';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { t } = useLanguage();

  return (
    <div className="group rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border bg-[rgb(var(--color-background-secondary))] border-[rgb(var(--color-border))]">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300" 
          loading="lazy" 
        />
        
        {/* Price Badge */}
        <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
          {product.price} {t('currency')}
        </div>
        
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-1.5 backdrop-blur-sm rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 bg-[rgb(var(--color-background-secondary))] text-[rgb(var(--color-text))] touch-manipulation">
          <HiOutlineHeart className="text-sm" />
        </button>
        
        {/* Category Badge */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-xs font-medium">
          {product.categories?.name || 'Unknown'}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Product Name */}
        <h3 className="text-sm font-bold mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors text-[rgb(var(--color-text))] leading-tight">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-xs mb-2 line-clamp-2 text-[rgb(var(--color-text-secondary))] leading-relaxed">
          {product.description}
        </p>
        
        {/* Rating (Mock) */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <HiOutlineStar key={i} className={`text-xs ${i < 4 ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="text-xs text-[rgb(var(--color-text-secondary))]">(4.2)</span>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg font-semibold text-xs shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-200 group-hover:shadow-xl touch-manipulation"
        >
          <HiOutlineShoppingCart className="text-sm" />
          {t('add_to_cart')}
        </button>
      </div>
    </div>
  );
}
