import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Euro,
  Wallet,
  Percent,
  Receipt,
  Save,
  ArrowLeft,
  X,
  Plus,
  Minus,
  Globe,
  Building,
  Home,
  Briefcase,
  CreditCard,
  Landmark,
  TrendingUp,
  Calculator,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle
} from 'lucide-react';
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createTransactionAction, clearErrors } from "../../../actions/transactionActions";
import { CREATE_TRANSACTION_RESET } from "../../../constants/constants";

const CustomerRecordCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get state from Redux
  const { loading, error, success } = useSelector((state) => state.newTransaction);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer Information
    name: '',
    
    // Sender Details
    senderEmail: '',
    senderPhone: '',
    senderCurrency: 'USD',
    senderAmount: '',
    senderCountry: '',
    senderState: '',
    senderCity: '',
    senderAddress: '',
    
    // Receiver Details
    receiverEmail: '',
    receiverPhone: '',
    receiverCurrency: 'PKR',
    receiverAmount: '',
    receiverCountry: '',
    receiverState: '',
    receiverCity: '',
    receiverAddress: '',
    
    // Fees & Charges
    commission: '',
    fee: '',
    tax: '',
    exchangeRate: '',
    notes: '',
    
    // Status
    status: 'pending'
  });

  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState(null);
  
  // Country, State, City states
  const [countries] = useState(Country.getAllCountries());
  const [senderStates, setSenderStates] = useState([]);
  const [receiverStates, setReceiverStates] = useState([]);
  const [senderCities, setSenderCities] = useState([]);
  const [receiverCities, setReceiverCities] = useState([]);

  // Language translations
  const translations = {
    en: {
      backToCustomerRegistration: "Back to Customer Registration",
      newCustomerRecord: "New Customer Record",
      createSubtitle: "Create a new currency exchange transaction record",
      transactionSaved: "Transaction saved successfully!",
      redirecting: "Redirecting to customer registration...",
      errorSaving: "Error saving transaction",
      customerInfo: "Customer Info",
      address: "Address",
      transaction: "Transaction",
      customerInformation: "Customer Information",
      customerName: "Customer Name",
      enterFullName: "Enter customer full name",
      senderDetails: "Sender Details",
      receiverDetails: "Receiver Details",
      email: "Email",
      phone: "Phone",
      emailPlaceholder: "email@example.com",
      phonePlaceholder: "+92 300 1234567",
      addressInformation: "Address Information",
      senderAddress: "Sender Address",
      receiverAddress: "Receiver Address",
      country: "Country",
      selectCountry: "Select country",
      stateProvince: "State/Province",
      selectState: "Select state",
      city: "City",
      selectCity: "Select city",
      addressLine: "Address",
      addressPlaceholder: "Street address, building, etc.",
      transactionDetails: "Transaction Details",
      currencyExchange: "Currency Exchange",
      senderCurrency: "Sender Currency",
      receiverCurrency: "Receiver Currency",
      senderAmount: "Sender Amount",
      exchangeRate: "Exchange Rate",
      calculatedBreakdown: "Calculated Amount Breakdown",
      baseAmount: "Base Amount:",
      totalFees: "Total Fees (Commission + Fee + Tax):",
      finalAmount: "Final Amount to Receive:",
      feesCharges: "Fees & Charges",
      commission: "Commission",
      exchangeFee: "Exchange Fee",
      tax: "Tax",
      status: "Status",
      notes: "Notes (Optional)",
      notesPlaceholder: "Additional notes",
      nextStep: "Next Step",
      previous: "Previous",
      saveRecord: "Save Record",
      saving: "Saving...",
      required: "*",
      errors: {
        customerNameRequired: "Customer name is required",
        senderEmailRequired: "Sender email is required",
        invalidEmail: "Invalid email format",
        senderPhoneRequired: "Sender phone is required",
        receiverEmailRequired: "Receiver email is required",
        receiverPhoneRequired: "Receiver phone is required",
        senderCountryRequired: "Sender country is required",
        senderAddressRequired: "Sender address is required",
        receiverCountryRequired: "Receiver country is required",
        receiverAddressRequired: "Receiver address is required",
        senderCurrencyRequired: "Sender currency is required",
        receiverCurrencyRequired: "Receiver currency is required",
        senderAmountRequired: "Sender amount is required",
        amountGreaterThanZero: "Amount must be greater than 0",
        exchangeRateRequired: "Exchange rate is required",
        exchangeRateGreaterThanZero: "Exchange rate must be greater than 0"
      },
      statusOptions: {
        pending: "Pending",
        processing: "Processing",
        completed: "Completed",
        cancelled: "Cancelled"
      }
    },
    ur: {
      backToCustomerRegistration: "کسٹمر رجسٹریشن پر واپس جائیں",
      newCustomerRecord: "نیا کسٹمر ریکارڈ",
      createSubtitle: "کرنسی ایکسچینج کا نیا لین دین ریکارڈ بنائیں",
      transactionSaved: "لین دین کامیابی سے محفوظ ہو گیا!",
      redirecting: "کسٹمر رجسٹریشن پر جا رہے ہیں...",
      errorSaving: "لین دین محفوظ کرنے میں خرابی",
      customerInfo: "کسٹمر کی معلومات",
      address: "پتہ",
      transaction: "لین دین",
      customerInformation: "کسٹمر کی معلومات",
      customerName: "کسٹمر کا نام",
      enterFullName: "کسٹمر کا مکمل نام درج کریں",
      senderDetails: "بھیجنے والے کی تفصیلات",
      receiverDetails: "وصول کنندہ کی تفصیلات",
      email: "ای میل",
      phone: "فون",
      emailPlaceholder: "email@example.com",
      phonePlaceholder: "+92 300 1234567",
      addressInformation: "پتے کی معلومات",
      senderAddress: "بھیجنے والے کا پتہ",
      receiverAddress: "وصول کنندہ کا پتہ",
      country: "ملک",
      selectCountry: "ملک منتخب کریں",
      stateProvince: "ریاست/صوبہ",
      selectState: "ریاست منتخب کریں",
      city: "شہر",
      selectCity: "شہر منتخب کریں",
      addressLine: "پتہ",
      addressPlaceholder: "گلی کا پتہ، عمارت، وغیرہ",
      transactionDetails: "لین دین کی تفصیلات",
      currencyExchange: "کرنسی کا تبادلہ",
      senderCurrency: "بھیجنے والے کی کرنسی",
      receiverCurrency: "وصول کنندہ کی کرنسی",
      senderAmount: "بھیجنے والی رقم",
      exchangeRate: "تبادلے کی شرح",
      calculatedBreakdown: "حساب شدہ رقم کی تقسیم",
      baseAmount: "بنیادی رقم:",
      totalFees: "کل فیس (کمیشن + فیس + ٹیکس):",
      finalAmount: "وصول کرنے کے لیے حتمی رقم:",
      feesCharges: "فیس اور چارجز",
      commission: "کمیشن",
      exchangeFee: "تبادلے کی فیس",
      tax: "ٹیکس",
      status: "حالت",
      notes: "نوٹس (اختیاری)",
      notesPlaceholder: "اضافی نوٹس",
      nextStep: "اگلا مرحلہ",
      previous: "پچھلا",
      saveRecord: "ریکارڈ محفوظ کریں",
      saving: "محفوظ ہو رہا ہے...",
      required: "*",
      errors: {
        customerNameRequired: "کسٹمر کا نام درکار ہے",
        senderEmailRequired: "بھیجنے والے کی ای میل درکار ہے",
        invalidEmail: "غلط ای میل فارمیٹ",
        senderPhoneRequired: "بھیجنے والے کا فون درکار ہے",
        receiverEmailRequired: "وصول کنندہ کی ای میل درکار ہے",
        receiverPhoneRequired: "وصول کنندہ کا فون درکار ہے",
        senderCountryRequired: "بھیجنے والے کا ملک درکار ہے",
        senderAddressRequired: "بھیجنے والے کا پتہ درکار ہے",
        receiverCountryRequired: "وصول کنندہ کا ملک درکار ہے",
        receiverAddressRequired: "وصول کنندہ کا پتہ درکار ہے",
        senderCurrencyRequired: "بھیجنے والے کی کرنسی درکار ہے",
        receiverCurrencyRequired: "وصول کنندہ کی کرنسی درکار ہے",
        senderAmountRequired: "بھیجنے والی رقم درکار ہے",
        amountGreaterThanZero: "رقم صفر سے زیادہ ہونی چاہیے",
        exchangeRateRequired: "تبادلے کی شرح درکار ہے",
        exchangeRateGreaterThanZero: "تبادلے کی شرح صفر سے زیادہ ہونی چاہیے"
      },
      statusOptions: {
        pending: "زیر التواء",
        processing: "پروسیسنگ",
        completed: "مکمل شدہ",
        cancelled: "منسوخ شدہ"
      }
    },
    ps: {
      backToCustomerRegistration: "بیرته د پیرودونکي ثبتولو ته",
      newCustomerRecord: "نوی پیرودونکي ریکارډ",
      createSubtitle: "د اسعارو د تبادلې نوی راکړه ورکړه ریکارډ جوړ کړئ",
      transactionSaved: "راکړه ورکړه په بریالیتوب سره خوندي شوه!",
      redirecting: "د پیرودونکي ثبتولو ته لیږدول کیږي...",
      errorSaving: "د راکړې ورکړې خوندي کولو کې تېروتنه",
      customerInfo: "د پیرودونکي معلومات",
      address: "پته",
      transaction: "راکړه ورکړه",
      customerInformation: "د پیرودونکي معلومات",
      customerName: "د پیرودونکي نوم",
      enterFullName: "د پیرودونکي بشپړ نوم دننه کړئ",
      senderDetails: "د لیږونکي توضیحات",
      receiverDetails: "د ترلاسه کوونکي توضیحات",
      email: "بریښنالیک",
      phone: "تلیفون",
      emailPlaceholder: "email@example.com",
      phonePlaceholder: "+92 300 1234567",
      addressInformation: "د پتې معلومات",
      senderAddress: "د لیږونکي پته",
      receiverAddress: "د ترلاسه کوونکي پته",
      country: "هیواد",
      selectCountry: "هیواد وټاکئ",
      stateProvince: "ایالت/ولایت",
      selectState: "ایالت وټاکئ",
      city: "ښار",
      selectCity: "ښار وټاکئ",
      addressLine: "پته",
      addressPlaceholder: "د کوڅې پته، ودانۍ، او داسې نور",
      transactionDetails: "د راکړې ورکړې توضیحات",
      currencyExchange: "د اسعارو تبادله",
      senderCurrency: "د لیږونکي اسعار",
      receiverCurrency: "د ترلاسه کوونکي اسعار",
      senderAmount: "د لیږونکي اندازه",
      exchangeRate: "د تبادلې نرخ",
      calculatedBreakdown: "حساب شوې اندازه ویش",
      baseAmount: "بنسټیزه اندازه:",
      totalFees: "ټولې فیسونه (کمیشن + فیس + مالیه):",
      finalAmount: "د ترلاسه کولو لپاره وروستۍ اندازه:",
      feesCharges: "فیسونه او چارجونه",
      commission: "کمیشن",
      exchangeFee: "د تبادلې فیس",
      tax: "مالیه",
      status: "حالت",
      notes: "یادښتونه (اختیاري)",
      notesPlaceholder: "اضافي یادښتونه",
      nextStep: "بل ګام",
      previous: "مخکینی",
      saveRecord: "ریکارډ خوندي کړئ",
      saving: "خوندي کیږي...",
      required: "*",
      errors: {
        customerNameRequired: "د پیرودونکي نوم اړین دی",
        senderEmailRequired: "د لیږونکي بریښنالیک اړین دی",
        invalidEmail: "غلط بریښنالیک بڼه",
        senderPhoneRequired: "د لیږونکي تلیفون اړین دی",
        receiverEmailRequired: "د ترلاسه کوونکي بریښنالیک اړین دی",
        receiverPhoneRequired: "د ترلاسه کوونکي تلیفون اړین دی",
        senderCountryRequired: "د لیږونکي هیواد اړین دی",
        senderAddressRequired: "د لیږونکي پته اړینه ده",
        receiverCountryRequired: "د ترلاسه کوونکي هیواد اړین دی",
        receiverAddressRequired: "د ترلاسه کوونکي پته اړینه ده",
        senderCurrencyRequired: "د لیږونکي اسعار اړین دی",
        receiverCurrencyRequired: "د ترلاسه کوونکي اسعار اړین دی",
        senderAmountRequired: "د لیږونکي اندازه اړینه ده",
        amountGreaterThanZero: "اندازه باید له صفر څخه زیاته وي",
        exchangeRateRequired: "د تبادلې نرخ اړین دی",
        exchangeRateGreaterThanZero: "د تبادلې نرخ باید له صفر څخه زیاته وي"
      },
      statusOptions: {
        pending: "په انتظار کې",
        processing: "پروسه روانه ده",
        completed: "بشپړ شوی",
        cancelled: "لغوه شوی"
      }
    },
    fa: {
      backToCustomerRegistration: "بازگشت به ثبت نام مشتری",
      newCustomerRecord: "رکورد جدید مشتری",
      createSubtitle: "ایجاد رکورد جدید تراکنش تبدیل ارز",
      transactionSaved: "تراکنش با موفقیت ذخیره شد!",
      redirecting: "در حال انتقال به ثبت نام مشتری...",
      errorSaving: "خطا در ذخیره تراکنش",
      customerInfo: "اطلاعات مشتری",
      address: "آدرس",
      transaction: "تراکنش",
      customerInformation: "اطلاعات مشتری",
      customerName: "نام مشتری",
      enterFullName: "نام کامل مشتری را وارد کنید",
      senderDetails: "جزئیات فرستنده",
      receiverDetails: "جزئیات گیرنده",
      email: "ایمیل",
      phone: "تلفن",
      emailPlaceholder: "email@example.com",
      phonePlaceholder: "+92 300 1234567",
      addressInformation: "اطلاعات آدرس",
      senderAddress: "آدرس فرستنده",
      receiverAddress: "آدرس گیرنده",
      country: "کشور",
      selectCountry: "انتخاب کشور",
      stateProvince: "استان",
      selectState: "انتخاب استان",
      city: "شهر",
      selectCity: "انتخاب شهر",
      addressLine: "آدرس",
      addressPlaceholder: "آدرس خیابان، ساختمان و غیره",
      transactionDetails: "جزئیات تراکنش",
      currencyExchange: "تبدیل ارز",
      senderCurrency: "ارز فرستنده",
      receiverCurrency: "ارز گیرنده",
      senderAmount: "مبلغ ارسالی",
      exchangeRate: "نرخ تبدیل",
      calculatedBreakdown: "تجزیه مبلغ محاسبه شده",
      baseAmount: "مبلغ پایه:",
      totalFees: "کل کارمزدها (کمیسیون + کارمزد + مالیات):",
      finalAmount: "مبلغ نهایی برای دریافت:",
      feesCharges: "کارمزدها و هزینه‌ها",
      commission: "کمیسیون",
      exchangeFee: "کارمزد تبدیل",
      tax: "مالیات",
      status: "وضعیت",
      notes: "یادداشت‌ها (اختیاری)",
      notesPlaceholder: "یادداشت‌های اضافی",
      nextStep: "مرحله بعد",
      previous: "قبلی",
      saveRecord: "ذخیره رکورد",
      saving: "در حال ذخیره...",
      required: "*",
      errors: {
        customerNameRequired: "نام مشتری الزامی است",
        senderEmailRequired: "ایمیل فرستنده الزامی است",
        invalidEmail: "فرمت ایمیل نامعتبر است",
        senderPhoneRequired: "تلفن فرستنده الزامی است",
        receiverEmailRequired: "ایمیل گیرنده الزامی است",
        receiverPhoneRequired: "تلفن گیرنده الزامی است",
        senderCountryRequired: "کشور فرستنده الزامی است",
        senderAddressRequired: "آدرس فرستنده الزامی است",
        receiverCountryRequired: "کشور گیرنده الزامی است",
        receiverAddressRequired: "آدرس گیرنده الزامی است",
        senderCurrencyRequired: "ارز فرستنده الزامی است",
        receiverCurrencyRequired: "ارز گیرنده الزامی است",
        senderAmountRequired: "مبلغ ارسالی الزامی است",
        amountGreaterThanZero: "مبلغ باید بیشتر از صفر باشد",
        exchangeRateRequired: "نرخ تبدیل الزامی است",
        exchangeRateGreaterThanZero: "نرخ تبدیل باید بیشتر از صفر باشد"
      },
      statusOptions: {
        pending: "در انتظار",
        processing: "در حال پردازش",
        completed: "تکمیل شده",
        cancelled: "لغو شده"
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

  // Currencies list with symbols
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
    { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', flag: '🇦🇫' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' }
  ];

  // Get currency symbol
  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

  // Format amount with currency symbol
  const formatAmount = (amount, currencyCode) => {
    if (!amount && amount !== 0) return 'N/A';
    const symbol = getCurrencySymbol(currencyCode);
    const formattedAmount = amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${symbol} ${formattedAmount}`;
  };

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  // Handle successful creation
  useEffect(() => {
    if (success) {
      setSaveSuccess(true);
      toast.success(t.transactionSaved);
      
      // Reset the transaction state
      dispatch({ type: CREATE_TRANSACTION_RESET });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/customer-registration');
      }, 2000);
    }
  }, [success, dispatch, navigate, t]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch({ type: CREATE_TRANSACTION_RESET });
    };
  }, [dispatch]);

  // Load sender states when country changes
  useEffect(() => {
    if (formData.senderCountry) {
      const states = State.getStatesOfCountry(formData.senderCountry);
      setSenderStates(states);
      setFormData(prev => ({ ...prev, senderState: '', senderCity: '' }));
    }
  }, [formData.senderCountry]);

  // Load receiver states when country changes
  useEffect(() => {
    if (formData.receiverCountry) {
      const states = State.getStatesOfCountry(formData.receiverCountry);
      setReceiverStates(states);
      setFormData(prev => ({ ...prev, receiverState: '', receiverCity: '' }));
    }
  }, [formData.receiverCountry]);

  // Load sender cities when state changes
  useEffect(() => {
    if (formData.senderCountry && formData.senderState) {
      const cities = City.getCitiesOfState(formData.senderCountry, formData.senderState);
      setSenderCities(cities);
    }
  }, [formData.senderCountry, formData.senderState]);

  // Load receiver cities when state changes
  useEffect(() => {
    if (formData.receiverCountry && formData.receiverState) {
      const cities = City.getCitiesOfState(formData.receiverCountry, formData.receiverState);
      setReceiverCities(cities);
    }
  }, [formData.receiverCountry, formData.receiverState]);

  // Calculate receiver amount when sender amount, rate, and fees change
  useEffect(() => {
    if (formData.senderAmount && formData.exchangeRate) {
      const sender = parseFloat(formData.senderAmount) || 0;
      const rate = parseFloat(formData.exchangeRate) || 0;
      const commission = parseFloat(formData.commission) || 0;
      const fee = parseFloat(formData.fee) || 0;
      const tax = parseFloat(formData.tax) || 0;
      
      const baseAmount = sender * rate;
      const totalFees = commission + fee + tax;
      const finalAmount = baseAmount - totalFees;
      
      setCalculatedAmount({
        base: baseAmount,
        fees: totalFees,
        final: finalAmount,
        senderCurrency: formData.senderCurrency,
        receiverCurrency: formData.receiverCurrency
      });
    }
  }, [formData.senderAmount, formData.exchangeRate, formData.commission, formData.fee, formData.tax, formData.senderCurrency, formData.receiverCurrency]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name) newErrors.name = t.errors.customerNameRequired;
      if (!formData.senderEmail) newErrors.senderEmail = t.errors.senderEmailRequired;
      else if (!/\S+@\S+\.\S+/.test(formData.senderEmail)) newErrors.senderEmail = t.errors.invalidEmail;
      if (!formData.senderPhone) newErrors.senderPhone = t.errors.senderPhoneRequired;
      if (!formData.receiverEmail) newErrors.receiverEmail = t.errors.receiverEmailRequired;
      if (!formData.receiverPhone) newErrors.receiverPhone = t.errors.receiverPhoneRequired;
    }
    
    if (step === 2) {
      if (!formData.senderCountry) newErrors.senderCountry = t.errors.senderCountryRequired;
      if (!formData.senderAddress) newErrors.senderAddress = t.errors.senderAddressRequired;
      if (!formData.receiverCountry) newErrors.receiverCountry = t.errors.receiverCountryRequired;
      if (!formData.receiverAddress) newErrors.receiverAddress = t.errors.receiverAddressRequired;
    }
    
    if (step === 3) {
      if (!formData.senderCurrency) newErrors.senderCurrency = t.errors.senderCurrencyRequired;
      if (!formData.receiverCurrency) newErrors.receiverCurrency = t.errors.receiverCurrencyRequired;
      if (!formData.senderAmount) newErrors.senderAmount = t.errors.senderAmountRequired;
      else if (parseFloat(formData.senderAmount) <= 0) newErrors.senderAmount = t.errors.amountGreaterThanZero;
      if (!formData.exchangeRate) newErrors.exchangeRate = t.errors.exchangeRateRequired;
      else if (parseFloat(formData.exchangeRate) <= 0) newErrors.exchangeRate = t.errors.exchangeRateGreaterThanZero;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepErrors = validateStep(3);
    
    if (Object.keys(stepErrors).length === 0) {
      // Prepare data for API
      const transactionData = {
        name: formData.name,
        senderEmail: formData.senderEmail,
        senderPhone: formData.senderPhone,
        senderCurrency: formData.senderCurrency,
        senderAmount: parseFloat(formData.senderAmount),
        senderCountry: formData.senderCountry,
        senderState: formData.senderState || '',
        senderCity: formData.senderCity || '',
        senderAddress: formData.senderAddress,
        receiverEmail: formData.receiverEmail,
        receiverPhone: formData.receiverPhone,
        receiverCurrency: formData.receiverCurrency,
        receiverCountry: formData.receiverCountry,
        receiverState: formData.receiverState || '',
        receiverCity: formData.receiverCity || '',
        receiverAddress: formData.receiverAddress,
        commission: parseFloat(formData.commission) || 0,
        fee: parseFloat(formData.fee) || 0,
        tax: parseFloat(formData.tax) || 0,
        exchangeRate: parseFloat(formData.exchangeRate),
        status: formData.status,
        notes: formData.notes || ''
      };
      
      // Dispatch create action
      dispatch(createTransactionAction(transactionData));
    } else {
      setErrors(stepErrors);
    }
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

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/customer-registration"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mb-4"
            style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
          >
            <ArrowLeft size={18} />
            <span>{t.backToCustomerRegistration}</span>
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {t.newCustomerRecord}
          </h1>
          <p className="text-gray-600 mt-1">{t.createSubtitle}</p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl flex items-center space-x-3 animate-fadeIn" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-700 font-medium">{t.transactionSaved}</p>
              <p className="text-sm text-green-600">{t.redirecting}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !saveSuccess && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-red-700 font-medium">{t.errorSaving}</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-green-500 to-red-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? <CheckCircle size={16} /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-gradient-to-r from-green-500 to-red-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-12 mt-2 text-xs" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <span className="text-gray-600">{t.customerInfo}</span>
            <span className="text-gray-600">{t.address}</span>
            <span className="text-gray-600">{t.transaction}</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <User className="w-5 h-5 text-green-600 mr-2" />
                  {t.customerInformation}
                </h2>

                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.customerName} <span className="text-red-500">{t.required}</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                    placeholder={t.enterFullName}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Sender Details */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Mail className="w-4 h-4 text-blue-600 mr-2" />
                    {t.senderDetails}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.email} <span className="text-red-500">{t.required}</span>
                      </label>
                      <input
                        type="email"
                        name="senderEmail"
                        value={formData.senderEmail}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.senderEmail ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.emailPlaceholder}
                      />
                      {errors.senderEmail && <p className="mt-1 text-sm text-red-600">{errors.senderEmail}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.phone} <span className="text-red-500">{t.required}</span>
                      </label>
                      <input
                        type="tel"
                        name="senderPhone"
                        value={formData.senderPhone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.senderPhone ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.phonePlaceholder}
                      />
                      {errors.senderPhone && <p className="mt-1 text-sm text-red-600">{errors.senderPhone}</p>}
                    </div>
                  </div>
                </div>

                {/* Receiver Details */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Mail className="w-4 h-4 text-red-600 mr-2" />
                    {t.receiverDetails}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.email} <span className="text-red-500">{t.required}</span>
                      </label>
                      <input
                        type="email"
                        name="receiverEmail"
                        value={formData.receiverEmail}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.receiverEmail ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.emailPlaceholder}
                      />
                      {errors.receiverEmail && <p className="mt-1 text-sm text-red-600">{errors.receiverEmail}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.phone} <span className="text-red-500">{t.required}</span>
                      </label>
                      <input
                        type="tel"
                        name="receiverPhone"
                        value={formData.receiverPhone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.receiverPhone ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.phonePlaceholder}
                      />
                      {errors.receiverPhone && <p className="mt-1 text-sm text-red-600">{errors.receiverPhone}</p>}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                  >
                    {t.nextStep}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Address Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <MapPin className="w-5 h-5 text-green-600 mr-2" />
                  {t.addressInformation}
                </h2>

                {/* Sender Address */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                    {t.senderAddress}
                  </h3>
                  <div className="space-y-4">
                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.country} <span className="text-red-500">{t.required}</span>
                      </label>
                      <select
                        name="senderCountry"
                        value={formData.senderCountry}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.senderCountry ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                      >
                        <option value="">{t.selectCountry}</option>
                        {countries.map(country => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {errors.senderCountry && <p className="mt-1 text-sm text-red-600">{errors.senderCountry}</p>}
                    </div>

                    {/* State/Province */}
                    {formData.senderCountry && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.stateProvince}
                        </label>
                        <select
                          name="senderState"
                          value={formData.senderState}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                        >
                          <option value="">{t.selectState}</option>
                          {senderStates.map(state => (
                            <option key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* City */}
                    {formData.senderState && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.city}
                        </label>
                        <select
                          name="senderCity"
                          value={formData.senderCity}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                        >
                          <option value="">{t.selectCity}</option>
                          {senderCities.map(city => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.addressLine} <span className="text-red-500">{t.required}</span>
                      </label>
                      <input
                        type="text"
                        name="senderAddress"
                        value={formData.senderAddress}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.senderAddress ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.addressPlaceholder}
                      />
                      {errors.senderAddress && <p className="mt-1 text-sm text-red-600">{errors.senderAddress}</p>}
                    </div>
                  </div>
                </div>

                {/* Receiver Address */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <MapPin className="w-4 h-4 text-red-600 mr-2" />
                    {t.receiverAddress}
                  </h3>
                  <div className="space-y-4">
                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.country} <span className="text-red-500">{t.required}</span>
                      </label>
                      <select
                        name="receiverCountry"
                        value={formData.receiverCountry}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.receiverCountry ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                      >
                        <option value="">{t.selectCountry}</option>
                        {countries.map(country => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {errors.receiverCountry && <p className="mt-1 text-sm text-red-600">{errors.receiverCountry}</p>}
                    </div>

                    {/* State/Province */}
                    {formData.receiverCountry && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.stateProvince}
                        </label>
                        <select
                          name="receiverState"
                          value={formData.receiverState}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                        >
                          <option value="">{t.selectState}</option>
                          {receiverStates.map(state => (
                            <option key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* City */}
                    {formData.receiverState && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.city}
                        </label>
                        <select
                          name="receiverCity"
                          value={formData.receiverCity}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                        >
                          <option value="">{t.selectCity}</option>
                          {receiverCities.map(city => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.addressLine} <span className="text-red-500">{t.required}</span>
                      </label>
                      <input
                        type="text"
                        name="receiverAddress"
                        value={formData.receiverAddress}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.receiverAddress ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.addressPlaceholder}
                      />
                      {errors.receiverAddress && <p className="mt-1 text-sm text-red-600">{errors.receiverAddress}</p>}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-8 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    {t.previous}
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                  >
                    {t.nextStep}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Transaction Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                  {t.transactionDetails}
                </h2>

                {/* Currency Exchange */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Globe className="w-4 h-4 text-green-600 mr-2" />
                    {t.currencyExchange}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Sender Currency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.senderCurrency} <span className="text-red-500">{t.required}</span>
                      </label>
                      <select
                        name="senderCurrency"
                        value={formData.senderCurrency}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.senderCurrency ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                      >
                        {currencies.map(currency => (
                          <option key={currency.code} value={currency.code}>
                            {currency.flag} {currency.code} - {currency.name} ({currency.symbol})
                          </option>
                        ))}
                      </select>
                      {errors.senderCurrency && <p className="mt-1 text-sm text-red-600">{errors.senderCurrency}</p>}
                    </div>

                    {/* Receiver Currency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.receiverCurrency} <span className="text-red-500">{t.required}</span>
                      </label>
                      <select
                        name="receiverCurrency"
                        value={formData.receiverCurrency}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.receiverCurrency ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                      >
                        {currencies.map(currency => (
                          <option key={currency.code} value={currency.code}>
                            {currency.flag} {currency.code} - {currency.name} ({currency.symbol})
                          </option>
                        ))}
                      </select>
                      {errors.receiverCurrency && <p className="mt-1 text-sm text-red-600">{errors.receiverCurrency}</p>}
                    </div>
                  </div>

                  {/* Amount and Rate */}
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.senderAmount} <span className="text-red-500">{t.required}</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {getCurrencySymbol(formData.senderCurrency)}
                        </span>
                        <input
                          type="number"
                          name="senderAmount"
                          value={formData.senderAmount}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${
                            errors.senderAmount ? 'border-red-500' : 'border-gray-300'
                          } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                      {errors.senderAmount && <p className="mt-1 text-sm text-red-600">{errors.senderAmount}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.exchangeRate} <span className="text-red-500">{t.required}</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                          1 {formData.senderCurrency} =
                        </span>
                        <input
                          type="number"
                          name="exchangeRate"
                          value={formData.exchangeRate}
                          onChange={handleChange}
                          className={`w-full pl-24 pr-4 py-3 border ${
                            errors.exchangeRate ? 'border-red-500' : 'border-gray-300'
                          } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                          placeholder="0.00"
                          step="0.01"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {getCurrencySymbol(formData.receiverCurrency)}
                        </span>
                      </div>
                      {errors.exchangeRate && <p className="mt-1 text-sm text-red-600">{errors.exchangeRate}</p>}
                    </div>
                  </div>

                  {/* Calculated Amount */}
                  {calculatedAmount && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                      <h4 className="text-sm font-medium text-green-800 mb-3">{t.calculatedBreakdown}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <span className="text-gray-600">{t.baseAmount}</span>
                          <span className="font-medium text-gray-800">
                            {formatAmount(calculatedAmount.base, calculatedAmount.receiverCurrency)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-red-600" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <span>{t.totalFees}</span>
                          <span className="font-medium">
                            - {formatAmount(calculatedAmount.fees, calculatedAmount.receiverCurrency)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-green-200" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <span className="font-bold text-gray-800">{t.finalAmount}</span>
                          <span className="font-bold text-green-600 text-lg">
                            {formatAmount(calculatedAmount.final, calculatedAmount.receiverCurrency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fees & Charges */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Receipt className="w-4 h-4 text-green-600 mr-2" />
                    {t.feesCharges}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.commission}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {getCurrencySymbol(formData.receiverCurrency)}
                        </span>
                        <input
                          type="number"
                          name="commission"
                          value={formData.commission}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.exchangeFee}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {getCurrencySymbol(formData.receiverCurrency)}
                        </span>
                        <input
                          type="number"
                          name="fee"
                          value={formData.fee}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.tax}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {getCurrencySymbol(formData.receiverCurrency)}
                        </span>
                        <input
                          type="number"
                          name="tax"
                          value={formData.tax}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Notes */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.status}
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                      >
                        <option value="pending">{t.statusOptions.pending}</option>
                        <option value="processing">{t.statusOptions.processing}</option>
                        <option value="completed">{t.statusOptions.completed}</option>
                        <option value="cancelled">{t.statusOptions.cancelled}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.notes}
                      </label>
                      <input
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                        placeholder={t.notesPlaceholder}
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation and Submit */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-8 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    {t.previous}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t.saving}</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>{t.saveRecord}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </motion.div>
  );
};

export default CustomerRecordCreate;