import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, Users, Settings, Bell, Menu, X, Shield, Mail,
  Lock, Eye, EyeOff, CheckCircle, AlertCircle, Key, Save, RefreshCw,
  ArrowLeft, User, Building, CreditCard, BarChart3, Store, Banknote
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { updatePasswordAction, clearErrors } from "../../actions/authActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/constants";

const AdminUpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.updatePassword);
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [apiError, setApiError] = useState('');

  // Language translations
  const translations = {
    en: {
      backToDashboard: "Back to Dashboard",
      securitySettings: "Security Settings",
      updatePassword: "Update Password",
      updatePasswordDesc: "Change your administrator password",
      changePassword: "Change Password",
      changePasswordDesc: "Update your password to keep your account secure",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      currentPasswordPlaceholder: "Enter current password",
      newPasswordPlaceholder: "Enter new password",
      confirmPasswordPlaceholder: "Confirm new password",
      updateButton: "Update Password",
      updating: "Updating...",
      cancel: "Cancel",
      passwordStrength: {
        weak: "Weak",
        medium: "Medium",
        strong: "Strong"
      },
      passwordHint: "Use at least 8 characters with uppercase, lowercase, and numbers",
      passwordMatch: "Passwords match",
      passwordMismatch: "Passwords do not match",
      requirementsTitle: "Password Requirements",
      requirements: [
        "At least 8 characters",
        "Contains lowercase letter",
        "Contains uppercase letter",
        "Contains number"
      ],
      securityTipsTitle: "Security Tips",
      securityTips: [
        "Never share your password with anyone",
        "Use a unique password not used elsewhere",
        "Change your password every 90 days",
        "Enable two-factor authentication for extra security"
      ],
      successMessage: "Password updated successfully! Redirecting to dashboard...",
      errors: {
        currentPasswordRequired: "Current password is required",
        newPasswordRequired: "New password is required",
        passwordMinLength: "Password must be at least 8 characters",
        confirmPasswordRequired: "Please confirm your password",
        passwordsDoNotMatch: "Passwords do not match"
      },
      navItems: {
        dashboard: "Dashboard",
        paymentApprovals: "Payment Approvals",
        usersManagement: "Users Management",
        shopsManagement: "Shops Management",
        transactions: "Transactions",
        settings: "Settings"
      },
      role: {
        title: "Super Admin",
        subtitle: "Administrator"
      }
    },
    ur: {
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      securitySettings: "سیکیورٹی سیٹنگز",
      updatePassword: "پاس ورڈ اپ ڈیٹ کریں",
      updatePasswordDesc: "اپنا ایڈمنسٹریٹر پاس ورڈ تبدیل کریں",
      changePassword: "پاس ورڈ تبدیل کریں",
      changePasswordDesc: "اپنے اکاؤنٹ کو محفوظ رکھنے کے لیے پاس ورڈ اپ ڈیٹ کریں",
      currentPassword: "موجودہ پاس ورڈ",
      newPassword: "نیا پاس ورڈ",
      confirmPassword: "نیا پاس ورڈ تصدیق کریں",
      currentPasswordPlaceholder: "موجودہ پاس ورڈ درج کریں",
      newPasswordPlaceholder: "نیا پاس ورڈ درج کریں",
      confirmPasswordPlaceholder: "نیا پاس ورڈ تصدیق کریں",
      updateButton: "پاس ورڈ اپ ڈیٹ کریں",
      updating: "اپ ڈیٹ ہو رہا ہے...",
      cancel: "منسوخ کریں",
      passwordStrength: {
        weak: "کمزور",
        medium: "درمیانہ",
        strong: "مضبوط"
      },
      passwordHint: "کم از کم 8 حروف استعمال کریں جن میں بڑے، چھوٹے حروف اور نمبر شامل ہوں",
      passwordMatch: "پاس ورڈز مماثل ہیں",
      passwordMismatch: "پاس ورڈز مماثل نہیں ہیں",
      requirementsTitle: "پاس ورڈ کی ضروریات",
      requirements: [
        "کم از کم 8 حروف",
        "چھوٹے حرف شامل ہوں",
        "بڑے حرف شامل ہوں",
        "نمبر شامل ہو"
      ],
      securityTipsTitle: "سیکیورٹی کے نکات",
      securityTips: [
        "اپنا پاس ورڈ کسی کے ساتھ شیئر نہ کریں",
        "ایک منفرد پاس ورڈ استعمال کریں جو کہیں اور استعمال نہ کیا گیا ہو",
        "ہر 90 دن بعد پاس ورڈ تبدیل کریں",
        "اضافی سیکیورٹی کے لیے دو عنصر کی تصدیق فعال کریں"
      ],
      successMessage: "پاس ورڈ کامیابی سے اپ ڈیٹ ہو گیا! ڈیش بورڈ پر واپس جا رہے ہیں...",
      errors: {
        currentPasswordRequired: "موجودہ پاس ورڈ درکار ہے",
        newPasswordRequired: "نیا پاس ورڈ درکار ہے",
        passwordMinLength: "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے",
        confirmPasswordRequired: "براہ کرم اپنے پاس ورڈ کی تصدیق کریں",
        passwordsDoNotMatch: "پاس ورڈز مماثل نہیں ہیں"
      },
      navItems: {
        dashboard: "ڈیش بورڈ",
        paymentApprovals: "ادائیگی کی منظوریاں",
        usersManagement: "صارفین کا نظم",
        shopsManagement: "دکانوں کا نظم",
        transactions: "لین دین",
        settings: "ترتیبات"
      },
      role: {
        title: "سپر ایڈمن",
        subtitle: "ایڈمنسٹریٹر"
      }
    },
    ps: {
      backToDashboard: "بیرته ډشبورډ ته",
      securitySettings: "امنیتي ترتیبات",
      updatePassword: "پاسورډ تازه کړئ",
      updatePasswordDesc: "خپل مدیر پاسورډ بدل کړئ",
      changePassword: "پاسورډ بدل کړئ",
      changePasswordDesc: "خپل حساب خوندي ساتلو لپاره پاسورډ تازه کړئ",
      currentPassword: "اوسنی پاسورډ",
      newPassword: "نوی پاسورډ",
      confirmPassword: "نوی پاسورډ تایید کړئ",
      currentPasswordPlaceholder: "اوسنی پاسورډ دننه کړئ",
      newPasswordPlaceholder: "نوی پاسورډ دننه کړئ",
      confirmPasswordPlaceholder: "نوی پاسورډ تایید کړئ",
      updateButton: "پاسورډ تازه کړئ",
      updating: "تازه کیږي...",
      cancel: "لغوه کړئ",
      passwordStrength: {
        weak: "کمزوری",
        medium: "منځنی",
        strong: "قوي"
      },
      passwordHint: "لږ تر لږه 8 توري وکاروئ چې لوی، کوچني توري او شمیرې پکې شامل وي",
      passwordMatch: "پاسورډونه سره سمون لري",
      passwordMismatch: "پاسورډونه سره سمون نه لري",
      requirementsTitle: "د پاسورډ اړتیاوې",
      requirements: [
        "لږ تر لږه 8 توري",
        "کوچنی توری ولري",
        "لوی توری ولري",
        "شمیره ولري"
      ],
      securityTipsTitle: "امنیتي لارښوونې",
      securityTips: [
        "خپل پاسورډ له چا سره شریک نه کړئ",
        "یو ځانګړی پاسورډ وکاروئ چې بل چیرې نه وي کارول شوی",
        "هر 90 ورځو کې خپل پاسورډ بدل کړئ",
        "د اضافي امنیت لپاره دوه مرحلې تصدیق فعال کړئ"
      ],
      successMessage: "پاسورډ په بریالیتوب سره تازه شو! ډشبورډ ته لیږدول کیږي...",
      errors: {
        currentPasswordRequired: "اوسنی پاسورډ اړین دی",
        newPasswordRequired: "نوی پاسورډ اړین دی",
        passwordMinLength: "پاسورډ باید لږ تر لږه 8 توري وي",
        confirmPasswordRequired: "مهرباني وکړئ خپل پاسورډ تایید کړئ",
        passwordsDoNotMatch: "پاسورډونه سره سمون نه لري"
      },
      navItems: {
        dashboard: "ډشبورډ",
        paymentApprovals: "د تادیاتو تصویبونه",
        usersManagement: "د کاروونکو مدیریت",
        shopsManagement: "د پلورنځیو مدیریت",
        transactions: "راکړې ورکړې",
        settings: "ترتیبات"
      },
      role: {
        title: "سپر ایډمین",
        subtitle: "مدیر"
      }
    },
    fa: {
      backToDashboard: "بازگشت به داشبورد",
      securitySettings: "تنظیمات امنیتی",
      updatePassword: "به‌روزرسانی رمز عبور",
      updatePasswordDesc: "رمز عبور مدیر خود را تغییر دهید",
      changePassword: "تغییر رمز عبور",
      changePasswordDesc: "رمز عبور خود را برای حفظ امنیت حساب به‌روزرسانی کنید",
      currentPassword: "رمز عبور فعلی",
      newPassword: "رمز عبور جدید",
      confirmPassword: "تایید رمز عبور جدید",
      currentPasswordPlaceholder: "رمز عبور فعلی را وارد کنید",
      newPasswordPlaceholder: "رمز عبور جدید را وارد کنید",
      confirmPasswordPlaceholder: "رمز عبور جدید را تایید کنید",
      updateButton: "به‌روزرسانی رمز عبور",
      updating: "در حال به‌روزرسانی...",
      cancel: "لغو",
      passwordStrength: {
        weak: "ضعیف",
        medium: "متوسط",
        strong: "قوی"
      },
      passwordHint: "حداقل از 8 کاراکتر شامل حروف بزرگ، کوچک و اعداد استفاده کنید",
      passwordMatch: "رمزهای عبور مطابقت دارند",
      passwordMismatch: "رمزهای عبور مطابقت ندارند",
      requirementsTitle: "الزامات رمز عبور",
      requirements: [
        "حداقل 8 کاراکتر",
        "شامل حروف کوچک",
        "شامل حروف بزرگ",
        "شامل عدد"
      ],
      securityTipsTitle: "نکات امنیتی",
      securityTips: [
        "هرگز رمز عبور خود را با کسی به اشتراک نگذارید",
        "از رمز عبوری استفاده کنید که در جای دیگری استفاده نشده است",
        "هر 90 روز یکبار رمز عبور خود را تغییر دهید",
        "برای امنیت بیشتر احراز هویت دو مرحله‌ای را فعال کنید"
      ],
      successMessage: "رمز عبور با موفقیت به‌روزرسانی شد! در حال انتقال به داشبورد...",
      errors: {
        currentPasswordRequired: "رمز عبور فعلی الزامی است",
        newPasswordRequired: "رمز عبور جدید الزامی است",
        passwordMinLength: "رمز عبور باید حداقل 8 کاراکتر باشد",
        confirmPasswordRequired: "لطفاً رمز عبور خود را تایید کنید",
        passwordsDoNotMatch: "رمزهای عبور مطابقت ندارند"
      },
      navItems: {
        dashboard: "داشبورد",
        paymentApprovals: "تاییدیه‌های پرداخت",
        usersManagement: "مدیریت کاربران",
        shopsManagement: "مدیریت فروشگاه‌ها",
        transactions: "تراکنش‌ها",
        settings: "تنظیمات"
      },
      role: {
        title: "مدیر کل",
        subtitle: "مدیر سیستم"
      }
    }
  };

  // Get language from localStorage
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && ['en', 'ur', 'ps', 'fa'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
    setIsInitialized(true);
  }, []);

  const t = translations[currentLang] || translations.en;
  const isRTL = currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Handle API errors
  useEffect(() => {
    if (error) {
      setApiError(error);
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  // Handle success
  useEffect(() => {
    if (success) {
      toast.success('Password updated successfully!');
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordStrength(0);
      setPasswordMatch(null);
      setApiError('');
      
      // Reset update password state
      dispatch({ type: UPDATE_PASSWORD_RESET });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/system-admin-dashboard');
      }, 2000);
    }
  }, [success, navigate, dispatch]);

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[!@#$%^&*]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear API error when user starts typing
    if (apiError) {
      setApiError('');
    }
    
    // Check password strength for new password
    if (name === 'newPassword') {
      setPasswordStrength(calculatePasswordStrength(value));
      // Check if new password matches confirm password
      if (formData.confirmPassword) {
        setPasswordMatch(value === formData.confirmPassword);
      }
    }
    
    // Check confirm password match
    if (name === 'confirmPassword') {
      setPasswordMatch(value === formData.newPassword);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = t.errors.currentPasswordRequired;
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = t.errors.newPasswordRequired;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = t.errors.passwordMinLength;
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.errors.confirmPasswordRequired;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t.errors.passwordsDoNotMatch;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Dispatch update password action
    dispatch(updatePasswordAction({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    }));
  };

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    navigate('/system-admin-dashboard');
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 50) return t.passwordStrength.weak;
    if (passwordStrength < 75) return t.passwordStrength.medium;
    return t.passwordStrength.strong;
  };

  const navItems = [
    { id: 'dashboard', name: t.navItems.dashboard, icon: Home, path: '/system-admin-dashboard' },
    { id: 'payments', name: t.navItems.paymentApprovals, icon: Banknote, path: '/admin/payments' },
    { id: 'users', name: t.navItems.usersManagement, icon: Users, path: '/admin/users' },
    { id: 'shops', name: t.navItems.shopsManagement, icon: Store, path: '/admin/shops' },
    { id: 'transactions', name: t.navItems.transactions, icon: CreditCard, path: '/admin/transactions' },
    { id: 'settings', name: t.navItems.settings, icon: Settings, path: '/admin/settings' },
  ];

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Content */}
      <main className="transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header with Back Button */}
          <div className="mb-6 sm:mb-8">
            {/* Back to Dashboard Button */}
            <button
              onClick={handleBackToDashboard}
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors mb-4 group"
              style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>{t.backToDashboard}</span>
            </button>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Key className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs sm:text-sm font-medium text-green-500">{t.securitySettings}</span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{t.updatePassword}</h1>
                <p className="text-sm text-gray-400 mt-1">{t.updatePasswordDesc}</p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <div className="relative">
                  <button className="p-2 hover:bg-gray-800 rounded-xl transition-colors relative">
                    <Bell size={18} className="text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base">
                    SA
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-semibold text-white">{t.role.title}</p>
                    <p className="text-xs text-gray-400">{t.role.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Update Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-green-600 to-red-600 px-4 sm:px-6 py-4">
                <h2 className="text-base sm:text-lg font-semibold text-white flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t.changePassword}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mt-1">{t.changePasswordDesc}</p>
              </div>

              {/* API Error Message */}
              {apiError && (
                <div className="mx-4 sm:mx-6 mt-4 sm:mt-6 p-3 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-red-500">{apiError}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mx-4 sm:mx-6 mt-4 sm:mt-6 p-3 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-green-500">{t.successMessage}</p>
                </div>
              )}

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.currentPassword} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-500`} size={18} />
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-2.5 sm:py-3 bg-gray-700 border ${
                        errors.currentPassword ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all text-sm sm:text-base`}
                      placeholder={t.currentPasswordPlaceholder}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300`}
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <AlertCircle size={12} />
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.newPassword} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Key className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-500`} size={18} />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-2.5 sm:py-3 bg-gray-700 border ${
                        errors.newPassword ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all text-sm sm:text-base`}
                      placeholder={t.newPasswordPlaceholder}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300`}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  {/* Password Strength Meter */}
                  {formData.newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex space-x-1 flex-1">
                          <div className={`h-2 flex-1 rounded-l-full ${passwordStrength >= 25 ? getPasswordStrengthColor() : 'bg-gray-600'}`} />
                          <div className={`h-2 flex-1 ${passwordStrength >= 50 ? getPasswordStrengthColor() : 'bg-gray-600'}`} />
                          <div className={`h-2 flex-1 ${passwordStrength >= 75 ? getPasswordStrengthColor() : 'bg-gray-600'}`} />
                          <div className={`h-2 flex-1 rounded-r-full ${passwordStrength >= 100 ? getPasswordStrengthColor() : 'bg-gray-600'}`} />
                        </div>
                        <span className={`text-xs font-medium ml-2 ${
                          passwordStrength < 50 ? 'text-red-500' : passwordStrength < 75 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{t.passwordHint}</p>
                    </div>
                  )}
                  {errors.newPassword && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <AlertCircle size={12} />
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.confirmPassword} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-500`} size={18} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-2.5 sm:py-3 bg-gray-700 border ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all text-sm sm:text-base`}
                      placeholder={t.confirmPasswordPlaceholder}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300`}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {formData.confirmPassword && passwordMatch !== null && (
                    <div className="mt-2">
                      {passwordMatch ? (
                        <p className="text-xs text-green-500 flex items-center gap-1" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <CheckCircle size={12} />
                          {t.passwordMatch}
                        </p>
                      ) : (
                        <p className="text-xs text-red-500 flex items-center gap-1" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <AlertCircle size={12} />
                          {t.passwordMismatch}
                        </p>
                      )}
                    </div>
                  )}
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <AlertCircle size={12} />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-700/50 rounded-xl p-3 sm:p-4 border border-gray-600">
                  <h3 className="text-xs sm:text-sm font-semibold text-white mb-2 flex items-center gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Shield size={14} className="text-green-500" />
                    {t.requirementsTitle}
                  </h3>
                  <ul className="space-y-1 text-xs text-gray-400">
                    {t.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        {formData.newPassword.length >= 8 && idx === 0 ? <CheckCircle size={12} className="text-green-500" /> :
                         /[a-z]/.test(formData.newPassword) && idx === 1 ? <CheckCircle size={12} className="text-green-500" /> :
                         /[A-Z]/.test(formData.newPassword) && idx === 2 ? <CheckCircle size={12} className="text-green-500" /> :
                         /\d/.test(formData.newPassword) && idx === 3 ? <CheckCircle size={12} className="text-green-500" /> :
                         <AlertCircle size={12} className="text-gray-500" />}
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2 sm:pt-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <button
                    type="submit"
                    disabled={loading || success}
                    className="flex-1 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t.updating}
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        {t.updateButton}
                      </>
                    )}
                  </button>
                  
                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={handleBackToDashboard}
                    className="px-4 py-2.5 sm:py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-all text-sm sm:text-base"
                  >
                    {t.cancel}
                  </button>
                </div>
              </form>

              {/* Security Tips */}
              <div className="bg-gray-700/30 px-4 sm:px-6 py-4 border-t border-gray-700">
                <div className="flex items-start gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <div className="p-2 bg-yellow-500/20 rounded-lg flex-shrink-0">
                    <AlertCircle size={16} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white">{t.securityTipsTitle}</p>
                    <ul className="text-xs text-gray-400 mt-1 space-y-1">
                      {t.securityTips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminUpdatePassword;