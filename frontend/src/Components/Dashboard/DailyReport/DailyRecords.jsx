import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Wallet,
  X,
  Menu,
  LogOut,
  Home,
  Users,
  Settings,
  CreditCard,
  Calendar,
  Bell,
  DollarSign,
  User,
  FileText,
  Info,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  getAllDailyRecordsAction,
  deleteDailyRecordAction,
  clearErrors,
  getDailyRecordStatsAction
} from "../../../actions/dailyRecordActions";
import { DELETE_DAILY_RECORD_RESET } from "../../../constants/constants";

const DailyRecords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Language translations
  const translations = {
    en: {
      backToDashboard: "Back to Dashboard",
      dailyRecords: "Daily Records",
      subtitle: "Manage your daily income and spend records",
      searchPlaceholder: "Search records...",
      newRecord: "New Record",
      exportToCSV: "Export to CSV",
      totalRecords: "Total Records",
      totalIncome: "Total Income",
      totalSpend: "Total Spend",
      netBalance: "Net Balance",
      noRecordsFound: "No daily records found",
      showing: "Showing",
      to: "to",
      of: "of",
      entries: "entries",
      recordDetails: "Record Details",
      date: "Date",
      day: "Day",
      incomeEntries: "Income Entries",
      spendEntries: "Spend Entries",
      incomeDetails: "Income Details",
      spendDetails: "Spend Details",
      balanceDetails: "Balance Details",
      actions: "Actions",
      description: "Description",
      amount: "Amount",
      currency: "Currency",
      personName: "Person Name",
      noIncomeEntries: "No income entries",
      noSpendEntries: "No spend entries",
      summaryByCurrency: "Summary by Currency",
      deleteRecord: "Delete Record",
      deleteConfirmation: "Are you sure you want to delete the record from",
      deleteWarning: "This action cannot be undone.",
      delete: "Delete",
      cancel: "Cancel",
      deleting: "Deleting...",
      editRecord: "Edit Record",
      close: "Close",
      loading: "Loading daily records...",
      recordDeletedSuccess: "Daily record deleted successfully!",
      exportSuccess: "Exported",
      recordsSuccessfully: "records successfully!",
      noDataToExport: "No data to export",
      exportFailed: "Failed to export data",
      id: "ID"
    },
    ur: {
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      dailyRecords: "روزانہ کے ریکارڈز / روزنامه",
      subtitle: "اپنے روزانہ کی آمدنی اور اخراجات کے ریکارڈز کا نظم کریں",
      searchPlaceholder: "ریکارڈز تلاش کریں...",
      newRecord: "نیا ریکارڈ",
      exportToCSV: "CSV میں ایکسپورٹ کریں",
      totalRecords: "کل ریکارڈز",
      totalIncome: "کل آمدنی",
      totalSpend: "کل اخراجات",
      netBalance: "خالص بیلنس",
      noRecordsFound: "کوئی روزانہ ریکارڈز نہیں ملے",
      showing: "دکھا رہا ہے",
      to: "سے",
      of: "میں سے",
      entries: "انٹریز",
      recordDetails: "ریکارڈ کی تفصیلات",
      date: "تاریخ",
      day: "دن",
      incomeEntries: "آمدنی کی انٹریز",
      spendEntries: "اخراجات کی انٹریز",
      incomeDetails: "آمدنی کی تفصیلات",
      spendDetails: "اخراجات کی تفصیلات",
      balanceDetails: "بیلنس کی تفصیلات",
      actions: "اعمال",
      description: "تفصیل",
      amount: "رقم",
      currency: "کرنسی",
      personName: "شخص کا نام",
      noIncomeEntries: "کوئی آمدنی کی انٹریز نہیں",
      noSpendEntries: "کوئی اخراجات کی انٹریز نہیں",
      summaryByCurrency: "کرنسی کے لحاظ سے خلاصہ",
      deleteRecord: "ریکارڈ حذف کریں",
      deleteConfirmation: "کیا آپ واقعی کا ریکارڈ حذف کرنا چاہتے ہیں",
      deleteWarning: "یہ عمل واپس نہیں کیا جا سکتا۔",
      delete: "حذف کریں",
      cancel: "منسوخ کریں",
      deleting: "حذف ہو رہا ہے...",
      editRecord: "ریکارڈ میں ترمیم کریں",
      close: "بند کریں",
      loading: "روزانہ ریکارڈز لوڈ ہو رہے ہیں...",
      recordDeletedSuccess: "روزانہ ریکارڈ کامیابی سے حذف ہو گیا!",
      exportSuccess: "ایکسپورٹ کیا گیا",
      recordsSuccessfully: "ریکارڈز کامیابی سے!",
      noDataToExport: "ایکسپورٹ کرنے کے لیے کوئی ڈیٹا نہیں",
      exportFailed: "ڈیٹا ایکسپورٹ کرنے میں ناکامی",
      id: "شناختی نمبر"
    },
    ps: {
      backToDashboard: "بیرته ډشبورډ ته",
      dailyRecords: "ورځني ریکارډونه / ورځپاڼه",
      subtitle: "خپل ورځني عاید او لګښت ریکارډونه اداره کړئ",
      searchPlaceholder: "ریکارډونه ولټوئ...",
      newRecord: "نوی ریکارډ",
      exportToCSV: "CSV ته صادر کړئ",
      totalRecords: "ټول ریکارډونه",
      totalIncome: "ټول عاید",
      totalSpend: "ټول لګښت",
      netBalance: "خالص بیلانس",
      noRecordsFound: "هیڅ ورځني ریکارډونه ونه موندل شول",
      showing: "ښودل کیږي",
      to: "ته",
      of: "له",
      entries: "ننوتنې",
      recordDetails: "د ریکارډ توضیحات",
      date: "نیټه",
      day: "ورځ",
      incomeEntries: "د عاید ننوتنې",
      spendEntries: "د لګښت ننوتنې",
      incomeDetails: "د عاید توضیحات",
      spendDetails: "د لګښت توضیحات",
      balanceDetails: "د بیلانس توضیحات",
      actions: "کړنې",
      description: "تشریح",
      amount: "اندازه",
      currency: "اسعار",
      personName: "د شخص نوم",
      noIncomeEntries: "هیڅ عاید ننوتنې نشته",
      noSpendEntries: "هیڅ لګښت ننوتنې نشته",
      summaryByCurrency: "د اسعارو له مخې لنډیز",
      deleteRecord: "ریکارډ ړنګ کړئ",
      deleteConfirmation: "ایا تاسو واقعیا د ریکارډ ړنګول غواړئ",
      deleteWarning: "دا عمل بیرته نه شي ګرځول کیدی.",
      delete: "ړنګ کړئ",
      cancel: "لغوه کړئ",
      deleting: "ړنګ کیږي...",
      editRecord: "ریکارډ سم کړئ",
      close: "تړل",
      loading: "ورځني ریکارډونه بار کیږي...",
      recordDeletedSuccess: "ورځنی ریکارډ په بریالیتوب سره ړنګ شو!",
      exportSuccess: "صادر شو",
      recordsSuccessfully: "ریکارډونه په بریالیتوب سره!",
      noDataToExport: "د صادرولو لپاره معلومات نشته",
      exportFailed: "د معلوماتو په صادرولو کې پاتې راغلی",
      id: "شناختي نمبر"
    },
    fa: {
      backToDashboard: "بازگشت به داشبورد",
      dailyRecords: "رکوردهای روزانه / روزنامه",
      subtitle: "مدیریت رکوردهای درآمد و هزینه روزانه شما",
      searchPlaceholder: "جستجوی رکوردها...",
      newRecord: "رکورد جدید",
      exportToCSV: "خروجی به CSV",
      totalRecords: "کل رکوردها",
      totalIncome: "کل درآمد",
      totalSpend: "کل هزینه",
      netBalance: "موجودی خالص",
      noRecordsFound: "هیچ رکورد روزانه‌ای یافت نشد",
      showing: "نمایش",
      to: "تا",
      of: "از",
      entries: "ورودی‌ها",
      recordDetails: "جزئیات رکورد",
      date: "تاریخ",
      day: "روز",
      incomeEntries: "ورودی‌های درآمد",
      spendEntries: "ورودی‌های هزینه",
      incomeDetails: "جزئیات درآمد",
      spendDetails: "جزئیات هزینه",
      balanceDetails: "جزئیات موجودی",
      actions: "عملیات",
      description: "توضیحات",
      amount: "مبلغ",
      currency: "ارز",
      personName: "نام شخص",
      noIncomeEntries: "هیچ ورودی درآمدی وجود ندارد",
      noSpendEntries: "هیچ ورودی هزینه‌ای وجود ندارد",
      summaryByCurrency: "خلاصه بر اساس ارز",
      deleteRecord: "حذف رکورد",
      deleteConfirmation: "آیا مطمئن هستید که می‌خواهید رکورد را حذف کنید",
      deleteWarning: "این عمل قابل بازگشت نیست.",
      delete: "حذف",
      cancel: "انصراف",
      deleting: "در حال حذف...",
      editRecord: "ویرایش رکورد",
      close: "بستن",
      loading: "در حال بارگذاری رکوردهای روزانه...",
      recordDeletedSuccess: "رکورد روزانه با موفقیت حذف شد!",
      exportSuccess: "خروجی گرفته شد",
      recordsSuccessfully: "رکوردها با موفقیت!",
      noDataToExport: "داده‌ای برای خروجی وجود ندارد",
      exportFailed: "خطا در خروجی گرفتن داده‌ها",
      id: "شناسه"
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

  // Get state from Redux
  const { records, loading, error, summary, pagination } = useSelector((state) => state.allDailyRecords);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.deleteDailyRecord);

  // Fetch daily records on mount
  useEffect(() => {
    dispatch(getAllDailyRecordsAction(currentPage, itemsPerPage, searchTerm));
    dispatch(getDailyRecordStatsAction());
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);

  // Handle delete success
  useEffect(() => {
    if (deleteSuccess) {
      toast.success(t.recordDeletedSuccess);
      dispatch({ type: DELETE_DAILY_RECORD_RESET });
      dispatch(getAllDailyRecordsAction(currentPage, itemsPerPage, searchTerm));
      dispatch(getDailyRecordStatsAction());
      setShowDeleteModal(false);
      setSelectedRecord(null);
      setIsDeleting(false);
    }
  }, [deleteSuccess, dispatch, currentPage, itemsPerPage, searchTerm, t]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
  }, [error, deleteError, dispatch]);

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ur-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get currency symbol
  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: '$', 
      EUR: '€', 
      GBP: '£', 
      PKR: '₨', 
      AED: 'د.إ', 
      SAR: 'ر.س', 
      AFN: '؋',
      INR: '₹',
      CAD: 'C$',
      AUD: 'A$',
      JPY: '¥',
      CNY: '¥'
    };
    return symbols[currency] || currency || '$';
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

  // Calculate totals by currency from records
  const getTotalsByCurrency = () => {
    const totals = {
      income: {},
      spend: {},
      balance: {}
    };
    
    (records || []).forEach(record => {
      // Process income entries
      if (record.incomeEntries && Array.isArray(record.incomeEntries)) {
        record.incomeEntries.forEach(entry => {
          if (entry.amount && entry.currency) {
            if (!totals.income[entry.currency]) {
              totals.income[entry.currency] = 0;
            }
            totals.income[entry.currency] += entry.amount;
          }
        });
      }
      
      // Process spend entries
      if (record.spendEntries && Array.isArray(record.spendEntries)) {
        record.spendEntries.forEach(entry => {
          if (entry.amount && entry.currency) {
            if (!totals.spend[entry.currency]) {
              totals.spend[entry.currency] = 0;
            }
            totals.spend[entry.currency] += entry.amount;
          }
        });
      }
    });
    
    // Calculate balance by currency
    const allCurrencies = new Set([...Object.keys(totals.income), ...Object.keys(totals.spend)]);
    allCurrencies.forEach(currency => {
      const income = totals.income[currency] || 0;
      const spend = totals.spend[currency] || 0;
      totals.balance[currency] = income - spend;
    });
    
    return totals;
  };

  // Calculate per-currency totals for a single record
  const getRecordTotalsByCurrency = (record) => {
    const totals = {
      income: {},
      spend: {},
      balance: {}
    };
    
    // Process income entries
    if (record.incomeEntries && Array.isArray(record.incomeEntries)) {
      record.incomeEntries.forEach(entry => {
        if (entry.amount && entry.currency) {
          if (!totals.income[entry.currency]) {
            totals.income[entry.currency] = 0;
          }
          totals.income[entry.currency] += entry.amount;
        }
      });
    }
    
    // Process spend entries
    if (record.spendEntries && Array.isArray(record.spendEntries)) {
      record.spendEntries.forEach(entry => {
        if (entry.amount && entry.currency) {
          if (!totals.spend[entry.currency]) {
            totals.spend[entry.currency] = 0;
          }
          totals.spend[entry.currency] += entry.amount;
        }
      });
    }
    
    // Calculate balance by currency
    const allCurrencies = new Set([...Object.keys(totals.income), ...Object.keys(totals.spend)]);
    allCurrencies.forEach(currency => {
      const income = totals.income[currency] || 0;
      const spend = totals.spend[currency] || 0;
      totals.balance[currency] = income - spend;
    });
    
    return totals;
  };

  // Get day name from date
  const getDayName = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ur-PK', { weekday: 'long' });
  };

  // Handle delete
  const handleDeleteClick = (record) => {
    setSelectedRecord(record);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedRecord) {
      setIsDeleting(true);
      dispatch(deleteDailyRecordAction(selectedRecord.id));
    }
  };

  // Handle view details
  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowDetailsModal(true);
  };

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/daily-records/${id}`);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Handle export - frontend only download
  const handleExport = () => {
    try {
      const dataToExport = records || [];
      
      if (!dataToExport || dataToExport.length === 0) {
        toast.error(t.noDataToExport);
        return;
      }
      
      // Prepare CSV headers
      const headers = [
        t.id, t.date, t.day, 'Income Details', 'Spend Details', 'Net Balance Details'
      ];
      
      const csvRows = [headers.join(',')];
      
      // Add data rows
      dataToExport.forEach(record => {
        const recordTotals = getRecordTotalsByCurrency(record);
        const incomeStr = Object.entries(recordTotals.income).map(([curr, amt]) => `${getCurrencySymbol(curr)}${amt}`).join('; ');
        const spendStr = Object.entries(recordTotals.spend).map(([curr, amt]) => `${getCurrencySymbol(curr)}${amt}`).join('; ');
        const balanceStr = Object.entries(recordTotals.balance).map(([curr, amt]) => `${getCurrencySymbol(curr)}${amt}`).join('; ');
        
        const row = [
          record.id,
          record.date ? formatDate(record.date) : 'N/A',
          getDayName(record.date),
          `"${incomeStr}"`,
          `"${spendStr}"`,
          `"${balanceStr}"`
        ];
        csvRows.push(row.join(','));
      });
      
      // Create and download CSV file
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `daily_records_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`${t.exportSuccess} ${dataToExport.length} ${t.recordsSuccessfully}`);
    } catch (err) {
      console.error('Export error:', err);
      toast.error(t.exportFailed);
    }
  };

  // Get current items for pagination
  const currentItems = records || [];

  // Calculate totals from summary or from records
  const totalRecords = summary?.totalRecords || records?.length || 0;
  
  // Get totals by currency
  const totalsByCurrency = getTotalsByCurrency();

  if (!isInitialized || (loading && !records)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <Link to="/dashboard">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <ArrowLeft size={18} />
                <span>{t.backToDashboard}</span>
              </button>
            </Link>
            <div className="h-8 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {t.dailyRecords}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 w-64"
              />
            </div>

            {/* Create New Button */}
            <Link to="/daily-records-create">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 shadow-lg" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <Plus size={18} />
                <span>{t.newRecord}</span>
              </button>
            </Link>

            {/* Export Button */}
            <button 
              onClick={handleExport} 
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              title={t.exportToCSV}
            >
              <Download size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div>
                <p className="text-sm opacity-90">{t.totalRecords}</p>
                <p className="text-2xl font-bold mt-1">{totalRecords}</p>
              </div>
              <Calendar size={24} className="opacity-50" />
            </div>
          </div>

          {/* Total Income Card - Shows per currency */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <p className="text-sm opacity-90">{t.totalIncome}</p>
              <DollarSign size={24} className="opacity-50" />
            </div>
            <div className="space-y-1">
              {Object.keys(totalsByCurrency.income).length > 0 ? (
                Object.entries(totalsByCurrency.income).map(([currency, amount]) => (
                  <p key={currency} className="text-lg font-bold">
                    {formatAmount(amount, currency)}
                  </p>
                ))
              ) : (
                <p className="text-lg font-bold">{formatAmount(0, 'USD')}</p>
              )}
            </div>
          </div>

          {/* Total Spend Card - Shows per currency */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <p className="text-sm opacity-90">{t.totalSpend}</p>
              <CreditCard size={24} className="opacity-50" />
            </div>
            <div className="space-y-1">
              {Object.keys(totalsByCurrency.spend).length > 0 ? (
                Object.entries(totalsByCurrency.spend).map(([currency, amount]) => (
                  <p key={currency} className="text-lg font-bold">
                    {formatAmount(amount, currency)}
                  </p>
                ))
              ) : (
                <p className="text-lg font-bold">{formatAmount(0, 'USD')}</p>
              )}
            </div>
          </div>

          {/* Net Balance Card - Shows per currency */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <p className="text-sm opacity-90">{t.netBalance}</p>
              <Wallet size={24} className="opacity-50" />
            </div>
            <div className="space-y-1">
              {Object.keys(totalsByCurrency.balance).length > 0 ? (
                Object.entries(totalsByCurrency.balance).map(([currency, amount]) => (
                  <p key={currency} className="text-lg font-bold">
                    {formatAmount(amount, currency)}
                  </p>
                ))
              ) : (
                <p className="text-lg font-bold">{formatAmount(0, 'USD')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Records Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.date}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.day}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.incomeEntries}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.spendEntries}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.incomeDetails}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.spendDetails}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.balanceDetails}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((record, index) => {
                  const recordTotals = getRecordTotalsByCurrency(record);
                  return (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{formatDate(record.date)}</td>
                      <td className="px-6 py-4 text-gray-600">{getDayName(record.date)}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {record.incomeEntries?.length || 0} {t.entries}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          {record.spendEntries?.length || 0} {t.entries}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {Object.entries(recordTotals.income).map(([currency, amount]) => (
                            <span key={currency} className="text-green-600 font-medium block text-sm">
                              {formatAmount(amount, currency)}
                            </span>
                          ))}
                          {Object.keys(recordTotals.income).length === 0 && (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {Object.entries(recordTotals.spend).map(([currency, amount]) => (
                            <span key={currency} className="text-red-600 font-medium block text-sm">
                              {formatAmount(amount, currency)}
                            </span>
                          ))}
                          {Object.keys(recordTotals.spend).length === 0 && (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {Object.entries(recordTotals.balance).map(([currency, amount]) => (
                            <span key={currency} className={`font-medium block text-sm ${
                              amount >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formatAmount(amount, currency)}
                            </span>
                          ))}
                          {Object.keys(recordTotals.balance).length === 0 && (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <button
                            onClick={() => handleViewDetails(record)}
                            className="p-1 hover:bg-blue-100 rounded transition-colors"
                            title={t.recordDetails}
                          >
                            <Eye size={16} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleEdit(record.id)}
                            className="p-1 hover:bg-green-100 rounded transition-colors"
                            title={t.editRecord}
                          >
                            <Edit size={16} className="text-green-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(record)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title={t.deleteRecord}
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                      {t.noRecordsFound}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div className="text-sm text-gray-500">
                {t.showing} {pagination.page * pagination.limit - pagination.limit + 1} {t.to} {Math.min(pagination.page * pagination.limit, pagination.total)} {t.of} {pagination.total} {t.entries}
              </div>
              <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>
                {[...Array(Math.min(pagination.totalPages, 5))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-gradient-to-r from-green-500 to-red-500 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                  disabled={currentPage === pagination.totalPages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* View Details Modal */}
      {showDetailsModal && selectedRecord && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetailsModal(false)}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-4xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-green-600 to-red-600 px-6 py-4 flex items-center justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <h3 className="text-lg font-semibold text-white flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Info className="w-5 h-5 mr-2" />
                  {t.recordDetails} - {formatDate(selectedRecord.date)}
                </h3>
                <button onClick={() => setShowDetailsModal(false)} className="text-white hover:text-gray-200">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {/* Date and Day Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <div className="flex items-center space-x-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <div className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <Calendar size={16} className="text-green-600" />
                        <span className="font-medium">{t.date}:</span>
                        <span>{formatDate(selectedRecord.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <Clock size={16} className="text-green-600" />
                        <span className="font-medium">{t.day}:</span>
                        <span>{getDayName(selectedRecord.date)}</span>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {t.id}: #{selectedRecord.id}
                    </span>
                  </div>
                </div>

                {/* Income Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    {t.incomeEntries}
                  </h4>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs text-gray-500 border-b border-green-200">
                          <th className="pb-2">{t.description}</th>
                          <th className="pb-2">{t.amount}</th>
                          <th className="pb-2">{t.currency}</th>
                          <th className="pb-2">{t.personName}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedRecord.incomeEntries?.map((entry, idx) => (
                          <tr key={idx} className="border-b border-green-100">
                            <td className="py-2 text-sm">{entry.description}</td>
                            <td className="py-2 text-sm font-medium text-green-600">
                              {formatAmount(entry.amount, entry.currency)}
                            </td>
                            <td className="py-2 text-sm">{entry.currency}</td>
                            <td className="py-2 text-sm">{entry.personName}</td>
                          </tr>
                        ))}
                        {selectedRecord.incomeEntries?.length === 0 && (
                          <tr>
                            <td colSpan="4" className="py-2 text-sm text-gray-500 text-center">
                              {t.noIncomeEntries}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Spend Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <DollarSign className="w-5 h-5 mr-2 text-red-600" />
                    {t.spendEntries}
                  </h4>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs text-gray-500 border-b border-red-200">
                          <th className="pb-2">{t.description}</th>
                          <th className="pb-2">{t.amount}</th>
                          <th className="pb-2">{t.currency}</th>
                          <th className="pb-2">{t.personName}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedRecord.spendEntries?.map((entry, idx) => (
                          <tr key={idx} className="border-b border-red-100">
                            <td className="py-2 text-sm">{entry.description}</td>
                            <td className="py-2 text-sm font-medium text-red-600">
                              {formatAmount(entry.amount, entry.currency)}
                            </td>
                            <td className="py-2 text-sm">{entry.currency}</td>
                            <td className="py-2 text-sm">{entry.personName}</td>
                          </tr>
                        ))}
                        {selectedRecord.spendEntries?.length === 0 && (
                          <tr>
                            <td colSpan="4" className="py-2 text-sm text-gray-500 text-center">
                              {t.noSpendEntries}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary by Currency */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">{t.summaryByCurrency}</h4>
                  {(() => {
                    const recordTotals = getRecordTotalsByCurrency(selectedRecord);
                    const allCurrencies = new Set([...Object.keys(recordTotals.income), ...Object.keys(recordTotals.spend)]);
                    
                    if (allCurrencies.size === 0) {
                      return <p className="text-gray-500 text-center">{t.noRecordsFound}</p>;
                    }
                    
                    return (
                      <div className="space-y-3">
                        {Array.from(allCurrencies).map(currency => {
                          const income = recordTotals.income[currency] || 0;
                          const spend = recordTotals.spend[currency] || 0;
                          const balance = income - spend;
                          return (
                            <div key={currency} className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <p className="text-xs text-gray-500">{t.totalIncome}</p>
                                <p className="text-sm font-bold text-green-600">
                                  {formatAmount(income, currency)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">{t.totalSpend}</p>
                                <p className="text-sm font-bold text-red-600">
                                  {formatAmount(spend, currency)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">{t.netBalance}</p>
                                <p className={`text-sm font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {formatAmount(balance, currency)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <Link to={`/daily-records/${selectedRecord.id}`}>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Edit size={16} />
                    <span>{t.editRecord}</span>
                  </button>
                </Link>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRecord && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle size={32} className="text-red-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{t.deleteRecord}</h3>
                <p className="text-gray-600 text-center mb-6">
                  {t.deleteConfirmation} <span className="font-semibold">{formatDate(selectedRecord.date)}</span>? {t.deleteWarning}
                </p>
                <div className="flex space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <button
                    onClick={confirmDelete}
                    disabled={deleteLoading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
                  >
                    {deleteLoading ? (
                      <>
                        <RefreshCw size={14} className="animate-spin mr-2" />
                        {t.deleting}
                      </>
                    ) : (
                      t.delete
                    )}
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRecords;