// src/Components/SignUp.jsx
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUserAction, clearErrors } from "../../actions/authActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, user } = useSelector((state) => state.loginUser);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Translations
  const translations = {
    en: {
      title: "Create Account",
      subtitle: "Join thousands of happy customers",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      passwordPlaceholder: "Create a strong password",
      confirmPlaceholder: "Confirm your password",
      agreeTerms: "I agree to the Terms of Service and Privacy Policy",
      createAccount: "Create Account",
      creating: "Creating Account...",
      signIn: "Sign in",
      alreadyAccount: "Already have an account?",
      required: "*",
      fullNameRequired: "Full name is required",
      emailRequired: "Email is required",
      emailInvalid: "Enter a valid email",
      phoneRequired: "Phone number is required",
      phoneInvalid: "Enter a valid phone number",
      passwordRequired: "Create a password",
      passwordMin: "Password must be at least 8 characters",
      passwordMismatch: "Passwords do not match",
      agreeTermsRequired: "You must agree to the terms",
      passwordStrength: {
        weak: "Weak",
        medium: "Medium",
        strong: "Strong",
        hint: "Use 8+ characters with letters, numbers & symbols"
      }
    },
    ur: {
      title: "اکاؤنٹ بنائیں",
      subtitle: "ہزاروں خوش گاہکوں میں شامل ہوں",
      fullName: "مکمل نام",
      email: "ای میل ایڈریس",
      phone: "فون نمبر",
      password: "پاس ورڈ",
      confirmPassword: "پاس ورڈ کی تصدیق کریں",
      passwordPlaceholder: "مضبوط پاس ورڈ بنائیں",
      confirmPlaceholder: "اپنا پاس ورڈ تصدیق کریں",
      agreeTerms: "میں خدمات کی شرائط اور رازداری کی پالیسی سے متفق ہوں",
      createAccount: "اکاؤنٹ بنائیں",
      creating: "اکاؤنٹ بن رہا ہے...",
      signIn: "سائن ان کریں",
      alreadyAccount: "پہلے سے اکاؤنٹ ہے؟",
      required: "*",
      fullNameRequired: "مکمل نام درکار ہے",
      emailRequired: "ای میل درکار ہے",
      emailInvalid: "درست ای میل درج کریں",
      phoneRequired: "فون نمبر درکار ہے",
      phoneInvalid: "درست فون نمبر درج کریں",
      passwordRequired: "پاس ورڈ بنائیں",
      passwordMin: "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے",
      passwordMismatch: "پاس ورڈ مماثل نہیں ہیں",
      agreeTermsRequired: "آپ کو شرائط سے متفق ہونا ضروری ہے",
      passwordStrength: {
        weak: "کمزور",
        medium: "درمیانہ",
        strong: "مضبوط",
        hint: "8+ حروف، اعداد اور علامات استعمال کریں"
      }
    },
    ps: {
      title: "حساب جوړ کړئ",
      subtitle: "د زرګونو خوشحاله پیرودونکو سره یوځای شئ",
      fullName: "بشپړ نوم",
      email: "بریښنالیک آدرس",
      phone: "تلیفون شمېره",
      password: "پاسورډ",
      confirmPassword: "پاسورډ تایید کړئ",
      passwordPlaceholder: "یو قوي پاسورډ جوړ کړئ",
      confirmPlaceholder: "خپل پاسورډ تایید کړئ",
      agreeTerms: "زه د خدماتو شرایطو او محرمیت پالیسي سره موافق یم",
      createAccount: "حساب جوړ کړئ",
      creating: "حساب جوړیږي...",
      signIn: "ننوتل",
      alreadyAccount: "دمخه حساب لرئ؟",
      required: "*",
      fullNameRequired: "بشپړ نوم اړین دی",
      emailRequired: "بریښنالیک اړین دی",
      emailInvalid: "سم بریښنالیک وړاندې کړئ",
      phoneRequired: "تلیفون شمېره اړینه ده",
      phoneInvalid: "سمه تلیفون شمېره وړاندې کړئ",
      passwordRequired: "پاسورډ جوړ کړئ",
      passwordMin: "پاسورډ باید لږ تر لږه 8 توري وي",
      passwordMismatch: "پاسورډونه سره سمون نه خوري",
      agreeTermsRequired: "تاسو باید شرایطو سره موافق شئ",
      passwordStrength: {
        weak: "کمزوری",
        medium: "منځنی",
        strong: "قوي",
        hint: "8+ توري، شمېرې او نښان وکاروئ"
      }
    },
    fa: {
      title: "ایجاد حساب",
      subtitle: "به هزاران مشتری راضی بپیوندید",
      fullName: "نام کامل",
      email: "آدرس ایمیل",
      phone: "شماره تلفن",
      password: "رمز عبور",
      confirmPassword: "تایید رمز عبور",
      passwordPlaceholder: "یک رمز عبور قوی ایجاد کنید",
      confirmPlaceholder: "رمز عبور خود را تایید کنید",
      agreeTerms: "من با شرایط خدمات و سیاست حفظ حریم خصوصی موافقم",
      createAccount: "ایجاد حساب",
      creating: "در حال ایجاد حساب...",
      signIn: "ورود",
      alreadyAccount: "از قبل حساب کاربری دارید؟",
      required: "*",
      fullNameRequired: "نام کامل الزامی است",
      emailRequired: "ایمیل الزامی است",
      emailInvalid: "ایمیل معتبر وارد کنید",
      phoneRequired: "شماره تلفن الزامی است",
      phoneInvalid: "شماره تلفن معتبر وارد کنید",
      passwordRequired: "رمز عبور ایجاد کنید",
      passwordMin: "رمز عبور باید حداقل 8 کاراکتر باشد",
      passwordMismatch: "رمزهای عبور مطابقت ندارند",
      agreeTermsRequired: "شما باید با شرایط موافقت کنید",
      passwordStrength: {
        weak: "ضعیف",
        medium: "متوسط",
        strong: "قوی",
        hint: "از 8+ کاراکتر، اعداد و نمادها استفاده کنید"
      }
    }
  };

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

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success && user) {
      toast.success(t.createAccount === "اکاؤنٹ بنائیں" ? "اکاؤنٹ کامیابی سے بن گیا!" : "Account created successfully!");
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  }, [success, user, navigate, t]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    setPasswordStrength(Math.min(strength, 100));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) newErrors.fullName = t.fullNameRequired;
    if (!formData.email) {
      newErrors.email = t.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.emailInvalid;
    }
    if (!formData.phone) {
      newErrors.phone = t.phoneRequired;
    } else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,14}$/.test(formData.phone)) {
      newErrors.phone = t.phoneInvalid;
    }
    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = t.passwordMin;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = t.agreeTermsRequired;
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        agreeTerms: formData.agreeTerms
      };
      dispatch(registerUserAction(registrationData));
    } else {
      setErrors(formErrors);
    }
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

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.fullName} <span className="text-red-500">{t.required}</span>
                </label>
                <div className="relative">
                  <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 text-base border rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all
                      ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder={t.fullName}
                    autoComplete="name"
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email} <span className="text-red-500">{t.required}</span>
                </label>
                <div className="relative">
                  <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 text-base border rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all
                      ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phone} <span className="text-red-500">{t.required}</span>
                </label>
                <div className="relative">
                  <Phone className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 text-base border rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all
                      ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="+1 234 567 8900"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.password} <span className="text-red-500">{t.required}</span>
                </label>
                <div className="relative">
                  <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 text-base border rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all
                      ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
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
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex gap-1">
                        <div className={`h-2 flex-1 rounded-l-full ${passwordStrength >= 25 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                        <div className={`h-2 flex-1 ${passwordStrength >= 50 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                        <div className={`h-2 flex-1 ${passwordStrength >= 75 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                        <div className={`h-2 flex-1 rounded-r-full ${passwordStrength >= 100 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                      </div>
                      <span className={`text-xs font-medium ${passwordStrength < 50 ? 'text-red-500' : passwordStrength < 75 ? 'text-yellow-500' : 'text-green-500'}`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {t.passwordStrength.hint}
                    </p>
                  </div>
                )}
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.confirmPassword} <span className="text-red-500">{t.required}</span>
                </label>
                <div className="relative">
                  <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 text-base border rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all
                      ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder={t.confirmPlaceholder}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Terms Agreement */}
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label className="text-sm text-gray-600">
                  {t.agreeTerms} <span className="text-red-500">{t.required}</span>
                </label>
              </div>
              {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-98"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>{t.createAccount}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {t.alreadyAccount}{' '}
                  <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
                    {t.signIn}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignUp;