import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  ClipboardList, 
  UserPlus, 
  BookOpen,
  Key,
  Sparkles,
  Bell,
  TrendingUp,
  AlertTriangle,
  Eye,
  EyeOff,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  Users as UsersIcon,
  Wallet,
  Shield,
  RefreshCw,
  Home,
  Settings,
  HelpCircle,
  Menu,
  X,
  Globe,
  ChevronRight,
  FileText,
  Database
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUserAction, clearErrors } from "../../actions/authActions";

// Import API actions
import { getAllTransactionsAction, getTransactionStatsAction } from "../../actions/transactionActions";
import { getAllDailyRecordsAction, getDailyRecordStatsAction } from "../../actions/dailyRecordActions";
import { getAllLedgerEntriesAction, getLedgerStatsAction } from "../../actions/ledgerActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, loading, error } = useSelector((state) => state.loginUser);
  const userRole = user?.role;
  const isCustomer = userRole === 'customer';
  
  // API Data States
  const { transactions, summary: transactionSummary } = useSelector((state) => state.allTransactions || {});
  const { records: dailyRecords, summary: dailySummary } = useSelector((state) => state.allDailyRecords || {});
  const { entries: ledgerEntries, summary: ledgerSummary } = useSelector((state) => state.allLedgerEntries || {});
  
  const [showBalances, setShowBalances] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Language translations
  const translations = {
    en: {
      dashboardOverview: "Overview",
      welcomeBack: "Welcome back",
      logout: "Logout",
      dashboard: "Dashboard",
      moneyExchange: "Watan Records",
      records: "Records",
      recordsManagement: "Records Management",
      
      // Stats Cards
      totalTransactions: "Transactions",
      totalAmount: "Total Amount",
      dailyRecords: "Daily Records",
      ledgerEntries: "Khata",
      totalIncome: "Income",
      totalExpense: "Expense",
      netBalance: "Balance",
      
      // Modules Section
      mainModules: "Main Modules",
      quickAccess: "Quick Access",
      
      // Recent Activities
      recentActivities: "Recent Activities",
      latestUpdates: "Latest updates",
      viewAll: "View All",
      
      // Module Names
      customerTransactions: "Money Transfer",
      dailyRecords: "Daily Records",
      ledgerManagement: "Khata",
      updatePassword: "Security",
      
      // Module Descriptions
      customersDesc: "Send and receive money",
      dailyRecordsDesc: "Track income & expenses",
      ledgerDesc: "Manage credits & debts",
      updatePasswordDesc: "Change your password",
      
      // Module Badges
      active: "Active",
      secure: "Secure",
      
      // Alerts
      noTransactions: "No transactions",
      noRecords: "No records",
      noLedgerEntries: "No entries",
      
      // Success/Error Messages
      loggedOutSuccess: "Logged out successfully!",
      logoutFailed: "Logout failed",
      
      // Loading
      loadingDashboard: "Loading...",
      
      // Role Names
      admin: "Admin",
      customer: "Customer",
      
      today: "Today",
      week: "This Week",
      month: "This Month",
      
      amount: "Amount",
      date: "Date",
      type: "Type",
      description: "Description",
      income: "Income",
      expense: "Expense",
      viewDetails: "View Details",
      quickStats: "Quick Stats"
    },
    ur: {
      dashboardOverview: "جائزہ",
      welcomeBack: "خوش آمدید",
      logout: "لاگ آؤٹ",
      dashboard: "ڈیش بورڈ",
      moneyExchange: "منی ایکسچینج",
      records: "ریکارڈز",
      recordsManagement: "ریکارڈز مینجمنٹ",
      
      totalTransactions: "لین دین",
      totalAmount: "کل رقم",
      dailyRecords: "روزانہ",
      ledgerEntries: "کھاتہ",
      totalIncome: "آمدنی",
      totalExpense: "خرچ",
      netBalance: "بیلنس",
      
      mainModules: "اہم ماڈیولز",
      quickAccess: "فوری رسائی",
      
      recentActivities: "حالیہ سرگرمیاں",
      latestUpdates: "تازہ ترین اپ ڈیٹس",
      viewAll: "سب دیکھیں",
      
      customerTransactions: "منی ٹرانسفر",
      dailyRecords: "روزانہ ریکارڈ",
      ledgerManagement: "کھاتہ",
      updatePassword: "سیکیورٹی",
      
      customersDesc: "رقم بھیجیں اور وصول کریں",
      dailyRecordsDesc: "آمدنی اور خرچ ٹریک کریں",
      ledgerDesc: "قرضے اور ادائیگیاں منظم کریں",
      updatePasswordDesc: "پاس ورڈ تبدیل کریں",
      
      active: "فعال",
      secure: "محفوظ",
      
      noTransactions: "کوئی لین دین نہیں",
      noRecords: "کوئی ریکارڈ نہیں",
      noLedgerEntries: "کوئی اندراج نہیں",
      
      loggedOutSuccess: "کامیابی سے لاگ آؤٹ ہوگیا!",
      logoutFailed: "لاگ آؤٹ ناکام",
      
      loadingDashboard: "لوڈ ہو رہا ہے...",
      
      admin: "ایڈمن",
      customer: "کسٹمر",
      
      today: "آج",
      week: "اس ہفتے",
      month: "اس مہینے",
      
      amount: "رقم",
      date: "تاریخ",
      type: "قسم",
      description: "تفصیل",
      income: "آمدنی",
      expense: "خرچ",
      viewDetails: "تفصیلات دیکھیں",
      quickStats: "فوری اعدادوشمار"
    },
    ps: {
      dashboardOverview: "کتنه",
      welcomeBack: "ښه راغلاست",
      logout: "وتل",
      dashboard: "ډشبورډ",
      moneyExchange: "منی ایکسچینج",
      records: "ریکارډونه",
      recordsManagement: "ریکارډونه مدیریت",
      
      totalTransactions: "راکړې ورکړې",
      totalAmount: "ټوله اندازه",
      dailyRecords: "ورځني",
      ledgerEntries: "کھاتہ",
      totalIncome: "عاید",
      totalExpense: "لګښت",
      netBalance: "بیلانس",
      
      mainModules: "اصلي ماډلونه",
      quickAccess: "چټک لاسرسی",
      
      recentActivities: "وروستي فعالیتونه",
      latestUpdates: "وروستي تازه معلومات",
      viewAll: "ټول وګورئ",
      
      customerTransactions: "منی ٹرانسفر",
      dailyRecords: "ورځني ریکارډونه",
      ledgerManagement: "کھاتہ",
      updatePassword: "امنیت",
      
      customersDesc: "پیسې واستوئ او ترلاسه کړئ",
      dailyRecordsDesc: "عاید او لګښت تعقیب کړئ",
      ledgerDesc: "پورونه او تادیات اداره کړئ",
      updatePasswordDesc: "پاسورډ بدل کړئ",
      
      active: "فعال",
      secure: "خوندي",
      
      noTransactions: "هیڅ راکړه ورکړه نشته",
      noRecords: "هیڅ ریکارډ نشته",
      noLedgerEntries: "هیڅ داخله نشته",
      
      loggedOutSuccess: "بریالی وتل!",
      logoutFailed: "وتل ناکام شو",
      
      loadingDashboard: "لوډ کیږي...",
      
      admin: "مدیر",
      customer: "پیرودونکی",
      
      today: "نن",
      week: "دا اونۍ",
      month: "دا میاشت",
      
      amount: "اندازه",
      date: "نیټه",
      type: "ډول",
      description: "تشریح",
      income: "عاید",
      expense: "لګښت",
      viewDetails: "جزیات وګورئ",
      quickStats: "چټک احصایې"
    },
    fa: {
      dashboardOverview: "بررسی",
      welcomeBack: "خوش آمدید",
      logout: "خروج",
      dashboard: "داشبورد",
      moneyExchange: "منی ایکسچینج",
      records: "رکوردها",
      recordsManagement: "مدیریت رکوردها",
      
      totalTransactions: "تراکنش‌ها",
      totalAmount: "مبلغ کل",
      dailyRecords: "روزانه",
      ledgerEntries: "کھاتہ",
      totalIncome: "درآمد",
      totalExpense: "هزینه",
      netBalance: "موجودی",
      
      mainModules: "ماژول‌های اصلی",
      quickAccess: "دسترسی سریع",
      
      recentActivities: "فعالیت‌های اخیر",
      latestUpdates: "آخرین به‌روزرسانی‌ها",
      viewAll: "مشاهده همه",
      
      customerTransactions: "منی ٹرانسفر",
      dailyRecords: "رکوردهای روزانه",
      ledgerManagement: "کھاتہ",
      updatePassword: "امنیت",
      
      customersDesc: "ارسال و دریافت پول",
      dailyRecordsDesc: "پیگیری درآمد و هزینه",
      ledgerDesc: "مدیریت بدهی‌ها",
      updatePasswordDesc: "تغییر رمز عبور",
      
      active: "فعال",
      secure: "امن",
      
      noTransactions: "هیچ تراکنشی نیست",
      noRecords: "هیچ رکوردی نیست",
      noLedgerEntries: "هیچ ورودی نیست",
      
      loggedOutSuccess: "با موفقیت خارج شدید!",
      logoutFailed: "خروج ناموفق بود",
      
      loadingDashboard: "در حال بارگذاری...",
      
      admin: "مدیر",
      customer: "مشتری",
      
      today: "امروز",
      week: "این هفته",
      month: "این ماه",
      
      amount: "مبلغ",
      date: "تاریخ",
      type: "نوع",
      description: "توضیحات",
      income: "درآمد",
      expense: "هزینه",
      viewDetails: "مشاهده جزئیات",
      quickStats: "آمار سریع"
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

  // Fetch data from APIs
  useEffect(() => {
    dispatch(getAllTransactionsAction(1, 100));
    dispatch(getTransactionStatsAction());
    dispatch(getAllDailyRecordsAction(1, 100));
    dispatch(getDailyRecordStatsAction());
    dispatch(getAllLedgerEntriesAction(1, 100));
    dispatch(getLedgerStatsAction());
  }, [dispatch]);

  // Calculate stats from API data
  const getStats = () => {
    const totalTransactions = transactions?.length || 0;
    const totalTransactionAmount = (transactions || []).reduce((sum, t) => sum + (t.senderAmount || t.amount || 0), 0);
    const totalDailyRecords = dailyRecords?.length || 0;
    const totalLedgerEntries = ledgerEntries?.length || 0;
    
    const totalIncome = (dailyRecords || []).reduce((sum, record) => {
      const incomeSum = (record.incomeEntries || []).reduce((s, entry) => s + (entry.amount || 0), 0);
      return sum + incomeSum;
    }, 0);
    
    const totalExpense = (dailyRecords || []).reduce((sum, record) => {
      const expenseSum = (record.spendEntries || []).reduce((s, entry) => s + (entry.amount || 0), 0);
      return sum + expenseSum;
    }, 0);
    
    const netBalance = totalIncome - totalExpense;
    
    return { totalTransactions, totalTransactionAmount, totalDailyRecords, totalLedgerEntries, totalIncome, totalExpense, netBalance };
  };
  
  const stats = getStats();

  const getRecentActivities = () => {
    const activities = [];
    
    (transactions || []).slice(0, 2).forEach(t => {
      activities.push({
        id: `transaction-${t.id}`,
        module: 'Money Transfer',
        action: `Transfer ${t.senderAmount || 0} ${t.senderCurrency || 'USD'}`,
        details: `${t.senderName || 'Sender'} → ${t.receiverName || 'Receiver'}`,
        time: t.date ? formatRelativeTime(t.date) : 'recent',
        icon: TrendingUp,
        color: 'bg-green-100 text-green-600'
      });
    });
    
    (dailyRecords || []).slice(0, 2).forEach(record => {
      activities.push({
        id: `record-${record.id}`,
        module: 'Daily Record',
        action: 'Daily entry',
        details: `${record.incomeEntries?.length || 0} income, ${record.spendEntries?.length || 0} expenses`,
        time: record.date ? formatRelativeTime(record.date) : 'recent',
        icon: ClipboardList,
        color: 'bg-blue-100 text-blue-600'
      });
    });
    
    (ledgerEntries || []).slice(0, 2).forEach(entry => {
      activities.push({
        id: `ledger-${entry.id}`,
        module: 'Khata',
        action: `${entry.name || 'Entry'} - ${entry.amount || 0}`,
        details: entry.description || 'Ledger entry',
        time: entry.date ? formatRelativeTime(entry.date) : 'recent',
        icon: BookOpen,
        color: 'bg-purple-100 text-purple-600'
      });
    });
    
    return activities.slice(0, 4);
  };
  
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMins = Math.floor((now - date) / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };
  
  const recentActivities = getRecentActivities();

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAction());
      toast.success(t.loggedOutSuccess);
      navigate('/');
    } catch (error) {
      toast.error(t.logoutFailed);
    }
  };

  // Modules configuration
  const modules = [
    { id: "customers", name: t.customerTransactions, icon: TrendingUp, path: '/customer-registration', bgColor: 'bg-green-100', textColor: 'text-green-600', description: t.customersDesc },
    { id: "daily-records", name: t.dailyRecords, icon: ClipboardList, path: '/daily-records', bgColor: 'bg-blue-100', textColor: 'text-blue-600', description: t.dailyRecordsDesc },
    { id: "ledger", name: t.ledgerManagement, icon: BookOpen, path: '/ledger-record', bgColor: 'bg-purple-100', textColor: 'text-purple-600', description: t.ledgerDesc },
    { id: "update-password", name: t.updatePassword, icon: Shield, path: '/update-password', bgColor: 'bg-amber-100', textColor: 'text-amber-600', description: t.updatePasswordDesc }
  ];

  const formatAmount = (amount, currency = 'USD') => {
    if (!amount && amount !== 0) return '$0';
    const symbol = currency === 'PKR' ? '₨' : '$';
    return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loadingDashboard}</p>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-red-500 rounded-lg flex items-center justify-center">
              <DollarSign size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-800">{t.moneyExchange}</h1>
              <p className="text-xs text-gray-500">{t.recordsManagement}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-1 px-3 py-1.5 bg-red-50 rounded-lg active:bg-red-100 transition-colors"
            >
              <LogOut size={16} className="text-red-600" />
              <span className="text-xs font-medium text-red-600">{t.logout}</span>
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {user?.profile?.fullName?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-500 to-red-500 rounded-b-3xl p-5 text-white">
          <p className="text-sm opacity-90">{t.welcomeBack}</p>
          <p className="text-xl font-bold mt-1">{user?.profile?.fullName || 'User'}</p>
          <p className="text-xs opacity-80 mt-1 capitalize">{user?.role === 'system_admin' ? t.admin : t.customer}</p>
        </div>

        {/* Quick Stats - 4 column grid */}
        <div className="px-4 -mt-3">
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white rounded-xl p-2 shadow-sm text-center">
              <p className="text-xs text-gray-500">{t.totalTransactions}</p>
              <p className="text-base font-bold text-gray-800">{stats.totalTransactions}</p>
            </div>
            <div className="bg-white rounded-xl p-2 shadow-sm text-center">
              <p className="text-xs text-gray-500">{t.dailyRecords}</p>
              <p className="text-base font-bold text-gray-800">{stats.totalDailyRecords}</p>
            </div>
            <div className="bg-white rounded-xl p-2 shadow-sm text-center">
              <p className="text-xs text-gray-500">{t.ledgerEntries}</p>
              <p className="text-base font-bold text-gray-800">{stats.totalLedgerEntries}</p>
            </div>
            <div className="bg-white rounded-xl p-2 shadow-sm text-center">
              <p className="text-xs text-gray-500">{t.netBalance}</p>
              <p className="text-sm font-bold text-green-600 truncate">{formatAmount(stats.netBalance)}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards - Income/Expense */}
        <div className="px-4 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600">{t.totalIncome}</p>
                  <p className="text-lg font-bold text-green-600">{formatAmount(stats.totalIncome)}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <ArrowUpRight size={16} className="text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-600">{t.totalExpense}</p>
                  <p className="text-lg font-bold text-red-600">{formatAmount(stats.totalExpense)}</p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <ArrowDownRight size={16} className="text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-800">{t.mainModules}</h2>
            <p className="text-xs text-gray-400">{t.quickAccess}</p>
          </div>
          
          <div className="space-y-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Link key={module.id} to={module.path}>
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${module.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon size={18} className={module.textColor} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-800">{module.name}</h3>
                        <p className="text-xs text-gray-500">{module.description}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        {recentActivities.length > 0 && (
          <div className="px-4 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-800">{t.recentActivities}</h2>
              <p className="text-xs text-gray-400">{t.latestUpdates}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {recentActivities.map((activity, idx) => (
                <div key={activity.id} className={`p-3 flex items-center gap-3 ${idx !== recentActivities.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.color}`}>
                    <activity.icon size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.details}</p>
                  </div>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;