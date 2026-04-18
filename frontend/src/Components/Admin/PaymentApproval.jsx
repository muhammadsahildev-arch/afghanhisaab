import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, Search, Filter, Plus, Edit, Trash2, Eye, X, ChevronLeft, 
  Settings, ChevronRight, Download, Mail, Phone, MapPin, Calendar, 
  Clock, CheckCircle, AlertCircle, User, Building, Globe, Copy, 
  Shield, Lock, Unlock, UserCheck, UserX, Star, Award, Briefcase, 
  DollarSign, Percent, CreditCard, Home, Bell, Menu, 
  MoreVertical, RefreshCw, ArrowUpDown, Grid3x3, List, Info, 
  AlertTriangle, Banknote, Image as ImageIcon, EyeIcon, Send, 
  Loader2, Landmark, Wallet, Receipt, ThumbsUp, ThumbsDown, ArrowLeft
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { 
  getAllPaymentProofsAction, 
  approvePaymentAction, 
  denyPaymentAction,
  clearPaymentErrors 
} from '../../actions/paymentActions';
import { APPROVE_PAYMENT_RESET, DENY_PAYMENT_RESET } from '../../constants/constants';

const PaymentApproval = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('view');
  const [approvalAction, setApprovalAction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    country: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Language translations
  const translations = {
    en: {
      backToDashboard: "Back to Dashboard",
      paymentManagement: "Payment Management",
      paymentApprovals: "Payment Approvals",
      paymentSubtitle: "Review and manage user payment submissions",
      searchPlaceholder: "Search by user or transaction...",
      pending: "Pending",
      approved: "Approved",
      denied: "Denied",
      awaitingReview: "Awaiting Review",
      successfullyVerified: "Successfully Verified",
      rejectedRequests: "Rejected Requests",
      totalAmount: "Total Amount",
      allSubmissions: "All Submissions",
      statusLabel: "Status",
      allStatus: "All Status",
      countryLabel: "Country",
      allCountries: "All Countries",
      sortByLabel: "Sort By",
      showing: "Showing",
      of: "of",
      approve: "Approve",
      deny: "Deny",
      viewDetails: "View Details",
      user: "User",
      transaction: "Transaction",
      amount: "Amount",
      submitted: "Submitted",
      status: "Status",
      actions: "Actions",
      page: "Page",
      approvalTitle: "Approve Payment",
      denialTitle: "Deny Payment",
      paymentDetails: "Payment Details",
      userInformation: "User Information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      submittedOn: "Submitted",
      country: "Country",
      transactionReference: "Transaction Reference",
      bankAccountDetails: "Bank Account Details",
      bankName: "Bank Name",
      accountNumber: "Account Number",
      iban: "IBAN",
      paymentScreenshot: "Payment Screenshot",
      approvalNotes: "Approval Notes (Optional)",
      denialReason: "Reason for Denial *",
      approvalPlaceholder: "Add any notes about this approval...",
      denialPlaceholder: "Please provide reason for denial...",
      reviewHistory: "Review History",
      statusBy: "by",
      admin: "Admin",
      cancel: "Cancel",
      close: "Close",
      processing: "Processing...",
      approvePayment: "Approve Payment",
      denyPayment: "Deny Payment",
      approvedToast: "Payment approved successfully! User account activated.",
      deniedToast: "Payment denied successfully! User notified.",
      sortOptions: {
        date: "Date",
        amount: "Amount",
        userName: "User Name"
      },
      paymentStatuses: {
        pending: "Pending",
        approved: "Approved",
        denied: "Denied"
      }
    },
    ur: {
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      paymentManagement: "ادائیگی کا نظم",
      paymentApprovals: "ادائیگی کی منظوریاں",
      paymentSubtitle: "صارفین کی ادائیگی کی گذارشات کا جائزہ لیں اور ان کا نظم کریں",
      searchPlaceholder: "صارف یا لین دین سے تلاش کریں...",
      pending: "زیر التواء",
      approved: "منظور شدہ",
      denied: "مسترد شدہ",
      awaitingReview: "زیر جائزہ",
      successfullyVerified: "کامیابی سے تصدیق شدہ",
      rejectedRequests: "مسترد درخواستیں",
      totalAmount: "کل رقم",
      allSubmissions: "تمام گذارشات",
      statusLabel: "حالت",
      allStatus: "تمام حالتیں",
      countryLabel: "ملک",
      allCountries: "تمام ممالک",
      sortByLabel: "ترتیب دیں بذریعہ",
      showing: "دکھا رہا ہے",
      of: "میں سے",
      approve: "منظور کریں",
      deny: "مسترد کریں",
      viewDetails: "تفصیلات دیکھیں",
      user: "صارف",
      transaction: "لین دین",
      amount: "رقم",
      submitted: "جمع کرایا گیا",
      status: "حالت",
      actions: "اعمال",
      page: "صفحہ",
      approvalTitle: "ادائیگی منظور کریں",
      denialTitle: "ادائیگی مسترد کریں",
      paymentDetails: "ادائیگی کی تفصیلات",
      userInformation: "صارف کی معلومات",
      name: "نام",
      email: "ای میل",
      phone: "فون",
      submittedOn: "جمع کرایا گیا",
      country: "ملک",
      transactionReference: "لین دین کا حوالہ",
      bankAccountDetails: "بینک اکاؤنٹ کی تفصیلات",
      bankName: "بینک کا نام",
      accountNumber: "اکاؤنٹ نمبر",
      iban: "آئی بی اے این",
      paymentScreenshot: "ادائیگی کا اسکرین شاٹ",
      approvalNotes: "منظوری کے نوٹس (اختیاری)",
      denialReason: "مسترد کرنے کی وجہ *",
      approvalPlaceholder: "اس منظوری کے بارے میں کوئی نوٹ شامل کریں...",
      denialPlaceholder: "براہ کرم مسترد کرنے کی وجہ بتائیں...",
      reviewHistory: "جائزے کی تاریخ",
      statusBy: "بذریعہ",
      admin: "ایڈمن",
      cancel: "منسوخ کریں",
      close: "بند کریں",
      processing: "پروسیسنگ...",
      approvePayment: "ادائیگی منظور کریں",
      denyPayment: "ادائیگی مسترد کریں",
      approvedToast: "ادائیگی کامیابی سے منظور ہوگئی! صارف کا اکاؤنٹ فعال کر دیا گیا۔",
      deniedToast: "ادائیگی کامیابی سے مسترد کردی گئی! صارف کو مطلع کر دیا گیا۔",
      sortOptions: {
        date: "تاریخ",
        amount: "رقم",
        userName: "صارف کا نام"
      },
      paymentStatuses: {
        pending: "زیر التواء",
        approved: "منظور شدہ",
        denied: "مسترد شدہ"
      }
    },
    ps: {
      backToDashboard: "بیرته ډشبورډ ته",
      paymentManagement: "د تادیاتو مدیریت",
      paymentApprovals: "د تادیاتو تصویبونه",
      paymentSubtitle: "د کاروونکو د تادیاتو سپارښتنې بیاکتنه او مدیریت کړئ",
      searchPlaceholder: "د کارونکي یا راکړې ورکړې له مخې وپلټئ...",
      pending: "په انتظار کې",
      approved: "منظور شوی",
      denied: "رد شوی",
      awaitingReview: "په بیاکتنه کې",
      successfullyVerified: "په بریالیتوب سره تایید شوی",
      rejectedRequests: "رد شوي غوښتنې",
      totalAmount: "ټوله اندازه",
      allSubmissions: "ټولې سپارښتنې",
      statusLabel: "حالت",
      allStatus: "ټول حالتونه",
      countryLabel: "هیواد",
      allCountries: "ټول هیوادونه",
      sortByLabel: "ترتیب په",
      showing: "ښکاره کول",
      of: "د",
      approve: "منظور کړئ",
      deny: "رد کړئ",
      viewDetails: "توضیحات وګورئ",
      user: "کارونکی",
      transaction: "راکړه ورکړه",
      amount: "اندازه",
      submitted: "سپارل شوی",
      status: "حالت",
      actions: "کړنې",
      page: "پاڼه",
      approvalTitle: "تادیه منظور کړئ",
      denialTitle: "تادیه رد کړئ",
      paymentDetails: "د تادیاتو توضیحات",
      userInformation: "د کارونکي معلومات",
      name: "نوم",
      email: "بریښنالیک",
      phone: "تلیفون",
      submittedOn: "سپارل شوی",
      country: "هیواد",
      transactionReference: "د راکړې ورکړې حواله",
      bankAccountDetails: "د بانک حساب توضیحات",
      bankName: "د بانک نوم",
      accountNumber: "د حساب شمېره",
      iban: "IBAN",
      paymentScreenshot: "د تادیاتو سکرین شاټ",
      approvalNotes: "د تصویب یادښتونه (اختیاري)",
      denialReason: "د رد کیدو لامل *",
      approvalPlaceholder: "د دې تصویب په اړه کوم یادښتونه اضافه کړئ...",
      denialPlaceholder: "مهرباني وکړئ د رد کیدو لامل وړاندې کړئ...",
      reviewHistory: "د بیاکتنې تاریخ",
      statusBy: "لخوا",
      admin: "مدیر",
      cancel: "لغوه کړئ",
      close: "تړل",
      processing: "پروسه روانه ده...",
      approvePayment: "تادیه منظور کړئ",
      denyPayment: "تادیه رد کړئ",
      approvedToast: "تادیه په بریالیتوب سره تصویب شوه! د کارونکي حساب فعال شو.",
      deniedToast: "تادیه په بریالیتوب سره رد شوه! کارونکي ته خبر ورکړل شو.",
      sortOptions: {
        date: "نیټه",
        amount: "اندازه",
        userName: "د کارونکي نوم"
      },
      paymentStatuses: {
        pending: "په انتظار کې",
        approved: "منظور شوی",
        denied: "رد شوی"
      }
    },
    fa: {
      backToDashboard: "بازگشت به داشبورد",
      paymentManagement: "مدیریت پرداخت",
      paymentApprovals: "تاییدیه‌های پرداخت",
      paymentSubtitle: "بررسی و مدیریت درخواست‌های پرداخت کاربران",
      searchPlaceholder: "جستجو بر اساس کاربر یا تراکنش...",
      pending: "در انتظار",
      approved: "تایید شده",
      denied: "رد شده",
      awaitingReview: "در انتظار بررسی",
      successfullyVerified: "تایید شده با موفقیت",
      rejectedRequests: "درخواست‌های رد شده",
      totalAmount: "مجموع مبلغ",
      allSubmissions: "تمام درخواست‌ها",
      statusLabel: "وضعیت",
      allStatus: "همه وضعیت‌ها",
      countryLabel: "کشور",
      allCountries: "همه کشورها",
      sortByLabel: "مرتب سازی بر اساس",
      showing: "نمایش",
      of: "از",
      approve: "تایید",
      deny: "رد",
      viewDetails: "مشاهده جزئیات",
      user: "کاربر",
      transaction: "تراکنش",
      amount: "مبلغ",
      submitted: "ارسال شده",
      status: "وضعیت",
      actions: "عملیات",
      page: "صفحه",
      approvalTitle: "تایید پرداخت",
      denialTitle: "رد پرداخت",
      paymentDetails: "جزئیات پرداخت",
      userInformation: "اطلاعات کاربر",
      name: "نام",
      email: "ایمیل",
      phone: "تلفن",
      submittedOn: "ارسال شده در",
      country: "کشور",
      transactionReference: "مرجع تراکنش",
      bankAccountDetails: "جزئیات حساب بانکی",
      bankName: "نام بانک",
      accountNumber: "شماره حساب",
      iban: "شماره شبا",
      paymentScreenshot: "اسکرین شات پرداخت",
      approvalNotes: "یادداشت‌های تایید (اختیاری)",
      denialReason: "دلیل رد *",
      approvalPlaceholder: "هر یادداشتی درباره این تایید اضافه کنید...",
      denialPlaceholder: "لطفاً دلیل رد را ارائه دهید...",
      reviewHistory: "تاریخچه بررسی",
      statusBy: "توسط",
      admin: "مدیر",
      cancel: "لغو",
      close: "بستن",
      processing: "در حال پردازش...",
      approvePayment: "تایید پرداخت",
      denyPayment: "رد پرداخت",
      approvedToast: "پرداخت با موفقیت تایید شد! حساب کاربر فعال شد.",
      deniedToast: "پرداخت با موفقیت رد شد! به کاربر اطلاع داده شد.",
      sortOptions: {
        date: "تاریخ",
        amount: "مبلغ",
        userName: "نام کاربر"
      },
      paymentStatuses: {
        pending: "در انتظار",
        approved: "تایید شده",
        denied: "رد شده"
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

  // Redux state
  const { payments, loading, total, pages } = useSelector((state) => state.allPaymentProofs || { payments: [] });
  const { loading: approveLoading, success: approveSuccess } = useSelector((state) => state.approvePayment || {});
  const { loading: denyLoading, success: denySuccess } = useSelector((state) => state.denyPayment || {});

  // Fetch payments on component mount and when filters change
  useEffect(() => {
    fetchPayments();
  }, [currentPage, filters.status]);

  const fetchPayments = () => {
    dispatch(getAllPaymentProofsAction(currentPage, itemsPerPage, filters.status));
  };

  // Handle approve success
  useEffect(() => {
    if (approveSuccess) {
      setIsProcessing(false);
      setShowModal(false);
      setSelectedPayment(null);
      setApprovalAction(null);
      fetchPayments(); // Refresh the list
      toast.success(t.approvedToast);
      dispatch({ type: APPROVE_PAYMENT_RESET });
    }
  }, [approveSuccess, dispatch, t]);

  // Handle deny success
  useEffect(() => {
    if (denySuccess) {
      setIsProcessing(false);
      setShowModal(false);
      setSelectedPayment(null);
      setApprovalAction(null);
      fetchPayments(); // Refresh the list
      toast.success(t.deniedToast);
      dispatch({ type: DENY_PAYMENT_RESET });
    }
  }, [denySuccess, dispatch, t]);

  // Stats calculations from fetched data
  const pendingCount = payments?.filter(r => r.status === 'pending').length || 0;
  const approvedCount = payments?.filter(r => r.status === 'approved').length || 0;
  const deniedCount = payments?.filter(r => r.status === 'denied').length || 0;
  const totalAmount = payments?.reduce((sum, r) => sum + (r.amount || 0), 0) || 0;

  // Filter and sort payments
  const filteredRequests = (payments || []).filter(req => {
    const matchesSearch = 
      req.userName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      req.userEmail?.toLowerCase().includes(filters.search.toLowerCase()) ||
      req.transactionReference?.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCountry = !filters.country || req.country === filters.country;
    
    return matchesSearch && matchesCountry;
  });

  // Sort requests
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    let comparison = 0;
    switch(filters.sortBy) {
      case 'date':
        comparison = new Date(b.submittedAt) - new Date(a.submittedAt);
        break;
      case 'amount':
        comparison = (b.amount || 0) - (a.amount || 0);
        break;
      case 'name':
        comparison = (a.userName || '').localeCompare(b.userName || '');
        break;
      default:
        comparison = 0;
    }
    return filters.sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    navigate('/system-admin-dashboard');
  };

  const handleApproveDeny = (request, action) => {
    setSelectedPayment(request);
    setApprovalAction(action);
    setModalType('approve');
    setShowModal(true);
  };

  const handleViewDetails = (request) => {
    setSelectedPayment(request);
    setModalType('view');
    setShowModal(true);
  };

  const processApproval = async (notes) => {
    if (!selectedPayment) return;
    
    setIsProcessing(true);
    
    if (approvalAction === 'approved') {
      await dispatch(approvePaymentAction(selectedPayment.userId, notes));
    } else {
      await dispatch(denyPaymentAction(selectedPayment.userId, notes));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'approved': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'denied': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock size={14} className="text-yellow-500" />;
      case 'approved': return <CheckCircle size={14} className="text-green-500" />;
      case 'denied': return <X size={14} className="text-red-500" />;
      default: return <AlertCircle size={14} className="text-gray-400" />;
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  };

  // Bank details mapping based on country
  const getBankDetails = (country) => {
    if (country === 'Pakistan') {
      return {
        bankName: 'United Bank Limited (UBL)',
        accountNo: '0092032983293828',
        iban: 'PK12UBLP0092032983293828'
      };
    } else if (country === 'Afghanistan') {
      return {
        bankName: 'Afghanistan International Bank (AIB)',
        accountNo: '0092032983293828',
        iban: 'AF1243483948342323'
      };
    } else {
      return {
        bankName: 'Not specified',
        accountNo: 'N/A',
        iban: 'N/A'
      };
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Content */}
      <main className="transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header with Back Button */}
          <div className="mb-6 sm:mb-8">
            {/* Back to Dashboard Button */}
            <button
              onClick={handleBackToDashboard}
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors mb-4 group"
              style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>{t.backToDashboard}</span>
            </button>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs sm:text-sm font-medium text-green-500">{t.paymentManagement}</span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{t.paymentApprovals}</h1>
                <p className="text-sm text-gray-400 mt-1">{t.paymentSubtitle}</p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <div className="relative">
                  <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                  <input 
                    type="text" 
                    value={filters.search} 
                    onChange={(e) => setFilters({...filters, search: e.target.value})} 
                    placeholder={t.searchPlaceholder} 
                    className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 w-full sm:w-64 text-sm sm:text-base`} 
                  />
                </div>
                <button onClick={fetchPayments} className="p-2 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700">
                  <RefreshCw size={18} className="text-gray-400" />
                </button>
                <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                  <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                    <Grid3x3 size={16} className={viewMode === 'grid' ? 'text-green-500' : 'text-gray-400'} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                    <List size={16} className={viewMode === 'list' ? 'text-green-500' : 'text-gray-400'} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">{t.pending}</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{pendingCount}</p>
              <p className="text-xs text-gray-400 mt-1">{t.awaitingReview}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{t.approved}</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{approvedCount}</p>
              <p className="text-xs text-gray-400 mt-1">{t.successfullyVerified}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                <span className="text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded-full">{t.denied}</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{deniedCount}</p>
              <p className="text-xs text-gray-400 mt-1">{t.rejectedRequests}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{t.totalAmount}</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{totalAmount.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">{t.allSubmissions}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.statusLabel}</label>
                <select 
                  value={filters.status} 
                  onChange={(e) => setFilters({...filters, status: e.target.value, currentPage: 1})} 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                >
                  <option value="">{t.allStatus}</option>
                  <option value="pending">{t.pending}</option>
                  <option value="approved">{t.approved}</option>
                  <option value="denied">{t.denied}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.countryLabel}</label>
                <select 
                  value={filters.country} 
                  onChange={(e) => setFilters({...filters, country: e.target.value})} 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                >
                  <option value="">{t.allCountries}</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Afghanistan">Afghanistan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.sortByLabel}</label>
                <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <select 
                    value={filters.sortBy} 
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})} 
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                  >
                    <option value="date">{t.sortOptions.date}</option>
                    <option value="amount">{t.sortOptions.amount}</option>
                    <option value="name">{t.sortOptions.userName}</option>
                  </select>
                  <button 
                    onClick={() => setFilters({...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'})} 
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600"
                  >
                    <ArrowUpDown size={16} className="text-gray-300" />
                  </button>
                </div>
              </div>
              <div className="flex items-end">
                <p className="text-sm text-gray-400">{t.showing} {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedRequests.length)} {t.of} {sortedRequests.length}</p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-green-500" />
            </div>
          ) : (
            <>
              {/* Payment Requests Grid */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {currentItems.map((request) => (
                    <div key={request.id || request.userId} className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700 hover:border-green-500/30 transition-all">
                      <div className="flex items-start justify-between mb-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <div className="flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg">
                            {request.userName?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-sm sm:text-base">{request.userName}</h3>
                            <p className="text-xs text-gray-400">#{request.transactionReference?.slice(-8)}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}{t.paymentStatuses[request.status] || request.status}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-400" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <Mail size={12} className={`${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
                          <span className="truncate">{request.userEmail}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <Globe size={12} className={`${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
                          <span>{request.country}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <DollarSign size={12} className={`${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
                          <span className="text-green-500 font-medium">{request.amount} {request.currency}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <Calendar size={12} className={`${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
                          <span>{formatDate(request.submittedAt)}</span>
                        </div>
                      </div>
                      {request.status === 'pending' && (
                        <div className="flex space-x-2 mt-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <button 
                            onClick={() => handleApproveDeny(request, 'approved')} 
                            className="flex-1 p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 flex items-center justify-center gap-1 text-xs sm:text-sm"
                          >
                            <CheckCircle size={14} />
                            <span>{t.approve}</span>
                          </button>
                          <button 
                            onClick={() => handleApproveDeny(request, 'denied')} 
                            className="flex-1 p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 flex items-center justify-center gap-1 text-xs sm:text-sm"
                          >
                            <X size={14} />
                            <span>{t.deny}</span>
                          </button>
                          <button 
                            onClick={() => handleViewDetails(request)} 
                            className="p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30"
                          >
                            <Eye size={14} />
                          </button>
                        </div>
                      )}
                      {request.status !== 'pending' && (
                        <button 
                          onClick={() => handleViewDetails(request)} 
                          className="w-full mt-4 p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 flex items-center justify-center gap-1 text-xs sm:text-sm"
                        >
                          <Eye size={14} />
                          <span>{t.viewDetails}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-700/50 border-b border-gray-600">
                      <tr>
                        <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.user}</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.transaction}</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.amount}</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.submitted}</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.status}</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {currentItems.map((request) => (
                        <tr key={request.id || request.userId} className="hover:bg-gray-700/50">
                          <td className="px-4 sm:px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-white">{request.userName}</p>
                              <p className="text-xs text-gray-400">{request.userEmail}</p>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <p className="text-sm text-gray-300 font-mono">{request.transactionReference}</p>
                            <p className="text-xs text-gray-500">{request.country}</p>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="text-sm font-medium text-green-500">{request.amount} {request.currency}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-300">{formatDate(request.submittedAt)}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                              {getStatusIcon(request.status)}{t.paymentStatuses[request.status] || request.status}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                              {request.status === 'pending' && (
                                <>
                                  <button onClick={() => handleApproveDeny(request, 'approved')} className="p-1 hover:bg-green-500/20 rounded">
                                    <CheckCircle size={16} className="text-green-500" />
                                  </button>
                                  <button onClick={() => handleApproveDeny(request, 'denied')} className="p-1 hover:bg-red-500/20 rounded">
                                    <X size={16} className="text-red-500" />
                                  </button>
                                </>
                              )}
                              <button onClick={() => handleViewDetails(request)} className="p-1 hover:bg-blue-500/20 rounded">
                                <Eye size={16} className="text-blue-500" />
                              </button>
                            </div>
                           </td>
                         </tr>
                      ))}
                    </tbody>
                   </table>
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="text-sm text-gray-400">{t.page} {currentPage} {t.of} {totalPages}</div>
              <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  disabled={currentPage === 1} 
                  className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                >
                  <ChevronLeft size={16} className="text-gray-400" />
                </button>
                {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentPage(i + 1)} 
                    className={`w-8 h-8 rounded-lg text-sm font-medium ${
                      currentPage === i + 1 
                        ? 'bg-gradient-to-r from-green-500 to-red-500 text-white' 
                        : 'bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                  disabled={currentPage === totalPages} 
                  className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                >
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
{/* Approval/View Modal */}
{showModal && selectedPayment && (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
    <div className="flex min-h-full items-center justify-center p-4">
      <div className="relative transform overflow-hidden rounded-3xl bg-gray-800 text-left shadow-2xl w-full max-w-3xl border border-gray-700 mx-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={`${modalType === 'approve' ? 'bg-gradient-to-r from-green-600 to-red-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'} px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10`}>
          <h3 className="text-base sm:text-lg font-semibold text-white flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            {modalType === 'approve' ? (approvalAction === 'approved' ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> : <X className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />) : <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
            {modalType === 'approve' 
              ? (approvalAction === 'approved' ? t.approvalTitle : t.denialTitle) 
              : t.paymentDetails}
          </h3>
          <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-6">
          {/* User Info */}
          <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">{t.userInformation}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">{t.name}</p>
                <p className="text-white font-medium break-words">{selectedPayment.userName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{t.email}</p>
                <p className="text-white break-words">{selectedPayment.userEmail}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{t.phone}</p>
                <p className="text-white">{selectedPayment.userPhone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{t.submittedOn}</p>
                <p className="text-white">{formatDate(selectedPayment.submittedAt)}</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">{t.paymentDetails}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">{t.country}</p>
                <p className="text-white">{selectedPayment.country}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{t.amount}</p>
                <p className="text-green-500 font-bold">{selectedPayment.amount} {selectedPayment.currency}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-400">{t.transactionReference}</p>
                <p className="text-white font-mono break-all">{selectedPayment.transactionReference}</p>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <Landmark className="w-4 h-4 mr-2 text-green-500" />
              {t.bankAccountDetails}
            </h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-400">{t.bankName}</p>
                <p className="text-white">{getBankDetails(selectedPayment.country).bankName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{t.accountNumber}</p>
                <p className="text-white font-mono">{getBankDetails(selectedPayment.country).accountNo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{t.iban}</p>
                <p className="text-white font-mono text-sm break-all">{getBankDetails(selectedPayment.country).iban}</p>
              </div>
            </div>
          </div>

          {/* Screenshot */}
          {selectedPayment.screenshot && (
            <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <ImageIcon className="w-4 h-4 mr-2 text-green-500" />
                {t.paymentScreenshot}
              </h4>
              <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-900">
                <img 
                  src={`http://localhost:5000/${selectedPayment.screenshot}`} 
                  alt="Payment Screenshot" 
                  className="w-full max-h-64 object-contain" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
              </div>
            </div>
          )}

          {/* Review Notes */}
          {modalType === 'approve' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {approvalAction === 'approved' ? t.approvalNotes : t.denialReason}
              </label>
              <textarea 
                id="reviewNotes" 
                rows="3" 
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-green-500 text-sm" 
                placeholder={approvalAction === 'approved' ? t.approvalPlaceholder : t.denialPlaceholder}
              ></textarea>
            </div>
          )}

          {/* Status History */}
          {selectedPayment.status !== 'pending' && selectedPayment.notes && (
            <div className="bg-gray-700/50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-white mb-3">{t.reviewHistory}</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  {selectedPayment.status === 'approved' ? <CheckCircle size={16} className="text-green-500" /> : <X size={16} className="text-red-500" />}
                  <span className="text-white">{t.status}: <span className={`${selectedPayment.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>{t.paymentStatuses[selectedPayment.status] || selectedPayment.status}</span></span>
                  <span className="text-xs text-gray-500">{t.statusBy} {selectedPayment.reviewedBy || t.admin} {t.at} {formatDate(selectedPayment.reviewedAt)}</span>
                </div>
                {selectedPayment.notes && <p className="text-sm text-gray-300 mt-2 p-3 bg-gray-800 rounded-lg break-words">{selectedPayment.notes}</p>}
              </div>
            </div>
          )}
        </div>
        <div className="bg-gray-700/50 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-end gap-3 sticky bottom-0 border-t border-gray-600">
          {modalType === 'approve' ? (
            <>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 order-2 sm:order-1">
                {t.cancel}
              </button>
              <button 
                onClick={() => processApproval(document.getElementById('reviewNotes')?.value)} 
                disabled={isProcessing || approveLoading || denyLoading} 
                className={`px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2 order-1 sm:order-2 ${approvalAction === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {(isProcessing || approveLoading || denyLoading) ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />{t.processing}</>
                ) : (
                  <>{approvalAction === 'approved' ? <ThumbsUp size={16} /> : <ThumbsDown size={16} />}{approvalAction === 'approved' ? t.approvePayment : t.denyPayment}</>
                )}
              </button>
            </>
          ) : (
            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              {t.close}
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default PaymentApproval;