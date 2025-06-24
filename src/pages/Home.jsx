import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  HiOutlineShoppingCart, 
  HiOutlineTruck, 
  HiOutlineStar,
  HiOutlineHeart,
  HiOutlineArrowRight,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineSearch,
  HiOutlineArrowUp,
  HiOutlineSparkles
} from 'react-icons/hi';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ customers: 0, orders: 0, rating: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Hero slider images
  const heroImages = [
    {
      image: '/pic/product1.jpg',
      title: 'شاطئ المنتجات',
      subtitle: 'اكتشف تشكيلة واسعة من المنتجات المميزة'
    },
    {
      image: '/pic/iceCreamWlp.jpg',
      title: 'المثلجات المنعشة',
      subtitle: 'استمتع بألذ المثلجات الطازجة'
    },
    {
      image: '/pic/drinkswlp.jpg',
      title: 'المشروبات المنعشة',
      subtitle: 'اشرب من تشكيلة المشروبات الباردة'
    },
    {
      image: '/pic/snackswlp.jpg',
      title: 'الوجبات الخفيفة',
      subtitle: 'تناول ألذ الوجبات الخفيفة'
    },
    {
      image: '/pic/fruitwalp1.jpg',
      title: 'الفواكه الطازجة',
      subtitle: 'استمتع بالفواكه الطازجة'
    }
  ];

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setIsVisible(true);
      }
      if (scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Counter animation
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setCounters({
          customers: 1500,
          orders: 2500,
          rating: 4.8
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Hero slider rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to menu with search query
      window.location.href = `/menu?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Floating Search Bar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="ابحث عن منتجاتك المفضلة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <HiOutlineSearch className="text-xl" />
          </button>
        </form>
      </div>

      {/* Hero Section with Slider */}
      <div className="relative w-full h-[93vh] flex items-center justify-center overflow-hidden">
        {/* Slider Images */}
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image.image}
            alt={`Hero Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center z-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-blue-400/30 z-10" />
        
        {/* Floating Sparkles Effect */}
        <div className="absolute inset-0 z-15 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <HiOutlineSparkles className="text-white/30 text-2xl" />
            </div>
          ))}
        </div>
        
        {/* Slider Dots */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Stats Section at Bottom */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-2xl px-4">
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="text-center border-1 border-white p-2 md:p-3 rounded-lg md:rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 animate-bounce" style={{ animationDuration: '2s' }}>
                <HiOutlineUsers className="text-white text-sm md:text-lg" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-white mb-0.5 md:mb-1">{counters.customers}+</h3>
              <p className="text-xs md:text-sm text-white/90">عميل سعيد</p>
            </div>
            <div className="text-center border-1 border-white p-2 md:p-3 rounded-lg md:rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.2s' }}>
                <HiOutlineClock className="text-white text-sm md:text-lg" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-white mb-0.5 md:mb-1">{counters.orders}+</h3>
              <p className="text-xs md:text-sm text-white/90">طلب مكتمل</p>
            </div>
            <div className="text-center border-1 border-white p-2 md:p-3 rounded-lg md:rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.4s' }}>
                <HiOutlineStar className="text-white text-sm md:text-lg" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-white mb-0.5 md:mb-1">{counters.rating}</h3>
              <p className="text-xs md:text-sm text-white/90">تقييم متوسط</p>
            </div>
          </div>
        </div>

        <div className="relative z-20 text-center w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg animate-fade-in">
            {heroImages[currentSlide].title}
          </h1>
          <p className="text-sm md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto drop-shadow animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {heroImages[currentSlide].subtitle}
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <Link
              to="/menu"
              className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-xl font-semibold text-sm md:text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl animate-pulse"
              style={{ animationDuration: '2s' }}
            >
              <HiOutlineShoppingCart className="text-lg md:text-xl" />
              تصفح المنتجات
              <HiOutlineArrowRight className="text-lg md:text-xl" />
            </Link>
            <Link
              to="/order-tracking"
              className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 rounded-xl font-semibold text-sm md:text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-blue-600"
            >
              <HiOutlineTruck className="text-lg md:text-xl" />
              تتبع طلبك
            </Link>
          </div>
        </div>
      </div>

      {/* Compact Features Section */}
      <div className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4 animate-fade-in">لماذا تختارنا؟</h2>
            <p className="text-sm md:text-lg text-gray-600 animate-fade-in" style={{ animationDelay: '0.3s' }}>نقدم لك أفضل تجربة تسوق</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Feature 1 */}
            <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 animate-fade-in group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineShoppingCart className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">طلب سريع</h3>
              <p className="text-xs md:text-sm text-gray-600">واجهة سهلة الاستخدام</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 animate-fade-in group" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineTruck className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">توصيل سريع</h3>
              <p className="text-xs md:text-sm text-gray-600">مع تتبع مباشر</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 animate-fade-in group" style={{ animationDelay: '400ms' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineStar className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">جودة عالية</h3>
              <p className="text-xs md:text-sm text-gray-600">ضمان الرضا التام</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Categories Preview */}
      <div className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4 animate-fade-in">فئات المنتجات</h2>
            <p className="text-sm md:text-lg text-gray-600 animate-fade-in" style={{ animationDelay: '0.3s' }}>اكتشف تشكيلتنا المتنوعة</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {/* Ice Cream */}
            <Link
              to="/menu"
              className="group text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 animate-fade-in"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center mx-auto mb-3 md:mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src="/pic/ice.png" alt="Ice Cream" className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                المثلجات
              </h3>
            </Link>
            {/* Drinks */}
            <Link
              to="/menu"
              className="group text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 animate-fade-in"
              style={{ animationDelay: '100ms' }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mx-auto mb-3 md:mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src="/pic/drink.png" alt="Drinks" className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                المشروبات
              </h3>
            </Link>
            {/* Snacks */}
            <Link
              to="/menu"
              className="group text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 animate-fade-in"
              style={{ animationDelay: '200ms' }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center mx-auto mb-3 md:mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src="/pic/snacks.png" alt="Snacks" className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                الوجبات الخفيفة
              </h3>
            </Link>
            {/* Fruits */}
            <Link
              to="/menu"
              className="group text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 animate-fade-in"
              style={{ animationDelay: '300ms' }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center mx-auto mb-3 md:mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src="/pic/fruit.png" alt="Fruits" className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                الفواكه
              </h3>
            </Link>
          </div>
        </div>
      </div>

      {/* Compact Call to Action */}
      <div className="py-8 md:py-16 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
            جاهز لبدء التسوق؟
          </h2>
          <p className="text-sm md:text-lg text-blue-100 mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            انضم إلينا الآن واستمتع بأفضل المنتجات
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 rounded-xl font-semibold text-sm md:text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg animate-pulse"
            style={{ animationDuration: '2s' }}
          >
            <HiOutlineHeart className="text-lg md:text-xl" />
            ابدأ التسوق الآن
            <HiOutlineArrowRight className="text-lg md:text-xl" />
          </Link>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-18 right-6 z-50 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <HiOutlineArrowUp className="text-xl" />
        </button>
      )}
    </div>
  );
}
