import { useState, useEffect } from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import logo from '../../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Get current language from localStorage (set by Header)
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'en';
  });

  // Listen for language changes
  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentLang(localStorage.getItem('appLanguage') || 'en');
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Translations for Footer
  const translations = {
    en: {
      logoText: "Watan",
      logoTextHighlight: "Hisaab",
      description: "Your trusted partner for digital financial management. We help you manage accounts efficiently and securely.",
      quickLinks: "Quick Links",
      contactUs: "Contact Us",
      newsletter: "Newsletter",
      newsletterText: "Subscribe to get updates about new features and financial insights",
      emailPlaceholder: "Your email",
      subscribe: "Subscribe",
      availableIn: "Available in:",
      rights: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      sitemap: "Sitemap"
    },
    ur: {
      logoText: "وطن",
      logoTextHighlight: "حساب",
      description: "ڈیجیٹل فنانشل مینجمنٹ کے لیے آپ کا قابل اعتماد پارٹنر۔ ہم آپ کو اکاؤنٹس کو مؤثر اور محفوظ طریقے سے منظم کرنے میں مدد کرتے ہیں۔",
      quickLinks: "فوری روابط",
      contactUs: "رابطہ کریں",
      newsletter: "نیوز لیٹر",
      newsletterText: "نئی خصوصیات اور مالیاتی بصیرت کے بارے میں اپ ڈیٹس حاصل کرنے کے لیے سبسکرائب کریں",
      emailPlaceholder: "آپ کی ای میل",
      subscribe: "سبسکرائب کریں",
      availableIn: "دستیاب ہے:",
      rights: "جملہ حقوق محفوظ ہیں۔",
      privacyPolicy: "رازداری کی پالیسی",
      termsOfService: "استعمال کی شرائط",
      sitemap: "سائٹ کا نقشہ"
    },
    ps: {
      logoText: "وطن",
      logoTextHighlight: "حساب",
      description: "د ډیجیټل مالي مدیریت لپاره ستاسو باوري شریک. موږ تاسو سره د حسابونو په مؤثره او خوندي توګه اداره کولو کې مرسته کوو.",
      quickLinks: "چټک لینکونه",
      contactUs: "اړیکه ونیسئ",
      newsletter: "نیوز لیټر",
      newsletterText: "د نویو ځانګړتیاو او مالي بصیرت په اړه تازه معلومات ترلاسه کولو لپاره ګډون وکړئ",
      emailPlaceholder: "ستاسو بریښنالیک",
      subscribe: "ګډون وکړئ",
      availableIn: "شتون لري په:",
      rights: "ټول حقونه خوندي دي.",
      privacyPolicy: "د محرمیت پالیسي",
      termsOfService: "د خدمت شرایط",
      sitemap: "سایټ نقشه"
    },
    fa: {
      logoText: "وطن",
      logoTextHighlight: "حساب",
      description: "شریک قابل اعتماد شما برای مدیریت مالی دیجیتال. ما به شما کمک می‌کنیم تا حساب‌ها را به طور کارآمد و ایمن مدیریت کنید.",
      quickLinks: "لینک‌های سریع",
      contactUs: "تماس با ما",
      newsletter: "خبرنامه",
      newsletterText: "برای دریافت به‌روزرسانی‌های مربوط به ویژگی‌های جدید و بینش‌های مالی مشترک شوید",
      emailPlaceholder: "ایمیل شما",
      subscribe: "اشتراک",
      availableIn: "در دسترس است:",
      rights: "تمامی حقوق محفوظ است.",
      privacyPolicy: "سیاست حفظ حریم خصوصی",
      termsOfService: "شرایط خدمات",
      sitemap: "نقشه سایت"
    }
  };

  const t = translations[currentLang];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  const contactInfo = [
    { icon: Phone, text: '+92 300 1234567', href: 'tel:+923001234567' },
    { icon: Mail, text: 'info@watanhisaab.com', href: 'mailto:info@watanhisaab.com' },
    { icon: MapPin, text: 'Karachi, Pakistan', href: '#' }
  ];

  // Get translated quick links names
  const translatedQuickLinks = quickLinks.map(link => {
    let name = link.name;
    if (currentLang !== 'en') {
      if (link.name === 'Home') name = t.quickLinks === 'Quick Links' ? 'Home' : 
        currentLang === 'ur' ? 'ہوم' : 
        currentLang === 'ps' ? 'کور' : 'خانه';
      else if (link.name === 'About Us') name = t.quickLinks === 'Quick Links' ? 'About Us' :
        currentLang === 'ur' ? 'ہمارے بارے میں' :
        currentLang === 'ps' ? 'زموږ په اړه' : 'درباره ما';
      else if (link.name === 'Contact Us') name = t.quickLinks === 'Quick Links' ? 'Contact Us' :
        currentLang === 'ur' ? 'رابطہ کریں' :
        currentLang === 'ps' ? 'اړیکه ونیسئ' : 'تماس با ما';
      else if (link.name === 'Privacy Policy') name = t.privacyPolicy;
      else if (link.name === 'Terms of Service') name = t.termsOfService;
    }
    return { ...link, name };
  });

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'ps', name: 'Pashto', native: 'پښتو' },
    { code: 'fa', name: 'Persian', native: 'فارسی' }
  ];

  // Set RTL for Urdu, Pashto, Persian
  const isRTL = currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa';

  return (
    <footer className="bg-black text-white relative" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-red-500 to-green-500"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="WatanHisaab Logo" 
                className="w-12 h-12 object-contain rounded-lg transform hover:scale-110 transition-all duration-300"
              />
              <span className="text-white font-bold text-xl">
                {t.logoText}<span className="text-green-400">{t.logoTextHighlight}</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors duration-300 transform hover:scale-110`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">{t.quickLinks}</h3>
            <ul className="space-y-2">
              {translatedQuickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm flex items-center"
                  >
                    <span className="mr-2 text-red-500">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">{t.contactUs}</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="flex items-start space-x-3 text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm group"
                    >
                      <Icon size={18} className="text-red-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span>{item.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">{t.newsletter}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {t.newsletterText}
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                >
                  {t.subscribe}
                </button>
              </div>
            </form>

            {/* Languages Supported */}
            <div className="mt-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Globe size={16} className="text-green-400" />
                <span className="text-sm">{t.availableIn}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {languages.map((lang, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-md text-xs border transition-all duration-300 cursor-pointer ${
                      currentLang === lang.code
                        ? 'bg-gradient-to-r from-green-500 to-red-500 text-white border-transparent'
                        : 'bg-gray-900 text-gray-300 border-gray-800 hover:border-green-500/50'
                    }`}
                    onClick={() => {
                      localStorage.setItem('appLanguage', lang.code);
                      window.location.reload();
                    }}
                  >
                    {lang.native}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} {t.logoText} {t.logoTextHighlight}. {t.rights}
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-300">
                {t.privacyPolicy}
              </a>
              <a href="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-300">
                {t.termsOfService}
              </a>
              <a href="/sitemap" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-300">
                {t.sitemap}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;