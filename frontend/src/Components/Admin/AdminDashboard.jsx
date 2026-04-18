import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, Users, FileText, Settings, Zap, LogOut, Bell, Search, Menu, X,
  DollarSign, Euro, Wallet, TrendingUp, TrendingDown, RefreshCw, Download,
  Calendar, Eye, EyeOff, ChevronRight, PieChart, Clock, CheckCircle,
  AlertCircle, Shield, User, Phone, Mail, MapPin, CreditCard, MoreVertical,
  Server, Database, Activity, Cpu, HardDrive, Globe, Key, Fingerprint,
  UserCog, Briefcase, Building, Landmark, BarChart3, Award, Sparkles,
  Lock, Unlock, UsersRound, Store, ShoppingCart, Truck, Package, Box,
  Layers, GitBranch, Cloud, Wifi, Power, Sliders, Filter, Copy, Trash2,
  Edit, Plus, Minus, Check, X as XIcon, AlertTriangle, Info, HelpCircle,
  BookOpen, GraduationCap, Headphones, MessageCircle, Share2, Printer,
  Upload, Link as LinkIcon, ExternalLink, Banknote, Image as ImageIcon,
  EyeIcon, Send, Loader2, Grid3x3, LayoutDashboard,
  Sparkles as SparklesIcon
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { 
  getAllPaymentProofsAction,
  approvePaymentAction,
  denyPaymentAction,
  clearPaymentErrors
} from '../../actions/paymentActions';
import { systemAdminGetAllUsersAction } from '../../actions/systemAdminActions';
import { logoutUserAction } from '../../actions/authActions';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [approvalAction, setApprovalAction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Redux state
  const { payments = [], loading: paymentsLoading } = useSelector((state) => state.allPaymentProofs || { payments: [] });
  const { users = [], loading: usersLoading } = useSelector((state) => state.systemAdminAllUsers || { users: [] });
  const { loading: approveLoading, success: approveSuccess } = useSelector((state) => state.approvePayment || {});
  const { loading: denyLoading, success: denySuccess } = useSelector((state) => state.denyPayment || {});
  const { user: currentUser } = useSelector((state) => state.loginUser);

  // Language translations
  const translations = {
    en: {
      // Header
      adminDashboard: "Admin Dashboard",
      systemAdministration: "System Administration",
      adminDesc: "Monitor and manage your entire platform",
      logout: "Logout",
      superAdmin: "Super Admin",
      administrator: "Administrator",
      
      // Stats
      totalShops: "Total Shops",
      totalUsers: "Total Users",
      pendingApprovals: "Pending Approvals",
      approvedPayments: "Approved Payments",
      systemUptime: "System Uptime",
      activeSessions: "Active Sessions",
      stable: "Stable",
      
      // Payment Requests
      paymentApprovalRequests: "Payment Approval Requests",
      paymentDesc: "Review and manage user payment submissions",
      user: "User",
      country: "Country",
      amount: "Amount",
      transactionRef: "Transaction Ref",
      submitted: "Submitted",
      status: "Status",
      actions: "Actions",
      approve: "Approve",
      deny: "Deny",
      noPendingPayments: "No pending payment requests",
      
      // Review Modal
      reviewPaymentRequest: "Review Payment Request",
      reviewDesc: "Verify payment details and approve or deny",
      userInformation: "User Information",
      name: "Name",
      email: "Email",
      submittedLabel: "Submitted",
      paymentDetails: "Payment Details",
      paymentScreenshot: "Payment Screenshot",
      approvalNotes: "Approval Notes (Optional)",
      denialReason: "Reason for Denial *",
      approvalPlaceholder: "Add any notes about this approval...",
      denialPlaceholder: "Please provide reason for denial...",
      cancel: "Cancel",
      approvePayment: "Approve Payment",
      denyPayment: "Deny Payment",
      processing: "Processing...",
      
      // Shops Section
      recentShops: "Recent Shops",
      viewAll: "View All",
      shopName: "Shop Name",
      owner: "Owner",
      location: "Location",
      volume: "Volume",
      noShopsFound: "No shops found",
      
      // System Activity
      systemActivity: "System Activity",
      
      // Currency Rates
      currencyRates: "Currency Rates",
      volumeLabel: "Volume",
      
      // Notifications
      notifications: "Notifications",
      
      // Quick Actions
      quickActions: "Quick Actions",
      manageUsers: "Manage Users",
      paymentApprovals: "Payment Approvals",
      systemSettings: "System Settings",
      
      // Alerts
      highCpuAlert: "High CPU usage detected on main server",
      maintenanceAlert: "Scheduled maintenance in 2 hours",
      backupAlert: "Database backup completed successfully",
      failedLoginAlert: "Failed login attempts from IP 192.168.1.100",
      
      // Success Messages
      paymentApproved: "Payment approved successfully! User account activated.",
      paymentDenied: "Payment denied successfully! User notified.",
      logoutSuccess: "Logged out successfully",
      
      // Errors
      denialReasonRequired: "Please provide a reason for denial",
      imageNotFound: "Image Not Found"
    },
    ur: {
      adminDashboard: "ایڈمن ڈیش بورڈ",
      systemAdministration: "سسٹم ایڈمنسٹریشن",
      adminDesc: "اپنے پورے پلیٹ فارم کی نگرانی اور انتظام کریں",
      logout: "لاگ آؤٹ",
      superAdmin: "سپر ایڈمن",
      administrator: "ایڈمنسٹریٹر",
      
      totalShops: "کل دکانیں",
      totalUsers: "کل صارفین",
      pendingApprovals: "زیر التواء منظوریاں",
      approvedPayments: "منظور شدہ ادائیگیاں",
      systemUptime: "سسٹم اپ ٹائم",
      activeSessions: "فعال سیشنز",
      stable: "مستحکم",
      
      paymentApprovalRequests: "ادائیگی کی منظوری کی درخواستیں",
      paymentDesc: "صارفین کی ادائیگی کی جمع کرائیاں دیکھیں اور ان کا نظم کریں",
      user: "صارف",
      country: "ملک",
      amount: "رقم",
      transactionRef: "ٹرانزیکشن حوالہ",
      submitted: "جمع کرایا گیا",
      status: "حالت",
      actions: "اعمال",
      approve: "منظور کریں",
      deny: "مسترد کریں",
      noPendingPayments: "کوئی زیر التواء ادائیگی کی درخواست نہیں",
      
      reviewPaymentRequest: "ادائیگی کی درخواست کا جائزہ لیں",
      reviewDesc: "ادائیگی کی تفصیلات کی تصدیق کریں اور منظور یا مسترد کریں",
      userInformation: "صارف کی معلومات",
      name: "نام",
      email: "ای میل",
      submittedLabel: "جمع کرایا گیا",
      paymentDetails: "ادائیگی کی تفصیلات",
      paymentScreenshot: "ادائیگی کا اسکرین شاٹ",
      approvalNotes: "منظوری کے نوٹس (اختیاری)",
      denialReason: "مسترد کرنے کی وجہ *",
      approvalPlaceholder: "اس منظوری کے بارے میں کوئی نوٹ شامل کریں...",
      denialPlaceholder: "براہ کرم مسترد کرنے کی وجہ بتائیں...",
      cancel: "منسوخ کریں",
      approvePayment: "ادائیگی منظور کریں",
      denyPayment: "ادائیگی مسترد کریں",
      processing: "کارروائی ہو رہی ہے...",
      
      recentShops: "حالیہ دکانیں",
      viewAll: "سب دیکھیں",
      shopName: "دکان کا نام",
      owner: "مالک",
      location: "مقام",
      volume: "حجم",
      noShopsFound: "کوئی دکان نہیں ملی",
      
      systemActivity: "سسٹم کی سرگرمی",
      
      currencyRates: "کرنسی کی شرحیں",
      volumeLabel: "حجم",
      
      notifications: "اطلاعات",
      
      quickActions: "فوری اعمال",
      manageUsers: "صارفین کا نظم کریں",
      paymentApprovals: "ادائیگی کی منظوریاں",
      systemSettings: "سسٹم کی ترتیبات",
      
      highCpuAlert: "مین سرور پر ہائی CPU استعمال کا پتہ چلا",
      maintenanceAlert: "2 گھنٹے میں طے شدہ دیکھ بھال",
      backupAlert: "ڈیٹابیس بیک اپ کامیابی سے مکمل ہوگیا",
      failedLoginAlert: "IP 192.168.1.100 سے لاگ ان کی ناکام کوششیں",
      
      paymentApproved: "ادائیگی کامیابی سے منظور ہوگئی! صارف کا اکاؤنٹ فعال کر دیا گیا۔",
      paymentDenied: "ادائیگی کامیابی سے مسترد ہوگئی! صارف کو مطلع کر دیا گیا۔",
      logoutSuccess: "کامیابی سے لاگ آؤٹ ہوگیا",
      
      denialReasonRequired: "براہ کرم مسترد کرنے کی وجہ بتائیں",
      imageNotFound: "تصویر نہیں ملی"
    },
    ps: {
      adminDashboard: "مدیر ډشبورډ",
      systemAdministration: "سیسټم مدیریت",
      adminDesc: "خپل ټول پلیټ فارم وڅارئ او اداره کړئ",
      logout: "وتل",
      superAdmin: "لوی مدیر",
      administrator: "مدیر",
      
      totalShops: "ټول پلورنځي",
      totalUsers: "ټول کاروونکي",
      pendingApprovals: "ځنډول شوي تصویبونه",
      approvedPayments: "تصویب شوي تادیات",
      systemUptime: "سیسټم اپ ټایم",
      activeSessions: "فعال غونډې",
      stable: "مستحکم",
      
      paymentApprovalRequests: "د تادیې تصویب غوښتنې",
      paymentDesc: "د کاروونکو د تادیې سپارنې وګورئ او اداره یې کړئ",
      user: "کارونکی",
      country: "هیواد",
      amount: "اندازه",
      transactionRef: "د راکړې ورکړې حواله",
      submitted: "سپارل شوی",
      status: "حالت",
      actions: "کړنې",
      approve: "تصویب کړئ",
      deny: "رد کړئ",
      noPendingPayments: "د تادیې ځنډول شوې غوښتنې نشته",
      
      reviewPaymentRequest: "د تادیې غوښتنه بیاکتنه",
      reviewDesc: "د تادیې جزئیات تایید کړئ او تصویب یا رد کړئ",
      userInformation: "د کارونکي معلومات",
      name: "نوم",
      email: "بریښنالیک",
      submittedLabel: "سپارل شوی",
      paymentDetails: "د تادیې جزئیات",
      paymentScreenshot: "د تادیې سکرین شاټ",
      approvalNotes: "د تصویب یادښتونه (اختیاري)",
      denialReason: "د رد کیدو دلیل *",
      approvalPlaceholder: "د دې تصویب په اړه کوم یادښتونه اضافه کړئ...",
      denialPlaceholder: "مهرباني وکړئ د رد کیدو دلیل ورکړئ...",
      cancel: "لغوه کړئ",
      approvePayment: "تادیه تصویب کړئ",
      denyPayment: "تادیه رد کړئ",
      processing: "پرمختګ کې دی...",
      
      recentShops: "وروستي پلورنځي",
      viewAll: "ټول وګورئ",
      shopName: "د پلورنځي نوم",
      owner: "مالک",
      location: "موقعیت",
      volume: "حجم",
      noShopsFound: "هیڅ پلورنځی ونه موندل شو",
      
      systemActivity: "د سیسټم فعالیت",
      
      currencyRates: "د اسعارو نرخونه",
      volumeLabel: "حجم",
      
      notifications: "خبرتیاوې",
      
      quickActions: "چټک کړنې",
      manageUsers: "کاروونکي اداره کړئ",
      paymentApprovals: "د تادیې تصویبونه",
      systemSettings: "د سیسټم ترتیبات",
      
      highCpuAlert: "په اصلي سرور کې د CPU لوړ استعمال کشف شو",
      maintenanceAlert: "په 2 ساعتونو کې ټاکل شوی ساتنه",
      backupAlert: "د ډیټابیس بیک اپ بریالی شو",
      failedLoginAlert: "د IP 192.168.1.100 څخه د ننوتلو ناکامې هڅې",
      
      paymentApproved: "تادیه بریالیتوب سره تصویب شوه! د کارونکي حساب فعال شو.",
      paymentDenied: "تادیه بریالیتوب سره رد شوه! کارونکي ته خبر ورکړل شو.",
      logoutSuccess: "بریالی وتل",
      
      denialReasonRequired: "مهرباني وکړئ د رد کیدو دلیل ورکړئ",
      imageNotFound: "انځور ونه موندل شو"
    },
    fa: {
      adminDashboard: "داشبورد مدیر",
      systemAdministration: "مدیریت سیستم",
      adminDesc: "پلتفرم خود را نظارت و مدیریت کنید",
      logout: "خروج",
      superAdmin: "مدیر ارشد",
      administrator: "مدیر",
      
      totalShops: "کل فروشگاه‌ها",
      totalUsers: "کل کاربران",
      pendingApprovals: "تأییدهای در انتظار",
      approvedPayments: "پرداخت‌های تأیید شده",
      systemUptime: "زمان فعالیت سیستم",
      activeSessions: "نشست‌های فعال",
      stable: "پایدار",
      
      paymentApprovalRequests: "درخواست‌های تأیید پرداخت",
      paymentDesc: "ارسال‌های پرداخت کاربران را بررسی و مدیریت کنید",
      user: "کاربر",
      country: "کشور",
      amount: "مبلغ",
      transactionRef: "مرجع تراکنش",
      submitted: "ارسال شده",
      status: "وضعیت",
      actions: "عملیات",
      approve: "تأیید",
      deny: "رد",
      noPendingPayments: "هیچ درخواست پرداخت در انتظاری وجود ندارد",
      
      reviewPaymentRequest: "بررسی درخواست پرداخت",
      reviewDesc: "جزئیات پرداخت را تأیید کنید و تأیید یا رد کنید",
      userInformation: "اطلاعات کاربر",
      name: "نام",
      email: "ایمیل",
      submittedLabel: "ارسال شده",
      paymentDetails: "جزئیات پرداخت",
      paymentScreenshot: "اسکرین شات پرداخت",
      approvalNotes: "یادداشت‌های تأیید (اختیاری)",
      denialReason: "دلیل رد *",
      approvalPlaceholder: "هر یادداشتی درباره این تأیید اضافه کنید...",
      denialPlaceholder: "لطفاً دلیل رد را ارائه دهید...",
      cancel: "لغو",
      approvePayment: "تأیید پرداخت",
      denyPayment: "رد پرداخت",
      processing: "در حال پردازش...",
      
      recentShops: "فروشگاه‌های اخیر",
      viewAll: "مشاهده همه",
      shopName: "نام فروشگاه",
      owner: "مالک",
      location: "موقعیت",
      volume: "حجم",
      noShopsFound: "هیچ فروشگاهی یافت نشد",
      
      systemActivity: "فعالیت سیستم",
      
      currencyRates: "نرخ‌های ارز",
      volumeLabel: "حجم",
      
      notifications: "اعلان‌ها",
      
      quickActions: "عملیات سریع",
      manageUsers: "مدیریت کاربران",
      paymentApprovals: "تأییدهای پرداخت",
      systemSettings: "تنظیمات سیستم",
      
      highCpuAlert: "استفاده زیاد از CPU در سرور اصلی تشخیص داده شد",
      maintenanceAlert: "نگهداری برنامه‌ریزی شده در 2 ساعت آینده",
      backupAlert: "پشتیبان‌گیری از پایگاه داده با موفقیت انجام شد",
      failedLoginAlert: "تلاش‌های ناموفق برای ورود از IP 192.168.1.100",
      
      paymentApproved: "پرداخت با موفقیت تأیید شد! حساب کاربر فعال شد.",
      paymentDenied: "پرداخت با موفقیت رد شد! به کاربر اطلاع داده شد.",
      logoutSuccess: "با موفقیت خارج شدید",
      
      denialReasonRequired: "لطفاً دلیل رد را ارائه دهید",
      imageNotFound: "تصویر یافت نشد"
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

  // Filter payment requests by status
  const pendingRequests = payments.filter(req => req.status === 'pending');
  const approvedRequests = payments.filter(req => req.status === 'approved');
  const deniedRequests = payments.filter(req => req.status === 'denied');

  // Filter shops (users with role shop_admin)
  const shops = users.filter(user => user.role === 'shop_admin');
  
  // Filter regular users (customers)
  const regularUsers = users.filter(user => user.role === 'customer');

  // Fetch payments on component mount
  useEffect(() => {
    fetchPayments();
    fetchUsers();
  }, []);

  const fetchPayments = () => {
    dispatch(getAllPaymentProofsAction(1, 10, ''));
  };

  const fetchUsers = () => {
    dispatch(systemAdminGetAllUsersAction(1, 100, '', '', ''));
  };

  // Handle approve success
  useEffect(() => {
    if (approveSuccess) {
      setIsProcessing(false);
      setShowPaymentModal(false);
      setSelectedPayment(null);
      setApprovalAction(null);
      fetchPayments(); // Refresh the list
      toast.success(t.paymentApproved);
      dispatch({ type: 'APPROVE_PAYMENT_RESET' });
    }
  }, [approveSuccess, dispatch, t]);

  // Handle deny success
  useEffect(() => {
    if (denySuccess) {
      setIsProcessing(false);
      setShowPaymentModal(false);
      setSelectedPayment(null);
      setApprovalAction(null);
      fetchPayments(); // Refresh the list
      toast.success(t.paymentDenied);
      dispatch({ type: 'DENY_PAYMENT_RESET' });
    }
  }, [denySuccess, dispatch, t]);

  // System Stats
  const systemStats = [
    { label: t.totalShops, value: shops.length, icon: Store, change: '+3', color: 'green' },
    { label: t.totalUsers, value: users.length, icon: Users, change: '+127', color: 'blue' },
    { label: t.pendingApprovals, value: pendingRequests.length, icon: Clock, change: '+2', color: 'yellow' },
    { label: t.approvedPayments, value: approvedRequests.length, icon: CheckCircle, change: '+5', color: 'green' },
    { label: t.systemUptime, value: '99.9%', icon: Server, change: t.stable, color: 'blue' },
    { label: t.activeSessions, value: '342', icon: Activity, change: '+23', color: 'purple' },
  ];

  // System Alerts
  const systemAlerts = [
    { id: 1, type: 'warning', message: t.highCpuAlert, time: '10 min ago' },
    { id: 2, type: 'info', message: t.maintenanceAlert, time: '30 min ago' },
    { id: 3, type: 'success', message: t.backupAlert, time: '1 hour ago' },
    { id: 4, type: 'error', message: t.failedLoginAlert, time: '2 hours ago' },
  ];

  // Currency Rates (keep in English as requested - data only)
  const currencyRates = [
    { code: 'USD', rate: 1.00, change: '+0.1%', volume: '$1.2M' },
    { code: 'EUR', rate: 1.08, change: '-0.3%', volume: '$890K' },
    { code: 'GBP', rate: 1.26, change: '+0.5%', volume: '$750K' },
    { code: 'PKR', rate: 278.50, change: '+2.1%', volume: '$2.1M' },
    { code: 'AED', rate: 3.67, change: '0.0%', volume: '$450K' },
    { code: 'SAR', rate: 3.75, change: '+0.1%', volume: '$380K' },
  ];

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New payment request from user', time: '5 min ago', read: false, type: 'payment' },
    { id: 2, text: 'Payment approved for shop admin', time: '1 hour ago', read: false, type: 'payment' },
    { id: 3, text: 'System update completed', time: '2 hours ago', read: true, type: 'system' },
    { id: 4, text: 'High CPU usage detected', time: '3 hours ago', read: true, type: 'security' },
  ]);

  const processApproval = (notes) => {
    if (!selectedPayment) return;
    
    setIsProcessing(true);
    
    if (approvalAction === 'approved') {
      dispatch(approvePaymentAction(selectedPayment.userId, notes));
    } else {
      dispatch(denyPaymentAction(selectedPayment.userId, notes));
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUserAction());
    toast.success(t.logoutSuccess);
    navigate('/system-admin-login');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'inactive': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'approved': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'denied': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'denied': return <XIcon className="w-4 h-4" />;
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <XIcon className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'info': return <Info className="text-blue-500" size={16} />;
      case 'success': return <CheckCircle className="text-green-500" size={16} />;
      case 'error': return <AlertCircle className="text-red-500" size={16} />;
      default: return <Info className="text-gray-500" size={16} />;
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'payment': return <Banknote size={14} className="text-green-500" />;
      case 'user': return <User size={14} className="text-blue-500" />;
      case 'system': return <Server size={14} className="text-purple-500" />;
      case 'security': return <Shield size={14} className="text-red-500" />;
      default: return <Bell size={14} className="text-gray-500" />;
    }
  };

  const handleApproveDeny = (request, action) => {
    setSelectedPayment(request);
    setApprovalAction(action);
    setShowPaymentModal(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Payment Review Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl mx-4"
          >
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-5 flex justify-between items-center">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{t.reviewPaymentRequest}</h2>
                  <p className="text-xs text-gray-400">{t.reviewDesc}</p>
                </div>
              </div>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">{t.userInformation}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><p className="text-xs text-gray-500">{t.name}</p><p className="text-white font-medium break-words">{selectedPayment.userName}</p></div>
                  <div><p className="text-xs text-gray-500">{t.email}</p><p className="text-white break-words">{selectedPayment.userEmail}</p></div>
                  <div><p className="text-xs text-gray-500">{t.submittedLabel}</p><p className="text-white">{new Date(selectedPayment.submittedAt).toLocaleString()}</p></div>
                  <div><p className="text-xs text-gray-500">{t.transactionRef}</p><p className="text-white font-mono text-sm break-all">{selectedPayment.transactionReference}</p></div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">{t.paymentDetails}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><p className="text-xs text-gray-500">{t.country}</p><p className="text-white font-medium">{selectedPayment.country}</p></div>
                  <div><p className="text-xs text-gray-500">{t.amount}</p><p className="text-green-500 font-bold">{selectedPayment.amount} {selectedPayment.currency}</p></div>
                </div>
              </div>

              {selectedPayment.screenshot && (
                <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    {t.paymentScreenshot}
                  </h3>
                  <div className="border border-gray-600 rounded-lg overflow-hidden">
                    <img 
                      src={`http://localhost:5000/${selectedPayment.screenshot}`} 
                      alt={t.paymentScreenshot}
                      className="w-full max-h-64 object-contain bg-gray-900"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=' + t.imageNotFound;
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  {approvalAction === 'approved' ? t.approvalNotes : t.denialReason}
                </label>
                <textarea
                  id="reviewNotes"
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-green-500"
                  placeholder={approvalAction === 'approved' ? t.approvalPlaceholder : t.denialPlaceholder}
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setShowPaymentModal(false)} className="flex-1 px-4 py-3 border border-gray-600 rounded-xl text-gray-400 hover:bg-gray-700">{t.cancel}</button>
                {approvalAction === 'approved' ? (
                  <button onClick={() => processApproval(document.getElementById('reviewNotes').value)} disabled={isProcessing || approveLoading} className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2">
                    {(isProcessing || approveLoading) ? <><Loader2 className="w-5 h-5 animate-spin" /><span>{t.processing}</span></> : <><CheckCircle className="w-5 h-5" /><span>{t.approvePayment}</span></>}
                  </button>
                ) : (
                  <button onClick={() => { const notes = document.getElementById('reviewNotes').value; if (!notes) { toast.error(t.denialReasonRequired); return; } processApproval(notes); }} disabled={isProcessing || denyLoading} className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
                    {(isProcessing || denyLoading) ? <><Loader2 className="w-5 h-5 animate-spin" /><span>{t.processing}</span></> : <><XIcon className="w-5 h-5" /><span>{t.denyPayment}</span></>}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <main className="transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 sm:mb-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div>
              <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-xs sm:text-sm font-medium text-green-500">{t.adminDashboard}</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{t.systemAdministration}</h1>
              <p className="text-sm text-gray-400 mt-1">{t.adminDesc}</p>
            </div>
            
            <div className={`flex items-center space-x-2 sm:space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-800 rounded-xl transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} className="text-gray-400" /> : <Menu size={20} className="text-gray-400" />}
              </button>

              {/* Desktop Actions */}
              <div className={`hidden lg:flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 hover:bg-gray-800 rounded-xl transition-colors relative"
                  >
                    <Bell size={20} className="text-gray-400" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-80 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-50`}>
                      <div className="p-3 border-b border-gray-700">
                        <h3 className="text-white font-semibold">{t.notifications}</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div key={notif.id} className="p-3 hover:bg-gray-700/50 cursor-pointer border-b border-gray-700/50">
                            <div className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                              <div className={`p-1.5 rounded-lg ${notif.read ? 'bg-gray-700' : 'bg-green-500/20'}`}>
                                {getNotificationIcon(notif.type)}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm ${notif.read ? 'text-gray-400' : 'text-white'}`}>{notif.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                              </div>
                              {!notif.read && <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 rounded-xl transition-all"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">{t.logout}</span>
                </button>

                {/* Admin Profile */}
                <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold">SA</div>
                  <div className="hidden xl:block">
                    <p className="text-sm font-semibold text-white">{t.superAdmin}</p>
                    <p className="text-xs text-gray-400">{t.administrator}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mb-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 bg-gray-700/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Bell size={18} className="text-gray-400" />
                    <span className="text-white">{t.notifications}</span>
                  </div>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={handleLogout}
                  className={`flex items-center gap-3 p-3 bg-red-600/20 rounded-lg hover:bg-red-600/30 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <LogOut size={18} className="text-red-500" />
                  <span className="text-red-500 font-medium">{t.logout}</span>
                </button>
                
                <div className={`flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold">SA</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.superAdmin}</p>
                    <p className="text-xs text-gray-400">{t.administrator}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards - Responsive Grid */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            {systemStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  variants={itemVariants} 
                  whileHover={{ y: -5 }} 
                  className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700 hover:border-green-500/30 transition-all"
                >
                  <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${stat.color}-500`} />
                    <span className={`text-xs text-${stat.color}-500 bg-${stat.color}-500/10 px-2 py-1 rounded-full`}>{stat.change}</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Payment Requests Section - Responsive Table */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700 mb-6 sm:mb-8 overflow-x-auto">
            <div className={`p-4 sm:p-6 border-b border-gray-700 ${isRTL ? 'text-right' : ''}`}>
              <h2 className={`text-lg font-bold text-white flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Banknote className="w-5 h-5 text-green-500" />
                {t.paymentApprovalRequests}
              </h2>
              <p className="text-sm text-gray-400 mt-1">{t.paymentDesc}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-700/50">
                  <tr className={isRTL ? 'text-right' : 'text-left'}>
                    <th className={`px-4 sm:px-6 py-3 text-xs font-medium text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{t.user}</th>
                    <th className={`px-4 sm:px-6 py-3 text-xs font-medium text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{t.country}</th>
                    <th className={`px-4 sm:px-6 py-3 text-xs font-medium text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{t.amount}</th>
                    <th className={`px-4 sm:px-6 py-3 text-xs font-medium text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{t.transactionRef}</th>
                    <th className={`px-4 sm:px-6 py-3 text-xs font-medium text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{t.submitted}</th>
                    <th className={`px-4 sm:px-6 py-3 text-xs font-medium text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
                    <th className={`px-4 sm:px-6 py-3 text-xs font-medium text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {paymentsLoading ? (
                    <tr><td colSpan="7" className="px-4 sm:px-6 py-12 text-center"><Loader2 className="w-6 h-6 animate-spin text-green-500 mx-auto" /></td></tr>
                  ) : pendingRequests.length === 0 ? (
                    <tr><td colSpan="7" className="px-4 sm:px-6 py-12 text-center text-gray-400">{t.noPendingPayments}</td></tr>
                  ) : (
                    pendingRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-700/30">
                        <td className="px-4 sm:px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-white break-words">{request.userName}</p>
                            <p className="text-xs text-gray-400 break-words">{request.userEmail}</p>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-300">{request.country}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="text-sm font-medium text-green-500">{request.amount} {request.currency}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="text-xs font-mono text-gray-400 break-all">{request.transactionReference}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-400">{new Date(request.submittedAt).toLocaleString()}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(request.status)}`}>
                            {getStatusIcon(request.status)}{request.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right">
                          <div className={`flex items-center justify-end gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <button 
                              onClick={() => handleApproveDeny(request, 'approved')} 
                              className="px-2 sm:px-3 py-1 bg-green-600/20 text-green-500 rounded-lg hover:bg-green-600/30 text-xs sm:text-sm flex items-center gap-1"
                            >
                              <CheckCircle size={14} />
                              <span className="hidden sm:inline">{t.approve}</span>
                            </button>
                            <button 
                              onClick={() => handleApproveDeny(request, 'denied')} 
                              className="px-2 sm:px-3 py-1 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600/30 text-xs sm:text-sm flex items-center gap-1"
                            >
                              <XIcon size={14} />
                              <span className="hidden sm:inline">{t.deny}</span>
                            </button>
                            <button 
                              onClick={() => { setSelectedPayment(request); setApprovalAction(null); setShowPaymentModal(true); }} 
                              className="p-1 hover:bg-gray-600 rounded"
                            >
                              <EyeIcon size={16} className="text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Shops & System Activity Grid - Responsive */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Recent Shops */}
            <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700 overflow-x-auto">
              <div className={`flex items-center justify-between mb-4 flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className={`text-lg font-bold text-white flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Store className="w-5 h-5 mr-2 text-green-500" />
                  {t.recentShops}
                </h2>
                <Link to="/admin/users" className="text-sm text-green-500 hover:text-green-400 flex items-center">
                  {t.viewAll} <ChevronRight size={16} className="inline" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className={`text-xs text-gray-400 border-b border-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <th className="pb-3">{t.shopName}</th>
                      <th className="pb-3">{t.owner}</th>
                      <th className="pb-3">{t.location}</th>
                      <th className="pb-3">{t.status}</th>
                      <th className="pb-3">{t.volume}</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {usersLoading ? (
                      <tr><td colSpan="5" className="py-6 text-center"><Loader2 className="w-5 h-5 animate-spin text-green-500 mx-auto" /></td></tr>
                    ) : shops.slice(0, 5).map((shop) => (
                      <tr key={shop.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                        <td className="py-3 text-white font-medium break-words">{shop.fullName || shop.name || 'N/A'}</td>
                        <td className="py-3 text-gray-300 break-words">{shop.fullName || 'Shop Admin'}</td>
                        <td className="py-3 text-gray-300">{shop.city || 'N/A'}, {shop.country || 'N/A'}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(shop.status)}`}>
                            {shop.status || 'pending'}
                          </span>
                        </td>
                        <td className="py-3 text-green-500 font-medium">{shop.totalVolume || '$0'}</td>
                      </tr>
                    ))}
                    {!usersLoading && shops.length === 0 && (
                      <tr><td colSpan="5" className="py-6 text-center text-gray-400">{t.noShopsFound}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Activity & Alerts */}
            <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700">
              <h2 className={`text-lg font-bold text-white mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Activity className="w-5 h-5 mr-2 text-green-500" />
                {t.systemActivity}
              </h2>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className={`flex items-start space-x-3 p-3 bg-gray-700/30 rounded-xl border border-gray-700 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm text-white break-words">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Currency Rates & Notifications Grid - Responsive */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
            {/* Currency Rates */}
            <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700">
              <h2 className={`text-lg font-bold text-white mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                {t.currencyRates}
              </h2>
              <div className="space-y-3">
                {currencyRates.map((currency) => (
                  <div key={currency.code} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                    <div className={`flex items-center justify-between sm:justify-start space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <span className="text-white font-medium">{currency.code}</span>
                      <span className="text-xs text-gray-400">{t.volumeLabel}: {currency.volume}</span>
                    </div>
                    <div className={`flex items-center justify-between sm:justify-start space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <span className="text-white">{currency.rate}</span>
                      <span className={`text-xs ${currency.change.startsWith('+') ? 'text-green-500' : currency.change.startsWith('-') ? 'text-red-500' : 'text-gray-400'}`}>
                        {currency.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700">
              <h2 className={`text-lg font-bold text-white mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Bell className="w-5 h-5 mr-2 text-green-500" />
                {t.notifications}
              </h2>
              <div className="space-y-3">
                {notifications.slice(0, 4).map((notif) => (
                  <div key={notif.id} className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-1.5 rounded-lg ${notif.read ? 'bg-gray-700' : 'bg-green-500/20'}`}>
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${notif.read ? 'text-gray-400' : 'text-white'} break-words`}>{notif.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                    {!notif.read && <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions - Responsive Grid */}
          <div className="mt-6 sm:mt-8 bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700">
            <h2 className={`text-lg font-bold text-white mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              {t.quickActions}
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
              <Link to="/admin/users">
                <button className="w-full p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all flex flex-col items-center space-y-2">
                  <Users className="w-6 h-6 text-blue-500" />
                  <span className="text-xs text-white">{t.manageUsers}</span>
                </button>
              </Link>
              <Link to="/admin/payments">
                <button className="w-full p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all flex flex-col items-center space-y-2">
                  <Banknote className="w-6 h-6 text-yellow-500" />
                  <span className="text-xs text-white">{t.paymentApprovals}</span>
                </button>
              </Link>
              <Link to="/admin/settings">
                <button className="w-full p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-all flex flex-col items-center space-y-2">
                  <Settings className="w-6 h-6 text-purple-500" />
                  <span className="text-xs text-white">{t.systemSettings}</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;