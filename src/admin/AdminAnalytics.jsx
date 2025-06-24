import React, { useState, useEffect } from 'react';
import { 
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineUsers,
  HiOutlineShoppingBag,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineCalendar,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineCheckCircle
} from 'react-icons/hi';
import { useLanguage } from '../Context/LanguageContext';

export default function AdminAnalytics() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const periodOptions = [
    { value: 'week', label: t('admin_this_week') },
    { value: 'month', label: t('admin_this_month') },
    { value: 'quarter', label: t('admin_this_quarter') },
    { value: 'year', label: t('admin_this_year') }
  ];

  // Mock data for analytics
  const analyticsData = {
    revenue: {
      current: 45680,
      previous: 38950,
      change: '+17.3%'
    },
    orders: {
      current: 1247,
      previous: 1089,
      change: '+14.5%'
    },
    customers: {
      current: 892,
      previous: 756,
      change: '+18.0%'
    },
    averageOrder: {
      current: 36.7,
      previous: 35.8,
      change: '+2.5%'
    }
  };

  const topProducts = [
    { name: 'Fresh Orange Juice', sales: 156, revenue: 1326.00, growth: '+12%' },
    { name: 'Vanilla Ice Cream', sales: 134, revenue: 1608.00, growth: '+8%' },
    { name: 'Fresh Strawberries', sales: 98, revenue: 661.50, growth: '+15%' },
    { name: 'Mixed Nuts', sales: 87, revenue: 804.75, growth: '+5%' }
  ];

  const recentActivity = [
    { type: 'order', message: 'New order #ORD-001 received', time: '2 min ago', amount: 29.00 },
    { type: 'payment', message: 'Payment completed for #PAY-002', time: '5 min ago', amount: 25.25 },
    { type: 'customer', message: 'New customer registered', time: '10 min ago' },
    { type: 'review', message: '5-star review received', time: '15 min ago' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order':
        return <HiOutlineShoppingBag className="w-4 h-4 text-blue-600" />;
      case 'payment':
        return <HiOutlineCurrencyDollar className="w-4 h-4 text-green-600" />;
      case 'customer':
        return <HiOutlineUsers className="w-4 h-4 text-purple-600" />;
      case 'review':
        return <HiOutlineStar className="w-4 h-4 text-yellow-600" />;
      default:
        return <HiOutlineClock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getChangeColor = (change) => {
    return change.startsWith('+') ? 'text-green-600' : 'text-red-600';
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
            {t('admin_analytics')}
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))]">
            {t('admin_analytics_subtitle')}
          </p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
        >
          {periodOptions.map(period => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_total_revenue')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                ${analyticsData.revenue.current.toLocaleString()}
              </p>
              <p className={`text-sm ${getChangeColor(analyticsData.revenue.change)} flex items-center mt-1`}>
                {analyticsData.revenue.change.startsWith('+') ? (
                  <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <HiOutlineTrendingDown className="w-4 h-4 mr-1" />
                )}
                {analyticsData.revenue.change}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <HiOutlineCurrencyDollar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_total_orders')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                {analyticsData.orders.current.toLocaleString()}
              </p>
              <p className={`text-sm ${getChangeColor(analyticsData.orders.change)} flex items-center mt-1`}>
                {analyticsData.orders.change.startsWith('+') ? (
                  <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <HiOutlineTrendingDown className="w-4 h-4 mr-1" />
                )}
                {analyticsData.orders.change}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <HiOutlineShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {t('admin_total_customers')}
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--color-text))]">
                {analyticsData.customers.current.toLocaleString()}
              </p>
              <p className={`text-sm ${getChangeColor(analyticsData.customers.change)} flex items-center mt-1`}>
                {analyticsData.customers.change.startsWith('+') ? (
                  <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <HiOutlineTrendingDown className="w-4 h-4 mr-1" />
                )}
                {analyticsData.customers.change}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <HiOutlineUsers className="w-6 h-6 text-purple-600" />
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
                ${analyticsData.averageOrder.current}
              </p>
              <p className={`text-sm ${getChangeColor(analyticsData.averageOrder.change)} flex items-center mt-1`}>
                {analyticsData.averageOrder.change.startsWith('+') ? (
                  <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <HiOutlineTrendingDown className="w-4 h-4 mr-1" />
                )}
                {analyticsData.averageOrder.change}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <HiOutlineChartBar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl border border-[rgb(var(--color-border))]">
          <div className="p-6 border-b border-[rgb(var(--color-border))]">
            <h2 className="text-lg font-semibold text-[rgb(var(--color-text))] flex items-center">
              <HiOutlineChartBar className="w-5 h-5 mr-2" />
              {t('admin_top_products')}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[rgb(var(--color-background))] rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[rgb(var(--color-text))]">{product.name}</p>
                      <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                        {product.sales} {t('admin_sales')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[rgb(var(--color-text))]">${product.revenue}</p>
                    <p className="text-xs text-green-600">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl border border-[rgb(var(--color-border))]">
          <div className="p-6 border-b border-[rgb(var(--color-border))]">
            <h2 className="text-lg font-semibold text-[rgb(var(--color-text))] flex items-center">
              <HiOutlineClock className="w-5 h-5 mr-2" />
              {t('admin_recent_activity')}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[rgb(var(--color-text))]">{activity.message}</p>
                    <p className="text-xs text-[rgb(var(--color-text-secondary))]">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <div className="flex-shrink-0">
                      <p className="text-sm font-medium text-[rgb(var(--color-text))]">${activity.amount}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl border border-[rgb(var(--color-border))]">
        <div className="p-6 border-b border-[rgb(var(--color-border))]">
          <h2 className="text-lg font-semibold text-[rgb(var(--color-text))] flex items-center">
            <HiOutlineTrendingUp className="w-5 h-5 mr-2" />
            {t('admin_performance_insights')}
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiOutlineCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-[rgb(var(--color-text))]">98.5%</h3>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_order_completion_rate')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiOutlineClock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-[rgb(var(--color-text))]">15 min</h3>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_avg_delivery_time')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiOutlineStar className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-[rgb(var(--color-text))]">4.8/5</h3>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">{t('admin_customer_satisfaction')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 