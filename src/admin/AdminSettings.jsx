import React, { useState } from 'react';
import { 
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineLockClosed,
  HiOutlineGlobe,
  HiOutlineSave,
  HiOutlineX,
  HiOutlineCheck
} from 'react-icons/hi';
import { useLanguage } from '../Context/LanguageContext';
import { useTheme } from '../Context/ThemeContext';

export default function AdminSettings() {
  const { t } = useLanguage();
  const { currentTheme, changeTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  // Form states
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Beach Store',
    storeDescription: 'Your favorite beach products delivered to your location',
    contactEmail: 'contact@beachstore.com',
    contactPhone: '+212 6 12 34 56 78',
    address: '123 Beach Road, Agadir, Morocco',
    currency: 'USD',
    timezone: 'Africa/Casablanca'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    paymentConfirmations: true,
    lowStockAlerts: true,
    newCustomerAlerts: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5
  });

  const tabs = [
    { id: 'general', label: t('admin_general_settings'), icon: HiOutlineHome },
    { id: 'notifications', label: t('admin_notification_settings'), icon: HiOutlineBell },
    { id: 'security', label: t('admin_security_settings'), icon: HiOutlineLockClosed },
    { id: 'appearance', label: t('admin_appearance_settings'), icon: HiOutlineGlobe }
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'MAD', label: 'Moroccan Dirham (MAD)' }
  ];

  const timezones = [
    { value: 'Africa/Casablanca', label: 'Casablanca (UTC+0)' },
    { value: 'UTC', label: 'UTC (UTC+0)' },
    { value: 'Europe/London', label: 'London (UTC+0)' }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    // Show success message
    alert(t('admin_settings_saved'));
  };

  const handleInputChange = (section, field, value) => {
    switch (section) {
      case 'store':
        setStoreSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'notifications':
        setNotificationSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'security':
        setSecuritySettings(prev => ({ ...prev, [field]: value }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--color-text))]">
            {t('admin_settings')}
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))]">
            {t('admin_settings_subtitle')}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[rgb(var(--color-primary))] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <HiOutlineSave className="w-4 h-4" />
          )}
          <span>{saving ? t('admin_saving') : t('admin_save_changes')}</span>
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="bg-[rgb(var(--color-background-secondary))] rounded-xl border border-[rgb(var(--color-border))]">
        <div className="border-b border-[rgb(var(--color-border))]">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]'
                    : 'border-transparent text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))]'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[rgb(var(--color-text))] flex items-center">
                <HiOutlineHome className="w-5 h-5 mr-2" />
                {t('admin_store_information')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                    {t('admin_store_name')}
                  </label>
                  <input
                    type="text"
                    value={storeSettings.storeName}
                    onChange={(e) => handleInputChange('store', 'storeName', e.target.value)}
                    className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                    {t('admin_contact_email')}
                  </label>
                  <input
                    type="email"
                    value={storeSettings.contactEmail}
                    onChange={(e) => handleInputChange('store', 'contactEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                    {t('admin_contact_phone')}
                  </label>
                  <input
                    type="tel"
                    value={storeSettings.contactPhone}
                    onChange={(e) => handleInputChange('store', 'contactPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                    {t('admin_currency')}
                  </label>
                  <select
                    value={storeSettings.currency}
                    onChange={(e) => handleInputChange('store', 'currency', e.target.value)}
                    className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                  >
                    {currencies.map(currency => (
                      <option key={currency.value} value={currency.value}>
                        {currency.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                    {t('admin_timezone')}
                  </label>
                  <select
                    value={storeSettings.timezone}
                    onChange={(e) => handleInputChange('store', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                  >
                    {timezones.map(timezone => (
                      <option key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                  {t('admin_store_description')}
                </label>
                <textarea
                  value={storeSettings.storeDescription}
                  onChange={(e) => handleInputChange('store', 'storeDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                  {t('admin_store_address')}
                </label>
                <textarea
                  value={storeSettings.address}
                  onChange={(e) => handleInputChange('store', 'address', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                />
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[rgb(var(--color-text))] flex items-center">
                <HiOutlineBell className="w-5 h-5 mr-2" />
                {t('admin_notification_preferences')}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-background))] rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-[rgb(var(--color-text))]">
                      {t('admin_email_notifications')}
                    </h3>
                    <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                      {t('admin_email_notifications_desc')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-background))] rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-[rgb(var(--color-text))]">
                      {t('admin_sms_notifications')}
                    </h3>
                    <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                      {t('admin_sms_notifications_desc')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-background))] rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-[rgb(var(--color-text))]">
                      {t('admin_order_updates')}
                    </h3>
                    <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                      {t('admin_order_updates_desc')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.orderUpdates}
                      onChange={(e) => handleInputChange('notifications', 'orderUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-background))] rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-[rgb(var(--color-text))]">
                      {t('admin_low_stock_alerts')}
                    </h3>
                    <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                      {t('admin_low_stock_alerts_desc')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.lowStockAlerts}
                      onChange={(e) => handleInputChange('notifications', 'lowStockAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[rgb(var(--color-text))] flex items-center">
                <HiOutlineLockClosed className="w-5 h-5 mr-2" />
                {t('admin_security_preferences')}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-background))] rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-[rgb(var(--color-text))]">
                      {t('admin_two_factor_auth')}
                    </h3>
                    <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                      {t('admin_two_factor_auth_desc')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                      {t('admin_session_timeout')} (minutes)
                    </label>
                    <input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      min="5"
                      max="120"
                      className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                      {t('admin_login_attempts')}
                    </label>
                    <input
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value))}
                      min="3"
                      max="10"
                      className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-lg bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] focus-ring"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[rgb(var(--color-text))] flex items-center">
                <HiOutlineGlobe className="w-5 h-5 mr-2" />
                {t('admin_appearance_preferences')}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
                    {t('admin_theme')}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['light', 'dark', 'icecream', 'ocean'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => changeTheme(theme)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          currentTheme === theme
                            ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-10'
                            : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))]'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">
                            {theme === 'light' && '🏖️'}
                            {theme === 'dark' && '🌅'}
                            {theme === 'icecream' && '🍦'}
                            {theme === 'ocean' && '🌊'}
                          </div>
                          <div className="text-sm font-medium text-[rgb(var(--color-text))]">
                            {t(`theme_${theme}`)}
                          </div>
                          {currentTheme === theme && (
                            <HiOutlineCheck className="w-5 h-5 text-[rgb(var(--color-primary))] mx-auto mt-1" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 