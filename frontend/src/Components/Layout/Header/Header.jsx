import { useState, useEffect } from 'react';
import { Globe, ChevronDown, Download } from 'lucide-react';
import logo from '../../../assets/logo.png'

const Header = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'en';
  });
  
  // PWA Install states
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Check if app is already installed
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(isStandalone);
    
    if (isStandalone) {
      setShowInstallButton(false);
    }
  }, []);

  // Handle PWA install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setShowInstallButton(false);
      setDeferredPrompt(null);
      setIsInstalled(true);
    });

    const timer = setTimeout(() => {
      if (!showInstallButton && !isInstalled) {
        setShowInstallButton(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, [showInstallButton, isInstalled]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallButton(false);
      }
      setDeferredPrompt(null);
    } else {
      alert('Click the browser menu (3 dots) and select "Install App" or "Add to Home Screen"');
    }
  };

  const translations = {
    en: {
      logoFirstPart: 'Watan',
      logoSecondPart: 'Hisaab',
      install: 'Install'
    },
    ur: {
      logoFirstPart: 'وطن',
      logoSecondPart: 'حساب',
      install: 'انسٹال'
    },
    ps: {
      logoFirstPart: 'وطن',
      logoSecondPart: 'حساب',
      install: 'نصب'
    },
    fa: {
      logoFirstPart: 'وطن',
      logoSecondPart: 'حساب',
      install: 'نصب'
    }
  };

  const languages = [
    { code: 'en', name: 'English', native: 'EN' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'ps', name: 'Pashto', native: 'پښتو' },
    { code: 'fa', name: 'Persian', native: 'فارسی' }
  ];

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang.code);
    localStorage.setItem('appLanguage', lang.code);
    setLangOpen(false);
    window.location.reload();
  };

  const currentLanguageName = languages.find(lang => lang.code === currentLang)?.native || 'EN';
  const t = translations[currentLang];

  return (
    <header className="bg-black shadow-2xl relative z-50 border-b-2 border-red-600">
      <div className="px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Left Side */}
          <div className="flex items-center flex-shrink-0 gap-2 sm:gap-3">
            <img 
              src={logo} 
              alt="WatanHisaab Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain rounded-lg sm:rounded-xl shadow-lg shadow-green-500/20"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm sm:text-base md:text-lg leading-tight">
                {t.logoFirstPart}
                <span className="text-green-400">{t.logoSecondPart}</span>
              </span>
            </div>
          </div>

          {/* Language & Install Buttons - Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Install App Button - Mobile Optimized */}
            {showInstallButton && !isInstalled && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95"
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{t.install}</span>
                <span className="xs:hidden">📱</span>
              </button>
            )}

            {/* Language Dropdown - Mobile Optimized */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-gray-900 to-black text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-green-500/30 active:scale-95 transition-all duration-300"
              >
                <Globe size={14} className="sm:w-4 sm:h-4 text-green-400" />
                <span className="font-medium">{currentLanguageName}</span>
                <ChevronDown size={12} className={`sm:w-4 sm:h-4 text-red-400 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu - Mobile Friendly */}
              {langOpen && (
                <>
                  {/* Backdrop for mobile */}
                  <div 
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setLangOpen(false)}
                  />
                  
                  <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-black border border-green-500/30 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="py-1 sm:py-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang)}
                          className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between ${
                            currentLang === lang.code
                              ? 'bg-gradient-to-r from-green-600 to-red-600'
                              : 'hover:bg-gray-900'
                          }`}
                        >
                          <span className="text-white text-sm sm:text-base font-medium">{lang.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-md ${
                            currentLang === lang.code
                              ? 'bg-white/20 text-white'
                              : 'bg-gray-800 text-gray-400'
                          }`}>
                            {lang.native}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;