import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowRight,
  Shield,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Instagram,
  Globe
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUserAction, clearErrors } from "../../actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticatedUser, user } = useSelector((state) => state.loginUser);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  // Language translations
  const translations = {
    en: {
      brandName: "watanhisaab",
      welcomeBack: "Welcome Back to",
      secureTrading: "Secure Trading",
      description: "Access your account to manage currency exchanges, track transactions, and enjoy competitive rates with enterprise-grade security.",
      features: [
        "Real-time exchange rates",
        "Secure 256-bit encryption",
        "Multi-currency support",
        "24/7 customer support"
      ],
      testimonial: {
        text: "\"The best currency exchange platform I've used. Fast, secure, and great rates!\"",
        name: "Mohammad Dawood",
        title: "Business Owner"
      },
      securityBadge: "ISO 27001 Certified • 256-bit Encryption",
      signInTitle: "Sign In",
      signInSubtitle: "Welcome back! Please enter your details",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot Password?",
      signingIn: "Signing in...",
      signIn: "Sign In",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      trustBadges: ["🔒 256-bit SSL", "🔐 2FA Available", "🛡️ Fraud Protection"],
      errors: {
        emailRequired: "Email is required",
        emailInvalid: "Email is invalid",
        passwordRequired: "Password is required",
        passwordMin: "Password must be at least 6 characters"
      },
      socialLogin: "Social login coming soon!"
    },
    ur: {
      brandName: "کرنسی ایکسچینج",
      welcomeBack: "خوش آمدید",
      secureTrading: "محفوظ تجارت",
      description: "کرنسی کے تبادلے کا نظم کرنے، لین دین کو ٹریک کرنے اور انٹرپرائز گریڈ سیکیورٹی کے ساتھ مسابقتی شرحوں سے لطف اندوز ہونے کے لیے اپنے اکاؤنٹ تک رسائی حاصل کریں۔",
      features: [
        "ریئل ٹائم ایکسچینج ریٹس",
        "محفوظ 256-bit خفیہ کاری",
        "متعدد کرنسیوں کی حمایت",
        "24/7 کسٹمر سپورٹ"
      ],
      testimonial: {
        text: "\"بہترین کرنسی ایکسچینج پلیٹ فارم جو میں نے استعمال کیا ہے۔ تیز، محفوظ، اور بہترین شرحیں!\"",
        name: "محمد رضوان",
        title: "کاروباری مالک"
      },
      securityBadge: "ISO 27001 مصدقہ • 256-bit خفیہ کاری",
      signInTitle: "سائن ان کریں",
      signInSubtitle: "خوش آمدید! براہ کرم اپنی تفصیلات درج کریں",
      emailLabel: "ای میل ایڈریس",
      emailPlaceholder: "اپنی ای میل درج کریں",
      passwordLabel: "پاس ورڈ",
      passwordPlaceholder: "اپنا پاس ورڈ درج کریں",
      rememberMe: "مجھے یاد رکھیں",
      forgotPassword: "پاس ورڈ بھول گئے؟",
      signingIn: "سائن ان ہو رہا ہے...",
      signIn: "سائن ان کریں",
      noAccount: "اکاؤنٹ نہیں ہے؟",
      signUp: "سائن اپ کریں",
      trustBadges: ["🔒 256-bit SSL", "🔐 2FA دستیاب", "🛡️ فراڈ تحفظ"],
      errors: {
        emailRequired: "ای میل درکار ہے",
        emailInvalid: "ای میل غلط ہے",
        passwordRequired: "پاس ورڈ درکار ہے",
        passwordMin: "پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے"
      },
      socialLogin: "سوشل لاگن جلد آرہا ہے!"
    },
    ps: {
      brandName: "اسعارو تبادله",
      welcomeBack: "ښه راغلاست",
      secureTrading: "خوندي سوداګري",
      description: "د اسعارو د تبادلې اداره کولو، راکړې ورکړې تعقیبولو، او د تصدۍ درجې امنیت سره سیالي نرخونو څخه خوند اخیستو لپاره خپل حساب ته لاسرسی ومومئ.",
      features: [
        "ریښتیني وخت د تبادلې نرخونه",
        "خوندي 256-bit کوډ کول",
        "د څو اسعارو ملاتړ",
        "24/7 د پیرودونکو ملاتړ"
      ],
      testimonial: {
        text: "\"د اسعارو د تبادلې غوره پلیټ فارم چې ما کارولی دی. چټک، خوندي، او ښه نرخونه!\"",
        name: "محمد رضوان",
        title: "سوداګر"
      },
      securityBadge: "ISO 27001 تصدیق شوی • 256-bit کوډ کول",
      signInTitle: "ننوتل",
      signInSubtitle: "ښه راغلاست! مهرباني وکړئ خپل معلومات دننه کړئ",
      emailLabel: "بریښنالیک آدرس",
      emailPlaceholder: "خپل بریښنالیک دننه کړئ",
      passwordLabel: "پاسورډ",
      passwordPlaceholder: "خپل پاسورډ دننه کړئ",
      rememberMe: "ما په یاد وساته",
      forgotPassword: "پاسورډ هیر شوی؟",
      signingIn: "ننوځي...",
      signIn: "ننوتل",
      noAccount: "حساب نلرئ؟",
      signUp: "حساب جوړ کړئ",
      trustBadges: ["🔒 256-bit SSL", "🔐 2FA شتون لري", "🛡️ د درغلۍ محافظت"],
      errors: {
        emailRequired: "بریښنالیک اړین دی",
        emailInvalid: "بریښنالیک ناسم دی",
        passwordRequired: "پاسورډ اړین دی",
        passwordMin: "پاسورډ باید لږ تر لږه 6 توري وي"
      },
      socialLogin: "ټولنیز ننوتل ژر راځي!"
    },
    fa: {
      brandName: "تبدیل ارز",
      welcomeBack: "خوش آمدید",
      secureTrading: "تجارت امن",
      description: "برای مدیریت تبادلات ارزی، پیگیری تراکنش‌ها و لذت بردن از نرخ‌های رقابتی با امنیت در سطح سازمانی، به حساب خود دسترسی پیدا کنید.",
      features: [
        "نرخ‌های لحظه‌ای ارز",
        "رمزنگاری امن 256 بیتی",
        "پشتیبانی از چندین ارز",
        "پشتیبانی مشتریان 24/7"
      ],
      testimonial: {
        text: "\"بهترین پلتفرم تبادل ارز که استفاده کرده‌ام. سریع، امن و نرخ‌های عالی!\"",
        name: "محمد رضوان",
        title: "صاحب کسب و کار"
      },
      securityBadge: "گواهی ISO 27001 • رمزنگاری 256 بیتی",
      signInTitle: "ورود",
      signInSubtitle: "خوش آمدید! لطفاً اطلاعات خود را وارد کنید",
      emailLabel: "آدرس ایمیل",
      emailPlaceholder: "ایمیل خود را وارد کنید",
      passwordLabel: "رمز عبور",
      passwordPlaceholder: "رمز عبور خود را وارد کنید",
      rememberMe: "مرا به خاطر بسپار",
      forgotPassword: "رمز عبور را فراموش کرده‌اید؟",
      signingIn: "در حال ورود...",
      signIn: "ورود",
      noAccount: "حساب کاربری ندارید؟",
      signUp: "ثبت نام",
      trustBadges: ["🔒 256-bit SSL", "🔐 2FA در دسترس", "🛡️ محافظت از کلاهبرداری"],
      errors: {
        emailRequired: "ایمیل الزامی است",
        emailInvalid: "ایمیل نامعتبر است",
        passwordRequired: "رمز عبور الزامی است",
        passwordMin: "رمز عبور باید حداقل 6 کاراکتر باشد"
      },
      socialLogin: "ورود با شبکه‌های اجتماعی به زودی!"
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

  // Handle successful login
  useEffect(() => {
    if (isAuthenticatedUser) {
      toast.success(`Welcome back, ${user?.profile?.fullName || user?.email || 'User'}!`);
      
      // Redirect based on role
      if (user?.role === 'customer') {
        navigate('/payment');
      } else if (user?.role === 'system_admin') {
        navigate('/system-admin-dashboard');
      } else {
        // All other roles: shop_admin, manager, cashier, etc.
        navigate('/dashboard');
      }
    }
  }, [isAuthenticatedUser, navigate, user]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      setLoginError(error);
      toast.error(error);
      dispatch(clearErrors());
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
      newErrors.email = t.errors.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.errors.emailInvalid;
    }
    if (!formData.password) {
      newErrors.password = t.errors.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = t.errors.passwordMin;
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setLoginError('');
      // Dispatch login action
      dispatch(loginUserAction(formData.email, formData.password));
    } else {
      setErrors(newErrors);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(t.socialLogin);
  };

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
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Features */}
          <motion.div
            variants={fadeInLeft}
            className="hidden lg:block relative"
          >
            <div className="relative z-10">
           

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t.welcomeBack}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">
                  {t.secureTrading}
                </span>
              </h1>

              <p className="text-gray-600 text-lg mb-8">
                {t.description}
              </p>

              {/* Feature List */}
              <div className="space-y-4 mb-8">
                {t.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                    style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <p className="text-gray-600 italic mb-4">
                  {t.testimonial.text}
                </p>
                <div className="flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center text-white font-bold">
                    MR
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.testimonial.name}</p>
                    <p className="text-sm text-gray-500">{t.testimonial.title}</p>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-8 flex items-center space-x-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-500">{t.securityBadge}</span>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -z-10">
              <div className="w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 -z-10">
              <div className="w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            variants={fadeInRight}
            className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.signInTitle}</h2>
              <p className="text-gray-600">{t.signInSubtitle}</p>
            </div>

            {/* Error Message */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3"
                style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600">{loginError}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                    placeholder={t.emailPlaceholder}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                    placeholder={t.passwordPlaceholder}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <label className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{t.rememberMe}</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  {t.forgotPassword}
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t.signingIn}</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>{t.signIn}</span>
                  </>
                )}
              </motion.button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600">
                {t.noAccount}{' '}
                <Link
                  to="/sign-up"
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors inline-flex items-center space-x-1"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <span>{t.signUp}</span>
                  <ArrowRight size={16} />
                </Link>
              </p>
            </form>

            {/* Trust Badges */}
            <div className={`mt-6 flex items-center justify-center space-x-4 text-xs text-gray-400 ${isRTL ? 'space-x-reverse' : ''}`}>
              {t.trustBadges.map((badge, index) => (
                <span key={index}>{badge}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default Login;