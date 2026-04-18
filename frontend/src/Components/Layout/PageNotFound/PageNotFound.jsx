import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Home,
  ArrowLeft,
  Search,
  AlertTriangle,
  Compass,
  MapPin,
  Globe,
  RefreshCw,
  CheckCircle ,
  Phone,
  Mail,
  HelpCircle,
  FileQuestion,
  Shield,
  Sparkles,
  ArrowRight,
  Coffee,
  Heart,
  Users
} from 'lucide-react';
import { useState, useEffect } from "react";

const PageNotFound = () => {
  // Get current language from localStorage
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load language only once on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && ['en', 'ur', 'ps', 'fa'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
    setIsInitialized(true);
  }, []);

  // Translations for 404 Page
  const translations = {
    en: {
      badge: "Page Not Found",
      title1: "Oops! You've wandered into",
      title2: "Unknown Territory",
      description: "The page you're looking for doesn't exist or has been moved. Don't worry, even the best explorers get lost sometimes.",
      backHome: "Back to Home",
      contactSupport: "Contact Support",
      quickTips: "Quick Tips to Find Your Way:",
      suggestions: [
        "Check the URL for typos",
        "Go back to the homepage",
        "Use the search bar",
        "Contact our support team",
        "Browse our sitemap"
      ],
      funFacts: [
        "The number 404 is an HTTP status code",
        "You're not lost, just exploring",
        "Every great journey starts somewhere",
        "Even the best explorers get lost sometimes",
        "This page is having a coffee break ☕"
      ],
      quickLinks: {
        home: "Home",
        aboutUs: "About Us",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
      },
      breakSection: {
        title: "Take a Break",
        description: "Grab a coffee while we fix this"
      },
      helpSection: {
        title: "Need Help?",
        description: "Our team is available 24/7"
      },
      exploreSection: {
        title: "Explore More",
        description: "Discover our other pages"
      }
    },
    ur: {
      badge: "صفحہ نہیں ملا",
      title1: "افسوس! آپ بھٹک کر",
      title2: "نامعلوم علاقے میں آ گئے ہیں",
      description: "آپ جس صفحہ کی تلاش کر رہے ہیں وہ موجود نہیں ہے یا اسے منتقل کر دیا گیا ہے۔ فکر نہ کریں، بہترین دریافت کنندگان بھی کبھی کبھار بھٹک جاتے ہیں۔",
      backHome: "ہوم پیج پر واپس جائیں",
      contactSupport: "سپورٹ سے رابطہ کریں",
      quickTips: "اپنا راستہ تلاش کرنے کے لیے فوری نکات:",
      suggestions: [
        "غلطیوں کے لیے URL چیک کریں",
        "ہوم پیج پر واپس جائیں",
        "سرچ بار استعمال کریں",
        "ہماری سپورٹ ٹیم سے رابطہ کریں",
        "ہمارا سائٹ میپ دیکھیں"
      ],
      funFacts: [
        "404 نمبر ایک HTTP سٹیٹس کوڈ ہے",
        "آپ گم نہیں ہوئے، بس تلاش کر رہے ہیں",
        "ہر عظیم سفر کا آغاز کہیں نہ کہیں سے ہوتا ہے",
        "بہترین دریافت کنندگان بھی کبھی کبھی گم ہو جاتے ہیں",
        "یہ صفحہ کافی بریک لے رہا ہے ☕"
      ],
      quickLinks: {
        home: "ہوم",
        aboutUs: "ہمارے بارے میں",
        contact: "رابطہ کریں",
        privacy: "پرائیویسی پالیسی",
        terms: "خدمات کی شرائط"
      },
      breakSection: {
        title: "آرام کریں",
        description: "جب ہم یہ ٹھیک کر رہے ہیں تو کافی پی لیں"
      },
      helpSection: {
        title: "مدد چاہیے؟",
        description: "ہماری ٹیم 24/7 دستیاب ہے"
      },
      exploreSection: {
        title: "مزید دریافت کریں",
        description: "ہمارے دوسرے صفحات دیکھیں"
      }
    },
    ps: {
      badge: "پاڼه ونه موندل شوه",
      title1: "اوه! تاسو ورک شوي یاست",
      title2: "نامعلومې سیمې ته",
      description: "هغه پاڼه چې تاسو یې په لټه کې یاست شتون نلري یا لیږدول شوې ده. اندیښنه مه کوئ، حتی غوره سپړونکي هم کله ناکله ورک کیږي.",
      backHome: "بیرته کور پاڼې ته",
      contactSupport: "د ملاتړ سره اړیکه ونیسئ",
      quickTips: "خپله لاره موندلو لپاره چټک لارښوونې:",
      suggestions: [
        "د غلطیو لپاره URL وګورئ",
        "بیرته کور پاڼې ته لاړ شئ",
        "د لټون بار وکاروئ",
        "زموږ د ملاتړ ټیم سره اړیکه ونیسئ",
        "زموږ سایټ نقشه وګورئ"
      ],
      funFacts: [
        "404 شمېره د HTTP حالت کوډ دی",
        "تاسو ورک نه یاست، یوازې سپړنه کوئ",
        "هر لوی سفر له کوم ځایه پیل کیږي",
        "حتی غوره سپړونکي هم کله ناکله ورک کیږي",
        "دا پاڼه د قهوې وقفه اخلي ☕"
      ],
      quickLinks: {
        home: "کور",
        aboutUs: "زموږ په اړه",
        contact: "اړیکه",
        privacy: "د محرمیت پالیسي",
        terms: "د خدماتو شرطونه"
      },
      breakSection: {
        title: "آرام وکړئ",
        description: "پداسې حال کې چې موږ دا حل کوو یو قهوه وڅښئ"
      },
      helpSection: {
        title: "مرستې ته اړتیا لرئ؟",
        description: "زموږ ټیم 24/7 شتون لري"
      },
      exploreSection: {
        title: "نور وپلټئ",
        description: "زموږ نورې پاڼې کشف کړئ"
      }
    },
    fa: {
      badge: "صفحه پیدا نشد",
      title1: "اوه! شما به منطقه‌ای",
      title2: "ناشناخته سرگردان شده‌اید",
      description: "صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است. نگران نباشید، حتی بهترین کاشفان نیز گاهی گم می‌شوند.",
      backHome: "بازگشت به صفحه اصلی",
      contactSupport: "تماس با پشتیبانی",
      quickTips: "نکات سریع برای پیدا کردن مسیر:",
      suggestions: [
        "URL را برای اشتباهات تایپی بررسی کنید",
        "به صفحه اصلی بازگردید",
        "از نوار جستجو استفاده کنید",
        "با تیم پشتیبانی ما تماس بگیرید",
        "نقه سایت ما را مرور کنید"
      ],
      funFacts: [
        "عدد 404 یک کد وضعیت HTTP است",
        "شما گم نشده‌اید، فقط در حال کاوش هستید",
        "هر سفر بزرگ از جایی شروع می‌شود",
        "حتی بهترین کاشفان نیز گاهی گم می‌شوند",
        "این صفحه در حال استراحت و نوشیدن قهوه است ☕"
      ],
      quickLinks: {
        home: "خانه",
        aboutUs: "درباره ما",
        contact: "تماس",
        privacy: "سیاست حفظ حریم خصوصی",
        terms: "شرایط خدمات"
      },
      breakSection: {
        title: "یک استراحت کنید",
        description: "در حالی که ما این مشکل را حل می‌کنیم یک قهوه بنوشید"
      },
      helpSection: {
        title: "نیاز به کمک دارید؟",
        description: "تیم ما 24/7 در دسترس است"
      },
      exploreSection: {
        title: "بیشتر کاوش کنید",
        description: "صفحات دیگر ما را کشف کنید"
      }
    }
  };

  const t = translations[currentLang] || translations.en;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatAnimation = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const quickLinks = [
    { name: t.quickLinks.home, path: "/", icon: Home, color: "green" },
    { name: t.quickLinks.aboutUs, path: "/about-us", icon: Users, color: "red" },
    { name: t.quickLinks.contact, path: "/contact-us", icon: Phone, color: "green" },
    { name: t.quickLinks.privacy, path: "/privacy", icon: Shield, color: "red" },
    { name: t.quickLinks.terms, path: "/terms", icon: FileQuestion, color: "green" }
  ];

  const suggestions = t.suggestions;
  const funFacts = t.funFacts;

  const [randomFact] = useState(funFacts[Math.floor(Math.random() * funFacts.length)]);

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-white overflow-hidden"
    >
      {/* Main 404 Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -50, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-80 h-80 bg-red-500/20 rounded-full blur-3xl"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Floating Numbers */}
          {['4', '0', '4', '?', '!', '#'].map((char, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl font-bold text-gray-200/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {char}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Number with Animation */}
            <motion.div
              variants={fadeInUp}
              className="relative mb-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-9xl md:text-9xl lg:text-9xl font-bold bg-gradient-to-r from-green-600 via-red-500 to-green-600 bg-clip-text text-transparent inline-block"
              >
                404
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div
                variants={floatAnimation}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl border border-green-500/30"
              >
                <Sparkles className="w-4 h-4 inline mr-1 text-yellow-500" />
                {t.badge}
              </motion.div>
            </motion.div>

            {/* Error Message */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
              dir={currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa' ? 'rtl' : 'ltr'}
            >
              {t.title1}
            </motion.h1>
            
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8"
              dir={currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa' ? 'rtl' : 'ltr'}
            >
              <span className="bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                {t.title2}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              dir={currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa' ? 'rtl' : 'ltr'}
            >
              {t.description}
            </motion.p>

            {/* Fun Fact */}
            <motion.div
              variants={scaleIn}
              className="bg-gray-50 rounded-2xl p-4 mb-10 inline-block border border-gray-200"
            >
              <div className="flex items-center space-x-2" dir={currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa' ? 'rtl' : 'ltr'}>
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-gray-600 text-sm">{randomFact}</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold overflow-hidden shadow-lg hover:shadow-xl hover:shadow-green-500/30"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    {t.backHome}
                  </span>
                </motion.button>
              </Link>
              
              <Link to="/contact-us">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-transparent border-2 border-green-500 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t.contactSupport}
                </motion.button>
              </Link>
            </motion.div>

            {/* Helpful Links Grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto"
            >
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link key={index} to={link.path}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-500/30 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
                    >
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-full bg-${link.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-5 h-5 text-${link.color}-600`} />
                      </div>
                      <span className="text-xs text-gray-600 group-hover:text-green-600 transition-colors">
                        {link.name}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>

            {/* Suggestions */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 text-left bg-gray-50 rounded-2xl p-6 border border-gray-200"
              dir={currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa' ? 'rtl' : 'ltr'}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Compass className="w-5 h-5 text-green-600 mr-2" />
                {t.quickTips}
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                    style={{ direction: currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa' ? 'rtl' : 'ltr' }}
                  >
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{suggestion}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Fun Navigation */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex justify-center space-x-4"
            >
              <motion.button
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                onClick={() => window.location.reload()}
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => window.history.back()}
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-10">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Compass className="w-16 h-16 text-gray-200/50" />
          </motion.div>
        </div>

        <div className="absolute top-10 right-10">
          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <MapPin className="w-12 h-12 text-gray-200/50" />
          </motion.div>
        </div>
      </section>

      {/* Coffee Break Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeInLeft}
              className="text-center"
              dir={currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa' ? 'rtl' : 'ltr'}
            >
              <Coffee className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">{t.breakSection.title}</h3>
              <p className="text-gray-400 text-sm">{t.breakSection.description}</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center"
              dir={currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa' ? 'rtl' : 'ltr'}
            >
              <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">{t.helpSection.title}</h3>
              <p className="text-gray-400 text-sm">{t.helpSection.description}</p>
            </motion.div>
            <motion.div
              variants={fadeInRight}
              className="text-center"
              dir={currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa' ? 'rtl' : 'ltr'}
            >
              <Globe className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">{t.exploreSection.title}</h3>
              <p className="text-gray-400 text-sm">{t.exploreSection.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default PageNotFound;