import React, { useState, useEffect } from 'react';
import { 
  HiOutlineSearch, 
  HiOutlineFilter,
  HiOutlineEye,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineShoppingBag,
  HiOutlineCalendar,
  HiOutlineStar,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown
} from 'react-icons/hi';
import { useLanguage } from '../Context/LanguageContext';

export default function AdminCustomers() {
  const { t } = useLanguage();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCustomers([
        {
          id: 1,
          name: 'Ahmed Hassan',
          email: 'ahmed.hassan@email.com',
          phone: '+212 6 12 34 56 78',
          address: '123 Beach Road, Agadir, Morocco',
          joinDate: '2023-06-15',
          totalOrders: 8,
          totalSpent: 234.50,
          lastOrder: '2024-01-15',
          status: 'active',
          rating: 4.8,
          orders: [
            { id: '#ORD-001', date: '2024-01-15', amount: 29.00, status: 'delivered' },
            { id: '#ORD-005', date: '2024-01-10', amount: 45.75, status: 'delivered' },
            { id: '#ORD-008', date: '2024-01-05', amount: 32.00, status: 'delivered' }
          ]
        },
        {
          id: 2,
          name: 'Fatima Ali',
          email: 'fatima.ali@email.com',
          phone: '+212 6 98 76 54 32',
          address: '456 Ocean View, Casablanca, Morocco',
          joinDate: '2023-08-22',
          totalOrders: 12,
          totalSpent: 456.25,
          lastOrder: '2024-01-14',
          status: 'active',
          rating: 4.9,
          orders: [
            { id: '#ORD-002', date: '2024-01-14', amount: 25.25, status: 'delivered' },
            { id: '#ORD-006', date: '2024-01-08', amount: 67.50, status: 'delivered' },
            { id: '#ORD-009', date: '2024-01-02', amount: 38.75, status: 'delivered' }
          ]
        },
        {
          id: 3,
          name: 'Mohammed Omar',
          email: 'mohammed.omar@email.com',
          phone: '+212 6 55 44 33 22',
          address: '789 Sunset Blvd, Marrakech, Morocco',
          joinDate: '2023-11-10',
          totalOrders: 5,
          totalSpent: 189.75,
          lastOrder: '2024-01-15',
          status: 'active',
          rating: 4.7,
          orders: [
            { id: '#ORD-003', date: '2024-01-15', amount: 67.25, status: 'processing' },
            { id: '#ORD-007', date: '2024-01-12', amount: 42.50, status: 'delivered' }
          ]
        },
        {
          id: 4,
          name: 'Aisha Khalil',
          email: 'aisha.khalil@email.com',
          phone: '+212 6 11 22 33 44',
          address: '321 Palm Street, Rabat, Morocco',
          joinDate: '2023-09-05',
          totalOrders: 3,
          totalSpent: 78.25,
          lastOrder: '2024-01-15',
          status: 'inactive',
          rating: 4.5,
          orders: [
            { id: '#ORD-004', date: '2024-01-15', amount: 22.75, status: 'cancelled' },
            { id: '#ORD-010', date: '2023-12-20', amount: 55.50, status: 'delivered' }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    return matchesSearch;
  });

  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  // Calculate statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0);

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
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
            {t('admin_customers')}
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))]">
            {t('admin_customers_subtitle')}
          </p>
        </div>
        <div className="text-sm text-[rgb(var(--color-text-secondary))]">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Customer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_total_customers')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                {totalCustomers}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <HiOutlineUser className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_active_customers')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                {activeCustomers}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <HiOutlineTrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_total_revenue')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <HiOutlineShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_avg_order_value')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                ${averageOrderValue.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <HiOutlineTrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--color-text-secondary))] w-5 h-5" />
          <input
            type="text"
            placeholder={t('admin_search_customers')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl border border-[rgb(var(--color-border))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[rgb(var(--color-background))]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_customer')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_contact')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_orders')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_total_spent')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_rating')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--color-border))]">
              {currentCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[rgb(var(--color-background))]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <HiOutlineUser className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[rgb(var(--color-text))]">
                          {customer.name}
                        </div>
                        <div className="text-sm text-[rgb(var(--color-text-secondary))]">
                          {t('admin_joined')} {new Date(customer.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[rgb(var(--color-text))]">
                      <div className="flex items-center">
                        <HiOutlineMail className="w-4 h-4 mr-2 text-[rgb(var(--color-text-secondary))]" />
                        {customer.email}
                      </div>
                      <div className="flex items-center mt-1">
                        <HiOutlinePhone className="w-4 h-4 mr-2 text-[rgb(var(--color-text-secondary))]" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--color-text))]">
                    <div className="flex items-center">
                      <HiOutlineShoppingBag className="w-4 h-4 mr-2 text-[rgb(var(--color-text-secondary))]" />
                      {customer.totalOrders} {t('admin_orders')}
                    </div>
                    <div className="text-xs text-[rgb(var(--color-text-secondary))] mt-1">
                      {t('admin_last_order')}: {new Date(customer.lastOrder).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(var(--color-text))]">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {t(`admin_status_${customer.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <HiOutlineStar className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-[rgb(var(--color-text))]">{customer.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewCustomer(customer)}
                      className="text-blue-600 hover:text-blue-900"
                      title={t('admin_view_details')}
                    >
                      <HiOutlineEye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-[rgb(var(--color-border))]">
            <div className="flex items-center justify-between">
              <div className="text-sm text-[rgb(var(--color-text-secondary))]">
                {t('admin_showing')} {indexOfFirstCustomer + 1} {t('admin_to')} {Math.min(indexOfLastCustomer, filteredCustomers.length)} {t('admin_of')} {filteredCustomers.length} {t('admin_results')}
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
      </div>

      {/* Customer Details Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[rgb(var(--color-border))]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">
                  {t('admin_customer_details')} - {selectedCustomer.name}
                </h2>
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))]"
                >
                  <HiOutlineX className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-md font-semibold text-[rgb(var(--color-text))] mb-3 flex items-center">
                  <HiOutlineUser className="w-4 h-4 mr-2" />
                  {t('admin_customer_information')}
                </h3>
                <div className="bg-[rgb(var(--color-background))] rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <HiOutlineMail className="w-4 h-4 mr-3 text-[rgb(var(--color-text-secondary))]" />
                    <span className="text-[rgb(var(--color-text))]">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <HiOutlinePhone className="w-4 h-4 mr-3 text-[rgb(var(--color-text-secondary))]" />
                    <span className="text-[rgb(var(--color-text))]">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <HiOutlineLocationMarker className="w-4 h-4 mr-3 mt-1 text-[rgb(var(--color-text-secondary))]" />
                    <span className="text-[rgb(var(--color-text))]">{selectedCustomer.address}</span>
                  </div>
                  <div className="flex items-center">
                    <HiOutlineCalendar className="w-4 h-4 mr-3 text-[rgb(var(--color-text-secondary))]" />
                    <span className="text-[rgb(var(--color-text))]">
                      {t('admin_joined')} {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Statistics */}
              <div>
                <h3 className="text-md font-semibold text-[rgb(var(--color-text))] mb-3 flex items-center">
                  <HiOutlineTrendingUp className="w-4 h-4 mr-2" />
                  {t('admin_customer_statistics')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[rgb(var(--color-background))] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[rgb(var(--color-text))]">{selectedCustomer.totalOrders}</div>
                    <div className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_total_orders')}</div>
                  </div>
                  <div className="bg-[rgb(var(--color-background))] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[rgb(var(--color-text))]">${selectedCustomer.totalSpent.toFixed(2)}</div>
                    <div className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_total_spent')}</div>
                  </div>
                  <div className="bg-[rgb(var(--color-background))] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[rgb(var(--color-text))]">{selectedCustomer.rating}</div>
                    <div className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_rating')}</div>
                  </div>
                  <div className="bg-[rgb(var(--color-background))] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[rgb(var(--color-text))]">
                      ${(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toFixed(2)}
                    </div>
                    <div className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_avg_order')}</div>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h3 className="text-md font-semibold text-[rgb(var(--color-text))] mb-3 flex items-center">
                  <HiOutlineShoppingBag className="w-4 h-4 mr-2" />
                  {t('admin_order_history')}
                </h3>
                <div className="bg-[rgb(var(--color-background))] rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[rgb(var(--color-background-secondary))]">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))]">
                          {t('admin_order_id')}
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))]">
                          {t('admin_date')}
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))]">
                          {t('admin_amount')}
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))]">
                          {t('admin_status')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--color-border))]">
                      {selectedCustomer.orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-2 text-sm text-[rgb(var(--color-text))]">{order.id}</td>
                          <td className="px-4 py-2 text-sm text-[rgb(var(--color-text))]">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-sm text-[rgb(var(--color-text))]">${order.amount}</td>
                          <td className="px-4 py-2 text-sm">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {t(`admin_status_${order.status}`)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 