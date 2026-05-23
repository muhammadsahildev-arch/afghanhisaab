import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Save,
  ArrowLeft,
  CheckCircle,
  RefreshCw,
  User,
  FileText,
  Calendar,
  AlertCircle,
  X ,
  Calculator,
  Delete
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createLedgerEntryAction, clearErrors } from "../../../actions/ledgerActions";
import { CREATE_LEDGER_ENTRY_RESET } from "../../../constants/constants";
import { evaluate } from 'mathjs';

const LedgerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState('');
  const [calculatorExpression, setCalculatorExpression] = useState('');
  const [activeField, setActiveField] = useState(null);
  
  // Get state from Redux
  const { loading, error, success } = useSelector((state) => state.newLedgerEntry);
  
  // Currencies for dropdown
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
    { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', flag: '🇦🇫' }
  ];

  // Language translations
  const translations = {
    en: {
      backToLedger: "Back",
      createNewLedgerEntry: "New Khata Entry",
      createDesc: "Add person's khata entry",
      ledgerEntrySaved: "Khata entry saved successfully!",
      redirectingToLedger: "Redirecting...",
      errorSaving: "Error saving khata entry",
      date: "Date",
      name: "Person Name",
      amount: "Total Amount",
      remainingAmount: "Remaining Amount (Optional)",
      description: "Description (Optional)",
      currency: "Currency",
      totalAmount: "Total Amount",
      totalRemaining: "Remaining",
      balance: "Paid / Received",
      cancel: "Cancel",
      saving: "Saving...",
      saveLedgerEntry: "Save Khata",
      enterName: "Enter person name",
      enterDescription: "Enter description (optional)",
      enterRemainingAmount: "Remaining amount",
      enterAmount: "Total amount",
      required: "*",
      remainingNote: "Leave empty if full amount is given/received",
      errors: {
        nameRequired: "Person name is required",
        amountRequired: "Amount is required",
        amountPositive: "Amount must be positive",
        remainingInvalid: "Remaining amount cannot be greater than total amount"
      },
      calculator: {
        title: "Calculator",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      }
    },
    ur: {
      backToLedger: "واپس",
      createNewLedgerEntry: "نیا کھاتہ اندراج",
      createDesc: "شخص کا کھاتہ اندراج شامل کریں",
      ledgerEntrySaved: "کھاتہ اندراج کامیابی سے محفوظ ہوگیا!",
      redirectingToLedger: "جا رہے ہیں...",
      errorSaving: "کھاتہ محفوظ کرنے میں خرابی",
      date: "تاریخ",
      name: "شخص کا نام",
      amount: "کل رقم",
      remainingAmount: "باقی رقم (اختیاری)",
      description: "تفصیل (اختیاری)",
      currency: "کرنسی",
      totalAmount: "کل رقم",
      totalRemaining: "باقی",
      balance: "ادا شدہ / وصول شدہ",
      cancel: "منسوخ",
      saving: "محفوظ ہو رہا ہے...",
      saveLedgerEntry: "کھاتہ محفوظ کریں",
      enterName: "شخص کا نام درج کریں",
      enterDescription: "تفصیل درج کریں (اختیاری)",
      enterRemainingAmount: "باقی رقم",
      enterAmount: "کل رقم",
      required: "*",
      remainingNote: "مکمل رقم دے/لے چکے ہیں تو خالی چھوڑ دیں",
      errors: {
        nameRequired: "شخص کا نام درکار ہے",
        amountRequired: "رقم درکار ہے",
        amountPositive: "رقم صفر سے زیادہ ہونی چاہیے",
        remainingInvalid: "باقی رقم کل رقم سے زیادہ نہیں ہو سکتی"
      },
      calculator: {
        title: "کیلکولیٹر",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      }
    },
    ps: {
      backToLedger: "بیرته",
      createNewLedgerEntry: "نوی کھاتہ داخل",
      createDesc: "د شخص کھاتہ داخل اضافه کړئ",
      ledgerEntrySaved: "کھاتہ داخل په بریالیتوب سره خوندي شو!",
      redirectingToLedger: "لیږدول کیږي...",
      errorSaving: "د کھاتہ خوندي کولو کې تېروتنه",
      date: "نیټه",
      name: "د شخص نوم",
      amount: "ټوله اندازه",
      remainingAmount: "پاتې اندازه (اختیاري)",
      description: "تشریح (اختیاري)",
      currency: "اسعار",
      totalAmount: "ټوله اندازه",
      totalRemaining: "پاتې",
      balance: "ادا شوی / ترلاسه شوی",
      cancel: "لغوه",
      saving: "خوندي کیږي...",
      saveLedgerEntry: "کھاتہ خوندي کړئ",
      enterName: "د شخص نوم دننه کړئ",
      enterDescription: "تشریح دننه کړئ (اختیاري)",
      enterRemainingAmount: "پاتې اندازه",
      enterAmount: "ټوله اندازه",
      required: "*",
      remainingNote: "که بشپړ اندازه ورکړل شوې / ترلاسه شوې وي خالي پرېږدئ",
      errors: {
        nameRequired: "د شخص نوم اړین دی",
        amountRequired: "اندازه اړینه ده",
        amountPositive: "اندازه باید له صفر څخه زیاته وي",
        remainingInvalid: "پاتې اندازه د ټولې اندازې څخه زیاته نشي کیدی"
      },
      calculator: {
        title: "حسابګر",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      }
    },
    fa: {
      backToLedger: "بازگشت",
      createNewLedgerEntry: "ورودی جدید کھاتا",
      createDesc: "افزودن ورودی کھاتا برای شخص",
      ledgerEntrySaved: "ورودی کھاتا با موفقیت ذخیره شد!",
      redirectingToLedger: "در حال انتقال...",
      errorSaving: "خطا در ذخیره کھاتا",
      date: "تاریخ",
      name: "نام شخص",
      amount: "مبلغ کل",
      remainingAmount: "مبلغ باقی‌مانده (اختیاری)",
      description: "توضیحات (اختیاری)",
      currency: "ارز",
      totalAmount: "مبلغ کل",
      totalRemaining: "باقی‌مانده",
      balance: "پرداخت شده / دریافت شده",
      cancel: "انصراف",
      saving: "در حال ذخیره...",
      saveLedgerEntry: "ذخیره کھاتا",
      enterName: "نام شخص را وارد کنید",
      enterDescription: "توضیحات را وارد کنید (اختیاری)",
      enterRemainingAmount: "مبلغ باقی‌مانده",
      enterAmount: "مبلغ کل",
      required: "*",
      remainingNote: "اگر مبلغ کامل پرداخت/دریافت شده است خالی بگذارید",
      errors: {
        nameRequired: "نام شخص الزامی است",
        amountRequired: "مبلغ الزامی است",
        amountPositive: "مبلغ باید بیشتر از صفر باشد",
        remainingInvalid: "مبلغ باقی‌مانده نمی‌تواند بیشتر از مبلغ کل باشد"
      },
      calculator: {
        title: "ماشین حساب",
        clear: "C",
        backspace: "⌫",
        calculate: "="
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

  // Form state - Single currency for both amount and remaining amount
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    remainingAmount: '',
    description: '',
    currency: 'USD'
  });
  
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Get formatted date
  const getFormattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ur-PK', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get currency symbol
  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

  // Calculate balance (amount - remaining)
  const getBalance = () => {
    const amount = parseFloat(formData.amount) || 0;
    const remaining = parseFloat(formData.remainingAmount) || 0;
    return amount - remaining;
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
      toast.success(t.ledgerEntrySaved);
      dispatch({ type: CREATE_LEDGER_ENTRY_RESET });
      setTimeout(() => {
        navigate('/ledger-record');
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

const evaluateExpression = (expr) => {
  try {
    let expression = expr.replace(/×/g, '*').replace(/÷/g, '/');
    const result = evaluate(expression);
    return typeof result === 'number' && !isNaN(result) ? result : null;
  } catch (error) {
    console.log('Calculation error:', error);
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
    
    if (!formData.amount) {
      newErrors.amount = t.errors.amountRequired;
      hasError = true;
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = t.errors.amountPositive;
      hasError = true;
    }
    
    if (formData.remainingAmount && parseFloat(formData.remainingAmount) > parseFloat(formData.amount)) {
      newErrors.remainingAmount = t.errors.remainingInvalid;
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const dataToSend = {
        name: formData.name,
        amount: parseFloat(formData.amount),
        description: formData.description || '',
        currency: formData.currency,
        remainingAmount: formData.remainingAmount ? parseFloat(formData.remainingAmount) : parseFloat(formData.amount),
        status: 'active'
      };
      
      dispatch(createLedgerEntryAction(dataToSend));
    }
  };

  const CalculatorButton = ({ children, onClick, variant = 'number' }) => {
    const getBgColor = () => {
      if (variant === 'operator') return 'bg-blue-100 text-blue-600 active:bg-blue-200';
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

  const balance = getBalance();
  const isPositive = balance >= 0;

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/ledger-record" className="p-2 -ml-2 active:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">{t.createNewLedgerEntry}</h1>
            <p className="text-xs text-gray-500">{t.createDesc}</p>
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
              <p className="text-green-700 font-medium">{t.ledgerEntrySaved}</p>
              <p className="text-sm text-green-600">{t.redirectingToLedger}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !saveSuccess && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-red-700 font-medium">{t.errorSaving}</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Date Display */}
        <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-blue-500" />
            <span className="text-sm text-gray-500">{t.date}:</span>
            <span className="text-sm font-medium text-gray-700">{getFormattedDate()}</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="p-4 space-y-4">
            {/* Name - Required */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                {t.name} <span className="text-red-500 text-xs">{t.required}</span>
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
                      : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                  placeholder={t.enterName}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Currency - Single selection for both amount and remaining amount */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                {t.currency}
              </label>
              <div className="relative">
                <select
                  value={formData.currency}
                  onChange={(e) => updateField('currency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white"
                >
                  {currencies.map(currency => (
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

            {/* Amount - Required with Calculator */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                {t.amount} <span className="text-red-500 text-xs">{t.required}</span>
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => updateField('amount', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.amount
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    placeholder={t.enterAmount}
                    step="0.01"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    {getCurrencySymbol(formData.currency)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openCalculator('amount', formData.amount)}
                  className="px-4 py-3 bg-blue-100 text-blue-600 rounded-xl active:bg-blue-200 transition-colors"
                >
                  <Calculator size={20} />
                </button>
              </div>
              {errors.amount && (
                <p className="mt-1 text-xs text-red-500">{errors.amount}</p>
              )}
            </div>

            {/* Remaining Amount - Optional with Calculator (same currency as amount) */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                {t.remainingAmount}
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={formData.remainingAmount}
                    onChange={(e) => updateField('remainingAmount', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.remainingAmount
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    placeholder={t.enterRemainingAmount}
                    step="0.01"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    {getCurrencySymbol(formData.currency)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openCalculator('remainingAmount', formData.remainingAmount)}
                  className="px-4 py-3 bg-blue-100 text-blue-600 rounded-xl active:bg-blue-200 transition-colors"
                >
                  <Calculator size={20} />
                </button>
              </div>
              {errors.remainingAmount && (
                <p className="mt-1 text-xs text-red-500">{errors.remainingAmount}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">{t.remainingNote}</p>
            </div>

            {/* Description - Optional */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                {t.description}
              </label>
              <div className="relative">
                <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder={t.enterDescription}
                />
              </div>
            </div>

            {/* Balance Summary */}
            {formData.amount && (
              <div className={`mt-2 p-4 rounded-xl ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">{t.balance}:</span>
                  <span className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {getCurrencySymbol(formData.currency)} {Math.abs(balance).toFixed(2)}
                    {!isPositive && ' (Due)'}
                  </span>
                </div>
                {formData.remainingAmount && (
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-500">{t.totalRemaining}:</span>
                    <span className="text-sm font-medium text-orange-600">
                      {getCurrencySymbol(formData.currency)} {parseFloat(formData.remainingAmount).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="h-4" />
      </main>

      {/* Fixed Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg z-20">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              <span>{t.saving}</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>{t.saveLedgerEntry}</span>
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
                  <Delete size={18} />
                  <span>{t.calculator.backspace}</span>
                </button>
                <button
                  onClick={() => handleCalculatorButton('=')}
                  className="p-4 text-xl font-bold rounded-xl transition-colors col-span-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white active:from-blue-600 active:to-blue-700"
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

export default LedgerForm;