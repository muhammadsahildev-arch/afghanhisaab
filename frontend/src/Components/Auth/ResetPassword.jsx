import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield,
  Sparkles,
  Key,
  Smartphone,
  Mail,
  Clock,
  RefreshCw,
  ArrowRight 
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPasswordAction, clearErrors } from "../../actions/authActions";

// Language Translations
const translations = {
  en: {
    // Header & Navigation
    backToLogin: "Back to Login",
    resetPassword: "Reset Password",
    resetPasswordDesc: "Enter your new password below to reset your account password",
    
    // Form Labels
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    newPasswordPlaceholder: "Enter new password",
    confirmPasswordPlaceholder: "Confirm new password",
    
    // Password Strength
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    
    // Password Requirements
    lengthRequirement: "At least 8 characters long",
    uppercaseRequirement: "Contains uppercase letter",
    lowercaseRequirement: "Contains lowercase letter",
    numberRequirement: "Contains number",
    specialCharRequirement: "Contains special character",
    
    // Password Tips
    passwordTips: "Password Tips:",
    tip1: "Don't use personal information like your name or birthdate",
    tip2: "Avoid common words or sequential characters",
    tip3: "Make it at least 8 characters long",
    tip4: "Use a mix of different character types",
    
    // Security Tips
    securityTips: "Security Tips",
    tipUnique: "Use a unique password you haven't used elsewhere",
    tipMix: "Mix uppercase, lowercase, numbers, and symbols",
    tipRegular: "Change your password regularly",
    tip2FA: "Enable two-factor authentication for extra security",
    
    // Buttons
    resetPasswordBtn: "Reset Password",
    resetting: "Resetting Password...",
    goToLogin: "Go to Login",
    
    // Success Message
    successTitle: "Password Reset Successful!",
    successMessage: "Your password has been successfully reset. You'll be redirected to the login page in a few seconds.",
    
    // Errors
    newPasswordRequired: "New password is required",
    passwordMinLength: "Password must be at least 8 characters",
    passwordTooWeak: "Password is too weak",
    confirmPasswordRequired: "Please confirm your password",
    passwordsDoNotMatch: "Passwords do not match",
    invalidOrMissingToken: "Invalid or missing reset token",
    
    // Info Messages
    linkExpiryInfo: "This password reset link will expire in 24 hours",
    didntRequest: "Didn't request a password reset?",
    contactSupport: "Contact Support",
    needHelp: "Need help?",
    
    // Brand
    brandName: "CurrencyExchange",
    
    // Trust Badges
    sslEncryption: "256-bit SSL",
    encrypted: "Encrypted",
    secure: "Secure",
    
    // Left Side Header
    resetYourPassword: "Reset Your",
    password: "Password",
    createStrongPassword: "Create a strong, unique password to keep your account secure. Follow these security tips:"
  },
  ur: {
    // Header & Navigation
    backToLogin: "لاگ ان پر واپس",
    resetPassword: "پاس ورڈ دوبارہ ترتیب دیں",
    resetPasswordDesc: "اپنا اکاؤنٹ پاس ورڈ دوبارہ ترتیب دینے کے لیے نیچے نیا پاس ورڈ درج کریں",
    
    // Form Labels
    newPassword: "نیا پاس ورڈ",
    confirmNewPassword: "نئے پاس ورڈ کی تصدیق کریں",
    newPasswordPlaceholder: "نیا پاس ورڈ درج کریں",
    confirmPasswordPlaceholder: "نئے پاس ورڈ کی تصدیق کریں",
    
    // Password Strength
    weak: "کمزور",
    medium: "درمیانہ",
    strong: "مضبوط",
    
    // Password Requirements
    lengthRequirement: "کم از کم 8 حروف طویل",
    uppercaseRequirement: "بڑے حرف پر مشتمل ہے",
    lowercaseRequirement: "چھوٹے حرف پر مشتمل ہے",
    numberRequirement: "عدد پر مشتمل ہے",
    specialCharRequirement: "خاص حرف پر مشتمل ہے",
    
    // Password Tips
    passwordTips: "پاس ورڈ کے نکات:",
    tip1: "اپنی ذاتی معلومات جیسے نام یا تاریخ پیدائش استعمال نہ کریں",
    tip2: "عام الفاظ یا ترتیب وار حروف سے گریز کریں",
    tip3: "اسے کم از کم 8 حروف طویل بنائیں",
    tip4: "مختلف قسم کے حروف کا مرکب استعمال کریں",
    
    // Security Tips
    securityTips: "حفاظتی نکات",
    tipUnique: "ایک منفرد پاس ورڈ استعمال کریں جو آپ نے کہیں اور استعمال نہ کیا ہو",
    tipMix: "بڑے، چھوٹے حروف، اعداد اور علامات مکس کریں",
    tipRegular: "اپنا پاس ورڈ باقاعدگی سے تبدیل کریں",
    tip2FA: "اضافی حفاظت کے لیے دو عنصری تصدیق کو فعال کریں",
    
    // Buttons
    resetPasswordBtn: "پاس ورڈ دوبارہ ترتیب دیں",
    resetting: "پاس ورڈ دوبارہ ترتیب دیا جا رہا ہے...",
    goToLogin: "لاگ ان پر جائیں",
    
    // Success Message
    successTitle: "پاس ورڈ کامیابی سے دوبارہ ترتیب دیا گیا!",
    successMessage: "آپ کا پاس ورڈ کامیابی سے دوبارہ ترتیب دیا گیا ہے۔ آپ کو چند سیکنڈ میں لاگ ان صفحہ پر بھیج دیا جائے گا۔",
    
    // Errors
    newPasswordRequired: "نیا پاس ورڈ درکار ہے",
    passwordMinLength: "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے",
    passwordTooWeak: "پاس ورڈ بہت کمزور ہے",
    confirmPasswordRequired: "براہ کرم اپنے پاس ورڈ کی تصدیق کریں",
    passwordsDoNotMatch: "پاس ورڈز مماثل نہیں ہیں",
    invalidOrMissingToken: "غلط یا گم شدہ ری سیٹ ٹوکن",
    
    // Info Messages
    linkExpiryInfo: "یہ پاس ورڈ ری سیٹ لنک 24 گھنٹے میں ختم ہو جائے گا",
    didntRequest: "پاس ورڈ ری سیٹ کی درخواست نہیں کی؟",
    contactSupport: "سپورٹ سے رابطہ کریں",
    needHelp: "مدد درکار ہے؟",
    
    // Brand
    brandName: "کرنسی ایکسچینج",
    
    // Trust Badges
    sslEncryption: "256-bit SSL",
    encrypted: "خفیہ کردہ",
    secure: "محفوظ",
    
    // Left Side Header
    resetYourPassword: "اپنا",
    password: "پاس ورڈ دوبارہ ترتیب دیں",
    createStrongPassword: "اپنے اکاؤنٹ کو محفوظ رکھنے کے لیے ایک مضبوط، منفرد پاس ورڈ بنائیں۔ ان حفاظتی نکات پر عمل کریں:"
  },
  ps: {
    // Header & Navigation
    backToLogin: "بیرته ننوتلو ته",
    resetPassword: "پاسورډ بیا تنظیم کړئ",
    resetPasswordDesc: "خپل حساب پاسورډ بیا تنظیم کولو لپاره لاندې نوی پاسورډ دننه کړئ",
    
    // Form Labels
    newPassword: "نوی پاسورډ",
    confirmNewPassword: "نوی پاسورډ تایید کړئ",
    newPasswordPlaceholder: "نوی پاسورډ دننه کړئ",
    confirmPasswordPlaceholder: "نوی پاسورډ تایید کړئ",
    
    // Password Strength
    weak: "کمزوری",
    medium: "منځنۍ",
    strong: "قوي",
    
    // Password Requirements
    lengthRequirement: "لږ تر لږه 8 توري اوږد",
    uppercaseRequirement: "لوی توری لري",
    lowercaseRequirement: "وړوکی توری لري",
    numberRequirement: "شمیره لري",
    specialCharRequirement: "ځانګړی توری لري",
    
    // Password Tips
    passwordTips: "د پاسورډ لارښوونې:",
    tip1: "شخصي معلومات لکه خپل نوم یا د زیږون نیټه مه کاروئ",
    tip2: "عام لغتونه یا پرله پسې توري مه کاروئ",
    tip3: "لږ تر لږه 8 توري یې جوړ کړئ",
    tip4: "د مختلفو توریو ترکیب وکاروئ",
    
    // Security Tips
    securityTips: "د امنیت لارښوونې",
    tipUnique: "یو ځانګړی پاسورډ وکاروئ چې تاسو بل چیرې نه دی کارولی",
    tipUniqueAr: "یو ځانګړی پاسورډ وکاروئ",
    tipMix: "لوی، وړوکی توري، شمیرې او نښانې مخلوط کړئ",
    tipRegular: "خپل پاسورډ په منظم ډول بدل کړئ",
    tip2FA: "د اضافي امنیت لپاره دوه اړخیزه تصدیق فعاله کړئ",
    
    // Buttons
    resetPasswordBtn: "پاسورډ بیا تنظیم کړئ",
    resetting: "پاسورډ بیا تنظیم کیږي...",
    goToLogin: "ننوتلو ته لاړ شئ",
    
    // Success Message
    successTitle: "پاسورډ په بریالیتوب سره بیا تنظیم شو!",
    successMessage: "ستاسو پاسورډ په بریالیتوب سره بیا تنظیم شو. تاسو به په څو ثانیو کې ننوتلو پاڼې ته ولیږدول شئ.",
    
    // Errors
    newPasswordRequired: "نوی پاسورډ اړین دی",
    passwordMinLength: "پاسورډ باید لږ تر لږه 8 توري وي",
    passwordTooWeak: "پاسورډ ډیر کمزوری دی",
    confirmPasswordRequired: "مهرباني وکړئ خپل پاسورډ تایید کړئ",
    passwordsDoNotMatch: "پاسورډونه سره سمون نه خوري",
    invalidOrMissingToken: "غلط یا ورک شوی بیا تنظیم ټوکن",
    
    // Info Messages
    linkExpiryInfo: "د پاسورډ بیا تنظیم لینک به په 24 ساعتونو کې ختم شي",
    didntRequest: "د پاسورډ بیا تنظیم غوښتنه نه ده کړې؟",
    contactSupport: "مرستې سره اړیکه ونیسئ",
    needHelp: "مرستې ته اړتیا لرئ؟",
    
    // Brand
    brandName: "کرنسی تبادله",
    
    // Trust Badges
    sslEncryption: "256-bit SSL",
    encrypted: "کوډ شوی",
    secure: "خوندي",
    
    // Left Side Header
    resetYourPassword: "خپل",
    password: "پاسورډ بیا تنظیم کړئ",
    createStrongPassword: "خپل حساب خوندي ساتلو لپاره یو قوي، ځانګړی پاسورډ جوړ کړئ. د دې امنیت لارښوونو تعقیب کړئ:"
  },
  fa: {
    // Header & Navigation
    backToLogin: "بازگشت به ورود",
    resetPassword: "بازنشانی رمز عبور",
    resetPasswordDesc: "برای بازنشانی رمز عبور حساب خود، رمز عبور جدید خود را در زیر وارد کنید",
    
    // Form Labels
    newPassword: "رمز عبور جدید",
    confirmNewPassword: "تأیید رمز عبور جدید",
    newPasswordPlaceholder: "رمز عبور جدید را وارد کنید",
    confirmPasswordPlaceholder: "رمز عبور جدید را تأیید کنید",
    
    // Password Strength
    weak: "ضعیف",
    medium: "متوسط",
    strong: "قوی",
    
    // Password Requirements
    lengthRequirement: "حداقل 8 کاراکتر",
    uppercaseRequirement: "شامل حرف بزرگ",
    lowercaseRequirement: "شامل حرف کوچک",
    numberRequirement: "شامل عدد",
    specialCharRequirement: "شامل کاراکتر ویژه",
    
    // Password Tips
    passwordTips: "نکات رمز عبور:",
    tip1: "از اطلاعات شخصی مانند نام یا تاریخ تولد استفاده نکنید",
    tip2: "از کلمات رایج یا کاراکترهای متوالی خودداری کنید",
    tip3: "آن را حداقل 8 کاراکتر کنید",
    tip4: "از ترکیب انواع مختلف کاراکترها استفاده کنید",
    
    // Security Tips
    securityTips: "نکات امنیتی",
    tipUnique: "از رمز عبوری استفاده کنید که قبلاً در جای دیگری استفاده نکرده‌اید",
    tipMix: "حروف بزرگ، کوچک، اعداد و نمادها را ترکیب کنید",
    tipRegular: "رمز عبور خود را مرتباً تغییر دهید",
    tip2FA: "برای امنیت بیشتر، احراز هویت دو مرحله‌ای را فعال کنید",
    
    // Buttons
    resetPasswordBtn: "بازنشانی رمز عبور",
    resetting: "در حال بازنشانی رمز عبور...",
    goToLogin: "رفتن به ورود",
    
    // Success Message
    successTitle: "رمز عبور با موفقیت بازنشانی شد!",
    successMessage: "رمز عبور شما با موفقیت بازنشانی شد. در چند ثانیه به صفحه ورود هدایت خواهید شد.",
    
    // Errors
    newPasswordRequired: "رمز عبور جدید الزامی است",
    passwordMinLength: "رمز عبور باید حداقل 8 کاراکتر باشد",
    passwordTooWeak: "رمز عبور بسیار ضعیف است",
    confirmPasswordRequired: "لطفاً رمز عبور خود را تأیید کنید",
    passwordsDoNotMatch: "رمزهای عبور مطابقت ندارند",
    invalidOrMissingToken: "توکن بازنشانی نامعتبر یا موجود نیست",
    
    // Info Messages
    linkExpiryInfo: "این لینک بازنشانی رمز عبور در 24 ساعت منقضی می‌شود",
    didntRequest: "درخواست بازنشانی رمز عبور نداده‌اید؟",
    contactSupport: "تماس با پشتیبانی",
    needHelp: "نیاز به کمک دارید؟",
    
    // Brand
    brandName: "تبدیل ارز",
    
    // Trust Badges
    sslEncryption: "SSL 256 بیتی",
    encrypted: "رمزگذاری شده",
    secure: "امن",
    
    // Left Side Header
    resetYourPassword: "رمز عبور خود را",
    password: "بازنشانی کنید",
    createStrongPassword: "برای ایمن نگه داشتن حساب خود، یک رمز عبور قوی و منحصر به فرد ایجاد کنید. این نکات امنیتی را دنبال کنید:"
  }
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { loading, error, success } = useSelector((state) => state.forgotPassword);

  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // Get language from localStorage
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
      setIsSuccess(true);
      toast.success(t.successTitle);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [success, navigate, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[!@#$%^&*]/.test(password)) strength += 25;
    setPasswordStrength(Math.min(strength, 100));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = t.newPasswordRequired;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = t.passwordMinLength;
    } else if (passwordStrength < 50) {
      newErrors.newPassword = t.passwordTooWeak;
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.confirmPasswordRequired;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordsDoNotMatch;
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if token exists
    if (!token) {
      setApiError(t.invalidOrMissingToken);
      return;
    }
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setApiError('');
      // Dispatch reset password action
      dispatch(resetPasswordAction(token, formData.newPassword));
    } else {
      setErrors(newErrors);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 50) return t.weak;
    if (passwordStrength < 75) return t.medium;
    return t.strong;
  };

  const passwordRequirements = [
    { text: t.lengthRequirement, met: formData.newPassword.length >= 8 },
    { text: t.uppercaseRequirement, met: /[A-Z]/.test(formData.newPassword) },
    { text: t.lowercaseRequirement, met: /[a-z]/.test(formData.newPassword) },
    { text: t.numberRequirement, met: /\d/.test(formData.newPassword) },
    { text: t.specialCharRequirement, met: /[!@#$%^&*]/.test(formData.newPassword) }
  ];

  // Security tips
  const securityTips = [
    { icon: Shield, text: t.tipUnique },
    { icon: Key, text: t.tipMix },
    { icon: Clock, text: t.tipRegular },
    { icon: Smartphone, text: t.tip2FA }
  ];

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={`max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start ${isRTL ? 'lg:grid-cols-2' : ''}`}>
        {/* Left Side - Security Tips & Branding */}
        <motion.div
          variants={fadeInLeft}
          className="hidden lg:block sticky top-24"
        >
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white">
            {/* Logo */}
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} mb-8`}>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">FX</span>
              </div>
              <span className="text-2xl font-bold">
                Currency<span className="text-green-400">Exchange</span>
              </span>
            </div>

            <h2 className={`text-2xl font-bold mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t.resetYourPassword}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-red-400">
                {t.password}
              </span>
            </h2>

            <p className={`text-gray-300 mb-8 ${isRTL ? 'text-right' : ''}`}>
              {t.createStrongPassword}
            </p>

            {/* Security Tips List */}
            <div className="space-y-6 mb-8">
              {securityTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className={`text-sm text-gray-300 ${isRTL ? 'text-right' : ''}`}>{tip.text}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-gray-800">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-400">{t.sslEncryption}</span>
                </div>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Lock className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-400">{t.encrypted}</span>
                </div>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-400">{t.secure}</span>
                </div>
              </div>
            </div>

            {/* Support Contact */}
            <div className="mt-8 bg-white/5 rounded-xl p-4">
              <p className={`text-sm text-gray-400 mb-2 ${isRTL ? 'text-right' : ''}`}>{t.needHelp}</p>
              <a 
                href="mailto:support@currencyexchange.com"
                className={`text-green-500 hover:text-green-400 text-sm flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}
              >
                <Mail size={14} />
                <span>support@currencyexchange.com</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Reset Password Form */}
        <motion.div
          variants={fadeInRight}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
            {/* Back to Login Link */}
            <Link
              to="/login"
              className={`inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-6 ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}
            >
              <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
              <span>{t.backToLogin}</span>
            </Link>

            {!isSuccess ? (
              <>
                {/* Header */}
                <div className={`text-center mb-8 ${isRTL ? 'text-right' : ''}`}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <Key className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.resetPassword}</h2>
                  <p className="text-gray-600 text-sm">
                    {t.resetPasswordDesc}
                  </p>
                </div>

                {/* Error Message */}
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-600">{apiError}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* New Password Field */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.newPassword} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className={`w-full ${isRTL ? 'pr-10 pl-12 text-right' : 'pl-10 pr-12'} py-3 border ${
                          errors.newPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.newPasswordPlaceholder}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    {/* Password Strength Meter */}
                    {formData.newPassword && (
                      <div className="mt-3">
                        <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} space-x-1 flex-1`}>
                            <div className={`h-2 flex-1 rounded-l-full ${passwordStrength >= 25 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                            <div className={`h-2 flex-1 ${passwordStrength >= 50 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                            <div className={`h-2 flex-1 ${passwordStrength >= 75 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                            <div className={`h-2 flex-1 rounded-r-full ${passwordStrength >= 100 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                          </div>
                          <span className={`text-xs font-medium ml-2 ${
                            passwordStrength < 50 ? 'text-red-500' : passwordStrength < 75 ? 'text-yellow-500' : 'text-green-500'
                          }`}>
                            {getPasswordStrengthText()}
                          </span>
                        </div>

                        {/* Password Requirements */}
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {passwordRequirements.map((req, index) => (
                            <div key={index} className={`flex items-center text-xs ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}>
                              {req.met ? (
                                <CheckCircle size={12} className="text-green-500" />
                              ) : (
                                <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                              )}
                              <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {errors.newPassword && (
                      <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : ''}`}>{errors.newPassword}</p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.confirmNewPassword} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full ${isRTL ? 'pr-10 pl-12 text-right' : 'pl-10 pr-12'} py-3 border ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.confirmPasswordPlaceholder}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : ''}`}>{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Password Tips */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h4 className={`text-sm font-semibold text-blue-800 mb-2 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <Sparkles className="w-4 h-4 mr-1" />
                      {t.passwordTips}
                    </h4>
                    <ul className={`space-y-1 text-xs text-blue-700 ${isRTL ? 'text-right' : ''}`}>
                      <li>• {t.tip1}</li>
                      <li>• {t.tip2}</li>
                      <li>• {t.tip3}</li>
                      <li>• {t.tip4}</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        <span>{t.resetting}</span>
                      </>
                    ) : (
                      <>
                        <Key size={18} />
                        <span>{t.resetPasswordBtn}</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Password Reset Link Info */}
                <div className="mt-6 text-center">
                  <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>
                    {t.linkExpiryInfo}
                  </p>
                </div>
              </>
            ) : (
              /* Success Message */
              <motion.div
                variants={scaleIn}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t.successTitle}
                </h3>
                <p className={`text-gray-600 mb-6 ${isRTL ? 'text-right' : ''}`}>
                  {t.successMessage}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-2 rounded-full bg-gradient-to-r from-green-500 to-red-500"
                  />
                </div>

                <Link
                  to="/login"
                  className={`inline-flex items-center text-green-600 hover:text-green-700 font-semibold ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}
                >
                  <span>{t.goToLogin}</span>
                  <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>
              {t.didntRequest}{' '}
              <Link
                to="/contact-us"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                {t.contactSupport}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResetPassword;