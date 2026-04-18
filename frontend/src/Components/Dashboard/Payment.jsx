import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Banknote, Wallet, ArrowLeft, CheckCircle, AlertCircle, 
  Landmark, Send, Loader2, XCircle, Clock, Info, Image, Trash2,
  Eye, EyeOff, Lock, Shield, Sparkles, Home, Users, Settings, LogOut, Globe,
  Bell, Menu, X, Key, User, ShoppingCart, Package, Truck, Warehouse,ChevronDown ,
  BarChart3, UserPlus, ClipboardList, BookOpen, CreditCard as CreditCardIcon
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { submitPaymentProofAction, clearPaymentErrors } from '../../actions/paymentActions';
import { logoutUserAction } from '../../actions/authActions';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state) => state.loginUser);
  const { loading: submitLoading, success, error } = useSelector((state) => state.submitPaymentProof);
  
  const [selectedCountry, setSelectedCountry] = useState('pakistan');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [transactionReference, setTransactionReference] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const fileInputRef = useRef(null);
  const userMenuRef = useRef(null);
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Language translations
  const translations = {
    en: {
      paymentCenter: "Payment Center",
      accountActivation: "Account Activation",
      accountActivationDesc: "Complete your payment to activate your account",
      secureGateway: "Secure Payment Gateway",
      backToDashboard: "Back to Dashboard",
      selectCountry: "Select Your Country",
      bankDetails: "Bank Account Details",
      paymentInstructions: "Payment Instructions",
      instructions: [
        "Transfer the exact amount to the bank account above",
        "Use your email address as payment reference",
        "Upload screenshot of the transaction",
        "Enter the transaction reference number",
        "Account will be activated within 24 hours"
      ],
      uploadScreenshot: "Upload Payment Screenshot",
      uploadFile: "Upload a file",
      dragDrop: "or drag and drop",
      fileFormats: "PNG, JPG, JPEG up to 5MB",
      screenshotSuccess: "Screenshot uploaded successfully",
      transactionDetails: "Transaction Details",
      transactionRef: "Transaction Reference Number",
      transactionRefPlaceholder: "Enter transaction ID or reference number",
      transactionRefHelp: "Enter the reference number from your bank transaction",
      paymentSummary: "Payment Summary",
      plan: "Plan",
      annualSubscription: "Annual Subscription",
      country: "Country",
      amount: "Amount",
      totalToPay: "Total to Pay",
      submitPayment: "Submit Payment Proof",
      processingPayment: "Processing Payment...",
      sslEncryption: "256-bit SSL Encryption",
      secureGatewayShort: "Secure Payment Gateway",
      thankYou: "Thank You for Your Payment!",
      thankYouDesc: "Your payment proof has been successfully submitted. Your account activation request is now pending review.",
      whatHappensNext: "What happens next?",
      verifyPayment: "Our system admin will verify your payment screenshot",
      verificationTime: "Verification typically takes 24-48 hours",
      emailConfirmation: "You will receive an email confirmation once your account is activated",
      fullAccess: "After activation, you'll have full access to all features",
      transactionRefLabel: "Transaction Reference",
      saveReference: "Please save this reference number for future inquiries",
      continueToDashboard: "Continue to Dashboard",
      logout: "Logout",
      // Country names
      pakistan: "Pakistan",
      afghanistan: "Afghanistan",
      uae: "United Arab Emirates",
      saudi: "Saudi Arabia",
      // Field labels
      countryLabel: "Country",
      bankName: "Bank Name",
      accountTitle: "Account Title",
      accountNumber: "Account Number",
      ibanNumber: "IBAN Number",
      annualCharges: "Annual Charges",
      // Errors
      errorUploadImage: "Please upload an image file (PNG, JPG, JPEG)",
      errorFileSize: "File size should be less than 5MB",
      errorScreenshotRequired: "Please upload payment screenshot",
      errorTransactionRef: "Please enter transaction reference number",
      errorUploadSuccess: "Screenshot uploaded successfully",
      errorLogoutSuccess: "Logged out successfully"
    },
    ur: {
      paymentCenter: "ادائیگی مرکز",
      accountActivation: "اکاؤنٹ ایکٹیویشن",
      accountActivationDesc: "اپنا اکاؤنٹ فعال کرنے کے لیے ادائیگی مکمل کریں",
      secureGateway: "محفوظ ادائیگی گیٹ وے",
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      selectCountry: "اپنا ملک منتخب کریں",
      bankDetails: "بینک اکاؤنٹ کی تفصیلات",
      paymentInstructions: "ادائیگی کی ہدایات",
      instructions: [
        "مندرجہ بالا بینک اکاؤنٹ میں عین رقم منتقل کریں",
        "اپنا ای میل پتہ بطور ادائیگی حوالہ استعمال کریں",
        "ٹرانزیکشن کا اسکرین شاٹ اپ لوڈ کریں",
        "ٹرانزیکشن حوالہ نمبر درج کریں",
        "اکاؤنٹ 24 گھنٹوں میں فعال کر دیا جائے گا"
      ],
      uploadScreenshot: "ادائیگی کا اسکرین شاٹ اپ لوڈ کریں",
      uploadFile: "فائل اپ لوڈ کریں",
      dragDrop: "یا گھسیٹیں اور چھوڑیں",
      fileFormats: "PNG, JPG, JPEG 5MB تک",
      screenshotSuccess: "اسکرین شاٹ کامیابی سے اپ لوڈ ہو گیا",
      transactionDetails: "ٹرانزیکشن کی تفصیلات",
      transactionRef: "ٹرانزیکشن حوالہ نمبر",
      transactionRefPlaceholder: "ٹرانزیکشن ID یا حوالہ نمبر درج کریں",
      transactionRefHelp: "بینک ٹرانزیکشن سے حوالہ نمبر درج کریں",
      paymentSummary: "ادائیگی کا خلاصہ",
      plan: "پلان",
      annualSubscription: "سالانہ رکنیت",
      country: "ملک",
      amount: "رقم",
      totalToPay: "ادا کرنے کی کل رقم",
      submitPayment: "ادائیگی کا ثبوت جمع کروائیں",
      processingPayment: "ادائیگی پر کارروائی ہو رہی ہے...",
      sslEncryption: "256-bit SSL خفیہ کاری",
      secureGatewayShort: "محفوظ ادائیگی گیٹ وے",
      thankYou: "آپ کی ادائیگی کا شکریہ!",
      thankYouDesc: "آپ کا ادائیگی کا ثبوت کامیابی سے جمع کر دیا گیا ہے۔ آپ کے اکاؤنٹ ایکٹیویشن کی درخواست زیر جائزہ ہے۔",
      whatHappensNext: "آگے کیا ہوتا ہے؟",
      verifyPayment: "ہمارا سسٹم ایڈمن آپ کے ادائیگی کے اسکرین شاٹ کی تصدیق کرے گا",
      verificationTime: "تصدیق میں عام طور پر 24-48 گھنٹے لگتے ہیں",
      emailConfirmation: "اکاؤنٹ فعال ہونے پر آپ کو ای میل تصدیق موصول ہوگی",
      fullAccess: "فعال ہونے کے بعد، آپ کو تمام خصوصیات تک مکمل رسائی حاصل ہوگی",
      transactionRefLabel: "ٹرانزیکشن حوالہ",
      saveReference: "براہ کرم مستقبل کی پوچھ گچھ کے لیے یہ حوالہ نمبر محفوظ رکھیں",
      continueToDashboard: "ڈیش بورڈ پر جاری رکھیں",
      logout: "لاگ آؤٹ",
      pakistan: "پاکستان",
      afghanistan: "افغانستان",
      uae: "متحدہ عرب امارات",
      saudi: "سعودی عرب",
      countryLabel: "ملک",
      bankName: "بینک کا نام",
      accountTitle: "اکاؤنٹ کا عنوان",
      accountNumber: "اکاؤنٹ نمبر",
      ibanNumber: "IBAN نمبر",
      annualCharges: "سالانہ چارجز",
      errorUploadImage: "براہ کرم ایک تصویری فائل اپ لوڈ کریں (PNG, JPG, JPEG)",
      errorFileSize: "فائل کا سائز 5MB سے کم ہونا چاہیے",
      errorScreenshotRequired: "براہ کرم ادائیگی کا اسکرین شاٹ اپ لوڈ کریں",
      errorTransactionRef: "براہ کرم ٹرانزیکشن حوالہ نمبر درج کریں",
      errorUploadSuccess: "اسکرین شاٹ کامیابی سے اپ لوڈ ہو گیا",
      errorLogoutSuccess: "کامیابی سے لاگ آؤٹ ہو گیا"
    },
    ps: {
      paymentCenter: "د تادیب مرکز",
      accountActivation: "حساب فعالول",
      accountActivationDesc: "خپل حساب فعالولو لپاره تادیه بشپړه کړئ",
      secureGateway: "خوندي تادیب دروازه",
      backToDashboard: "ډشبورډ ته راګرځئ",
      selectCountry: "خپل هیواد وټاکئ",
      bankDetails: "د بانک حساب جزیات",
      paymentInstructions: "د تادیب لارښوونې",
      instructions: [
        "پورتني بانک حساب ته دقیقه اندازه ولېږدئ",
        "خپل بریښنالیک پته د تادیب حوالې په توګه وکاروئ",
        "د راکړې ورکړې سکرین شاټ اپلوډ کړئ",
        "د راکړې ورکړې حواله شمېره دننه کړئ",
        "حساب به د 24 ساعتونو په ترڅ کې فعال شي"
      ],
      uploadScreenshot: "د تادیب سکرین شاټ اپلوډ کړئ",
      uploadFile: "فایل اپلوډ کړئ",
      dragDrop: "یا کش کړئ او پریږدئ",
      fileFormats: "PNG, JPG, JPEG تر 5MB پورې",
      screenshotSuccess: "سکرین شاټ بریالی شو",
      transactionDetails: "د راکړې ورکړې جزیات",
      transactionRef: "د راکړې ورکړې حواله شمېره",
      transactionRefPlaceholder: "د راکړې ورکړې ID یا حواله شمېره دننه کړئ",
      transactionRefHelp: "د بانک د راکړې ورکړې حواله شمېره دننه کړئ",
      paymentSummary: "د تادیب لنډیز",
      plan: "پلان",
      annualSubscription: "کلنۍ غړیتوب",
      country: "هیواد",
      amount: "اندازه",
      totalToPay: "د تادیب ټولټال",
      submitPayment: "د تادیب ثبوت وسپارئ",
      processingPayment: "په تادیب باندې عمل کیږي...",
      sslEncryption: "256-bit SSL کوډ کول",
      secureGatewayShort: "خوندي تادیب دروازه",
      thankYou: "ستاسو د تادیب مننه!",
      thankYouDesc: "ستاسو د تادیب ثبوت بریالی شو. ستاسو د حساب فعالولو غوښتنه اوس د بیاکتنې په حال کې ده.",
      whatHappensNext: "ورپسې څه کیږي؟",
      verifyPayment: "زموږ سیسټم مدیر به ستاسو د تادیب سکرین شاټ تایید کړي",
      verificationTime: "تایید عموماً 24-48 ساعته وخت نیسي",
      emailConfirmation: "کله چې حساب فعال شي تاسو به د بریښنالیک تصدیق ترلاسه کړئ",
      fullAccess: "د فعالولو وروسته، تاسو به ټولو ځانګړتیاوو ته بشپړ لاسرسی ولرئ",
      transactionRefLabel: "د راکړې ورکړې حواله",
      saveReference: "مهرباني وکړئ دا حواله شمېره د راتلونکو پوښتنو لپاره خوندي کړئ",
      continueToDashboard: "ډشبورډ ته دوام ورکړئ",
      logout: "وتل",
      pakistan: "پاکستان",
      afghanistan: "افغانستان",
      uae: "متحده عربي امارات",
      saudi: "سعودي عربستان",
      countryLabel: "هیواد",
      bankName: "د بانک نوم",
      accountTitle: "د حساب عنوان",
      accountNumber: "د حساب شمېره",
      ibanNumber: "IBAN شمېره",
      annualCharges: "کلنۍ فیسونه",
      errorUploadImage: "مهرباني وکړئ د انځور فایل اپلوډ کړئ (PNG, JPG, JPEG)",
      errorFileSize: "د فایل اندازه باید له 5MB څخه کمه وي",
      errorScreenshotRequired: "مهرباني وکړئ د تادیب سکرین شاټ اپلوډ کړئ",
      errorTransactionRef: "مهرباني وکړئ د راکړې ورکړې حواله شمېره دننه کړئ",
      errorUploadSuccess: "سکرین شاټ بریالی شو",
      errorLogoutSuccess: "په بریالیتوب سره وتل"
    },
    fa: {
      paymentCenter: "مرکز پرداخت",
      accountActivation: "فعال سازی حساب",
      accountActivationDesc: "برای فعال کردن حساب خود، پرداخت را کامل کنید",
      secureGateway: "دروازه پرداخت امن",
      backToDashboard: "بازگشت به داشبورد",
      selectCountry: "کشور خود را انتخاب کنید",
      bankDetails: "جزئیات حساب بانکی",
      paymentInstructions: "دستورالعمل‌های پرداخت",
      instructions: [
        "مبلغ دقیق را به حساب بانکی فوق انتقال دهید",
        "از آدرس ایمیل خود به عنوان مرجع پرداخت استفاده کنید",
        "اسکرین شات تراکنش را آپلود کنید",
        "شماره مرجع تراکنش را وارد کنید",
        "حساب ظرف 24 ساعت فعال می‌شود"
      ],
      uploadScreenshot: "آپلود اسکرین شات پرداخت",
      uploadFile: "آپلود فایل",
      dragDrop: "یا بکشید و رها کنید",
      fileFormats: "PNG, JPG, JPEG حداکثر 5MB",
      screenshotSuccess: "اسکرین شات با موفقیت آپلود شد",
      transactionDetails: "جزئیات تراکنش",
      transactionRef: "شماره مرجع تراکنش",
      transactionRefPlaceholder: "شناسه تراکنش یا شماره مرجع را وارد کنید",
      transactionRefHelp: "شماره مرجع تراکنش بانکی خود را وارد کنید",
      paymentSummary: "خلاصه پرداخت",
      plan: "طرح",
      annualSubscription: "اشتراک سالانه",
      country: "کشور",
      amount: "مبلغ",
      totalToPay: "مجموع قابل پرداخت",
      submitPayment: "ارسال مدرک پرداخت",
      processingPayment: "در حال پردازش پرداخت...",
      sslEncryption: "رمزنگاری 256-bit SSL",
      secureGatewayShort: "دروازه پرداخت امن",
      thankYou: "از پرداخت شما متشکریم!",
      thankYouDesc: "مدرک پرداخت شما با موفقیت ارسال شد. درخواست فعال سازی حساب شما در انتظار بررسی است.",
      whatHappensNext: "بعداً چه اتفاقی می‌افتد؟",
      verifyPayment: "مدیر سیستم ما اسکرین شات پرداخت شما را تأیید می‌کند",
      verificationTime: "تأیید معمولاً 24-48 ساعت طول می‌کشد",
      emailConfirmation: "پس از فعال شدن حساب، تأییدیه ایمیل دریافت خواهید کرد",
      fullAccess: "پس از فعال سازی، به تمام ویژگی‌ها دسترسی کامل خواهید داشت",
      transactionRefLabel: "مرجع تراکنش",
      saveReference: "لطفاً این شماره مرجع را برای سوالات بعدی ذخیره کنید",
      continueToDashboard: "ادامه به داشبورد",
      logout: "خروج",
      pakistan: "پاکستان",
      afghanistan: "افغانستان",
      uae: "امارات متحده عربی",
      saudi: "عربستان سعودی",
      countryLabel: "کشور",
      bankName: "نام بانک",
      accountTitle: "عنوان حساب",
      accountNumber: "شماره حساب",
      ibanNumber: "شماره IBAN",
      annualCharges: "هزینه سالانه",
      errorUploadImage: "لطفاً یک فایل تصویری آپلود کنید (PNG, JPG, JPEG)",
      errorFileSize: "اندازه فایل باید کمتر از 5MB باشد",
      errorScreenshotRequired: "لطفاً اسکرین شات پرداخت را آپلود کنید",
      errorTransactionRef: "لطفاً شماره مرجع تراکنش را وارد کنید",
      errorUploadSuccess: "اسکرین شات با موفقیت آپلود شد",
      errorLogoutSuccess: "با موفقیت خارج شدید"
    }
  };

  // Payment details based on country
  const paymentDetails = {
    pakistan: {
      country: 'Pakistan',
      bankName: 'United Bank Limited (UBL)',
      accountNo: '0092032983293828',
      accountTitle: 'Osman Exchange (Pvt) Ltd',
      iban: 'PK12UBLP0092032983293828',
      charges: '5000',
      currency: 'PKR',
      flag: '🇵🇰',
      description: 'Annual subscription fee for Pakistan'
    },
    afghanistan: {
      country: 'Afghanistan',
      bankName: 'Afghanistan International Bank (AIB)',
      accountNo: '0092032983293828',
      accountTitle: 'Osman Exchange Ltd',
      iban: 'AF1243483948342323',
      charges: '2500',
      currency: 'AFN',
      flag: '🇦🇫',
      description: 'Annual subscription fee for Afghanistan'
    },
    uae: {
      country: 'United Arab Emirates',
      bankName: 'Emirates NBD',
      accountNo: '0092032983293828',
      accountTitle: 'Osman Exchange FZE',
      iban: 'AE1243483948342323',
      charges: '500',
      currency: 'AED',
      flag: '🇦🇪',
      description: 'Annual subscription fee for UAE'
    },
    saudi: {
      country: 'Saudi Arabia',
      bankName: 'Al Rajhi Bank',
      accountNo: '0092032983293828',
      accountTitle: 'Osman Exchange LLC',
      iban: 'SA1243483948342323',
      charges: '500',
      currency: 'SAR',
      flag: '🇸🇦',
      description: 'Annual subscription fee for Saudi Arabia'
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

  // Country display names mapping
  const getCountryDisplayName = (key) => {
    const countryNames = {
      pakistan: t.pakistan,
      afghanistan: t.afghanistan,
      uae: t.uae,
      saudi: t.saudi
    };
    return countryNames[key] || paymentDetails[key].country;
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if already submitted
  useEffect(() => {
    const pendingPayment = localStorage.getItem('pendingPayment');
    if (pendingPayment) {
      setSubmitted(true);
    }
  }, []);

  // Handle success response
  useEffect(() => {
    if (success) {
      setIsSubmitting(false);
      setSubmitted(true);
      
      const paymentInfo = {
        country: selectedCountry,
        amount: paymentDetails[selectedCountry].charges,
        currency: paymentDetails[selectedCountry].currency,
        transactionReference: transactionReference,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      localStorage.setItem('pendingPayment', JSON.stringify(paymentInfo));
      
      toast.success(t.thankYouDesc);
    }
  }, [success, selectedCountry, transactionReference, paymentDetails, t]);

  // Handle error
  useEffect(() => {
    if (error) {
      setIsSubmitting(false);
      toast.error(error);
      dispatch(clearPaymentErrors());
    }
  }, [error, dispatch]);

  // Handle logout
  const handleLogout = async () => {
    await dispatch(logoutUserAction());
    toast.success(t.errorLogoutSuccess);
    navigate('/login');
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error(t.errorUploadImage);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t.errorFileSize);
        return;
      }
      
      setScreenshotFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
      };
      reader.readAsDataURL(file);
      toast.success(t.errorUploadSuccess);
    }
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePaymentSubmit = async () => {
    if (!screenshotFile) {
      toast.error(t.errorScreenshotRequired);
      return;
    }
    if (!transactionReference) {
      toast.error(t.errorTransactionRef);
      return;
    }
    
    setIsSubmitting(true);
    
    // Create form data for API
    const formData = new FormData();
    formData.append('country', paymentDetails[selectedCountry].country);
    formData.append('amount', paymentDetails[selectedCountry].charges);
    formData.append('currency', paymentDetails[selectedCountry].currency);
    formData.append('transactionReference', transactionReference);
    formData.append('screenshot', screenshotFile);
    
    // Dispatch API call
    await dispatch(submitPaymentProofAction(formData));
  };

  const closePaymentModal = () => {
    navigate('/dashboard');
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Navigation Bar with Logout Button */}
      <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Logo / Brand */}
            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-lg hidden sm:inline">{t.paymentCenter}</span>
            </div>

            {/* Right side - User Menu with Logout */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-800 transition-all duration-200 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {user?.profile?.fullName?.charAt(0) || 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-white">
                    {user?.profile?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-64 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden`}
                >
                  <div className="p-4 border-b border-gray-700">
                    <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold">
                        {user?.profile?.fullName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{user?.profile?.fullName || 'User'}</p>
                        <p className="text-xs text-gray-400">{user?.email || 'user@example.com'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="border-t border-gray-700 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                    >
                      <LogOut size={16} />
                      <span>{t.logout}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="transition-all duration-300">
        <div className="p-4 lg:p-8">
          {!submitted ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="mb-8">
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors mb-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <ArrowLeft size={18} />
                  <span>{t.backToDashboard}</span>
                </Link>
                
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CreditCardIcon className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-green-500">{t.paymentCenter}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">{t.accountActivation}</h1>
                    <p className="text-gray-400 mt-1">{t.accountActivationDesc}</p>
                  </div>
                  <div className="hidden lg:block">
                    <div className={`flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-300">{t.secureGateway}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side - Country Selection & Bank Details */}
                <motion.div variants={fadeInUp} className="space-y-6">
                  {/* Country Selection */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className={`text-lg font-semibold text-white mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Globe size={18} className="text-green-500" />
                      {t.selectCountry}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(paymentDetails).map(([key, detail]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedCountry(key)}
                          className={`p-4 rounded-xl border-2 transition-all ${selectedCountry === key 
                            ? 'border-green-500 bg-green-500/20' 
                            : 'border-gray-700 hover:border-gray-500 bg-white/5'
                          }`}
                        >
                          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <span className="text-3xl">{detail.flag}</span>
                              <div className={`text-left ${isRTL ? 'text-right' : ''}`}>
                                <p className="font-semibold text-white text-sm">{getCountryDisplayName(key)}</p>
                                <p className="text-xs text-gray-400">{detail.charges} {detail.currency}</p>
                              </div>
                            </div>
                            {selectedCountry === key && <CheckCircle className="w-5 h-5 text-green-500" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="bg-gradient-to-br from-green-600/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className={`text-lg font-semibold text-white mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Landmark className="w-5 h-5 text-green-500" />
                      {t.bankDetails}
                    </h3>
                    <div className="space-y-4">
                      <div className={`flex justify-between items-center py-2 border-b border-white/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-400">{t.countryLabel}</span>
                        <span className="font-medium text-white">{getCountryDisplayName(selectedCountry)}</span>
                      </div>
                      <div className={`flex justify-between items-center py-2 border-b border-white/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-400">{t.bankName}</span>
                        <span className="font-medium text-white">{paymentDetails[selectedCountry].bankName}</span>
                      </div>
                      <div className={`flex justify-between items-center py-2 border-b border-white/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-400">{t.accountTitle}</span>
                        <span className="font-medium text-white">{paymentDetails[selectedCountry].accountTitle}</span>
                      </div>
                      <div className={`flex justify-between items-center py-2 border-b border-white/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-400">{t.accountNumber}</span>
                        <span className="font-mono text-sm font-medium text-white">{paymentDetails[selectedCountry].accountNo}</span>
                      </div>
                      <div className={`flex justify-between items-center py-2 border-b border-white/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-400">{t.ibanNumber}</span>
                        <span className="font-mono text-xs font-medium text-white">{paymentDetails[selectedCountry].iban}</span>
                      </div>
                      <div className={`flex justify-between items-center py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-400">{t.annualCharges}</span>
                        <span className="text-2xl font-bold text-green-500">
                          {paymentDetails[selectedCountry].charges} {paymentDetails[selectedCountry].currency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  <div className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                    <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">{t.paymentInstructions}</p>
                        <ul className="text-xs text-gray-300 mt-2 space-y-1">
                          {t.instructions.map((instruction, idx) => (
                            <li key={idx} className={isRTL ? 'text-right' : ''}>• {instruction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Upload & Submit */}
                <motion.div variants={fadeInUp} className="space-y-6">
                  {/* Screenshot Upload */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className={`text-lg font-semibold text-white mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Image className="w-5 h-5 text-green-500" />
                      {t.uploadScreenshot}
                    </h3>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-600 rounded-xl hover:border-green-500 transition-colors">
                      {!screenshotPreview ? (
                        <div className="space-y-1 text-center">
                          <div className="flex justify-center">
                            <Image className="w-12 h-12 text-gray-500" />
                          </div>
                          <div className="flex text-sm text-gray-400 justify-center">
                            <label
                              htmlFor="screenshot-upload"
                              className="relative cursor-pointer rounded-md font-medium text-green-500 hover:text-green-400 focus-within:outline-none"
                            >
                              <span>{t.uploadFile}</span>
                              <input
                                ref={fileInputRef}
                                id="screenshot-upload"
                                name="screenshot-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleScreenshotUpload}
                              />
                            </label>
                            <p className="pl-1">{t.dragDrop}</p>
                          </div>
                          <p className="text-xs text-gray-500">{t.fileFormats}</p>
                        </div>
                      ) : (
                        <div className="relative w-full">
                          <div className="relative">
                            <img 
                              src={screenshotPreview} 
                              alt="Payment Screenshot" 
                              className="max-h-48 mx-auto rounded-lg border border-gray-600"
                            />
                            <button
                              onClick={removeScreenshot}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-center text-xs text-gray-400 mt-2">
                            {t.screenshotSuccess}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction Reference */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className={`text-lg font-semibold text-white mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CreditCard className="w-5 h-5 text-green-500" />
                      {t.transactionDetails}
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t.transactionRef} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={transactionReference}
                        onChange={(e) => setTransactionReference(e.target.value)}
                        placeholder={t.transactionRefPlaceholder}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        {t.transactionRefHelp}
                      </p>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-gradient-to-r from-green-600/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className={`text-lg font-semibold text-white mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Wallet className="w-5 h-5 text-green-500" />
                      {t.paymentSummary}
                    </h3>
                    <div className="space-y-3">
                      <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-400">{t.plan}</span>
                        <span className="text-white">{t.annualSubscription}</span>
                      </div>
                      <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-400">{t.country}</span>
                        <span className="text-white">{getCountryDisplayName(selectedCountry)}</span>
                      </div>
                      <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-400">{t.amount}</span>
                        <span className="text-xl font-bold text-green-500">
                          {paymentDetails[selectedCountry].charges} {paymentDetails[selectedCountry].currency}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-white/10">
                        <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="text-gray-400">{t.totalToPay}</span>
                          <span className="text-2xl font-bold text-white">
                            {paymentDetails[selectedCountry].charges} {paymentDetails[selectedCountry].currency}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={isSubmitting || !screenshotFile || !transactionReference || submitLoading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting || submitLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{t.processingPayment}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t.submitPayment}</span>
                      </>
                    )}
                  </button>

                  {/* Security Notice */}
                  <div className={`flex items-center justify-center gap-2 text-xs text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Lock size={12} />
                    <span>{t.sslEncryption}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <Shield size={12} />
                    <span>{t.secureGatewayShort}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* Success Message */
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {t.thankYou}
              </h2>
              <p className="text-gray-300 mb-6">
                {t.thankYouDesc}
              </p>
              
              {/* What Happens Next */}
              <div className="bg-blue-500/10 rounded-xl p-6 mb-6 border border-blue-500/30 text-left">
                <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-6 h-6 text-blue-500" />
                  <p className="text-md font-semibold text-white">{t.whatHappensNext}</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle size={16} className="mt-0.5 text-green-500 flex-shrink-0" />
                    <span>{t.verifyPayment}</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle size={16} className="mt-0.5 text-green-500 flex-shrink-0" />
                    <span>{t.verificationTime}</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle size={16} className="mt-0.5 text-green-500 flex-shrink-0" />
                    <span>{t.emailConfirmation}</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle size={16} className="mt-0.5 text-green-500 flex-shrink-0" />
                    <span>{t.fullAccess}</span>
                  </li>
                </ul>
              </div>

              {/* Transaction Reference Display */}
              <div className="bg-green-500/10 rounded-xl p-4 mb-6 border border-green-500/30">
                <p className="text-sm text-green-500">
                  <strong>{t.transactionRefLabel}:</strong> {transactionReference}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {t.saveReference}
                </p>
              </div>

              <button
                onClick={closePaymentModal}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
              >
                {t.continueToDashboard}
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Payment;