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
  BookOpen,
  DollarSign,
  Wallet,
  User,
  Info,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  Download,
  X,
  Menu,
  ArrowLeft
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  getAllLedgerEntriesAction, 
  deleteLedgerEntryAction,
  clearErrors,
  getLedgerStatsAction
} from "../../../actions/ledgerActions";
import { DELETE_LEDGER_ENTRY_RESET } from "../../../constants/constants";

const Ledger = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Get state from Redux
  const { entries, loading, error, summary, pagination } = useSelector((state) => state.allLedgerEntries);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.deleteLedgerEntry);

  // Language translations
  const translations = {
    en: {
      backToDashboard: "Back to Dashboard",
      ledgerTitle: "Ledger / Account Book",
      ledgerDesc: "Manage all your ledger entries and balances",
      newEntry: "New Entry",
      searchPlaceholder: "Search entries...",
      exportTitle: "Export to CSV",
      totalEntries: "Total Entries",
      totalAmount: "Total Amount",
      totalRemaining: "Total Remaining",
      netBalance: "Net Balance",
      noData: "No ledger entries found",
      showing: "Showing",
      to: "to",
      of: "of",
      entries: "entries",
      
      // Table Headers
      id: "#",
      date: "Date",
      description: "Description",
      name: "Name",
      amount: "Amount",
      remaining: "Remaining",
      remainingPerson: "Remaining Person",
      balance: "Balance",
      status: "Status",
      actions: "Actions",
      
      // Modal Titles
      ledgerEntryDetails: "Ledger Entry Details",
      deleteEntry: "Delete Entry",
      deleteConfirmation: "Are you sure you want to delete this ledger entry for {description}? This action cannot be undone.",
      delete: "Delete",
      cancel: "Cancel",
      editEntry: "Edit Entry",
      close: "Close",
      
      // Status
      completed: "completed",
      pending: "pending",
      active: "active",
      
      // Entry ID
      entryId: "Entry ID",
      
      // Success/Error Messages
      deleteSuccess: "Ledger entry deleted successfully!",
      exportSuccess: "Exported {count} entries successfully!",
      exportError: "Failed to export data",
      noDataToExport: "No data to export",
      loadingEntries: "Loading ledger entries...",
      deleting: "Deleting...",
      
      // Currency Symbols
      usd: "USD", eur: "EUR", gbp: "GBP", pkr: "PKR",
      aed: "AED", sar: "SAR", afn: "AFN", inr: "INR",
      cad: "CAD", aud: "AUD", jpy: "JPY", cny: "CNY",
      chf: "CHF", nzd: "NZD"
    },
    ur: {
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      ledgerTitle: "لیجر / کھاتے کی کتاب",
      ledgerDesc: "اپنے تمام لیجر اندراجات اور بیلنس کا نظم کریں",
      newEntry: "نیا اندراج",
      searchPlaceholder: "اندراجات تلاش کریں...",
      exportTitle: "CSV میں ایکسپورٹ کریں",
      totalEntries: "کل اندراجات",
      totalAmount: "کل رقم",
      totalRemaining: "کل باقی",
      netBalance: "خالص بیلنس",
      noData: "کوئی لیجر اندراج نہیں ملا",
      showing: "دکھا رہا ہے",
      to: "سے",
      of: "کل",
      entries: "اندراجات",
      
      id: "نمبر",
      date: "تاریخ",
      description: "تفصیل",
      name: "نام",
      amount: "رقم",
      remaining: "باقی",
      remainingPerson: "باقی شخص",
      balance: "بیلنس",
      status: "حالت",
      actions: "اعمال",
      
      ledgerEntryDetails: "لیجر اندراج کی تفصیلات",
      deleteEntry: "اندراج حذف کریں",
      deleteConfirmation: "کیا آپ واقعی {description} کے لیے یہ لیجر اندراج حذف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں لیا جا سکتا۔",
      delete: "حذف کریں",
      cancel: "منسوخ کریں",
      editEntry: "اندراج میں ترمیم کریں",
      close: "بند کریں",
      
      completed: "مکمل",
      pending: "زیر التواء",
      active: "فعال",
      
      entryId: "اندراج نمبر",
      
      deleteSuccess: "لیجر اندراج کامیابی سے حذف ہوگیا!",
      exportSuccess: "{count} اندراجات کامیابی سے ایکسپورٹ ہوگئے!",
      exportError: "ڈیٹا ایکسپورٹ کرنے میں ناکامی",
      noDataToExport: "ایکسپورٹ کرنے کے لیے کوئی ڈیٹا نہیں",
      loadingEntries: "لیجر اندراجات لوڈ ہو رہے ہیں...",
      deleting: "حذف ہو رہا ہے...",
      
      usd: "امریکی ڈالر", eur: "یورو", gbp: "برطانوی پاؤنڈ", pkr: "پاکستانی روپیہ",
      aed: "متحدہ عرب امارات درہم", sar: "سعودی ریال", afn: "افغان افغانی", inr: "بھارتی روپیہ",
      cad: "کینیڈین ڈالر", aud: "آسٹریلین ڈالر", jpy: "جاپانی ین", cny: "چینی یوآن",
      chf: "سوئس فرانک", nzd: "نیوزی لینڈ ڈالر"
    },
    ps: {
      backToDashboard: "ډشبورډ ته راګرځئ",
      ledgerTitle: "لیجر / د حساب کتاب",
      ledgerDesc: "خپل ټول لیجر داخلې او توازن اداره کړئ",
      newEntry: "نوی داخل",
      searchPlaceholder: "داخلې وپلټئ...",
      exportTitle: "CSV ته صادر کړئ",
      totalEntries: "ټول داخلې",
      totalAmount: "ټوله اندازه",
      totalRemaining: "ټول پاتې",
      netBalance: "خالص توازن",
      noData: "د لیجر کومه داخله ونه موندل شوه",
      showing: "ښکاره کوي",
      to: "ته",
      of: "د",
      entries: "داخلې",
      
      id: "شمېره",
      date: "نیټه",
      description: "تشریح",
      name: "نوم",
      amount: "اندازه",
      remaining: "پاتې",
      remainingPerson: "پاتې کس",
      balance: "توازن",
      status: "حالت",
      actions: "کړنې",
      
      ledgerEntryDetails: "د لیجر داخلې جزیات",
      deleteEntry: "داخله حذف کړئ",
      deleteConfirmation: "ایا تاسو واقعیا غواړئ د {description} لپاره دا لیجر داخله حذف کړئ؟ دا عمل بیرته نشي اخیستل کیدی.",
      delete: "حذف کړئ",
      cancel: "لغوه کړئ",
      editEntry: "داخله ترمیم کړئ",
      close: "بند کړئ",
      
      completed: "بشپړ شوی",
      pending: "ځنډول شوی",
      active: "فعال",
      
      entryId: "د داخلې شمېره",
      
      deleteSuccess: "د لیجر داخله بریالیتوب سره حذف شوه!",
      exportSuccess: "{count} داخلې بریالیتوب سره صادرې شوې!",
      exportError: "د معلوماتو صادرول ناکام شول",
      noDataToExport: "د صادرولو لپاره معلومات نشته",
      loadingEntries: "د لیجر داخلې لوډ کیږي...",
      deleting: "حذف کیږي...",
      
      usd: "امریکایی ډالر", eur: "یورو", gbp: "برتانوي پونډ", pkr: "پاکستاني روپۍ",
      aed: "متحده عربي امارات درهم", sar: "سعودي ریال", afn: "افغان افغاني", inr: "هندي روپۍ",
      cad: "کینیډایی ډالر", aud: "آسټرالیايي ډالر", jpy: "جاپاني ين", cny: "چیني یوان",
      chf: "سویس فرانک", nzd: "نیوزیلینډ ډالر"
    },
    fa: {
      backToDashboard: "بازگشت به داشبورد",
      ledgerTitle: "لجر / دفتر کل",
      ledgerDesc: "تمام ورودی‌ها و موجودی‌های لجر خود را مدیریت کنید",
      newEntry: "ورودی جدید",
      searchPlaceholder: "جستجوی ورودی‌ها...",
      exportTitle: "خروجی به CSV",
      totalEntries: "کل ورودی‌ها",
      totalAmount: "کل مبلغ",
      totalRemaining: "کل باقی‌مانده",
      netBalance: "موجودی خالص",
      noData: "هیچ ورودی لجری یافت نشد",
      showing: "نمایش",
      to: "تا",
      of: "از",
      entries: "ورودی‌ها",
      
      id: "شماره",
      date: "تاریخ",
      description: "توضیحات",
      name: "نام",
      amount: "مبلغ",
      remaining: "باقی‌مانده",
      remainingPerson: "شخص باقی‌مانده",
      balance: "موجودی",
      status: "وضعیت",
      actions: "عملیات",
      
      ledgerEntryDetails: "جزئیات ورودی لجر",
      deleteEntry: "حذف ورودی",
      deleteConfirmation: "آیا مطمئن هستید که می‌خواهید این ورودی لجر را برای {description} حذف کنید؟ این عمل قابل بازگشت نیست.",
      delete: "حذف",
      cancel: "لغو",
      editEntry: "ویرایش ورودی",
      close: "بستن",
      
      completed: "تکمیل شده",
      pending: "در انتظار",
      active: "فعال",
      
      entryId: "شماره ورودی",
      
      deleteSuccess: "ورودی لجر با موفقیت حذف شد!",
      exportSuccess: "{count} ورودی با موفقیت خروجی گرفته شد!",
      exportError: "خروجی گرفتن داده ناموفق بود",
      noDataToExport: "داده‌ای برای خروجی وجود ندارد",
      loadingEntries: "در حال بارگذاری ورودی‌های لجر...",
      deleting: "در حال حذف...",
      
      usd: "دلار آمریکا", eur: "یورو", gbp: "پوند بریتانیا", pkr: "روپیه پاکستان",
      aed: "درهم امارات", sar: "ریال سعودی", afn: "افغانی افغانستان", inr: "روپیه هند",
      cad: "دلار کانادا", aud: "دلار استرالیا", jpy: "ین ژاپن", cny: "یوان چین",
      chf: "فرانک سوئیس", nzd: "دلار نیوزیلند"
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

  // Fetch ledger entries on mount
  useEffect(() => {
    dispatch(getAllLedgerEntriesAction(currentPage, itemsPerPage, searchTerm));
    dispatch(getLedgerStatsAction());
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);

  // Handle delete success
  useEffect(() => {
    if (deleteSuccess) {
      toast.success(t.deleteSuccess);
      dispatch({ type: DELETE_LEDGER_ENTRY_RESET });
      dispatch(getAllLedgerEntriesAction(currentPage, itemsPerPage, searchTerm));
      dispatch(getLedgerStatsAction());
      setShowDeleteModal(false);
      setSelectedEntry(null);
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
    return new Date(date).toLocaleDateString(currentLang === 'ur' ? 'ur-PK' : currentLang === 'ps' ? 'ps-AF' : currentLang === 'fa' ? 'fa-IR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get currency symbol
  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: '$', EUR: '€', GBP: '£', PKR: '₨', AED: 'د.إ', SAR: 'ر.س', AFN: '؋',
      INR: '₹', CAD: 'C$', AUD: 'A$', JPY: '¥', CNY: '¥', CHF: 'Fr', NZD: 'NZ$'
    };
    return symbols[currency] || currency || '$';
  };

  // Get currency name
  const getCurrencyName = (currency) => {
    const names = {
      USD: t.usd, EUR: t.eur, GBP: t.gbp, PKR: t.pkr,
      AED: t.aed, SAR: t.sar, AFN: t.afn, INR: t.inr,
      CAD: t.cad, AUD: t.aud, JPY: t.jpy, CNY: t.cny,
      CHF: t.chf, NZD: t.nzd
    };
    return names[currency] || currency;
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

  // Calculate totals by currency from entries
  const getTotalsByCurrency = () => {
    const totals = {
      amount: {},
      remaining: {},
      balance: {}
    };
    
    (entries || []).forEach(entry => {
      if (entry.amount && entry.currency) {
        if (!totals.amount[entry.currency]) totals.amount[entry.currency] = 0;
        totals.amount[entry.currency] += entry.amount;
      }
      if (entry.remainingAmount && entry.remainingCurrency) {
        if (!totals.remaining[entry.remainingCurrency]) totals.remaining[entry.remainingCurrency] = 0;
        totals.remaining[entry.remainingCurrency] += entry.remainingAmount;
      }
      if (entry.balance && entry.currency) {
        if (!totals.balance[entry.currency]) totals.balance[entry.currency] = 0;
        totals.balance[entry.currency] += entry.balance;
      }
    });
    
    return totals;
  };
  
  const totalsByCurrency = getTotalsByCurrency();

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return t.completed;
      case 'pending': return t.pending;
      case 'active': return t.active;
      default: return status;
    }
  };

  // Handle delete
  const handleDeleteClick = (entry) => {
    setSelectedEntry(entry);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedEntry) {
      setIsDeleting(true);
      dispatch(deleteLedgerEntryAction(selectedEntry.id));
    }
  };

  // Handle view details
  const handleViewDetails = (entry) => {
    setSelectedEntry(entry);
    setShowDetailsModal(true);
  };

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/ledger/${id}`);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Handle export - frontend only download
  const handleExport = () => {
    try {
      const dataToExport = entries || [];
      
      if (!dataToExport || dataToExport.length === 0) {
        toast.error(t.noDataToExport);
        return;
      }
      
      const headers = [
        'ID', 'Date', 'Description', 'Name', 'Amount', 'Currency', 
        'Remaining Amount', 'Remaining Currency', 'Remaining Person', 'Balance', 'Status'
      ];
      
      const csvRows = [headers.join(',')];
      
      dataToExport.forEach(entry => {
        const row = [
          entry.id,
          entry.date ? formatDate(entry.date) : 'N/A',
          `"${(entry.description || '').replace(/"/g, '""')}"`,
          `"${(entry.name || '').replace(/"/g, '""')}"`,
          `${getCurrencySymbol(entry.currency)} ${entry.amount}`,
          entry.currency,
          `${getCurrencySymbol(entry.remainingCurrency)} ${entry.remainingAmount}`,
          entry.remainingCurrency,
          `"${(entry.remainingPersonName || '').replace(/"/g, '""')}"`,
          `${getCurrencySymbol(entry.currency)} ${entry.balance}`,
          entry.status
        ];
        csvRows.push(row.join(','));
      });
      
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `ledger_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(t.exportSuccess.replace('{count}', dataToExport.length));
    } catch (err) {
      console.error('Export error:', err);
      toast.error(t.exportError);
    }
  };

  // Get current items for pagination
  const currentItems = entries || [];
  const totalEntries = summary?.totalEntries || 0;

  if (loading && !entries || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loadingEntries}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className={`p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/dashboard">
              <button className={`flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
                <span>{t.backToDashboard}</span>
              </button>
            </Link>
            <div className="h-8 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {t.ledgerTitle}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{t.ledgerDesc}</p>
            </div>
          </div>

          <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {/* Search */}
            <div className="relative">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 w-64`}
              />
            </div>

            {/* Create New Button */}
            <Link to="/ledger-create">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 shadow-lg">
                <Plus size={18} />
                <span>{t.newEntry}</span>
              </button>
            </Link>

            {/* Export Button */}
            <button 
              onClick={handleExport} 
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              title={t.exportTitle}
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
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-sm opacity-90">{t.totalEntries}</p>
                <p className="text-2xl font-bold mt-1">{totalEntries}</p>
              </div>
              <BookOpen size={24} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <p className="text-sm opacity-90">{t.totalAmount}</p>
              <DollarSign size={24} className="opacity-50" />
            </div>
            <div className="space-y-1">
              {Object.keys(totalsByCurrency.amount).length > 0 ? (
                Object.entries(totalsByCurrency.amount).map(([currency, amount]) => (
                  <p key={currency} className="text-lg font-bold">
                    {formatAmount(amount, currency)}
                  </p>
                ))
              ) : (
                <p className="text-lg font-bold">{formatAmount(0, 'USD')}</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <p className="text-sm opacity-90">{t.totalRemaining}</p>
              <Wallet size={24} className="opacity-50" />
            </div>
            <div className="space-y-1">
              {Object.keys(totalsByCurrency.remaining).length > 0 ? (
                Object.entries(totalsByCurrency.remaining).map(([currency, amount]) => (
                  <p key={currency} className="text-lg font-bold">
                    {formatAmount(amount, currency)}
                  </p>
                ))
              ) : (
                <p className="text-lg font-bold">{formatAmount(0, 'USD')}</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
            <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <p className="text-sm opacity-90">{t.netBalance}</p>
              <DollarSign size={24} className="opacity-50" />
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

        {/* Ledger Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className={isRTL ? 'text-right' : 'text-left'}>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">{t.id}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">{t.date}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">{t.description}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">{t.name}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">{t.amount}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">{t.remaining}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">{t.remainingPerson}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">{t.balance}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">{t.status}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((entry, index) => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{formatDate(entry.date)}</td>
                    <td className="px-6 py-4 text-gray-700">{entry.description}</td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <User size={14} className="text-gray-400" />
                        <span className="text-gray-900">{entry.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-green-600">
                        {formatAmount(entry.amount, entry.currency)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-blue-600">
                        {formatAmount(entry.remainingAmount, entry.remainingCurrency)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <User size={14} className="text-gray-400" />
                        <span className="text-gray-900">{entry.remainingPersonName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${entry.balance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatAmount(entry.balance, entry.currency)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(entry.status)}`}>
                        {getStatusText(entry.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <button
                          onClick={() => handleViewDetails(entry)}
                          className="p-1 hover:bg-blue-100 rounded transition-colors"
                          title={t.ledgerEntryDetails}
                        >
                          <Eye size={16} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleEdit(entry.id)}
                          className="p-1 hover:bg-green-100 rounded transition-colors"
                          title={t.editEntry}
                        >
                          <Edit size={16} className="text-green-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(entry)}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
                          title={t.deleteEntry}
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan="10" className="px-6 py-12 text-center text-gray-500">
                      {t.noData}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className={`flex items-center justify-between px-6 py-4 border-t border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="text-sm text-gray-500">
                {t.showing} {pagination.page * pagination.limit - pagination.limit + 1} {t.to} {Math.min(pagination.page * pagination.limit, pagination.total)} {t.of} {pagination.total} {t.entries}
              </div>
              <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
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
                  {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* View Details Modal */}
      {showDetailsModal && selectedEntry && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetailsModal(false)}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-green-600 to-red-600 px-6 py-4 flex items-center justify-between">
                <h3 className={`text-lg font-semibold text-white flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Info className="w-5 h-5 mr-2" />
                  {t.ledgerEntryDetails}
                </h3>
                <button onClick={() => setShowDetailsModal(false)} className="text-white hover:text-gray-200">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-500">{t.entryId}</span>
                      <span className="font-medium text-gray-900">#{selectedEntry.id}</span>
                    </div>
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-500">{t.date}</span>
                      <span className="font-medium text-gray-900">{formatDate(selectedEntry.date)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <p className="text-xs text-blue-600 mb-1">{t.description}</p>
                      <p className="font-medium text-gray-900">{selectedEntry.description}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <p className="text-xs text-blue-600 mb-1">{t.name}</p>
                      <p className="font-medium text-gray-900">{selectedEntry.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <p className="text-xs text-green-600 mb-1">{t.amount}</p>
                      <p className="text-xl font-bold text-green-700">
                        {formatAmount(selectedEntry.amount, selectedEntry.currency)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{t.currencyLabel || 'Currency'}: {selectedEntry.currency} ({getCurrencyName(selectedEntry.currency)})</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <p className="text-xs text-purple-600 mb-1">{t.balance}</p>
                      <p className={`text-xl font-bold ${selectedEntry.balance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatAmount(selectedEntry.balance, selectedEntry.currency)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <p className="text-xs text-blue-600 mb-1">{t.remaining}</p>
                      <p className="text-lg font-bold text-blue-700">
                        {formatAmount(selectedEntry.remainingAmount, selectedEntry.remainingCurrency)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{t.currencyLabel || 'Currency'}: {selectedEntry.remainingCurrency} ({getCurrencyName(selectedEntry.remainingCurrency)})</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <p className="text-xs text-blue-600 mb-1">{t.remainingPerson}</p>
                      <p className="font-medium text-gray-900">{selectedEntry.remainingPersonName}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-500">{t.status}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedEntry.status)}`}>
                        {getStatusText(selectedEntry.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className={`bg-gray-50 px-6 py-4 flex space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : 'justify-end'}`}>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEdit(selectedEntry.id);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Edit size={16} />
                  <span>{t.editEntry}</span>
                </button>
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
      {showDeleteModal && selectedEntry && (
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
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{t.deleteEntry}</h3>
                <p className="text-gray-600 text-center mb-6">
                  {t.deleteConfirmation.replace('{description}', selectedEntry.description)}
                </p>
                <div className={`flex space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
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

export default Ledger;