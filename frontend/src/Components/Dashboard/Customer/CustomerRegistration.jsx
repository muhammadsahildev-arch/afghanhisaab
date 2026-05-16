import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  Calendar as CalendarIcon,
  TrendingUp,
  TrendingDown,
  User,
  AlertCircle,
  RefreshCw,
  X,
  Download
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  getAllTransactionsAction,
  deleteTransactionAction,
  clearErrors,
  getTransactionStatsAction
} from "../../../actions/transactionActions";
import { DELETE_TRANSACTION_RESET } from "../../../constants/constants";

const CustomerRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Get state from Redux
  const { transactions, loading, error, summary, pagination } = useSelector((state) => state.allTransactions);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.deleteTransaction);

  // Language translations
  const translations = {
    en: {
      back: "Back",
      title: "Transactions",
      subtitle: "Manage customer transactions",
      newRecord: "Add",
      search: "Search...",
      export: "Export",
      totalRecords: "Total",
      totalSend: "Total Send",
      totalReceive: "Total Receive",
      noData: "No transactions found",
      date: "Date",
      customer: "Customer",
      send: "Send",
      receive: "Receive",
      rate: "Rate",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      details: "Transaction Details",
      customerName: "Customer Name",
      sender: "Sender",
      receiver: "Receiver",
      amount: "Amount",
      currency: "Currency",
      exchangeRate: "Exchange Rate",
      description: "Description",
      close: "Close",
      deleteTitle: "Delete Transaction",
      deleteConfirm: "Delete this transaction?",
      deleteWarning: "This cannot be undone",
      cancel: "Cancel",
      deleting: "Deleting...",
      deleteSuccess: "Transaction deleted!",
      exportSuccess: "Exported!",
      exportError: "Export failed",
      loading: "Loading...",
      previous: "Prev",
      next: "Next"
    },
    ur: {
      back: "واپس",
      title: "لین دین",
      subtitle: "کسٹمر لین دین کا نظم کریں",
      newRecord: "شامل",
      search: "تلاش...",
      export: "برآمد",
      totalRecords: "کل",
      totalSend: "کل بھیجا",
      totalReceive: "کل ملا",
      noData: "کوئی لین دین نہیں ملا",
      date: "تاریخ",
      customer: "کسٹمر",
      send: "بھیجا",
      receive: "ملا",
      rate: "شرح",
      view: "دیکھیں",
      edit: "ترمیم",
      delete: "حذف",
      details: "لین دین کی تفصیلات",
      customerName: "کسٹمر کا نام",
      sender: "بھیجنے والا",
      receiver: "وصول کنندہ",
      amount: "رقم",
      currency: "کرنسی",
      exchangeRate: "تبادلے کی شرح",
      description: "تفصیل",
      close: "بند",
      deleteTitle: "لین دین حذف کریں",
      deleteConfirm: "کیا آپ یہ لین دین حذف کرنا چاہتے ہیں؟",
      deleteWarning: "یہ عمل واپس نہیں کیا جا سکتا",
      cancel: "منسوخ",
      deleting: "حذف ہو رہا ہے...",
      deleteSuccess: "لین دین حذف ہوگیا!",
      exportSuccess: "برآمد ہوگیا!",
      exportError: "برآمد کرنے میں ناکامی",
      loading: "لوڈ ہو رہا ہے...",
      previous: "پچھلا",
      next: "اگلا"
    },
    ps: {
      back: "بیرته",
      title: "راکړه ورکړه",
      subtitle: "د پیرودونکو راکړو ورکړو مدیریت",
      newRecord: "اضافه",
      search: "لټون...",
      export: "صادرول",
      totalRecords: "ټول",
      totalSend: "ټول لیږل شوي",
      totalReceive: "ټول ترلاسه شوي",
      noData: "کومه راکړه ورکړه ونه موندل شوه",
      date: "نیټه",
      customer: "پیرودونکی",
      send: "لیږل",
      receive: "ترلاسه کول",
      rate: "نرخ",
      view: "کتل",
      edit: "سمول",
      delete: "حذف",
      details: "د راکړې ورکړې توضیحات",
      customerName: "د پیرودونکي نوم",
      sender: "لیږونکی",
      receiver: "ترلاسه کوونکی",
      amount: "اندازه",
      currency: "اسعار",
      exchangeRate: "د تبادلې نرخ",
      description: "تشریح",
      close: "تړل",
      deleteTitle: "راکړه ورکړه حذف کړئ",
      deleteConfirm: "ایا تاسو دا راکړه ورکړه حذف کول غواړئ؟",
      deleteWarning: "دا عمل بیرته نشي اخیستل کیدی",
      cancel: "لغوه",
      deleting: "حذف کیږي...",
      deleteSuccess: "راکړه ورکړه حذف شوه!",
      exportSuccess: "بریالیتوب سره صادر شو!",
      exportError: "صادرول ناکام شو",
      loading: "لوډ کیږي...",
      previous: "تېر",
      next: "بل"
    },
    fa: {
      back: "بازگشت",
      title: "تراکنش‌ها",
      subtitle: "مدیریت تراکنش‌های مشتریان",
      newRecord: "افزودن",
      search: "جستجو...",
      export: "خروجی",
      totalRecords: "کل",
      totalSend: "کل ارسالی",
      totalReceive: "کل دریافتی",
      noData: "هیچ تراکنشی یافت نشد",
      date: "تاریخ",
      customer: "مشتری",
      send: "ارسال",
      receive: "دریافت",
      rate: "نرخ",
      view: "مشاهده",
      edit: "ویرایش",
      delete: "حذف",
      details: "جزئیات تراکنش",
      customerName: "نام مشتری",
      sender: "فرستنده",
      receiver: "گیرنده",
      amount: "مبلغ",
      currency: "ارز",
      exchangeRate: "نرخ تبدیل",
      description: "توضیحات",
      close: "بستن",
      deleteTitle: "حذف تراکنش",
      deleteConfirm: "آیا می‌خواهید این تراکنش را حذف کنید؟",
      deleteWarning: "این عمل قابل بازگشت نیست",
      cancel: "لغو",
      deleting: "در حال حذف...",
      deleteSuccess: "تراکنش حذف شد!",
      exportSuccess: "با موفقیت خروجی گرفته شد!",
      exportError: "خطا در خروجی گرفتن",
      loading: "در حال بارگذاری...",
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

  // Fetch transactions on mount
  useEffect(() => {
    dispatch(getAllTransactionsAction(currentPage, itemsPerPage, searchTerm));
    dispatch(getTransactionStatsAction());
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);

  // Handle delete success
  useEffect(() => {
    if (deleteSuccess) {
      toast.success(t.deleteSuccess);
      dispatch({ type: DELETE_TRANSACTION_RESET });
      dispatch(getAllTransactionsAction(currentPage, itemsPerPage, searchTerm));
      dispatch(getTransactionStatsAction());
      setShowDeleteModal(false);
      setSelectedCustomer(null);
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

  // Get currency symbol
  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: '$', EUR: '€', GBP: '£', PKR: '₨', AED: 'د.إ', SAR: 'ر.س', 
      AFN: '؋', INR: '₹', CAD: 'C$', AUD: 'A$'
    };
    return symbols[currency] || currency || '$';
  };

  // Format amount
  const formatAmount = (amount, currency) => {
    if (!amount && amount !== 0) return '0.00';
    const symbol = getCurrencySymbol(currency);
    return `${symbol} ${amount.toFixed(2)}`;
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ur-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle delete
  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      setIsDeleting(true);
      dispatch(deleteTransactionAction(selectedCustomer.id));
    }
  };

  // Handle view details
  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  };

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/customer-record-edit/${id}`);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Handle export
  const handleExport = () => {
    try {
      const dataToExport = transactions || [];
      if (dataToExport.length === 0) {
        toast.error(t.noDataToExport || 'No data');
        return;
      }
      
      const headers = ['ID', 'Name', 'Sender', 'Receiver', 'Send Amount', 'Send Currency', 'Receive Amount', 'Receive Currency', 'Rate', 'Date'];
      const csvRows = [headers.join(',')];
      
      dataToExport.forEach(customer => {
        const row = [
          customer.id,
          `"${(customer.name || '').replace(/"/g, '""')}"`,
          `"${(customer.senderName || '').replace(/"/g, '""')}"`,
          `"${(customer.receiverName || '').replace(/"/g, '""')}"`,
          customer.senderAmount || 0,
          customer.senderCurrency || 'USD',
          customer.receiverAmount || 0,
          customer.receiverCurrency || 'PKR',
          customer.exchangeRate || 0,
          formatDate(customer.date)
        ];
        csvRows.push(row.join(','));
      });
      
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
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
  const sortedTransactions = [...(transactions || [])].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const totalRecords = summary?.totalTransactions || transactions?.length || 0;
  const totalSend = summary?.totalSenderAmount || 0;
  const totalReceive = summary?.totalReceiverAmount || 0;

  if (loading && !transactions || !isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
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
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold text-gray-800 truncate px-2">{t.title}</h1>
            <p className="text-xs text-gray-500">{t.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExport} className="p-2 bg-gray-100 rounded-full active:bg-gray-200">
              <Download size={18} className="text-gray-600" />
            </button>
            <Link to="/customer-record-create">
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
            placeholder={t.search}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all text-base"
          />
        </div>
      </div>

      {/* Stats Cards - 3 column grid for mobile */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white">
            <p className="text-xs opacity-90">{t.totalRecords}</p>
            <p className="text-lg font-bold mt-1">{totalRecords}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 text-white">
            <p className="text-xs opacity-90">{t.totalSend}</p>
            <p className="text-xs font-bold mt-1 truncate">{formatAmount(totalSend, 'USD')}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white">
            <p className="text-xs opacity-90">{t.totalReceive}</p>
            <p className="text-xs font-bold mt-1 truncate">{formatAmount(totalReceive, 'PKR')}</p>
          </div>
        </div>
      </div>

      {/* Transactions List - Card View for Mobile */}
      <div className="px-4 pb-28">
        <div className="space-y-3">
          {sortedTransactions.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Card Content */}
              <div className="p-3">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {customer.name?.charAt(0) || 'C'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{customer.name}</p>
                      <p className="text-xs text-gray-400">{formatDate(customer.date)}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleViewDetails(customer)}
                      className="p-1.5 bg-blue-50 rounded-lg active:bg-blue-100 transition-colors"
                    >
                      <Eye size={14} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleEdit(customer.id)}
                      className="p-1.5 bg-green-50 rounded-lg active:bg-green-100 transition-colors"
                    >
                      <Edit size={14} className="text-green-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(customer)}
                      className="p-1.5 bg-red-50 rounded-lg active:bg-red-100 transition-colors"
                    >
                      <Trash2 size={14} className="text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Sender & Receiver Row */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {/* Sender */}
                  <div className="bg-blue-50 rounded-lg p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp size={10} className="text-blue-600" />
                      <p className="text-xs text-blue-600 font-medium">{t.send}</p>
                    </div>
                    <p className="text-xs font-medium text-gray-800 truncate">{customer.senderName || '-'}</p>
                    <p className="text-xs font-bold text-blue-600 mt-1">
                      {formatAmount(customer.senderAmount, customer.senderCurrency)}
                    </p>
                  </div>

                  {/* Receiver */}
                  <div className="bg-green-50 rounded-lg p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingDown size={10} className="text-green-600" />
                      <p className="text-xs text-green-600 font-medium">{t.receive}</p>
                    </div>
                    <p className="text-xs font-medium text-gray-800 truncate">{customer.receiverName || '-'}</p>
                    <p className="text-xs font-bold text-green-600 mt-1">
                      {formatAmount(customer.receiverAmount, customer.receiverCurrency)}
                    </p>
                  </div>
                </div>

                {/* Exchange Rate Row */}
                <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">{t.rate}</span>
                  <span className="text-xs font-medium text-gray-700">
                    1 {customer.senderCurrency} = {customer.exchangeRate} {customer.receiverCurrency}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {(!transactions || transactions.length === 0) && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">{t.noData}</p>
              <Link to="/customer-record-create">
                <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-xl text-sm font-medium">
                  {t.newRecord}
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-50 active:bg-gray-50"
            >
              {isRTL ? '→' : '←'} {t.previous}
            </button>
            <span className="text-xs text-gray-500">
              {currentPage} / {pagination.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
              disabled={currentPage === pagination.totalPages}
              className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-50 active:bg-gray-50"
            >
              {t.next} {isRTL ? '←' : '→'}
            </button>
          </div>
        )}
      </div>

      {/* View Details Modal - Bottom Sheet */}
      {showDetailsModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetailsModal(false)}></div>
          
          <div className="flex min-h-full items-end sm:items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-2xl bg-white w-full max-w-sm shadow-2xl animate-slideUp">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3">
                <h3 className="text-base font-semibold text-white">{t.details}</h3>
              </div>

              {/* Modal Body */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  {/* Customer Name */}
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">{t.customerName}</p>
                    <p className="font-medium text-gray-900 text-sm">{selectedCustomer.name}</p>
                  </div>

                  {/* Date */}
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">{t.date}</p>
                    <p className="text-sm text-gray-700">{formatDate(selectedCustomer.date)}</p>
                  </div>

                  {/* Sender */}
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="text-xs text-blue-600 mb-0.5">{t.sender}</p>
                    <p className="font-medium text-gray-900 text-sm">{selectedCustomer.senderName}</p>
                    <p className="text-xs font-bold text-blue-600 mt-1">
                      {t.amount}: {formatAmount(selectedCustomer.senderAmount, selectedCustomer.senderCurrency)}
                    </p>
                  </div>

                  {/* Receiver */}
                  <div className="bg-green-50 p-2 rounded-lg">
                    <p className="text-xs text-green-600 mb-0.5">{t.receiver}</p>
                    <p className="font-medium text-gray-900 text-sm">{selectedCustomer.receiverName}</p>
                    <p className="text-xs font-bold text-green-600 mt-1">
                      {t.amount}: {formatAmount(selectedCustomer.receiverAmount, selectedCustomer.receiverCurrency)}
                    </p>
                  </div>

                  {/* Exchange Rate */}
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">{t.exchangeRate}</p>
                    <p className="text-sm font-medium">
                      1 {selectedCustomer.senderCurrency} = {selectedCustomer.exchangeRate} {selectedCustomer.receiverCurrency}
                    </p>
                  </div>

                  {/* Description */}
                  {selectedCustomer.description && (
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">{t.description}</p>
                      <p className="text-sm text-gray-700">{selectedCustomer.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-4 py-3 flex gap-2">
                <button
                  onClick={() => handleEdit(selectedCustomer.id)}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium"
                >
                  {t.edit}
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-2xl bg-white w-full max-w-sm shadow-2xl">
              <div className="p-5 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{t.deleteTitle}</h3>
                <p className="text-gray-600 text-sm mb-2">{t.deleteConfirm}</p>
                <p className="text-gray-500 text-xs mb-4">{t.deleteWarning}</p>
                <div className="flex gap-2">
                  <button
                    onClick={confirmDelete}
                    disabled={deleteLoading}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    {deleteLoading ? t.deleting : t.delete}
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium"
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

export default CustomerRegistration;