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
  AlertTriangle, ArrowLeft
} from 'lucide-react';
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { 
  systemAdminGetAllUsersAction, 
  systemAdminDeleteUserAction,
  clearSystemAdminErrors 
} from '../../actions/systemAdminActions';

const AdminUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('view');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Language translations
  const translations = {
    en: {
      backToDashboard: "Back to Dashboard",
      title: "Users Management",
      subtitle: "View and manage all system users",
      searchPlaceholder: "Search users...",
      statusLabel: "Status",
      roleLabel: "Role",
      sortByLabel: "Sort By",
      allStatus: "All Status",
      allRoles: "All Roles",
      active: "Active",
      inactive: "Inactive",
      pending: "Pending",
      suspended: "Suspended",
      sortOptions: {
        joinDate: "Join Date",
        name: "Name",
        status: "Status"
      },
      showing: "Showing",
      of: "of",
      page: "Page",
      actions: "Actions",
      view: "View",
      delete: "Delete",
      userDetails: "User Details",
      addressInformation: "Address Information",
      professionalInformation: "Professional Information",
      preferences: "Preferences",
      accountStats: "Account Stats",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      city: "City",
      state: "State",
      postalCode: "Postal Code",
      country: "Country",
      occupation: "Occupation",
      company: "Company",
      annualIncome: "Annual Income",
      purpose: "Purpose",
      preferredCurrency: "Preferred Currency",
      newsletter: "Newsletter",
      smsAlerts: "SMS Alerts",
      marketingEmails: "Marketing Emails",
      subscribed: "Subscribed",
      notSubscribed: "Not subscribed",
      enabled: "Enabled",
      disabled: "Disabled",
      optedIn: "Opted in",
      optedOut: "Opted out",
      notSpecified: "Not specified",
      lastLogin: "Last Login",
      loginCount: "Login Count",
      transactions: "Transactions",
      totalVolume: "Total Volume",
      accountValidUntil: "Account Valid Until",
      joinDate: "Joined",
      payment: "Payment",
      id: "ID",
      dob: "DOB",
      joined: "Joined",
      deleteTitle: "Delete User",
      deleteMessage: "Are you sure you want to delete",
      deleteWarning: "This action cannot be undone.",
      deleteButton: "Delete",
      cancelButton: "Cancel",
      deleting: "Deleting...",
      close: "Close",
      roles: {
        system_admin: "System Admin",
        shop_admin: "Shop Admin",
        shop_manager: "Shop Manager",
        cashier: "Cashier",
        customer: "Customer"
      },
      statuses: {
        active: "Active",
        inactive: "Inactive",
        pending: "Pending",
        suspended: "Suspended"
      },
      paymentStatuses: {
        approved: "Approved",
        pending: "Pending",
        submitted: "Submitted",
        expired: "Expired"
      },
      userDeleted: "User deleted successfully!"
    },
    ur: {
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      title: "صارفین کا نظم",
      subtitle: "تمام سسٹم صارفین دیکھیں اور ان کا نظم کریں",
      searchPlaceholder: "صارفین تلاش کریں...",
      statusLabel: "حالت",
      roleLabel: "کردار",
      sortByLabel: "ترتیب دیں بذریعہ",
      allStatus: "تمام حالتیں",
      allRoles: "تمام کردار",
      active: "فعال",
      inactive: "غیر فعال",
      pending: "زیر التواء",
      suspended: "معطل",
      sortOptions: {
        joinDate: "شامل ہونے کی تاریخ",
        name: "نام",
        status: "حالت"
      },
      showing: "دکھا رہا ہے",
      of: "میں سے",
      page: "صفحہ",
      actions: "اعمال",
      view: "دیکھیں",
      delete: "حذف کریں",
      userDetails: "صارف کی تفصیلات",
      addressInformation: "پتے کی معلومات",
      professionalInformation: "پیشہ ورانہ معلومات",
      preferences: "ترجیحات",
      accountStats: "اکاؤنٹ کے اعدادوشمار",
      addressLine1: "پتہ لائن 1",
      addressLine2: "پتہ لائن 2",
      city: "شہر",
      state: "ریاست",
      postalCode: "پوسٹل کوڈ",
      country: "ملک",
      occupation: "پیشہ",
      company: "کمپنی",
      annualIncome: "سالانہ آمدنی",
      purpose: "مقصد",
      preferredCurrency: "ترجیحی کرنسی",
      newsletter: "نیوز لیٹر",
      smsAlerts: "ایس ایم ایس الرٹس",
      marketingEmails: "مارکیٹنگ ای میلز",
      subscribed: "سبسکرائب شدہ",
      notSubscribed: "سبسکرائب نہیں",
      enabled: "فعال",
      disabled: "غیر فعال",
      optedIn: "آپٹ ان",
      optedOut: "آپٹ آؤٹ",
      notSpecified: "مخصوص نہیں",
      lastLogin: "آخری لاگ ان",
      loginCount: "لاگ ان کی تعداد",
      transactions: "لین دین",
      totalVolume: "کل حجم",
      accountValidUntil: "اکاؤنٹ درست ہے یہاں تک",
      joinDate: "شامل ہوا",
      payment: "ادائیگی",
      id: "شناخت نمبر",
      dob: "تاریخ پیدائش",
      joined: "شامل ہوا",
      deleteTitle: "صارف حذف کریں",
      deleteMessage: "کیا آپ واقعی حذف کرنا چاہتے ہیں",
      deleteWarning: "یہ عمل واپس نہیں لیا جا سکتا۔",
      deleteButton: "حذف کریں",
      cancelButton: "منسوخ کریں",
      deleting: "حذف ہو رہا ہے...",
      close: "بند کریں",
      roles: {
        system_admin: "سسٹم ایڈمن",
        shop_admin: "شاپ ایڈمن",
        shop_manager: "شاپ مینیجر",
        cashier: "کیشیئر",
        customer: "کسٹمر"
      },
      statuses: {
        active: "فعال",
        inactive: "غیر فعال",
        pending: "زیر التواء",
        suspended: "معطل"
      },
      paymentStatuses: {
        approved: "منظور شدہ",
        pending: "زیر التواء",
        submitted: "جمع کرایا گیا",
        expired: "میعاد ختم شدہ"
      },
      userDeleted: "صارف کامیابی سے حذف ہو گیا!"
    },
    ps: {
      backToDashboard: "بیرته ډشبورډ ته",
      title: "د کاروونکو مدیریت",
      subtitle: "ټول سیسټم کاروونکي وګورئ او اداره کړئ",
      searchPlaceholder: "کاروونکي وپلټئ...",
      statusLabel: "حالت",
      roleLabel: "رول",
      sortByLabel: "ترتیب په",
      allStatus: "ټول حالتونه",
      allRoles: "ټول رولونه",
      active: "فعال",
      inactive: "غیر فعال",
      pending: "په انتظار کې",
      suspended: "ځنډول شوی",
      sortOptions: {
        joinDate: "د یوځای کیدو نیټه",
        name: "نوم",
        status: "حالت"
      },
      showing: "ښکاره کول",
      of: "د",
      page: "پاڼه",
      actions: "کړنې",
      view: "کتل",
      delete: "ړنګول",
      userDetails: "د کارونکي توضیحات",
      addressInformation: "د پتې معلومات",
      professionalInformation: "مسلکي معلومات",
      preferences: "غوره توبونه",
      accountStats: "د حساب احصایې",
      addressLine1: "پته کرښه 1",
      addressLine2: "پته کرښه 2",
      city: "ښار",
      state: "ایالت",
      postalCode: "پوستي کوډ",
      country: "هیواد",
      occupation: "مسلک",
      company: "شرکت",
      annualIncome: "کلنی عاید",
      purpose: "هدف",
      preferredCurrency: "غوره شوې اسعار",
      newsletter: "خبرپاڼه",
      smsAlerts: "SMS خبرتیاوې",
      marketingEmails: "مارکیټینګ بریښنالیکونه",
      subscribed: "ګډون شوی",
      notSubscribed: "ګډون نه دی شوی",
      enabled: "فعال شوی",
      disabled: "غیر فعال شوی",
      optedIn: "غوره شوی",
      optedOut: "غوره نه شوی",
      notSpecified: "ټاکل شوی نه دی",
      lastLogin: "وروستی ننوتل",
      loginCount: "د ننوتلو شمېر",
      transactions: "راکړې ورکړې",
      totalVolume: "ټول حجم",
      accountValidUntil: "حساب تر پورې اعتبار لري",
      joinDate: "یوځای شوی",
      payment: "تادیه",
      id: "ID",
      dob: "د زیږون نیټه",
      joined: "یوځای شوی",
      deleteTitle: "کارونکی ړنګ کړئ",
      deleteMessage: "ایا تاسو واقعیا ړنګول غواړئ",
      deleteWarning: "دا عمل بیرته نه اخیستل کیدی شي.",
      deleteButton: "ړنګول",
      cancelButton: "لغوه کول",
      deleting: "ړنګیږي...",
      close: "تړل",
      roles: {
        system_admin: "سسټم مدیر",
        shop_admin: "پلورنځی مدیر",
        shop_manager: "پلورنځی منتظم",
        cashier: "کیشیر",
        customer: "پیرودونکی"
      },
      statuses: {
        active: "فعال",
        inactive: "غیر فعال",
        pending: "په انتظار کې",
        suspended: "ځنډول شوی"
      },
      paymentStatuses: {
        approved: "منظور شوی",
        pending: "په انتظار کې",
        submitted: "سپارل شوی",
        expired: "ختم شوی"
      },
      userDeleted: "کارونکی په بریالیتوب سره ړنګ شو!"
    },
    fa: {
      backToDashboard: "بازگشت به داشبورد",
      title: "مدیریت کاربران",
      subtitle: "مشاهده و مدیریت تمام کاربران سیستم",
      searchPlaceholder: "جستجوی کاربران...",
      statusLabel: "وضعیت",
      roleLabel: "نقش",
      sortByLabel: "مرتب سازی بر اساس",
      allStatus: "همه وضعیت‌ها",
      allRoles: "همه نقش‌ها",
      active: "فعال",
      inactive: "غیرفعال",
      pending: "در انتظار",
      suspended: "تعلیق شده",
      sortOptions: {
        joinDate: "تاریخ عضویت",
        name: "نام",
        status: "وضعیت"
      },
      showing: "نمایش",
      of: "از",
      page: "صفحه",
      actions: "عملیات",
      view: "مشاهده",
      delete: "حذف",
      userDetails: "جزئیات کاربر",
      addressInformation: "اطلاعات آدرس",
      professionalInformation: "اطلاعات حرفه‌ای",
      preferences: "ترجیحات",
      accountStats: "آمار حساب",
      addressLine1: "آدرس خط 1",
      addressLine2: "آدرس خط 2",
      city: "شهر",
      state: "استان",
      postalCode: "کد پستی",
      country: "کشور",
      occupation: "شغل",
      company: "شرکت",
      annualIncome: "درآمد سالانه",
      purpose: "هدف",
      preferredCurrency: "ارز ترجیحی",
      newsletter: "خبرنامه",
      smsAlerts: "هشدارهای SMS",
      marketingEmails: "ایمیل‌های بازاریابی",
      subscribed: "عضویت دارد",
      notSubscribed: "عضویت ندارد",
      enabled: "فعال",
      disabled: "غیرفعال",
      optedIn: "انتخاب شده",
      optedOut: "انتخاب نشده",
      notSpecified: "مشخص نشده",
      lastLogin: "آخرین ورود",
      loginCount: "تعداد ورود",
      transactions: "تراکنش‌ها",
      totalVolume: "حجم کل",
      accountValidUntil: "اعتبار حساب تا",
      joinDate: "تاریخ عضویت",
      payment: "پرداخت",
      id: "شناسه",
      dob: "تاریخ تولد",
      joined: "عضو شده",
      deleteTitle: "حذف کاربر",
      deleteMessage: "آیا مطمئن هستید که می‌خواهید حذف کنید",
      deleteWarning: "این عمل قابل بازگشت نیست.",
      deleteButton: "حذف",
      cancelButton: "لغو",
      deleting: "در حال حذف...",
      close: "بستن",
      roles: {
        system_admin: "مدیر سیستم",
        shop_admin: "مدیر فروشگاه",
        shop_manager: "سرپرست فروشگاه",
        cashier: "صندوقدار",
        customer: "مشتری"
      },
      statuses: {
        active: "فعال",
        inactive: "غیرفعال",
        pending: "در انتظار",
        suspended: "تعلیق شده"
      },
      paymentStatuses: {
        approved: "تایید شده",
        pending: "در انتظار",
        submitted: "ارسال شده",
        expired: "منقضی شده"
      },
      userDeleted: "کاربر با موفقیت حذف شد!"
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
  const { users = [], loading, total, pages, error } = useSelector((state) => state.systemAdminAllUsers || { users: [] });
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.systemAdminDeleteUser || {});
  const { user: currentUser } = useSelector((state) => state.loginUser);

  // Get country name from code
  const getCountryName = (countryCode) => {
    const country = Country.getCountryByCode(countryCode);
    return country ? country.name : countryCode;
  };

  // Fetch users on component mount and when filters change
  useEffect(() => {
    fetchUsers();
  }, [currentPage, filters.status, filters.role, filters.search, filters.sortBy, filters.sortOrder]);

  const fetchUsers = () => {
    dispatch(systemAdminGetAllUsersAction(
      currentPage, 
      itemsPerPage, 
      filters.search, 
      filters.status, 
      filters.role, 
      filters.sortBy, 
      filters.sortOrder
    ));
  };

  // Handle delete success
  useEffect(() => {
    if (deleteSuccess) {
      setIsLoading(false);
      setShowModal(false);
      setSelectedUser(null);
      fetchUsers(); // Refresh the list
      toast.success(t.userDeleted);
      dispatch({ type: 'SYSTEM_ADMIN_DELETE_USER_RESET' });
    }
  }, [deleteSuccess, dispatch, t]);

  // Handle delete error
  useEffect(() => {
    if (deleteError) {
      setIsLoading(false);
      toast.error(deleteError);
      dispatch(clearSystemAdminErrors());
    }
  }, [deleteError, dispatch]);

  // Handle API error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSystemAdminErrors());
    }
  }, [error, dispatch]);

  // Handle user actions
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setModalType('view');
    setShowModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setModalType('delete');
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    setIsLoading(true);
    await dispatch(systemAdminDeleteUserAction(selectedUser.id));
  };

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    navigate('/system-admin-dashboard');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'suspended': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'submitted': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'expired': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'system_admin': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'shop_admin': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'shop_manager': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'cashier': return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
      case 'customer': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage) || pages || 1;

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Content */}
      <main className="transition-all duration-300">
        <div className="p-4 lg:p-8">
          {/* Header with Back Button */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              {/* Back to Dashboard Button */}
              <button
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl transition-all group"
                style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
              >
                <ArrowLeft size={18} className="text-green-500 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm text-gray-300 group-hover:text-white">{t.backToDashboard}</span>
              </button>
              
              <div className="h-8 w-px bg-gray-700 hidden lg:block"></div>
              
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">{t.title}</h1>
                <p className="text-gray-400 mt-1">{t.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div className="relative">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                <input 
                  type="text" 
                  value={filters.search} 
                  onChange={(e) => setFilters({...filters, search: e.target.value, currentPage: 1})} 
                  placeholder={t.searchPlaceholder} 
                  className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 w-full sm:w-auto`} 
                />
              </div>
              <button onClick={fetchUsers} className="p-2 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700">
                <RefreshCw size={20} className="text-gray-400" />
              </button>
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                  <Grid3x3 size={18} className={viewMode === 'grid' ? 'text-green-500' : 'text-gray-400'} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                  <List size={18} className={viewMode === 'list' ? 'text-green-500' : 'text-gray-400'} />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.statusLabel}</label>
                <select 
                  value={filters.status} 
                  onChange={(e) => setFilters({...filters, status: e.target.value, currentPage: 1})} 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                >
                  <option value="">{t.allStatus}</option>
                  <option value="active">{t.active}</option>
                  <option value="inactive">{t.inactive}</option>
                  <option value="pending">{t.pending}</option>
                  <option value="suspended">{t.suspended}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.roleLabel}</label>
                <select 
                  value={filters.role} 
                  onChange={(e) => setFilters({...filters, role: e.target.value, currentPage: 1})} 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                >
                  <option value="">{t.allRoles}</option>
                  <option value="system_admin">{t.roles.system_admin}</option>
                  <option value="shop_admin">{t.roles.shop_admin}</option>
                  <option value="shop_manager">{t.roles.shop_manager}</option>
                  <option value="cashier">{t.roles.cashier}</option>
                  <option value="customer">{t.roles.customer}</option>
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
                    <option value="createdAt">{t.sortOptions.joinDate}</option>
                    <option value="profile.fullName">{t.sortOptions.name}</option>
                    <option value="status">{t.sortOptions.status}</option>
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
                <p className="text-sm text-gray-400">{t.showing} {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, users.length)} {t.of} {users.length}</p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              {/* Users Grid View */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentItems.map((user) => (
                    <div key={user.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-green-500/30 transition-all">
                      <div className="flex items-start justify-between mb-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <div className="flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {user.fullName?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{user.fullName}</h3>
                            <p className="text-xs text-gray-400">{t.id}: #{user.id?.slice(-6)}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-300">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-400" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <Mail size={12} className={`${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <Phone size={12} className={`${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <MapPin size={12} className={`${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
                          <span className="truncate">{user.city}, {getCountryName(user.country)}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                          {t.statuses[user.status] || user.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                          {t.roles[user.role] || user.role?.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(user.paymentStatus)}`}>
                          {t.payment}: {t.paymentStatuses[user.paymentStatus] || user.paymentStatus}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-400">{t.transactions}</p>
                          <p className="text-sm font-bold text-white">{user.totalTransactions || 0}</p>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-400">{t.totalVolume}</p>
                          <p className="text-sm font-bold text-green-500">{user.totalVolume || '$0'}</p>
                        </div>
                      </div>
                      {user.paymentExpiry && (
                        <div className="mb-4 p-2 bg-gray-700/30 rounded-lg text-center">
                          <p className="text-xs text-gray-400">{t.accountValidUntil}</p>
                          <p className="text-xs font-medium text-yellow-500">{formatDate(user.paymentExpiry)}</p>
                        </div>
                      )}
                      <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <button 
                          onClick={() => handleViewUser(user)} 
                          className="flex-1 p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 flex items-center justify-center space-x-1"
                        >
                          <Eye size={14} />
                          <span className="text-xs">{t.view}</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user)} 
                          className="flex-1 p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 flex items-center justify-center space-x-1"
                        >
                          <Trash2 size={14} />
                          <span className="text-xs">{t.delete}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead className="bg-gray-700/50 border-b border-gray-600">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.sortOptions.name}</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Contact</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.country}</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.statusLabel}/{t.roleLabel}</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.payment}</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.joinDate}</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">{t.actions}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {currentItems.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-700/50">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                  {user.fullName?.charAt(0) || 'U'}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">{user.fullName}</p>
                                  <p className="text-xs text-gray-400">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-300">{user.phone}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-300">{user.city}</p>
                              <p className="text-xs text-gray-500">{getCountryName(user.country)}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                                  {t.statuses[user.status] || user.status}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)} ml-1`}>
                                  {t.roles[user.role] || user.role?.replace('_', ' ')}
                                </span>
                              </div>
                             </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(user.paymentStatus)}`}>
                                {t.paymentStatuses[user.paymentStatus] || user.paymentStatus}
                              </span>
                             </td>
                            <td className="px-6 py-4 text-sm text-gray-300">{formatDate(user.joinedDate)}</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                                <button 
                                  onClick={() => handleViewUser(user)} 
                                  className="p-1 hover:bg-blue-500/20 rounded"
                                >
                                  <Eye size={16} className="text-blue-500" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteUser(user)} 
                                  className="p-1 hover:bg-red-500/20 rounded"
                                >
                                  <Trash2 size={16} className="text-red-500" />
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

 {/* View User Modal */}
{showModal && modalType === 'view' && selectedUser && (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
    <div className="flex min-h-full items-center justify-center p-4">
      <div className="relative transform overflow-hidden rounded-3xl bg-gray-800 text-left shadow-2xl w-full max-w-4xl border border-gray-700" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="bg-gradient-to-r from-green-600 to-red-600 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h3 className="text-lg font-semibold text-white flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <User className="w-5 h-5 mr-2" />
            {t.userDetails}
          </h3>
          <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-gray-700/50 rounded-xl p-6 text-center border border-gray-600">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                  {selectedUser.fullName?.charAt(0) || 'U'}
                </div>
                <h4 className="text-lg font-bold text-white">{selectedUser.fullName}</h4>
                <p className="text-sm text-gray-400 mb-3">{t.id}: #{selectedUser.id?.slice(-6)}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedUser.status)}`}>
                    {t.statuses[selectedUser.status] || selectedUser.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(selectedUser.role)}`}>
                    {t.roles[selectedUser.role] || selectedUser.role?.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(selectedUser.paymentStatus)}`}>
                    {t.payment}: {t.paymentStatuses[selectedUser.paymentStatus] || selectedUser.paymentStatus}
                  </span>
                </div>
                <div className="space-y-2 text-left">
                  <div className="flex items-center text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Mail size={14} className={`text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className="text-gray-300 break-all">{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Phone size={14} className={`text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className="text-gray-300">{selectedUser.phone}</span>
                  </div>
                  <div className="flex items-center text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Calendar size={14} className={`text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className="text-gray-300">{t.dob}: {formatDate(selectedUser.dateOfBirth)}</span>
                  </div>
                  <div className="flex items-center text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Clock size={14} className={`text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className="text-gray-300">{t.joined}: {formatDate(selectedUser.joinedDate)}</span>
                  </div>
                  {selectedUser.paymentExpiry && (
                    <div className="flex items-center text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <AlertCircle size={14} className={`text-yellow-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <span className="text-yellow-300">{t.accountValidUntil}: {formatDate(selectedUser.paymentExpiry)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                <h5 className="text-sm font-semibold text-white mb-3">{t.accountStats}</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span className="text-gray-400">{t.lastLogin}</span>
                    <span className="text-white">{formatDate(selectedUser.lastLogin)}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span className="text-gray-400">{t.loginCount}</span>
                    <span className="text-white">{selectedUser.loginCount || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span className="text-gray-400">{t.transactions}</span>
                    <span className="text-white">{selectedUser.totalTransactions || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span className="text-gray-400">{t.totalVolume}</span>
                    <span className="text-green-500">{selectedUser.totalVolume || '$0'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                <h5 className="text-sm font-semibold text-white mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <MapPin className="w-4 h-4 mr-2 text-green-500" />
                  {t.addressInformation}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">{t.addressLine1}</p>
                    <p className="text-sm text-white">{selectedUser.addressLine1 || t.notSpecified}</p>
                  </div>
                  {selectedUser.addressLine2 && (
                    <div>
                      <p className="text-xs text-gray-400">{t.addressLine2}</p>
                      <p className="text-sm text-white">{selectedUser.addressLine2}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-400">{t.city}</p>
                    <p className="text-sm text-white">{selectedUser.city || t.notSpecified}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t.state}</p>
                    <p className="text-sm text-white">{selectedUser.state || t.notSpecified}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t.postalCode}</p>
                    <p className="text-sm text-white">{selectedUser.postalCode || t.notSpecified}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t.country}</p>
                    <p className="text-sm text-white">{getCountryName(selectedUser.country)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                <h5 className="text-sm font-semibold text-white mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Briefcase className="w-4 h-4 mr-2 text-green-500" />
                  {t.professionalInformation}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">{t.occupation}</p>
                    <p className="text-sm text-white">{selectedUser.occupation || t.notSpecified}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t.company}</p>
                    <p className="text-sm text-white">{selectedUser.companyName || t.notSpecified}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t.annualIncome}</p>
                    <p className="text-sm text-white">{selectedUser.annualIncome || t.notSpecified}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t.purpose}</p>
                    <p className="text-sm text-white">{selectedUser.purposeOfAccount || t.notSpecified}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                <h5 className="text-sm font-semibold text-white mb-3 flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <Star className="w-4 h-4 mr-2 text-green-500" />
                  {t.preferences}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">{t.preferredCurrency}</p>
                    <p className="text-sm text-white">{selectedUser.currencyPreference || 'USD'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t.newsletter}</p>
                    <p className="text-sm text-white">{selectedUser.newsletterSubscribed ? t.subscribed : t.notSubscribed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t.smsAlerts}</p>
                    <p className="text-sm text-white">{selectedUser.smsAlerts ? t.enabled : t.disabled}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t.marketingEmails}</p>
                    <p className="text-sm text-white">{selectedUser.agreeMarketing ? t.optedIn : t.optedOut}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-700/50 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 border-t border-gray-600" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            {t.close}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Delete Confirmation Modal */}
{showModal && modalType === 'delete' && selectedUser && (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
    <div className="flex min-h-full items-center justify-center p-4">
      <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 text-left shadow-2xl w-full max-w-md border border-gray-700" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle size={32} className="text-red-500" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-2">{t.deleteTitle}</h3>
          <p className="text-gray-400 text-center mb-6">
            {t.deleteMessage} <span className="font-semibold text-white">{selectedUser.fullName}</span>? {t.deleteWarning}
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <button 
              onClick={confirmDelete} 
              disabled={isLoading || deleteLoading} 
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
            >
              {(isLoading || deleteLoading) ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t.deleting}
                </>
              ) : t.deleteButton}
            </button>
            <button 
              onClick={() => setShowModal(false)} 
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              {t.cancelButton}
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

export default AdminUsers;