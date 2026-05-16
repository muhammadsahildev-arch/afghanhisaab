import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Download,
  Wallet,
  X,
  Calendar,
  DollarSign,
  User,
  FileText,
  Info,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  ArrowLeft,
  TrendingUp,
  TrendingDown
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
      backToDashboard: "Back",
      dailyRecords: "Daily Records",
      subtitle: "Manage your daily transactions",
      searchPlaceholder: "Search records...",
      newRecord: "New Record",
      exportToCSV: "Export",
      totalRecords: "Total",
      totalIncome: "Income",
      totalSpend: "Spend",
      netBalance: "Balance",
      noRecordsFound: "No records found",
      recordDetails: "Record Details",
      date: "Date",
      day: "Day",
      incomeEntries: "Income",
      spendEntries: "Spend",
      description: "Description",
      amount: "Amount",
      currency: "Currency",
      personName: "Person",
      noIncomeEntries: "No income entries",
      noSpendEntries: "No spend entries",
      summaryByCurrency: "Summary by Currency",
      deleteRecord: "Delete",
      deleteConfirmation: "Delete record from",
      deleteWarning: "This cannot be undone",
      delete: "Delete",
      cancel: "Cancel",
      deleting: "Deleting...",
      editRecord: "Edit",
      viewDetails: "View",
      close: "Close",
      loading: "Loading...",
      recordDeletedSuccess: "Record deleted!",
      exportSuccess: "Exported",
      recordsSuccessfully: "records successfully!",
      noDataToExport: "No data to export",
      exportFailed: "Export failed",
      id: "ID",
      actions: "Actions"
    },
    ur: {
      backToDashboard: "واپس",
      dailyRecords: "روزانہ ریکارڈز",
      subtitle: "اپنے روزانہ کے لین دین کا نظم کریں",
      searchPlaceholder: "ریکارڈز تلاش کریں...",
      newRecord: "نیا ریکارڈ",
      exportToCSV: "برآمد",
      totalRecords: "کل",
      totalIncome: "آمدنی",
      totalSpend: "اخراجات",
      netBalance: "بیلنس",
      noRecordsFound: "کوئی ریکارڈز نہیں ملے",
      recordDetails: "ریکارڈ کی تفصیلات",
      date: "تاریخ",
      day: "دن",
      incomeEntries: "آمدنی",
      spendEntries: "اخراجات",
      description: "تفصیل",
      amount: "رقم",
      currency: "کرنسی",
      personName: "شخص",
      noIncomeEntries: "کوئی آمدنی نہیں",
      noSpendEntries: "کوئی اخراجات نہیں",
      summaryByCurrency: "کرنسی کے لحاظ سے خلاصہ",
      deleteRecord: "حذف",
      deleteConfirmation: "ریکارڈ حذف کریں",
      deleteWarning: "یہ عمل واپس نہیں کیا جا سکتا",
      delete: "حذف",
      cancel: "منسوخ",
      deleting: "حذف ہو رہا ہے...",
      editRecord: "ترمیم",
      viewDetails: "دیکھیں",
      close: "بند",
      loading: "لوڈ ہو رہا ہے...",
      recordDeletedSuccess: "ریکارڈ حذف ہو گیا!",
      exportSuccess: "برآمد ہو گیا",
      recordsSuccessfully: "ریکارڈز کامیابی سے!",
      noDataToExport: "برآمد کرنے کے لیے کوئی ڈیٹا نہیں",
      exportFailed: "برآمد نہیں ہو سکا",
      id: "شناختی نمبر",
      actions: "اعمال"
    },
    ps: {
      backToDashboard: "بیرته",
      dailyRecords: "ورځني ریکارډونه",
      subtitle: "خپل ورځني معاملات اداره کړئ",
      searchPlaceholder: "ریکارډونه ولټوئ...",
      newRecord: "نوی ریکارډ",
      exportToCSV: "صادرول",
      totalRecords: "ټول",
      totalIncome: "عاید",
      totalSpend: "لګښت",
      netBalance: "بیلانس",
      noRecordsFound: "هیڅ ریکارډونه ونه موندل شول",
      recordDetails: "د ریکارډ توضیحات",
      date: "نیټه",
      day: "ورځ",
      incomeEntries: "عاید",
      spendEntries: "لګښت",
      description: "تشریح",
      amount: "اندازه",
      currency: "اسعار",
      personName: "شخص",
      noIncomeEntries: "هیڅ عاید نشته",
      noSpendEntries: "هیڅ لګښت نشته",
      summaryByCurrency: "د اسعارو له مخې لنډیز",
      deleteRecord: "ړنګول",
      deleteConfirmation: "ریکارډ ړنګ کړئ",
      deleteWarning: "دا عمل بیرته نه شي ګرځول کیدی",
      delete: "ړنګول",
      cancel: "لغوه",
      deleting: "ړنګ کیږي...",
      editRecord: "سمول",
      viewDetails: "کتل",
      close: "تړل",
      loading: "بار کیږي...",
      recordDeletedSuccess: "ریکارډ ړنګ شو!",
      exportSuccess: "صادر شو",
      recordsSuccessfully: "ریکارډونه په بریالیتوب سره!",
      noDataToExport: "د صادرولو لپاره معلومات نشته",
      exportFailed: "صادرول ناکام شو",
      id: "شناختي نمبر",
      actions: "کړنې"
    },
    fa: {
      backToDashboard: "بازگشت",
      dailyRecords: "رکوردهای روزانه",
      subtitle: "مدیریت تراکنش‌های روزانه شما",
      searchPlaceholder: "جستجوی رکوردها...",
      newRecord: "رکورد جدید",
      exportToCSV: "خروجی",
      totalRecords: "کل",
      totalIncome: "درآمد",
      totalSpend: "هزینه",
      netBalance: "موجودی",
      noRecordsFound: "هیچ رکوردی یافت نشد",
      recordDetails: "جزئیات رکورد",
      date: "تاریخ",
      day: "روز",
      incomeEntries: "درآمد",
      spendEntries: "هزینه",
      description: "توضیحات",
      amount: "مبلغ",
      currency: "ارز",
      personName: "شخص",
      noIncomeEntries: "هیچ درآمدی وجود ندارد",
      noSpendEntries: "هیچ هزینه‌ای وجود ندارد",
      summaryByCurrency: "خلاصه بر اساس ارز",
      deleteRecord: "حذف",
      deleteConfirmation: "حذف رکورد",
      deleteWarning: "این عمل قابل بازگشت نیست",
      delete: "حذف",
      cancel: "انصراف",
      deleting: "در حال حذف...",
      editRecord: "ویرایش",
      viewDetails: "مشاهده",
      close: "بستن",
      loading: "در حال بارگذاری...",
      recordDeletedSuccess: "رکورد حذف شد!",
      exportSuccess: "خروجی گرفته شد",
      recordsSuccessfully: "رکوردها با موفقیت!",
      noDataToExport: "داده‌ای برای خروجی وجود ندارد",
      exportFailed: "خطا در خروجی گرفتن",
      id: "شناسه",
      actions: "عملیات"
    }
  };

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

  const { records, loading, error, summary, pagination } = useSelector((state) => state.allDailyRecords);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.deleteDailyRecord);

  // Sort records to show newest first (most recent date on top)
  const getSortedRecords = () => {
    if (!records) return [];
    return [...records].sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  useEffect(() => {
    dispatch(getAllDailyRecordsAction(currentPage, itemsPerPage, searchTerm));
    dispatch(getDailyRecordStatsAction());
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);

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

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ur-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: '$', EUR: '€', GBP: '£', PKR: '₨', 
      AED: 'د.إ', SAR: 'ر.س', AFN: '؋', INR: '₹'
    };
    return symbols[currency] || currency || '$';
  };

  const formatAmount = (amount, currency) => {
    if (!amount && amount !== 0) return 'N/A';
    const symbol = getCurrencySymbol(currency);
    return `${symbol} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getTotalsByCurrency = () => {
    const totals = { income: {}, spend: {}, balance: {} };
    (records || []).forEach(record => {
      record.incomeEntries?.forEach(entry => {
        if (entry.amount && entry.currency) {
          totals.income[entry.currency] = (totals.income[entry.currency] || 0) + entry.amount;
        }
      });
      record.spendEntries?.forEach(entry => {
        if (entry.amount && entry.currency) {
          totals.spend[entry.currency] = (totals.spend[entry.currency] || 0) + entry.amount;
        }
      });
    });
    const allCurrencies = new Set([...Object.keys(totals.income), ...Object.keys(totals.spend)]);
    allCurrencies.forEach(currency => {
      totals.balance[currency] = (totals.income[currency] || 0) - (totals.spend[currency] || 0);
    });
    return totals;
  };

  const getRecordTotals = (record) => {
    const totals = { income: {}, spend: {}, balance: {} };
    record.incomeEntries?.forEach(entry => {
      if (entry.amount && entry.currency) {
        totals.income[entry.currency] = (totals.income[entry.currency] || 0) + entry.amount;
      }
    });
    record.spendEntries?.forEach(entry => {
      if (entry.amount && entry.currency) {
        totals.spend[entry.currency] = (totals.spend[entry.currency] || 0) + entry.amount;
      }
    });
    const allCurrencies = new Set([...Object.keys(totals.income), ...Object.keys(totals.spend)]);
    allCurrencies.forEach(currency => {
      totals.balance[currency] = (totals.income[currency] || 0) - (totals.spend[currency] || 0);
    });
    return totals;
  };

  const getDayName = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ur-PK', { weekday: 'short' });
  };

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

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowDetailsModal(true);
  };

  const handleEdit = (id) => {
    navigate(`/daily-records/${id}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleExport = () => {
    try {
      const dataToExport = records || [];
      if (!dataToExport || dataToExport.length === 0) {
        toast.error(t.noDataToExport);
        return;
      }
      
      const headers = ['ID', 'Date', 'Day', 'Income Details', 'Spend Details', 'Net Balance'];
      const csvRows = [headers.join(',')];
      
      dataToExport.forEach(record => {
        const recordTotals = getRecordTotals(record);
        const incomeStr = Object.entries(recordTotals.income).map(([curr, amt]) => `${getCurrencySymbol(curr)}${amt}`).join('; ');
        const spendStr = Object.entries(recordTotals.spend).map(([curr, amt]) => `${getCurrencySymbol(curr)}${amt}`).join('; ');
        const balanceStr = Object.entries(recordTotals.balance).map(([curr, amt]) => `${getCurrencySymbol(curr)}${amt}`).join('; ');
        
        const row = [record.id, formatDate(record.date), getDayName(record.date), `"${incomeStr}"`, `"${spendStr}"`, `"${balanceStr}"`];
        csvRows.push(row.join(','));
      });
      
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `daily_records_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`${t.exportSuccess} ${dataToExport.length} ${t.recordsSuccessfully}`);
    } catch (err) {
      toast.error(t.exportFailed);
    }
  };

  const totalsByCurrency = getTotalsByCurrency();
  const totalRecords = summary?.totalRecords || records?.length || 0;
  const sortedRecords = getSortedRecords();

  if (!isInitialized || (loading && !records)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loading}</p>
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
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">{t.dailyRecords}</h1>
            <p className="text-xs text-gray-500">{t.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExport} className="p-2 bg-gray-100 rounded-full active:bg-gray-200">
              <Download size={18} className="text-gray-600" />
            </button>
            <Link to="/daily-records-create">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1 shadow-lg">
                <Plus size={16} />
                <span>{t.newRecord}</span>
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
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Stats Cards - Grid Layout (No Scroll) */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
            <p className="text-xs opacity-90">{t.totalRecords}</p>
            <p className="text-2xl font-bold mt-1">{totalRecords}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
            <p className="text-xs opacity-90">{t.totalIncome}</p>
            {Object.keys(totalsByCurrency.income).length > 0 ? (
              Object.entries(totalsByCurrency.income).map(([currency, amount]) => (
                <p key={currency} className="text-sm font-bold mt-1">
                  {formatAmount(amount, currency)}
                </p>
              ))
            ) : (
              <p className="text-sm font-bold mt-1">{formatAmount(0, 'USD')}</p>
            )}
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 text-white">
            <p className="text-xs opacity-90">{t.totalSpend}</p>
            {Object.keys(totalsByCurrency.spend).length > 0 ? (
              Object.entries(totalsByCurrency.spend).map(([currency, amount]) => (
                <p key={currency} className="text-sm font-bold mt-1">
                  {formatAmount(amount, currency)}
                </p>
              ))
            ) : (
              <p className="text-sm font-bold mt-1">{formatAmount(0, 'USD')}</p>
            )}
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
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

      {/* Records List - Card View with Visible Actions - Sorted to show newest first */}
      <div className="px-4 pb-24">
        <div className="space-y-3">
          {sortedRecords.map((record) => {
            const recordTotals = getRecordTotals(record);
            
            return (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Record Header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{formatDate(record.date)}</p>
                    <p className="text-xs text-gray-500">{getDayName(record.date)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(record)}
                      className="p-2 rounded-lg bg-blue-50 active:bg-blue-100 transition-colors"
                      title={t.viewDetails}
                    >
                      <Eye size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleEdit(record.id)}
                      className="p-2 rounded-lg bg-green-50 active:bg-green-100 transition-colors"
                      title={t.editRecord}
                    >
                      <Edit size={16} className="text-green-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(record)}
                      className="p-2 rounded-lg bg-red-50 active:bg-red-100 transition-colors"
                      title={t.deleteRecord}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Record Content */}
                <div className="p-4">
                  {/* Income Section */}
                  {record.incomeEntries?.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-2">
                        <TrendingUp size={14} className="text-green-600" />
                        <span className="text-xs font-medium text-green-600">{t.income}</span>
                        <span className="text-xs text-gray-400 ml-1">({record.incomeEntries.length})</span>
                      </div>
                      <div className="space-y-1">
                        {record.incomeEntries.slice(0, 2).map((entry, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <div className="flex-1">
                              <p className="text-gray-700">{entry.description || '-'}</p>
                              <p className="text-xs text-gray-400">{entry.personName}</p>
                            </div>
                            <p className="font-medium text-green-600">
                              {formatAmount(entry.amount, entry.currency)}
                            </p>
                          </div>
                        ))}
                        {record.incomeEntries.length > 2 && (
                          <p className="text-xs text-gray-400 text-center pt-1">
                            +{record.incomeEntries.length - 2} more
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Spend Section */}
                  {record.spendEntries?.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-2">
                        <TrendingDown size={14} className="text-red-600" />
                        <span className="text-xs font-medium text-red-600">{t.spend}</span>
                        <span className="text-xs text-gray-400 ml-1">({record.spendEntries.length})</span>
                      </div>
                      <div className="space-y-1">
                        {record.spendEntries.slice(0, 2).map((entry, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <div className="flex-1">
                              <p className="text-gray-700">{entry.description || '-'}</p>
                              <p className="text-xs text-gray-400">{entry.personName}</p>
                            </div>
                            <p className="font-medium text-red-600">
                              {formatAmount(entry.amount, entry.currency)}
                            </p>
                          </div>
                        ))}
                        {record.spendEntries.length > 2 && (
                          <p className="text-xs text-gray-400 text-center pt-1">
                            +{record.spendEntries.length - 2} more
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Balance Summary */}
                  <div className={`pt-3 mt-2 border-t border-gray-100 flex items-center justify-between ${
                    Object.values(recordTotals.balance).some(b => b >= 0) ? 'bg-green-50 -mx-4 px-4 py-2' : 'bg-red-50 -mx-4 px-4 py-2'
                  }`}>
                    <span className="text-xs font-medium text-gray-600">{t.netBalance}</span>
                    <div className="text-right">
                      {Object.entries(recordTotals.balance).map(([currency, amount]) => (
                        <p key={currency} className={`text-sm font-bold ${amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatAmount(amount, currency)}
                        </p>
                      ))}
                      {Object.keys(recordTotals.balance).length === 0 && (
                        <p className="text-sm text-gray-400">-</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {(!sortedRecords || sortedRecords.length === 0) && (
            <div className="text-center py-12">
              <Wallet size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">{t.noRecordsFound}</p>
              <Link to="/daily-records-create">
                <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-xl text-sm font-medium">
                  {t.newRecord}
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm disabled:opacity-50 active:bg-gray-50"
            >
              {isRTL ? '→' : '←'} Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
              disabled={currentPage === pagination.totalPages}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm disabled:opacity-50 active:bg-gray-50"
            >
              Next {isRTL ? '←' : '→'}
            </button>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {showDetailsModal && selectedRecord && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetailsModal(false)}></div>
          
          <div className="flex min-h-full items-end sm:items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-3xl bg-white w-full max-w-md shadow-2xl animate-slideUp">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-green-600 to-red-600 px-5 py-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {t.recordDetails}
                </h3>
                <button onClick={() => setShowDetailsModal(false)} className="text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 max-h-[70vh] overflow-y-auto">
                {/* Date */}
                <div className="mb-5 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-green-600" />
                      <span className="text-sm text-gray-600">{formatDate(selectedRecord.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-green-600" />
                      <span className="text-sm text-gray-600">{getDayName(selectedRecord.date)}</span>
                    </div>
                  </div>
                </div>

                {/* Income Entries */}
                {selectedRecord.incomeEntries?.length > 0 && (
                  <div className="mb-5">
                    <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-1">
                      <DollarSign size={16} />
                      {t.incomeEntries} ({selectedRecord.incomeEntries.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedRecord.incomeEntries.map((entry, idx) => (
                        <div key={idx} className="bg-green-50 p-3 rounded-xl">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{entry.description || '-'}</p>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <User size={10} />
                                {entry.personName}
                              </p>
                            </div>
                            <p className="font-bold text-green-600">
                              {formatAmount(entry.amount, entry.currency)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Spend Entries */}
                {selectedRecord.spendEntries?.length > 0 && (
                  <div className="mb-5">
                    <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-1">
                      <DollarSign size={16} />
                      {t.spendEntries} ({selectedRecord.spendEntries.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedRecord.spendEntries.map((entry, idx) => (
                        <div key={idx} className="bg-red-50 p-3 rounded-xl">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{entry.description || '-'}</p>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <User size={10} />
                                {entry.personName}
                              </p>
                            </div>
                            <p className="font-bold text-red-600">
                              {formatAmount(entry.amount, entry.currency)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Summary */}
                {(() => {
                  const totals = getRecordTotals(selectedRecord);
                  const currencies = new Set([...Object.keys(totals.income), ...Object.keys(totals.spend)]);
                  if (currencies.size === 0) return null;
                  
                  return (
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm">{t.summaryByCurrency}</h4>
                      {Array.from(currencies).map(currency => {
                        const income = totals.income[currency] || 0;
                        const spend = totals.spend[currency] || 0;
                        const balance = income - spend;
                        return (
                          <div key={currency} className="flex justify-between items-center text-sm mb-1 last:mb-0">
                            <span className="text-gray-600">{currency}</span>
                            <div className="flex gap-3">
                              <span className="text-green-600">+{formatAmount(income, currency)}</span>
                              <span className="text-red-600">-{formatAmount(spend, currency)}</span>
                              <span className={balance >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                ={formatAmount(balance, currency)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-5 py-4 flex gap-3">
                <Link to={`/daily-records/${selectedRecord.id}`} className="flex-1">
                  <button className="w-full px-4 py-2.5 bg-green-600 text-white rounded-xl font-medium">
                    {t.editRecord}
                  </button>
                </Link>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl font-medium"
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
            <div className="relative transform overflow-hidden rounded-2xl bg-white w-full max-w-sm shadow-2xl">
              <div className="p-5 text-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle size={28} className="text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t.deleteRecord}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t.deleteConfirmation} {formatDate(selectedRecord.date)}? {t.deleteWarning}
                </p>
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

export default DailyRecords;