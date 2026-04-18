import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { Country, State, City } from "country-state-city";
import { 
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Home,
  Building,
  Globe,
  Briefcase,
  DollarSign,
  Percent,
  Star,
  Heart,
  Gift,
  Zap,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Edit,
  ArrowLeft,
  CheckCircle,
  Award,
  TrendingUp,
  Users,
  CreditCard,
  Smartphone,
  HeadphonesIcon,
  Landmark,
  Copy,
  Share2,
  Printer,
  Download,
  Upload,
  RefreshCw,
  MoreVertical,
  Settings,
  LogOut,
  Bell,
  BellRing,
  AlertCircle,
  Info,
  HelpCircle,
  Fingerprint,
  Key,
  Camera,
  Image,
  X,
  Save
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadUserAction, updateProfileAction, clearErrors } from "../../actions/authActions";
import { UPDATE_PROFILE_RESET } from "../../constants/constants";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.loginUser);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector((state) => state.updatePassword);
  
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showAddressInfo, setShowAddressInfo] = useState(true);
  const [showProfessionalInfo, setShowProfessionalInfo] = useState(true);
  const [showPreferences, setShowPreferences] = useState(true);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editErrors, setEditErrors] = useState({});
  
  // Countries and location states
  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Language translations
  const translations = {
    en: {
      backToDashboard: "Back to Dashboard",
      editProfile: "Edit Profile",
      memberSince: "Member Since",
      lastLogin: "Last Login",
      accountStatus: "Account Status",
      profileCompletion: "Profile Completion",
      editProfileTitle: "Edit Profile",
      editProfileSubtitle: "Update your personal information",
      personalInformation: "Personal Information",
      addressInformation: "Address Information",
      professionalInfo: "Professional Info",
      preferences: "Preferences",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      dateOfBirth: "Date of Birth",
      gender: "Gender",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      city: "City",
      stateProvince: "State/Province",
      postalCode: "Postal Code",
      country: "Country",
      occupation: "Occupation",
      companyName: "Company Name",
      annualIncome: "Annual Income",
      purposeOfAccount: "Purpose of Account",
      preferredCurrency: "Preferred Currency",
      newsletterSubscription: "Newsletter Subscription",
      smsAlerts: "SMS Alerts",
      subscribed: "Subscribed",
      notSubscribed: "Not Subscribed",
      enabled: "Enabled",
      disabled: "Disabled",
      notSpecified: "Not specified",
      saveChanges: "Save Changes",
      saving: "Saving...",
      cancel: "Cancel",
      selectGender: "Select gender",
      male: "Male",
      female: "Female",
      other: "Other",
      selectCountry: "Select country",
      selectState: "Select state",
      selectCity: "Select city",
      selectIncome: "Select income range",
      under25k: "Under $25,000",
      range25to50k: "$25,000 - $50,000",
      range50to100k: "$50,000 - $100,000",
      range100to250k: "$100,000 - $250,000",
      over250k: "$250,000+",
      personalUse: "Personal Use",
      businessTrade: "Business/Trade",
      investment: "Investment",
      travel: "Travel",
      education: "Education",
      remittance: "Remittance",
      usd: "USD - US Dollar",
      eur: "EUR - Euro",
      gbp: "GBP - British Pound",
      pkr: "PKR - Pakistani Rupee",
      aed: "AED - UAE Dirham",
      sar: "SAR - Saudi Riyal",
      afn: "AFN - Afghan Afghani",
      subscribeNewsletter: "Subscribe to newsletter",
      receiveSmsAlerts: "Receive SMS alerts",
      receiveMarketingEmails: "Receive marketing emails",
      profileUpdated: "Profile updated successfully!",
      redirecting: "Redirecting to dashboard...",
      loadingProfile: "Loading profile...",
      active: "active",
      pending: "pending",
      streetAddress: "Street address",
      apartmentSuite: "Apartment, suite, etc.",
      errors: {
        fullNameRequired: "Full name is required",
        phoneRequired: "Phone number is required"
      }
    },
    ur: {
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      editProfile: "پروفائل ترمیم کریں",
      memberSince: "رکن از",
      lastLogin: "آخری لاگ ان",
      accountStatus: "اکاؤنٹ کی حالت",
      profileCompletion: "پروفائل مکمل ہونے کی شرح",
      editProfileTitle: "پروفائل میں ترمیم کریں",
      editProfileSubtitle: "اپنی ذاتی معلومات کو اپ ڈیٹ کریں",
      personalInformation: "ذاتی معلومات",
      addressInformation: "پتے کی معلومات",
      professionalInfo: "پیشہ ورانہ معلومات",
      preferences: "ترجیحات",
      fullName: "مکمل نام",
      emailAddress: "ای میل ایڈریس",
      phoneNumber: "فون نمبر",
      dateOfBirth: "تاریخ پیدائش",
      gender: "جنس",
      addressLine1: "پتہ لائن 1",
      addressLine2: "پتہ لائن 2",
      city: "شہر",
      stateProvince: "ریاست/صوبہ",
      postalCode: "پوسٹل کوڈ",
      country: "ملک",
      occupation: "پیشہ",
      companyName: "کمپنی کا نام",
      annualIncome: "سالانہ آمدنی",
      purposeOfAccount: "اکاؤنٹ کا مقصد",
      preferredCurrency: "ترجیحی کرنسی",
      newsletterSubscription: "نیوز لیٹر رکنیت",
      smsAlerts: "ایس ایم ایس الرٹس",
      subscribed: "سبسکرائب شدہ",
      notSubscribed: "سبسکرائب نہیں",
      enabled: "فعال",
      disabled: "غیر فعال",
      notSpecified: "مخصوص نہیں",
      saveChanges: "تبدیلیاں محفوظ کریں",
      saving: "محفوظ ہو رہا ہے...",
      cancel: "منسوخ کریں",
      selectGender: "جنس منتخب کریں",
      male: "مرد",
      female: "خاتون",
      other: "دیگر",
      selectCountry: "ملک منتخب کریں",
      selectState: "ریاست منتخب کریں",
      selectCity: "شہر منتخب کریں",
      selectIncome: "آمدنی کی حد منتخب کریں",
      under25k: "$25,000 سے کم",
      range25to50k: "$25,000 - $50,000",
      range50to100k: "$50,000 - $100,000",
      range100to250k: "$100,000 - $250,000",
      over250k: "$250,000+",
      personalUse: "ذاتی استعمال",
      businessTrade: "کاروبار/تجارت",
      investment: "سرمایہ کاری",
      travel: "سفر",
      education: "تعلیم",
      remittance: "ترسیلات زر",
      usd: "USD - امریکی ڈالر",
      eur: "EUR - یورو",
      gbp: "GBP - برطانوی پاؤنڈ",
      pkr: "PKR - پاکستانی روپیہ",
      aed: "AED - متحدہ عرب امارات درہم",
      sar: "SAR - سعودی ریال",
      afn: "AFN - افغان افغانی",
      subscribeNewsletter: "نیوز لیٹر کے لیے سبسکرائب کریں",
      receiveSmsAlerts: "ایس ایم ایس الرٹس وصول کریں",
      receiveMarketingEmails: "مارکیٹنگ ای میلز وصول کریں",
      profileUpdated: "پروفائل کامیابی سے اپ ڈیٹ ہو گیا!",
      redirecting: "ڈیش بورڈ پر جا رہے ہیں...",
      loadingProfile: "پروفائل لوڈ ہو رہا ہے...",
      active: "فعال",
      pending: "زیر التواء",
      streetAddress: "گلی کا پتہ",
      apartmentSuite: "اپارٹمنٹ، سویٹ، وغیرہ",
      errors: {
        fullNameRequired: "مکمل نام درکار ہے",
        phoneRequired: "فون نمبر درکار ہے"
      }
    },
    ps: {
      backToDashboard: "بیرته ډشبورډ ته",
      editProfile: "پروفایل سمول",
      memberSince: "غړی له",
      lastLogin: "وروستی ننوتل",
      accountStatus: "د حساب حالت",
      profileCompletion: "د پروفایل بشپړتیا",
      editProfileTitle: "پروفایل سمول",
      editProfileSubtitle: "خپل شخصي معلومات تازه کړئ",
      personalInformation: "شخصي معلومات",
      addressInformation: "د پتې معلومات",
      professionalInfo: "مسلکي معلومات",
      preferences: "غوره توبونه",
      fullName: "بشپړ نوم",
      emailAddress: "بریښنالیک آدرس",
      phoneNumber: "تلیفون شمېره",
      dateOfBirth: "د زیږون نیټه",
      gender: "جنس",
      addressLine1: "پته کرښه 1",
      addressLine2: "پته کرښه 2",
      city: "ښار",
      stateProvince: "ایالت/ولایت",
      postalCode: "پوستي کوډ",
      country: "هیواد",
      occupation: "مسلک",
      companyName: "د شرکت نوم",
      annualIncome: "کلنی عاید",
      purposeOfAccount: "د حساب هدف",
      preferredCurrency: "غوره شوې اسعار",
      newsletterSubscription: "د خبرپاڼې غړیتوب",
      smsAlerts: "SMS خبرتیاوې",
      subscribed: "ګډون شوی",
      notSubscribed: "ګډون نه دی شوی",
      enabled: "فعال شوی",
      disabled: "غیر فعال شوی",
      notSpecified: "ټاکل شوی نه دی",
      saveChanges: "بدلونونه خوندي کړئ",
      saving: "خوندي کیږي...",
      cancel: "لغوه کړئ",
      selectGender: "جنس وټاکئ",
      male: "نارینه",
      female: "ښځینه",
      other: "نور",
      selectCountry: "هیواد وټاکئ",
      selectState: "ایالت وټاکئ",
      selectCity: "ښار وټاکئ",
      selectIncome: "د عاید سلسله وټاکئ",
      under25k: "د $25,000 څخه کم",
      range25to50k: "$25,000 - $50,000",
      range50to100k: "$50,000 - $100,000",
      range100to250k: "$100,000 - $250,000",
      over250k: "$250,000+",
      personalUse: "شخصي کارونې",
      businessTrade: "سوداګرۍ/تجارت",
      investment: "پانګونه",
      travel: "سفر",
      education: "تعلیم",
      remittance: "پیسې لیږد",
      usd: "USD - امریکایی ډالر",
      eur: "EUR - یورو",
      gbp: "GBP - برتانوي پونډ",
      pkr: "PKR - پاکستاني روپۍ",
      aed: "AED - متحده عربي امارات درهم",
      sar: "SAR - سعودي ریال",
      afn: "AFN - افغان افغاني",
      subscribeNewsletter: "د خبرپاڼې لپاره ګډون وکړئ",
      receiveSmsAlerts: "SMS خبرتیاوې ترلاسه کړئ",
      receiveMarketingEmails: "مارکیټینګ بریښنالیکونه ترلاسه کړئ",
      profileUpdated: "پروفایل په بریالیتوب سره تازه شو!",
      redirecting: "ډشبورډ ته لیږدول کیږي...",
      loadingProfile: "پروفایل لوډ کیږي...",
      active: "فعال",
      pending: "په انتظار کې",
      streetAddress: "د کوڅې پته",
      apartmentSuite: "اپارتمان، سویټ، او داسې نور",
      errors: {
        fullNameRequired: "بشپړ نوم اړین دی",
        phoneRequired: "تلیفون شمېره اړینه ده"
      }
    },
    fa: {
      backToDashboard: "بازگشت به داشبورد",
      editProfile: "ویرایش پروفایل",
      memberSince: "عضویت از",
      lastLogin: "آخرین ورود",
      accountStatus: "وضعیت حساب",
      profileCompletion: "تکمیل پروفایل",
      editProfileTitle: "ویرایش پروفایل",
      editProfileSubtitle: "اطلاعات شخصی خود را به‌روزرسانی کنید",
      personalInformation: "اطلاعات شخصی",
      addressInformation: "اطلاعات آدرس",
      professionalInfo: "اطلاعات حرفه‌ای",
      preferences: "ترجیحات",
      fullName: "نام کامل",
      emailAddress: "آدرس ایمیل",
      phoneNumber: "شماره تلفن",
      dateOfBirth: "تاریخ تولد",
      gender: "جنسیت",
      addressLine1: "آدرس خط 1",
      addressLine2: "آدرس خط 2",
      city: "شهر",
      stateProvince: "استان",
      postalCode: "کد پستی",
      country: "کشور",
      occupation: "شغل",
      companyName: "نام شرکت",
      annualIncome: "درآمد سالانه",
      purposeOfAccount: "هدف از افتتاح حساب",
      preferredCurrency: "ارز ترجیحی",
      newsletterSubscription: "عضویت در خبرنامه",
      smsAlerts: "هشدارهای SMS",
      subscribed: "عضویت دارد",
      notSubscribed: "عضویت ندارد",
      enabled: "فعال",
      disabled: "غیرفعال",
      notSpecified: "مشخص نشده",
      saveChanges: "ذخیره تغییرات",
      saving: "در حال ذخیره...",
      cancel: "لغو",
      selectGender: "انتخاب جنسیت",
      male: "مرد",
      female: "زن",
      other: "سایر",
      selectCountry: "انتخاب کشور",
      selectState: "انتخاب استان",
      selectCity: "انتخاب شهر",
      selectIncome: "انتخاب محدوده درآمد",
      under25k: "کمتر از $25,000",
      range25to50k: "$25,000 - $50,000",
      range50to100k: "$50,000 - $100,000",
      range100to250k: "$100,000 - $250,000",
      over250k: "$250,000+",
      personalUse: "استفاده شخصی",
      businessTrade: "کسب و کار/تجارت",
      investment: "سرمایه‌گذاری",
      travel: "سفر",
      education: "تحصیل",
      remittance: "حواله",
      usd: "USD - دلار آمریکا",
      eur: "EUR - یورو",
      gbp: "GBP - پوند بریتانیا",
      pkr: "PKR - روپیه پاکستان",
      aed: "AED - درهم امارات",
      sar: "SAR - ریال سعودی",
      afn: "AFN - افغانی افغانستان",
      subscribeNewsletter: "عضویت در خبرنامه",
      receiveSmsAlerts: "دریافت هشدارهای SMS",
      receiveMarketingEmails: "دریافت ایمیل‌های بازاریابی",
      profileUpdated: "پروفایل با موفقیت به‌روزرسانی شد!",
      redirecting: "در حال انتقال به داشبورد...",
      loadingProfile: "در حال بارگذاری پروفایل...",
      active: "فعال",
      pending: "در انتظار",
      streetAddress: "آدرس خیابان",
      apartmentSuite: "آپارتمان، سوئیت و غیره",
      errors: {
        fullNameRequired: "نام کامل الزامی است",
        phoneRequired: "شماره تلفن الزامی است"
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

  // User data state
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    occupation: '',
    companyName: '',
    annualIncome: '',
    purposeOfAccount: '',
    currencyPreference: 'USD',
    newsletterSubscribed: false,
    smsAlerts: false,
    agreeMarketing: false,
    memberSince: '',
    lastLogin: '',
    accountStatus: '',
    emailVerified: false,
    phoneVerified: false,
    profileCompletion: 0
  });

  // Load user data from Redux
  useEffect(() => {
    if (user) {
      const customerData = user.customerData || {};
      
      setUserData({
        fullName: user.profile?.fullName || '',
        email: user.email || '',
        phone: user.profile?.phone || '',
        dateOfBirth: customerData.dateOfBirth ? new Date(customerData.dateOfBirth).toISOString().split('T')[0] : '',
        gender: customerData.gender || '',
        addressLine1: customerData.addressLine1 || '',
        addressLine2: customerData.addressLine2 || '',
        city: customerData.city || '',
        state: customerData.state || '',
        postalCode: customerData.postalCode || '',
        country: customerData.country || '',
        occupation: customerData.occupation || '',
        companyName: customerData.companyName || '',
        annualIncome: customerData.annualIncome || '',
        purposeOfAccount: customerData.purposeOfAccount || 'personal',
        currencyPreference: customerData.currencyPreference || 'USD',
        newsletterSubscribed: customerData.newsletterSubscribed || false,
        smsAlerts: customerData.smsAlerts || false,
        agreeMarketing: customerData.agreeMarketing || false,
        memberSince: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '',
        lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never',
        accountStatus: user.status || 'pending',
        emailVerified: user.emailVerified || false,
        phoneVerified: user.phoneVerified || false,
        profileCompletion: calculateProfileCompletion(user, customerData)
      });
      
      // Initialize edit form data
      setEditFormData({
        fullName: user.profile?.fullName || '',
        phone: user.profile?.phone || '',
        dateOfBirth: customerData.dateOfBirth ? new Date(customerData.dateOfBirth).toISOString().split('T')[0] : '',
        gender: customerData.gender || '',
        addressLine1: customerData.addressLine1 || '',
        addressLine2: customerData.addressLine2 || '',
        city: customerData.city || '',
        state: customerData.state || '',
        postalCode: customerData.postalCode || '',
        country: customerData.country || '',
        occupation: customerData.occupation || '',
        companyName: customerData.companyName || '',
        annualIncome: customerData.annualIncome || '',
        purposeOfAccount: customerData.purposeOfAccount || 'personal',
        currencyPreference: customerData.currencyPreference || 'USD',
        newsletterSubscribed: customerData.newsletterSubscribed || false,
        smsAlerts: customerData.smsAlerts || false,
        agreeMarketing: customerData.agreeMarketing || false
      });
    }
  }, [user]);

  // Load states when country changes in edit mode
  useEffect(() => {
    if (editFormData.country) {
      const countryStates = State.getStatesOfCountry(editFormData.country);
      setStates(countryStates);
    } else {
      setStates([]);
    }
  }, [editFormData.country]);

  // Load cities when state changes
  useEffect(() => {
    if (editFormData.country && editFormData.state) {
      const countryCities = City.getCitiesOfState(editFormData.country, editFormData.state);
      setCities(countryCities);
    } else {
      setCities([]);
    }
  }, [editFormData.country, editFormData.state]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [error, updateError, dispatch]);

  // Handle successful profile update
  useEffect(() => {
    if (updateSuccess) {
      toast.success(t.profileUpdated);
      setIsEditing(false);
      dispatch(loadUserAction());
      dispatch({ type: UPDATE_PROFILE_RESET });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [updateSuccess, dispatch, navigate, t]);

  // Calculate profile completion percentage
  const calculateProfileCompletion = (user, customerData) => {
    let completed = 0;
    const totalFields = 14;
    
    if (user.profile?.fullName) completed++;
    if (user.email) completed++;
    if (user.profile?.phone) completed++;
    if (customerData.dateOfBirth) completed++;
    if (customerData.gender) completed++;
    if (customerData.addressLine1) completed++;
    if (customerData.city) completed++;
    if (customerData.country) completed++;
    if (customerData.postalCode) completed++;
    if (customerData.occupation) completed++;
    if (customerData.annualIncome) completed++;
    if (customerData.purposeOfAccount) completed++;
    if (customerData.currencyPreference) completed++;
    
    return Math.round((completed / totalFields) * 100);
  };

  // Get country name from code
  const getCountryName = (countryCode) => {
    const country = Country.getCountryByCode(countryCode);
    return country ? country.name : countryCode;
  };

  // Get state name from code
  const getStateName = (countryCode, stateCode) => {
    const state = State.getStateByCodeAndCountry(stateCode, countryCode);
    return state ? state.name : stateCode;
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return t.notSpecified;
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (code) => {
    const currencies = {
      USD: { symbol: '$', name: 'US Dollar' },
      EUR: { symbol: '€', name: 'Euro' },
      GBP: { symbol: '£', name: 'British Pound' },
      PKR: { symbol: '₨', name: 'Pakistani Rupee' },
      AED: { symbol: 'د.إ', name: 'UAE Dirham' },
      SAR: { symbol: 'ر.س', name: 'Saudi Riyal' },
      AFN: { symbol: '؋', name: 'Afghan Afghani' }
    };
    return currencies[code] || { symbol: code, name: code };
  };

  // Format income range
  const formatIncomeRange = (range) => {
    const ranges = {
      '0-25000': t.under25k,
      '25000-50000': t.range25to50k,
      '50000-100000': t.range50to100k,
      '100000-250000': t.range100to250k,
      '250000+': t.over250k
    };
    return ranges[range] || range;
  };

  // Get gender label
  const getGenderLabel = (gender) => {
    const genders = {
      male: t.male,
      female: t.female,
      other: t.other
    };
    return genders[gender] || gender;
  };

  // Get purpose label
  const getPurposeLabel = (purpose) => {
    const purposes = {
      personal: t.personalUse,
      business: t.businessTrade,
      investment: t.investment,
      travel: t.travel,
      education: t.education,
      remittance: t.remittance
    };
    return purposes[purpose] || purpose;
  };

  // Handle copy text
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopyTooltip(true);
    setTimeout(() => setShowCopyTooltip(false), 2000);
  };

  // Handle edit form input change
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (editErrors[name]) {
      setEditErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate edit form
  const validateEditForm = () => {
    const newErrors = {};
    if (!editFormData.fullName) newErrors.fullName = t.errors.fullNameRequired;
    if (!editFormData.phone) newErrors.phone = t.errors.phoneRequired;
    return newErrors;
  };

  // Handle save profile
  const handleSaveProfile = () => {
    const validationErrors = validateEditForm();
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }
    
    // Prepare data for API - match backend structure
    const updateData = {
      fullName: editFormData.fullName,
      phone: editFormData.phone,
      dateOfBirth: editFormData.dateOfBirth || null,
      gender: editFormData.gender || null,
      addressLine1: editFormData.addressLine1 || '',
      addressLine2: editFormData.addressLine2 || '',
      city: editFormData.city || '',
      state: editFormData.state || '',
      postalCode: editFormData.postalCode || '',
      country: editFormData.country || '',
      occupation: editFormData.occupation || '',
      companyName: editFormData.companyName || '',
      annualIncome: editFormData.annualIncome || '',
      purposeOfAccount: editFormData.purposeOfAccount || 'personal',
      currencyPreference: editFormData.currencyPreference || 'USD',
      newsletterSubscribed: editFormData.newsletterSubscribed,
      smsAlerts: editFormData.smsAlerts,
      agreeMarketing: editFormData.agreeMarketing
    };
    
    dispatch(updateProfileAction(updateData));
  };

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

  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loadingProfile}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mb-4"
            style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
          >
            <ArrowLeft size={18} />
            <span>{t.backToDashboard}</span>
          </Link>
        </div>

        {/* Profile Header Card */}
        <motion.div
          variants={fadeInUp}
          className="bg-gradient-to-r from-green-600 to-red-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/50">
                  <span className="text-4xl font-bold text-white">
                    {userData.fullName?.charAt(0) || 'U'}
                  </span>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{userData.fullName || 'User'}</h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Mail size={16} className="text-white/80" />
                    <span className="text-white/90">{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Phone size={16} className="text-white/80" />
                    <span className="text-white/90">{userData.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-4 md:mt-0" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
                style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
              >
                <Edit size={18} />
                <span>{t.editProfile}</span>
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-white/80">{t.memberSince}</p>
              <p className="text-lg font-semibold">{userData.memberSince || 'N/A'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-white/80">{t.lastLogin}</p>
              <p className="text-lg font-semibold">{userData.lastLogin || 'Never'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-white/80">{t.accountStatus}</p>
              <p className="text-lg font-semibold capitalize flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${userData.accountStatus === 'active' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                {userData.accountStatus === 'active' ? t.active : t.pending}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-white/80">{t.profileCompletion}</p>
              <div className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <div className="flex-1 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full" 
                    style={{ width: `${userData.profileCompletion}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">{userData.profileCompletion}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit Profile Modal - with translations */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
                <div className="flex items-center gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Edit className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{t.editProfileTitle}</h2>
                    <p className="text-xs text-gray-500">{t.editProfileSubtitle}</p>
                  </div>
                </div>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Personal Information */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.personalInformation}</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.fullName} *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 border ${editErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-green-500`}
                    />
                    {editErrors.fullName && <p className="mt-1 text-xs text-red-600">{editErrors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.phoneNumber} *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 border ${editErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-green-500`}
                    />
                    {editErrors.phone && <p className="mt-1 text-xs text-red-600">{editErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.dateOfBirth}</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editFormData.dateOfBirth}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.gender}</label>
                    <select
                      name="gender"
                      value={editFormData.gender}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    >
                      <option value="">{t.selectGender}</option>
                      <option value="male">{t.male}</option>
                      <option value="female">{t.female}</option>
                      <option value="other">{t.other}</option>
                    </select>
                  </div>

                  {/* Address Information */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.addressInformation}</h3>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.addressLine1}</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={editFormData.addressLine1}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder={t.streetAddress}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.addressLine2}</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={editFormData.addressLine2}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder={t.apartmentSuite}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.country}</label>
                    <select
                      name="country"
                      value={editFormData.country}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    >
                      <option value="">{t.selectCountry}</option>
                      {countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.stateProvince}</label>
                    <select
                      name="state"
                      value={editFormData.state}
                      onChange={handleEditChange}
                      disabled={!editFormData.country}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:bg-gray-100"
                    >
                      <option value="">{t.selectState}</option>
                      {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.city}</label>
                    <select
                      name="city"
                      value={editFormData.city}
                      onChange={handleEditChange}
                      disabled={!editFormData.state}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:bg-gray-100"
                    >
                      <option value="">{t.selectCity}</option>
                      {cities.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.postalCode}</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={editFormData.postalCode}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>

                  {/* Professional Information */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.professionalInfo}</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.occupation}</label>
                    <input
                      type="text"
                      name="occupation"
                      value={editFormData.occupation}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.companyName}</label>
                    <input
                      type="text"
                      name="companyName"
                      value={editFormData.companyName}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.annualIncome}</label>
                    <select
                      name="annualIncome"
                      value={editFormData.annualIncome}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    >
                      <option value="">{t.selectIncome}</option>
                      <option value="0-25000">{t.under25k}</option>
                      <option value="25000-50000">{t.range25to50k}</option>
                      <option value="50000-100000">{t.range50to100k}</option>
                      <option value="100000-250000">{t.range100to250k}</option>
                      <option value="250000+">{t.over250k}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.purposeOfAccount}</label>
                    <select
                      name="purposeOfAccount"
                      value={editFormData.purposeOfAccount}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    >
                      <option value="personal">{t.personalUse}</option>
                      <option value="business">{t.businessTrade}</option>
                      <option value="investment">{t.investment}</option>
                      <option value="travel">{t.travel}</option>
                      <option value="education">{t.education}</option>
                      <option value="remittance">{t.remittance}</option>
                    </select>
                  </div>

                  {/* Preferences */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.preferences}</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.preferredCurrency}</label>
                    <select
                      name="currencyPreference"
                      value={editFormData.currencyPreference}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    >
                      <option value="USD">{t.usd}</option>
                      <option value="EUR">{t.eur}</option>
                      <option value="GBP">{t.gbp}</option>
                      <option value="PKR">{t.pkr}</option>
                      <option value="AED">{t.aed}</option>
                      <option value="SAR">{t.sar}</option>
                      <option value="AFN">{t.afn}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <input
                        type="checkbox"
                        name="newsletterSubscribed"
                        checked={editFormData.newsletterSubscribed}
                        onChange={handleEditChange}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{t.subscribeNewsletter}</span>
                    </label>
                    <label className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <input
                        type="checkbox"
                        name="smsAlerts"
                        checked={editFormData.smsAlerts}
                        onChange={handleEditChange}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{t.receiveSmsAlerts}</span>
                    </label>
                    <label className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <input
                        type="checkbox"
                        name="agreeMarketing"
                        checked={editFormData.agreeMarketing}
                        onChange={handleEditChange}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{t.receiveMarketingEmails}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t p-4 flex gap-2 justify-end" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={updateLoading}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  {updateLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>{t.saving}</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>{t.saveChanges}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Success Message */}
        {updateSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-700 font-medium">{t.profileUpdated}</p>
              <p className="text-sm text-green-600">{t.redirecting}</p>
            </div>
          </div>
        )}

        {/* Main Content Grid - View Mode */}
        {!isEditing && !updateSuccess && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Personal & Address Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information Section */}
              <motion.div
                variants={fadeInLeft}
                className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-600" />
                    {t.personalInformation}
                  </h2>
                  <button
                    onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPersonalInfo ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {showPersonalInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.fullName}</label>
                      <div className="flex items-center justify-between group" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <p className="text-gray-900 font-medium">{userData.fullName || t.notSpecified}</p>
                        <button
                          onClick={() => handleCopy(userData.fullName)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy size={14} className="text-gray-400 hover:text-green-600" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.emailAddress}</label>
                      <div className="flex items-center justify-between group" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <p className="text-gray-900 font-medium">{userData.email}</p>
                        <button
                          onClick={() => handleCopy(userData.email)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy size={14} className="text-gray-400 hover:text-green-600" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.phoneNumber}</label>
                      <div className="flex items-center justify-between group" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <p className="text-gray-900 font-medium">{userData.phone || t.notSpecified}</p>
                        <button
                          onClick={() => handleCopy(userData.phone)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy size={14} className="text-gray-400 hover:text-green-600" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.dateOfBirth}</label>
                      <p className="text-gray-900 font-medium">{formatDate(userData.dateOfBirth)}</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.gender}</label>
                      <p className="text-gray-900 font-medium capitalize">{getGenderLabel(userData.gender)}</p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Address Information Section */}
              <motion.div
                variants={fadeInLeft}
                className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    {t.addressInformation}
                  </h2>
                  <button
                    onClick={() => setShowAddressInfo(!showAddressInfo)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showAddressInfo ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {showAddressInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">{t.addressLine1}</label>
                      <div className="flex items-center justify-between group" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <p className="text-gray-900 font-medium">{userData.addressLine1 || t.notSpecified}</p>
                        <button
                          onClick={() => handleCopy(userData.addressLine1)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy size={14} className="text-gray-400 hover:text-green-600" />
                        </button>
                      </div>
                    </div>
                    {userData.addressLine2 && (
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">{t.addressLine2}</label>
                        <p className="text-gray-900 font-medium">{userData.addressLine2}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.city}</label>
                      <p className="text-gray-900 font-medium">{userData.city || t.notSpecified}</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.stateProvince}</label>
                      <p className="text-gray-900 font-medium">
                        {userData.state ? getStateName(userData.country, userData.state) : t.notSpecified}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.postalCode}</label>
                      <p className="text-gray-900 font-medium">{userData.postalCode || t.notSpecified}</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.country}</label>
                      <p className="text-gray-900 font-medium">{getCountryName(userData.country) || t.notSpecified}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Column - Professional & Preferences */}
            <div className="space-y-6">
              {/* Professional Information Section */}
              <motion.div
                variants={fadeInRight}
                className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                    {t.professionalInfo}
                  </h2>
                  <button
                    onClick={() => setShowProfessionalInfo(!showProfessionalInfo)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showProfessionalInfo ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {showProfessionalInfo && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.occupation}</label>
                      <p className="text-gray-900 font-medium">{userData.occupation || t.notSpecified}</p>
                    </div>
                    {userData.companyName && (
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">{t.companyName}</label>
                        <p className="text-gray-900 font-medium">{userData.companyName}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.annualIncome}</label>
                      <p className="text-gray-900 font-medium">{formatIncomeRange(userData.annualIncome) || t.notSpecified}</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.purposeOfAccount}</label>
                      <p className="text-gray-900 font-medium capitalize">{getPurposeLabel(userData.purposeOfAccount)}</p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Preferences Section */}
              <motion.div
                variants={fadeInRight}
                className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-green-600" />
                    {t.preferences}
                  </h2>
                  <button
                    onClick={() => setShowPreferences(!showPreferences)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPreferences ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {showPreferences && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">{t.preferredCurrency}</label>
                      <div className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <span className="text-2xl">{formatCurrency(userData.currencyPreference).symbol}</span>
                        <span className="text-gray-900 font-medium">
                          {userData.currencyPreference} - {formatCurrency(userData.currencyPreference).name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <span className="text-sm text-gray-700">{t.newsletterSubscription}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        userData.newsletterSubscribed 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {userData.newsletterSubscribed ? t.subscribed : t.notSubscribed}
                      </span>
                    </div>
                    <div className="flex items-center justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <span className="text-sm text-gray-700">{t.smsAlerts}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        userData.smsAlerts 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {userData.smsAlerts ? t.enabled : t.disabled}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ViewProfile;