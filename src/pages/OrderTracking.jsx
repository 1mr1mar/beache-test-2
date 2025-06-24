import { HiOutlineTruck, HiOutlineClock, HiOutlineCheckCircle } from 'react-icons/hi';

export default function OrderTracking() {
  return (
    <div className="min-h-screen p-6 bg-[rgb(var(--color-background))]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-[rgb(var(--color-text))]">
            تتبع الطلب
          </h1>
          <p className="text-[rgb(var(--color-text-secondary))]">
            تتبع حالة طلبك في الوقت الفعلي
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center bg-[rgb(var(--color-background-secondary))] border-[rgb(var(--color-border))]">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-[rgb(var(--color-border))]">
            <HiOutlineTruck className="text-3xl text-[rgb(var(--color-text))]" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-[rgb(var(--color-text))]">
            ميزة تتبع الطلب قادمة قريباً!
          </h2>
          
          <p className="text-lg mb-6 text-[rgb(var(--color-text-secondary))]">
            سنقوم بإطلاق ميزة تتبع الطلب قريباً لتتمكن من متابعة طلبك خطوة بخطوة
          </p>

          {/* Mock Tracking Steps */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-[rgb(var(--color-background))]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgb(var(--color-secondary))]">
                <HiOutlineCheckCircle className="text-white text-lg" />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-semibold text-[rgb(var(--color-text))]">تم استلام الطلب</h3>
                <p className="text-sm text-[rgb(var(--color-text-secondary))]">تم تأكيد طلبك بنجاح</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg opacity-50 bg-[rgb(var(--color-background))]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgb(var(--color-border))]">
                <HiOutlineClock className="text-white text-lg" />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-semibold text-[rgb(var(--color-text))]">قيد التحضير</h3>
                <p className="text-sm text-[rgb(var(--color-text-secondary))]">سيتم تحضير طلبك قريباً</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg opacity-50 bg-[rgb(var(--color-background))]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgb(var(--color-border))]">
                <HiOutlineTruck className="text-white text-lg" />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-semibold text-[rgb(var(--color-text))]">قيد التوصيل</h3>
                <p className="text-sm text-[rgb(var(--color-text-secondary))]">سيتم توصيل طلبك قريباً</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-[rgb(var(--color-text-secondary))]">
            🔔 سنقوم بإشعارك عند إطلاق هذه الميزة
          </div>
        </div>
      </div>
    </div>
  );
}
