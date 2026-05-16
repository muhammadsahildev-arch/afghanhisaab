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
  CheckCircle,
  AlertCircle,
  DollarSign
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
      brandName: "Money Exchange",
      welcomeBack: "Welcome Back",
      signInTitle: "Sign In",
      signInSubtitle: "Enter your credentials to access your account",
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
      trustBadges: ["🔒 Secure", "🔐 2FA", "🛡️ Protected"],
      errors: {
        emailRequired: "Email is required",
        emailInvalid: "Invalid email format",
        passwordRequired: "Password is required",
        passwordMin: "Password must be at least 6 characters"
      }
    },
    ur: {
      brandName: "منی ایکسچینج",
      welcomeBack: "خوش آمدید",
      signInTitle: "سائن ان",
      signInSubtitle: "اپنے اکاؤنٹ تک رسائی کے لیے اپنی تفصیلات درج کریں",
      emailLabel: "ای میل",
      emailPlaceholder: "اپنی ای میل درج کریں",
      passwordLabel: "پاس ورڈ",
      passwordPlaceholder: "اپنا پاس ورڈ درج کریں",
      rememberMe: "مجھے یاد رکھیں",
      forgotPassword: "پاس ورڈ بھول گئے؟",
      signingIn: "سائن ان ہو رہا ہے...",
      signIn: "سائن ان",
      noAccount: "اکاؤنٹ نہیں ہے؟",
      signUp: "سائن اپ",
      trustBadges: ["🔒 محفوظ", "🔐 2FA", "🛡️ تحفظ"],
      errors: {
        emailRequired: "ای میل درکار ہے",
        emailInvalid: "غلط ای میل فارمیٹ",
        passwordRequired: "پاس ورڈ درکار ہے",
        passwordMin: "پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے"
      }
    },
    ps: {
      brandName: "منی ایکسچینج",
      welcomeBack: "ښه راغلاست",
      signInTitle: "ننوتل",
      signInSubtitle: "خپل حساب ته لاسرسی لپاره خپل معلومات دننه کړئ",
      emailLabel: "بریښنالیک",
      emailPlaceholder: "خپل بریښنالیک دننه کړئ",
      passwordLabel: "پاسورډ",
      passwordPlaceholder: "خپل پاسورډ دننه کړئ",
      rememberMe: "ما په یاد وساته",
      forgotPassword: "پاسورډ هیر شوی؟",
      signingIn: "ننوځي...",
      signIn: "ننوتل",
      noAccount: "حساب نلرئ؟",
      signUp: "حساب جوړ کړئ",
      trustBadges: ["🔒 خوندي", "🔐 2FA", "🛡️ محافظت"],
      errors: {
        emailRequired: "بریښنالیک اړین دی",
        emailInvalid: "غلط بریښنالیک بڼه",
        passwordRequired: "پاسورډ اړین دی",
        passwordMin: "پاسورډ باید لږ تر لږه 6 توري وي"
      }
    },
    fa: {
      brandName: "منی ایکسچینج",
      welcomeBack: "خوش آمدید",
      signInTitle: "ورود",
      signInSubtitle: "برای دسترسی به حساب خود اطلاعات خود را وارد کنید",
      emailLabel: "ایمیل",
      emailPlaceholder: "ایمیل خود را وارد کنید",
      passwordLabel: "رمز عبور",
      passwordPlaceholder: "رمز عبور خود را وارد کنید",
      rememberMe: "مرا به خاطر بسپار",
      forgotPassword: "رمز عبور را فراموش کرده‌اید؟",
      signingIn: "در حال ورود...",
      signIn: "ورود",
      noAccount: "حساب کاربری ندارید؟",
      signUp: "ثبت نام",
      trustBadges: ["🔒 امن", "🔐 2FA", "🛡️ محافظت"],
      errors: {
        emailRequired: "ایمیل الزامی است",
        emailInvalid: "فرمت ایمیل نامعتبر است",
        passwordRequired: "رمز عبور الزامی است",
        passwordMin: "رمز عبور باید حداقل 6 کاراکتر باشد"
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

  // Handle successful login
  useEffect(() => {
    if (isAuthenticatedUser) {
      toast.success(`Welcome back, ${user?.profile?.fullName || user?.email || 'User'}!`);
      
      if (user?.role === 'customer') {
        navigate('/payment');
      } else if (user?.role === 'system_admin') {
        navigate('/system-admin-dashboard');
      } else {
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
      dispatch(loginUserAction(formData.email, formData.password));
    } else {
      setErrors(newErrors);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
    

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-md">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t.welcomeBack}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.signInSubtitle}</p>
          </div>

          {/* Error Message */}
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2"
              style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-xs text-red-600 dark:text-red-400">{loginError}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500`} size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-gray-50 dark:bg-gray-900 border ${
                      errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                    } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                    placeholder={t.emailPlaceholder}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500`} size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 bg-gray-50 dark:bg-gray-900 border ${
                      errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                    } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                    placeholder={t.passwordPlaceholder}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t.rememberMe}</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 font-medium"
                >
                  {t.forgotPassword}
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {t.noAccount}{' '}
                <Link
                  to="/sign-up"
                  className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 inline-flex items-center gap-1"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <span>{t.signUp}</span>
                  <ArrowRight size={14} />
                </Link>
              </p>
            </form>

            {/* Trust Badges */}
            <div className={`mt-6 flex items-center justify-center gap-3 text-xs text-gray-400 dark:text-gray-500`}>
              {t.trustBadges.map((badge, index) => (
                <span key={index}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;