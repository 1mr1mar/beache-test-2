import React, { useState, useEffect } from 'react';
import { 
  HiOutlinePlus, 
  HiOutlineSearch, 
  HiOutlineFilter,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineTag
} from 'react-icons/hi';
import { useLanguage } from '../Context/LanguageContext';
import { products as importedProducts } from '../data/products';

export default function AdminCategories() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(8);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    icon: 'HiOutlineTag'
  });

  // Calculate product counts for each category
  const getProductCount = (categoryName) => {
    return importedProducts.filter(product => product.category === categoryName).length;
  };

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories([
        {
          id: 1,
          name: 'Ice Cream',
          description: t('category_ice_cream_description') || 'Delicious frozen desserts and ice cream products',
          color: '#F59E0B',
          icon: 'HiOutlineTag',
          productCount: getProductCount('Ice Cream'),
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          name: 'Drinks',
          description: t('category_drinks_description') || 'Refreshing beverages and cold drinks',
          color: '#10B981',
          icon: 'HiOutlineTag',
          productCount: getProductCount('Drinks'),
          createdAt: '2024-01-14'
        },
        {
          id: 3,
          name: 'Snacks',
          description: t('category_snacks_description') || 'Quick bites and snack foods',
          color: '#EF4444',
          icon: 'HiOutlineTag',
          productCount: getProductCount('Snacks'),
          createdAt: '2024-01-13'
        },
        {
          id: 4,
          name: 'Fruits',
          description: t('category_fruits_description') || 'Fresh fruits and fruit products',
          color: '#8B5CF6',
          icon: 'HiOutlineTag',
          productCount: getProductCount('Fruits'),
          createdAt: '2024-01-12'
        },
        {
          id: 5,
          name: 'Beach Accessories',
          description: t('category_beach_accessories_description') || 'Essential beach and outdoor accessories',
          color: '#06B6D4',
          icon: 'HiOutlineTag',
          productCount: getProductCount('Beach Accessories'),
          createdAt: '2024-01-11'
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [t]);

  // Filter categories
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handleAddCategory = () => {
    setFormData({
      name: '',
      description: '',
      color: '#3B82F6',
      icon: 'HiOutlineTag'
    });
    setEditingCategory(null);
    setShowAddModal(true);
  };

  const handleEditCategory = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon
    });
    setEditingCategory(category);
    setShowAddModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm(t('admin_confirm_delete_category') || 'Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== categoryId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(c => 
        c.id === editingCategory.id 
          ? { ...c, ...formData, productCount: getProductCount(formData.name) }
          : c
      ));
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        ...formData,
        productCount: getProductCount(formData.name),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategories([newCategory, ...categories]);
    }
    
    setShowAddModal(false);
    setEditingCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
            {t('admin_categories') || 'Categories'}
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))]">
            {t('admin_categories_subtitle') || 'Manage your product categories'}
          </p>
        </div>
        <button
          onClick={handleAddCategory}
          className="bg-[rgb(var(--color-primary))] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity"
        >
          <HiOutlinePlus className="w-5 h-5" />
          <span>{t('admin_add_category') || 'Add Category'}</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--color-text-secondary))] w-5 h-5" />
          <input
            type="text"
            placeholder={t('admin_search_categories') || 'Search categories...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCategories.map((category) => (
          <div key={category.id} className="bg-[rgb(var(--color-background-secondary))] rounded-xl border border-[rgb(var(--color-border))] overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    <HiOutlineTag 
                      className="w-6 h-6" 
                      style={{ color: category.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[rgb(var(--color-text))]">
                      {t(`category_${category.name.toLowerCase().replace(' ', '_')}`) || category.name}
                    </h3>
                    <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                    title={t('admin_edit') || 'Edit'}
                  >
                    <HiOutlinePencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title={t('admin_delete') || 'Delete'}
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_products') || 'Products'}</span>
                  <div className="text-lg font-semibold text-[rgb(var(--color-text))]">
                    {category.productCount}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_created') || 'Created'}</span>
                  <div className="text-sm font-medium text-[rgb(var(--color-text))]">
                    {category.createdAt}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-[rgb(var(--color-text-secondary))]">
                  {category.color}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[rgb(var(--color-text-secondary))]">
              {t('admin_showing') || 'Showing'} {indexOfFirstCategory + 1} {t('admin_to') || 'to'} {Math.min(indexOfLastCategory, filteredCategories.length)} {t('admin_of') || 'of'} {filteredCategories.length} {t('admin_results') || 'results'}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-[rgb(var(--color-border))] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(var(--color-background))]"
              >
                {t('admin_previous') || 'Previous'}
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-[rgb(var(--color-border))] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(var(--color-background))]"
              >
                {t('admin_next') || 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[rgb(var(--color-border))]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">
                  {editingCategory ? (t('admin_edit_category') || 'Edit Category') : (t('admin_add_category') || 'Add Category')}
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
                  {t('admin_category_name') || 'Category Name'}
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
                  {t('admin_description') || 'Description'}
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

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                  {t('admin_color') || 'Color'}
                </label>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] cursor-pointer"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[rgb(var(--color-primary))] text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                  <HiOutlineCheck className="w-4 h-4" />
                  <span>{editingCategory ? (t('admin_update') || 'Update') : (t('admin_create') || 'Create')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] py-2 px-4 rounded-lg hover:bg-[rgb(var(--color-background))] transition-colors"
                >
                  {t('admin_cancel') || 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 