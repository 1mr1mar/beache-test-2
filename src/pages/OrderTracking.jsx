import { HiOutlineTruck, HiOutlineClock, HiOutlineCheckCircle } from 'react-icons/hi';
import { useLanguage } from '../Context/LanguageContext';

export default function OrderTracking() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen p-4 bg-[rgb(var(--color-background))] pb-20">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-3 text-[rgb(var(--color-text))]">
            {t('order_tracking_title')}
          </h1>
          <p className="text-sm text-[rgb(var(--color-text-secondary))]">
            {t('order_tracking_subtitle')}
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center bg-[rgb(var(--color-background-secondary))] border-[rgb(var(--color-border))]">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[rgb(var(--color-border))]">
            <HiOutlineTruck className="text-2xl text-[rgb(var(--color-text))]" />
          </div>
          
          <h2 className="text-xl font-bold mb-3 text-[rgb(var(--color-text))]">
            {t('order_tracking_coming_soon')}
          </h2>
          
          <p className="text-sm mb-4 text-[rgb(var(--color-text-secondary))]">
            {t('order_tracking_desc')}
          </p>

          {/* Mock Tracking Steps */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgb(var(--color-background))]">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[rgb(var(--color-secondary))]">
                <HiOutlineCheckCircle className="text-white text-sm" />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-semibold text-sm text-[rgb(var(--color-text))]">{t('order_tracking_received')}</h3>
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">{t('order_tracking_received_desc')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg opacity-50 bg-[rgb(var(--color-background))]">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[rgb(var(--color-border))]">
                <HiOutlineClock className="text-white text-sm" />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-semibold text-sm text-[rgb(var(--color-text))]">{t('order_tracking_preparing')}</h3>
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">{t('order_tracking_preparing_desc')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg opacity-50 bg-[rgb(var(--color-background))]">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[rgb(var(--color-border))]">
                <HiOutlineTruck className="text-white text-sm" />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-semibold text-sm text-[rgb(var(--color-text))]">{t('order_tracking_delivering')}</h3>
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">{t('order_tracking_delivering_desc')}</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-[rgb(var(--color-text-secondary))]">
            🔔 {t('order_tracking_notification')}
          </div>
        </div>
      </div>
    </div>
  );
}
