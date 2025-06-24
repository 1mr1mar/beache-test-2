import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    navbar_home: "Home",
    navbar_menu: "Menu",
    navbar_cart: "Cart",
    navbar_order_tracking: "Order Tracking",
    
    // Home Page
    hero_headline: "Enjoy the best products on the beach!",
    hero_subheadline: "Fast delivery, fresh products, while you relax on the sand.",
    hero_cta: "Order Now",
    hero_search_placeholder: "Search for products...",
    
    // Features Section
    features_title: "Why Choose Us?",
    features_subtitle: "We provide you with the best shopping experience",
    feature_fast_order_title: "Fast Order",
    feature_fast_order_desc: "Easy to use interface",
    feature_fast_delivery_title: "Fast Delivery",
    feature_fast_delivery_desc: "With direct tracking",
    feature_high_quality_title: "High Quality",
    feature_high_quality_desc: "Complete satisfaction guarantee",
    
    // Categories Section
    categories_title: "Product Categories",
    categories_subtitle: "Discover our diverse collection",
    category_ice_cream: "Ice Cream",
    category_drinks: "Drinks",
    category_snacks: "Snacks",
    category_fruits: "Fruits",
    
    // Call to Action Section
    cta_title: "Ready to Start Shopping?",
    cta_subtitle: "Join us now and enjoy the best products",
    cta_button: "Start Shopping Now",
    
    // Stats Section
    stats_customers: "Happy Customers",
    stats_products: "Products",
    stats_delivery: "Fast Delivery",
    stats_quality: "Quality Guarantee",
    
    // Menu Page
    menu_title: "Product Menu",
    menu_subtitle: "Discover our wide selection of premium products",
    menu_search_placeholder: "Search products...",
    menu_show_filters: "Show Filters",
    menu_hide_filters: "Hide Filters",
    menu_categories: "Categories",
    menu_price_range: "Price Range",
    menu_sort_by: "Sort by:",
    menu_sort_name: "Name",
    menu_sort_price: "Price",
    menu_sort_category: "Category",
    menu_view: "View:",
    menu_grid: "Grid",
    menu_list: "List",
    menu_results_found: "Found",
    menu_products: "products",
    menu_page: "Page",
    menu_of: "of",
    menu_showing: "Showing",
    menu_to: "to",
    menu_from: "from",
    menu_previous: "Previous",
    menu_next: "Next",
    menu_no_results: "No Results",
    menu_no_results_desc: "Try changing filters or search for something else",
    
    // Cart Page
    cart_title: "Shopping Cart",
    cart_empty: "Your cart is empty.",
    cart_empty_desc: "Start shopping to add products to your cart",
    cart_remove: "Remove",
    cart_clear_cart: "Clear Cart",
    cart_total: "Total:",
    cart_checkout: "Complete Order",
    cart_decrease: "Decrease quantity",
    cart_increase: "Increase quantity",
    
    // Order Tracking Page
    order_tracking_title: "Order Tracking",
    order_tracking_subtitle: "Track your order status in real-time",
    order_tracking_coming_soon: "Order tracking feature coming soon!",
    order_tracking_desc: "We will launch the order tracking feature soon so you can follow your order step by step",
    order_tracking_received: "Order Received",
    order_tracking_received_desc: "Your order has been confirmed successfully",
    order_tracking_preparing: "Preparing",
    order_tracking_preparing_desc: "Your order will be prepared soon",
    order_tracking_delivering: "Delivering",
    order_tracking_delivering_desc: "Your order will be delivered soon",
    order_tracking_notification: "We will notify you when this feature is launched",
    
    // Product Categories
    category_all: "All",
    
    // Common Actions
    add_to_cart: "Add to Cart",
    view_details: "View Details",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    
    // Theme Names
    theme_beach_day: "Beach Day",
    theme_sunset_night: "Sunset Night",
    theme_ice_cream: "Ice Cream",
    theme_ocean_wave: "Ocean Wave",
    
    // Currency
    currency: "DH",
    
    // Time
    minutes: "minutes",
    hours: "hours",
    days: "days",
    
    // Status
    status_pending: "Pending",
    status_processing: "Processing",
    status_shipped: "Shipped",
    status_delivered: "Delivered",
    status_cancelled: "Cancelled",
  },
  
  ar: {
    // Navigation
    navbar_home: "الرئيسية",
    navbar_menu: "القائمة",
    navbar_cart: "السلة",
    navbar_order_tracking: "تتبع الطلب",
    
    // Home Page
    hero_headline: "استمتع بأفضل المنتجات على الشاطئ!",
    hero_subheadline: "توصيل سريع، منتجات طازجة، وأنت مسترخي على الرمل.",
    hero_cta: "اطلب الآن",
    hero_search_placeholder: "البحث عن المنتجات...",
    
    // Features Section
    features_title: "لماذا تختارنا؟",
    features_subtitle: "نحن نوفر لك أفضل تجربة شراء",
    feature_fast_order_title: "طلب سريع",
    feature_fast_order_desc: "واجهة سهلة الاستخدام",
    feature_fast_delivery_title: "توصيل سريع",
    feature_fast_delivery_desc: "مع تتبع مباشر",
    feature_high_quality_title: "جودة عالية",
    feature_high_quality_desc: "ضمان التمتع بالتمتع",
    
    // Categories Section
    categories_title: "فئات المنتجات",
    categories_subtitle: "اكتشف تشكيلتنا المتنوعة",
    category_ice_cream: "المثلجات",
    category_drinks: "المشروبات",
    category_snacks: "وجبات خفيفة",
    category_fruits: "الفواكه",
    
    // Call to Action Section
    cta_title: "هل أنت مستعد لبدء التسوق؟",
    cta_subtitle: "انضم إلينا الآن واستمتع بأفضل المنتجات",
    cta_button: "بدء التسوق الآن",
    
    // Stats Section
    stats_customers: "عميل سعيد",
    stats_products: "منتج",
    stats_delivery: "توصيل سريع",
    stats_quality: "ضمان الجودة",
    
    // Menu Page
    menu_title: "قائمة المنتجات",
    menu_subtitle: "اكتشف تشكيلة واسعة من المنتجات المميزة",
    menu_search_placeholder: "البحث في المنتجات...",
    menu_show_filters: "إظهار الفلاتر",
    menu_hide_filters: "إخفاء الفلاتر",
    menu_categories: "الفئات",
    menu_price_range: "نطاق السعر",
    menu_sort_by: "ترتيب حسب:",
    menu_sort_name: "الاسم",
    menu_sort_price: "السعر",
    menu_sort_category: "الفئة",
    menu_view: "عرض:",
    menu_grid: "شبكة",
    menu_list: "قائمة",
    menu_results_found: "تم العثور على",
    menu_products: "منتج",
    menu_page: "الصفحة",
    menu_of: "من",
    menu_showing: "عرض",
    menu_to: "إلى",
    menu_from: "من",
    menu_previous: "السابق",
    menu_next: "التالي",
    menu_no_results: "لا توجد نتائج",
    menu_no_results_desc: "جرب تغيير الفلاتر أو البحث عن شيء آخر",
    
    // Cart Page
    cart_title: "سلة المشتريات",
    cart_empty: "سلتك فارغة حالياً.",
    cart_empty_desc: "ابدأ التسوق لإضافة منتجات إلى سلتك",
    cart_remove: "حذف",
    cart_clear_cart: "إفراغ السلة",
    cart_total: "المجموع:",
    cart_checkout: "إتمام الطلب",
    cart_decrease: "نقص الكمية",
    cart_increase: "زيادة الكمية",
    
    // Order Tracking Page
    order_tracking_title: "تتبع الطلب",
    order_tracking_subtitle: "تتبع حالة طلبك في الوقت الفعلي",
    order_tracking_coming_soon: "ميزة تتبع الطلب قادمة قريباً!",
    order_tracking_desc: "سنقوم بإطلاق ميزة تتبع الطلب قريباً لتتمكن من متابعة طلبك خطوة بخطوة",
    order_tracking_received: "تم استلام الطلب",
    order_tracking_received_desc: "تم تأكيد طلبك بنجاح",
    order_tracking_preparing: "قيد التحضير",
    order_tracking_preparing_desc: "سيتم تحضير طلبك قريباً",
    order_tracking_delivering: "قيد التوصيل",
    order_tracking_delivering_desc: "سيتم توصيل طلبك قريباً",
    order_tracking_notification: "سنقوم بإشعارك عند إطلاق هذه الميزة",
    
    // Product Categories
    category_all: "الكل",
    
    // Common Actions
    add_to_cart: "أضف إلى السلة",
    view_details: "عرض التفاصيل",
    close: "إغلاق",
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    confirm: "تأكيد",
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    
    // Theme Names
    theme_beach_day: "يوم الشاطئ",
    theme_sunset_night: "ليلة الغروب",
    theme_ice_cream: "المثلجات",
    theme_ocean_wave: "موجة المحيط",
    
    // Currency
    currency: "درهم",
    
    // Time
    minutes: "دقائق",
    hours: "ساعات",
    days: "أيام",
    
    // Status
    status_pending: "في الانتظار",
    status_processing: "قيد المعالجة",
    status_shipped: "تم الشحن",
    status_delivered: "تم التوصيل",
    status_cancelled: "ملغي",
  },
  
  fr: {
    // Navigation
    navbar_home: "Accueil",
    navbar_menu: "Menu",
    navbar_cart: "Panier",
    navbar_order_tracking: "Suivi de Commande",
    
    // Home Page
    hero_headline: "Profitez des meilleurs produits sur la plage!",
    hero_subheadline: "Livraison rapide, produits frais, pendant que vous vous détendez sur le sable.",
    hero_cta: "Commander Maintenant",
    hero_search_placeholder: "Rechercher des produits...",
    
    // Features Section
    features_title: "Pourquoi nous choisir?",
    features_subtitle: "Nous vous offrons la meilleure expérience d'achat",
    feature_fast_order_title: "Commande Rapide",
    feature_fast_order_desc: "Interface facile à utiliser",
    feature_fast_delivery_title: "Livraison Rapide",
    feature_fast_delivery_desc: "Avec suivi direct",
    feature_high_quality_title: "Haute Qualité",
    feature_high_quality_desc: "Garantie de satisfaction complète",
    
    // Categories Section
    categories_title: "Catégories de Produits",
    categories_subtitle: "Découvrez notre collection diversifiée",
    category_ice_cream: "Glaces",
    category_drinks: "Boissons",
    category_snacks: "Collations",
    category_fruits: "Fruits",
    
    // Call to Action Section
    cta_title: "Prêt à commencer à faire des achats?",
    cta_subtitle: "Rejoignez-nous maintenant et profitez des meilleurs produits",
    cta_button: "Commencer à faire des achats maintenant",
    
    // Stats Section
    stats_customers: "Clients Heureux",
    stats_products: "Produits",
    stats_delivery: "Livraison Rapide",
    stats_quality: "Garantie Qualité",
    
    // Menu Page
    menu_title: "Menu des Produits",
    menu_subtitle: "Découvrez notre large sélection de produits premium",
    menu_search_placeholder: "Rechercher des produits...",
    menu_show_filters: "Afficher les Filtres",
    menu_hide_filters: "Masquer les Filtres",
    menu_categories: "Catégories",
    menu_price_range: "Fourchette de Prix",
    menu_sort_by: "Trier par:",
    menu_sort_name: "Nom",
    menu_sort_price: "Prix",
    menu_sort_category: "Catégorie",
    menu_view: "Vue:",
    menu_grid: "Grille",
    menu_list: "Liste",
    menu_results_found: "Trouvé",
    menu_products: "produits",
    menu_page: "Page",
    menu_of: "sur",
    menu_showing: "Affichage",
    menu_to: "à",
    menu_from: "de",
    menu_previous: "Précédent",
    menu_next: "Suivant",
    menu_no_results: "Aucun Résultat",
    menu_no_results_desc: "Essayez de changer les filtres ou recherchez autre chose",
    
    // Cart Page
    cart_title: "Panier d'Achat",
    cart_empty: "Votre panier est vide.",
    cart_empty_desc: "Commencez à faire des achats pour ajouter des produits à votre panier",
    cart_remove: "Supprimer",
    cart_clear_cart: "Vider le Panier",
    cart_total: "Total:",
    cart_checkout: "Finaliser la Commande",
    cart_decrease: "Diminuer la quantité",
    cart_increase: "Augmenter la quantité",
    
    // Order Tracking Page
    order_tracking_title: "Suivi de Commande",
    order_tracking_subtitle: "Suivez le statut de votre commande en temps réel",
    order_tracking_coming_soon: "La fonction de suivi de commande arrive bientôt!",
    order_tracking_desc: "Nous lancerons bientôt la fonction de suivi de commande pour que vous puissiez suivre votre commande étape par étape",
    order_tracking_received: "Commande Reçue",
    order_tracking_received_desc: "Votre commande a été confirmée avec succès",
    order_tracking_preparing: "En Préparation",
    order_tracking_preparing_desc: "Votre commande sera préparée bientôt",
    order_tracking_delivering: "En Livraison",
    order_tracking_delivering_desc: "Votre commande sera livrée bientôt",
    order_tracking_notification: "Nous vous notifierons lorsque cette fonction sera lancée",
    
    // Product Categories
    category_all: "Tout",
    
    // Common Actions
    add_to_cart: "Ajouter au Panier",
    view_details: "Voir les Détails",
    close: "Fermer",
    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    confirm: "Confirmer",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    
    // Theme Names
    theme_beach_day: "Jour de Plage",
    theme_sunset_night: "Nuit de Coucher de Soleil",
    theme_ice_cream: "Glace",
    theme_ocean_wave: "Vague Océanique",
    
    // Currency
    currency: "DH",
    
    // Time
    minutes: "minutes",
    hours: "heures",
    days: "jours",
    
    // Status
    status_pending: "En Attente",
    status_processing: "En Traitement",
    status_shipped: "Expédié",
    status_delivered: "Livré",
    status_cancelled: "Annulé",
  }
};

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('ar'); // Default to Arabic

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
