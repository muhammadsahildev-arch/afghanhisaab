import { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import logo from '../../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Get current language from localStorage
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
      rights: "All rights reserved."
    },
    ur: {
      logoText: "وطن",
      logoTextHighlight: "حساب",
      rights: "جملہ حقوق محفوظ ہیں۔"
    },
    ps: {
      logoText: "وطن",
      logoTextHighlight: "حساب",
      rights: "ټول حقونه خوندي دي."
    },
    fa: {
      logoText: "وطن",
      logoTextHighlight: "حساب",
      rights: "تمامی حقوق محفوظ است."
    }
  };

  const t = translations[currentLang];
  const isRTL = currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa';

  return (
    <footer className="bg-black text-white relative border-t-2 border-red-600" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          
          {/* Logo and Copyright - Left Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src={logo} 
              alt="WatanHisaab Logo" 
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain rounded-lg"
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-white font-bold text-xs sm:text-sm">
                {t.logoText}
                <span className="text-green-400">{t.logoTextHighlight}</span>
              </span>
              <span className="text-gray-500 text-[10px] sm:text-xs">
                © {currentYear} {t.rights}
              </span>
            </div>
          </div>

          {/* Contact Info - Right Side (Mobile Optimized) */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:+923369118242"
              className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300 active:scale-95 text-xs sm:text-sm"
            >
              <Phone size={12} className="sm:w-3.5 sm:h-3.5 text-red-500" />
              <span className="hidden xs:inline">+92 33691 18242</span>
              <span className="xs:hidden">Call</span>
            </a>
            
            <div className="w-px h-4 bg-gray-700"></div>
            
            <a
              href="mailto:m.dawood.engr@gmail.com"
              className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300 active:scale-95 text-xs sm:text-sm"
            >
              <Mail size={12} className="sm:w-3.5 sm:h-3.5 text-red-500" />
              <span className="hidden sm:inline">m.dawood.engr@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;