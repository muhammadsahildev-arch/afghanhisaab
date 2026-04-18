import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Plus,
  Save,
  ArrowLeft,
  X,
  CheckCircle,
  RefreshCw,
  BookOpen,
  User,
  FileText,
  Calendar,
  Edit,
  AlertCircle
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  getLedgerEntryDetailsAction,
  updateLedgerEntryAction,
  clearErrors
} from "../../../actions/ledgerActions";
import { UPDATE_LEDGER_ENTRY_RESET } from "../../../constants/constants";

const LedgerUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get state from Redux
  const { entry, loading: fetchLoading, error: fetchError } = useSelector((state) => state.ledgerEntryDetails);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector((state) => state.updateLedgerEntry);
  
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
    { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', flag: '🇦🇫' }
  ];

  // Language translations
  const translations = {
    en: {
      backToLedger: "Back to Ledger",
      updateLedgerEntry: "Update Ledger Entry",
      editingEntry: "Editing Entry",
      updateDesc: "Edit ledger entry with amount and remaining balance",
      ledgerEntryUpdated: "Ledger entry updated successfully!",
      redirectingToLedger: "Redirecting to ledger...",
      errorUpdating: "Error updating ledger entry",
      date: "Date",
      ledgerEntries: "Ledger Entries",
      description: "Description",
      name: "Name",
      amount: "Amount",
      remainingAmount: "Remaining Amount",
      remainingPersonName: "Remaining Person Name",
      balance: "Balance",
      totalsByCurrency: "Totals by Currency",
      totalAmount: "Total Amount",
      totalRemaining: "Total Remaining",
      netBalance: "Net Balance",
      cancel: "Cancel",
      updating: "Updating...",
      updateLedgerEntryBtn: "Update Ledger Entry",
      enterDescription: "Enter description",
      enterName: "Enter name",
      enterPersonName: "Enter person name",
      loadingEntry: "Loading ledger entry...",
      
      // Validation Errors
      descriptionRequired: "Description is required",
      nameRequired: "Name is required",
      amountRequired: "Amount is required",
      amountGreaterThanZero: "Amount must be greater than 0",
      remainingAmountRequired: "Remaining amount is required",
      remainingAmountNegative: "Remaining amount cannot be negative",
      remainingGreaterThanAmount: "Remaining amount cannot be greater than total amount",
      remainingPersonRequired: "Remaining person name is required",
      
      // Placeholders
      amountPlaceholder: "0.00",
      remainingPlaceholder: "0.00",
      descriptionPlaceholder: "Enter description",
      namePlaceholder: "Enter name",
      personPlaceholder: "Enter person name",
      
      // Status
      active: "active",
      entryId: "ID"
    },
    ur: {
      backToLedger: "لیجر پر واپس جائیں",
      updateLedgerEntry: "لیجر اندراج اپ ڈیٹ کریں",
      editingEntry: "اندراج میں ترمیم کر رہے ہیں",
      updateDesc: "رقم اور باقی بیلنس کے ساتھ لیجر اندراج میں ترمیم کریں",
      ledgerEntryUpdated: "لیجر اندراج کامیابی سے اپ ڈیٹ ہوگیا!",
      redirectingToLedger: "لیجر پر ری ڈائریکٹ کیا جا رہا ہے...",
      errorUpdating: "لیجر اندراج اپ ڈیٹ کرنے میں خرابی",
      date: "تاریخ",
      ledgerEntries: "لیجر اندراجات",
      description: "تفصیل",
      name: "نام",
      amount: "رقم",
      remainingAmount: "باقی رقم",
      remainingPersonName: "باقی شخص کا نام",
      balance: "بیلنس",
      totalsByCurrency: "کرنسی کے حساب سے کل",
      totalAmount: "کل رقم",
      totalRemaining: "کل باقی",
      netBalance: "خالص بیلنس",
      cancel: "منسوخ کریں",
      updating: "اپ ڈیٹ ہو رہا ہے...",
      updateLedgerEntryBtn: "لیجر اندراج اپ ڈیٹ کریں",
      enterDescription: "تفصیل درج کریں",
      enterName: "نام درج کریں",
      enterPersonName: "شخص کا نام درج کریں",
      loadingEntry: "لیجر اندراج لوڈ ہو رہا ہے...",
      
      descriptionRequired: "تفصیل درکار ہے",
      nameRequired: "نام درکار ہے",
      amountRequired: "رقم درکار ہے",
      amountGreaterThanZero: "رقم صفر سے زیادہ ہونی چاہیے",
      remainingAmountRequired: "باقی رقم درکار ہے",
      remainingAmountNegative: "باقی رقم منفی نہیں ہو سکتی",
      remainingGreaterThanAmount: "باقی رقم کل رقم سے زیادہ نہیں ہو سکتی",
      remainingPersonRequired: "باقی شخص کا نام درکار ہے",
      
      amountPlaceholder: "0.00",
      remainingPlaceholder: "0.00",
      descriptionPlaceholder: "تفصیل درج کریں",
      namePlaceholder: "نام درج کریں",
      personPlaceholder: "شخص کا نام درج کریں",
      
      active: "فعال",
      entryId: "شناختی نمبر"
    },
    ps: {
      backToLedger: "لیجر ته راګرځئ",
      updateLedgerEntry: "د لیجر داخل تازه کړئ",
      editingEntry: "د داخلې ترمیم کول",
      updateDesc: "د اندازې او پاتې توازن سره د لیجر داخل ترمیم کړئ",
      ledgerEntryUpdated: "د لیجر داخل بریالی شو!",
      redirectingToLedger: "لیجر ته لیږدول کیږي...",
      errorUpdating: "د لیجر داخل تازه کولو کې تېروتنه",
      date: "نیټه",
      ledgerEntries: "د لیجر داخلې",
      description: "تشریح",
      name: "نوم",
      amount: "اندازه",
      remainingAmount: "پاتې اندازه",
      remainingPersonName: "د پاتې کس نوم",
      balance: "توازن",
      totalsByCurrency: "د اسعارو له مخې ټولټال",
      totalAmount: "ټوله اندازه",
      totalRemaining: "ټول پاتې",
      netBalance: "خالص توازن",
      cancel: "لغوه کړئ",
      updating: "تازه کیږي...",
      updateLedgerEntryBtn: "د لیجر داخل تازه کړئ",
      enterDescription: "تشریح دننه کړئ",
      enterName: "نوم دننه کړئ",
      enterPersonName: "د کس نوم دننه کړئ",
      loadingEntry: "د لیجر داخل لوډ کیږي...",
      
      descriptionRequired: "تشریح اړینه ده",
      nameRequired: "نوم اړین دی",
      amountRequired: "اندازه اړینه ده",
      amountGreaterThanZero: "اندازه باید له صفر څخه زیاته وي",
      remainingAmountRequired: "پاتې اندازه اړینه ده",
      remainingAmountNegative: "پاتې اندازه منفي نشي کیدی",
      remainingGreaterThanAmount: "پاتې اندازه د ټولې اندازې څخه زیاته نشي کیدی",
      remainingPersonRequired: "د پاتې کس نوم اړین دی",
      
      amountPlaceholder: "0.00",
      remainingPlaceholder: "0.00",
      descriptionPlaceholder: "تشریح دننه کړئ",
      namePlaceholder: "نوم دننه کړئ",
      personPlaceholder: "د کس نوم دننه کړئ",
      
      active: "فعال",
      entryId: "شمېره"
    },
    fa: {
      backToLedger: "بازگشت به لجر",
      updateLedgerEntry: "به‌روزرسانی ورودی لجر",
      editingEntry: "ویرایش ورودی",
      updateDesc: "ورودی لجر را با مبلغ و موجودی باقی‌مانده ویرایش کنید",
      ledgerEntryUpdated: "ورودی لجر با موفقیت به‌روز شد!",
      redirectingToLedger: "در حال انتقال به لجر...",
      errorUpdating: "خطا در به‌روزرسانی ورودی لجر",
      date: "تاریخ",
      ledgerEntries: "ورودی‌های لجر",
      description: "توضیحات",
      name: "نام",
      amount: "مبلغ",
      remainingAmount: "مبلغ باقی‌مانده",
      remainingPersonName: "نام شخص باقی‌مانده",
      balance: "موجودی",
      totalsByCurrency: "مجموع بر اساس ارز",
      totalAmount: "کل مبلغ",
      totalRemaining: "کل باقی‌مانده",
      netBalance: "موجودی خالص",
      cancel: "لغو",
      updating: "در حال به‌روزرسانی...",
      updateLedgerEntryBtn: "به‌روزرسانی ورودی لجر",
      enterDescription: "توضیحات را وارد کنید",
      enterName: "نام را وارد کنید",
      enterPersonName: "نام شخص را وارد کنید",
      loadingEntry: "در حال بارگذاری ورودی لجر...",
      
      descriptionRequired: "توضیحات الزامی است",
      nameRequired: "نام الزامی است",
      amountRequired: "مبلغ الزامی است",
      amountGreaterThanZero: "مبلغ باید بیشتر از صفر باشد",
      remainingAmountRequired: "مبلغ باقی‌مانده الزامی است",
      remainingAmountNegative: "مبلغ باقی‌مانده نمی‌تواند منفی باشد",
      remainingGreaterThanAmount: "مبلغ باقی‌مانده نمی‌تواند بیشتر از مبلغ کل باشد",
      remainingPersonRequired: "نام شخص باقی‌مانده الزامی است",
      
      amountPlaceholder: "0.00",
      remainingPlaceholder: "0.00",
      descriptionPlaceholder: "توضیحات را وارد کنید",
      namePlaceholder: "نام را وارد کنید",
      personPlaceholder: "نام شخص را وارد کنید",
      
      active: "فعال",
      entryId: "شناسه"
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

  // Ledger entries state
  const [ledgerEntries, setLedgerEntries] = useState([
    {
      id: 1,
      description: '',
      name: '',
      amount: '',
      currency: 'USD',
      remainingAmount: '',
      remainingCurrency: 'USD',
      remainingPersonName: ''
    }
  ]);

  // Fetch existing record data
  useEffect(() => {
    if (id) {
      dispatch(getLedgerEntryDetailsAction(id));
    }
  }, [dispatch, id]);

  // Populate form with fetched data
  useEffect(() => {
    if (entry && Object.keys(entry).length > 0) {
      setRecordDate(entry.date?.split('T')[0] || '');
      setLedgerEntries([
        {
          id: 1,
          description: entry.description || '',
          name: entry.name || '',
          amount: entry.amount?.toString() || '',
          currency: entry.currency || 'USD',
          remainingAmount: entry.remainingAmount?.toString() || '',
          remainingCurrency: entry.remainingCurrency || 'USD',
          remainingPersonName: entry.remainingPersonName || ''
        }
      ]);
      setIsFetching(false);
    }
  }, [entry]);

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
      toast.success(t.ledgerEntryUpdated);
      dispatch({ type: UPDATE_LEDGER_ENTRY_RESET });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/ledger-record');
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
      dispatch({ type: UPDATE_LEDGER_ENTRY_RESET });
    };
  }, [dispatch]);

  // Add new ledger entry
  const addLedgerEntry = () => {
    const newId = ledgerEntries.length + 1;
    const newEntry = {
      id: newId,
      description: '',
      name: '',
      amount: '',
      currency: 'USD',
      remainingAmount: '',
      remainingCurrency: 'USD',
      remainingPersonName: ''
    };
    setLedgerEntries([...ledgerEntries, newEntry]);
  };

  // Remove ledger entry
  const removeLedgerEntry = (id) => {
    if (ledgerEntries.length > 1) {
      setLedgerEntries(ledgerEntries.filter(entry => entry.id !== id));
    }
  };

  // Update ledger entry
  const updateLedgerEntry = (id, field, value) => {
    setLedgerEntries(ledgerEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    let hasError = false;

    ledgerEntries.forEach((entry) => {
      if (!entry.description) {
        newErrors[`desc_${entry.id}`] = t.descriptionRequired;
        hasError = true;
      }
      if (!entry.name) {
        newErrors[`name_${entry.id}`] = t.nameRequired;
        hasError = true;
      }
      if (!entry.amount) {
        newErrors[`amount_${entry.id}`] = t.amountRequired;
        hasError = true;
      } else if (parseFloat(entry.amount) <= 0) {
        newErrors[`amount_${entry.id}`] = t.amountGreaterThanZero;
        hasError = true;
      }
      if (!entry.remainingAmount) {
        newErrors[`remaining_${entry.id}`] = t.remainingAmountRequired;
        hasError = true;
      } else if (parseFloat(entry.remainingAmount) < 0) {
        newErrors[`remaining_${entry.id}`] = t.remainingAmountNegative;
        hasError = true;
      }
      if (parseFloat(entry.remainingAmount) > parseFloat(entry.amount)) {
        newErrors[`remaining_${entry.id}`] = t.remainingGreaterThanAmount;
        hasError = true;
      }
      if (!entry.remainingPersonName) {
        newErrors[`remaining_person_${entry.id}`] = t.remainingPersonRequired;
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
      const updateData = {
        description: ledgerEntries[0].description,
        name: ledgerEntries[0].name,
        amount: parseFloat(ledgerEntries[0].amount),
        currency: ledgerEntries[0].currency,
        remainingAmount: parseFloat(ledgerEntries[0].remainingAmount),
        remainingCurrency: ledgerEntries[0].remainingCurrency,
        remainingPersonName: ledgerEntries[0].remainingPersonName,
        entryDate: recordDate,
        status: 'active'
      };
      
      // Dispatch update action
      dispatch(updateLedgerEntryAction(id, updateData));
    } else {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate total for an entry
  const calculateBalance = (entry) => {
    const amount = parseFloat(entry.amount) || 0;
    const remaining = parseFloat(entry.remainingAmount) || 0;
    return amount - remaining;
  };

  // Get currency symbol
  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : code;
  };

  // Calculate totals
  const totalAmount = ledgerEntries.reduce((sum, entry) => sum + (parseFloat(entry.amount) || 0), 0);
  const totalRemaining = ledgerEntries.reduce((sum, entry) => sum + (parseFloat(entry.remainingAmount) || 0), 0);
  const netBalance = totalAmount - totalRemaining;

  if (!isInitialized || isFetching || fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loadingEntry}</p>
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
            to="/ledger-record"
            className={`inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mb-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
            <span>{t.backToLedger}</span>
          </Link>
          
          <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {t.updateLedgerEntry}
            </h1>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {t.entryId}: #{id}
            </span>
          </div>
          <p className="text-gray-600 mt-1">{t.updateDesc}</p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className={`mb-6 p-4 bg-green-100 border border-green-300 rounded-xl flex items-center space-x-3 animate-fadeIn ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-700 font-medium">{t.ledgerEntryUpdated}</p>
              <p className="text-sm text-green-600">{t.redirectingToLedger}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {updateError && !saveSuccess && (
          <div className={`mb-6 p-4 bg-red-100 border border-red-300 rounded-xl flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
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
            <div className={`mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200`}>
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center space-x-2 text-gray-700 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Calendar size={18} className="text-green-600" />
                  <span className="font-medium">{t.date}:</span>
                  <input
                    type="date"
                    value={recordDate}
                    onChange={(e) => setRecordDate(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className={`flex items-center space-x-2 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Edit size={14} />
                  <span>{t.editingEntry} #{id}</span>
                </div>
              </div>
            </div>

            {/* Ledger Entries Section */}
            <div className="mb-8">
              <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className={`text-xl font-bold text-gray-900 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                  {t.ledgerEntries}
                </h2>
              </div>

              <div className="space-y-4">
                {ledgerEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-blue-50 p-4 rounded-xl border border-blue-200 relative"
                  >
                    {ledgerEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLedgerEntry(entry.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Description */}
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>
                          {t.description} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FileText className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={16} />
                          <input
                            type="text"
                            value={entry.description}
                            onChange={(e) => updateLedgerEntry(entry.id, 'description', e.target.value)}
                            className={`w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2 border ${
                              errors[`desc_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20`}
                            placeholder={t.descriptionPlaceholder}
                          />
                        </div>
                        {errors[`desc_${entry.id}`] && (
                          <p className={`mt-1 text-xs text-red-600 ${isRTL ? 'text-right' : ''}`}>{errors[`desc_${entry.id}`]}</p>
                        )}
                      </div>

                      {/* Name */}
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>
                          {t.name} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={16} />
                          <input
                            type="text"
                            value={entry.name}
                            onChange={(e) => updateLedgerEntry(entry.id, 'name', e.target.value)}
                            className={`w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2 border ${
                              errors[`name_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20`}
                            placeholder={t.namePlaceholder}
                          />
                        </div>
                        {errors[`name_${entry.id}`] && (
                          <p className={`mt-1 text-xs text-red-600 ${isRTL ? 'text-right' : ''}`}>{errors[`name_${entry.id}`]}</p>
                        )}
                      </div>

                      {/* Amount with Currency */}
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>
                          {t.amount} <span className="text-red-500">*</span>
                        </label>
                        <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className="flex-1">
                            <input
                              type="number"
                              value={entry.amount}
                              onChange={(e) => updateLedgerEntry(entry.id, 'amount', e.target.value)}
                              className={`w-full px-3 py-2 border ${
                                errors[`amount_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                              } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${isRTL ? 'text-right' : ''}`}
                              placeholder={t.amountPlaceholder}
                              step="0.01"
                            />
                          </div>
                          <div className="w-24">
                            <select
                              value={entry.currency}
                              onChange={(e) => updateLedgerEntry(entry.id, 'currency', e.target.value)}
                              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            >
                              {currencies.map(currency => (
                                <option key={currency.code} value={currency.code}>
                                  {currency.code}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {errors[`amount_${entry.id}`] && (
                          <p className={`mt-1 text-xs text-red-600 ${isRTL ? 'text-right' : ''}`}>{errors[`amount_${entry.id}`]}</p>
                        )}
                      </div>

                      {/* Remaining Amount with Currency */}
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>
                          {t.remainingAmount} <span className="text-red-500">*</span>
                        </label>
                        <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className="flex-1">
                            <input
                              type="number"
                              value={entry.remainingAmount}
                              onChange={(e) => updateLedgerEntry(entry.id, 'remainingAmount', e.target.value)}
                              className={`w-full px-3 py-2 border ${
                                errors[`remaining_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                              } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 ${isRTL ? 'text-right' : ''}`}
                              placeholder={t.remainingPlaceholder}
                              step="0.01"
                            />
                          </div>
                          <div className="w-24">
                            <select
                              value={entry.remainingCurrency}
                              onChange={(e) => updateLedgerEntry(entry.id, 'remainingCurrency', e.target.value)}
                              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            >
                              {currencies.map(currency => (
                                <option key={currency.code} value={currency.code}>
                                  {currency.code}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {errors[`remaining_${entry.id}`] && (
                          <p className={`mt-1 text-xs text-red-600 ${isRTL ? 'text-right' : ''}`}>{errors[`remaining_${entry.id}`]}</p>
                        )}
                      </div>

                      {/* Remaining Person Name */}
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>
                          {t.remainingPersonName} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={16} />
                          <input
                            type="text"
                            value={entry.remainingPersonName}
                            onChange={(e) => updateLedgerEntry(entry.id, 'remainingPersonName', e.target.value)}
                            className={`w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2 border ${
                              errors[`remaining_person_${entry.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20`}
                            placeholder={t.personPlaceholder}
                          />
                        </div>
                        {errors[`remaining_person_${entry.id}`] && (
                          <p className={`mt-1 text-xs text-red-600 ${isRTL ? 'text-right' : ''}`}>{errors[`remaining_person_${entry.id}`]}</p>
                        )}
                      </div>

                      {/* Balance Display (read-only) */}
                      <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{t.balance}:</span>
                        <span className={`font-bold ${calculateBalance(entry) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {getCurrencySymbol(entry.currency)} {calculateBalance(entry).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Section - Per Currency */}
              <div className="mt-6">
                <h3 className={`text-lg font-semibold text-gray-900 mb-3 ${isRTL ? 'text-right' : ''}`}>{t.totalsByCurrency}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(() => {
                    const totalsByCurrency = {};
                    
                    ledgerEntries.forEach(entry => {
                      const currency = entry.currency;
                      const amount = parseFloat(entry.amount) || 0;
                      if (!totalsByCurrency[currency]) {
                        totalsByCurrency[currency] = { amount: 0, remaining: 0 };
                      }
                      totalsByCurrency[currency].amount += amount;
                    });
                    
                    ledgerEntries.forEach(entry => {
                      const currency = entry.remainingCurrency;
                      const remaining = parseFloat(entry.remainingAmount) || 0;
                      if (totalsByCurrency[currency]) {
                        totalsByCurrency[currency].remaining = (totalsByCurrency[currency].remaining || 0) + remaining;
                      } else {
                        totalsByCurrency[currency] = { amount: 0, remaining: remaining };
                      }
                    });
                    
                    return Object.entries(totalsByCurrency).map(([currency, totals]) => (
                      <div key={currency} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="text-lg font-bold">{currency}</span>
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                            {currencies.find(c => c.code === currency)?.name || currency}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="text-sm text-gray-600">{t.totalAmount}:</span>
                            <span className="font-semibold text-green-600">
                              {getCurrencySymbol(currency)} {totals.amount.toFixed(2)}
                            </span>
                          </div>
                          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="text-sm text-gray-600">{t.totalRemaining}:</span>
                            <span className="font-semibold text-blue-600">
                              {getCurrencySymbol(currency)} {totals.remaining.toFixed(2)}
                            </span>
                          </div>
                          <div className={`flex justify-between pt-2 border-t border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="text-sm font-medium text-gray-700">{t.netBalance}:</span>
                            <span className="font-bold text-purple-600">
                              {getCurrencySymbol(currency)} {(totals.amount - totals.remaining).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className={`flex space-x-3 pt-4 border-t border-gray-200 ${isRTL ? 'flex-row-reverse space-x-reverse justify-start' : 'justify-end'}`}>
              <Link
                to="/ledger-record"
                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                {t.cancel}
              </Link>
              <button
                type="submit"
                disabled={updateLoading}
                className={`px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium flex items-center space-x-2 disabled:opacity-50 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {updateLoading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>{t.updating}</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>{t.updateLedgerEntryBtn}</span>
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

export default LedgerUpdate;