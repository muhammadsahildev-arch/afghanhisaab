import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  DollarSign,
  Wallet,
  User,
  Info,
  AlertCircle,
  RefreshCw,
  Download,
  X,
  ArrowLeft,
  Calendar as CalendarIcon
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
      backToDashboard: "Back",
      ledgerTitle: "Khata",
      ledgerDesc: "Manage your ledger entries",
      newEntry: "Add",
      searchPlaceholder: "Search...",
      exportTitle: "Export",
      totalEntries: "Total",
      totalAmount: "Total Amount",
      totalRemaining: "Remaining",
      netBalance: "Balance",
      noData: "No entries found",
      date: "Date",
      description: "Description",
      name: "Name",
      amount: "Amount",
      remaining: "Remaining",
      balance: "Balance",
      status: "Status",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      ledgerEntryDetails: "Entry Details",
      deleteEntry: "Delete Entry",
      deleteConfirmation: "Delete this entry?",
      deleteWarning: "This cannot be undone",
      cancel: "Cancel",
      close: "Close",
      completed: "Completed",
      pending: "Pending",
      active: "Active",
      entryId: "ID",
      deleteSuccess: "Deleted successfully!",
      exportSuccess: "Exported!",
      exportError: "Export failed",
      noDataToExport: "No data",
      loadingEntries: "Loading...",
      deleting: "Deleting...",
      due: "Due",
      previous: "Prev",
      next: "Next"
    },
    ur: {
      backToDashboard: "واپس",
      ledgerTitle: "کھاتہ",
      ledgerDesc: "اپنے کھاتے کے اندراجات کا نظم کریں",
      newEntry: "شامل",
      searchPlaceholder: "تلاش...",
      exportTitle: "برآمد",
      totalEntries: "کل",
      totalAmount: "کل رقم",
      totalRemaining: "باقی",
      netBalance: "بیلنس",
      noData: "کوئی اندراج نہیں ملا",
      date: "تاریخ",
      description: "تفصیل",
      name: "نام",
      amount: "رقم",
      remaining: "باقی",
      balance: "بیلنس",
      status: "حالت",
      view: "دیکھیں",
      edit: "ترمیم",
      delete: "حذف",
      ledgerEntryDetails: "اندراج کی تفصیلات",
      deleteEntry: "اندراج حذف کریں",
      deleteConfirmation: "کیا آپ یہ اندراج حذف کرنا چاہتے ہیں؟",
      deleteWarning: "یہ عمل واپس نہیں کیا جا سکتا",
      cancel: "منسوخ",
      close: "بند",
      completed: "مکمل",
      pending: "زیر التواء",
      active: "فعال",
      entryId: "شناختی نمبر",
      deleteSuccess: "کامیابی سے حذف ہوگیا!",
      exportSuccess: "برآمد ہوگیا!",
      exportError: "برآمد کرنے میں ناکامی",
      noDataToExport: "کوئی ڈیٹا نہیں",
      loadingEntries: "لوڈ ہو رہا ہے...",
      deleting: "حذف ہو رہا ہے...",
      due: "بقایا",
      previous: "پچھلا",
      next: "اگلا"
    },
    ps: {
      backToDashboard: "بیرته",
      ledgerTitle: "کھاتہ",
      ledgerDesc: "د خپل کھاتہ داخلې اداره کړئ",
      newEntry: "اضافه",
      searchPlaceholder: "لټون...",
      exportTitle: "صادرول",
      totalEntries: "ټول",
      totalAmount: "ټوله اندازه",
      totalRemaining: "پاتې",
      netBalance: "بیلانس",
      noData: "کومه داخله ونه موندل شوه",
      date: "نیټه",
      description: "تشریح",
      name: "نوم",
      amount: "اندازه",
      remaining: "پاتې",
      balance: "بیلانس",
      status: "حالت",
      view: "کتل",
      edit: "سمول",
      delete: "حذف",
      ledgerEntryDetails: "د داخلې جزیات",
      deleteEntry: "داخله حذف کړئ",
      deleteConfirmation: "ایا تاسو دا داخله حذف کول غواړئ؟",
      deleteWarning: "دا عمل بیرته نشي اخیستل کیدی",
      cancel: "لغوه",
      close: "تړل",
      completed: "بشپړ شوی",
      pending: "ځنډول شوی",
      active: "فعال",
      entryId: "شمېره",
      deleteSuccess: "بریالیتوب سره حذف شوه!",
      exportSuccess: "بریالیتوب سره صادر شو!",
      exportError: "صادرول ناکام شو",
      noDataToExport: "معلومات نشته",
      loadingEntries: "لوډ کیږي...",
      deleting: "حذف کیږي...",
      due: "پاتې",
      previous: "تېر",
      next: "بل"
    },
    fa: {
      backToDashboard: "بازگشت",
      ledgerTitle: "کھاتا",
      ledgerDesc: "مدیریت ورودی‌های کھاتا",
      newEntry: "افزودن",
      searchPlaceholder: "جستجو...",
      exportTitle: "خروجی",
      totalEntries: "کل",
      totalAmount: "مبلغ کل",
      totalRemaining: "باقی‌مانده",
      netBalance: "موجودی",
      noData: "هیچ ورودی یافت نشد",
      date: "تاریخ",
      description: "توضیحات",
      name: "نام",
      amount: "مبلغ",
      remaining: "باقی‌مانده",
      balance: "موجودی",
      status: "وضعیت",
      view: "مشاهده",
      edit: "ویرایش",
      delete: "حذف",
      ledgerEntryDetails: "جزئیات ورودی",
      deleteEntry: "حذف ورودی",
      deleteConfirmation: "آیا می‌خواهید این ورودی را حذف کنید؟",
      deleteWarning: "این عمل قابل بازگشت نیست",
      cancel: "لغو",
      close: "بستن",
      completed: "تکمیل شده",
      pending: "در انتظار",
      active: "فعال",
      entryId: "شناسه",
      deleteSuccess: "با موفقیت حذف شد!",
      exportSuccess: "با موفقیت خروجی گرفته شد!",
      exportError: "خطا در خروجی گرفتن",
      noDataToExport: "داده‌ای وجود ندارد",
      loadingEntries: "در حال بارگذاری...",
      deleting: "در حال حذف...",
      due: "باقی‌مانده",
      previous: "قبلی",
      next: "بعدی"
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
    return new Date(date).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ur-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get currency symbol
  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: '$', EUR: '€', GBP: '£', PKR: '₨', AED: 'د.إ', SAR: 'ر.س', AFN: '؋',
      INR: '₹', CAD: 'C$', AUD: 'A$', JPY: '¥', CNY: '¥'
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

  // Calculate totals by currency from entries
  const getTotalsByCurrency = () => {
    const totals = { amount: {}, remaining: {}, balance: {} };
    
    (entries || []).forEach(entry => {
      if (entry.amount && entry.currency) {
        if (!totals.amount[entry.currency]) totals.amount[entry.currency] = 0;
        totals.amount[entry.currency] += entry.amount;
      }
      if (entry.remainingAmount && entry.currency) {
        if (!totals.remaining[entry.currency]) totals.remaining[entry.currency] = 0;
        totals.remaining[entry.currency] += entry.remainingAmount;
      }
    });
    
    const allCurrencies = new Set([...Object.keys(totals.amount), ...Object.keys(totals.remaining)]);
    allCurrencies.forEach(currency => {
      const amount = totals.amount[currency] || 0;
      const remaining = totals.remaining[currency] || 0;
      totals.balance[currency] = amount - remaining;
    });
    
    return totals;
  };
  
  const totalsByCurrency = getTotalsByCurrency();

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'active': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
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

  // Handle export
  const handleExport = () => {
    try {
      const dataToExport = entries || [];
      if (!dataToExport || dataToExport.length === 0) {
        toast.error(t.noDataToExport);
        return;
      }
      
      const headers = ['ID', 'Date', 'Name', 'Description', 'Amount', 'Currency', 'Remaining', 'Balance', 'Status'];
      const csvRows = [headers.join(',')];
      
      dataToExport.forEach(entry => {
        const row = [
          entry.id,
          formatDate(entry.date),
          `"${(entry.name || '').replace(/"/g, '""')}"`,
          `"${(entry.description || '').replace(/"/g, '""')}"`,
          entry.amount,
          entry.currency,
          entry.remainingAmount,
          entry.balance,
          entry.status
        ];
        csvRows.push(row.join(','));
      });
      
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `ledger_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(t.exportSuccess);
    } catch (err) {
      toast.error(t.exportError);
    }
  };

  // Sort entries - newest first
  const sortedEntries = [...(entries || [])].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const totalEntries = summary?.totalEntries || 0;

  if (loading && !entries || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loadingEntries}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/dashboard" className="p-2 -ml-2 active:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold text-gray-800">{t.ledgerTitle}</h1>
            <p className="text-xs text-gray-500">{t.ledgerDesc}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExport} className="p-2 bg-gray-100 rounded-full active:bg-gray-200">
              <Download size={18} className="text-gray-600" />
            </button>
            <Link to="/ledger-create">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1 shadow-lg">
                <Plus size={16} />
                <span>{t.newEntry}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Stats Cards - Grid Layout */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
            <p className="text-xs opacity-90">{t.totalEntries}</p>
            <p className="text-2xl font-bold mt-1">{totalEntries}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
            <p className="text-xs opacity-90">{t.totalAmount}</p>
            {Object.keys(totalsByCurrency.amount).length > 0 ? (
              Object.entries(totalsByCurrency.amount).map(([currency, amount]) => (
                <p key={currency} className="text-sm font-bold mt-1">
                  {formatAmount(amount, currency)}
                </p>
              ))
            ) : (
              <p className="text-sm font-bold mt-1">{formatAmount(0, 'USD')}</p>
            )}
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
            <p className="text-xs opacity-90">{t.totalRemaining}</p>
            {Object.keys(totalsByCurrency.remaining).length > 0 ? (
              Object.entries(totalsByCurrency.remaining).map(([currency, amount]) => (
                <p key={currency} className="text-sm font-bold mt-1">
                  {formatAmount(amount, currency)}
                </p>
              ))
            ) : (
              <p className="text-sm font-bold mt-1">{formatAmount(0, 'USD')}</p>
            )}
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 text-white">
            <p className="text-xs opacity-90">{t.netBalance}</p>
            {Object.keys(totalsByCurrency.balance).length > 0 ? (
              Object.entries(totalsByCurrency.balance).map(([currency, amount]) => (
                <p key={currency} className="text-sm font-bold mt-1">
                  {formatAmount(amount, currency)}
                </p>
              ))
            ) : (
              <p className="text-sm font-bold mt-1">{formatAmount(0, 'USD')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Entries List - Card View with Visible Buttons */}
      <div className="px-4 pb-24">
        <div className="space-y-3">
          {sortedEntries.map((entry) => {
            const isCompleted = entry.status === 'completed';
            const balance = entry.balance || (entry.amount - entry.remainingAmount);
            const isPositive = balance >= 0;
            const remainingAmount = entry.remainingAmount !== null && entry.remainingAmount !== undefined ? entry.remainingAmount : entry.amount;
            
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Card Content */}
                <div className="p-4">
                  {/* Header with Name and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`} />
                      <p className="font-semibold text-gray-800 text-base">{entry.name}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                      {getStatusText(entry.status)}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    <CalendarIcon size={12} />
                    <span>{formatDate(entry.date)}</span>
                  </div>

                  {/* Description (if exists) */}
                  {entry.description && (
                    <p className="text-sm text-gray-600 mb-3">{entry.description}</p>
                  )}

                  {/* Amount and Remaining */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-green-50 rounded-xl p-3">
                      <p className="text-xs text-green-600 mb-1">{t.amount}</p>
                      <p className="text-base font-bold text-green-600">
                        {formatAmount(entry.amount, entry.currency)}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-3">
                      <p className="text-xs text-purple-600 mb-1">{t.remaining}</p>
                      <p className="text-base font-bold text-purple-600">
                        {formatAmount(remainingAmount, entry.currency)}
                      </p>
                    </div>
                  </div>

                  {/* Balance */}
                  <div className={`p-3 rounded-xl mb-4 ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">{t.balance}:</span>
                      <span className={`text-base font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {formatAmount(Math.abs(balance), entry.currency)}
                        {!isPositive && ` (${t.due})`}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(entry)}
                      className="flex-1 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 active:bg-blue-600 transition-colors"
                    >
                      <Eye size={16} />
                      <span>{t.view}</span>
                    </button>
                    <button
                      onClick={() => handleEdit(entry.id)}
                      className="flex-1 py-2.5 bg-green-500 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 active:bg-green-600 transition-colors"
                    >
                      <Edit size={16} />
                      <span>{t.edit}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(entry)}
                      className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 active:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span>{t.delete}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {(!entries || entries.length === 0) && (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">{t.noData}</p>
              <Link to="/ledger-create">
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium">
                  {t.newEntry}
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-50 active:bg-gray-50"
            >
              {isRTL ? '→' : '←'} {t.previous}
            </button>
            <span className="text-sm text-gray-500">
              {currentPage} / {pagination.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
              disabled={currentPage === pagination.totalPages}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-50 active:bg-gray-50"
            >
              {t.next} {isRTL ? '←' : '→'}
            </button>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {showDetailsModal && selectedEntry && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetailsModal(false)}></div>
          
          <div className="flex min-h-full items-end sm:items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-3xl bg-white w-full max-w-md shadow-2xl animate-slideUp">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Info size={18} />
                  {t.ledgerEntryDetails}
                </h3>
              </div>

              {/* Modal Body */}
              <div className="p-5 max-h-[70vh] overflow-y-auto">
                <div className="space-y-3">
                  {/* ID */}
                  <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center">
                    <span className="text-sm text-gray-500">{t.entryId}</span>
                    <span className="text-sm font-mono font-medium">#{selectedEntry.id}</span>
                  </div>
                  
                  {/* Date */}
                  <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center">
                    <span className="text-sm text-gray-500">{t.date}</span>
                    <span className="text-sm font-medium">{formatDate(selectedEntry.date)}</span>
                  </div>

                  {/* Name */}
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <p className="text-xs text-blue-600 mb-1">{t.name}</p>
                    <p className="font-medium text-gray-900">{selectedEntry.name}</p>
                  </div>

                  {/* Description */}
                  {selectedEntry.description && (
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <p className="text-xs text-blue-600 mb-1">{t.description}</p>
                      <p className="text-sm text-gray-700">{selectedEntry.description}</p>
                    </div>
                  )}

                  {/* Amount */}
                  <div className="bg-green-50 p-3 rounded-xl">
                    <p className="text-xs text-green-600 mb-1">{t.amount}</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatAmount(selectedEntry.amount, selectedEntry.currency)}
                    </p>
                  </div>

                  {/* Remaining */}
                  <div className="bg-purple-50 p-3 rounded-xl">
                    <p className="text-xs text-purple-600 mb-1">{t.remaining}</p>
                    <p className="text-lg font-bold text-purple-600">
                      {formatAmount(selectedEntry.remainingAmount, selectedEntry.currency)}
                    </p>
                  </div>

                  {/* Balance */}
                  <div className={`p-3 rounded-xl ${selectedEntry.balance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">{t.balance}:</span>
                      <span className={`text-lg font-bold ${selectedEntry.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatAmount(Math.abs(selectedEntry.balance), selectedEntry.currency)}
                        {selectedEntry.balance < 0 && ` (${t.due})`}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center">
                    <span className="text-sm text-gray-500">{t.status}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEntry.status)}`}>
                      {getStatusText(selectedEntry.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-5 py-4 flex gap-3">
                <button
                  onClick={() => handleEdit(selectedEntry.id)}
                  className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-xl font-medium"
                >
                  {t.edit}
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-medium"
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
            <div className="relative transform overflow-hidden rounded-2xl bg-white w-full max-w-sm shadow-2xl">
              <div className="p-5 text-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle size={28} className="text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t.deleteEntry}</h3>
                <p className="text-gray-600 text-sm mb-2">{t.deleteConfirmation}</p>
                <p className="text-gray-500 text-xs mb-4">{t.deleteWarning}</p>
                <div className="flex gap-3">
                  <button
                    onClick={confirmDelete}
                    disabled={deleteLoading}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium disabled:opacity-50"
                  >
                    {deleteLoading ? t.deleting : t.delete}
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl font-medium"
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Ledger;