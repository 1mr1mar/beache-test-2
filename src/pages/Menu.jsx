// src/pages/Menu.jsx
import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/UI/Card';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">قائمة المنتجات 🧃</h1>

      {/* الفلاتر */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 pb-1 px-1">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm font-semibold transition min-w-fit ${
              selectedCategory === cat ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* المنتجات */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
