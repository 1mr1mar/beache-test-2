import React, { useState, useEffect } from 'react';
import { 
  HiOutlinePlus, 
  HiOutlineSearch, 
  HiOutlineFilter,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineUpload
} from 'react-icons/hi';
import { useLanguage } from '../Context/LanguageContext';
import { products as importedProducts } from '../data/products';

export default function AdminProducts() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
    featured: false
  });

  const categories = [
    { value: 'all', label: t('category_all') },
    { value: 'Ice Cream', label: t('category_ice_cream') },
    { value: 'Drinks', label: t('category_drinks') },
    { value: 'Snacks', label: t('category_snacks') },
    { value: 'Fruits', label: t('category_fruits') },
    { value: 'Beach Accessories', label: 'Beach Accessories' },
    // Add individual products as well
    ...importedProducts.map(product => ({
      value: product.id,
      label: product.name
    }))
  ];

  // Load products from products.js
  useEffect(() => {
    const timer = setTimeout(() => {
      // Transform imported products to match our format
      const transformedProducts = importedProducts.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        stock: Math.floor(Math.random() * 50) + 10, // Random stock for demo
        featured: Math.random() > 0.7, // Random featured status
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Random date within last 30 days
      }));
      setProducts(transformedProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      // Check if selectedCategory is a product ID or a category name
      const isProductId = importedProducts.some(p => p.id === selectedCategory);
      if (isProductId) {
        matchesCategory = product.id === selectedCategory;
      } else {
        matchesCategory = product.category === selectedCategory;
      }
    }
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleAddProduct = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      stock: '',
      featured: false
    });
    setEditingProduct(null);
    setShowAddModal(true);
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      stock: product.stock.toString(),
      featured: product.featured
    });
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm(t('admin_confirm_delete_product'))) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
          : p
      ));
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProducts([newProduct, ...products]);
    }
    
    setShowAddModal(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--color-primary))]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--color-text))]">
            {t('admin_products')}
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))]">
            {t('admin_products_subtitle')}
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-[rgb(var(--color-primary))] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity"
        >
          <HiOutlinePlus className="w-5 h-5" />
          <span>{t('admin_add_product')}</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--color-text-secondary))] w-5 h-5" />
            <input
              type="text"
              placeholder={t('admin_search_products')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
          >
            <option value="all">{t('category_all')}</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <div className="text-sm text-[rgb(var(--color-text-secondary))] flex items-center">
            <HiOutlineFilter className="w-4 h-4 mr-2" />
            {t('admin_showing')} {filteredProducts.length} {t('admin_of')} {products.length} {t('admin_products')}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-[rgb(var(--color-background-secondary))] rounded-xl border border-[rgb(var(--color-border))] overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-[rgb(var(--color-text))]">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                    title={t('admin_edit')}
                  >
                    <HiOutlinePencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title={t('admin_delete')}
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_category')}</span>
                  <div className="text-sm font-medium text-[rgb(var(--color-text))]">
                    {product.category}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_price')}</span>
                  <div className="text-sm font-medium text-[rgb(var(--color-text))]">
                    ${product.price}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_stock')}</span>
                  <div className="text-sm font-medium text-[rgb(var(--color-text))]">
                    {product.stock}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_status')}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? t('admin_in_stock') : t('admin_out_of_stock')}
                  </span>
                </div>
              </div>

              {product.featured && (
                <div className="flex items-center space-x-2 text-yellow-600 text-sm">
                  <HiOutlineCheck className="w-4 h-4" />
                  <span>{t('admin_featured_product')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[rgb(var(--color-text-secondary))]">
              {t('admin_showing')} {indexOfFirstProduct + 1} {t('admin_to')} {Math.min(indexOfLastProduct, filteredProducts.length)} {t('admin_of')} {filteredProducts.length} {t('admin_results')}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-[rgb(var(--color-border))] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(var(--color-background))]"
              >
                {t('admin_previous')}
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-[rgb(var(--color-border))] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(var(--color-background))]"
              >
                {t('admin_next')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[rgb(var(--color-border))]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">
                  {editingProduct ? t('admin_edit_product') : t('admin_add_product')}
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))]"
                >
                  <HiOutlineX className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                  {t('admin_product_name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                  {t('admin_description')}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                    {t('admin_price')}
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                    {t('admin_stock')}
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                  {t('admin_category')}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                >
                  <option value="">{t('admin_select_category')}</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                  {t('admin_image_url')}
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-[rgb(var(--color-border))] rounded focus-ring"
                />
                <label className="ml-2 text-sm text-[rgb(var(--color-text))]">
                  {t('admin_featured_product')}
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[rgb(var(--color-primary))] text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                  <HiOutlineCheck className="w-4 h-4" />
                  <span>{editingProduct ? t('admin_update') : t('admin_create')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] py-2 px-4 rounded-lg hover:bg-[rgb(var(--color-background))] transition-colors"
                >
                  {t('admin_cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 