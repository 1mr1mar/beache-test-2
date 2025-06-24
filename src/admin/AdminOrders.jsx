import React, { useState, useEffect } from 'react';
import { 
  HiOutlineSearch, 
  HiOutlineFilter,
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineTruck,
  HiOutlineXCircle,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineShoppingBag
} from 'react-icons/hi';
import { useLanguage } from '../Context/LanguageContext';

export default function AdminOrders() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const statusOptions = [
    { value: 'all', label: t('admin_all_orders') },
    { value: 'pending', label: t('admin_status_pending') },
    { value: 'processing', label: t('admin_status_processing') },
    { value: 'shipped', label: t('admin_status_shipped') },
    { value: 'delivered', label: t('admin_status_delivered') },
    { value: 'cancelled', label: t('admin_status_cancelled') }
  ];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders([
        {
          id: '#ORD-001',
          customer: {
            name: 'Ahmed Hassan',
            phone: '+212 6 12 34 56 78',
            email: 'ahmed.hassan@email.com',
            address: '123 Beach Road, Agadir, Morocco'
          },
          items: [
            { id: 1, name: 'Fresh Orange Juice', quantity: 2, price: 8.50 },
            { id: 2, name: 'Vanilla Ice Cream', quantity: 1, price: 12.00 }
          ],
          total: 29.00,
          status: 'pending',
          orderDate: '2024-01-15 14:30',
          estimatedDelivery: '2024-01-16 16:00',
          paymentMethod: 'Cash on Delivery',
          notes: 'Please deliver to the beach area'
        },
        {
          id: '#ORD-002',
          customer: {
            name: 'Fatima Ali',
            phone: '+212 6 98 76 54 32',
            email: 'fatima.ali@email.com',
            address: '456 Ocean View, Casablanca, Morocco'
          },
          items: [
            { id: 3, name: 'Fresh Strawberries', quantity: 1, price: 6.75 },
            { id: 4, name: 'Mixed Nuts', quantity: 2, price: 9.25 }
          ],
          total: 25.25,
          status: 'delivered',
          orderDate: '2024-01-14 13:45',
          deliveredDate: '2024-01-15 10:30',
          paymentMethod: 'Credit Card',
          notes: ''
        },
        {
          id: '#ORD-003',
          customer: {
            name: 'Mohammed Omar',
            phone: '+212 6 55 44 33 22',
            email: 'mohammed.omar@email.com',
            address: '789 Sunset Blvd, Marrakech, Morocco'
          },
          items: [
            { id: 1, name: 'Fresh Orange Juice', quantity: 3, price: 8.50 },
            { id: 2, name: 'Vanilla Ice Cream', quantity: 2, price: 12.00 },
            { id: 3, name: 'Fresh Strawberries', quantity: 1, price: 6.75 }
          ],
          total: 67.25,
          status: 'processing',
          orderDate: '2024-01-15 12:20',
          estimatedDelivery: '2024-01-16 14:00',
          paymentMethod: 'Mobile Payment',
          notes: 'Extra ice cream please'
        },
        {
          id: '#ORD-004',
          customer: {
            name: 'Aisha Khalil',
            phone: '+212 6 11 22 33 44',
            email: 'aisha.khalil@email.com',
            address: '321 Palm Street, Rabat, Morocco'
          },
          items: [
            { id: 4, name: 'Mixed Nuts', quantity: 1, price: 9.25 },
            { id: 3, name: 'Fresh Strawberries', quantity: 2, price: 6.75 }
          ],
          total: 22.75,
          status: 'cancelled',
          orderDate: '2024-01-15 11:15',
          cancelledDate: '2024-01-15 12:00',
          paymentMethod: 'Cash on Delivery',
          notes: 'Customer requested cancellation'
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <HiOutlineCheckCircle className="w-4 h-4" />;
      case 'pending':
        return <HiOutlineClock className="w-4 h-4" />;
      case 'processing':
        return <HiOutlineShoppingBag className="w-4 h-4" />;
      case 'shipped':
        return <HiOutlineTruck className="w-4 h-4" />;
      case 'cancelled':
        return <HiOutlineXCircle className="w-4 h-4" />;
      default:
        return <HiOutlineClock className="w-4 h-4" />;
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
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
            {t('admin_orders')}
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))]">
            {t('admin_orders_subtitle')}
          </p>
        </div>
        <div className="text-sm text-[rgb(var(--color-text-secondary))]">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--color-text-secondary))] w-5 h-5" />
            <input
              type="text"
              placeholder={t('admin_search_orders')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <div className="text-sm text-[rgb(var(--color-text-secondary))] flex items-center">
            <HiOutlineFilter className="w-4 h-4 mr-2" />
            {t('admin_showing')} {filteredOrders.length} {t('admin_of')} {orders.length} {t('admin_orders')}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl border border-[rgb(var(--color-border))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[rgb(var(--color-background))]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_order_id')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_customer')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_items')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_total')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_date')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--color-border))]">
              {currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[rgb(var(--color-background))]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(var(--color-text))]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-[rgb(var(--color-text))]">
                        {order.customer.name}
                      </div>
                      <div className="text-sm text-[rgb(var(--color-text-secondary))]">
                        {order.customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--color-text))]">
                    {order.items.length} {t('admin_items')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(var(--color-text))]">
                    ${order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)} border-0 bg-transparent`}
                    >
                      <option value="pending">{t('admin_status_pending')}</option>
                      <option value="processing">{t('admin_status_processing')}</option>
                      <option value="shipped">{t('admin_status_shipped')}</option>
                      <option value="delivered">{t('admin_status_delivered')}</option>
                      <option value="cancelled">{t('admin_status_cancelled')}</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--color-text-secondary))]">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewOrder(order)}
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
                {t('admin_showing')} {indexOfFirstOrder + 1} {t('admin_to')} {Math.min(indexOfLastOrder, filteredOrders.length)} {t('admin_of')} {filteredOrders.length} {t('admin_results')}
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

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[rgb(var(--color-border))]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">
                  {t('admin_order_details')} - {selectedOrder.id}
                </h2>
                <button
                  onClick={() => setShowOrderModal(false)}
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
                <div className="bg-[rgb(var(--color-background))] rounded-lg p-4 space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium text-[rgb(var(--color-text))]">{t('admin_name')}:</span>
                    <span className="ml-2 text-[rgb(var(--color-text))]">{selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex items-center">
                    <HiOutlinePhone className="w-4 h-4 mr-2 text-[rgb(var(--color-text-secondary))]" />
                    <span className="text-[rgb(var(--color-text))]">{selectedOrder.customer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-[rgb(var(--color-text))]">{t('admin_email')}:</span>
                    <span className="ml-2 text-[rgb(var(--color-text))]">{selectedOrder.customer.email}</span>
                  </div>
                  <div className="flex items-start">
                    <HiOutlineLocationMarker className="w-4 h-4 mr-2 mt-1 text-[rgb(var(--color-text-secondary))]" />
                    <span className="text-[rgb(var(--color-text))]">{selectedOrder.customer.address}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-md font-semibold text-[rgb(var(--color-text))] mb-3 flex items-center">
                  <HiOutlineShoppingBag className="w-4 h-4 mr-2" />
                  {t('admin_order_items')}
                </h3>
                <div className="bg-[rgb(var(--color-background))] rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[rgb(var(--color-background-secondary))]">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))]">
                          {t('admin_item')}
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))]">
                          {t('admin_quantity')}
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))]">
                          {t('admin_price')}
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))]">
                          {t('admin_subtotal')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--color-border))]">
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 text-sm text-[rgb(var(--color-text))]">
                            {item.name}
                          </td>
                          <td className="px-4 py-2 text-sm text-[rgb(var(--color-text))]">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-2 text-sm text-[rgb(var(--color-text))]">
                            ${item.price}
                          </td>
                          <td className="px-4 py-2 text-sm font-medium text-[rgb(var(--color-text))]">
                            ${(item.quantity * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-md font-semibold text-[rgb(var(--color-text))] mb-3 flex items-center">
                  <HiOutlineCalendar className="w-4 h-4 mr-2" />
                  {t('admin_order_summary')}
                </h3>
                <div className="bg-[rgb(var(--color-background))] rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--color-text))]">{t('admin_order_date')}:</span>
                    <span className="text-[rgb(var(--color-text))]">{selectedOrder.orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--color-text))]">{t('admin_payment_method')}:</span>
                    <span className="text-[rgb(var(--color-text))]">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--color-text))]">{t('admin_status')}:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-1">{t(`admin_status_${selectedOrder.status}`)}</span>
                    </span>
                  </div>
                  {selectedOrder.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className="text-[rgb(var(--color-text))]">{t('admin_estimated_delivery')}:</span>
                      <span className="text-[rgb(var(--color-text))]">{selectedOrder.estimatedDelivery}</span>
                    </div>
                  )}
                  {selectedOrder.deliveredDate && (
                    <div className="flex justify-between">
                      <span className="text-[rgb(var(--color-text))]">{t('admin_delivered_date')}:</span>
                      <span className="text-[rgb(var(--color-text))]">{selectedOrder.deliveredDate}</span>
                    </div>
                  )}
                  <div className="border-t border-[rgb(var(--color-border))] pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[rgb(var(--color-text))]">{t('admin_total')}:</span>
                      <span className="font-semibold text-[rgb(var(--color-text))]">${selectedOrder.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h3 className="text-md font-semibold text-[rgb(var(--color-text))] mb-3">
                    {t('admin_notes')}
                  </h3>
                  <div className="bg-[rgb(var(--color-background))] rounded-lg p-4">
                    <p className="text-[rgb(var(--color-text))]">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 