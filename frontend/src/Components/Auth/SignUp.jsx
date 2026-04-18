// src/Components/SignUp.jsx
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { Country, State, City } from "country-state-city";
import { 
  Mail,
  Lock,
  User,
  Zap,
  Percent,
  Gift,
  TrendingUp,
  Users,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Shield,
  Sparkles,
  MapPin,
  Home,
  Building,
  Calendar,
  Briefcase,
  Star,
  HeadphonesIcon,
  Globe,
  DollarSign,
  Wallet,
  Bell,
  BellRing,
  Info,
  Target
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUserAction, clearErrors } from "../../actions/authActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, user, isAuthenticatedUser } = useSelector((state) => state.loginUser);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Step 2: Address Information
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    
    // Step 3: Account Security
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    
    // Step 4: Professional Information & Preferences
    occupation: '',
    companyName: '',
    annualIncome: '',
    purposeOfAccount: 'personal',
    currencyPreference: 'USD',
    newsletterSubscribed: false,
    smsAlerts: false,
    agreeMarketing: false
  });
  
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Language translations
  const translations = {
    en: {
      brandName: "CurrencyExchange",
      title: "Create Your",
      titleHighlight: "Premium Account",
      subtitle: "Join 15,000+ happy customers and start saving on currency exchange today",
      steps: ["Personal Info", "Address", "Security", "Professional"],
      benefits: [
        { text: "Instant account activation", color: "from-yellow-400 to-yellow-500" },
        { text: "Zero fees for 3 months", color: "from-green-400 to-green-500" },
        { text: "$500 welcome bonus", color: "from-red-400 to-red-500" },
        { text: "Premium rate access", color: "from-purple-400 to-purple-500" },
        { text: "Real-time rate alerts", color: "from-blue-400 to-blue-500" },
        { text: "Referral rewards", color: "from-indigo-400 to-indigo-500" }
      ],
      features: [
        { text: "Bank-grade security", color: "text-green-500" },
        { text: "Instant account activation", color: "text-yellow-500" },
        { text: "Multi-currency support", color: "text-blue-500" },
        { text: "24/7 customer support", color: "text-purple-500" },
        { text: "Real-time exchange rates", color: "text-red-500" },
        { text: "Join 15,000+ customers", color: "text-green-500" }
      ],
      step1: {
        title: "Personal Information",
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        dateOfBirth: "Date of Birth",
        gender: "Gender",
        genderOptions: ["Select gender", "Male", "Female", "Other"],
        placeholderFullName: "Enter your full name",
        placeholderEmail: "you@example.com",
        placeholderPhone: "+92 300 1234567",
        required: "*"
      },
      step2: {
        title: "Address Information",
        addressLine1: "Address Line 1",
        addressLine2: "Address Line 2 (Optional)",
        addressLine2Placeholder: "Apartment, suite, etc.",
        country: "Country",
        state: "State/Province",
        city: "City",
        postalCode: "Postal Code",
        placeholderAddress: "Street address",
        placeholderPostalCode: "Postal code"
      },
      step3: {
        title: "Account Security",
        password: "Password",
        confirmPassword: "Confirm Password",
        passwordPlaceholder: "Create a strong password",
        confirmPasswordPlaceholder: "Confirm your password",
        agreeTerms: "I agree to the Terms of Service and Privacy Policy",
        passwordStrength: {
          weak: "Weak",
          medium: "Medium",
          strong: "Strong"
        }
      },
      step4: {
        title: "Professional Information",
        occupation: "Occupation",
        occupationPlaceholder: "e.g., Business Owner, Teacher, Engineer",
        companyName: "Company Name (Optional)",
        companyPlaceholder: "Your company or business name",
        annualIncome: "Annual Income",
        incomeOptions: ["Select income range", "Under $25,000", "$25,000 - $50,000", "$50,000 - $100,000", "$100,000 - $250,000", "$250,000+"],
        purposeOfAccount: "Purpose of Account",
        purposeOptions: ["Personal Use", "Business/Trade", "Investment", "Travel", "Education", "Remittance"],
        preferredCurrency: "Preferred Currency",
        currencyOptions: [
          "🇺🇸 USD - US Dollar",
          "🇪🇺 EUR - Euro", 
          "🇬🇧 GBP - British Pound",
          "🇵🇰 PKR - Pakistani Rupee",
          "🇦🇪 AED - UAE Dirham",
          "🇸🇦 SAR - Saudi Riyal",
          "🇦🇫 AFN - Afghan Afghani"
        ],
        notificationTitle: "Notification Preferences",
        newsletter: "Subscribe to newsletter for updates and offers",
        smsAlerts: "Receive SMS alerts for important account activities",
        marketing: "Receive marketing emails with special offers",
        infoNote: "Information Note",
        infoText: "Your professional information helps us provide better service and personalized offers. All information is kept confidential and secure."
      },
      buttons: {
        continue: "Continue",
        back: "Back",
        createAccount: "Create Account",
        creating: "Creating Account...",
        signIn: "Sign in"
      },
      whyJoin: "Why Join Us?",
      testimonial: {
        text: "\"The best currency exchange platform I've ever used. Fast, secure, and great rates!\"",
        name: "Ahmed Khan",
        title: "Business Owner"
      },
      alreadyAccount: "Already have an account?",
      errors: {
        fullNameRequired: "Full name is required",
        emailRequired: "Email is required",
        emailInvalid: "Email is invalid",
        phoneRequired: "Phone number is required",
        addressRequired: "Address is required",
        countryRequired: "Country is required",
        stateRequired: "State is required",
        cityRequired: "City is required",
        postalCodeRequired: "Postal code is required",
        passwordRequired: "Password is required",
        passwordMin: "Password must be at least 8 characters",
        passwordMismatch: "Passwords do not match",
        agreeTermsRequired: "You must agree to the terms"
      }
    },
    ur: {
      brandName: "کرنسی ایکسچینج",
      title: "اپنا",
      titleHighlight: "پریمیم اکاؤنٹ بنائیں",
      subtitle: "15,000+ خوش گاہکوں میں شامل ہوں اور آج ہی کرنسی کے تبادلے پر بچت شروع کریں",
      steps: ["ذاتی معلومات", "پتہ", "سیکیورٹی", "پیشہ ورانہ"],
      benefits: [
        { text: "فوری اکاؤنٹ ایکٹیویشن", color: "from-yellow-400 to-yellow-500" },
        { text: "3 ماہ کے لیے صفر فیس", color: "from-green-400 to-green-500" },
        { text: "$500 خوش آمدید بونس", color: "from-red-400 to-red-500" },
        { text: "پریمیم ریٹ تک رسائی", color: "from-purple-400 to-purple-500" },
        { text: "ریئل ٹائم ریٹ الرٹس", color: "from-blue-400 to-blue-500" },
        { text: "ریفیرل انعامات", color: "from-indigo-400 to-indigo-500" }
      ],
      features: [
        { text: "بینک گریڈ سیکیورٹی", color: "text-green-500" },
        { text: "فوری اکاؤنٹ ایکٹیویشن", color: "text-yellow-500" },
        { text: "متعدد کرنسیوں کی حمایت", color: "text-blue-500" },
        { text: "24/7 کسٹمر سپورٹ", color: "text-purple-500" },
        { text: "ریئل ٹائم ایکسچینج ریٹس", color: "text-red-500" },
        { text: "15,000+ گاہکوں میں شامل ہوں", color: "text-green-500" }
      ],
      step1: {
        title: "ذاتی معلومات",
        fullName: "مکمل نام",
        email: "ای میل ایڈریس",
        phone: "فون نمبر",
        dateOfBirth: "تاریخ پیدائش",
        gender: "جنس",
        genderOptions: ["جنس منتخب کریں", "مرد", "خاتون", "دیگر"],
        placeholderFullName: "اپنا مکمل نام درج کریں",
        placeholderEmail: "you@example.com",
        placeholderPhone: "+92 300 1234567",
        required: "*"
      },
      step2: {
        title: "پتے کی معلومات",
        addressLine1: "پتہ لائن 1",
        addressLine2: "پتہ لائن 2 (اختیاری)",
        addressLine2Placeholder: "اپارٹمنٹ، سویٹ، وغیرہ",
        country: "ملک",
        state: "ریاست/صوبہ",
        city: "شہر",
        postalCode: "پوسٹل کوڈ",
        placeholderAddress: "گلی کا پتہ",
        placeholderPostalCode: "پوسٹل کوڈ"
      },
      step3: {
        title: "اکاؤنٹ سیکیورٹی",
        password: "پاس ورڈ",
        confirmPassword: "پاس ورڈ کی تصدیق کریں",
        passwordPlaceholder: "ایک مضبوط پاس ورڈ بنائیں",
        confirmPasswordPlaceholder: "اپنا پاس ورڈ تصدیق کریں",
        agreeTerms: "میں خدمات کی شرائط اور رازداری کی پالیسی سے متفق ہوں",
        passwordStrength: {
          weak: "کمزور",
          medium: "درمیانہ",
          strong: "مضبوط"
        }
      },
      step4: {
        title: "پیشہ ورانہ معلومات",
        occupation: "پیشہ",
        occupationPlaceholder: "مثال: کاروباری مالک، استاد، انجینئر",
        companyName: "کمپنی کا نام (اختیاری)",
        companyPlaceholder: "آپ کی کمپنی یا کاروبار کا نام",
        annualIncome: "سالانہ آمدنی",
        incomeOptions: ["آمدنی کی حد منتخب کریں", "$25,000 سے کم", "$25,000 - $50,000", "$50,000 - $100,000", "$100,000 - $250,000", "$250,000+"],
        purposeOfAccount: "اکاؤنٹ کا مقصد",
        purposeOptions: ["ذاتی استعمال", "کاروبار/تجارت", "سرمایہ کاری", "سفر", "تعلیم", "ترسیلات زر"],
        preferredCurrency: "ترجیحی کرنسی",
        currencyOptions: [
          "🇺🇸 USD - امریکی ڈالر",
          "🇪🇺 EUR - یورو", 
          "🇬🇧 GBP - برطانوی پاؤنڈ",
          "🇵🇰 PKR - پاکستانی روپیہ",
          "🇦🇪 AED - متحدہ عرب امارات درہم",
          "🇸🇦 SAR - سعودی ریال",
          "🇦🇫 AFN - افغان افغانی"
        ],
        notificationTitle: "اطلاعات کی ترجیحات",
        newsletter: "اپ ڈیٹس اور پیشکشوں کے لیے نیوز لیٹر سبسکرائب کریں",
        smsAlerts: "اہم اکاؤنٹ سرگرمیوں کے لیے ایس ایم ایس الرٹس وصول کریں",
        marketing: "خصوصی پیشکشوں کے ساتھ مارکیٹنگ ای میلز وصول کریں",
        infoNote: "معلوماتی نوٹ",
        infoText: "آپ کی پیشہ ورانہ معلومات ہمیں بہتر سروس اور ذاتی نوعیت کی پیشکشیں فراہم کرنے میں مدد کرتی ہیں۔ تمام معلومات خفیہ اور محفوظ رکھی جاتی ہیں۔"
      },
      buttons: {
        continue: "جاری رکھیں",
        back: "واپس",
        createAccount: "اکاؤنٹ بنائیں",
        creating: "اکاؤنٹ بن رہا ہے...",
        signIn: "سائن ان کریں"
      },
      whyJoin: "ہمارے ساتھ کیوں شامل ہوں؟",
      testimonial: {
        text: "\"بہترین کرنسی ایکسچینج پلیٹ فارم جو میں نے استعمال کیا ہے۔ تیز، محفوظ، اور بہترین شرحیں!\"",
        name: "احمد خان",
        title: "کاروباری مالک"
      },
      alreadyAccount: "پہلے سے اکاؤنٹ ہے؟",
      errors: {
        fullNameRequired: "مکمل نام درکار ہے",
        emailRequired: "ای میل درکار ہے",
        emailInvalid: "ای میل غلط ہے",
        phoneRequired: "فون نمبر درکار ہے",
        addressRequired: "پتہ درکار ہے",
        countryRequired: "ملک درکار ہے",
        stateRequired: "ریاست درکار ہے",
        cityRequired: "شہر درکار ہے",
        postalCodeRequired: "پوسٹل کوڈ درکار ہے",
        passwordRequired: "پاس ورڈ درکار ہے",
        passwordMin: "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے",
        passwordMismatch: "پاس ورڈ مماثل نہیں ہیں",
        agreeTermsRequired: "آپ کو شرائط سے متفق ہونا ضروری ہے"
      }
    },
    ps: {
      brandName: "اسعارو تبادله",
      title: "خپل",
      titleHighlight: "پریمیم حساب جوړ کړئ",
      subtitle: "د 15,000+ خوشحاله پیرودونکو سره یوځای شئ او نن د اسعارو په تبادله کې خوندي کول پیل کړئ",
      steps: ["شخصي معلومات", "پته", "امنیت", "مسلکي"],
      benefits: [
        { text: "فوري حساب فعالول", color: "from-yellow-400 to-yellow-500" },
        { text: "د 3 میاشتو لپاره صفر فیس", color: "from-green-400 to-green-500" },
        { text: "$500 ښه راغلاست بونس", color: "from-red-400 to-red-500" },
        { text: "پریمیم نرخ ته لاسرسی", color: "from-purple-400 to-purple-500" },
        { text: "ریښتیني وخت نرخ خبرتیاوې", color: "from-blue-400 to-blue-500" },
        { text: "حوالې انعامونه", color: "from-indigo-400 to-indigo-500" }
      ],
      features: [
        { text: "بانک درجه امنیت", color: "text-green-500" },
        { text: "فوري حساب فعالول", color: "text-yellow-500" },
        { text: "د څو اسعارو ملاتړ", color: "text-blue-500" },
        { text: "24/7 د پیرودونکو ملاتړ", color: "text-purple-500" },
        { text: "ریښتیني وخت د تبادلې نرخونه", color: "text-red-500" },
        { text: "د 15,000+ پیرودونکو سره یوځای شئ", color: "text-green-500" }
      ],
      step1: {
        title: "شخصي معلومات",
        fullName: "بشپړ نوم",
        email: "بریښنالیک آدرس",
        phone: "تلیفون شمېره",
        dateOfBirth: "د زیږون نیټه",
        gender: "جنس",
        genderOptions: ["جنس وټاکئ", "نارینه", "ښځینه", "نور"],
        placeholderFullName: "خپل بشپړ نوم دننه کړئ",
        placeholderEmail: "you@example.com",
        placeholderPhone: "+92 300 1234567",
        required: "*"
      },
      step2: {
        title: "د پتې معلومات",
        addressLine1: "پته کرښه 1",
        addressLine2: "پته کرښه 2 (اختیاري)",
        addressLine2Placeholder: "اپارتمان، سویټ، او داسې نور",
        country: "هیواد",
        state: "ایالت/ولایت",
        city: "ښار",
        postalCode: "پوستي کوډ",
        placeholderAddress: "د کوڅې پته",
        placeholderPostalCode: "پوستي کوډ"
      },
      step3: {
        title: "حساب امنیت",
        password: "پاسورډ",
        confirmPassword: "پاسورډ تایید کړئ",
        passwordPlaceholder: "یو قوي پاسورډ جوړ کړئ",
        confirmPasswordPlaceholder: "خپل پاسورډ تایید کړئ",
        agreeTerms: "زه د خدماتو شرایطو او محرمیت پالیسي سره موافق یم",
        passwordStrength: {
          weak: "کمزوری",
          medium: "منځنی",
          strong: "قوي"
        }
      },
      step4: {
        title: "مسلکي معلومات",
        occupation: "مسلک",
        occupationPlaceholder: "بېلګه: سوداګر، ښوونکی، انجینر",
        companyName: "د شرکت نوم (اختیاري)",
        companyPlaceholder: "ستاسو د شرکت یا سوداګرۍ نوم",
        annualIncome: "کلنی عاید",
        incomeOptions: ["د عاید سلسله وټاکئ", "د $25,000 څخه کم", "$25,000 - $50,000", "$50,000 - $100,000", "$100,000 - $250,000", "$250,000+"],
        purposeOfAccount: "د حساب هدف",
        purposeOptions: ["شخصي کارونې", "سوداګرۍ/تجارت", "پانګونه", "سفر", "تعلیم", "پیسې لیږد"],
        preferredCurrency: "غوره شوې اسعار",
        currencyOptions: [
          "🇺🇸 USD - امریکایی ډالر",
          "🇪🇺 EUR - یورو", 
          "🇬🇧 GBP - برتانوي پونډ",
          "🇵🇰 PKR - پاکستاني روپۍ",
          "🇦🇪 AED - متحده عربي امارات درهم",
          "🇸🇦 SAR - سعودي ریال",
          "🇦🇫 AFN - افغان افغاني"
        ],
        notificationTitle: "د خبرتیاوو غوره توبونه",
        newsletter: "د تازه معلوماتو او وړاندیزونو لپاره خبرپاڼه ګډون وکړئ",
        smsAlerts: "د مهمو حساب فعالیتونو لپاره SMS خبرتیاوې ترلاسه کړئ",
        marketing: "د ځانګړو وړاندیزونو سره بازارموندنې بریښنالیکونه ترلاسه کړئ",
        infoNote: "د معلوماتو یادښت",
        infoText: "ستاسو مسلکي معلومات موږ سره مرسته کوي چې غوره خدمت او شخصي وړاندیزونه وړاندې کړو. ټول معلومات محرم او خوندي ساتل کیږي."
      },
      buttons: {
        continue: "دوام ورکړئ",
        back: "بیرته",
        createAccount: "حساب جوړ کړئ",
        creating: "حساب جوړیږي...",
        signIn: "ننوتل"
      },
      whyJoin: "ولې موږ سره یوځای شئ؟",
      testimonial: {
        text: "\"د اسعارو د تبادلې غوره پلیټ فارم چې ما کارولی دی. چټک، خوندي، او ښه نرخونه!\"",
        name: "احمد خان",
        title: "سوداګر"
      },
      alreadyAccount: "دمخه حساب لرئ؟",
      errors: {
        fullNameRequired: "بشپړ نوم اړین دی",
        emailRequired: "بریښنالیک اړین دی",
        emailInvalid: "بریښنالیک ناسم دی",
        phoneRequired: "تلیفون شمېره اړینه ده",
        addressRequired: "پته اړینه ده",
        countryRequired: "هیواد اړین دی",
        stateRequired: "ایالت اړین دی",
        cityRequired: "ښار اړین دی",
        postalCodeRequired: "پوستي کوډ اړین دی",
        passwordRequired: "پاسورډ اړین دی",
        passwordMin: "پاسورډ باید لږ تر لږه 8 توري وي",
        passwordMismatch: "پاسورډونه سره سمون نه خوري",
        agreeTermsRequired: "تاسو باید شرایطو سره موافق شئ"
      }
    },
    fa: {
      brandName: "تبدیل ارز",
      title: "ایجاد",
      titleHighlight: "حساب پریمیوم",
      subtitle: "به 15,000+ مشتری راضی بپیوندید و امروز در تبادل ارز صرفه‌جویی کنید",
      steps: ["اطلاعات شخصی", "آدرس", "امنیت", "حرفه‌ای"],
      benefits: [
        { text: "فعال سازی فوری حساب", color: "from-yellow-400 to-yellow-500" },
        { text: "صفر کارمزد به مدت 3 ماه", color: "from-green-400 to-green-500" },
        { text: "پاداش خوش آمدید $500", color: "from-red-400 to-red-500" },
        { text: "دسترسی به نرخ پریمیوم", color: "from-purple-400 to-purple-500" },
        { text: "هشدارهای نرخ لحظه‌ای", color: "from-blue-400 to-blue-500" },
        { text: "جوایز ارجاع", color: "from-indigo-400 to-indigo-500" }
      ],
      features: [
        { text: "امنیت در سطح بانک", color: "text-green-500" },
        { text: "فعال سازی فوری حساب", color: "text-yellow-500" },
        { text: "پشتیبانی از چندین ارز", color: "text-blue-500" },
        { text: "پشتیبانی مشتریان 24/7", color: "text-purple-500" },
        { text: "نرخ‌های لحظه‌ای ارز", color: "text-red-500" },
        { text: "به 15,000+ مشتری بپیوندید", color: "text-green-500" }
      ],
      step1: {
        title: "اطلاعات شخصی",
        fullName: "نام کامل",
        email: "آدرس ایمیل",
        phone: "شماره تلفن",
        dateOfBirth: "تاریخ تولد",
        gender: "جنسیت",
        genderOptions: ["انتخاب جنسیت", "مرد", "زن", "سایر"],
        placeholderFullName: "نام کامل خود را وارد کنید",
        placeholderEmail: "you@example.com",
        placeholderPhone: "+92 300 1234567",
        required: "*"
      },
      step2: {
        title: "اطلاعات آدرس",
        addressLine1: "آدرس خط 1",
        addressLine2: "آدرس خط 2 (اختیاری)",
        addressLine2Placeholder: "آپارتمان، سوئیت و غیره",
        country: "کشور",
        state: "استان",
        city: "شهر",
        postalCode: "کد پستی",
        placeholderAddress: "آدرس خیابان",
        placeholderPostalCode: "کد پستی"
      },
      step3: {
        title: "امنیت حساب",
        password: "رمز عبور",
        confirmPassword: "تایید رمز عبور",
        passwordPlaceholder: "یک رمز عبور قوی ایجاد کنید",
        confirmPasswordPlaceholder: "رمز عبور خود را تایید کنید",
        agreeTerms: "من با شرایط خدمات و سیاست حفظ حریم خصوصی موافقم",
        passwordStrength: {
          weak: "ضعیف",
          medium: "متوسط",
          strong: "قوی"
        }
      },
      step4: {
        title: "اطلاعات حرفه‌ای",
        occupation: "شغل",
        occupationPlaceholder: "مثال: صاحب کسب و کار، معلم، مهندس",
        companyName: "نام شرکت (اختیاری)",
        companyPlaceholder: "نام شرکت یا کسب و کار شما",
        annualIncome: "درآمد سالانه",
        incomeOptions: ["محدوده درآمد را انتخاب کنید", "کمتر از $25,000", "$25,000 - $50,000", "$50,000 - $100,000", "$100,000 - $250,000", "$250,000+"],
        purposeOfAccount: "هدف از افتتاح حساب",
        purposeOptions: ["استفاده شخصی", "کسب و کار/تجارت", "سرمایه‌گذاری", "سفر", "تحصیل", "حواله"],
        preferredCurrency: "ارز ترجیحی",
        currencyOptions: [
          "🇺🇸 USD - دلار آمریکا",
          "🇪🇺 EUR - یورو", 
          "🇬🇧 GBP - پوند بریتانیا",
          "🇵🇰 PKR - روپیه پاکستان",
          "🇦🇪 AED - درهم امارات",
          "🇸🇦 SAR - ریال سعودی",
          "🇦🇫 AFN - افغانی افغانستان"
        ],
        notificationTitle: "ترجیحات اعلان",
        newsletter: "برای به‌روزرسانی‌ها و پیشنهادها در خبرنامه عضو شوید",
        smsAlerts: "دریافت هشدارهای SMS برای فعالیت‌های مهم حساب",
        marketing: "دریافت ایمیل‌های بازاریابی با پیشنهادهای ویژه",
        infoNote: "یادداشت اطلاعاتی",
        infoText: "اطلاعات حرفه‌ای شما به ما کمک می‌کند خدمات بهتر و پیشنهادهای شخصی‌سازی شده ارائه دهیم. تمام اطلاعات محرمانه و امن نگهداری می‌شوند."
      },
      buttons: {
        continue: "ادامه",
        back: "بازگشت",
        createAccount: "ایجاد حساب",
        creating: "در حال ایجاد حساب...",
        signIn: "ورود"
      },
      whyJoin: "چرا به ما بپیوندید؟",
      testimonial: {
        text: "\"بهترین پلتفرم تبادل ارز که استفاده کرده‌ام. سریع، امن و نرخ‌های عالی!\"",
        name: "احمد خان",
        title: "صاحب کسب و کار"
      },
      alreadyAccount: "از قبل حساب کاربری دارید؟",
      errors: {
        fullNameRequired: "نام کامل الزامی است",
        emailRequired: "ایمیل الزامی است",
        emailInvalid: "ایمیل نامعتبر است",
        phoneRequired: "شماره تلفن الزامی است",
        addressRequired: "آدرس الزامی است",
        countryRequired: "کشور الزامی است",
        stateRequired: "استان الزامی است",
        cityRequired: "شهر الزامی است",
        postalCodeRequired: "کد پستی الزامی است",
        passwordRequired: "رمز عبور الزامی است",
        passwordMin: "رمز عبور باید حداقل 8 کاراکتر باشد",
        passwordMismatch: "رمزهای عبور مطابقت ندارند",
        agreeTermsRequired: "شما باید با شرایط موافقت کنید"
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
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (formData.country) {
      const countryStates = State.getStatesOfCountry(formData.country);
      setStates(countryStates);
      setFormData(prev => ({ ...prev, state: '', city: '' }));
      setCities([]);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.country && formData.state) {
      const countryCities = City.getCitiesOfState(formData.country, formData.state);
      setCities(countryCities);
      setFormData(prev => ({ ...prev, city: '' }));
    } else {
      setCities([]);
    }
  }, [formData.country, formData.state]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  // Handle successful registration and navigate to dashboard
  useEffect(() => {
    if (success && user && !registrationComplete) {
      setRegistrationComplete(true);
      toast.success("Account created successfully! Please complete payment to activate your account.");
      
      // Small delay to ensure Redux state is updated
      setTimeout(() => {
        navigate('/payment', { state: { showPaymentModal: true, userData: formData } });
      }, 500);
    }
  }, [success, user, navigate, formData, registrationComplete]);

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

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

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
    if (/[!@#$%^&*]/.test(password)) strength += 25;
    setPasswordStrength(Math.min(strength, 100));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = t.errors.fullNameRequired;
      if (!formData.email) {
        newErrors.email = t.errors.emailRequired;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = t.errors.emailInvalid;
      }
      if (!formData.phone) newErrors.phone = t.errors.phoneRequired;
    }
    
    if (step === 2) {
      if (!formData.addressLine1) newErrors.addressLine1 = t.errors.addressRequired;
      if (!formData.country) newErrors.country = t.errors.countryRequired;
      if (!formData.state) newErrors.state = t.errors.stateRequired;
      if (!formData.city) newErrors.city = t.errors.cityRequired;
      if (!formData.postalCode) newErrors.postalCode = t.errors.postalCodeRequired;
    }
    
    if (step === 3) {
      if (!formData.password) {
        newErrors.password = t.errors.passwordRequired;
      } else if (formData.password.length < 8) {
        newErrors.password = t.errors.passwordMin;
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t.errors.passwordMismatch;
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = t.errors.agreeTermsRequired;
      }
    }
    
    if (step === 4) {
      // Step 4 fields are optional - no validation needed
    }
    
    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep(4);
    
    if (Object.keys(stepErrors).length === 0) {
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        agreeTerms: formData.agreeTerms,
        dateOfBirth: formData.dateOfBirth || null,
        gender: formData.gender || null,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2 || '',
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        occupation: formData.occupation || '',
        companyName: formData.companyName || '',
        annualIncome: formData.annualIncome || '',
        purposeOfAccount: formData.purposeOfAccount,
        currencyPreference: formData.currencyPreference,
        newsletterSubscribed: formData.newsletterSubscribed,
        smsAlerts: formData.smsAlerts,
        agreeMarketing: formData.agreeMarketing
      };
      
      // Dispatch register action
      dispatch(registerUserAction(registrationData));
    } else {
      setErrors(stepErrors);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 50) return t.step3.passwordStrength.weak;
    if (passwordStrength < 75) return t.step3.passwordStrength.medium;
    return t.step3.passwordStrength.strong;
  };

  const getStepProgress = () => {
    return ((currentStep - 1) / 3) * 100;
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
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 mb-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">FX</span>
            </div>
            <span className="text-3xl font-bold text-gray-900">
              Currency<span className="text-green-600">Exchange</span>
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className={`flex justify-between mb-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {t.steps.map((step, index) => (
              <span key={index} className={currentStep >= index + 1 ? 'text-green-600' : ''}>{step}</span>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getStepProgress()}%` }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div variants={fadeInLeft} className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <User className="w-6 h-6 text-green-600 mr-2" />
                      {t.step1.title}
                    </h2>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.step1.fullName} <span className="text-red-500">{t.step1.required}</span></label>
                      <div className="relative">
                        <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-green-500`} placeholder={t.step1.placeholderFullName} />
                      </div>
                      {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.step1.email} <span className="text-red-500">{t.step1.required}</span></label>
                        <div className="relative">
                          <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                          <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-green-500`} placeholder={t.step1.placeholderEmail} />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.step1.phone} <span className="text-red-500">{t.step1.required}</span></label>
                        <div className="relative">
                          <Phone className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-green-500`} placeholder={t.step1.placeholderPhone} />
                        </div>
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.step1.dateOfBirth}</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.step1.gender}</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500">
                          {t.step1.genderOptions.map((option, idx) => (
                            <option key={idx} value={option.toLowerCase() === 'select gender' ? '' : option.toLowerCase()}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} mt-8`}>
                      <button type="button" onClick={handleNext} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 flex items-center space-x-2">
                        <span>{t.buttons.continue}</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Address Information */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="w-6 h-6 text-green-600 mr-2" />
                      {t.step2.title}
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.step2.addressLine1} <span className="text-red-500">{t.step1.required}</span></label>
                      <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-green-500`} placeholder={t.step2.placeholderAddress} />
                      {errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.step2.addressLine2}</label>
                      <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500" placeholder={t.step2.addressLine2Placeholder} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.step2.country} <span className="text-red-500">{t.step1.required}</span></label>
                        <select name="country" value={formData.country} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-green-500`}>
                          <option value="">{t.step2.country}</option>
                          {countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                        </select>
                        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.step2.state} <span className="text-red-500">{t.step1.required}</span></label>
                        <select name="state" value={formData.state} onChange={handleChange} disabled={!formData.country} className={`w-full px-4 py-3 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-green-500 ${!formData.country ? 'bg-gray-100' : ''}`}>
                          <option value="">{t.step2.state}</option>
                          {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                        </select>
                        {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.step2.city} <span className="text-red-500">{t.step1.required}</span></label>
                        <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.state} className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-green-500 ${!formData.state ? 'bg-gray-100' : ''}`}>
                          <option value="">{t.step2.city}</option>
                          {cities.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                        </select>
                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.step2.postalCode} <span className="text-red-500">{t.step1.required}</span></label>
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-green-500`} placeholder={t.step2.placeholderPostalCode} />
                        {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                      </div>
                    </div>
                    <div className="flex justify-between mt-8">
                      <button type="button" onClick={handlePrevious} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200">{t.buttons.back}</button>
                      <button type="button" onClick={handleNext} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center space-x-2">
                        <span>{t.buttons.continue}</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Account Security */}
                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Shield className="w-6 h-6 text-green-600 mr-2" />
                      {t.step3.title}
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.step3.password} <span className="text-red-500">{t.step1.required}</span></label>
                      <div className="relative">
                        <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                        <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-green-500`} placeholder={t.step3.passwordPlaceholder} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400`}>
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex space-x-1 flex-1">
                              <div className={`h-2 flex-1 rounded-l-full ${passwordStrength >= 25 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                              <div className={`h-2 flex-1 ${passwordStrength >= 50 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                              <div className={`h-2 flex-1 ${passwordStrength >= 75 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                              <div className={`h-2 flex-1 rounded-r-full ${passwordStrength >= 100 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                            </div>
                            <span className={`text-xs font-medium ml-2 ${passwordStrength < 50 ? 'text-red-500' : passwordStrength < 75 ? 'text-yellow-500' : 'text-green-500'}`}>
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                        </div>
                      )}
                      {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.step3.confirmPassword} <span className="text-red-500">{t.step1.required}</span></label>
                      <div className="relative">
                        <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-green-500`} placeholder={t.step3.confirmPasswordPlaceholder} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400`}>
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded" />
                        <span className="text-sm text-gray-600">{t.step3.agreeTerms} <span className="text-red-500">{t.step1.required}</span></span>
                      </label>
                      {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}
                    </div>
                    <div className="flex justify-between mt-8">
                      <button type="button" onClick={handlePrevious} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200">{t.buttons.back}</button>
                      <button type="button" onClick={handleNext} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center space-x-2">
                        <span>{t.buttons.continue}</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Professional Information & Preferences */}
                {currentStep === 4 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="space-y-6"
                  >
                    <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Briefcase className="w-6 h-6 text-green-600 mr-2" />
                      {t.step4.title}
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.step4.occupation}</label>
                      <div className="relative">
                        <Briefcase className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                        <input 
                          type="text" 
                          name="occupation" 
                          value={formData.occupation} 
                          onChange={handleChange} 
                          className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500`} 
                          placeholder={t.step4.occupationPlaceholder} 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.step4.companyName}</label>
                      <div className="relative">
                        <Building className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                        <input 
                          type="text" 
                          name="companyName" 
                          value={formData.companyName} 
                          onChange={handleChange} 
                          className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500`} 
                          placeholder={t.step4.companyPlaceholder} 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.step4.annualIncome}</label>
                      <div className="relative">
                        <DollarSign className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                        <select 
                          name="annualIncome" 
                          value={formData.annualIncome} 
                          onChange={handleChange} 
                          className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500`}
                        >
                          {t.step4.incomeOptions.map((option, idx) => (
                            <option key={idx} value={option.toLowerCase().replace(/\$/g, '').replace(/ /g, '-').replace(/,/g, '').split('-')[0]}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.step4.purposeOfAccount}</label>
                      <div className="relative">
                        <Target className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                        <select 
                          name="purposeOfAccount" 
                          value={formData.purposeOfAccount} 
                          onChange={handleChange} 
                          className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500`}
                        >
                          {t.step4.purposeOptions.map((option, idx) => (
                            <option key={idx} value={option.toLowerCase().replace(/\/| /g, '-')}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.step4.preferredCurrency}</label>
                      <div className="relative">
                        <Wallet className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                        <select 
                          name="currencyPreference" 
                          value={formData.currencyPreference} 
                          onChange={handleChange} 
                          className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500`}
                        >
                          {t.step4.currencyOptions.map((option, idx) => {
                            const code = option.split(' - ')[0].split(' ')[1];
                            return <option key={idx} value={code}>{option}</option>;
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <h3 className={`text-lg font-semibold text-gray-900 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Bell className="w-5 h-5 mr-2 text-green-600" />
                        {t.step4.notificationTitle}
                      </h3>
                      <label className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <input 
                          type="checkbox" 
                          name="newsletterSubscribed" 
                          checked={formData.newsletterSubscribed} 
                          onChange={handleChange} 
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{t.step4.newsletter}</span>
                      </label>
                      <label className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <input 
                          type="checkbox" 
                          name="smsAlerts" 
                          checked={formData.smsAlerts} 
                          onChange={handleChange} 
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{t.step4.smsAlerts}</span>
                      </label>
                      <label className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <input 
                          type="checkbox" 
                          name="agreeMarketing" 
                          checked={formData.agreeMarketing} 
                          onChange={handleChange} 
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{t.step4.marketing}</span>
                      </label>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">{t.step4.infoNote}</p>
                          <p className="text-xs text-blue-700 mt-1">
                            {t.step4.infoText}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button 
                        type="button" 
                        onClick={handlePrevious} 
                        className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                      >
                        {t.buttons.back}
                      </button>
                      <button 
                        type="submit" 
                        disabled={loading} 
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>{t.buttons.creating}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle size={18} />
                            <span>{t.buttons.createAccount}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white sticky top-24">
              <h3 className={`text-xl font-bold mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
                {t.whyJoin}
              </h3>
              <div className="space-y-4">
                {t.features.map((feature, index) => {
                  // Find the matching icon based on text
                  let IconComponent = Shield;
                  if (feature.text.includes("security") || feature.text.includes("سیکیورٹی") || feature.text.includes("امنیت")) IconComponent = Shield;
                  else if (feature.text.includes("activation") || feature.text.includes("ایکٹیویشن") || feature.text.includes("فعال")) IconComponent = Zap;
                  else if (feature.text.includes("currency") || feature.text.includes("کرنسی") || feature.text.includes("اسعارو")) IconComponent = Globe;
                  else if (feature.text.includes("support") || feature.text.includes("سپورٹ") || feature.text.includes("پشتیبانی")) IconComponent = HeadphonesIcon;
                  else if (feature.text.includes("rates") || feature.text.includes("ریٹ") || feature.text.includes("نرخ")) IconComponent = TrendingUp;
                  else IconComponent = Users;
                  
                  return (
                    <div key={index} className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <IconComponent className={`w-5 h-5 ${feature.color}`} />
                      <span className="text-sm text-gray-300">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className="pt-6 border-t border-gray-800 mt-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-sm text-gray-300 italic mb-3">{t.testimonial.text}</p>
                  <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center text-xs font-bold">
                      {t.testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.testimonial.name}</p>
                      <p className="text-xs text-gray-500">{t.testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-gray-400">
                  {t.alreadyAccount}{' '}
                  <Link to="/login" className="text-green-500 hover:text-green-400 font-semibold">
                    {t.buttons.signIn}
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;