import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  Shield,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Server,
  Database,
  Users,
  Settings,
  Activity,
  Cpu,
  HardDrive,
  Globe,
  Mail,
  Phone,
  MapPin,
  Key,
  Fingerprint,
  UserCog,
  Briefcase,
  Building,
  Landmark,
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  Calendar,
  Zap,
  Award,
  Sparkles
} from 'lucide-react';
import { loginUserAction, clearErrors } from "../../actions/authActions";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticatedUser, user } = useSelector((state) => state.loginUser);
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    twoFactorCode: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Language translations
  const translations = {
    en: {
      // Header & Brand
      systemAdmin: "System Admin",
      enterprisePortal: "Enterprise Management Portal",
      secureAdmin: "Secure Administration",
      adminDesc: "Access the central management console to monitor system health, manage users, and configure enterprise settings.",
      
      // Stats
      activeUsers: "Active Users",
      serverUptime: "Server Uptime",
      dailyTransactions: "Daily Transactions",
      systemLoad: "System Load",
      stable: "Stable",
      normal: "Normal",
      
      // Security Features
      securityFeatures: "Security Features",
      twoFARequired: "2FA Required",
      encryption: "256-bit Encryption",
      roleBasedAccess: "Role-Based Access",
      auditLogs: "Audit Logs",
      
      // System Status
      allSystemsOperational: "All Systems Operational",
      lastChecked: "Last checked",
      
      // Login Form
      adminAccessOnly: "Admin Access Only",
      adminCredentials: "Enter your credentials to access the administrative dashboard",
      adminEmail: "Admin Email",
      password: "Password",
      twoFACode: "2FA Verification Code",
      rememberDevice: "Remember this device",
      accessDashboard: "Access Dashboard",
      authenticating: "Authenticating...",
      securedWith: "Secured with 256-bit encryption & 2FA",
      
      // 2FA Notice
      twoFANotice: "Two-factor authentication required. Enter the 6-digit code from your authenticator app.",
      
      // Quick Access
      systemVersion: "System Version",
      lastBackup: "Last Backup",
      
      // Errors
      emailRequired: "Email is required",
      emailInvalid: "Email is invalid",
      passwordRequired: "Password is required",
      passwordMin: "Password must be at least 6 characters",
      twoFACodeRequired: "2FA code is required",
      twoFACodeInvalid: "2FA code must be 6 digits",
      accessDenied: "Access denied. System admin privileges required.",
      
      // Success Messages
      welcomeBack: "Welcome back",
      
      // Placeholders
      emailPlaceholder: "admin@company.com",
      passwordPlaceholder: "Enter your password",
      twoFAPlaceholder: "••••••"
    },
    ur: {
      systemAdmin: "سسٹم ایڈمن",
      enterprisePortal: "انٹرپرائز مینجمنٹ پورٹل",
      secureAdmin: "محفوظ انتظامیہ",
      adminDesc: "سسٹم کی صحت کی نگرانی، صارفین کا نظم کرنے اور انٹرپرائز کی ترتیبات کو ترتیب دینے کے لیے مرکزی انتظامی کنسول تک رسائی حاصل کریں۔",
      
      activeUsers: "فعال صارفین",
      serverUptime: "سرور اپ ٹائم",
      dailyTransactions: "روزانہ لین دین",
      systemLoad: "سسٹم لوڈ",
      stable: "مستحکم",
      normal: "عام",
      
      securityFeatures: "سیکیورٹی فیچرز",
      twoFARequired: "2FA درکار ہے",
      encryption: "256-bit خفیہ کاری",
      roleBasedAccess: "کردار پر مبنی رسائی",
      auditLogs: "آڈٹ لاگز",
      
      allSystemsOperational: "تمام سسٹم کام کر رہے ہیں",
      lastChecked: "آخری چیک",
      
      adminAccessOnly: "صرف ایڈمن رسائی",
      adminCredentials: "انتظامی ڈیش بورڈ تک رسائی کے لیے اپنی اسناد درج کریں",
      adminEmail: "ایڈمن ای میل",
      password: "پاس ورڈ",
      twoFACode: "2FA تصدیقی کوڈ",
      rememberDevice: "یہ ڈیوائس یاد رکھیں",
      accessDashboard: "ڈیش بورڈ تک رسائی",
      authenticating: "تصدیق ہو رہی ہے...",
      securedWith: "256-bit خفیہ کاری اور 2FA کے ساتھ محفوظ",
      
      twoFANotice: "دو عوامل کی تصدیق درکار ہے۔ اپنے تصدیقی ایپ سے 6 ہندسوں کا کوڈ درج کریں۔",
      
      systemVersion: "سسٹم ورژن",
      lastBackup: "آخری بیک اپ",
      
      emailRequired: "ای میل درکار ہے",
      emailInvalid: "ای میل غلط ہے",
      passwordRequired: "پاس ورڈ درکار ہے",
      passwordMin: "پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے",
      twoFACodeRequired: "2FA کوڈ درکار ہے",
      twoFACodeInvalid: "2FA کوڈ 6 ہندسوں کا ہونا چاہیے",
      accessDenied: "رسائی سے انکار۔ سسٹم ایڈمن مراعات درکار ہیں۔",
      
      welcomeBack: "خوش آمدید",
      
      emailPlaceholder: "admin@company.com",
      passwordPlaceholder: "اپنا پاس ورڈ درج کریں",
      twoFAPlaceholder: "••••••"
    },
    ps: {
      systemAdmin: "سیسټم مدیر",
      enterprisePortal: "د تصدۍ مدیریت پورټل",
      secureAdmin: "خوندي اداره",
      adminDesc: "د سیسټم روغتیا څارنې، کاروونکو مدیریت، او د تصدۍ ترتیباتو تنظیمولو لپاره مرکزي مدیریت کنسول ته لاسرسی ومومئ.",
      
      activeUsers: "فعال کاروونکي",
      serverUptime: "سرور اپ ټایم",
      dailyTransactions: "ورځني راکړې ورکړې",
      systemLoad: "سیسټم بار",
      stable: "مستحکم",
      normal: "نورمال",
      
      securityFeatures: "امنیتي ځانګړتیاوې",
      twoFARequired: "2FA اړین دی",
      encryption: "256-bit کوډ کول",
      roleBasedAccess: "رول پر بنسټ لاسرسی",
      auditLogs: "آډټ لاګونه",
      
      allSystemsOperational: "ټول سیسټمونه فعال دي",
      lastChecked: "وروستی چک",
      
      adminAccessOnly: "یوازې مدیر لاسرسی",
      adminCredentials: "د مدیر ډشبورډ ته لاسرسي لپاره خپل اسناد دننه کړئ",
      adminEmail: "مدیر بریښنالیک",
      password: "پاسورډ",
      twoFACode: "2FA تایید کوډ",
      rememberDevice: "دا وسیله په یاد وساته",
      accessDashboard: "ډشبورډ ته لاسرسی",
      authenticating: "تایید کیږي...",
      securedWith: "د 256-bit کوډ کولو او 2FA سره خوندي شوی",
      
      twoFANotice: "دوه فاکتوره تایید اړینه ده. مهرباني وکړئ د خپل تصدیق اپلیکیشن څخه 6 عدده کوډ دننه کړئ.",
      
      systemVersion: "سیسټم نسخه",
      lastBackup: "وروستی بیک اپ",
      
      emailRequired: "بریښنالیک اړین دی",
      emailInvalid: "بریښنالیک ناسم دی",
      passwordRequired: "پاسورډ اړین دی",
      passwordMin: "پاسورډ باید لږ تر لږه 6 توري وي",
      twoFACodeRequired: "2FA کوډ اړین دی",
      twoFACodeInvalid: "2FA کوډ باید 6 عدد وي",
      accessDenied: "لاسرسی رد شو. د سیسټم مدیر امتیازات اړین دي.",
      
      welcomeBack: "ښه راغلاست",
      
      emailPlaceholder: "admin@company.com",
      passwordPlaceholder: "خپل پاسورډ دننه کړئ",
      twoFAPlaceholder: "••••••"
    },
    fa: {
      systemAdmin: "مدیر سیستم",
      enterprisePortal: "پورتال مدیریت سازمانی",
      secureAdmin: "مدیریت امن",
      adminDesc: "برای نظارت بر سلامت سیستم، مدیریت کاربران و پیکربندی تنظیمات سازمانی به کنسول مدیریت مرکزی دسترسی پیدا کنید.",
      
      activeUsers: "کاربران فعال",
      serverUptime: "زمان فعالیت سرور",
      dailyTransactions: "تراکنش‌های روزانه",
      systemLoad: "بار سیستم",
      stable: "پایدار",
      normal: "عادی",
      
      securityFeatures: "ویژگی‌های امنیتی",
      twoFARequired: "2FA لازم است",
      encryption: "رمزنگاری 256 بیتی",
      roleBasedAccess: "دسترسی مبتنی بر نقش",
      auditLogs: "گزارش‌های حسابرسی",
      
      allSystemsOperational: "همه سیستم‌ها عملیاتی هستند",
      lastChecked: "آخرین بررسی",
      
      adminAccessOnly: "دسترسی فقط مدیر",
      adminCredentials: "برای دسترسی به داشبورد مدیریت، مشخصات خود را وارد کنید",
      adminEmail: "ایمیل مدیر",
      password: "رمز عبور",
      twoFACode: "کد تأیید 2FA",
      rememberDevice: "این دستگاه را به خاطر بسپار",
      accessDashboard: "دسترسی به داشبورد",
      authenticating: "در حال احراز هویت...",
      securedWith: "امن با رمزنگاری 256 بیتی و 2FA",
      
      twoFANotice: "احراز هویت دو مرحله‌ای لازم است. کد 6 رقمی از برنامه احراز هویت خود را وارد کنید.",
      
      systemVersion: "نسخه سیستم",
      lastBackup: "آخرین پشتیبان‌گیری",
      
      emailRequired: "ایمیل الزامی است",
      emailInvalid: "ایمیل نامعتبر است",
      passwordRequired: "رمز عبور الزامی است",
      passwordMin: "رمز عبور باید حداقل 6 کاراکتر باشد",
      twoFACodeRequired: "کد 2FA الزامی است",
      twoFACodeInvalid: "کد 2FA باید 6 رقم باشد",
      accessDenied: "دسترسی رد شد. امتیازات مدیر سیستم لازم است.",
      
      welcomeBack: "خوش آمدید",
      
      emailPlaceholder: "admin@company.com",
      passwordPlaceholder: "رمز عبور خود را وارد کنید",
      twoFAPlaceholder: "••••••"
    }
  };

  // Get language from localStorage
  React.useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && ['en', 'ur', 'ps', 'fa'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
    setIsInitialized(true);
  }, []);

  const t = translations[currentLang] || translations.en;
  const isRTL = currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa';

  // System stats for visual appeal with translations
  const systemStats = [
    { label: t.activeUsers, value: '1,247', icon: Users, change: '+12%' },
    { label: t.serverUptime, value: '99.9%', icon: Server, change: t.stable },
    { label: t.dailyTransactions, value: '3,842', icon: Activity, change: '+8%' },
    { label: t.systemLoad, value: '42%', icon: Cpu, change: t.normal },
  ];

  // Security features list with translations
  const securityFeatures = [
    { icon: Fingerprint, text: t.twoFARequired },
    { icon: Lock, text: t.encryption },
    { icon: Key, text: t.roleBasedAccess },
    { icon: Eye, text: t.auditLogs },
  ];

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

  // Handle successful login and redirect to system admin dashboard
  React.useEffect(() => {
    if (isAuthenticatedUser && user) {
      // Check if user has system admin role
      if (user?.role === 'system_admin') {
        toast.success(`${t.welcomeBack}, ${user?.profile?.fullName || user?.email || 'Admin'}!`);
        navigate('/system-admin-dashboard');
      } else if (user?.role === 'shop_admin') {
        toast.error(t.accessDenied);
        navigate('/dashboard');
      } else if (user?.role === 'customer') {
        toast.error(t.accessDenied);
        navigate('/dashboard');
      } else {
        toast.error(t.accessDenied);
        navigate('/');
      }
    }
  }, [isAuthenticatedUser, navigate, user, t]);

  // Handle API errors
  React.useEffect(() => {
    if (error) {
      setLoginError(error);
      toast.error(error);
      dispatch(clearErrors());
      
      // If error indicates 2FA required, show 2FA field
      if (error.toLowerCase().includes('2fa') || error.toLowerCase().includes('two factor')) {
        setShowTwoFactor(true);
      }
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = t.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.emailInvalid;
    }
    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = t.passwordMin;
    }
    if (showTwoFactor && !formData.twoFactorCode) {
      newErrors.twoFactorCode = t.twoFACodeRequired;
    } else if (showTwoFactor && formData.twoFactorCode.length !== 6) {
      newErrors.twoFactorCode = t.twoFACodeInvalid;
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setLoginError('');
      
      // Prepare login data
      const loginData = {
        email: formData.email,
        password: formData.password,
        ...(showTwoFactor && { twoFactorCode: formData.twoFactorCode })
      };
      
      // Dispatch login action
      dispatch(loginUserAction(loginData.email, loginData.password));
    } else {
      setErrors(newErrors);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e10_1px,transparent_1px),linear-gradient(to_bottom,#22c55e10_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -50, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-500/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - System Admin Info */}
          <motion.div
            variants={fadeInLeft}
            className="hidden lg:block"
          >
            <div className="text-white space-y-8">
              {/* Logo */}
              <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{t.systemAdmin}</h1>
                  <p className="text-gray-400">{t.enterprisePortal}</p>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="space-y-4">
                <h2 className="text-4xl font-bold leading-tight">
                  {t.secureAdmin}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-red-400">
                    Administration
                  </span>
                </h2>
                <p className="text-gray-300 text-lg">
                  {t.adminDesc}
                </p>
              </div>

              {/* System Stats */}
              <div className="grid grid-cols-2 gap-4">
                {systemStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      custom={index}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                    >
                      <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Icon className="w-5 h-5 text-green-500" />
                        <span className="text-xs text-green-500">{stat.change}</span>
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Security Features */}
              <div className="space-y-3">
                <h3 className={`font-semibold flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  {t.securityFeatures}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {securityFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className={`flex items-center space-x-2 text-sm text-gray-300 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Icon size={14} className="text-green-500" />
                        <span>{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">{t.allSystemsOperational}</span>
                  </div>
                  <span className="text-xs text-gray-400">{t.lastChecked}: 2 min ago</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Admin Login Form */}
          <motion.div
            variants={fadeInRight}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{t.adminAccessOnly}</h2>
              <p className="text-gray-300 text-sm">
                {t.adminCredentials}
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-500">{loginError}</p>
              </motion.div>
            )}

            {/* 2FA Notice */}
            {showTwoFactor && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-xl flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <Shield className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <p className="text-sm text-blue-500">
                  {t.twoFANotice}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.adminEmail}
                </label>
                <div className="relative">
                  <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-white/10 border ${
                      errors.email ? 'border-red-500' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                    placeholder={t.emailPlaceholder}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.password}
                </label>
                <div className="relative">
                  <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 bg-white/10 border ${
                      errors.password ? 'border-red-500' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                    placeholder={t.passwordPlaceholder}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* 2FA Code Field */}
              {showTwoFactor && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.twoFACode}
                  </label>
                  <div className="relative">
                    <Fingerprint className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                    <input
                      type="text"
                      name="twoFactorCode"
                      value={formData.twoFactorCode}
                      onChange={handleChange}
                      maxLength="6"
                      className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-white/10 border ${
                        errors.twoFactorCode ? 'border-red-500' : 'border-white/20'
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-center tracking-widest font-mono text-xl`}
                      placeholder={t.twoFAPlaceholder}
                    />
                  </div>
                  {errors.twoFactorCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.twoFactorCode}</p>
                  )}
                </motion.div>
              )}

              {/* Remember Me */}
              <div className={`flex items-center ${isRTL ? 'justify-end' : 'justify-between'}`}>
                <label className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 bg-white/10 border-white/20 rounded text-green-500 focus:ring-green-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-300">{t.rememberDevice}</span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-green-500/25"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t.authenticating}</span>
                  </>
                ) : (
                  <>
                    <Shield size={18} />
                    <span>{t.accessDashboard}</span>
                  </>
                )}
              </motion.button>

              {/* Security Note */}
              <div className="text-center">
                <p className={`text-xs text-gray-400 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Lock size={12} className="mr-1" />
                  {t.securedWith}
                </p>
              </div>
            </form>

            {/* Quick Access Info */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div>
                  <p className="text-gray-400">{t.systemVersion}</p>
                  <p className="text-white font-medium">v3.2.1</p>
                </div>
                <div>
                  <p className="text-gray-400">{t.lastBackup}</p>
                  <p className="text-white font-medium">2 {t.lastChecked === "Last checked" ? "hours ago" : "گھنٹے پہلے"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLogin;