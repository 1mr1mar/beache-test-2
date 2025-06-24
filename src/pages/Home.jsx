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
  HiOutlineSparkles,
  HiOutlineCube,
  HiOutlineShieldCheck
} from 'react-icons/hi';
import ThemeSwitcher from '../components/UI/ThemeSwitcher';
import LanguageSwitcher from '../components/UI/LanguageSwitcher';
import { useLanguage } from '../Context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ customers: 0, orders: 0, rating: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const images = [
    '/pic/drinkswlp.jpg',
    '/pic/friutwlp2.jpg',
    '/pic/iceCreamWlp.jpg',
    '/pic/snackswlp.jpg',
    '/pic/fruitwalp1.jpg'
  ];

  const heroTexts = [
    {
      headline: t('hero_headline'),
      subheadline: t('hero_subheadline'),
      cta: t('hero_cta')
    },
    {
      headline: t('hero_headline'),
      subheadline: t('hero_subheadline'),
      cta: t('hero_cta')
    },
    {
      headline: t('hero_headline'),
      subheadline: t('hero_subheadline'),
      cta: t('hero_cta')
    },
    {
      headline: t('hero_headline'),
      subheadline: t('hero_subheadline'),
      cta: t('hero_cta')
    },
    {
      headline: t('hero_headline'),
      subheadline: t('hero_subheadline'),
      cta: t('hero_cta')
    }
  ];

  const stats = [
    { icon: HiOutlineUsers, value: '500+', label: t('stats_customers') },
    { icon: HiOutlineCube, value: '50+', label: t('stats_products') },
    { icon: HiOutlineTruck, value: '15', label: t('stats_delivery') },
    { icon: HiOutlineShieldCheck, value: '100%', label: t('stats_quality') }
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
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

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
    <div className="min-h-screen bg-[rgb(var(--color-background))]">
      {/* Floating Search Bar and Theme Switcher */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative flex-1">
            <input
              type="text"
              placeholder={t('hero_search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-full shadow-lg border focus-ring transition-all duration-300 bg-[rgb(var(--color-background-secondary))] text-[rgb(var(--color-text))] border-[rgb(var(--color-border))]"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <HiOutlineSearch className="text-xl" />
            </button>
          </form>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>

      {/* Hero Section with Slider */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
          {/* Header with Theme and Language Switchers */}
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <ThemeSwitcher />
          </div>

          {/* Hero Content */}
          <div className="w-full max-w-sm mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 animate-fade-in leading-tight">
              {heroTexts[currentSlide].headline}
            </h1>
            <p className="text-sm sm:text-base mb-6 animate-fade-in leading-relaxed">
              {heroTexts[currentSlide].subheadline}
            </p>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 animate-fade-in active:scale-95 touch-manipulation">
              {heroTexts[currentSlide].cta}
            </button>
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full px-4">
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center backdrop-blur-md bg-white/20 rounded-lg p-3 border border-white/30"
                >
                  <stat.icon className="text-xl mx-auto mb-1" />
                  <div className="text-sm font-bold">{stat.value}</div>
                  <div className="text-xs opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Compact Features Section */}
      <div className="py-8 md:py-16 bg-[rgb(var(--color-background-secondary))]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 animate-fade-in text-[rgb(var(--color-text))]">{t('features_title')}</h2>
            <p className="text-sm md:text-lg animate-fade-in text-[rgb(var(--color-text-secondary))]" style={{ animationDelay: '0.3s' }}>{t('features_subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Feature 1 */}
            <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 animate-fade-in group bg-[rgb(var(--color-background))]">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineShoppingCart className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-[rgb(var(--color-text))]">{t('feature_fast_order_title')}</h3>
              <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">{t('feature_fast_order_desc')}</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 animate-fade-in group bg-[rgb(var(--color-background))]" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineTruck className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-[rgb(var(--color-text))]">{t('feature_fast_delivery_title')}</h3>
              <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">{t('feature_fast_delivery_desc')}</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 animate-fade-in group bg-[rgb(var(--color-background))]" style={{ animationDelay: '400ms' }}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineStar className="text-white text-lg md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-[rgb(var(--color-text))]">{t('feature_high_quality_title')}</h3>
              <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">{t('feature_high_quality_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Categories Preview */}
      <div className="py-8 md:py-16 bg-[rgb(var(--color-background))]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 animate-fade-in text-[rgb(var(--color-text))]">{t('categories_title')}</h2>
            <p className="text-sm md:text-lg animate-fade-in text-[rgb(var(--color-text-secondary))]" style={{ animationDelay: '0.3s' }}>{t('categories_subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {/* Ice Cream */}
            <Link
              to="/menu"
              className="group text-center p-4 md:p-6 rounded-xl md:rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 animate-fade-in bg-[rgb(var(--color-background-secondary))]"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center mx-auto mb-3 md:mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src="/pic/ice.png" alt="Ice Cream" className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold group-hover:text-blue-600 transition-colors text-[rgb(var(--color-text))]">
                {t('category_ice_cream')}
              </h3>
            </Link>
            {/* Drinks */}
            <Link
              to="/menu"
              className="group text-center p-4 md:p-6 rounded-xl md:rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 animate-fade-in bg-[rgb(var(--color-background-secondary))]"
              style={{ animationDelay: '100ms' }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mx-auto mb-3 md:mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src="/pic/drink.png" alt="Drinks" className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold group-hover:text-blue-600 transition-colors text-[rgb(var(--color-text))]">
                {t('category_drinks')}
              </h3>
            </Link>
            {/* Snacks */}
            <Link
              to="/menu"
              className="group text-center p-4 md:p-6 rounded-xl md:rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 animate-fade-in bg-[rgb(var(--color-background-secondary))]"
              style={{ animationDelay: '200ms' }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center mx-auto mb-3 md:mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src="/pic/snacks.png" alt="Snacks" className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold group-hover:text-blue-600 transition-colors text-[rgb(var(--color-text))]">
                {t('category_snacks')}
              </h3>
            </Link>
            {/* Fruits */}
            <Link
              to="/menu"
              className="group text-center p-4 md:p-6 rounded-xl md:rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 animate-fade-in bg-[rgb(var(--color-background-secondary))]"
              style={{ animationDelay: '300ms' }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center mx-auto mb-3 md:mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src="/pic/fruit.png" alt="Fruits" className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold group-hover:text-blue-600 transition-colors text-[rgb(var(--color-text))]">
                {t('category_fruits')}
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
            {t('cta_title')}
          </h2>
          <p className="text-sm md:text-lg text-blue-100 mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {t('cta_subtitle')}
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 rounded-xl font-semibold text-sm md:text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg animate-pulse"
            style={{ animationDuration: '2s' }}
          >
            <HiOutlineHeart className="text-lg md:text-xl" />
            {t('cta_button')}
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
