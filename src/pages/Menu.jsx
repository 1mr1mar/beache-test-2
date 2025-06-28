import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/UI/Card';
import { useLanguage } from '../Context/LanguageContext';
import { supabase } from '../supabaseClient';
import { 
  HiOutlineFilter, 
  HiOutlineSortAscending, 
  HiOutlineSortDescending,
  HiOutlineCurrencyDollar,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from 'react-icons/hi';

export default function Menu() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 6;

  // Fetch products and categories from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Starting to fetch data from Supabase...');
        setLoading(true);
        
        // Fetch products with category information
        console.log('📦 Fetching products...');
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select(`
            id,
            name,
            description,
            price,
            image_url,
            category_id,
            available,
            categories (
              id,
              name
            )
          `)
          .eq('available', true); // Only fetch available products
        
        console.log('📦 Products query result:', { productsData, productsError });
        
        if (productsError) {
          console.error('❌ Error fetching products:', productsError);
        } else {
          console.log('✅ Products fetched successfully:', productsData);
          console.log('📊 Number of products:', productsData?.length || 0);
          setProducts(productsData || []);
        }

        // Fetch categories separately
        console.log('🏷️ Fetching categories...');
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('id, name');
        
        console.log('🏷️ Categories query result:', { categoriesData, categoriesError });
        
        if (categoriesError) {
          console.error('❌ Error fetching categories:', categoriesError);
          // Fallback: extract unique categories from products
          const uniqueCategories = [...new Set(productsData?.map(p => p.categories?.name).filter(Boolean) || [])];
          console.log('🔄 Using fallback categories from products:', uniqueCategories);
          setCategories(['All', ...uniqueCategories]);
        } else {
          const categoryNames = categoriesData?.map(cat => cat.name) || [];
          console.log('✅ Categories fetched successfully:', categoryNames);
          setCategories(['All', ...categoryNames]);
        }
        
        console.log('🎯 Final state - Products:', productsData?.length || 0, 'Categories:', categoriesData?.length || 0);
      } catch (error) {
        console.error('💥 Unexpected error in fetchData:', error);
      } finally {
        setLoading(false);
        console.log('🏁 Data fetching completed');
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    console.log('🔍 Starting filtering process...');
    console.log('📦 Raw products:', products);
    console.log('🎯 Selected category:', selectedCategory);
    console.log('💰 Price range:', priceRange);
    console.log('🔍 Search query:', searchQuery);
    
    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.categories?.name === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      console.log(`📋 Product "${product.name}":`, {
        matchesCategory,
        matchesPrice,
        matchesSearch,
        category: product.categories?.name,
        price: product.price,
        searchMatch: product.name.toLowerCase().includes(searchQuery.toLowerCase())
      });
      
      return matchesCategory && matchesPrice && matchesSearch;
    });

    console.log('✅ Filtered products:', filtered);

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
          aValue = a.categories?.name?.toLowerCase() || '';
          bValue = b.categories?.name?.toLowerCase() || '';
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

    console.log('🎯 Final filtered and sorted products:', filtered);
    return filtered;
  }, [products, selectedCategory, priceRange, sortBy, sortOrder, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  console.log('📄 Pagination info:', {
    totalProducts: filteredAndSortedProducts.length,
    productsPerPage,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    currentProductsCount: currentProducts.length,
    currentProducts: currentProducts
  });

  // Reset to first page when filters change
  const resetPagination = () => {
    setCurrentPage(1);
  };

  // Update pagination when filters change
  useMemo(() => {
    resetPagination();
  }, [selectedCategory, priceRange, sortBy, sortOrder, searchQuery]);

  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.price));

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Category mapping for translations
  const getCategoryTranslation = (category) => {
    const categoryMap = {
      'All': t('category_all'),
      'Drinks': t('category_drinks'),
      'Fruits': t('category_fruits'),
      'Ice Cream': t('category_ice_cream'),
      'Snacks': t('category_snacks')
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] pb-20">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2 text-[rgb(var(--color-text))]">
            <HiOutlineViewGrid className="text-blue-600 text-xl" />
            {t('menu_title')}
          </h1>
          <p className="text-sm text-[rgb(var(--color-text-secondary))]">{t('menu_subtitle')}</p>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('menu_search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border-2 focus-ring transition-all shadow-sm bg-[rgb(var(--color-background-secondary))] text-[rgb(var(--color-text))] border-[rgb(var(--color-border))] text-base"
            />
            <HiOutlineFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          </div>
        </div>

        {/* Filters Toggle Button */}
        <div className="mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 bg-[rgb(var(--color-background-secondary))] text-[rgb(var(--color-text))] border-[rgb(var(--color-border))] touch-manipulation"
          >
            <HiOutlineFilter className="text-lg" />
            <span className="font-medium text-base">
              {showFilters ? t('menu_hide_filters') : t('menu_show_filters')}
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
          <div className="rounded-xl shadow-lg p-4 mb-4 animate-fade-in bg-[rgb(var(--color-background-secondary))]">
            {/* Category Filters */}
            <div className="mb-4">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-[rgb(var(--color-text))]">
                <HiOutlineFilter className="text-blue-600" />
                {t('menu_categories')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 touch-manipulation text-sm ${
                      selectedCategory === cat 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'hover:bg-gray-200 bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))]'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {getCategoryTranslation(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-[rgb(var(--color-text))]">
                <HiOutlineCurrencyDollar className="text-blue-600" />
                {t('menu_price_range')}
              </h3>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium min-w-[70px] text-[rgb(var(--color-text-secondary))]">
                  {priceRange[0]} - {priceRange[1]} {t('currency')}
                </span>
              </div>
            </div>

            {/* Sort and View Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[rgb(var(--color-text))]">{t('menu_sort_by')}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus-ring bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] border-[rgb(var(--color-border))] text-sm"
                >
                  <option value="name">{t('menu_sort_name')}</option>
                  <option value="price">{t('menu_sort_price')}</option>
                  <option value="category">{t('menu_sort_category')}</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[rgb(var(--color-text))]">{t('menu_view')}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors touch-manipulation ${
                      viewMode === 'grid' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))]'
                    }`}
                  >
                    <HiOutlineViewGrid className="text-lg" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors touch-manipulation ${
                      viewMode === 'list' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))]'
                    }`}
                  >
                    <HiOutlineViewList className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count and Pagination Info */}
        <div className="mb-4 text-center">
          <p className="text-sm text-[rgb(var(--color-text-secondary))]">
            {t('menu_results_found')} <span className="font-semibold text-blue-600">{filteredAndSortedProducts.length}</span> {t('menu_products')}
            {totalPages > 1 && (
              <span className="text-[rgb(var(--color-text-secondary))]">
                {' '}({t('menu_page')} {currentPage} {t('menu_of')} {totalPages})
              </span>
            )}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">{t('menu_loading') || 'Loading products...'}</p>
          </div>
        )}

        {/* Products Grid - 2 columns for mobile */}
        {!loading && (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-2' 
              : 'grid-cols-1'
          }`}>
            {console.log('🎨 Rendering products:', currentProducts)}
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2 text-[rgb(var(--color-text))]">{t('menu_no_results')}</h3>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">{t('menu_no_results_desc')}</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-1 rounded-xl shadow-lg p-2 bg-[rgb(var(--color-background-secondary))]">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all duration-200 flex items-center gap-1 touch-manipulation ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:text-blue-600 hover:bg-blue-50 text-[rgb(var(--color-text))]'
                }`}
              >
                <HiOutlineChevronLeft className="text-lg" />
                <span className="text-sm">{t('menu_previous')}</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                    disabled={page === '...'}
                    className={`px-2 py-1 rounded-lg transition-all duration-200 text-sm touch-manipulation ${
                      page === currentPage
                        ? 'bg-blue-600 text-white shadow-lg'
                        : page === '...'
                        ? 'cursor-default text-gray-400'
                        : 'hover:text-blue-600 hover:bg-blue-50 text-[rgb(var(--color-text))]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all duration-200 flex items-center gap-1 touch-manipulation ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:text-blue-600 hover:bg-blue-50 text-[rgb(var(--color-text))]'
                }`}
              >
                <span className="text-sm">{t('menu_next')}</span>
                <HiOutlineChevronRight className="text-lg" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
