import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  Edit,
  AlertCircle
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  getDailyRecordDetailsAction,
  updateDailyRecordAction,
  clearErrors
} from "../../../actions/dailyRecordActions";
import { UPDATE_DAILY_RECORD_RESET } from "../../../constants/constants";

const DailyRecordsUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Get state from Redux
  const { record, loading: fetchLoading, error: fetchError } = useSelector((state) => state.dailyRecordDetails);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector((state) => state.updateDailyRecord);
  
  // Language translations
  const translations = {
    en: {
      backToDailyRecords: "Back to Daily Records",
      updateDailyRecord: "Update Daily Record",
      editIncomeSpendEntries: "Edit income and spend entries for this record",
      recordUpdated: "Daily record updated successfully!",
      redirecting: "Redirecting to daily records...",
      errorUpdating: "Error updating record",
      loadingData: "Loading record data...",
      recordDate: "Record Date",
      editingRecord: "Editing Record",
      incomeEntries: "Income Entries",
      spendEntries: "Spend Entries",
      addIncome: "Add Income",
      addSpend: "Add Spend",
      description: "Description",
      amount: "Amount",
      currency: "Currency",
      personName: "Person Name",
      totalIncome: "Total Income",
      totalSpend: "Total Spend",
      netBalance: "Net Balance",
      cancel: "Cancel",
      updating: "Updating...",
      updateRecord: "Update Record",
      required: "*",
      incomeDescriptionPlaceholder: "Income description",
      spendDescriptionPlaceholder: "Spend description",
      personNamePlaceholder: "Person name",
      recordId: "ID",
      errors: {
        descriptionRequired: "Description is required",
        amountRequired: "Amount is required",
        amountPositive: "Amount must be a positive number",
        personNameRequired: "Person name is required"
      }
    },
    ur: {
      backToDailyRecords: "روزانہ ریکارڈز پر واپس جائیں",
      updateDailyRecord: "روزانہ ریکارڈ اپ ڈیٹ کریں",
      editIncomeSpendEntries: "اس ریکارڈ کے لیے آمدنی اور اخراجات کی انٹریز میں ترمیم کریں",
      recordUpdated: "روزانہ ریکارڈ کامیابی سے اپ ڈیٹ ہو گیا!",
      redirecting: "روزانہ ریکارڈز پر جا رہے ہیں...",
      errorUpdating: "ریکارڈ اپ ڈیٹ کرنے میں خرابی",
      loadingData: "ریکارڈ ڈیٹا لوڈ ہو رہا ہے...",
      recordDate: "ریکارڈ کی تاریخ",
      editingRecord: "ریکارڈ میں ترمیم کر رہے ہیں",
      incomeEntries: "آمدنی کی انٹریز",
      spendEntries: "اخراجات کی انٹریز",
      addIncome: "آمدنی شامل کریں",
      addSpend: "اخراجات شامل کریں",
      description: "تفصیل",
      amount: "رقم",
      currency: "کرنسی",
      personName: "شخص کا نام",
      totalIncome: "کل آمدنی",
      totalSpend: "کل اخراجات",
      netBalance: "خالص بیلنس",
      cancel: "منسوخ کریں",
      updating: "اپ ڈیٹ ہو رہا ہے...",
      updateRecord: "ریکارڈ اپ ڈیٹ کریں",
      required: "*",
      incomeDescriptionPlaceholder: "آمدنی کی تفصیل",
      spendDescriptionPlaceholder: "اخراجات کی تفصیل",
      personNamePlaceholder: "شخص کا نام",
      recordId: "شناختی نمبر",
      errors: {
        descriptionRequired: "تفصیل درکار ہے",
        amountRequired: "رقم درکار ہے",
        amountPositive: "رقم صفر سے زیادہ ہونی چاہیے",
        personNameRequired: "شخص کا نام درکار ہے"
      }
    },
    ps: {
      backToDailyRecords: "بیرته ورځني ریکارډونو ته",
      updateDailyRecord: "ورځنی ریکارډ تازه کړئ",
      editIncomeSpendEntries: "د دې ریکارډ لپاره د عاید او لګښت ننوتنې سم کړئ",
      recordUpdated: "ورځنی ریکارډ په بریالیتوب سره تازه شو!",
      redirecting: "ورځني ریکارډونو ته لیږدول کیږي...",
      errorUpdating: "د ریکارډ تازه کولو کې تېروتنه",
      loadingData: "د ریکارډ معلومات بار کیږي...",
      recordDate: "د ریکارډ نیټه",
      editingRecord: "ریکارډ سمول",
      incomeEntries: "د عاید ننوتنې",
      spendEntries: "د لګښت ننوتنې",
      addIncome: "عاید اضافه کړئ",
      addSpend: "لګښت اضافه کړئ",
      description: "تشریح",
      amount: "اندازه",
      currency: "اسعار",
      personName: "د شخص نوم",
      totalIncome: "ټول عاید",
      totalSpend: "ټول لګښت",
      netBalance: "خالص بیلانس",
      cancel: "لغوه کړئ",
      updating: "تازه کیږي...",
      updateRecord: "ریکارډ تازه کړئ",
      required: "*",
      incomeDescriptionPlaceholder: "د عاید تشریح",
      spendDescriptionPlaceholder: "د لګښت تشریح",
      personNamePlaceholder: "د شخص نوم",
      recordId: "شناختي نمبر",
      errors: {
        descriptionRequired: "تشریح اړینه ده",
        amountRequired: "اندازه اړینه ده",
        amountPositive: "اندازه باید له صفر څخه زیاته وي",
        personNameRequired: "د شخص نوم اړین دی"
      }
    },
    fa: {
      backToDailyRecords: "بازگشت به رکوردهای روزانه",
      updateDailyRecord: "به روز رسانی رکورد روزانه",
      editIncomeSpendEntries: "ویرایش ورودی‌های درآمد و هزینه برای این رکورد",
      recordUpdated: "رکورد روزانه با موفقیت به روز شد!",
      redirecting: "در حال انتقال به رکوردهای روزانه...",
      errorUpdating: "خطا در به روز رسانی رکورد",
      loadingData: "در حال بارگذاری اطلاعات رکورد...",
      recordDate: "تاریخ رکورد",
      editingRecord: "در حال ویرایش رکورد",
      incomeEntries: "ورودی‌های درآمد",
      spendEntries: "ورودی‌های هزینه",
      addIncome: "افزودن درآمد",
      addSpend: "افزودن هزینه",
      description: "توضیحات",
      amount: "مبلغ",
      currency: "ارز",
      personName: "نام شخص",
      totalIncome: "کل درآمد",
      totalSpend: "کل هزینه",
      netBalance: "موجودی خالص",
      cancel: "انصراف",
      updating: "در حال به روز رسانی...",
      updateRecord: "به روز رسانی رکورد",
      required: "*",
      incomeDescriptionPlaceholder: "توضیحات درآمد",
      spendDescriptionPlaceholder: "توضیحات هزینه",
      personNamePlaceholder: "نام شخص",
      recordId: "شناسه",
      errors: {
        descriptionRequired: "توضیحات الزامی است",
        amountRequired: "مبلغ الزامی است",
        amountPositive: "مبلغ باید بیشتر از صفر باشد",
        personNameRequired: "نام شخص الزامی است"
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
  
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [recordDate, setRecordDate] = useState('');
  const [errors, setErrors] = useState({});
  
  // Currencies for dropdown
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

  // Income entries state
  const [incomeEntries, setIncomeEntries] = useState([
    {
      id: 1,
      description: '',
      amount: '',
      currency: 'USD',
      personName: ''
    }
  ]);

  // Spend entries state
  const [spendEntries, setSpendEntries] = useState([
    {
      id: 1,
      description: '',
      amount: '',
      currency: 'USD',
      personName: ''
    }
  ]);

  // Fetch existing record data
  useEffect(() => {
    if (id) {
      dispatch(getDailyRecordDetailsAction(id));
    }
  }, [dispatch, id]);

  // Populate form with fetched data
  useEffect(() => {
    if (record && Object.keys(record).length > 0) {
      setRecordDate(record.date?.split('T')[0] || '');
      
      // Set income entries
      if (record.incomeEntries && record.incomeEntries.length > 0) {
        setIncomeEntries(record.incomeEntries.map((entry, idx) => ({
          id: idx + 1,
          description: entry.description || '',
          amount: entry.amount?.toString() || '',
          currency: entry.currency || 'USD',
          personName: entry.personName || ''
        })));
      }
      
      // Set spend entries
      if (record.spendEntries && record.spendEntries.length > 0) {
        setSpendEntries(record.spendEntries.map((entry, idx) => ({
          id: idx + 1,
          description: entry.description || '',
          amount: entry.amount?.toString() || '',
          currency: entry.currency || 'USD',
          personName: entry.personName || ''
        })));
      }
      
      setIsFetching(false);
    }
  }, [record]);

  // Handle fetch errors
  useEffect(() => {
    if (fetchError) {
      toast.error(fetchError);
      dispatch(clearErrors());
      setIsFetching(false);
    }
  }, [fetchError, dispatch]);

  // Handle update success
  useEffect(() => {
    if (updateSuccess) {
      setSaveSuccess(true);
      toast.success(t.recordUpdated);
      dispatch({ type: UPDATE_DAILY_RECORD_RESET });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/daily-records');
      }, 2000);
    }
  }, [updateSuccess, dispatch, navigate, t]);

  // Handle update errors
  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [updateError, dispatch]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch({ type: UPDATE_DAILY_RECORD_RESET });
    };
  }, [dispatch]);

  // Get currency symbol
  const getCurrencySymbol = (currencyCode) => {
    const currency = currencies.find(c => c.code === currencyCode);
    return currency ? currency.symbol : '$';
  };

  // Format amount with currency symbol
  const formatAmount = (amount, currency) => {
    if (!amount && amount !== 0) return 'N/A';
    const symbol = getCurrencySymbol(currency);
    const formattedAmount = amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${symbol} ${formattedAmount}`;
  };

  // Calculate totals by currency for income
  const getIncomeTotalsByCurrency = () => {
    const totals = {};
    incomeEntries.forEach(entry => {
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

  // Calculate totals by currency for spend
  const getSpendTotalsByCurrency = () => {
    const totals = {};
    spendEntries.forEach(entry => {
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

  // Calculate net balance by currency
  const getNetBalanceByCurrency = () => {
    const incomeTotals = getIncomeTotalsByCurrency();
    const spendTotals = getSpendTotalsByCurrency();
    const allCurrencies = new Set([...Object.keys(incomeTotals), ...Object.keys(spendTotals)]);
    
    const netBalances = {};
    allCurrencies.forEach(currency => {
      const income = incomeTotals[currency] || 0;
      const spend = spendTotals[currency] || 0;
      netBalances[currency] = income - spend;
    });
    
    return netBalances;
  };

  // Calculate totals for display
  const totalIncome = incomeEntries.reduce((sum, entry) => sum + (parseFloat(entry.amount) || 0), 0);
  const totalSpend = spendEntries.reduce((sum, entry) => sum + (parseFloat(entry.amount) || 0), 0);
  const netBalance = totalIncome - totalSpend;

  const incomeTotalsByCurrency = getIncomeTotalsByCurrency();
  const spendTotalsByCurrency = getSpendTotalsByCurrency();
  const netBalanceByCurrency = getNetBalanceByCurrency();

  // Add new income entry
  const addIncomeEntry = () => {
    const newId = incomeEntries.length + 1;
    setIncomeEntries([
      ...incomeEntries,
      {
        id: newId,
        description: '',
        amount: '',
        currency: 'USD',
        personName: ''
      }
    ]);
  };

  // Remove income entry
  const removeIncomeEntry = (id) => {
    if (incomeEntries.length > 1) {
      setIncomeEntries(incomeEntries.filter(entry => entry.id !== id));
    }
  };

  // Update income entry
  const updateIncomeEntry = (id, field, value) => {
    setIncomeEntries(incomeEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Add new spend entry
  const addSpendEntry = () => {
    const newId = spendEntries.length + 1;
    setSpendEntries([
      ...spendEntries,
      {
        id: newId,
        description: '',
        amount: '',
        currency: 'USD',
        personName: ''
      }
    ]);
  };

  // Remove spend entry
  const removeSpendEntry = (id) => {
    if (spendEntries.length > 1) {
      setSpendEntries(spendEntries.filter(entry => entry.id !== id));
    }
  };

  // Update spend entry
  const updateSpendEntry = (id, field, value) => {
    setSpendEntries(spendEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    let hasError = false;

    // Validate income entries
    incomeEntries.forEach((entry) => {
      if (!entry.description) {
        newErrors[`income_desc_${entry.id}`] = t.errors.descriptionRequired;
        hasError = true;
      }
      if (!entry.amount) {
        newErrors[`income_amount_${entry.id}`] = t.errors.amountRequired;
        hasError = true;
      } else if (isNaN(entry.amount) || parseFloat(entry.amount) <= 0) {
        newErrors[`income_amount_${entry.id}`] = t.errors.amountPositive;
        hasError = true;
      }
      if (!entry.personName) {
        newErrors[`income_person_${entry.id}`] = t.errors.personNameRequired;
        hasError = true;
      }
    });

    // Validate spend entries
    spendEntries.forEach((entry) => {
      if (!entry.description) {
        newErrors[`spend_desc_${entry.id}`] = t.errors.descriptionRequired;
        hasError = true;
      }
      if (!entry.amount) {
        newErrors[`spend_amount_${entry.id}`] = t.errors.amountRequired;
        hasError = true;
      } else if (isNaN(entry.amount) || parseFloat(entry.amount) <= 0) {
        newErrors[`spend_amount_${entry.id}`] = t.errors.amountPositive;
        hasError = true;
      }
      if (!entry.personName) {
        newErrors[`spend_person_${entry.id}`] = t.errors.personNameRequired;
        hasError = true;
      }
    });

    return { newErrors, hasError };
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { newErrors, hasError } = validateForm();
    
    if (!hasError) {
      // Prepare data for API
      const formData = {
        date: recordDate,
        incomeEntries: incomeEntries.map(entry => ({
          description: entry.description,
          amount: parseFloat(entry.amount),
          currency: entry.currency,
          personName: entry.personName
        })),
        spendEntries: spendEntries.map(entry => ({
          description: entry.description,
          amount: parseFloat(entry.amount),
          currency: entry.currency,
          personName: entry.personName
        }))
      };
      
      // Dispatch update action
      dispatch(updateDailyRecordAction(id, formData));
    } else {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ur-PK', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!isInitialized || isFetching || fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loadingData}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Content - Full width */}
      <main className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/daily-records"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mb-4"
            style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
          >
            <ArrowLeft size={18} />
            <span>{t.backToDailyRecords}</span>
          </Link>
          
          <div className="flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {t.updateDailyRecord}
            </h1>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {t.recordId}: #{id}
            </span>
          </div>
          <p className="text-gray-600 mt-1">{t.editIncomeSpendEntries}</p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl flex items-center space-x-3 animate-fadeIn" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-700 font-medium">{t.recordUpdated}</p>
              <p className="text-sm text-green-600">{t.redirecting}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {updateError && !saveSuccess && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-red-700 font-medium">{t.errorUpdating}</p>
              <p className="text-sm text-red-600">{updateError}</p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            {/* Date Display */}
            <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <div className="flex items-center space-x-2 text-gray-700" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Calendar size={18} className="text-green-600" />
                  <span className="font-medium">{t.recordDate}:</span>
                  <input
                    type="date"
                    value={recordDate}
                    onChange={(e) => setRecordDate(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Edit size={14} />
                  <span>{t.editingRecord} #{id}</span>
                </div>
              </div>
            </div>

            {/* Income Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <h2 className="text-xl font-bold text-gray-900 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  {t.incomeEntries}
                </h2>
                <button
                  type="button"
                  onClick={addIncomeEntry}
                  className="bg-green-100 text-green-600 px-4 py-2 rounded-xl hover:bg-green-200 transition-colors flex items-center space-x-2"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <Plus size={16} />
                  <span>{t.addIncome}</span>
                </button>
              </div>

              <div className="space-y-4">
                {incomeEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-green-50 p-4 rounded-xl border border-green-200 relative"
                  >
                    {incomeEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIncomeEntry(entry.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.description} <span className="text-red-500">{t.required}</span>
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            value={entry.description}
                            onChange={(e) => updateIncomeEntry(entry.id, 'description', e.target.value)}
                            className={`w-full pl-10 pr-3 py-2 border ${
                              errors[`income_desc_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20`}
                            placeholder={t.incomeDescriptionPlaceholder}
                          />
                        </div>
                        {errors[`income_desc_${entry.id}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`income_desc_${entry.id}`]}</p>
                        )}
                      </div>

                      {/* Amount */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.amount} <span className="text-red-500">{t.required}</span>
                        </label>
                        <input
                          type="number"
                          value={entry.amount}
                          onChange={(e) => updateIncomeEntry(entry.id, 'amount', e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors[`income_amount_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20`}
                          placeholder="0.00"
                          step="0.01"
                        />
                        {errors[`income_amount_${entry.id}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`income_amount_${entry.id}`]}</p>
                        )}
                      </div>

                      {/* Currency */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.currency} <span className="text-red-500">{t.required}</span>
                        </label>
                        <select
                          value={entry.currency}
                          onChange={(e) => updateIncomeEntry(entry.id, 'currency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                        >
                          {currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>
                              {currency.flag} {currency.code} - {currency.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Person Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.personName} <span className="text-red-500">{t.required}</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            value={entry.personName}
                            onChange={(e) => updateIncomeEntry(entry.id, 'personName', e.target.value)}
                            className={`w-full pl-10 pr-3 py-2 border ${
                              errors[`income_person_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20`}
                            placeholder={t.personNamePlaceholder}
                          />
                        </div>
                        {errors[`income_person_${entry.id}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`income_person_${entry.id}`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Income Total - Show per currency */}
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-green-800">{t.totalIncome}:</span>
                </div>
                {Object.keys(incomeTotalsByCurrency).length > 0 ? (
                  <div className="space-y-1">
                    {Object.entries(incomeTotalsByCurrency).map(([currency, amount]) => (
                      <div key={currency} className="flex justify-between items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <span className="text-sm text-green-700">{currency}:</span>
                        <span className="font-bold text-green-800">
                          {formatAmount(amount, currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-between items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span className="text-sm text-green-700">USD:</span>
                    <span className="font-bold text-green-800">$ 0.00</span>
                  </div>
                )}
              </div>
            </div>

            {/* Spend Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <h2 className="text-xl font-bold text-gray-900 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <DollarSign className="w-5 h-5 mr-2 text-red-600" />
                  {t.spendEntries}
                </h2>
                <button
                  type="button"
                  onClick={addSpendEntry}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200 transition-colors flex items-center space-x-2"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <Plus size={16} />
                  <span>{t.addSpend}</span>
                </button>
              </div>

              <div className="space-y-4">
                {spendEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-red-50 p-4 rounded-xl border border-red-200 relative"
                  >
                    {spendEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpendEntry(entry.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.description} <span className="text-red-500">{t.required}</span>
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            value={entry.description}
                            onChange={(e) => updateSpendEntry(entry.id, 'description', e.target.value)}
                            className={`w-full pl-10 pr-3 py-2 border ${
                              errors[`spend_desc_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20`}
                            placeholder={t.spendDescriptionPlaceholder}
                          />
                        </div>
                        {errors[`spend_desc_${entry.id}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`spend_desc_${entry.id}`]}</p>
                        )}
                      </div>

                      {/* Amount */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.amount} <span className="text-red-500">{t.required}</span>
                        </label>
                        <input
                          type="number"
                          value={entry.amount}
                          onChange={(e) => updateSpendEntry(entry.id, 'amount', e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors[`spend_amount_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20`}
                          placeholder="0.00"
                          step="0.01"
                        />
                        {errors[`spend_amount_${entry.id}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`spend_amount_${entry.id}`]}</p>
                        )}
                      </div>

                      {/* Currency */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.currency} <span className="text-red-500">{t.required}</span>
                        </label>
                        <select
                          value={entry.currency}
                          onChange={(e) => updateSpendEntry(entry.id, 'currency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                        >
                          {currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>
                              {currency.flag} {currency.code} - {currency.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Person Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.personName} <span className="text-red-500">{t.required}</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            value={entry.personName}
                            onChange={(e) => updateSpendEntry(entry.id, 'personName', e.target.value)}
                            className={`w-full pl-10 pr-3 py-2 border ${
                              errors[`spend_person_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20`}
                            placeholder={t.personNamePlaceholder}
                          />
                        </div>
                        {errors[`spend_person_${entry.id}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`spend_person_${entry.id}`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Spend Total - Show per currency */}
              <div className="mt-4 p-3 bg-red-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-red-800">{t.totalSpend}:</span>
                </div>
                {Object.keys(spendTotalsByCurrency).length > 0 ? (
                  <div className="space-y-1">
                    {Object.entries(spendTotalsByCurrency).map(([currency, amount]) => (
                      <div key={currency} className="flex justify-between items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <span className="text-sm text-red-700">{currency}:</span>
                        <span className="font-bold text-red-800">
                          {formatAmount(amount, currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-between items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span className="text-sm text-red-700">USD:</span>
                    <span className="font-bold text-red-800">$ 0.00</span>
                  </div>
                )}
              </div>
            </div>

            {/* Net Balance - Show per currency */}
            <div className={`mb-8 p-4 rounded-xl ${
              Object.values(netBalanceByCurrency).some(balance => balance >= 0) ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-800">{t.netBalance}:</span>
              </div>
              {Object.keys(netBalanceByCurrency).length > 0 ? (
                <div className="space-y-1">
                  {Object.entries(netBalanceByCurrency).map(([currency, balance]) => (
                    <div key={currency} className="flex justify-between items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <span className="text-sm text-gray-700">{currency}:</span>
                      <span className={`text-lg font-bold ${
                        balance >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatAmount(balance, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-between items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <span className="text-sm text-gray-700">USD:</span>
                  <span className="text-lg font-bold text-green-600">$ 0.00</span>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <Link
                to="/daily-records"
                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                {t.cancel}
              </Link>
              <button
                type="submit"
                disabled={updateLoading}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium flex items-center space-x-2 disabled:opacity-50"
                style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
              >
                {updateLoading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>{t.updating}</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>{t.updateRecord}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DailyRecordsUpdate;