import React, { useState, useEffect } from 'react';
import { 
  HiOutlineSearch, 
  HiOutlineFilter,
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineCash,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineCalendar,
  HiOutlineUser
} from 'react-icons/hi';
import { useLanguage } from '../Context/LanguageContext';

export default function AdminPayments() {
  const { t } = useLanguage();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10);

  const statusOptions = [
    { value: 'all', label: t('admin_all_payments') },
    { value: 'completed', label: t('admin_status_completed') },
    { value: 'pending', label: t('admin_status_pending') },
    { value: 'failed', label: t('admin_status_failed') },
    { value: 'refunded', label: t('admin_status_refunded') }
  ];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPayments([
        {
          id: '#PAY-001',
          orderId: '#ORD-001',
          customer: 'Ahmed Hassan',
          amount: 29.00,
          method: 'Cash on Delivery',
          status: 'completed',
          date: '2024-01-15 14:30',
          transactionId: 'TXN-123456789',
          notes: 'Payment received on delivery'
        },
        {
          id: '#PAY-002',
          orderId: '#ORD-002',
          customer: 'Fatima Ali',
          amount: 25.25,
          method: 'Credit Card',
          status: 'completed',
          date: '2024-01-14 13:45',
          transactionId: 'TXN-987654321',
          notes: 'Online payment successful'
        },
        {
          id: '#PAY-003',
          orderId: '#ORD-003',
          customer: 'Mohammed Omar',
          amount: 67.25,
          method: 'Mobile Payment',
          status: 'pending',
          date: '2024-01-15 12:20',
          transactionId: 'TXN-456789123',
          notes: 'Payment processing'
        },
        {
          id: '#PAY-004',
          orderId: '#ORD-004',
          customer: 'Aisha Khalil',
          amount: 22.75,
          method: 'Cash on Delivery',
          status: 'failed',
          date: '2024-01-15 11:15',
          transactionId: 'TXN-789123456',
          notes: 'Customer cancelled order'
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  // Calculate statistics
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const failedAmount = payments.filter(p => p.status === 'failed').reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <HiOutlineCheckCircle className="w-4 h-4" />;
      case 'pending':
        return <HiOutlineClock className="w-4 h-4" />;
      case 'failed':
        return <HiOutlineXCircle className="w-4 h-4" />;
      case 'refunded':
        return <HiOutlineTrendingDown className="w-4 h-4" />;
      default:
        return <HiOutlineClock className="w-4 h-4" />;
    }
  };

  const getMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'credit card':
        return <HiOutlineCreditCard className="w-4 h-4" />;
      case 'cash on delivery':
        return <HiOutlineCash className="w-4 h-4" />;
      case 'mobile payment':
        return <HiOutlineCreditCard className="w-4 h-4" />;
      default:
        return <HiOutlineCreditCard className="w-4 h-4" />;
    }
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
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
            {t('admin_payments')}
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))]">
            {t('admin_payments_subtitle')}
          </p>
        </div>
        <div className="text-sm text-[rgb(var(--color-text-secondary))]">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <HiOutlineTrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_pending_payments')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                ${pendingAmount.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <HiOutlineClock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_failed_payments')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                ${failedAmount.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <HiOutlineTrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--color-text-secondary))] w-5 h-5" />
            <input
              type="text"
              placeholder={t('admin_search_payments')}
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
            {t('admin_showing')} {filteredPayments.length} {t('admin_of')} {payments.length} {t('admin_payments')}
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl border border-[rgb(var(--color-border))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[rgb(var(--color-background))]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_payment_id')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_order_id')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_customer')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  {t('admin_method')}
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
              {currentPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-[rgb(var(--color-background))]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(var(--color-text))]">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--color-text))]">
                    {payment.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--color-text))]">
                    {payment.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(var(--color-text))]">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getMethodIcon(payment.method)}
                      <span className="ml-2 text-sm text-[rgb(var(--color-text))]">
                        {payment.method}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span className="ml-1">{t(`admin_status_${payment.status}`)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--color-text-secondary))]">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewPayment(payment)}
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
                {t('admin_showing')} {indexOfFirstPayment + 1} {t('admin_to')} {Math.min(indexOfLastPayment, filteredPayments.length)} {t('admin_of')} {filteredPayments.length} {t('admin_results')}
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

      {/* Payment Details Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[rgb(var(--color-border))]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">
                  {t('admin_payment_details')} - {selectedPayment.id}
                </h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))]"
                >
                  <HiOutlineX className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                    {t('admin_payment_id')}
                  </label>
                  <p className="text-sm text-[rgb(var(--color-text))]">{selectedPayment.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                    {t('admin_order_id')}
                  </label>
                  <p className="text-sm text-[rgb(var(--color-text))]">{selectedPayment.orderId}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                  {t('admin_customer')}
                </label>
                <p className="text-sm text-[rgb(var(--color-text))]">{selectedPayment.customer}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                    {t('admin_amount')}
                  </label>
                  <p className="text-lg font-bold text-[rgb(var(--color-text))]">${selectedPayment.amount}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                    {t('admin_status')}
                  </label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedPayment.status)}`}>
                    {getStatusIcon(selectedPayment.status)}
                    <span className="ml-1">{t(`admin_status_${selectedPayment.status}`)}</span>
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                  {t('admin_payment_method')}
                </label>
                <div className="flex items-center mt-1">
                  {getMethodIcon(selectedPayment.method)}
                  <span className="ml-2 text-sm text-[rgb(var(--color-text))]">{selectedPayment.method}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                  {t('admin_transaction_id')}
                </label>
                <p className="text-sm text-[rgb(var(--color-text))]">{selectedPayment.transactionId}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                  {t('admin_payment_date')}
                </label>
                <p className="text-sm text-[rgb(var(--color-text))]">{selectedPayment.date}</p>
              </div>

              {selectedPayment.notes && (
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                    {t('admin_notes')}
                  </label>
                  <p className="text-sm text-[rgb(var(--color-text))]">{selectedPayment.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 