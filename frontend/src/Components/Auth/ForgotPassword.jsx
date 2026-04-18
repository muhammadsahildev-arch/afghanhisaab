import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { 
  Mail,
  ArrowLeft,
  Send,
  CheckCircle,
  AlertCircle,
  Shield,
  Sparkles
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPasswordAction, clearErrors } from "../../actions/authActions";
import { FORGOT_PASSWORD_RESET } from "../../constants/constants";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localError, setLocalError] = useState('');

  // Language translations
  const translations = {
    en: {
      title: "Forgot Password?",
      subtitle: "No worries! Enter your email and we'll send you reset instructions.",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      sending: "Sending...",
      sendButton: "Send Reset Instructions",
      successTitle: "Check Your Email",
      successMessage: "We've sent password reset instructions to:",
      didntReceive: "Didn't receive the email? Check your spam folder or",
      tryAgain: "try again",
      backToLogin: "Back to Login",
      securityNote: "We take your security seriously. This link will expire in 24 hours and can only be used once.",
      trustBadge: "Protected by enterprise-grade security • 256-bit SSL Encryption"
    },
    ur: {
      title: "پاس ورڈ بھول گئے؟",
      subtitle: "فکر نہ کریں! اپنی ای میل درج کریں اور ہم آپ کو دوبارہ ترتیب دینے کی ہدایات بھیجیں گے۔",
      emailLabel: "ای میل ایڈریس",
      emailPlaceholder: "اپنی ای میل درج کریں",
      emailRequired: "ای میل درکار ہے",
      emailInvalid: "براہ کرم ایک درست ای میل ایڈریس درج کریں",
      sending: "بھیجا جا رہا ہے...",
      sendButton: "دوبارہ ترتیب دینے کی ہدایات بھیجیں",
      successTitle: "اپنی ای میل چیک کریں",
      successMessage: "ہم نے پاس ورڈ دوبارہ ترتیب دینے کی ہدایات بھیج دی ہیں:",
      didntReceive: "ای میل موصول نہیں ہوئی؟ اپنے سپیم فولڈر کو چیک کریں یا",
      tryAgain: "دوبارہ کوشش کریں",
      backToLogin: "لاگ ان پر واپس جائیں",
      securityNote: "ہم آپ کی سیکیورٹی کو سنجیدگی سے لیتے ہیں۔ یہ لنک 24 گھنٹوں میں ختم ہو جائے گا اور صرف ایک بار استعمال کیا جا سکتا ہے۔",
      trustBadge: "انٹرپرائز گریڈ سیکیورٹی کے ذریعے محفوظ • 256-bit SSL خفیہ کاری"
    },
    ps: {
      title: "پاسورډ هیر شوی؟",
      subtitle: "اندیښنه مه کوئ! خپل بریښنالیک دننه کړئ او موږ به تاسو ته د بیا تنظیمولو لارښوونې واستوو.",
      emailLabel: "بریښنالیک آدرس",
      emailPlaceholder: "خپل بریښنالیک دننه کړئ",
      emailRequired: "بریښنالیک اړین دی",
      emailInvalid: "مهرباني وکړئ یو سم بریښنالیک آدرس دننه کړئ",
      sending: "لیږل کیږي...",
      sendButton: "د بیا تنظیمولو لارښوونې واستوئ",
      successTitle: "خپل بریښنالیک وګورئ",
      successMessage: "موږ د پاسورډ بیا تنظیمولو لارښوونې لیږلي دي:",
      didntReceive: "بریښنالیک مو نه دی ترلاسه کړی؟ خپل سپیم فولډر وګورئ یا",
      tryAgain: "بیا هڅه وکړئ",
      backToLogin: "بیرته ننوتلو ته",
      securityNote: "موږ ستاسو امنیت په جدي توګه نیسو. دا لینک به د 24 ساعتونو وروسته ختم شي او یوازې یو ځل کارول کیدی شي.",
      trustBadge: "د تصدۍ درجې امنیت لخوا خوندي • 256-bit SSL کوډ کول"
    },
    fa: {
      title: "رمز عبور را فراموش کرده‌اید؟",
      subtitle: "نگران نباشید! ایمیل خود را وارد کنید تا دستورالعمل بازنشانی را برای شما ارسال کنیم.",
      emailLabel: "آدرس ایمیل",
      emailPlaceholder: "ایمیل خود را وارد کنید",
      emailRequired: "ایمیل الزامی است",
      emailInvalid: "لطفاً یک آدرس ایمیل معتبر وارد کنید",
      sending: "در حال ارسال...",
      sendButton: "ارسال دستورالعمل بازنشانی",
      successTitle: "ایمیل خود را بررسی کنید",
      successMessage: "ما دستورالعمل بازنشانی رمز عبور را به این آدرس ارسال کرده‌ایم:",
      didntReceive: "ایمیل را دریافت نکرده‌اید؟ پوشه اسپم خود را بررسی کنید یا",
      tryAgain: "دوباره تلاش کنید",
      backToLogin: "بازگشت به ورود",
      securityNote: "ما امنیت شما را جدی می‌گیریم. این لینک پس از 24 ساعت منقضی می‌شود و فقط یک بار قابل استفاده است.",
      trustBadge: "محافظت شده توسط امنیت در سطح سازمانی • رمزنگاری 256-bit SSL"
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

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  // Handle success
  useEffect(() => {
    if (success) {
      setIsSubmitted(true);
      toast.success(message || "Password reset instructions sent to your email!");
    }
  }, [success, message]);

  // Clean up on unmount - reset forgot password state
  useEffect(() => {
    return () => {
      dispatch({ type: FORGOT_PASSWORD_RESET });
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Local validation
    if (!email) {
      setLocalError(t.emailRequired);
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError(t.emailInvalid);
      return;
    }

    setLocalError('');
    
    // Dispatch forgot password action
    dispatch(forgotPasswordAction(email));
  };

  const handleResend = () => {
    setIsSubmitted(false);
    setLocalError('');
    // Reset the forgot password state before resending
    dispatch({ type: FORGOT_PASSWORD_RESET });
    dispatch(clearErrors());
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
      className="min-h-screen bg-white overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-md w-full">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-red-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
            <p className="text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {!isSubmitted ? (
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
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (localError) setLocalError('');
                    }}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border ${
                      localError ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                    placeholder={t.emailPlaceholder}
                  />
                </div>
                {localError && (
                  <p className={`mt-1 text-sm text-red-600 flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-1`}>
                    <AlertCircle size={14} />
                    <span>{localError}</span>
                  </p>
                )}
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
                    <span>{t.sending}</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>{t.sendButton}</span>
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            /* Success Message */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.successTitle}</h3>
              <p className="text-gray-600 mb-6">
                {t.successMessage}<br />
                <span className="font-semibold text-gray-900">{email}</span>
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  {t.didntReceive}{' '}
                  <button
                    onClick={handleResend}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    {t.tryAgain}
                  </button>
                </p>
                <Link
                  to="/login"
                  className="inline-block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  {t.backToLogin}
                </Link>
              </div>
            </motion.div>
          )}

          {/* Security Note */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className={`flex items-start ${isRTL ? 'space-x-reverse' : ''} space-x-3`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-xs text-gray-500">
                {t.securityNote}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            {t.trustBadge}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;