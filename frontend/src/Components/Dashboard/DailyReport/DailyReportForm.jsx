import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus,
  Save,
  ArrowLeft,
  X,
  CheckCircle,
  RefreshCw,
  User,
  FileText,
  Calendar,
  DollarSign,
  AlertCircle,
  Calculator,
  Delete
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createDailyRecordAction, clearErrors } from "../../../actions/dailyRecordActions";
import { CREATE_DAILY_RECORD_RESET } from "../../../constants/constants";
import { evaluate } from 'mathjs';

const DailyReportForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, success } = useSelector((state) => state.newDailyRecord);
  
  // Language translations
  const translations = {
    en: {
      backToDailyRecords: "Back",
      createNewDailyRecord: "New Record",
      subtitle: "Add income or spend entry",
      recordSaved: "Record saved successfully!",
      redirecting: "Redirecting...",
      errorSaving: "Error saving record",
      date: "Date",
      selectType: "Select Type",
      income: "Income",
      spend: "Spend",
      description: "Description (Optional)",
      amount: "Amount",
      currency: "Currency",
      personName: "Person Name",
      totalIncome: "Total Income",
      totalSpend: "Total Spend",
      netBalance: "Net Balance",
      cancel: "Cancel",
      saving: "Saving...",
      saveRecord: "Save",
      required: "*",
      descriptionPlaceholder: "Enter description (optional)",
      personNamePlaceholder: "Person name",
      errors: {
        amountRequired: "Amount is required",
        amountPositive: "Amount must be positive",
        personNameRequired: "Person name is required"
      },
      calculator: {
        title: "Calculator",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      }
    },
    ur: {
      backToDailyRecords: "واپس",
      createNewDailyRecord: "نیا ریکارڈ",
      subtitle: "آمدنی یا اخراجات شامل کریں",
      recordSaved: "ریکارڈ محفوظ ہو گیا!",
      redirecting: "جا رہے ہیں...",
      errorSaving: "ریکارڈ محفوظ کرنے میں خرابی",
      date: "تاریخ",
      selectType: "قسیم منتخب کریں",
      income: "آمدنی",
      spend: "اخراجات",
      description: "تفصیل (اختیاری)",
      amount: "رقم",
      currency: "کرنسی",
      personName: "شخص کا نام",
      totalIncome: "کل آمدنی",
      totalSpend: "کل اخراجات",
      netBalance: "خالص بیلنس",
      cancel: "منسوخ",
      saving: "محفوظ ہو رہا ہے...",
      saveRecord: "محفوظ",
      required: "*",
      descriptionPlaceholder: "تفصیل درج کریں (اختیاری)",
      personNamePlaceholder: "شخص کا نام",
      errors: {
        amountRequired: "رقم درکار ہے",
        amountPositive: "رقم صفر سے زیادہ ہونی چاہیے",
        personNameRequired: "شخص کا نام درکار ہے"
      },
      calculator: {
        title: "کیلکولیٹر",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      }
    },
    ps: {
      backToDailyRecords: "بیرته",
      createNewDailyRecord: "نوی ریکارډ",
      subtitle: "عاید یا لګښت اضافه کړئ",
      recordSaved: "ریکارډ خوندي شو!",
      redirecting: "لیږدول کیږي...",
      errorSaving: "د ریکارډ خوندي کولو کې تېروتنه",
      date: "نیټه",
      selectType: "ډول وټاکئ",
      income: "عاید",
      spend: "لګښت",
      description: "تشریح (اختیاري)",
      amount: "اندازه",
      currency: "اسعار",
      personName: "د شخص نوم",
      totalIncome: "ټول عاید",
      totalSpend: "ټول لګښت",
      netBalance: "خالص بیلانس",
      cancel: "لغوه",
      saving: "خوندي کیږي...",
      saveRecord: "خوندي",
      required: "*",
      descriptionPlaceholder: "تشریح دننه کړئ (اختیاري)",
      personNamePlaceholder: "د شخص نوم",
      errors: {
        amountRequired: "اندازه اړینه ده",
        amountPositive: "اندازه باید له صفر څخه زیاته وي",
        personNameRequired: "د شخص نوم اړین دی"
      },
      calculator: {
        title: "حسابګر",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      }
    },
    fa: {
      backToDailyRecords: "بازگشت",
      createNewDailyRecord: "رکورد جدید",
      subtitle: "افزودن درآمد یا هزینه",
      recordSaved: "رکورد ذخیره شد!",
      redirecting: "در حال انتقال...",
      errorSaving: "خطا در ذخیره رکورد",
      date: "تاریخ",
      selectType: "انتخاب نوع",
      income: "درآمد",
      spend: "هزینه",
      description: "توضیحات (اختیاری)",
      amount: "مبلغ",
      currency: "ارز",
      personName: "نام شخص",
      totalIncome: "کل درآمد",
      totalSpend: "کل هزینه",
      netBalance: "موجودی خالص",
      cancel: "انصراف",
      saving: "در حال ذخیره...",
      saveRecord: "ذخیره",
      required: "*",
      descriptionPlaceholder: "توضیحات را وارد کنید (اختیاری)",
      personNamePlaceholder: "نام شخص",
      errors: {
        amountRequired: "مبلغ الزامی است",
        amountPositive: "مبلغ باید بیشتر از صفر باشد",
        personNameRequired: "نام شخص الزامی است"
      },
      calculator: {
        title: "ماشین حساب",
        clear: "C",
        backspace: "⌫",
        calculate: "="
      }
    }
  };

  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState('');
  const [calculatorExpression, setCalculatorExpression] = useState('');

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && ['en', 'ur', 'ps', 'fa'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
    setIsInitialized(true);
  }, []);

  const t = translations[currentLang] || translations.en;
  const isRTL = currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa';
  
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
    { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', flag: '🇦🇫' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' }
  ];

  const [entries, setEntries] = useState([
    { id: 1, description: '', amount: '', currency: 'USD', personName: '' }
  ]);
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const getCurrencySymbol = (currencyCode) => {
    const currency = currencies.find(c => c.code === currencyCode);
    return currency ? currency.symbol : '$';
  };

  const getTotalsByCurrency = () => {
    const totals = {};
    entries.forEach(entry => {
      if (entry.amount && entry.currency) {
        const amount = parseFloat(entry.amount) || 0;
        if (!totals[entry.currency]) {
          totals[entry.currency] = 0;
        }
        totals[entry.currency] += amount;
      }
    });
    return totals;
  };

  const totalsByCurrency = getTotalsByCurrency();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      setSaveSuccess(true);
      toast.success(t.recordSaved);
      dispatch({ type: CREATE_DAILY_RECORD_RESET });
      setTimeout(() => {
        navigate('/daily-records');
      }, 2000);
    }
  }, [success, dispatch, navigate, t]);

  const addEntry = () => {
    const newId = entries.length + 1;
    setEntries([...entries, { id: newId, description: '', amount: '', currency: 'USD', personName: '' }]);
  };

  const removeEntry = (id) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const updateEntry = (id, field, value) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
    if (errors[`${field}_${id}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${field}_${id}`];
      setErrors(newErrors);
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
        const firstEntry = entries[0];
        updateEntry(firstEntry.id, 'amount', rounded.toString());
        setShowCalculator(false);
      }
    } else {
      setCalculatorInput(prev => prev + value);
      setCalculatorExpression(prev => prev + value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let hasError = false;

    entries.forEach((entry) => {
      if (!entry.amount) {
        newErrors[`amount_${entry.id}`] = t.errors.amountRequired;
        hasError = true;
      } else if (isNaN(entry.amount) || parseFloat(entry.amount) <= 0) {
        newErrors[`amount_${entry.id}`] = t.errors.amountPositive;
        hasError = true;
      }
      if (!entry.personName) {
        newErrors[`personName_${entry.id}`] = t.errors.personNameRequired;
        hasError = true;
      }
    });

    return { newErrors, hasError };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { newErrors, hasError } = validateForm();
    
    if (!hasError) {
      const formData = {
        date: new Date().toISOString().split('T')[0],
        [selectedType === 'income' ? 'incomeEntries' : 'spendEntries']: entries.map(entry => ({
          description: entry.description || '',
          amount: parseFloat(entry.amount),
          currency: entry.currency,
          personName: entry.personName
        })),
        [selectedType === 'income' ? 'spendEntries' : 'incomeEntries']: []
      };
      
      dispatch(createDailyRecordAction(formData));
    } else {
      setErrors(newErrors);
    }
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowTypeModal(false);
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

  const CalculatorButton = ({ children, onClick, variant = 'number' }) => {
    const getBgColor = () => {
      if (variant === 'operator') {
        return selectedType === 'income' ? 'bg-green-100 text-green-600 active:bg-green-200' : 'bg-red-100 text-red-600 active:bg-red-200';
      }
      if (variant === 'clear') {
        return 'bg-gray-200 text-gray-700 active:bg-gray-300';
      }
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

  return (
    <div className="min-h-screen bg-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Type Selection Modal */}
      {showTypeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-slideUp">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{t.selectType}</h2>
              <p className="text-center text-gray-500 text-sm mb-6">Choose transaction type</p>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleTypeSelect('income')}
                  className="w-full p-5 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-between hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <DollarSign size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-lg">{t.income}</p>
                      <p className="text-white/70 text-sm">Money received</p>
                    </div>
                  </div>
                  <ArrowLeft size={20} className="text-white/70" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                </button>

                <button
                  onClick={() => handleTypeSelect('spend')}
                  className="w-full p-5 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-between hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Calculator size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-lg">{t.spend}</p>
                      <p className="text-white/70 text-sm">Money spent</p>
                    </div>
                  </div>
                  <ArrowLeft size={20} className="text-white/70" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      {!showTypeModal && (
        <>
          {/* Header */}
          <div className="bg-white shadow-sm sticky top-0 z-10">
            <div className="px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => navigate('/daily-records')}
                className="p-2 -ml-2 active:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-bold text-gray-800">
                {selectedType === 'income' ? t.income : t.spend}
              </h1>
              <div className="w-10" />
            </div>
          </div>

          {/* Main Content - Add padding-bottom to prevent content from hiding behind fixed button */}
          <main className="p-4 pb-36">
            {/* Success Message */}
            {saveSuccess && (
              <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-2xl flex items-center gap-3 animate-fadeIn">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-700 font-medium">{t.recordSaved}</p>
                  <p className="text-sm text-green-600">{t.redirecting}</p>
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
                <Calendar size={18} className="text-green-500" />
                <span className="text-sm text-gray-500">{t.date}:</span>
                <span className="text-sm font-medium text-gray-700">
                  {new Date().toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ur-PK', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            {/* Entries List */}
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${
                    selectedType === 'income' ? 'border-green-100' : 'border-red-100'
                  }`}
                >
                  {/* Entry Header */}
                  <div className={`px-4 py-3 flex items-center justify-between ${
                    selectedType === 'income' ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <span className={`text-sm font-semibold ${
                      selectedType === 'income' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      Entry {index + 1}
                    </span>
                    {entries.length > 1 && (
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="p-1 active:opacity-70"
                      >
                        <X size={18} className="text-red-500" />
                      </button>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    {/* Amount Field with Calculator */}
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                        {t.amount} <span className="text-red-500 text-xs">{t.required}</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <input
                            type="number"
                            value={entry.amount}
                            onChange={(e) => updateEntry(entry.id, 'amount', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                              errors[`amount_${entry.id}`]
                                ? 'border-red-500 focus:ring-red-500/20'
                                : `border-gray-200 focus:ring-${selectedType === 'income' ? 'green' : 'red'}-500/20 focus:border-${selectedType === 'income' ? 'green' : 'red'}-500`
                            }`}
                            placeholder="0.00"
                            step="0.01"
                          />
                          {getCurrencySymbol(entry.currency) && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                              {getCurrencySymbol(entry.currency)}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowCalculator(true)}
                          className={`px-4 py-3 rounded-xl flex items-center justify-center transition-all ${
                            selectedType === 'income'
                              ? 'bg-green-100 text-green-600 active:bg-green-200'
                              : 'bg-red-100 text-red-600 active:bg-red-200'
                          }`}
                        >
                          <Calculator size={20} />
                        </button>
                      </div>
                      {errors[`amount_${entry.id}`] && (
                        <p className="mt-1 text-xs text-red-500">{errors[`amount_${entry.id}`]}</p>
                      )}
                    </div>

                    {/* Description (Optional) */}
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                        {t.description}
                      </label>
                      <div className="relative">
                        <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={entry.description}
                          onChange={(e) => updateEntry(entry.id, 'description', e.target.value)}
                          className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                          placeholder={t.descriptionPlaceholder}
                        />
                      </div>
                    </div>

                    {/* Currency */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                        {t.currency}
                      </label>
                      <div className="relative">
                        <select
                          value={entry.currency}
                          onChange={(e) => updateEntry(entry.id, 'currency', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 appearance-none bg-white"
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

                    {/* Person Name */}
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                        {t.personName} <span className="text-red-500 text-xs">{t.required}</span>
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={entry.personName}
                          onChange={(e) => updateEntry(entry.id, 'personName', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            errors[`personName_${entry.id}`]
                              ? 'border-red-500 focus:ring-red-500/20'
                              : 'border-gray-200 focus:ring-green-500/20 focus:border-green-500'
                          }`}
                          placeholder={t.personNamePlaceholder}
                        />
                      </div>
                      {errors[`personName_${entry.id}`] && (
                        <p className="mt-1 text-xs text-red-500">{errors[`personName_${entry.id}`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add More Button */}
            <button
              type="button"
              onClick={addEntry}
              className={`w-full mt-4 py-3 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-all ${
                selectedType === 'income'
                  ? 'border-green-300 text-green-600 active:bg-green-50'
                  : 'border-red-300 text-red-600 active:bg-red-50'
              }`}
            >
              <Plus size={18} />
              <span className="text-sm font-medium">
                Add Another {selectedType === 'income' ? 'Income' : 'Spend'}
              </span>
            </button>

            {/* Summary Section */}
            {Object.keys(totalsByCurrency).length > 0 && (
              <div className={`mt-6 p-4 rounded-2xl ${
                selectedType === 'income' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <span className="text-sm font-medium text-gray-600 mb-2 block">
                  Total {selectedType === 'income' ? 'Income' : 'Spend'}
                </span>
                {Object.entries(totalsByCurrency).map(([currency, amount]) => (
                  <p key={currency} className={`text-xl font-bold ${
                    selectedType === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {getCurrencySymbol(currency)} {amount.toFixed(2)}
                  </p>
                ))}
              </div>
            )}
            
            {/* Add extra spacer at the bottom to ensure content doesn't get hidden under the fixed button */}
            <div className="h-4" />
          </main>

          {/* Fixed Submit Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg z-20">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                selectedType === 'income'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 active:from-green-600 active:to-green-700'
                  : 'bg-gradient-to-r from-red-500 to-red-600 active:from-red-600 active:to-red-700'
              } disabled:opacity-50`}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
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
        </>
      )}

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center animate-fadeIn">
          <div className="bg-white rounded-t-3xl w-full max-w-md animate-slideUp">
            {/* Calculator Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{t.calculator.title}</h3>
              <button
                onClick={() => setShowCalculator(false)}
                className="p-2 active:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Calculator Display */}
            <div className="p-4 bg-gray-50">
              <div className="bg-white rounded-xl p-4 shadow-inner">
                <p className="text-right text-gray-400 text-sm min-h-[20px]">{calculatorExpression}</p>
                <p className="text-right text-3xl font-bold text-gray-800 mt-1">
                  {calculatorInput || '0'}
                </p>
              </div>
            </div>

            {/* Calculator Buttons */}
            <div className="p-4">
              <div className="grid grid-cols-4 gap-2">
                {/* Row 1 */}
                <CalculatorButton onClick={() => handleCalculatorButton('7')}>7</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('8')}>8</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('9')}>9</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('÷')} variant="operator">÷</CalculatorButton>

                {/* Row 2 */}
                <CalculatorButton onClick={() => handleCalculatorButton('4')}>4</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('5')}>5</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('6')}>6</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('×')} variant="operator">×</CalculatorButton>

                {/* Row 3 */}
                <CalculatorButton onClick={() => handleCalculatorButton('1')}>1</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('2')}>2</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('3')}>3</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('-')} variant="operator">-</CalculatorButton>

                {/* Row 4 */}
                <CalculatorButton onClick={() => handleCalculatorButton('0')}>0</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('.')}>.</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('C')} variant="clear">C</CalculatorButton>
                <CalculatorButton onClick={() => handleCalculatorButton('+')} variant="operator">+</CalculatorButton>

                {/* Row 5 */}
                <button
                  onClick={() => handleCalculatorButton('⌫')}
                  className="p-4 text-xl font-medium text-gray-700 bg-gray-100 rounded-xl active:bg-gray-200 transition-colors col-span-2 flex items-center justify-center gap-2"
                >
                  <Delete size={18} />
                  <span>{t.calculator.backspace}</span>
                </button>
                <button
                  onClick={() => handleCalculatorButton('=')}
                  className={`p-4 text-xl font-bold rounded-xl transition-colors col-span-2 ${
                    selectedType === 'income'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white active:from-green-600 active:to-green-700'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white active:from-red-600 active:to-red-700'
                  }`}
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

export default DailyReportForm;