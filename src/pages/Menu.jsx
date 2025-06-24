// src/pages/Menu.jsx
import { useState, useMemo } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/UI/Card';
import { 
  HiOutlineFilter, 
  HiOutlineSortAscending, 
  HiOutlineSortDescending,
  HiOutlineCurrencyDollar,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineChevronDown,
  HiOutlineChevronUp
} from 'react-icons/hi';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesPrice && matchesSearch;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [selectedCategory, priceRange, sortBy, sortOrder, searchQuery]);

  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.price));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <HiOutlineViewGrid className="text-blue-600" />
            قائمة المنتجات
          </h1>
          <p className="text-gray-600">اكتشف تشكيلة واسعة من المنتجات المميزة</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="البحث في المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all bg-white shadow-sm"
            />
            <HiOutlineFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>

        {/* Filters Toggle Button */}
        <div className="mb-4 flex justify-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-gray-700 hover:text-blue-600"
          >
            <HiOutlineFilter className="text-lg" />
            <span className="font-medium">
              {showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
            </span>
            {showFilters ? (
              <HiOutlineChevronUp className="text-lg" />
            ) : (
              <HiOutlineChevronDown className="text-lg" />
            )}
          </button>
        </div>

        {/* Filters and Controls */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fade-in">
            {/* Category Filters */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <HiOutlineFilter className="text-blue-600" />
                الفئات
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                      selectedCategory === cat 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <HiOutlineCurrencyDollar className="text-blue-600" />
                نطاق السعر
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                  {priceRange[0]} - {priceRange[1]} DH
                </span>
              </div>
            </div>

            {/* Sort and View Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">ترتيب حسب:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="name">الاسم</option>
                    <option value="price">السعر</option>
                    <option value="category">الفئة</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    {sortOrder === 'asc' ? (
                      <HiOutlineSortAscending className="text-gray-600" />
                    ) : (
                      <HiOutlineSortDescending className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">عرض:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <HiOutlineViewGrid className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <HiOutlineViewList className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            تم العثور على <span className="font-semibold text-blue-600">{filteredAndSortedProducts.length}</span> منتج
          </p>
        </div>

        {/* Products Grid - Always 2 columns on mobile, more on larger screens */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
            : 'grid-cols-1'
        }`}>
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500">جرب تغيير الفلاتر أو البحث عن شيء آخر</p>
          </div>
        )}
      </div>
    </div>
  );
}
