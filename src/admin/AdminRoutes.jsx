import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminOrders from './AdminOrders';
import AdminPayments from './AdminPayments';
import AdminCustomers from './AdminCustomers';
import AdminAnalytics from './AdminAnalytics';
import AdminSettings from './AdminSettings';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
} 