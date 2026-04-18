import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Users, FileText, Settings, Zap, LogOut, Bell, Search, Menu, X,
  DollarSign, Euro, Wallet, TrendingUp, TrendingDown, Plus, Minus, RefreshCw,
  Download, Upload, Calendar, Eye, EyeOff, ChevronRight, PieChart, Clock,
  CheckCircle, AlertCircle, Shield, User, Phone, Mail, MapPin, CreditCard,
  ArrowUpRight, ArrowDownRight, MoreVertical, ShoppingCart, Package, Truck,
  Warehouse, BarChart3, Receipt, Database, Shield as ShieldIcon, Gift,
  AlertTriangle, Printer, Box, Layers, TrendingUp as TrendIcon, Calculator,
  Users as UsersIcon, Briefcase, Save, HardDrive, Link2, Globe, Activity,
  LayoutDashboard, Grid3x3, Sparkles, Target, Rocket, Crown, Star,
  Info, Image, Camera, Paperclip, FileImage, Trash2,
  BookOpen, ClipboardList, Key, RefreshCcw, UserPlus, FileSpreadsheet,
  Landmark, Banknote, Send, Clock as ClockIcon, XCircle, Loader2, Lock
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUserAction, clearErrors, loadUserAction } from "../../actions/authActions";

// Import API actions
import { getAllProductsAction } from "../../actions/productActions";
import { getAllTransactionsAction, getTransactionStatsAction } from "../../actions/transactionActions";
import { getAllDailyRecordsAction, getDailyRecordStatsAction } from "../../actions/dailyRecordActions";
import { getAllLedgerEntriesAction, getLedgerStatsAction } from "../../actions/ledgerActions";
import { getAllPurchaseOrdersAction, getAllSuppliersAction } from "../../actions/purchaseActions";
import { getAllWarehousesAction, getAllTransfersAction } from "../../actions/warehouseActions";
import { getAllUsersAction, getUserStatsAction } from "../../actions/userActions";

// Currencies constant
const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
  { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', flag: '🇦🇫' }
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user from Redux store
  const { user, loading, error, isAuthenticatedUser } = useSelector((state) => state.loginUser);
  const userRole = user?.role;
  const isCustomer = userRole === 'customer';
  const isShopAdmin = userRole === 'shop_admin';
  const isSystemAdmin = userRole === 'system_admin';
  const userPermissions = user?.shopData?.permissions || user?.adminData?.permissions || [];
  const hasFullAccess = userPermissions.includes('all');
  
  // API Data States
  const { products, stats: productStats } = useSelector((state) => state.allProducts || {});
  const { transactions, summary: transactionSummary } = useSelector((state) => state.allTransactions || {});
  const { records: dailyRecords, summary: dailySummary } = useSelector((state) => state.allDailyRecords || {});
  const { entries: ledgerEntries, summary: ledgerSummary } = useSelector((state) => state.allLedgerEntries || {});
  const { orders: purchaseOrders, stats: purchaseStats } = useSelector((state) => state.allPurchaseOrders || {});
  const { warehouses, stats: warehouseStats } = useSelector((state) => state.allWarehouses || {});
  const { users, stats: userStats } = useSelector((state) => state.allUsers || {});
  
  const [showBalances, setShowBalances] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('pakistan');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [transactionReference, setTransactionReference] = useState('');
  const fileInputRef = useRef(null);
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Language translations
  const translations = {
    en: {
      // Header & Navigation
      dashboardOverview: "Dashboard Overview",
      welcomeBack: "Welcome back",
      completeBusinessSystem: "Complete business management system with POS and Inventory.",
      newSale: "New Sale",
      logout: "Logout",
      dashboard: "Dashboard",
      admin: "Admin",
      manager: "Manager",
      cashier: "Cashier",
      customer: "Customer",
      
      // Stats Cards
      todaySales: "Today's Sales",
      fromTransactions: "From {count} transactions",
      totalProfit: "Total Profit",
      estimatedMargin: "Estimated 20% margin",
      lowStockAlerts: "Low Stock Alerts",
      requiresAction: "Requires immediate action",
      allStocksHealthy: "All stocks are healthy",
      totalProducts: "Total Products",
      acrossWarehouses: "Across {count} warehouses",
      
      // Modules Section
      mainModules: "Main Modules",
      fullAccess: "Full access to all modules",
      accessOutOf: "Access to {count} module(s) out of {total}",
      yourRole: "Your Role",
      permissions: "Permissions",
      accessGranted: "Access Granted",
      locked: "Locked",
      requires: "Requires",
      
      // Account Settings
      accountSettings: "Account Settings",
      manageProfile: "Manage your profile and security settings",
      alwaysAccessible: "Always Accessible",
      
      // Currency Section
      currencyBalances: "Currency Balances",
      totalPortfolioValue: "Total Portfolio Value (USD)",
      acrossCurrencies: "Across {count} currencies",
      allCurrencies: "All Currencies",
      
      // Recent Activities
      recentActivities: "Recent Activities",
      latestUpdates: "Latest updates from all modules",
      viewAll: "View All",
      
      // Payment Modal
      accountActivationPayment: "Account Activation Payment",
      paymentDesc: "Choose your country and complete payment",
      selectCountry: "Select Your Country",
      bankAccountDetails: "Bank Account Details",
      uploadPaymentScreenshot: "Upload Payment Screenshot",
      uploadFile: "Upload a file",
      dragDrop: "or drag and drop",
      fileFormats: "PNG, JPG, JPEG up to 5MB",
      screenshotSuccess: "Screenshot uploaded successfully",
      transactionReferenceNumber: "Transaction Reference Number",
      transactionRefPlaceholder: "Enter transaction ID or reference number",
      transactionRefHelp: "Enter the reference number from your bank transaction",
      paymentInstructions: "Payment Instructions",
      paymentInstructionsText: "Please transfer the exact amount to the above bank account. After payment, upload the screenshot and enter transaction reference. Your account will be activated within 24 hours after verification.",
      cancel: "Cancel",
      submitPaymentProof: "Submit Payment Proof",
      processing: "Processing...",
      thankYouPayment: "Thank You for Your Payment!",
      paymentSubmitted: "Your payment proof has been successfully submitted. Your account activation request is now pending review.",
      whatHappensNext: "What happens next?",
      verifyPayment: "Our system admin will verify your payment screenshot",
      verificationTime: "Verification typically takes 24-48 hours",
      emailConfirmation: "You will receive an email confirmation once your account is activated",
      fullAccessAfterActivation: "After activation, you'll have full access to all features",
      transactionReferenceLabel: "Transaction Reference",
      saveReference: "Please save this reference number for future inquiries",
      continueToDashboard: "Continue to Dashboard",
      
      // Module Names
      pos: "POS (Point of Sale)",
      inventoryManagement: "Inventory Management",
      purchaseSystem: "Purchase System",
      warehouseManagement: "Warehouse Management",
      reportsAnalytics: "Reports & Analytics",
      userManagement: "User Management",
      customerTransactions: "Customer Transactions",
      dailyRecords: "Daily Records",
      ledgerManagement: "Ledger Management",
      updatePassword: "Update Password",
      viewProfile: "View Profile",
      
      // Module Descriptions
      posDesc: "Fast checkout with barcode scanner",
      inventoryDesc: "Track products, batches, expiry dates",
      purchaseDesc: "Manage suppliers and purchase orders",
      warehouseDesc: "Multi-warehouse stock management",
      reportsDesc: "Sales and profit reports",
      userDesc: "Role-based access control",
      customersDesc: "Manage customer transactions",
      dailyRecordsDesc: "Manage daily income/spend",
      ledgerDesc: "Manage ledger entries",
      updatePasswordDesc: "Change your password",
      viewProfileDesc: "View your profile",
      
      // Module Badges
      active: "Active",
      critical: "Critical",
      newData: "New Data",
      secure: "Secure",
      quickAction: "Quick Action",
      daily: "Daily",
      security: "Security",
      info: "Info",
      
      // Payment Details
      pakistan: "Pakistan",
      afghanistan: "Afghanistan",
      year: "year",
      
      // Alerts
      highCpuAlert: "High CPU usage detected on main server",
      maintenanceAlert: "Scheduled maintenance in 2 hours",
      backupAlert: "Database backup completed successfully",
      failedLoginAlert: "Failed login attempts from IP",
      
      // Success/Error Messages
      loggedOutSuccess: "Logged out successfully!",
      logoutFailed: "Logout failed. Please try again.",
      uploadImageError: "Please upload an image file (PNG, JPG, JPEG)",
      fileSizeError: "File size should be less than 5MB",
      screenshotRequired: "Please upload payment screenshot",
      transactionRefRequired: "Please enter transaction reference number",
      paymentProofSubmitted: "Payment proof submitted successfully! Admin will review and activate your account.",
      
      // Loading
      loadingDashboard: "Loading dashboard...",
      
      // Role Names
      shopAdmin: "Shop Admin",
      shopManager: "Manager",
      cashierRole: "Cashier",
      customerRole: "Customer",
      
      // Additional
      today: "Today",
      from: "From",
      transactions: "transactions",
      estimated: "Estimated",
      margin: "margin",
      requiresImmediateAction: "Requires immediate action",
      allStocksHealthyText: "All stocks are healthy",
      lowStock: "Low Stock"
    },
    ur: {
      dashboardOverview: "ڈیش بورڈ کا جائزہ",
      welcomeBack: "خوش آمدید",
      completeBusinessSystem: "POS اور انوینٹری کے ساتھ مکمل کاروباری انتظامی نظام۔",
      newSale: "نئی فروخت",
      logout: "لاگ آؤٹ",
      dashboard: "ڈیش بورڈ",
      admin: "ایڈمن",
      manager: "مینیجر",
      cashier: "کیشیئر",
      customer: "کسٹمر",
      
      todaySales: "آج کی فروخت",
      fromTransactions: "{count} لین دین سے",
      totalProfit: "کل منافع",
      estimatedMargin: "تخمینہ 20% منافع",
      lowStockAlerts: "کم اسٹاک الرٹس",
      requiresAction: "فوری کارروائی کی ضرورت ہے",
      allStocksHealthy: "تمام اسٹاک صحت مند ہیں",
      totalProducts: "کل مصنوعات",
      acrossWarehouses: "{count} گوداموں میں",
      
      mainModules: "اہم ماڈیولز",
      fullAccess: "تمام ماڈیولز تک مکمل رسائی",
      accessOutOf: "{total} میں سے {count} ماڈیول(ز) تک رسائی",
      yourRole: "آپ کا کردار",
      permissions: "اجازتیں",
      accessGranted: "رسائی دی گئی",
      locked: "مقفل",
      requires: "درکار ہے",
      
      accountSettings: "اکاؤنٹ کی ترتیبات",
      manageProfile: "اپنی پروفائل اور سیکیورٹی ترتیبات کا نظم کریں",
      alwaysAccessible: "ہمیشہ قابل رسائی",
      
      currencyBalances: "کرنسی بیلنس",
      totalPortfolioValue: "کل پورٹ فولیو ویلیو (USD)",
      acrossCurrencies: "{count} کرنسیوں میں",
      allCurrencies: "تمام کرنسیاں",
      
      recentActivities: "حالیہ سرگرمیاں",
      latestUpdates: "تمام ماڈیولز سے تازہ ترین اپ ڈیٹس",
      viewAll: "سب دیکھیں",
      
      accountActivationPayment: "اکاؤنٹ ایکٹیویشن ادائیگی",
      paymentDesc: "اپنا ملک منتخب کریں اور ادائیگی مکمل کریں",
      selectCountry: "اپنا ملک منتخب کریں",
      bankAccountDetails: "بینک اکاؤنٹ کی تفصیلات",
      uploadPaymentScreenshot: "ادائیگی کا اسکرین شاٹ اپ لوڈ کریں",
      uploadFile: "فائل اپ لوڈ کریں",
      dragDrop: "یا گھسیٹیں اور چھوڑیں",
      fileFormats: "PNG, JPG, JPEG 5MB تک",
      screenshotSuccess: "اسکرین شاٹ کامیابی سے اپ لوڈ ہو گیا",
      transactionReferenceNumber: "ٹرانزیکشن حوالہ نمبر",
      transactionRefPlaceholder: "ٹرانزیکشن ID یا حوالہ نمبر درج کریں",
      transactionRefHelp: "بینک ٹرانزیکشن سے حوالہ نمبر درج کریں",
      paymentInstructions: "ادائیگی کی ہدایات",
      paymentInstructionsText: "براہ کرم عین رقم مندرجہ بالا بینک اکاؤنٹ میں منتقل کریں۔ ادائیگی کے بعد، اسکرین شاٹ اپ لوڈ کریں اور ٹرانزیکشن حوالہ درج کریں۔ تصدیق کے بعد آپ کا اکاؤنٹ 24 گھنٹوں میں فعال کر دیا جائے گا۔",
      cancel: "منسوخ کریں",
      submitPaymentProof: "ادائیگی کا ثبوت جمع کروائیں",
      processing: "کارروائی ہو رہی ہے...",
      thankYouPayment: "آپ کی ادائیگی کا شکریہ!",
      paymentSubmitted: "آپ کا ادائیگی کا ثبوت کامیابی سے جمع کر دیا گیا ہے۔ آپ کے اکاؤنٹ ایکٹیویشن کی درخواست زیر جائزہ ہے۔",
      whatHappensNext: "آگے کیا ہوتا ہے؟",
      verifyPayment: "ہمارا سسٹم ایڈمن آپ کے ادائیگی کے اسکرین شاٹ کی تصدیق کرے گا",
      verificationTime: "تصدیق میں عام طور پر 24-48 گھنٹے لگتے ہیں",
      emailConfirmation: "اکاؤنٹ فعال ہونے پر آپ کو ای میل تصدیق موصول ہوگی",
      fullAccessAfterActivation: "فعال ہونے کے بعد، آپ کو تمام خصوصیات تک مکمل رسائی حاصل ہوگی",
      transactionReferenceLabel: "ٹرانزیکشن حوالہ",
      saveReference: "براہ کرم مستقبل کی پوچھ گچھ کے لیے یہ حوالہ نمبر محفوظ رکھیں",
      continueToDashboard: "ڈیش بورڈ پر جاری رکھیں",
      
      pos: "POS (پوائنٹ آف سیل)",
      inventoryManagement: "انوینٹری مینجمنٹ",
      purchaseSystem: "پرچیز سسٹم",
      warehouseManagement: "گودام مینجمنٹ",
      reportsAnalytics: "رپورٹس اور تجزیات",
      userManagement: "یوزر مینجمنٹ",
      customerTransactions: "کسٹمر ٹرانزیکشنز",
      dailyRecords: "ڈیلی ریکارڈز",
      ledgerManagement: "لیجر مینجمنٹ",
      updatePassword: "پاس ورڈ اپ ڈیٹ کریں",
      viewProfile: "پروفائل دیکھیں",
      
      posDesc: "بارکوڈ اسکینر کے ساتھ تیز چیک آؤٹ",
      inventoryDesc: "مصنوعات، بیچز، میعاد ختم ہونے کی تاریخوں کا سراغ لگائیں",
      purchaseDesc: "سپلائرز اور پرچیز آرڈرز کا نظم کریں",
      warehouseDesc: "ملٹی گودام اسٹاک مینجمنٹ",
      reportsDesc: "فروخت اور منافع کی رپورٹس",
      userDesc: "کردار پر مبنی رسائی کنٹرول",
      customersDesc: "کسٹمر ٹرانزیکشنز کا نظم کریں",
      dailyRecordsDesc: "روزانہ کی آمدنی/خرچ کا نظم کریں",
      ledgerDesc: "لیجر اندراجات کا نظم کریں",
      updatePasswordDesc: "اپنا پاس ورڈ تبدیل کریں",
      viewProfileDesc: "اپنی پروفائل دیکھیں",
      
      active: "فعال",
      critical: "نازک",
      newData: "نیا ڈیٹا",
      secure: "محفوظ",
      quickAction: "فوری کارروائی",
      daily: "روزانہ",
      security: "سیکیورٹی",
      info: "معلومات",
      
      pakistan: "پاکستان",
      afghanistan: "افغانستان",
      year: "سال",
      
      highCpuAlert: "مین سرور پر ہائی CPU استعمال کا پتہ چلا",
      maintenanceAlert: "2 گھنٹے میں طے شدہ دیکھ بھال",
      backupAlert: "ڈیٹابیس بیک اپ کامیابی سے مکمل ہوگیا",
      failedLoginAlert: "IP سے لاگ ان کی ناکام کوششیں",
      
      loggedOutSuccess: "کامیابی سے لاگ آؤٹ ہوگیا!",
      logoutFailed: "لاگ آؤٹ ناکام۔ براہ کرم دوبارہ کوشش کریں۔",
      uploadImageError: "براہ کرم ایک تصویری فائل اپ لوڈ کریں (PNG, JPG, JPEG)",
      fileSizeError: "فائل کا سائز 5MB سے کم ہونا چاہیے",
      screenshotRequired: "براہ کرم ادائیگی کا اسکرین شاٹ اپ لوڈ کریں",
      transactionRefRequired: "براہ کرم ٹرانزیکشن حوالہ نمبر درج کریں",
      paymentProofSubmitted: "ادائیگی کا ثبوت کامیابی سے جمع کر دیا گیا! ایڈمن جائزہ لے کر آپ کا اکاؤنٹ فعال کر دے گا۔",
      
      loadingDashboard: "ڈیش بورڈ لوڈ ہو رہا ہے...",
      
      shopAdmin: "دکان ایڈمن",
      shopManager: "مینیجر",
      cashierRole: "کیشیئر",
      customerRole: "کسٹمر",
      
      today: "آج",
      from: "سے",
      transactions: "لین دین",
      estimated: "تخمینہ",
      margin: "منافع",
      requiresImmediateAction: "فوری کارروائی کی ضرورت ہے",
      allStocksHealthyText: "تمام اسٹاک صحت مند ہیں",
      lowStock: "کم اسٹاک"
    },
    ps: {
      dashboardOverview: "ډشبورډ کتنه",
      welcomeBack: "ښه راغلاست",
      completeBusinessSystem: "د POS او انوینټري سره بشپړ سوداګریز مدیریت سیسټم.",
      newSale: "نوی پلور",
      logout: "وتل",
      dashboard: "ډشبورډ",
      admin: "مدیر",
      manager: "مدیر",
      cashier: "کیشیر",
      customer: "پیرودونکی",
      
      todaySales: "نن ورځ پلور",
      fromTransactions: "د {count} راکړو ورکړو څخه",
      totalProfit: "ټټل ګټه",
      estimatedMargin: "اټکل شوی 20٪ ګټه",
      lowStockAlerts: "د ټیټ ذخیرې خبرتیاوې",
      requiresAction: "فوري عمل ته اړتیا لري",
      allStocksHealthy: "ټول ذخیرې صحتمند دي",
      totalProducts: "ټول محصولات",
      acrossWarehouses: "په {count} ګودامونو کې",
      
      mainModules: "اصلي ماډلونه",
      fullAccess: "ټولو ماډلونو ته بشپړ لاسرسی",
      accessOutOf: "د {total} څخه {count} ماډل(ونو) ته لاسرسی",
      yourRole: "ستاسو رول",
      permissions: "اجازې",
      accessGranted: "لاسرسی ورکړل شو",
      locked: "تړل شوی",
      requires: "اړتیا لري",
      
      accountSettings: "د حساب ترتیبات",
      manageProfile: "خپل پروفایل او امنیتي ترتیبات اداره کړئ",
      alwaysAccessible: "تل د لاسرسي وړ",
      
      currencyBalances: "د اسعارو توازن",
      totalPortfolioValue: "ټول پورټ فولیو ارزښت (USD)",
      acrossCurrencies: "په {count} اسعارو کې",
      allCurrencies: "ټول اسعار",
      
      recentActivities: "وروستي فعالیتونه",
      latestUpdates: "د ټولو ماډلونو څخه وروستي تازه معلومات",
      viewAll: "ټول وګورئ",
      
      accountActivationPayment: "د حساب فعالولو تادیه",
      paymentDesc: "خپل هیواد غوره کړئ او تادیه بشپړه کړئ",
      selectCountry: "خپل هیواد وټاکئ",
      bankAccountDetails: "د بانک حساب جزیات",
      uploadPaymentScreenshot: "د تادیې سکرین شاټ اپلوډ کړئ",
      uploadFile: "فایل اپلوډ کړئ",
      dragDrop: "یا کش کړئ او پریږدئ",
      fileFormats: "PNG, JPG, JPEG تر 5MB پورې",
      screenshotSuccess: "سکرین شاټ بریالی شو",
      transactionReferenceNumber: "د راکړې ورکړې حواله شمېره",
      transactionRefPlaceholder: "د راکړې ورکړې ID یا حواله شمېره دننه کړئ",
      transactionRefHelp: "د بانک د راکړې ورکړې حواله شمېره دننه کړئ",
      paymentInstructions: "د تادیې لارښوونې",
      paymentInstructionsText: "مهرباني وکړئ دقیقه اندازه پورته بانک حساب ته ولېږدئ. د تادیې وروسته، سکرین شاټ اپلوډ کړئ او د راکړې ورکړې حواله دننه کړئ. ستاسو حساب به د تصدیق وروسته په 24 ساعتونو کې فعال شي.",
      cancel: "لغوه کړئ",
      submitPaymentProof: "د تادیې ثبوت وسپارئ",
      processing: "پرمختګ کې دی...",
      thankYouPayment: "ستاسو د تادیې مننه!",
      paymentSubmitted: "ستاسو د تادیې ثبوت بریالی شو. ستاسو د حساب فعالولو غوښتنه اوس د بیاکتنې په حال کې ده.",
      whatHappensNext: "ورپسې څه کیږي؟",
      verifyPayment: "زموږ سیسټم مدیر به ستاسو د تادیې سکرین شاټ تایید کړي",
      verificationTime: "تایید عموماً 24-48 ساعته وخت نیسي",
      emailConfirmation: "کله چې حساب فعال شي تاسو به د بریښنالیک تصدیق ترلاسه کړئ",
      fullAccessAfterActivation: "د فعالولو وروسته، تاسو به ټولو ځانګړتیاوو ته بشپړ لاسرسی ولرئ",
      transactionReferenceLabel: "د راکړې ورکړې حواله",
      saveReference: "مهرباني وکړئ دا حواله شمېره د راتلونکو پوښتنو لپاره خوندي کړئ",
      continueToDashboard: "ډشبورډ ته دوام ورکړئ",
      
      pos: "POS (د پلور نقطه)",
      inventoryManagement: "د انوینټري مدیریت",
      purchaseSystem: "د پیرود سیسټم",
      warehouseManagement: "د ګودام مدیریت",
      reportsAnalytics: "رپورټونه او تحلیلونه",
      userManagement: "د کارونکي مدیریت",
      customerTransactions: "د پیرودونکو راکړې ورکړې",
      dailyRecords: "ورځني ریکارډونه",
      ledgerManagement: "د لیجر مدیریت",
      updatePassword: "پاسورډ تازه کړئ",
      viewProfile: "پروفایل وګورئ",
      
      posDesc: "د بارکوډ سکینر سره چټک چک آوټ",
      inventoryDesc: "محصولات، بیچونه، د پای نیټې تعقیب کړئ",
      purchaseDesc: "سپلائران او د پیرود امرونه اداره کړئ",
      warehouseDesc: "د څو ګودامونو ذخیره مدیریت",
      reportsDesc: "د پلور او ګټې راپورونه",
      userDesc: "د رول پر بنسټ لاسرسی کنټرول",
      customersDesc: "د پیرودونکو راکړې ورکړې اداره کړئ",
      dailyRecordsDesc: "ورځنی عاید/لګښت اداره کړئ",
      ledgerDesc: "د لیجر داخلې اداره کړئ",
      updatePasswordDesc: "خپل پاسورډ بدل کړئ",
      viewProfileDesc: "خپل پروفایل وګورئ",
      
      active: "فعال",
      critical: "حساس",
      newData: "نوی ډاټا",
      secure: "خوندي",
      quickAction: "چټک عمل",
      daily: "ورځنی",
      security: "امنیت",
      info: "معلومات",
      
      pakistan: "پاکستان",
      afghanistan: "افغانستان",
      year: "کال",
      
      highCpuAlert: "په اصلي سرور کې د CPU لوړ استعمال کشف شو",
      maintenanceAlert: "په 2 ساعتونو کې ټاکل شوی ساتنه",
      backupAlert: "د ډیټابیس بیک اپ بریالی شو",
      failedLoginAlert: "د IP څخه د ننوتلو ناکامې هڅې",
      
      loggedOutSuccess: "بریالی وتل!",
      logoutFailed: "وتل ناکام شو. مهرباني وکړئ بیا هڅه وکړئ.",
      uploadImageError: "مهرباني وکړئ د انځور فایل اپلوډ کړئ (PNG, JPG, JPEG)",
      fileSizeError: "د فایل اندازه باید له 5MB څخه کمه وي",
      screenshotRequired: "مهرباني وکړئ د تادیې سکرین شاټ اپلوډ کړئ",
      transactionRefRequired: "مهرباني وکړئ د راکړې ورکړې حواله شمېره دننه کړئ",
      paymentProofSubmitted: "د تادیې ثبوت بریالی شو! مدیر به بیاکتنه وکړي او ستاسو حساب به فعال کړي.",
      
      loadingDashboard: "ډشبورډ لوډ کیږي...",
      
      shopAdmin: "د پلورنځي مدیر",
      shopManager: "مدیر",
      cashierRole: "کیشیر",
      customerRole: "پیرودونکی",
      
      today: "نن",
      from: "څخه",
      transactions: "راکړې ورکړې",
      estimated: "اټکل شوی",
      margin: "ګټه",
      requiresImmediateAction: "فوري عمل ته اړتیا لري",
      allStocksHealthyText: "ټول ذخیرې صحتمند دي",
      lowStock: "ټیټ ذخیره"
    },
    fa: {
      dashboardOverview: "بررسی داشبورد",
      welcomeBack: "خوش آمدید",
      completeBusinessSystem: "سیستم کامل مدیریت کسب و کار با POS و انبارداری.",
      newSale: "فروش جدید",
      logout: "خروج",
      dashboard: "داشبورد",
      admin: "مدیر",
      manager: "مدیر",
      cashier: "صندوقدار",
      customer: "مشتری",
      
      todaySales: "فروش امروز",
      fromTransactions: "از {count} تراکنش",
      totalProfit: "سود کل",
      estimatedMargin: "حاشیه سود تخمینی 20٪",
      lowStockAlerts: "هشدارهای موجودی کم",
      requiresAction: "نیاز به اقدام فوری",
      allStocksHealthy: "همه موجودی‌ها سالم هستند",
      totalProducts: "کل محصولات",
      acrossWarehouses: "در {count} انبار",
      
      mainModules: "ماژول‌های اصلی",
      fullAccess: "دسترسی کامل به همه ماژول‌ها",
      accessOutOf: "دسترسی به {count} ماژول از {total}",
      yourRole: "نقش شما",
      permissions: "مجوزها",
      accessGranted: "دسترسی داده شده",
      locked: "قفل شده",
      requires: "نیاز دارد",
      
      accountSettings: "تنظیمات حساب",
      manageProfile: "پروفایل و تنظیمات امنیتی خود را مدیریت کنید",
      alwaysAccessible: "همیشه قابل دسترسی",
      
      currencyBalances: "موجودی ارزها",
      totalPortfolioValue: "ارزش کل پورتفولیو (USD)",
      acrossCurrencies: "در {count} ارز",
      allCurrencies: "همه ارزها",
      
      recentActivities: "فعالیت‌های اخیر",
      latestUpdates: "آخرین به‌روزرسانی‌ها از همه ماژول‌ها",
      viewAll: "مشاهده همه",
      
      accountActivationPayment: "پرداخت فعال‌سازی حساب",
      paymentDesc: "کشور خود را انتخاب کنید و پرداخت را کامل کنید",
      selectCountry: "کشور خود را انتخاب کنید",
      bankAccountDetails: "جزئیات حساب بانکی",
      uploadPaymentScreenshot: "آپلود اسکرین شات پرداخت",
      uploadFile: "آپلود فایل",
      dragDrop: "یا بکشید و رها کنید",
      fileFormats: "PNG, JPG, JPEG حداکثر 5MB",
      screenshotSuccess: "اسکرین شات با موفقیت آپلود شد",
      transactionReferenceNumber: "شماره مرجع تراکنش",
      transactionRefPlaceholder: "شناسه تراکنش یا شماره مرجع را وارد کنید",
      transactionRefHelp: "شماره مرجع تراکنش بانکی خود را وارد کنید",
      paymentInstructions: "دستورالعمل‌های پرداخت",
      paymentInstructionsText: "لطفاً مبلغ دقیق را به حساب بانکی فوق انتقال دهید. پس از پرداخت، اسکرین شات را آپلود کنید و مرجع تراکنش را وارد کنید. حساب شما ظرف 24 ساعت پس از تأیید فعال می‌شود.",
      cancel: "لغو",
      submitPaymentProof: "ارسال مدرک پرداخت",
      processing: "در حال پردازش...",
      thankYouPayment: "از پرداخت شما متشکریم!",
      paymentSubmitted: "مدرک پرداخت شما با موفقیت ارسال شد. درخواست فعال‌سازی حساب شما در انتظار بررسی است.",
      whatHappensNext: "بعداً چه اتفاقی می‌افتد؟",
      verifyPayment: "مدیر سیستم ما اسکرین شات پرداخت شما را تأیید می‌کند",
      verificationTime: "تأیید معمولاً 24-48 ساعت طول می‌کشد",
      emailConfirmation: "پس از فعال شدن حساب، تأییدیه ایمیل دریافت خواهید کرد",
      fullAccessAfterActivation: "پس از فعال‌سازی، به تمام ویژگی‌ها دسترسی کامل خواهید داشت",
      transactionReferenceLabel: "مرجع تراکنش",
      saveReference: "لطفاً این شماره مرجع را برای سوالات بعدی ذخیره کنید",
      continueToDashboard: "ادامه به داشبورد",
      
      pos: "POS (نقطه فروش)",
      inventoryManagement: "مدیریت انبار",
      purchaseSystem: "سیستم خرید",
      warehouseManagement: "مدیریت انبار",
      reportsAnalytics: "گزارش‌ها و تحلیل‌ها",
      userManagement: "مدیریت کاربران",
      customerTransactions: "تراکنش‌های مشتری",
      dailyRecords: "رکوردهای روزانه",
      ledgerManagement: "مدیریت دفتر کل",
      updatePassword: "به‌روزرسانی رمز عبور",
      viewProfile: "مشاهده پروفایل",
      
      posDesc: "تسویه حساب سریع با اسکنر بارکد",
      inventoryDesc: "پیگیری محصولات، دسته‌ها، تاریخ انقضا",
      purchaseDesc: "مدیریت تأمین‌کنندگان و سفارشات خرید",
      warehouseDesc: "مدیریت موجودی چند انبار",
      reportsDesc: "گزارش‌های فروش و سود",
      userDesc: "کنترل دسترسی مبتنی بر نقش",
      customersDesc: "مدیریت تراکنش‌های مشتری",
      dailyRecordsDesc: "مدیریت درآمد/هزینه روزانه",
      ledgerDesc: "مدیریت ورودی‌های دفتر کل",
      updatePasswordDesc: "تغییر رمز عبور شما",
      viewProfileDesc: "مشاهده پروفایل شما",
      
      active: "فعال",
      critical: "بحرانی",
      newData: "داده جدید",
      secure: "امن",
      quickAction: "اقدام سریع",
      daily: "روزانه",
      security: "امنیت",
      info: "اطلاعات",
      
      pakistan: "پاکستان",
      afghanistan: "افغانستان",
      year: "سال",
      
      highCpuAlert: "استفاده زیاد از CPU در سرور اصلی تشخیص داده شد",
      maintenanceAlert: "نگهداری برنامه‌ریزی شده در 2 ساعت آینده",
      backupAlert: "پشتیبان‌گیری از پایگاه داده با موفقیت انجام شد",
      failedLoginAlert: "تلاش‌های ناموفق برای ورود از IP",
      
      loggedOutSuccess: "با موفقیت خارج شدید!",
      logoutFailed: "خروج ناموفق بود. لطفاً دوباره تلاش کنید.",
      uploadImageError: "لطفاً یک فایل تصویری آپلود کنید (PNG, JPG, JPEG)",
      fileSizeError: "اندازه فایل باید کمتر از 5MB باشد",
      screenshotRequired: "لطفاً اسکرین شات پرداخت را آپلود کنید",
      transactionRefRequired: "لطفاً شماره مرجع تراکنش را وارد کنید",
      paymentProofSubmitted: "مدرک پرداخت با موفقیت ارسال شد! مدیر بررسی کرده و حساب شما را فعال می‌کند.",
      
      loadingDashboard: "در حال بارگذاری داشبورد...",
      
      shopAdmin: "مدیر فروشگاه",
      shopManager: "مدیر",
      cashierRole: "صندوقدار",
      customerRole: "مشتری",
      
      today: "امروز",
      from: "از",
      transactions: "تراکنش‌ها",
      estimated: "تخمینی",
      margin: "حاشیه سود",
      requiresImmediateAction: "نیاز به اقدام فوری",
      allStocksHealthyText: "همه موجودی‌ها سالم هستند",
      lowStock: "موجودی کم"
    }
  };

  // Payment details based on country
  const paymentDetails = {
    pakistan: {
      country: 'Pakistan',
      bankName: 'United Bank Limited',
      accountNo: '0092032983293828',
      iban: 'PK12UBLP0092032983293828',
      charges: '5000',
      currency: 'PKR'
    },
    afghanistan: {
      country: 'Afghanistan',
      bankName: 'State Bank of Afghanistan',
      accountNo: '0092032983293828',
      iban: 'AF1243483948342323',
      charges: '2500',
      currency: 'AFN'
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

  // Get currency symbol
  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

  const formatAmount = (amount, currency) => {
    if (!amount && amount !== 0) return 'N/A';
    const symbol = getCurrencySymbol(currency || 'USD');
    return `${symbol} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Fetch real data from APIs
  useEffect(() => {
    if (!isCustomer && (hasFullAccess || userPermissions.includes('inventory'))) {
      dispatch(getAllProductsAction(1, 9999));
    }
    if (!isCustomer && (hasFullAccess || userPermissions.includes('customers'))) {
      dispatch(getAllTransactionsAction(1, 9999));
      dispatch(getTransactionStatsAction());
    }
    if (!isCustomer && (hasFullAccess || userPermissions.includes('backup'))) {
      dispatch(getAllDailyRecordsAction(1, 9999));
      dispatch(getDailyRecordStatsAction());
    }
    if (!isCustomer && (hasFullAccess || userPermissions.includes('ledger'))) {
      dispatch(getAllLedgerEntriesAction(1, 9999));
      dispatch(getLedgerStatsAction());
    }
    if (!isCustomer && (hasFullAccess || userPermissions.includes('purchases'))) {
      dispatch(getAllPurchaseOrdersAction(1, 9999));
      dispatch(getAllSuppliersAction(1, 9999));
    }
    if (!isCustomer && (hasFullAccess || userPermissions.includes('warehouse'))) {
      dispatch(getAllWarehousesAction());
      dispatch(getAllTransfersAction());
    }
    if (!isCustomer && (hasFullAccess || userPermissions.includes('users'))) {
      dispatch(getAllUsersAction(1, 9999));
      dispatch(getUserStatsAction());
    }
  }, [dispatch, isCustomer, hasFullAccess, userPermissions]);

  // Calculate real stats from API data
  const getRealStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTransactions = (transactions || []).filter(t => {
      if (!t.date) return false;
      const transactionDate = new Date(t.date);
      return transactionDate >= today;
    });
    const todaySales = todayTransactions.reduce((sum, t) => sum + (t.senderAmount || 0), 0);
    const totalProfit = todaySales * 0.2;
    const lowStockItems = (products || []).filter(p => (p.currentStock || 0) <= (p.reorderLevel || 10)).length;
    const totalProducts = (products || []).length;
    
    return { todaySales, totalProfit, lowStockItems, totalProducts, todayTransactionsCount: todayTransactions.length };
  };
  
  const realStats = getRealStats();
  
  // Calculate currency balances from transactions
  const getCurrencyBalances = () => {
    const balances = {};
    
    (transactions || []).forEach(t => {
      const currency = t.senderCurrency || 'USD';
      const amount = t.senderAmount || 0;
      if (!balances[currency]) balances[currency] = 0;
      balances[currency] += amount;
    });
    
    (dailyRecords || []).forEach(record => {
      if (record.incomeEntries) {
        record.incomeEntries.forEach(entry => {
          const currency = entry.currency || 'USD';
          const amount = entry.amount || 0;
          if (!balances[currency]) balances[currency] = 0;
          balances[currency] += amount;
        });
      }
      if (record.spendEntries) {
        record.spendEntries.forEach(entry => {
          const currency = entry.currency || 'USD';
          const amount = entry.amount || 0;
          if (!balances[currency]) balances[currency] = 0;
          balances[currency] -= amount;
        });
      }
    });
    
    return balances;
  };
  
  const currencyBalancesData = getCurrencyBalances();
  
  const currencyBalances = Object.entries(currencyBalancesData).map(([code, balance]) => {
    const currency = currencies.find(c => c.code === code);
    return {
      code,
      name: currency?.name || code,
      symbol: currency?.symbol || '$',
      balance: Math.abs(balance),
      flag: currency?.flag || '🌍',
      change: '+0%',
      trend: 'up'
    };
  }).sort((a, b) => b.balance - a.balance);
  
  const totalBalanceUSD = currencyBalances.reduce((acc, curr) => {
    const rates = { USD: 1, EUR: 1.08, GBP: 1.26, PKR: 0.0036, AED: 0.27, AFN: 0.011 };
    return acc + (curr.balance * (rates[curr.code] || 0));
  }, 0);

  const getRecentActivities = () => {
    const activities = [];
    
    (transactions || []).slice(0, 3).forEach(t => {
      activities.push({
        id: `sale-${t.id}`,
        module: 'POS',
        action: 'Sale completed',
        details: `${formatAmount(t.senderAmount, t.senderCurrency)}`,
        time: t.date ? formatRelativeTime(t.date) : 'recent',
        icon: ShoppingCart,
        color: 'bg-green-100 text-green-600'
      });
    });
    
    (products || []).filter(p => (p.currentStock || 0) <= (p.reorderLevel || 10)).slice(0, 3).forEach(p => {
      activities.push({
        id: `lowstock-${p.id}`,
        module: 'Inventory',
        action: 'Low stock alert',
        details: `${p.name} (${p.currentStock || 0} left)`,
        time: 'urgent',
        icon: AlertTriangle,
        color: 'bg-red-100 text-red-600'
      });
    });
    
    (purchaseOrders || []).slice(0, 2).forEach(o => {
      activities.push({
        id: `order-${o.id}`,
        module: 'Purchase',
        action: 'Order created',
        details: `${o.orderNumber} - ${formatAmount(o.totalAmount, o.currency)}`,
        time: o.orderDate ? formatRelativeTime(o.orderDate) : 'recent',
        icon: Truck,
        color: 'bg-purple-100 text-purple-600'
      });
    });
    
    return activities.slice(0, 5);
  };
  
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMins = Math.floor((now - date) / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };
  
  const recentActivities = getRecentActivities();

  // Check if user has access to a module
  const hasModuleAccess = (moduleId) => {
    if (isCustomer) return false;
    if (hasFullAccess) return true;
    return userPermissions.includes(moduleId);
  };

  // Module configuration with permissions
  const allModules = [
    { id: "pos", name: t.pos, icon: ShoppingCart, path: '/pos', bgColor: 'bg-green-100', textColor: 'text-green-600', description: t.posDesc, stats: 'Today: 18 sales | $2,450', badge: t.active, badgeColor: 'bg-green-100 text-green-700', requiredPermission: 'pos' },
    { id: "inventory", name: t.inventoryManagement, icon: Package, path: '/inventory', bgColor: 'bg-blue-100', textColor: 'text-blue-600', description: t.inventoryDesc, stats: '345 Products | 12 Low Stock', badge: t.critical, badgeColor: 'bg-red-100 text-red-700', requiredPermission: 'inventory' },
    { id: "purchases", name: t.purchaseSystem, icon: Truck, path: '/purchases', bgColor: 'bg-purple-100', textColor: 'text-purple-600', description: t.purchaseDesc, stats: '24 Suppliers | 8 Orders', badge: t.active, badgeColor: 'bg-green-100 text-green-700', requiredPermission: 'purchases' },
    { id: "warehouses", name: t.warehouseManagement, icon: Warehouse, path: '/warehouses', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600', description: t.warehouseDesc, stats: '3 Warehouses | 12 Transfers', badge: t.active, badgeColor: 'bg-green-100 text-green-700', requiredPermission: 'warehouse' },
    { id: "reports", name: t.reportsAnalytics, icon: BarChart3, path: '/reports', bgColor: 'bg-red-100', textColor: 'text-red-600', description: t.reportsDesc, stats: 'Monthly Growth: +23%', badge: t.newData, badgeColor: 'bg-blue-100 text-blue-700', requiredPermission: 'reports' },
    { id: "users", name: t.userManagement, icon: Users, path: '/users', bgColor: 'bg-indigo-100', textColor: 'text-indigo-600', description: t.userDesc, stats: '12 Users | 3 Roles', badge: t.secure, badgeColor: 'bg-green-100 text-green-700', requiredPermission: 'users' },
    { id: "customers", name: t.customerTransactions, icon: UserPlus, path: '/customer-registration', bgColor: 'bg-teal-100', textColor: 'text-teal-600', description: t.customersDesc, stats: '5 New Today', badge: t.quickAction, badgeColor: 'bg-purple-100 text-purple-700', requiredPermission: 'customers' },
    { id: "backup", name: t.dailyRecords, icon: ClipboardList, path: '/daily-records', bgColor: 'bg-orange-100', textColor: 'text-orange-600', description: t.dailyRecordsDesc, stats: '24 Records', badge: t.daily, badgeColor: 'bg-orange-100 text-orange-700', requiredPermission: 'backup' },
    { id: "ledger", name: t.ledgerManagement, icon: BookOpen, path: '/ledger-record', bgColor: 'bg-cyan-100', textColor: 'text-cyan-600', description: t.ledgerDesc, stats: 'Updated Today', badge: t.active, badgeColor: 'bg-green-100 text-green-700', requiredPermission: 'ledger' }
  ];
 
  // Profile & Password modules (always accessible to everyone)
  const profileModules = [
    { id: "update-password", name: t.updatePassword, icon: Key, path: '/update-password', bgColor: 'bg-amber-100', textColor: 'text-amber-600', description: t.updatePasswordDesc, stats: 'Last update: 30 days ago', badge: t.security, badgeColor: 'bg-red-100 text-red-700' },
    { id: "view-profile", name: t.viewProfile, icon: User, path: '/me', bgColor: 'bg-slate-100', textColor: 'text-slate-600', description: t.viewProfileDesc, stats: 'Profile Complete', badge: t.info, badgeColor: 'bg-blue-100 text-blue-700' }
  ];

  // Filter modules based on user permissions
  const mainModules = allModules.filter(module => hasModuleAccess(module.id));

  // Check if payment modal should show on mount (only for customers)
  useEffect(() => {
    if (location.state && location.state.showPaymentModal && isCustomer) {
      setShowPaymentModal(true);
    }
  }, [location, isCustomer]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAction());
      toast.success(t.loggedOutSuccess);
      navigate('/login');
    } catch (error) {
      toast.error(t.logoutFailed);
    }
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error(t.uploadImageError);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t.fileSizeError);
        return;
      }
      
      setScreenshotFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
      };
      reader.readAsDataURL(file);
      toast.success(t.screenshotSuccess);
    }
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePaymentSubmit = () => {
    if (!screenshotFile) {
      toast.error(t.screenshotRequired);
      return;
    }
    if (!transactionReference) {
      toast.error(t.transactionRefRequired);
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      const paymentInfo = {
        country: selectedCountry,
        amount: paymentDetails[selectedCountry].charges,
        currency: paymentDetails[selectedCountry].currency,
        transactionReference: transactionReference,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      localStorage.setItem('pendingPayment', JSON.stringify(paymentInfo));
      
      toast.success(t.paymentProofSubmitted);
    }, 1500);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSubmitted(false);
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setTransactionReference('');
  };

  const getTrendIcon = (trend) => trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />;

  // Get role display name
  const getRoleDisplayName = () => {
    if (userRole === 'shop_admin') return t.shopAdmin;
    if (userRole === 'shop_manager') return t.shopManager;
    if (userRole === 'cashier') return t.cashierRole;
    if (userRole === 'customer') return t.customerRole;
    return userRole?.replace('_', ' ') || t.customer;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loadingDashboard}</p>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Payment Modal - Only show for customers */}
      {showPaymentModal && isCustomer && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {!submitted ? (
              <>
                <div className={`sticky top-0 bg-white border-b p-5 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Banknote className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{t.accountActivationPayment}</h2>
                      <p className="text-xs text-gray-500">{t.paymentDesc}</p>
                    </div>
                  </div>
                  <button onClick={closePaymentModal} className="text-gray-400 hover:text-gray-600">
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="p-6">
                  {/* Country Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectCountry}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedCountry('pakistan')}
                        className={`p-4 rounded-xl border-2 transition-all ${selectedCountry === 'pakistan' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="text-3xl">🇵🇰</span>
                            <div className={`text-left ${isRTL ? 'text-right' : ''}`}>
                              <p className="font-semibold">{t.pakistan}</p>
                              <p className="text-xs text-gray-500">PKR 5,000/{t.year}</p>
                            </div>
                          </div>
                          {selectedCountry === 'pakistan' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                      </button>
                      <button
                        onClick={() => setSelectedCountry('afghanistan')}
                        className={`p-4 rounded-xl border-2 transition-all ${selectedCountry === 'afghanistan' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="text-3xl">🇦🇫</span>
                            <div className={`text-left ${isRTL ? 'text-right' : ''}`}>
                              <p className="font-semibold">{t.afghanistan}</p>
                              <p className="text-xs text-gray-500">AFN 2,500/{t.year}</p>
                            </div>
                          </div>
                          {selectedCountry === 'afghanistan' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
                    <h3 className={`font-semibold text-gray-900 mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Landmark className="w-4 h-4 text-green-600" />
                      {t.bankAccountDetails}
                    </h3>
                    <div className="space-y-3">
                      <div className={`flex justify-between items-center py-2 border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-500">{t.selectCountry}</span>
                        <span className="font-medium text-gray-900">{selectedCountry === 'pakistan' ? t.pakistan : t.afghanistan}</span>
                      </div>
                      <div className={`flex justify-between items-center py-2 border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-500">Bank Name</span>
                        <span className="font-medium text-gray-900">{paymentDetails[selectedCountry].bankName}</span>
                      </div>
                      <div className={`flex justify-between items-center py-2 border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-500">Account Number</span>
                        <span className="font-mono text-sm font-medium text-gray-900">{paymentDetails[selectedCountry].accountNo}</span>
                      </div>
                      <div className={`flex justify-between items-center py-2 border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-500">IBAN Number</span>
                        <span className="font-mono text-xs font-medium text-gray-900">{paymentDetails[selectedCountry].iban}</span>
                      </div>
                      <div className={`flex justify-between items-center py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-500">Annual Charges</span>
                        <span className="text-lg font-bold text-green-600">{paymentDetails[selectedCountry].charges} {paymentDetails[selectedCountry].currency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Screenshot Upload Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.uploadPaymentScreenshot} <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-green-500 transition-colors">
                      {!screenshotPreview ? (
                        <div className="space-y-1 text-center">
                          <div className="flex justify-center">
                            <Image className="w-12 h-12 text-gray-400" />
                          </div>
                          <div className="flex text-sm text-gray-600 justify-center">
                            <label
                              htmlFor="screenshot-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                            >
                              <span>{t.uploadFile}</span>
                              <input
                                ref={fileInputRef}
                                id="screenshot-upload"
                                name="screenshot-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleScreenshotUpload}
                              />
                            </label>
                            <p className="pl-1">{t.dragDrop}</p>
                          </div>
                          <p className="text-xs text-gray-500">{t.fileFormats}</p>
                        </div>
                      ) : (
                        <div className="relative w-full">
                          <div className="relative">
                            <img 
                              src={screenshotPreview} 
                              alt={t.paymentScreenshot || "Payment Screenshot"} 
                              className="max-h-48 mx-auto rounded-lg border border-gray-200"
                            />
                            <button
                              onClick={removeScreenshot}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-center text-xs text-gray-500 mt-2">
                            {t.screenshotSuccess}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction Reference */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.transactionReferenceNumber} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={transactionReference}
                      onChange={(e) => setTransactionReference(e.target.value)}
                      placeholder={t.transactionRefPlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t.transactionRefHelp}
                    </p>
                  </div>

                  {/* Payment Instructions */}
                  <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                    <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">{t.paymentInstructions}</p>
                        <p className="text-xs text-blue-700 mt-1">
                          {t.paymentInstructionsText}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={closePaymentModal}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </button>
                    <button
                      onClick={handlePaymentSubmit}
                      disabled={isSubmitting || !screenshotFile || !transactionReference}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{t.processing}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>{t.submitPaymentProof}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.thankYouPayment}</h2>
                <p className="text-gray-600 mb-4">
                  {t.paymentSubmitted}
                </p>
                <div className="bg-yellow-50 rounded-xl p-5 mb-6 border border-yellow-200">
                  <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <ClockIcon className="w-6 h-6 text-yellow-600" />
                    <p className="text-md font-semibold text-yellow-800">{t.whatHappensNext}</p>
                  </div>
                  <ul className={`space-y-2 text-sm text-yellow-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{t.verifyPayment}</span>
                    </li>
                    <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{t.verificationTime}</span>
                    </li>
                    <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{t.emailConfirmation}</span>
                    </li>
                    <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{t.fullAccessAfterActivation}</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-6">
                  <p className="text-sm text-green-800">
                    <strong>{t.transactionReferenceLabel}:</strong> {transactionReference}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {t.saveReference}
                  </p>
                </div>
                <button
                  onClick={closePaymentModal}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                >
                  {t.continueToDashboard}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

    

   

      {/* Main Content */}
      <main className={`transition-all duration-300`}>
        <div className="p-4 lg:p-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div>
              <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Sparkles className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">{t.dashboardOverview}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {t.welcomeBack}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">{user?.profile?.fullName || 'User'}</span>
              </h1>
              <p className="text-gray-600 mt-1">{t.completeBusinessSystem}</p>
            </div>
            <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-xl relative bg-white shadow-sm">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              </div>
              {!isCustomer && hasModuleAccess('pos') && (
                <Link to="/pos">
                  <button className={`px-4 py-2 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-xl hover:shadow-lg flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <ShoppingCart size={18} />
                    <span>{t.newSale}</span>
                  </button>
                </Link>
              )}
              <button onClick={handleLogout} className={`flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <LogOut size={18} />
                <span>{t.logout}</span>
              </button>
              <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                  {user?.profile?.fullName?.charAt(0) || 'U'}
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold">{user?.profile?.fullName || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{getRoleDisplayName()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards with Real Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.todaySales}</p>
                  <p className="text-2xl font-bold text-gray-900">{formatAmount(realStats.todaySales, 'USD')}</p>
                  <div className={`flex items-center mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">{t.fromTransactions.replace('{count}', realStats.todayTransactionsCount)}</p>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-xl"><ShoppingCart className="h-6 w-6 text-green-600" /></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.totalProfit}</p>
                  <p className="text-2xl font-bold text-gray-900">{formatAmount(realStats.totalProfit, 'USD')}</p>
                  <div className={`flex items-center mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">{t.estimatedMargin}</p>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl"><TrendingUp className="h-6 w-6 text-blue-600" /></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.lowStockAlerts}</p>
                  <p className="text-2xl font-bold text-red-600">{realStats.lowStockItems}</p>
                  <p className="text-xs text-red-600 mt-2">
                    {realStats.lowStockItems > 0 ? t.requiresAction : t.allStocksHealthy}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-xl"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.totalProducts}</p>
                  <p className="text-2xl font-bold text-gray-900">{realStats.totalProducts}</p>
                  <p className="text-xs text-gray-600 mt-2">{t.acrossWarehouses.replace('{count}', warehouses?.length || 0)}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl"><Package className="h-6 w-6 text-purple-600" /></div>
              </div>
            </div>
          </div>

          {/* Main Modules Grid with Beautiful Lock Icons */}
          <div className="mb-8">
            <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{t.mainModules}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {hasFullAccess 
                    ? t.fullAccess 
                    : t.accessOutOf.replace('{count}', mainModules.length).replace('{total}', allModules.length)}
                </p>
              </div>
              {!hasFullAccess && userPermissions.length > 0 && (
                <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {t.yourRole}: {getRoleDisplayName()} | {t.permissions}: {userPermissions.join(', ')}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allModules.map((module) => {
                const hasAccess = hasModuleAccess(module.id);
                const Icon = module.icon;
                
                if (hasAccess) {
                  return (
                    <Link key={module.id} to={module.path}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all cursor-pointer h-full flex flex-col group">
                        <div className={`w-12 h-12 ${module.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-6 w-6 ${module.textColor}`} />
                        </div>
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : ''}`}>{module.name}</h3>
                        <p className={`text-sm text-gray-600 mb-3 flex-grow leading-relaxed ${isRTL ? 'text-right' : ''}`}>{module.description}</p>
                        <div className={`flex items-center justify-between mt-auto pt-3 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <CheckCircle size={12} />
                            {t.accessGranted}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${module.badgeColor}`}>{module.badge}</span>
                        </div>
                      </div>
                    </Link>
                  );
                } else {
                  return (
                    <div key={module.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg border border-gray-200 cursor-not-allowed h-full flex flex-col relative overflow-hidden group">
                      {/* Background Lock Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <Lock size={80} className="text-gray-600" />
                        </div>
                      </div>
                      
                      {/* Lock Icon in Top Right */}
                      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10`}>
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                          <Lock className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      
                      <div className={`w-12 h-12 ${module.bgColor} rounded-xl flex items-center justify-center mb-4 opacity-50 relative z-10`}>
                        <Icon className={`h-6 w-6 ${module.textColor}`} />
                      </div>
                      <h3 className={`text-lg font-semibold text-gray-500 mb-2 relative z-10 ${isRTL ? 'text-right' : ''}`}>{module.name}</h3>
                      <p className={`text-sm text-gray-400 mb-3 flex-grow leading-relaxed relative z-10 ${isRTL ? 'text-right' : ''}`}>{module.description}</p>
                      <div className={`flex items-center justify-between mt-auto pt-3 border-t border-gray-200 relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Lock size={10} />
                          {t.requires}: {module.requiredPermission}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-500 flex items-center gap-1">
                          <Lock size={10} />
                          {t.locked}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* Profile & Password Modules (Always Accessible) */}
          <div className="mb-8">
            <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{t.accountSettings}</h2>
                <p className="text-sm text-gray-500 mt-1">{t.manageProfile}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {profileModules.map((module) => {
                const Icon = module.icon;
                return (
                  <Link key={module.id} to={module.path}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all cursor-pointer h-full flex flex-col group">
                      <div className={`w-12 h-12 ${module.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-6 w-6 ${module.textColor}`} />
                      </div>
                      <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : ''}`}>{module.name}</h3>
                      <p className={`text-sm text-gray-600 mb-3 flex-grow leading-relaxed ${isRTL ? 'text-right' : ''}`}>{module.description}</p>
                      <div className={`flex items-center justify-between mt-auto pt-3 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-xs text-blue-600 flex items-center gap-1">
                          <CheckCircle size={12} />
                          {t.alwaysAccessible}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${module.badgeColor}`}>{module.badge}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Currency Balances Section - Only for non-customers */}
          {!isCustomer && currencyBalances.length > 0 && (
            <div className="mb-8">
              <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className="text-xl font-bold text-gray-900">{t.currencyBalances}</h2>
                <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <button onClick={() => setShowBalances(!showBalances)} className="p-2 hover:bg-gray-100 rounded-lg bg-white shadow-sm">
                    {showBalances ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                    <option value="all">{t.allCurrencies}</option>
                    {currencyBalances.map(c => (<option key={c.code} value={c.code}>{c.code}</option>))}
                  </select>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-red-600 rounded-2xl p-6 text-white mb-6 shadow-xl">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <p className="text-sm opacity-90">{t.totalPortfolioValue}</p>
                    <h3 className="text-3xl font-bold mt-2">{showBalances ? `$${totalBalanceUSD.toLocaleString()}` : '••••••'}</h3>
                    <p className="text-xs opacity-75 mt-1">{t.acrossCurrencies.replace('{count}', currencyBalances.length)}</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"><Wallet size={32} /></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {currencyBalances.filter(c => selectedCurrency === 'all' || c.code === selectedCurrency).map((currency) => (
                  <div key={currency.code} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:border-green-500/30 transition-all">
                    <div className={`flex items-start justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <span className="text-2xl">{currency.flag}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{currency.code}</h3>
                          <p className="text-xs text-gray-500">{currency.name}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {getTrendIcon(currency.trend)}
                        <span className={`text-xs ${currency.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{currency.change}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {showBalances ? currency.symbol + ' ' + currency.balance.toLocaleString() : '••••••'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activities - Only for non-customers */}
          {!isCustomer && recentActivities.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{t.recentActivities}</h2>
                  <p className="text-xs text-gray-500 mt-1">{t.latestUpdates}</p>
                </div>
                {hasModuleAccess('reports') && (
                  <Link to="/reports" className={`text-sm text-green-600 hover:text-green-700 font-medium flex items-center space-x-1 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <span>{t.viewAll}</span><ChevronRight size={16} />
                  </Link>
                )}
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className={`flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.color}`}>
                        <activity.icon size={18} />
                      </div>
                      <div>
                        <p className={`font-medium text-gray-900 ${isRTL ? 'text-right' : ''}`}>
                          <span className="text-xs text-gray-500">[{activity.module}]</span> {activity.action}
                        </p>
                        <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{activity.details}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;