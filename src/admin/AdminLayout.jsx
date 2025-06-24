import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HiOutlineHome, 
  HiOutlineShoppingBag, 
  HiOutlineTag,
  HiOutlineShoppingCart,
  HiOutlineCreditCard,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineBell,
  HiOutlineUser
} from 'react-icons/hi';
import ThemeSwitcher from '../components/UI/ThemeSwitcher';
import LanguageSwitcher from '../components/UI/LanguageSwitcher';
import { useTheme } from '../Context/ThemeContext';
import { useLanguage } from '../Context/LanguageContext';

export default function AdminLayout() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New order received', time: '2 min ago', unread: true },
    { id: 2, message: 'Payment completed', time: '5 min ago', unread: true },
    { id: 3, message: 'Low stock alert', time: '1 hour ago', unread: false }
  ]);

  const navigation = [
    { name: t('admin_dashboard'), href: '/admin', icon: HiOutlineHome },
    { name: t('admin_products'), href: '/admin/products', icon: HiOutlineShoppingBag },
    { name: t('admin_categories'), href: '/admin/categories', icon: HiOutlineTag },
    { name: t('admin_orders'), href: '/admin/orders', icon: HiOutlineShoppingCart },
    { name: t('admin_payments'), href: '/admin/payments', icon: HiOutlineCreditCard },
    { name: t('admin_customers'), href: '/admin/customers', icon: HiOutlineUsers },
    { name: t('admin_analytics'), href: '/admin/analytics', icon: HiOutlineChartBar },
    { name: t('admin_settings'), href: '/admin/settings', icon: HiOutlineCog },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[rgb(var(--color-background-secondary))] border-r border-[rgb(var(--color-border))] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-[rgb(var(--color-border))]">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <HiOutlineHome className="text-white text-lg" />
            </div>
            <span className="ml-3 text-lg font-bold text-[rgb(var(--color-text))]">
              {t('admin_panel')}
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))]"
          >
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-[rgb(var(--color-primary))] text-white'
                      : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-background))]'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgb(var(--color-border))]">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <HiOutlineLogout className="mr-3 w-5 h-5" />
            {t('admin_logout')}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-[rgb(var(--color-background-secondary))] border-b border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))]"
              >
                <HiOutlineMenu className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] relative">
                  <HiOutlineBell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Language and Theme Switchers */}
              <div className="flex items-center space-x-2">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>

              {/* Admin Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <HiOutlineUser className="text-white text-sm" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-[rgb(var(--color-text))]">
                    {t('admin_name')}
                  </p>
                  <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                    {t('admin_role')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 