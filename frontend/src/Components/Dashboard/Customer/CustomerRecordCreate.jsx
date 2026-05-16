import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  User,
  DollarSign,
  Save,
  ArrowLeft,
  X,
  Calculator,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createTransactionAction, clearErrors } from "../../../actions/transactionActions";
import { CREATE_TRANSACTION_RESET } from "../../../constants/constants";

const CustomerRecordCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get state from Redux
  const { loading, error, success } = useSelector((state) => state.newTransaction);
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState('');
  const [calculatorExpression, setCalculatorExpression] = useState('');
  const [activeField, setActiveField] = useState(null);

  // Simple form state - only essential fields
  const [formData, setFormData] = useState({
    // Customer Name (required)
    name: '',
    
    // Sender (who sends money from another country)
    senderName: '',
    senderAmount: '',
    senderCurrency: 'USD',
    
    // Receiver (who gets money in Pakistan)
    receiverName: '',
    receiverCurrency: 'PKR',
    
    // Exchange Rate (required)
    exchangeRate: '',
    
    // Optional description
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [calculatedReceiverAmount, setCalculatedReceiverAmount] = useState(null);

  // Currencies list
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' }
  ];

  // Language translations
  const translations = {
    en: {
      back: "Back",
      title: "New Transaction",
      subtitle: "Add currency exchange record",
      saved: "Transaction saved!",
      redirecting: "Redirecting...",
      error: "Error saving",
      customerName: "Customer Name",
      enterName: "Enter customer name",
      sender: "Sender (From Abroad)",
      senderName: "Sender Name",
      enterSenderName: "Enter sender name",
      amount: "Amount",
      enterAmount: "0.00",
      currency: "Currency",
      receiver: "Receiver (In Pakistan)",
      receiverName: "Receiver Name",
      enterReceiverName: "Enter receiver name",
      exchangeRate: "Exchange Rate",
      rateHint: "1 USD = ? PKR",
      description: "Description (Optional)",
      enterDescription: "Add notes",
      save: "Save",
      saving: "Saving...",
      required: "*",
      receiverGets: "Receiver gets:",
      calculator: {
        title: "Calculator",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      },
      errors: {
        nameRequired: "Customer name required",
        senderNameRequired: "Sender name required",
        senderAmountRequired: "Amount required",
        amountPositive: "Amount must be positive",
        receiverNameRequired: "Receiver name required",
        exchangeRateRequired: "Exchange rate required",
        ratePositive: "Rate must be positive"
      }
    },
    ur: {
      back: "واپس",
      title: "نیا لین دین",
      subtitle: "کرنسی ایکسچینج ریکارڈ شامل کریں",
      saved: "لین دین محفوظ ہوگیا!",
      redirecting: "جا رہے ہیں...",
      error: "محفوظ کرنے میں خرابی",
      customerName: "کسٹمر کا نام",
      enterName: "کسٹمر کا نام درج کریں",
      sender: "بھیجنے والا (بیرون ملک)",
      senderName: "بھیجنے والے کا نام",
      enterSenderName: "بھیجنے والے کا نام درج کریں",
      amount: "رقم",
      enterAmount: "0.00",
      currency: "کرنسی",
      receiver: "وصول کنندہ (پاکستان میں)",
      receiverName: "وصول کنندہ کا نام",
      enterReceiverName: "وصول کنندہ کا نام درج کریں",
      exchangeRate: "تبادلے کی شرح",
      rateHint: "1 USD = ? PKR",
      description: "تفصیل (اختیاری)",
      enterDescription: "نوٹ شامل کریں",
      save: "محفوظ",
      saving: "محفوظ ہو رہا ہے...",
      required: "*",
      receiverGets: "وصول کنندہ کو ملے گا:",
      calculator: {
        title: "کیلکولیٹر",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      },
      errors: {
        nameRequired: "کسٹمر کا نام درکار ہے",
        senderNameRequired: "بھیجنے والے کا نام درکار ہے",
        senderAmountRequired: "رقم درکار ہے",
        amountPositive: "رقم صفر سے زیادہ ہونی چاہیے",
        receiverNameRequired: "وصول کنندہ کا نام درکار ہے",
        exchangeRateRequired: "تبادلے کی شرح درکار ہے",
        ratePositive: "شرح صفر سے زیادہ ہونی چاہیے"
      }
    },
    ps: {
      back: "بیرته",
      title: "نوی راکړه ورکړه",
      subtitle: "د اسعارو د تبادلې ریکارډ اضافه کړئ",
      saved: "راکړه ورکړه خوندي شوه!",
      redirecting: "لیږدول کیږي...",
      error: "د خوندي کولو تېروتنه",
      customerName: "د پیرودونکي نوم",
      enterName: "د پیرودونکي نوم دننه کړئ",
      sender: "لیږونکی (له بهر څخه)",
      senderName: "د لیږونکي نوم",
      enterSenderName: "د لیږونکي نوم دننه کړئ",
      amount: "اندازه",
      enterAmount: "0.00",
      currency: "اسعار",
      receiver: "ترلاسه کوونکی (په پاکستان کې)",
      receiverName: "د ترلاسه کوونکي نوم",
      enterReceiverName: "د ترلاسه کوونکي نوم دننه کړئ",
      exchangeRate: "د تبادلې نرخ",
      rateHint: "1 USD = ? PKR",
      description: "تشریح (اختیاري)",
      enterDescription: "یادښتونه اضافه کړئ",
      save: "خوندي",
      saving: "خوندي کیږي...",
      required: "*",
      receiverGets: "ترلاسه کوونکی ترلاسه کوي:",
      calculator: {
        title: "حسابګر",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      },
      errors: {
        nameRequired: "د پیرودونکي نوم اړین دی",
        senderNameRequired: "د لیږونکي نوم اړین دی",
        senderAmountRequired: "اندازه اړینه ده",
        amountPositive: "اندازه باید له صفر څخه زیاته وي",
        receiverNameRequired: "د ترلاسه کوونکي نوم اړین دی",
        exchangeRateRequired: "د تبادلې نرخ اړین دی",
        ratePositive: "نرخ باید له صفر څخه زیاته وي"
      }
    },
    fa: {
      back: "بازگشت",
      title: "تراکنش جدید",
      subtitle: "افزودن رکورد تبدیل ارز",
      saved: "تراکنش ذخیره شد!",
      redirecting: "در حال انتقال...",
      error: "خطا در ذخیره",
      customerName: "نام مشتری",
      enterName: "نام مشتری را وارد کنید",
      sender: "فرستنده (از خارج از کشور)",
      senderName: "نام فرستنده",
      enterSenderName: "نام فرستنده را وارد کنید",
      amount: "مبلغ",
      enterAmount: "0.00",
      currency: "ارز",
      receiver: "گیرنده (در پاکستان)",
      receiverName: "نام گیرنده",
      enterReceiverName: "نام گیرنده را وارد کنید",
      exchangeRate: "نرخ تبدیل",
      rateHint: "1 USD = ? PKR",
      description: "توضیحات (اختیاری)",
      enterDescription: "افزودن یادداشت",
      save: "ذخیره",
      saving: "در حال ذخیره...",
      required: "*",
      receiverGets: "گیرنده دریافت می‌کند:",
      calculator: {
        title: "ماشین حساب",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      },
      errors: {
        nameRequired: "نام مشتری الزامی است",
        senderNameRequired: "نام فرستنده الزامی است",
        senderAmountRequired: "مبلغ الزامی است",
        amountPositive: "مبلغ باید بیشتر از صفر باشد",
        receiverNameRequired: "نام گیرنده الزامی است",
        exchangeRateRequired: "نرخ تبدیل الزامی است",
        ratePositive: "نرخ باید بیشتر از صفر باشد"
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

  // Get currency symbol
  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

  // Calculate receiver amount
  useEffect(() => {
    if (formData.senderAmount && formData.exchangeRate) {
      const amount = parseFloat(formData.senderAmount) || 0;
      const rate = parseFloat(formData.exchangeRate) || 0;
      const receiverAmount = amount * rate;
      setCalculatedReceiverAmount(receiverAmount);
    } else {
      setCalculatedReceiverAmount(null);
    }
  }, [formData.senderAmount, formData.exchangeRate]);

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
      toast.success(t.saved);
      dispatch({ type: CREATE_TRANSACTION_RESET });
      setTimeout(() => {
        navigate('/customer-registration');
      }, 2000);
    }
  }, [success, dispatch, navigate, t]);

  // Update form field
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Calculator functions
  const evaluateExpression = (expr) => {
    try {
      let expression = expr.replace(/×/g, '*').replace(/÷/g, '/');
      const result = Function('return (' + expression + ')')();
      return result;
    } catch (e) {
      return null;
    }
  };

  const handleCalculatorButton = (value) => {
    if (value === 'C') {
      setCalculatorInput('');
      setCalculatorExpression('');
    } else if (value === '⌫') {
      setCalculatorInput(prev => prev.slice(0, -1));
      setCalculatorExpression(prev => prev.slice(0, -1));
    } else if (value === '=') {
      const result = evaluateExpression(calculatorExpression || calculatorInput);
      if (result !== null && !isNaN(result)) {
        const rounded = Math.round(result * 100) / 100;
        setCalculatorInput(rounded.toString());
        setCalculatorExpression(rounded.toString());
        if (activeField) {
          updateField(activeField, rounded.toString());
        }
        setShowCalculator(false);
        setActiveField(null);
      }
    } else {
      setCalculatorInput(prev => prev + value);
      setCalculatorExpression(prev => prev + value);
    }
  };

  const openCalculator = (field, currentValue) => {
    setActiveField(field);
    setCalculatorInput(currentValue || '');
    setCalculatorExpression(currentValue || '');
    setShowCalculator(true);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    let hasError = false;

    if (!formData.name.trim()) {
      newErrors.name = t.errors.nameRequired;
      hasError = true;
    }
    
    if (!formData.senderName.trim()) {
      newErrors.senderName = t.errors.senderNameRequired;
      hasError = true;
    }
    
    if (!formData.senderAmount) {
      newErrors.senderAmount = t.errors.senderAmountRequired;
      hasError = true;
    } else if (parseFloat(formData.senderAmount) <= 0) {
      newErrors.senderAmount = t.errors.amountPositive;
      hasError = true;
    }
    
    if (!formData.receiverName.trim()) {
      newErrors.receiverName = t.errors.receiverNameRequired;
      hasError = true;
    }
    
    if (!formData.exchangeRate) {
      newErrors.exchangeRate = t.errors.exchangeRateRequired;
      hasError = true;
    } else if (parseFloat(formData.exchangeRate) <= 0) {
      newErrors.exchangeRate = t.errors.ratePositive;
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  // Handle form submit - status always "completed"
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const amount = parseFloat(formData.senderAmount);
      const rate = parseFloat(formData.exchangeRate);
      const receiverAmount = amount * rate;
      
      const transactionData = {
        name: formData.name,
        senderName: formData.senderName,
        senderAmount: amount,
        senderCurrency: formData.senderCurrency,
        receiverName: formData.receiverName,
        receiverAmount: receiverAmount,
        receiverCurrency: formData.receiverCurrency,
        exchangeRate: rate,
        description: formData.description || '',
        status: 'completed'  // Always completed
      };
      
      dispatch(createTransactionAction(transactionData));
    }
  };

  const CalculatorButton = ({ children, onClick, variant = 'number' }) => {
    const getBgColor = () => {
      if (variant === 'operator') return 'bg-green-100 text-green-600 active:bg-green-200';
      if (variant === 'clear') return 'bg-gray-200 text-gray-700 active:bg-gray-300';
      return 'bg-gray-100 text-gray-700 active:bg-gray-200';
    };

    return (
      <button
        onClick={onClick}
        className={`p-4 text-xl font-medium rounded-xl transition-colors ${getBgColor()}`}
      >
        {children}
      </button>
    );
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/customer-registration" className="p-2 -ml-2 active:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold text-gray-800">{t.title}</h1>
            <p className="text-xs text-gray-500">{t.subtitle}</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <main className="p-4 pb-32">
        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-2xl flex items-center gap-3 animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-700 font-medium">{t.saved}</p>
              <p className="text-sm text-green-600">{t.redirecting}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !saveSuccess && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 font-medium">{t.error}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
          <div className="p-4 space-y-4">
            {/* Customer Name - Required */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                {t.customerName} <span className="text-red-500 text-xs">{t.required}</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-gray-200 focus:ring-green-500/20 focus:border-green-500'
                  }`}
                  placeholder={t.enterName}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Sender Section */}
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
                <TrendingUp size={16} />
                {t.sender}
              </p>
              
              {/* Sender Name */}
              <div className="mb-3">
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                  {t.senderName} <span className="text-red-500 text-xs">{t.required}</span>
                </label>
                <input
                  type="text"
                  value={formData.senderName}
                  onChange={(e) => updateField('senderName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.senderName
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-gray-200 focus:ring-green-500/20 focus:border-green-500'
                  }`}
                  placeholder={t.enterSenderName}
                />
                {errors.senderName && <p className="mt-1 text-xs text-red-500">{errors.senderName}</p>}
              </div>

              {/* Amount and Currency */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                    {t.amount} <span className="text-red-500 text-xs">{t.required}</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        value={formData.senderAmount}
                        onChange={(e) => updateField('senderAmount', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.senderAmount
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:ring-green-500/20 focus:border-green-500'
                        }`}
                        placeholder={t.enterAmount}
                        step="0.01"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {getCurrencySymbol(formData.senderCurrency)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openCalculator('senderAmount', formData.senderAmount)}
                      className="px-4 py-3 bg-green-100 text-green-600 rounded-xl active:bg-green-200 transition-colors"
                    >
                      <Calculator size={20} />
                    </button>
                  </div>
                  {errors.senderAmount && <p className="mt-1 text-xs text-red-500">{errors.senderAmount}</p>}
                </div>
                
                <div className="w-28">
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    {t.currency}
                  </label>
                  <select
                    value={formData.senderCurrency}
                    onChange={(e) => updateField('senderCurrency', e.target.value)}
                    className="w-full px-2 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 appearance-none bg-white text-sm"
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Exchange Rate */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                {t.exchangeRate} <span className="text-red-500 text-xs">{t.required}</span>
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                    1 {formData.senderCurrency} =
                  </span>
                  <input
                    type="number"
                    value={formData.exchangeRate}
                    onChange={(e) => updateField('exchangeRate', e.target.value)}
                    className={`w-full pl-20 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.exchangeRate
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 focus:ring-green-500/20 focus:border-green-500'
                    }`}
                    placeholder="0.00"
                    step="0.01"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    {getCurrencySymbol(formData.receiverCurrency)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openCalculator('exchangeRate', formData.exchangeRate)}
                  className="px-4 py-3 bg-green-100 text-green-600 rounded-xl active:bg-green-200 transition-colors"
                >
                  <Calculator size={20} />
                </button>
              </div>
              {errors.exchangeRate && <p className="mt-1 text-xs text-red-500">{errors.exchangeRate}</p>}
            </div>

            {/* Receiver Section */}
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-sm font-medium text-green-700 mb-3 flex items-center gap-2">
                <TrendingDown size={16} />
                {t.receiver}
              </p>
              
              {/* Receiver Name */}
              <div className="mb-3">
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                  {t.receiverName} <span className="text-red-500 text-xs">{t.required}</span>
                </label>
                <input
                  type="text"
                  value={formData.receiverName}
                  onChange={(e) => updateField('receiverName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.receiverName
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-gray-200 focus:ring-green-500/20 focus:border-green-500'
                  }`}
                  placeholder={t.enterReceiverName}
                />
                {errors.receiverName && <p className="mt-1 text-xs text-red-500">{errors.receiverName}</p>}
              </div>

              {/* Receiver Currency (fixed to PKR) */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  {t.currency}
                </label>
                <div className="relative">
                  <select
                    value={formData.receiverCurrency}
                    onChange={(e) => updateField('receiverCurrency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 appearance-none bg-white"
                  >
                    <option value="PKR">🇵🇰 PKR - Pakistani Rupee (₨)</option>
                    {currencies.filter(c => c.code !== 'PKR').map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-2 h-2 border-r border-b border-gray-400 rotate-45" />
                  </div>
                </div>
              </div>

              {/* Calculated Amount */}
              {calculatedReceiverAmount !== null && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">{t.receiverGets}</span>
                    <span className="text-xl font-bold text-green-600">
                      {getCurrencySymbol(formData.receiverCurrency)} {calculatedReceiverAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Description - Optional */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                {t.description} ({t.optional})
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 resize-none"
                placeholder={t.enterDescription}
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="h-4" />
      </main>

      {/* Fixed Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg z-20">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              <span>{t.saving}</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>{t.save}</span>
            </>
          )}
        </button>
      </div>

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center animate-fadeIn">
          <div className="bg-white rounded-t-3xl w-full max-w-md animate-slideUp">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{t.calculator.title}</h3>
              <button onClick={() => setShowCalculator(false)} className="p-2 active:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-4 bg-gray-50">
              <div className="bg-white rounded-xl p-4 shadow-inner">
                <p className="text-right text-gray-400 text-sm min-h-[20px]">{calculatorExpression}</p>
                <p className="text-right text-3xl font-bold text-gray-800 mt-1">{calculatorInput || '0'}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-4 gap-2">
                <CalculatorButton onClick={() => handleCalculatorButton('7')}>7</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('8')}>8</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('9')}>9</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('÷')} variant="operator">÷</CalculatorButton>

                <CalculatorButton onClick={() => handleCalculatorButton('4')}>4</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('5')}>5</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('6')}>6</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('×')} variant="operator">×</CalculatorButton>

                <CalculatorButton onClick={() => handleCalculatorButton('1')}>1</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('2')}>2</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('3')}>3</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('-')} variant="operator">-</CalculatorButton>

                <CalculatorButton onClick={() => handleCalculatorButton('0')}>0</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('.')}>.</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('C')} variant="clear">C</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('+')} variant="operator">+</CalculatorButton>

                <button
                  onClick={() => handleCalculatorButton('⌫')}
                  className="p-4 text-xl font-medium text-gray-700 bg-gray-100 rounded-xl active:bg-gray-200 transition-colors col-span-2 flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  <span>{t.calculator.backspace}</span>
                </button>
                <button
                  onClick={() => handleCalculatorButton('=')}
                  className="p-4 text-xl font-bold rounded-xl transition-colors col-span-2 bg-gradient-to-r from-green-500 to-green-600 text-white active:from-green-600 active:to-green-700"
                >
                  {t.calculator.calculate}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CustomerRecordCreate;