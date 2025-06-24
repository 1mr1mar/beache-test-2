import React, { useState, useEffect } from 'react';
import { 
  HiOutlineShoppingCart, 
  HiOutlineUsers, 
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp,
  HiOutlineEye,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlinePlus,
  HiOutlineShoppingBag,
  HiOutlineChartBar
} from 'react-icons/hi';
import { useLanguage } from '../Context/LanguageContext';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    averageOrderValue: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalOrders: 1247,
        totalRevenue: 45680,
        totalCustomers: 892,
        averageOrderValue: 36.7
      });

      setRecentOrders([
        {
          id: '#ORD-001',
          customer: 'Ahmed Hassan',
          amount: 45.50,
          status: 'pending',
          date: '2024-01-15 14:30',
          items: 3
        },
        {
          id: '#ORD-002',
          customer: 'Fatima Ali',
          amount: 32.00,
          status: 'completed',
          date: '2024-01-15 13:45',
          items: 2
        },
        {
          id: '#ORD-003',
          customer: 'Mohammed Omar',
          amount: 67.25,
          status: 'processing',
          date: '2024-01-15 12:20',
          items: 4
        },
        {
          id: '#ORD-004',
          customer: 'Aisha Khalil',
          amount: 28.75,
          status: 'cancelled',
          date: '2024-01-15 11:15',
          items: 2
        }
      ]);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
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
      case 'processing':
        return <HiOutlineTrendingUp className="w-4 h-4" />;
      case 'cancelled':
        return <HiOutlineXCircle className="w-4 h-4" />;
      default:
        return <HiOutlineClock className="w-4 h-4" />;
    }
  };

  const quickActions = [
    {
      title: t('admin_add_product'),
      icon: HiOutlinePlus,
      href: '/admin/products/new',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: t('admin_view_orders'),
      icon: HiOutlineShoppingCart,
      href: '/admin/orders',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: t('admin_analytics'),
      icon: HiOutlineChartBar,
      href: '/admin/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

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
            {t('admin_dashboard')}
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))]">
            {t('admin_dashboard_subtitle')}
          </p>
        </div>
        <div className="text-sm text-[rgb(var(--color-text-secondary))]">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_total_orders')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                {stats.totalOrders.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <HiOutlineShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <HiOutlineTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+12%</span>
            <span className="text-[rgb(var(--color-text-secondary))] ml-1">
              {t('admin_from_last_month')}
            </span>
          </div>
        </div>

        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_total_revenue')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <HiOutlineCurrencyDollar className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <HiOutlineTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+8%</span>
            <span className="text-[rgb(var(--color-text-secondary))] ml-1">
              {t('admin_from_last_month')}
            </span>
          </div>
        </div>

        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_total_customers')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                {stats.totalCustomers.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <HiOutlineUsers className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <HiOutlineTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+15%</span>
            <span className="text-[rgb(var(--color-text-secondary))] ml-1">
              {t('admin_from_last_month')}
            </span>
          </div>
        </div>

        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_avg_order_value')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                ${stats.averageOrderValue}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <HiOutlineShoppingBag className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <HiOutlineTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+5%</span>
            <span className="text-[rgb(var(--color-text-secondary))] ml-1">
              {t('admin_from_last_month')}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
        <h2 className="text-lg font-semibold text-[rgb(var(--color-text))] mb-4">
          {t('admin_quick_actions')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className={`${action.color} text-white rounded-lg p-4 flex items-center space-x-3 transition-colors duration-200`}
            >
              <action.icon className="w-6 h-6" />
              <span className="font-medium">{action.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl border border-[rgb(var(--color-border))]">
        <div className="p-6 border-b border-[rgb(var(--color-border))]">
          <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">
            {t('admin_recent_orders')}
          </h2>
        </div>
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
                  {t('admin_amount')}
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
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[rgb(var(--color-background))]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(var(--color-text))]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--color-text))]">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--color-text))]">
                    ${order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{t(`admin_status_${order.status}`)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--color-text-secondary))]">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900">
                      <HiOutlineEye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 