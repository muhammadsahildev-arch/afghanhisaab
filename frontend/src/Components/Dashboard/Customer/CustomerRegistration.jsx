import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Euro,
  Wallet,
  Percent,
  Receipt,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Building,
  Globe,
  Copy,
  Printer,
  FileText,
  RefreshCw,
  ArrowUpDown,
  Grid3x3,
  List,
  Settings,
  Info,
  Save,
  Send,
  Ban,
  Archive,
  Star,
  Award,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  CreditCard,
  Landmark,
  Briefcase,
  Home,
  Bell,
  Menu,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { Country, State, City } from "country-state-city";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('view');
  const [filters, setFilters] = useState({
    search: '',
    currency: '',
    status: '',
    dateRange: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [isDeleting, setIsDeleting] = useState(false);

  // Language translations
  const translations = {
    en: {
      backToDashboard: "Back to Dashboard",
      title: "Customer Registration",
      subtitle: "Manage all your customer transactions and records",
      newRecord: "New Record",
      totalRecords: "Total Records",
      totalSendAmount: "Total Send Amount",
      totalReceiveAmount: "Total Receive Amount",
      totalFees: "Total Fees",
      filters: "Filters",
      clearAll: "Clear All",
      search: "Search",
      searchPlaceholder: "Search by name, email, phone...",
      currency: "Currency",
      allCurrencies: "All Currencies",
      status: "Status",
      allStatus: "All Status",
      completed: "Completed",
      pending: "Pending",
      processing: "Processing",
      cancelled: "Cancelled",
      sortBy: "Sort By",
      name: "Name",
      date: "Date",
      amount: "Amount",
      showing: "Showing",
      of: "of",
      records: "records",
      page: "Page",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      customerInformation: "Customer Information",
      transactionSummary: "Transaction Summary",
      senderDetails: "Sender Details",
      receiverDetails: "Receiver Details",
      feesBreakdown: "Fees Breakdown",
      notes: "Notes",
      close: "Close",
      deleteTitle: "Delete Customer Record",
      deleteMessage: "Are you sure you want to delete the record for",
      deleteWarning: "This action cannot be undone.",
      deleting: "Deleting...",
      send: "Send",
      receive: "Receive",
      rate: "Rate",
      commission: "Commission",
      exchangeFee: "Exchange Fee",
      tax: "Tax",
      totalFeesLabel: "Total Fees:",
      customer: "Customer",
      transaction: "Transaction",
      actions: "Actions",
      exportSuccess: "Exported {count} records successfully!",
      exportError: "Failed to export data",
      noDataToExport: "No data to export",
      loadingRecords: "Loading customer records...",
      errors: {
        deleteFailed: "Failed to delete record"
      }
    },
    ur: {
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      title: "کسٹمر رجسٹریشن",
      subtitle: "اپنے تمام کسٹمر لین دین اور ریکارڈز کا نظم کریں",
      newRecord: "نیا ریکارڈ",
      totalRecords: "کل ریکارڈز",
      totalSendAmount: "کل بھیجی گئی رقم",
      totalReceiveAmount: "کل وصول کردہ رقم",
      totalFees: "کل فیس",
      filters: "فلٹرز",
      clearAll: "سب صاف کریں",
      search: "تلاش کریں",
      searchPlaceholder: "نام، ای میل، فون سے تلاش کریں...",
      currency: "کرنسی",
      allCurrencies: "تمام کرنسیاں",
      status: "حالت",
      allStatus: "تمام حالتیں",
      completed: "مکمل شدہ",
      pending: "زیر التواء",
      processing: "پروسیسنگ",
      cancelled: "منسوخ شدہ",
      sortBy: "ترتیب دیں بذریعہ",
      name: "نام",
      date: "تاریخ",
      amount: "رقم",
      showing: "دکھا رہا ہے",
      of: "میں سے",
      records: "ریکارڈز",
      page: "صفحہ",
      view: "دیکھیں",
      edit: "ترمیم کریں",
      delete: "حذف کریں",
      customerInformation: "کسٹمر کی معلومات",
      transactionSummary: "لین دین کا خلاصہ",
      senderDetails: "بھیجنے والے کی تفصیلات",
      receiverDetails: "وصول کنندہ کی تفصیلات",
      feesBreakdown: "فیس کی تقسیم",
      notes: "نوٹس",
      close: "بند کریں",
      deleteTitle: "کسٹمر ریکارڈ حذف کریں",
      deleteMessage: "کیا آپ واقعی ریکارڈ حذف کرنا چاہتے ہیں",
      deleteWarning: "یہ عمل واپس نہیں لیا جا سکتا۔",
      deleting: "حذف ہو رہا ہے...",
      send: "بھیجیں",
      receive: "وصول کریں",
      rate: "شرح",
      commission: "کمیشن",
      exchangeFee: "ایکسچینج فیس",
      tax: "ٹیکس",
      totalFeesLabel: "کل فیس:",
      customer: "کسٹمر",
      transaction: "لین دین",
      actions: "اعمال",
      exportSuccess: "{count} ریکارڈز کامیابی سے ایکسپورٹ ہو گئے!",
      exportError: "ڈیٹا ایکسپورٹ کرنے میں ناکامی",
      noDataToExport: "ایکسپورٹ کرنے کے لیے کوئی ڈیٹا نہیں",
      loadingRecords: "کسٹمر ریکارڈز لوڈ ہو رہے ہیں...",
      errors: {
        deleteFailed: "ریکارڈ حذف کرنے میں ناکامی"
      }
    },
    ps: {
      backToDashboard: "بیرته ډشبورډ ته",
      title: "د پیرودونکو ثبتول",
      subtitle: "د خپلو ټولو پیرودونکو راکړو ورکړو او ریکارڈونو مدیریت وکړئ",
      newRecord: "نوی ریکارډ",
      totalRecords: "ټول ریکارډونه",
      totalSendAmount: "ټوله لیږل شوې اندازه",
      totalReceiveAmount: "ټوله ترلاسه شوې اندازه",
      totalFees: "ټولې فیسونه",
      filters: "فلټرونه",
      clearAll: "ټول پاک کړئ",
      search: "لټون",
      searchPlaceholder: "په نوم، بریښنالیک، تلیفون سره وپلټئ...",
      currency: "اسعار",
      allCurrencies: "ټول اسعار",
      status: "حالت",
      allStatus: "ټول حالتونه",
      completed: "بشپړ شوی",
      pending: "په انتظار کې",
      processing: "پروسه روانه ده",
      cancelled: "لغوه شوی",
      sortBy: "ترتیب په",
      name: "نوم",
      date: "نیټه",
      amount: "اندازه",
      showing: "ښکاره کول",
      of: "د",
      records: "ریکارډونه",
      page: "پاڼه",
      view: "کتل",
      edit: "سمول",
      delete: "ړنګول",
      customerInformation: "د پیرودونکي معلومات",
      transactionSummary: "د راکړې ورکړې لنډیز",
      senderDetails: "د لیږونکي توضیحات",
      receiverDetails: "د ترلاسه کوونکي توضیحات",
      feesBreakdown: "د فیسونو ویش",
      notes: "یادښتونه",
      close: "تړل",
      deleteTitle: "د پیرودونکي ریکارډ ړنګ کړئ",
      deleteMessage: "ایا تاسو واقعیا ړنګول غواړئ",
      deleteWarning: "دا عمل بیرته نه اخیستل کیدی شي.",
      deleting: "ړنګیږي...",
      send: "لیږل",
      receive: "ترلاسه کول",
      rate: "نرخ",
      commission: "کمیشن",
      exchangeFee: "د تبادلې فیس",
      tax: "مالیه",
      totalFeesLabel: "ټولې فیسونه:",
      customer: "پیرودونکی",
      transaction: "راکړه ورکړه",
      actions: "کړنې",
      exportSuccess: "{count} ریکارډونه په بریالیتوب سره صادر شول!",
      exportError: "د معلوماتو صادرول ناکام شول",
      noDataToExport: "د صادرولو لپاره معلومات نشته",
      loadingRecords: "د پیرودونکو ریکارډونه لوډ کیږي...",
      errors: {
        deleteFailed: "د ریکارډ ړنګول ناکام شول"
      }
    },
    fa: {
      backToDashboard: "بازگشت به داشبورد",
      title: "ثبت نام مشتری",
      subtitle: "مدیریت تمام تراکنش‌ها و رکوردهای مشتریان",
      newRecord: "رکورد جدید",
      totalRecords: "کل رکوردها",
      totalSendAmount: "کل مبلغ ارسالی",
      totalReceiveAmount: "کل مبلغ دریافتی",
      totalFees: "کل کارمزدها",
      filters: "فیلترها",
      clearAll: "پاک کردن همه",
      search: "جستجو",
      searchPlaceholder: "جستجو بر اساس نام، ایمیل، تلفن...",
      currency: "ارز",
      allCurrencies: "همه ارزها",
      status: "وضعیت",
      allStatus: "همه وضعیت‌ها",
      completed: "تکمیل شده",
      pending: "در انتظار",
      processing: "در حال پردازش",
      cancelled: "لغو شده",
      sortBy: "مرتب سازی بر اساس",
      name: "نام",
      date: "تاریخ",
      amount: "مبلغ",
      showing: "نمایش",
      of: "از",
      records: "رکوردها",
      page: "صفحه",
      view: "مشاهده",
      edit: "ویرایش",
      delete: "حذف",
      customerInformation: "اطلاعات مشتری",
      transactionSummary: "خلاصه تراکنش",
      senderDetails: "جزئیات فرستنده",
      receiverDetails: "جزئیات گیرنده",
      feesBreakdown: "تجزیه کارمزدها",
      notes: "یادداشت‌ها",
      close: "بستن",
      deleteTitle: "حذف رکورد مشتری",
      deleteMessage: "آیا مطمئن هستید که می‌خواهید رکورد را حذف کنید",
      deleteWarning: "این عمل قابل بازگشت نیست.",
      deleting: "در حال حذف...",
      send: "ارسال",
      receive: "دریافت",
      rate: "نرخ",
      commission: "کمیسیون",
      exchangeFee: "کارمزد تبدیل",
      tax: "مالیات",
      totalFeesLabel: "کل کارمزدها:",
      customer: "مشتری",
      transaction: "تراکنش",
      actions: "عملیات",
      exportSuccess: "{count} رکورد با موفقیت صادر شد!",
      exportError: "خطا در صادرات داده‌ها",
      noDataToExport: "داده‌ای برای صادرات وجود ندارد",
      loadingRecords: "در حال بارگذاری رکوردهای مشتری...",
      errors: {
        deleteFailed: "خطا در حذف رکورد"
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

  // Get state from Redux
  const { transactions, loading, error, summary, pagination } = useSelector((state) => state.allTransactions);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.deleteTransaction);

  // Fetch transactions on mount
  useEffect(() => {
    dispatch(getAllTransactionsAction(currentPage, itemsPerPage, filters.search, filters.currency, filters.status));
    dispatch(getTransactionStatsAction());
  }, [dispatch, currentPage, itemsPerPage, filters.search, filters.currency, filters.status]);

  // Handle delete success
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Customer record deleted successfully!");
      dispatch({ type: DELETE_TRANSACTION_RESET });
      dispatch(getAllTransactionsAction(currentPage, itemsPerPage, filters.search, filters.currency, filters.status));
      dispatch(getTransactionStatsAction());
      setShowModal(false);
      setSelectedCustomer(null);
      setIsDeleting(false);
    }
  }, [deleteSuccess, dispatch, currentPage, itemsPerPage, filters.search, filters.currency, filters.status]);

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
      USD: '$', EUR: '€', GBP: '£', PKR: '₨', AED: 'د.إ', SAR: 'ر.س', AFN: '؋',
      INR: '₹', CAD: 'C$', AUD: 'A$', JPY: '¥', CNY: '¥'
    };
    return symbols[currency] || currency || '$';
  };

  // Format amount with proper currency symbol
  const formatAmount = (amount, currency) => {
    if (!amount && amount !== 0) return 'N/A';
    const symbol = getCurrencySymbol(currency);
    const formattedAmount = amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${symbol} ${formattedAmount}`;
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle size={12} />;
      case 'pending': return <Clock size={12} />;
      case 'processing': return <RefreshCw size={12} />;
      case 'cancelled': return <Ban size={12} />;
      default: return <Info size={12} />;
    }
  };

  // Handle customer actions
  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setModalType('view');
    setShowModal(true);
  };

  const handleEditCustomer = (customer) => {
    navigate(`/customer-record-edit/${customer.id}`);
  };

  const handleDeleteCustomer = (customer) => {
    setSelectedCustomer(customer);
    setModalType('delete');
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      setIsDeleting(true);
      dispatch(deleteTransactionAction(selectedCustomer.id));
    }
  };

  // Calculate totals by currency from transactions
  const getTotalsByCurrency = () => {
    const totals = {
      sendAmount: {},
      receiveAmount: {},
      fees: {}
    };
    
    (transactions || []).forEach(transaction => {
      // Send amount by currency
      if (transaction.senderAmount && transaction.senderCurrency) {
        if (!totals.sendAmount[transaction.senderCurrency]) {
          totals.sendAmount[transaction.senderCurrency] = 0;
        }
        totals.sendAmount[transaction.senderCurrency] += transaction.senderAmount;
      }
      
      // Receive amount by currency
      if (transaction.receiverAmount && transaction.receiverCurrency) {
        if (!totals.receiveAmount[transaction.receiverCurrency]) {
          totals.receiveAmount[transaction.receiverCurrency] = 0;
        }
        totals.receiveAmount[transaction.receiverCurrency] += transaction.receiverAmount;
      }
      
      // Fees by receiver currency
      const totalFees = (transaction.commission || 0) + (transaction.fee || 0) + (transaction.tax || 0);
      if (totalFees > 0 && transaction.receiverCurrency) {
        if (!totals.fees[transaction.receiverCurrency]) {
          totals.fees[transaction.receiverCurrency] = 0;
        }
        totals.fees[transaction.receiverCurrency] += totalFees;
      }
    });
    
    return totals;
  };

  const totalsByCurrency = getTotalsByCurrency();

  // Handle export
  const handleExport = () => {
    try {
      const dataToExport = transactions || [];
      
      if (!dataToExport || dataToExport.length === 0) {
        toast.error(t.noDataToExport);
        return;
      }
      
      const headers = [
        'ID', 'Name', 'Sender Email', 'Receiver Email', 'Sender Phone', 'Receiver Phone',
        'Send Amount', 'Send Currency', 'Receive Amount', 'Receive Currency',
        'Exchange Rate', 'Commission', 'Fee', 'Tax', 'Total Fees', 'Status', 'Date', 'Notes'
      ];
      
      const csvRows = [headers.join(',')];
      
      dataToExport.forEach(customer => {
        const totalFees = (customer.commission || 0) + (customer.fee || 0) + (customer.tax || 0);
        const row = [
          customer.id,
          `"${(customer.name || '').replace(/"/g, '""')}"`,
          customer.senderEmail || '',
          customer.receiverEmail || '',
          customer.senderPhone || '',
          customer.receiverPhone || '',
          customer.senderAmount || 0,
          customer.senderCurrency || '',
          customer.receiverAmount || 0,
          customer.receiverCurrency || '',
          customer.exchangeRate || 0,
          customer.commission || 0,
          customer.fee || 0,
          customer.tax || 0,
          totalFees,
          customer.status || '',
          customer.date ? formatDate(customer.date) : 'N/A',
          `"${(customer.notes || '').replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(','));
      });
      
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `customer_transactions_export_${new Date().toISOString().split('T')[0]}.csv`);
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

  // Filter and sort customers
  const filteredCustomers = (transactions || []).filter(customer => {
    const matchesSearch = filters.search === '' || 
      customer.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      customer.senderEmail?.toLowerCase().includes(filters.search.toLowerCase()) ||
      customer.receiverEmail?.toLowerCase().includes(filters.search.toLowerCase()) ||
      customer.senderPhone?.includes(filters.search);
    
    const matchesCurrency = !filters.currency || 
      customer.senderCurrency === filters.currency || 
      customer.receiverCurrency === filters.currency;
    
    const matchesStatus = !filters.status || customer.status === filters.status;
    
    return matchesSearch && matchesCurrency && matchesStatus;
  });

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let comparison = 0;
    switch(filters.sortBy) {
      case 'name':
        comparison = (a.name || '').localeCompare(b.name || '');
        break;
      case 'date':
        comparison = new Date(b.date) - new Date(a.date);
        break;
      case 'amount':
        comparison = (b.senderAmount || 0) - (a.senderAmount || 0);
        break;
      case 'status':
        comparison = (a.status || '').localeCompare(b.status || '');
        break;
      default:
        comparison = 0;
    }
    return filters.sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);

  // Get summary stats
  const totalRecords = summary?.totalTransactions || transactions?.length || 0;

  if (loading && !transactions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loadingRecords}</p>
        </div>
      </div>
    );
  }

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
                {t.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            {/* Add New Record Button */}
            <Link to="/customer-record-create">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 shadow-lg" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <Plus size={18} />
                <span>{t.newRecord}</span>
              </button>
            </Link>

            {/* Export Button */}
            <button 
              onClick={handleExport}
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Download size={18} className="text-gray-600" />
            </button>

            {/* View Toggle */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <Grid3x3 size={18} className={viewMode === 'grid' ? 'text-green-600' : 'text-gray-600'} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <List size={18} className={viewMode === 'list' ? 'text-green-600' : 'text-gray-600'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        {/* Summary Cards - Per Currency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div>
                <p className="text-sm opacity-90">{t.totalRecords}</p>
                <p className="text-2xl font-bold mt-1">{totalRecords}</p>
              </div>
              <Users size={24} className="opacity-50" />
            </div>
          </div>

          {/* Total Send Amount - Per Currency */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <p className="text-sm opacity-90">{t.totalSendAmount}</p>
              <DollarSign size={24} className="opacity-50" />
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
              {Object.keys(totalsByCurrency.sendAmount).length > 0 ? (
                Object.entries(totalsByCurrency.sendAmount).map(([currency, amount]) => (
                  <p key={currency} className="text-sm font-semibold">
                    {formatAmount(amount, currency)}
                  </p>
                ))
              ) : (
                <p className="text-sm font-semibold">{formatAmount(0, 'USD')}</p>
              )}
            </div>
          </div>

          {/* Total Receive Amount - Per Currency */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <p className="text-sm opacity-90">{t.totalReceiveAmount}</p>
              <Wallet size={24} className="opacity-50" />
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
              {Object.keys(totalsByCurrency.receiveAmount).length > 0 ? (
                Object.entries(totalsByCurrency.receiveAmount).map(([currency, amount]) => (
                  <p key={currency} className="text-sm font-semibold">
                    {formatAmount(amount, currency)}
                  </p>
                ))
              ) : (
                <p className="text-sm font-semibold">{formatAmount(0, 'USD')}</p>
              )}
            </div>
          </div>

          {/* Total Fees - Per Currency */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <p className="text-sm opacity-90">{t.totalFees}</p>
              <Receipt size={24} className="opacity-50" />
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
              {Object.keys(totalsByCurrency.fees).length > 0 ? (
                Object.entries(totalsByCurrency.fees).map(([currency, amount]) => (
                  <p key={currency} className="text-sm font-semibold">
                    {formatAmount(amount, currency)}
                  </p>
                ))
              ) : (
                <p className="text-sm font-semibold">{formatAmount(0, 'USD')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Filter size={18} className="mr-2 text-green-600" />
              {t.filters}
            </h2>
            <button
              onClick={() => setFilters({
                search: '',
                currency: '',
                status: '',
                dateRange: 'all',
                sortBy: 'name',
                sortOrder: 'asc'
              })}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              {t.clearAll}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.search}</label>
              <div className="relative">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={16} />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  placeholder={t.searchPlaceholder}
                  className={`w-full ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500`}
                />
              </div>
            </div>

            {/* Currency Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.currency}</label>
              <select
                value={filters.currency}
                onChange={(e) => setFilters({...filters, currency: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="">{t.allCurrencies}</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="PKR">PKR (₨)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="SAR">SAR (ر.س)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.status}</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="">{t.allStatus}</option>
                <option value="completed">{t.completed}</option>
                <option value="pending">{t.pending}</option>
                <option value="processing">{t.processing}</option>
                <option value="cancelled">{t.cancelled}</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.sortBy}</label>
              <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                >
                  <option value="name">{t.name}</option>
                  <option value="date">{t.date}</option>
                  <option value="amount">{t.amount}</option>
                  <option value="status">{t.status}</option>
                </select>
                <button
                  onClick={() => setFilters({...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'})}
                  className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowUpDown size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {t.showing} {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedCustomers.length)} {t.of} {sortedCustomers.length} {t.records}
          </div>
        </div>

        {/* Customers Grid/List View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((customer) => (
              <div
                key={customer.id}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200 hover:border-green-500/30 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <div className="flex items-center space-x-3 min-w-0 flex-1" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {customer.name?.charAt(0) || 'C'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{customer.name}</h3>
                      <p className="text-xs text-gray-500">{t.page}: #{customer.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 border ${getStatusColor(customer.status)} flex-shrink-0 ml-2`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    {getStatusIcon(customer.status)}
                    <span className="capitalize">{customer.status === 'completed' ? t.completed : customer.status === 'pending' ? t.pending : customer.status === 'processing' ? t.processing : t.cancelled}</span>
                  </span>
                </div>

                {/* Transaction Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span className="text-gray-500">{t.send}</span>
                    <span className="font-semibold text-gray-900">
                      {formatAmount(customer.senderAmount, customer.senderCurrency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span className="text-gray-500">{t.receive}</span>
                    <span className="font-semibold text-green-600">
                      {formatAmount(customer.receiverAmount, customer.receiverCurrency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span className="text-gray-500">{t.rate}</span>
                    <span className="font-medium text-xs">
                      1 {customer.senderCurrency} = {customer.exchangeRate} {customer.receiverCurrency}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-1 mb-4 text-xs">
                  <div className="flex items-center text-gray-500 truncate" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Mail size={12} className={`${isRTL ? 'ml-1' : 'mr-1'} flex-shrink-0`} />
                    <span className="truncate">{customer.senderEmail}</span>
                  </div>
                  <div className="flex items-center text-gray-500" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Phone size={12} className={`${isRTL ? 'ml-1' : 'mr-1'} flex-shrink-0`} />
                    <span className="truncate">{customer.senderPhone}</span>
                  </div>
                  <div className="flex items-center text-gray-500" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Calendar size={12} className={`${isRTL ? 'ml-1' : 'mr-1'} flex-shrink-0`} />
                    <span className="truncate">{formatDate(customer.date)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <button
                    onClick={() => handleViewCustomer(customer)}
                    className="flex-1 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                    style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                  >
                    <Eye size={14} />
                    <span className="text-sm">{t.view}</span>
                  </button>
                  <button
                    onClick={() => handleEditCustomer(customer)}
                    className="flex-1 p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center space-x-1"
                    style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                  >
                    <Edit size={14} />
                    <span className="text-sm">{t.edit}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer)}
                    className="flex-1 p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
                    style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                  >
                    <Trash2 size={14} />
                    <span className="text-sm">{t.delete}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.customer}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.transaction}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.amount}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.rate}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.status}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.date}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {customer.name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{customer.name}</p>
                            <p className="text-xs text-gray-500">{customer.senderEmail}</p>
                          </div>
                        </div>
                       </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{customer.senderCurrency} → {customer.receiverCurrency}</p>
                          <p className="text-xs text-gray-500">{t.send}/{t.receive}</p>
                        </div>
                       </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{formatAmount(customer.senderAmount, customer.senderCurrency)}</p>
                          <p className="text-xs text-green-600">{formatAmount(customer.receiverAmount, customer.receiverCurrency)}</p>
                        </div>
                       </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">1 : {customer.exchangeRate}</p>
                       </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 inline-flex border ${getStatusColor(customer.status)}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          {getStatusIcon(customer.status)}
                          <span className="capitalize">{customer.status === 'completed' ? t.completed : customer.status === 'pending' ? t.pending : customer.status === 'processing' ? t.processing : t.cancelled}</span>
                        </span>
                       </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(customer.date)}
                       </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <button
                            onClick={() => handleViewCustomer(customer)}
                            className="p-1 hover:bg-blue-100 rounded transition-colors"
                            title={t.view}
                          >
                            <Eye size={16} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleEditCustomer(customer)}
                            className="p-1 hover:bg-green-100 rounded transition-colors"
                            title={t.edit}
                          >
                            <Edit size={16} className="text-green-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(customer)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title={t.delete}
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-gray-500">
              {t.page} {currentPage} {t.of} {totalPages}
            </div>
            <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              {[...Array(Math.min(totalPages, 5))].map((_, i) => (
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
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* View Customer Modal - with translations */}
      {showModal && modalType === 'view' && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowModal(false)}
          ></div>
          
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-green-600 to-red-600 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <h3 className="text-lg font-semibold text-white flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Eye size={18} className="mr-2" />
                  {t.customerInformation}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="max-h-[70vh] overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <User size={16} className="mr-2 text-green-600" />
                      {t.customerInformation}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">{t.name}:</span> <span className="font-medium">{selectedCustomer.name}</span></p>
                      <p><span className="text-gray-500">{t.status}:</span> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium inline-flex items-center space-x-1 border ${getStatusColor(selectedCustomer.status)}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          {getStatusIcon(selectedCustomer.status)}
                          <span className="capitalize">{selectedCustomer.status === 'completed' ? t.completed : selectedCustomer.status === 'pending' ? t.pending : selectedCustomer.status === 'processing' ? t.processing : t.cancelled}</span>
                        </span>
                      </p>
                      <p><span className="text-gray-500">{t.date}:</span> {formatDate(selectedCustomer.date)}</p>
                      <p><span className="text-gray-500">{t.page}:</span> #{selectedCustomer.id}</p>
                    </div>
                  </div>

                  {/* Transaction Summary */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <TrendingUp size={16} className="mr-2 text-green-600" />
                      {t.transactionSummary}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <span className="text-gray-500">{t.send} {t.amount}:</span>
                        <span className="font-medium">{formatAmount(selectedCustomer.senderAmount, selectedCustomer.senderCurrency)}</span>
                      </div>
                      <div className="flex justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <span className="text-gray-500">{t.receive} {t.amount}:</span>
                        <span className="font-medium text-green-600">{formatAmount(selectedCustomer.receiverAmount, selectedCustomer.receiverCurrency)}</span>
                      </div>
                      <div className="flex justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <span className="text-gray-500">{t.rate}:</span>
                        <span className="font-medium">1 {selectedCustomer.senderCurrency} = {selectedCustomer.exchangeRate} {selectedCustomer.receiverCurrency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sender Details */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <Mail size={16} className="mr-2 text-blue-600" />
                      {t.senderDetails}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">{t.page}:</span> {selectedCustomer.senderEmail}</p>
                      <p><span className="text-gray-500">{t.phone}:</span> {selectedCustomer.senderPhone}</p>
                      <p><span className="text-gray-500">{t.currency}:</span> {selectedCustomer.senderCurrency}</p>
                      <p><span className="text-gray-500">{t.addressLine1}:</span> {selectedCustomer.senderAddress}</p>
                      <p><span className="text-gray-500">{t.city}/{t.country}:</span> {selectedCustomer.senderCity}, {selectedCustomer.senderCountry}</p>
                    </div>
                  </div>

                  {/* Receiver Details */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <Mail size={16} className="mr-2 text-red-600" />
                      {t.receiverDetails}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">{t.page}:</span> {selectedCustomer.receiverEmail}</p>
                      <p><span className="text-gray-500">{t.phone}:</span> {selectedCustomer.receiverPhone}</p>
                      <p><span className="text-gray-500">{t.currency}:</span> {selectedCustomer.receiverCurrency}</p>
                      <p><span className="text-gray-500">{t.addressLine1}:</span> {selectedCustomer.receiverAddress}</p>
                      <p><span className="text-gray-500">{t.city}/{t.country}:</span> {selectedCustomer.receiverCity}, {selectedCustomer.receiverCountry}</p>
                    </div>
                  </div>

                  {/* Fees Breakdown */}
                  <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <Receipt size={16} className="mr-2 text-green-600" />
                      {t.feesBreakdown} (in {selectedCustomer.receiverCurrency})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500">{t.commission}</p>
                        <p className="text-lg font-bold text-gray-900">{formatAmount(selectedCustomer.commission, selectedCustomer.receiverCurrency)}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500">{t.exchangeFee}</p>
                        <p className="text-lg font-bold text-gray-900">{formatAmount(selectedCustomer.fee, selectedCustomer.receiverCurrency)}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500">{t.tax}</p>
                        <p className="text-lg font-bold text-gray-900">{formatAmount(selectedCustomer.tax, selectedCustomer.receiverCurrency)}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <span className="font-medium text-gray-900">{t.totalFeesLabel}</span>
                      <span className="font-bold text-red-600">
                        {formatAmount(
                          (selectedCustomer.commission || 0) + (selectedCustomer.fee || 0) + (selectedCustomer.tax || 0),
                          selectedCustomer.receiverCurrency
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedCustomer.notes && (
                    <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <Info size={16} className="mr-2 text-green-600" />
                        {t.notes}
                      </h4>
                      <p className="text-sm text-gray-600">{selectedCustomer.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 border-t border-gray-200" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <button
                  onClick={() => {
                    setShowModal(false);
                    handleEditCustomer(selectedCustomer);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <Edit size={16} />
                  <span>{t.edit}</span>
                </button>
                <button
                  onClick={() => setShowModal(false)}
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
      {showModal && modalType === 'delete' && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowModal(false)}
          ></div>
          
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle size={32} className="text-red-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{t.deleteTitle}</h3>
                <p className="text-gray-600 text-center mb-6">
                  {t.deleteMessage} <span className="font-semibold">{selectedCustomer.name}</span>? {t.deleteWarning}
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
                    onClick={() => setShowModal(false)}
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
};

export default CustomerRegistration;