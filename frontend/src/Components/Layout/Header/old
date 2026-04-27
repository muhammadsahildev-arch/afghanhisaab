import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, Home, Info, Phone, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => {
    // Load saved language from localStorage on initial render
    return localStorage.getItem('appLanguage') || 'en';
  });

  // Translation object - all texts in different languages
  const translations = {
    en: {
      nav: {
        home: 'Home',
        aboutUs: 'About Us',
        contactUs: 'Contact Us'
      },
      common: {
        login: 'Login',
        logoFirstPart: 'Watan',
        logoSecondPart: 'Hisaab',
        logoSubtext: 'Digital Financial Solutions',
        selectLanguage: 'Select Language'
      }
    },
    ur: {
      nav: {
        home: 'ہوم',
        aboutUs: 'ہمارے بارے میں',
        contactUs: 'رابطہ کریں'
      },
      common: {
        login: 'لاگ ان',
        logoFirstPart: 'وطن',
        logoSecondPart: 'حساب',
        logoSubtext: 'ڈیجیٹل فنانشل سلوشنز',
        selectLanguage: 'زبان منتخب کریں'
      }
    },
    ps: {
      nav: {
        home: 'کور',
        aboutUs: 'زموږ په اړه',
        contactUs: 'اړیکه ونیسئ'
      },
      common: {
        login: 'ننوتل',
        logoFirstPart: 'وطن',
        logoSecondPart: 'حساب',
        logoSubtext: 'ډیجیټل مالي حل لارې',
        selectLanguage: 'ژبه غوره کړئ'
      }
    },
    fa: {
      nav: {
        home: 'خانه',
        aboutUs: 'درباره ما',
        contactUs: 'تماس با ما'
      },
      common: {
        login: 'ورود',
        logoFirstPart: 'وطن',
        logoSecondPart: 'حساب',
        logoSubtext: 'راهکارهای مالی دیجیتال',
        selectLanguage: 'انتخاب زبان'
      }
    }
  };

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'ps', name: 'Pashto', native: 'پښتو' },
    { code: 'fa', name: 'Persian', native: 'فارسی' }
  ];

  const navItems = [
    { name: translations[currentLang].nav.home, href: '/', icon: Home, key: 'home' },
    { name: translations[currentLang].nav.aboutUs, href: '/about-us', icon: Info, key: 'aboutUs' },
    { name: translations[currentLang].nav.contactUs, href: '/contact-us', icon: Phone, key: 'contactUs' }
  ];

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang.code);
    localStorage.setItem('appLanguage', lang.code); // Save to localStorage
    setLangOpen(false);
    console.log(`Changing language to: ${lang.name}`);
    // Optional: reload page to refresh all components (simplest approach)
    window.location.reload();
  };

  // Get current language display name
  const currentLanguageName = languages.find(lang => lang.code === currentLang)?.name || 'English';

  return (
    <header className="bg-black shadow-2xl relative z-50 border-b-4 border-red-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo with enhanced design */}
          <div className="flex-shrink-0 flex items-center group">
            {/* Logo Image */}
            <img 
              src={logo} 
              alt="WatanHisaab Logo" 
              className="w-12 h-12 object-contain rounded-xl transform group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-green-500/20"
            />
            <div className="ml-3 flex flex-col">
              <span className="text-white font-bold text-lg leading-tight hidden sm:block">
                {translations[currentLang].common.logoFirstPart}
                <span className="text-green-400">{translations[currentLang].common.logoSecondPart}</span>
              </span>
              <span className="text-red-400 text-xs hidden sm:block font-medium">
                {translations[currentLang].common.logoSubtext}
              </span>
            </div>
          </div>

          {/* Desktop Navigation with icons */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className="group flex items-center px-4 py-2 text-white hover:text-green-400 transition-all duration-300 font-medium relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-red-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <Icon size={18} className="mr-2 text-red-400 group-hover:text-green-400 transition-colors duration-300" />
                  <span className="relative">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              );
            })}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Dropdown with enhanced styling */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-2 bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2 rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-300 border-2 border-green-500/30 hover:border-red-500/30 group"
              >
                <Globe size={18} className="text-green-400 group-hover:text-red-400 transition-colors duration-300" />
                <span className="font-medium">{currentLanguageName}</span>
                <ChevronDown size={16} className={`text-red-400 transition-all duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown Menu */}
              {langOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-black border-2 border-green-500/30 rounded-xl shadow-2xl py-2 overflow-hidden z-50">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-red-500 to-green-500"></div>
                  {languages.map((lang, index) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-3 transition-all duration-300 flex justify-between items-center group hover:bg-gradient-to-r hover:from-green-600 hover:to-red-600 ${
                        index !== languages.length - 1 ? 'border-b border-gray-800' : ''
                      }`}
                    >
                      <span className="text-white group-hover:text-white font-medium">{lang.name}</span>
                      <span className="text-sm text-gray-400 group-hover:text-white bg-gray-900 group-hover:bg-black/30 px-2 py-1 rounded-md">
                        {lang.native}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Login Button */}
            <Link to="/login">
              <button className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-semibold overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/30">
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative flex items-center">
                  <LogIn size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  {translations[currentLang].common.login}
                </span>
              </button>
            </Link>
          </div>

          {/* Mobile menu button with enhanced styling */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Login Button */}
            <Link to="/login">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold flex items-center shadow-lg shadow-green-500/20">
                <User size={16} className="mr-1" />
                {translations[currentLang].common.login}
              </button>
            </Link>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-lg border-2 border-green-500/30 hover:border-red-500/30 transition-all duration-300"
            >
              {isOpen ? 
                <X size={20} className="text-red-500" /> : 
                <Menu size={20} className="text-green-500" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation with enhanced styling */}
        {isOpen && (
          <div className="md:hidden py-4 border-t-2 border-red-600/30 mt-2">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.key}
                    to={item.href}
                    className="group flex items-center px-4 py-3 text-white hover:text-green-400 transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-gray-900 hover:to-black border border-transparent hover:border-green-500/30"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} className="mr-3 text-red-500 group-hover:text-green-400" />
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-auto text-green-500 group-hover:text-red-500 transition-colors duration-300">→</span>
                  </Link>
                );
              })}
              
              {/* Mobile Language Selector with enhanced styling */}
              <div className="pt-4 mt-2 border-t border-gray-800">
                <p className="text-gray-400 text-sm mb-3 flex items-center">
                  <Globe size={16} className="mr-2 text-green-500" />
                  {translations[currentLang].common.selectLanguage}:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang);
                        setIsOpen(false);
                      }}
                      className={`px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                        currentLang === lang.code
                          ? 'bg-gradient-to-r from-green-600 to-red-600 text-white border-transparent shadow-lg shadow-green-500/30'
                          : 'bg-gray-900 text-white border-gray-800 hover:border-green-500/30 hover:bg-gray-800'
                      }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;