// src/modules/reports/Reports.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { 
  Calendar, Download, TrendingUp, TrendingDown, DollarSign, 
  Package, Users, ShoppingCart, ArrowLeft, Filter, Search,
  BarChart3, PieChart, LineChart, FileText, Printer,
  ChevronLeft, ChevronRight, X, Eye, CheckCircle, AlertCircle,
  Clock, Award, Percent, Receipt, CreditCard, Wallet,
  Activity, Zap, Target, Globe, Settings, RefreshCw,
  Warehouse, Truck, User, Copy, Grid3x3, Table as TableIcon,
  ChevronDown, Upload, Share2, Mail, MessageSquare,
  ZoomIn, ZoomOut, Maximize, Minimize, Layers,Loader
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { format, subDays, subWeeks, subMonths, subYears, startOfDay, endOfDay } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Import existing actions from your codebase
import { getAllProductsAction } from "../../actions/productActions";
import { getAllWarehousesAction, getAllTransfersAction } from "../../actions/warehouseActions";
import { getAllTransactionsAction, getTransactionStatsAction } from "../../actions/transactionActions";
import { getAllDailyRecordsAction, getDailyRecordStatsAction } from "../../actions/dailyRecordActions";
import { getAllLedgerEntriesAction, getLedgerStatsAction } from "../../actions/ledgerActions";
import { getAllPurchaseOrdersAction, getAllSuppliersAction } from "../../actions/purchaseActions";
import { getAllUsersAction, getUserStatsAction } from "../../actions/userActions";

// Report actions
import { 
  getSalesReportAction,
  getDiscountReportAction,
  clearErrors
} from "../../actions/reportActions";

// Language Translations
const translations = {
  en: {
    // Header
    backToDashboard: "Back to Dashboard",
    reportsAndAnalytics: "Reports & Analytics",
    comprehensiveInsights: "Comprehensive business insights and performance metrics",
    export: "Export",
    print: "Print",
    
    // Report Types
    salesReport: "Sales Report",
    inventory: "Inventory",
    warehouse: "Warehouse",
    purchases: "Purchases",
    customers: "Customers",
    dailyRecords: "Daily Records",
    ledger: "Ledger",
    discounts: "Discounts",
    
    // Filters
    dateRange: "Date Range:",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
    custom: "Custom",
    currency: "Currency:",
    allCurrencies: "All Currencies",
    warehouseFilter: "Warehouse:",
    allWarehouses: "All Warehouses",
    startDate: "Start Date",
    endDate: "End Date",
    apply: "Apply",
    
    // View Modes
    charts: "Charts",
    table: "Table",
    
    // Stats Labels
    totalSales: "Total Sales",
    totalOrders: "Total Orders",
    avgOrderValue: "Avg Order Value",
    totalProducts: "Total Products",
    totalStock: "Total Stock",
    totalInventoryValue: "Total Inventory Value",
    lowStockItems: "Low Stock Items",
    totalWarehouses: "Total Warehouses",
    totalCapacity: "Total Capacity",
    avgUtilization: "Avg Utilization",
    totalAmount: "Total Amount",
    delivered: "Delivered",
    pending: "Pending",
    totalCustomers: "Total Customers",
    totalSend: "Total Send",
    totalReceive: "Total Receive",
    totalFees: "Total Fees",
    totalIncome: "Total Income",
    totalSpend: "Total Spend",
    netBalance: "Net Balance",
    totalEntries: "Total Entries",
    totalRemaining: "Total Remaining",
    completed: "Completed",
    totalDiscounts: "Total Discounts",
    discountRate: "Discount Rate",
    
    // Chart
    overview: "Overview",
    period: "Period:",
    detailedBreakdown: "Detailed Breakdown",
    noData: "No data available for the selected period",
    page: "Page",
    of: "of",
    
    // Modal
    details: "Details",
    
    // Export Messages
    noDataToExport: "No data to export",
    exportedSuccessfully: "Exported successfully",
    generatingPDF: "Generating PDF...",
    pdfExportedSuccessfully: "PDF exported successfully",
    failedToGeneratePDF: "Failed to generate PDF",
    
    // Errors
    selectBothDates: "Please select both start and end dates"
  },
  ur: {
    // Header
    backToDashboard: "ڈیش بورڈ پر واپس",
    reportsAndAnalytics: "رپورٹس اور تجزیات",
    comprehensiveInsights: "جامع کاروباری بصیرت اور کارکردگی کے میٹرکس",
    export: "برآمد کریں",
    print: "پرنٹ کریں",
    
    // Report Types
    salesReport: "سیل رپورٹ",
    inventory: "انوینٹری",
    warehouse: "گودام",
    purchases: "خریداری",
    customers: "گاہک",
    dailyRecords: "روزانہ ریکارڈ",
    ledger: "لیجر",
    discounts: "چھوٹ",
    
    // Filters
    dateRange: "تاریخ کی حد:",
    daily: "روزانہ",
    weekly: "ہفتہ وار",
    monthly: "ماہانہ",
    yearly: "سالانہ",
    custom: "اپنی مرضی",
    currency: "کرنسی:",
    allCurrencies: "تمام کرنسیاں",
    warehouseFilter: "گودام:",
    allWarehouses: "تمام گودام",
    startDate: "شروع تاریخ",
    endDate: "اختتام تاریخ",
    apply: "لاگو کریں",
    
    // View Modes
    charts: "چارٹس",
    table: "ٹیبل",
    
    // Stats Labels
    totalSales: "کل سیلز",
    totalOrders: "کل آرڈرز",
    avgOrderValue: "اوسط آرڈر ویلیو",
    totalProducts: "کل مصنوعات",
    totalStock: "کل اسٹاک",
    totalInventoryValue: "کل انوینٹری ویلیو",
    lowStockItems: "کم اسٹاک اشیاء",
    totalWarehouses: "کل گودام",
    totalCapacity: "کل گنجائش",
    avgUtilization: "اوسط استعمال",
    totalAmount: "کل رقم",
    delivered: "ڈیلیور شدہ",
    pending: "زیر التواء",
    totalCustomers: "کل گاہک",
    totalSend: "کل بھیجا",
    totalReceive: "کل وصول کیا",
    totalFees: "کل فیس",
    totalIncome: "کل آمدنی",
    totalSpend: "کل خرچ",
    netBalance: "خالص بیلنس",
    totalEntries: "کل اندراجات",
    totalRemaining: "کل باقی",
    completed: "مکمل شدہ",
    totalDiscounts: "کل چھوٹ",
    discountRate: "چھوٹ کی شرح",
    
    // Chart
    overview: "جائزہ",
    period: "مدت:",
    detailedBreakdown: "تفصیلی خرابی",
    noData: "منتخب مدت کے لیے کوئی ڈیٹا دستیاب نہیں",
    page: "صفحہ",
    of: "کا",
    
    // Modal
    details: "تفصیلات",
    
    // Export Messages
    noDataToExport: "برآمد کرنے کے لیے کوئی ڈیٹا نہیں",
    exportedSuccessfully: "کامیابی سے برآمد ہو گیا",
    generatingPDF: "PDF تیار ہو رہا ہے...",
    pdfExportedSuccessfully: "PDF کامیابی سے برآمد ہو گئی",
    failedToGeneratePDF: "PDF تیار کرنے میں ناکام",
    
    // Errors
    selectBothDates: "براہ کرم شروع اور اختتام دونوں تاریخیں منتخب کریں"
  },
  ps: {
    // Header
    backToDashboard: "ډشبورډ ته شاته",
    reportsAndAnalytics: "رپورټونه او تحلیلات",
    comprehensiveInsights: "جامع سوداګریز بصیرت او فعالیت میټریکونه",
    export: "صادرول",
    print: "چاپول",
    
    // Report Types
    salesReport: "د پلور رپورټ",
    inventory: "انوینټري",
    warehouse: "ګودام",
    purchases: "اخیستنې",
    customers: "پیرودونکي",
    dailyRecords: "ورځني ریکارډونه",
    ledger: "لېجر",
    discounts: "تخفیفونه",
    
    // Filters
    dateRange: "نیټه محدوده:",
    daily: "ورځنی",
    weekly: "اونیز",
    monthly: "میاشتنی",
    yearly: "کلنی",
    custom: "دودیز",
    currency: "اسعار:",
    allCurrencies: "ټول اسعار",
    warehouseFilter: "ګودام:",
    allWarehouses: "ټول ګودامونه",
    startDate: "پیل نیټه",
    endDate: "پای نیټه",
    apply: "عملي کول",
    
    // View Modes
    charts: "چارتونه",
    table: "جدول",
    
    // Stats Labels
    totalSales: "ټول پلور",
    totalOrders: "ټول امرونه",
    avgOrderValue: "اوسط امر ارزښت",
    totalProducts: "ټول محصولات",
    totalStock: "ټول ذخیره",
    totalInventoryValue: "ټول انوینټري ارزښت",
    lowStockItems: "کم ذخیره توکي",
    totalWarehouses: "ټول ګودامونه",
    totalCapacity: "ټول ظرفیت",
    avgUtilization: "اوسط استعمال",
    totalAmount: "ټوله اندازه",
    delivered: "رسیدلی",
    pending: "په تمه",
    totalCustomers: "ټول پیرودونکي",
    totalSend: "ټول لیږل شوي",
    totalReceive: "ټول ترلاسه شوي",
    totalFees: "ټول فیسونه",
    totalIncome: "ټول عاید",
    totalSpend: "ټول لګښت",
    netBalance: "خالص بیلانس",
    totalEntries: "ټول داخلې",
    totalRemaining: "ټول پاتې",
    completed: "بشپړ شوي",
    totalDiscounts: "ټول تخفیفونه",
    discountRate: "تخفیف کچه",
    
    // Chart
    overview: "کتنه",
    period: "موده:",
    detailedBreakdown: "تفصیلي ماتول",
    noData: "د ټاکلې مودې لپاره معلومات نشته",
    page: "مخ",
    of: "د",
    
    // Modal
    details: "توضیحات",
    
    // Export Messages
    noDataToExport: "د صادرولو لپاره معلومات نشته",
    exportedSuccessfully: "په بریالیتوب سره صادر شو",
    generatingPDF: "PDF چمتو کیږي...",
    pdfExportedSuccessfully: "PDF په بریالیتوب سره صادر شوه",
    failedToGeneratePDF: "PDF چمتو کول ناکام شول",
    
    // Errors
    selectBothDates: "مهرباني وکړئ دواړه پیل او پای نیټې وټاکئ"
  },
  fa: {
    // Header
    backToDashboard: "بازگشت به داشبورد",
    reportsAndAnalytics: "گزارشات و تحلیل‌ها",
    comprehensiveInsights: "بینش جامع کسب و کار و معیارهای عملکرد",
    export: "خروجی",
    print: "چاپ",
    
    // Report Types
    salesReport: "گزارش فروش",
    inventory: "موجودی",
    warehouse: "انبار",
    purchases: "خریدها",
    customers: "مشتریان",
    dailyRecords: "سوابق روزانه",
    ledger: "دفتر کل",
    discounts: "تخفیف‌ها",
    
    // Filters
    dateRange: "بازه تاریخ:",
    daily: "روزانه",
    weekly: "هفتگی",
    monthly: "ماهانه",
    yearly: "سالانه",
    custom: "سفارشی",
    currency: "ارز:",
    allCurrencies: "همه ارزها",
    warehouseFilter: "انبار:",
    allWarehouses: "همه انبارها",
    startDate: "تاریخ شروع",
    endDate: "تاریخ پایان",
    apply: "اعمال",
    
    // View Modes
    charts: "نمودارها",
    table: "جدول",
    
    // Stats Labels
    totalSales: "کل فروش",
    totalOrders: "کل سفارشات",
    avgOrderValue: "میانگین ارزش سفارش",
    totalProducts: "کل محصولات",
    totalStock: "کل موجودی",
    totalInventoryValue: "کل ارزش موجودی",
    lowStockItems: "اقلام کم موجودی",
    totalWarehouses: "کل انبارها",
    totalCapacity: "کل ظرفیت",
    avgUtilization: "میانگین استفاده",
    totalAmount: "کل مبلغ",
    delivered: "تحویل شده",
    pending: "در انتظار",
    totalCustomers: "کل مشتریان",
    totalSend: "کل ارسالی",
    totalReceive: "کل دریافتی",
    totalFees: "کل کارمزدها",
    totalIncome: "کل درآمد",
    totalSpend: "کل هزینه",
    netBalance: "مانده خالص",
    totalEntries: "کل ورودی‌ها",
    totalRemaining: "کل باقیمانده",
    completed: "تکمیل شده",
    totalDiscounts: "کل تخفیف‌ها",
    discountRate: "نرخ تخفیف",
    
    // Chart
    overview: "بررسی اجمالی",
    period: "دوره:",
    detailedBreakdown: "تفکیک دقیق",
    noData: "داده‌ای برای دوره انتخاب شده موجود نیست",
    page: "صفحه",
    of: "از",
    
    // Modal
    details: "جزئیات",
    
    // Export Messages
    noDataToExport: "داده‌ای برای خروجی وجود ندارد",
    exportedSuccessfully: "با موفقیت خروجی گرفته شد",
    generatingPDF: "در حال تولید PDF...",
    pdfExportedSuccessfully: "PDF با موفقیت خروجی گرفته شد",
    failedToGeneratePDF: "تولید PDF ناموفق بود",
    
    // Errors
    selectBothDates: "لطفاً هر دو تاریخ شروع و پایان را انتخاب کنید"
  }
};

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

// Color palettes
const CHART_COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

const Reports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reportRef = useRef(null);
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Modal states
  const [showDrillDownModal, setShowDrillDownModal] = useState(false);
  const [drillDownData, setDrillDownData] = useState(null);
  
  // Redux State from existing reducers
  const { products } = useSelector((state) => state.allProducts || {});
  const { warehouses } = useSelector((state) => state.allWarehouses || {});
  const { transfers } = useSelector((state) => state.allTransfers || {});
  const { transactions } = useSelector((state) => state.allTransactions || {});
  const { records: dailyRecords } = useSelector((state) => state.allDailyRecords || {});
  const { entries: ledgerEntries } = useSelector((state) => state.allLedgerEntries || {});
  const { orders: purchaseOrders } = useSelector((state) => state.allPurchaseOrders || {});
  const { suppliers } = useSelector((state) => state.allSuppliers || {});
  const { users } = useSelector((state) => state.allUsers || {});
  
  // Report actions state
  const { report: salesReport, loading: salesLoading, error: salesError } = useSelector((state) => state.salesReport || {});
  const { report: discountReport, loading: discountLoading, error: discountError } = useSelector((state) => state.discountReport || {});
  
  // Local State
  const [activeReportType, setActiveReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('weekly');
  const [customStartDate, setCustomStartDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
  const [customEndDate, setCustomEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [viewMode, setViewMode] = useState('charts');
  const [chartType, setChartType] = useState('area');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [exportFormat, setExportFormat] = useState('csv');

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

  // Fetch initial data
  useEffect(() => {
    dispatch(getAllProductsAction(1, 9999));
    dispatch(getAllWarehousesAction());
    dispatch(getAllTransfersAction());
    dispatch(getAllTransactionsAction(1, 9999));
    dispatch(getTransactionStatsAction());
    dispatch(getAllDailyRecordsAction(1, 9999));
    dispatch(getDailyRecordStatsAction());
    dispatch(getAllLedgerEntriesAction(1, 9999));
    dispatch(getLedgerStatsAction());
    dispatch(getAllPurchaseOrdersAction(1, 9999));
    dispatch(getAllSuppliersAction(1, 9999));
    dispatch(getAllUsersAction(1, 9999));
    dispatch(getUserStatsAction());
  }, [dispatch]);

  // Fetch report data when date range changes
  useEffect(() => {
    const period = dateRange === 'custom' ? 'custom' : dateRange;
    const fromDate = dateRange === 'custom' ? customStartDate : '';
    const toDate = dateRange === 'custom' ? customEndDate : '';
    
    if (activeReportType === 'sales') {
      dispatch(getSalesReportAction(period, fromDate, toDate));
    } else if (activeReportType === 'discounts') {
      dispatch(getDiscountReportAction(period, fromDate, toDate));
    }
  }, [dispatch, activeReportType, dateRange, customStartDate, customEndDate]);

  // Handle errors
  useEffect(() => {
    if (salesError) toast.error(salesError);
    if (discountError) toast.error(discountError);
    dispatch(clearErrors());
  }, [salesError, discountError, dispatch]);

  // Get filtered data based on date range
  const getFilteredByDateRange = (data, dateField = 'date') => {
    if (!data || !Array.isArray(data)) return [];
    
    let startDate, endDate;
    const today = new Date();
    
    switch(dateRange) {
      case 'daily':
        startDate = startOfDay(today);
        endDate = endOfDay(today);
        break;
      case 'weekly':
        startDate = subWeeks(today, 1);
        endDate = today;
        break;
      case 'monthly':
        startDate = subMonths(today, 1);
        endDate = today;
        break;
      case 'yearly':
        startDate = subYears(today, 1);
        endDate = today;
        break;
      case 'custom':
        startDate = new Date(customStartDate);
        endDate = new Date(customEndDate);
        break;
      default:
        startDate = subWeeks(today, 1);
        endDate = today;
    }
    
    return data.filter(item => {
      const itemDate = new Date(item[dateField]);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  // Get filtered data by currency
  const getFilteredByCurrency = (data, currencyField = 'currency') => {
    if (selectedCurrency === 'all') return data;
    return data.filter(item => item[currencyField] === selectedCurrency);
  };

  // Sales Report Data from existing data (like Inventory component)
  const getSalesDataFromTransactions = () => {
    const filtered = getFilteredByDateRange(transactions || [], 'date');
    const currencyFiltered = getFilteredByCurrency(filtered, 'senderCurrency');
    
    // Calculate totals by currency (like Inventory component)
    const totalsByCurrency = {};
    currencyFiltered.forEach(t => {
      const curr = t.senderCurrency || 'USD';
      if (!totalsByCurrency[curr]) {
        totalsByCurrency[curr] = 0;
      }
      totalsByCurrency[curr] += t.senderAmount || 0;
    });
    
    const totalSales = currencyFiltered.reduce((sum, t) => sum + (t.senderAmount || 0), 0);
    const totalOrders = currencyFiltered.length;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    
    // Group by date for chart
    const chartData = {};
    currencyFiltered.forEach(t => {
      const date = format(new Date(t.date), 'yyyy-MM-dd');
      if (!chartData[date]) {
        chartData[date] = { date, sales: 0, orders: 0 };
      }
      chartData[date].sales += t.senderAmount || 0;
      chartData[date].orders += 1;
    });
    
    return {
      totalSales,
      totalOrders,
      avgOrderValue,
      totalsByCurrency,
      chartData: Object.values(chartData).sort((a, b) => a.date.localeCompare(b.date))
    };
  };

  // Inventory Report Data with multi-currency (like Inventory component)
  const getInventoryData = () => {
    const filteredProducts = getFilteredByCurrency(products || [], 'currency');
    
    const totalProducts = filteredProducts.length;
    const totalStock = filteredProducts.reduce((sum, p) => sum + (p.currentStock || 0), 0);
    
    // Calculate total value by currency (like Inventory component)
    const valueByCurrency = {};
    filteredProducts.forEach(p => {
      const curr = p.currency || 'USD';
      const value = (p.currentStock || 0) * (p.unitPrice || 0);
      if (!valueByCurrency[curr]) valueByCurrency[curr] = 0;
      valueByCurrency[curr] += value;
    });
    
    const totalValue = Object.values(valueByCurrency).reduce((sum, v) => sum + v, 0);
    const lowStockCount = filteredProducts.filter(p => (p.currentStock || 0) <= (p.reorderLevel || 10)).length;
    
    // Products by category
    const byCategory = {};
    filteredProducts.forEach(p => {
      const category = p.category || 'Uncategorized';
      if (!byCategory[category]) {
        byCategory[category] = { category, count: 0, value: 0 };
      }
      byCategory[category].count++;
      byCategory[category].value += (p.currentStock || 0) * (p.unitPrice || 0);
    });
    
    return {
      totalProducts,
      totalStock,
      totalValue,
      valueByCurrency,
      lowStockCount,
      byCategory: Object.values(byCategory),
      chartData: Object.values(byCategory).map(c => ({ name: c.category, value: c.value }))
    };
  };

  // Warehouse Report Data
  const getWarehouseData = () => {
    const filteredWarehouses = warehouses || [];
    
    const totalWarehouses = filteredWarehouses.length;
    const totalCapacity = filteredWarehouses.reduce((sum, w) => sum + (w.capacity || 0), 0);
    const totalStock = filteredWarehouses.reduce((sum, w) => sum + (w.currentStock || 0), 0);
    const avgUtilization = totalCapacity > 0 ? (totalStock / totalCapacity) * 100 : 0;
    
    const warehouseData = filteredWarehouses.map(w => ({
      name: w.name,
      stock: w.currentStock || 0,
      capacity: w.capacity || 0,
      utilization: w.capacity > 0 ? ((w.currentStock || 0) / w.capacity) * 100 : 0,
      status: w.status
    }));
    
    return {
      totalWarehouses,
      totalCapacity,
      totalStock,
      avgUtilization,
      warehouseData,
      chartData: warehouseData.map(w => ({ name: w.name, value: w.stock }))
    };
  };

  // Purchase Report Data with multi-currency
  const getPurchaseData = () => {
    const filteredOrders = getFilteredByDateRange(purchaseOrders || [], 'orderDate');
    const currencyFiltered = getFilteredByCurrency(filteredOrders, 'currency');
    
    const totalOrders = currencyFiltered.length;
    
    // Calculate total amount by currency
    const amountByCurrency = {};
    currencyFiltered.forEach(o => {
      const curr = o.currency || 'USD';
      if (!amountByCurrency[curr]) amountByCurrency[curr] = 0;
      amountByCurrency[curr] += o.totalAmount || 0;
    });
    
    const totalAmount = Object.values(amountByCurrency).reduce((sum, v) => sum + v, 0);
    const deliveredOrders = currencyFiltered.filter(o => o.status === 'Delivered').length;
    const pendingOrders = currencyFiltered.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
    
    // Orders by supplier
    const bySupplier = {};
    currencyFiltered.forEach(o => {
      const supplier = o.supplierName || 'Unknown';
      if (!bySupplier[supplier]) {
        bySupplier[supplier] = { supplier, count: 0, amount: 0 };
      }
      bySupplier[supplier].count++;
      bySupplier[supplier].amount += o.totalAmount || 0;
    });
    
    return {
      totalOrders,
      totalAmount,
      amountByCurrency,
      deliveredOrders,
      pendingOrders,
      bySupplier: Object.values(bySupplier),
      chartData: Object.values(bySupplier).map(s => ({ name: s.supplier, value: s.amount }))
    };
  };

  // Customer Transactions Report Data with multi-currency
  const getCustomerData = () => {
    const filtered = getFilteredByDateRange(transactions || [], 'date');
    const currencyFiltered = getFilteredByCurrency(filtered, 'senderCurrency');
    
    const totalCustomers = [...new Set(currencyFiltered.map(t => t.name))].length;
    
    // Calculate amounts by currency
    const sendAmountByCurrency = {};
    const receiveAmountByCurrency = {};
    const feesByCurrency = {};
    
    currencyFiltered.forEach(t => {
      const curr = t.senderCurrency || 'USD';
      if (!sendAmountByCurrency[curr]) sendAmountByCurrency[curr] = 0;
      if (!receiveAmountByCurrency[curr]) receiveAmountByCurrency[curr] = 0;
      if (!feesByCurrency[curr]) feesByCurrency[curr] = 0;
      
      sendAmountByCurrency[curr] += t.senderAmount || 0;
      receiveAmountByCurrency[curr] += t.receiverAmount || 0;
      feesByCurrency[curr] += (t.commission || 0) + (t.fee || 0) + (t.tax || 0);
    });
    
    const totalSendAmount = Object.values(sendAmountByCurrency).reduce((sum, v) => sum + v, 0);
    const totalReceiveAmount = Object.values(receiveAmountByCurrency).reduce((sum, v) => sum + v, 0);
    const totalFees = Object.values(feesByCurrency).reduce((sum, v) => sum + v, 0);
    
    // Top customers by amount
    const byCustomer = {};
    currencyFiltered.forEach(t => {
      const name = t.name || 'Unknown';
      if (!byCustomer[name]) {
        byCustomer[name] = { name, count: 0, amount: 0 };
      }
      byCustomer[name].count++;
      byCustomer[name].amount += t.senderAmount || 0;
    });
    
    return {
      totalCustomers,
      totalSendAmount,
      totalReceiveAmount,
      totalFees,
      sendAmountByCurrency,
      receiveAmountByCurrency,
      feesByCurrency,
      topCustomers: Object.values(byCustomer).sort((a, b) => b.amount - a.amount).slice(0, 10),
      chartData: Object.values(byCustomer).slice(0, 10).map(c => ({ name: c.name, value: c.amount }))
    };
  };

  // Daily Records Report Data with multi-currency
  const getDailyRecordData = () => {
    const filtered = getFilteredByDateRange(dailyRecords || [], 'date');
    
    let totalIncome = 0;
    let totalSpend = 0;
    const incomeByCurrency = {};
    const spendByCurrency = {};
    
    filtered.forEach(record => {
      if (record.incomeEntries) {
        record.incomeEntries.forEach(entry => {
          totalIncome += entry.amount || 0;
          const curr = entry.currency || 'USD';
          if (!incomeByCurrency[curr]) incomeByCurrency[curr] = 0;
          incomeByCurrency[curr] += entry.amount || 0;
        });
      }
      
      if (record.spendEntries) {
        record.spendEntries.forEach(entry => {
          totalSpend += entry.amount || 0;
          const curr = entry.currency || 'USD';
          if (!spendByCurrency[curr]) spendByCurrency[curr] = 0;
          spendByCurrency[curr] += entry.amount || 0;
        });
      }
    });
    
    const netBalance = totalIncome - totalSpend;
    
    // Combine for display
    const totalsByCurrency = {};
    const allCurrencies = new Set([...Object.keys(incomeByCurrency), ...Object.keys(spendByCurrency)]);
    allCurrencies.forEach(curr => {
      totalsByCurrency[curr] = (incomeByCurrency[curr] || 0) - (spendByCurrency[curr] || 0);
    });
    
    // Chart data by date
    const chartData = {};
    filtered.forEach(record => {
      const date = format(new Date(record.date), 'yyyy-MM-dd');
      if (!chartData[date]) {
        chartData[date] = { date, income: 0, spend: 0 };
      }
      if (record.incomeEntries) {
        record.incomeEntries.forEach(entry => {
          chartData[date].income += entry.amount || 0;
        });
      }
      if (record.spendEntries) {
        record.spendEntries.forEach(entry => {
          chartData[date].spend += entry.amount || 0;
        });
      }
    });
    
    return {
      totalIncome,
      totalSpend,
      netBalance,
      incomeByCurrency,
      spendByCurrency,
      totalsByCurrency,
      chartData: Object.values(chartData).map(d => ({
        ...d,
        balance: d.income - d.spend
      })).sort((a, b) => a.date.localeCompare(b.date))
    };
  };

  // Ledger Report Data with multi-currency
  const getLedgerData = () => {
    const filtered = getFilteredByDateRange(ledgerEntries || [], 'date');
    const currencyFiltered = getFilteredByCurrency(filtered, 'currency');
    
    const totalEntries = currencyFiltered.length;
    
    // Calculate totals by currency
    const amountByCurrency = {};
    const remainingByCurrency = {};
    
    currencyFiltered.forEach(e => {
      const curr = e.currency || 'USD';
      if (!amountByCurrency[curr]) amountByCurrency[curr] = 0;
      if (!remainingByCurrency[curr]) remainingByCurrency[curr] = 0;
      amountByCurrency[curr] += e.amount || 0;
      remainingByCurrency[curr] += e.remainingAmount || 0;
    });
    
    const totalAmount = Object.values(amountByCurrency).reduce((sum, v) => sum + v, 0);
    const totalRemaining = Object.values(remainingByCurrency).reduce((sum, v) => sum + v, 0);
    const completedEntries = currencyFiltered.filter(e => e.status === 'completed').length;
    
    // By person
    const byPerson = {};
    currencyFiltered.forEach(e => {
      const name = e.name || 'Unknown';
      if (!byPerson[name]) {
        byPerson[name] = { name, count: 0, amount: 0, remaining: 0 };
      }
      byPerson[name].count++;
      byPerson[name].amount += e.amount || 0;
      byPerson[name].remaining += e.remainingAmount || 0;
    });
    
    return {
      totalEntries,
      totalAmount,
      totalRemaining,
      amountByCurrency,
      remainingByCurrency,
      completedEntries,
      byPerson: Object.values(byPerson),
      chartData: Object.values(byPerson).slice(0, 10).map(p => ({ name: p.name, value: p.remaining }))
    };
  };

  // Discounts Report Data
  const getDiscountsData = () => {
    if (discountReport) {
      return discountReport;
    }
    
    const filtered = getFilteredByDateRange(transactions || [], 'date');
    const currencyFiltered = getFilteredByCurrency(filtered, 'senderCurrency');
    
    const totalDiscount = currencyFiltered.reduce((sum, t) => sum + ((t.commission || 0) + (t.fee || 0) + (t.tax || 0)), 0);
    const totalOrders = currencyFiltered.length;
    const discountRate = totalOrders > 0 ? (totalDiscount / currencyFiltered.reduce((sum, t) => sum + (t.senderAmount || 0), 0)) * 100 : 0;
    
    const byType = [
      { type: 'Commission', amount: currencyFiltered.reduce((sum, t) => sum + (t.commission || 0), 0), count: currencyFiltered.filter(t => t.commission > 0).length },
      { type: 'Fee', amount: currencyFiltered.reduce((sum, t) => sum + (t.fee || 0), 0), count: currencyFiltered.filter(t => t.fee > 0).length },
      { type: 'Tax', amount: currencyFiltered.reduce((sum, t) => sum + (t.tax || 0), 0), count: currencyFiltered.filter(t => t.tax > 0).length }
    ];
    
    return {
      totalDiscount,
      discountRate,
      totalOrders,
      byType,
      chartData: byType
    };
  };

  // Get current report data based on active tab
  const getCurrentReportData = () => {
    switch(activeReportType) {
      case 'sales':
        return getSalesDataFromTransactions();
      case 'inventory':
        return getInventoryData();
      case 'warehouse':
        return getWarehouseData();
      case 'purchases':
        return getPurchaseData();
      case 'customers':
        return getCustomerData();
      case 'daily':
        return getDailyRecordData();
      case 'ledger':
        return getLedgerData();
      case 'discounts':
        return getDiscountsData();
      default:
        return null;
    }
  };

  const currentData = getCurrentReportData();

  // Drill down handler
  const handleDrillDown = (data) => {
    setDrillDownData(data);
    setShowDrillDownModal(true);
  };

  // Render multi-currency totals (like Inventory component)
  const renderMultiCurrencyTotals = (totalsByCurrency, label = 'Total Value') => {
    if (!totalsByCurrency || Object.keys(totalsByCurrency).length === 0) {
      return <p className="text-lg font-bold text-gray-900">{formatAmount(0, 'USD')}</p>;
    }
    
    return (
      <div className="space-y-1">
        {Object.entries(totalsByCurrency).map(([currency, amount]) => (
          <p key={currency} className="text-lg font-bold text-gray-900">
            {getCurrencySymbol(currency)} {amount.toLocaleString()} <span className="text-xs font-normal text-gray-500">{currency}</span>
          </p>
        ))}
      </div>
    );
  };

  // Export Functions
  const exportToCSV = () => {
    let data = [];
    let filename = '';
    
    if (activeReportType === 'sales' && currentData?.chartData) {
      data = currentData.chartData;
      filename = `sales_report_${dateRange}`;
    } else if (activeReportType === 'inventory' && currentData?.byCategory) {
      data = currentData.byCategory;
      filename = `inventory_report_${dateRange}`;
    } else if (activeReportType === 'warehouse' && currentData?.warehouseData) {
      data = currentData.warehouseData;
      filename = `warehouse_report_${dateRange}`;
    } else if (activeReportType === 'purchases' && currentData?.bySupplier) {
      data = currentData.bySupplier;
      filename = `purchase_report_${dateRange}`;
    } else if (activeReportType === 'customers' && currentData?.topCustomers) {
      data = currentData.topCustomers;
      filename = `customer_report_${dateRange}`;
    } else if (activeReportType === 'daily' && currentData?.chartData) {
      data = currentData.chartData;
      filename = `daily_record_report_${dateRange}`;
    } else if (activeReportType === 'ledger' && currentData?.byPerson) {
      data = currentData.byPerson;
      filename = `ledger_report_${dateRange}`;
    } else if (activeReportType === 'discounts' && currentData?.byType) {
      data = currentData.byType;
      filename = `discount_report_${dateRange}`;
    }
    
    if (!data || data.length === 0) {
      toast.error(t.noDataToExport);
      return;
    }
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        if (typeof value === 'object') return JSON.stringify(value);
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvRows.push(values.join(','));
    });
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success(t.exportedSuccessfully);
  };

  const exportToPDF = async () => {
    if (!reportRef.current) return;
    
    try {
      toast.loading(t.generatingPDF);
      const canvas = await html2canvas(reportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${activeReportType}_report_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
      toast.success(t.pdfExportedSuccessfully);
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error(t.failedToGeneratePDF);
    }
  };

  const handleExport = () => {
    if (exportFormat === 'csv') {
      exportToCSV();
    } else {
      exportToPDF();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Report Types Configuration
  const reportTypes = [
    { id: 'sales', label: t.salesReport, icon: ShoppingCart, color: 'green' },
    { id: 'inventory', label: t.inventory, icon: Package, color: 'purple' },
    { id: 'warehouse', label: t.warehouse, icon: Warehouse, color: 'orange' },
    { id: 'purchases', label: t.purchases, icon: Truck, color: 'indigo' },
    { id: 'customers', label: t.customers, icon: Users, color: 'pink' },
    { id: 'daily', label: t.dailyRecords, icon: Calendar, color: 'teal' },
    { id: 'ledger', label: t.ledger, icon: FileText, color: 'red' },
    { id: 'discounts', label: t.discounts, icon: Percent, color: 'yellow' }
  ];

  const chartTypes = [
    { id: 'area', label: 'Area', icon: Activity },
    { id: 'bar', label: 'Bar', icon: BarChart3 },
    { id: 'line', label: 'Line', icon: LineChart },
    { id: 'pie', label: 'Pie', icon: PieChart }
  ];

  // Render stats cards based on active report (with multi-currency like Inventory)
  const renderStatsCards = () => {
    if (!currentData) return null;
    
    const statsConfig = {
      sales: [
        { label: t.totalSales, value: currentData.totalsByCurrency, isMultiCurrency: true, icon: DollarSign, color: 'green' },
        { label: t.totalOrders, value: currentData.totalOrders || 0, icon: ShoppingCart, color: 'blue' },
        { label: t.avgOrderValue, value: formatAmount(currentData.avgOrderValue, 'USD'), icon: TrendingUp, color: 'purple' }
      ],
      inventory: [
        { label: t.totalProducts, value: currentData.totalProducts || 0, icon: Package, color: 'blue' },
        { label: t.totalStock, value: currentData.totalStock?.toLocaleString() || 0, icon: Layers, color: 'green' },
        { label: t.totalInventoryValue, value: currentData.valueByCurrency, isMultiCurrency: true, icon: DollarSign, color: 'purple' },
        { label: t.lowStockItems, value: currentData.lowStockCount || 0, icon: AlertCircle, color: 'orange' }
      ],
      warehouse: [
        { label: t.totalWarehouses, value: currentData.totalWarehouses || 0, icon: Warehouse, color: 'blue' },
        { label: t.totalCapacity, value: currentData.totalCapacity?.toLocaleString() || 0, icon: Layers, color: 'green' },
        { label: t.totalStock, value: currentData.totalStock?.toLocaleString() || 0, icon: Package, color: 'purple' },
        { label: t.avgUtilization, value: `${currentData.avgUtilization?.toFixed(1) || 0}%`, icon: Activity, color: 'orange' }
      ],
      purchases: [
        { label: t.totalOrders, value: currentData.totalOrders || 0, icon: ShoppingCart, color: 'blue' },
        { label: t.totalAmount, value: currentData.amountByCurrency, isMultiCurrency: true, icon: DollarSign, color: 'green' },
        { label: t.delivered, value: currentData.deliveredOrders || 0, icon: CheckCircle, color: 'green' },
        { label: t.pending, value: currentData.pendingOrders || 0, icon: Clock, color: 'yellow' }
      ],
      customers: [
        { label: t.totalCustomers, value: currentData.totalCustomers || 0, icon: Users, color: 'blue' },
        { label: t.totalSend, value: currentData.sendAmountByCurrency, isMultiCurrency: true, icon: TrendingUp, color: 'green' },
        { label: t.totalReceive, value: currentData.receiveAmountByCurrency, isMultiCurrency: true, icon: TrendingDown, color: 'purple' },
        { label: t.totalFees, value: currentData.feesByCurrency, isMultiCurrency: true, icon: Percent, color: 'orange' }
      ],
      daily: [
        { label: t.totalIncome, value: currentData.incomeByCurrency, isMultiCurrency: true, icon: TrendingUp, color: 'green' },
        { label: t.totalSpend, value: currentData.spendByCurrency, isMultiCurrency: true, icon: TrendingDown, color: 'red' },
        { label: t.netBalance, value: currentData.totalsByCurrency, isMultiCurrency: true, icon: Wallet, color: 'purple' }
      ],
      ledger: [
        { label: t.totalEntries, value: currentData.totalEntries || 0, icon: FileText, color: 'blue' },
        { label: t.totalAmount, value: currentData.amountByCurrency, isMultiCurrency: true, icon: DollarSign, color: 'green' },
        { label: t.totalRemaining, value: currentData.remainingByCurrency, isMultiCurrency: true, icon: Clock, color: 'orange' },
        { label: t.completed, value: currentData.completedEntries || 0, icon: CheckCircle, color: 'green' }
      ],
      discounts: [
        { label: t.totalDiscounts, value: formatAmount(currentData.totalDiscount, 'USD'), icon: Percent, color: 'green' },
        { label: t.discountRate, value: `${currentData.discountRate?.toFixed(1) || 0}%`, icon: Target, color: 'blue' },
        { label: t.totalOrders, value: currentData.totalOrders || 0, icon: ShoppingCart, color: 'purple' }
      ]
    };
    
    const stats = statsConfig[activeReportType] || [];
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm text-gray-500">{stat.label}</p>
                {stat.isMultiCurrency ? (
                  renderMultiCurrencyTotals(stat.value, stat.label)
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                )}
              </div>
              <stat.icon className={`h-8 w-8 text-${stat.color}-600 opacity-50`} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render table data based on active report
  const renderTable = () => {
    let data = [];
    let columns = [];
    
    switch(activeReportType) {
      case 'sales':
        data = currentData?.chartData || [];
        columns = ['date', 'sales', 'orders'];
        break;
      case 'inventory':
        data = currentData?.byCategory || [];
        columns = ['category', 'count', 'value'];
        break;
      case 'warehouse':
        data = currentData?.warehouseData || [];
        columns = ['name', 'stock', 'capacity', 'utilization', 'status'];
        break;
      case 'purchases':
        data = currentData?.bySupplier || [];
        columns = ['supplier', 'count', 'amount'];
        break;
      case 'customers':
        data = currentData?.topCustomers || [];
        columns = ['name', 'count', 'amount'];
        break;
      case 'daily':
        data = currentData?.chartData || [];
        columns = ['date', 'income', 'spend', 'balance'];
        break;
      case 'ledger':
        data = currentData?.byPerson || [];
        columns = ['name', 'count', 'amount', 'remaining'];
        break;
      case 'discounts':
        data = currentData?.byType || [];
        columns = ['type', 'amount', 'count'];
        break;
      default:
        return null;
    }
    
    if (!data.length) {
      return <div className={`text-center text-gray-500 py-8 ${isRTL ? 'text-right' : ''}`}>{t.noData}</div>;
    }
    
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    const formatTableCell = (value, columnName) => {
      if (typeof value !== 'number') return value;
      if (columnName.includes('utilization')) return `${value.toFixed(1)}%`;
      if (columnName === 'amount' || columnName === 'value' || columnName === 'sales' || 
          columnName === 'income' || columnName === 'spend' || columnName === 'balance') {
        return formatAmount(value, 'USD');
      }
      return value.toLocaleString();
    };
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map(col => (
                <th key={col} className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                  {col.replace(/_/g, ' ').toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleDrillDown(row)}>
                {columns.map(col => (
                  <td key={col} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${isRTL ? 'text-right' : ''}`}>
                    {formatTableCell(row[col], col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const totalPages = Math.ceil((() => {
    switch(activeReportType) {
      case 'sales': return currentData?.chartData?.length || 0;
      case 'inventory': return currentData?.byCategory?.length || 0;
      case 'warehouse': return currentData?.warehouseData?.length || 0;
      case 'purchases': return currentData?.bySupplier?.length || 0;
      case 'customers': return currentData?.topCustomers?.length || 0;
      case 'daily': return currentData?.chartData?.length || 0;
      case 'ledger': return currentData?.byPerson?.length || 0;
      case 'discounts': return currentData?.byType?.length || 0;
      default: return 0;
    }
  })() / itemsPerPage);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading Reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/dashboard">
              <button className={`flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
                <span>{t.backToDashboard}</span>
              </button>
            </Link>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-2xl font-bold text-gray-900">{t.reportsAndAnalytics}</h1>
              <p className="text-sm text-gray-500 mt-1">{t.comprehensiveInsights}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
            <button onClick={handleExport} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Download size={16} />
              {t.export}
            </button>
            <button onClick={handlePrint} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Printer size={16} />
              {t.print}
            </button>
          </div>
        </div>

        {/* Report Type Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-x-auto">
          <div className="flex flex-nowrap border-b min-w-max">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveReportType(type.id)}
                className={`px-6 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeReportType === type.id 
                    ? `border-b-2 border-${type.color}-600 text-${type.color}-600`
                    : 'text-gray-500 hover:text-gray-700'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <type.icon size={16} />
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className={`flex flex-wrap gap-4 items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-medium text-gray-700">{t.dateRange}</span>
              <div className="flex gap-1">
                {['daily', 'weekly', 'monthly', 'yearly'].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setDateRange(range);
                      setShowCustomDatePicker(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                      dateRange === range && !showCustomDatePicker
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t[range]}
                  </button>
                ))}
                <button
                  onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                    showCustomDatePicker ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Calendar size={14} />
                  {t.custom}
                </button>
              </div>
            </div>

            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-medium text-gray-700">{t.currency}</span>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
              >
                <option value="all">{t.allCurrencies}</option>
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {(activeReportType === 'inventory' || activeReportType === 'warehouse') && (
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium text-gray-700">{t.warehouseFilter}</span>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
                >
                  <option value="all">{t.allWarehouses}</option>
                  {(warehouses || []).map(warehouse => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={`flex items-center gap-2 ml-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('charts')}
                  className={`px-3 py-1.5 text-sm ${viewMode === 'charts' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  {t.charts}
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 text-sm ${viewMode === 'table' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  {t.table}
                </button>
              </div>
            </div>

            {viewMode === 'charts' && (
              <div className={`flex gap-1 border-l pl-4 ml-2 ${isRTL ? 'border-r pr-4 mr-2 border-l-0' : ''}`}>
                {chartTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setChartType(type.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      chartType === type.id ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title={type.label}
                  >
                    <type.icon size={18} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {showCustomDatePicker && (
            <div className={`mt-4 flex gap-4 items-end pt-4 border-t border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <label className="block text-xs text-gray-500 mb-1">{t.startDate}</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <label className="block text-xs text-gray-500 mb-1">{t.endDate}</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
              <button 
                onClick={() => {
                  if (customStartDate && customEndDate) {
                    setDateRange('custom');
                  } else {
                    toast.error(t.selectBothDates);
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
              >
                {t.apply}
              </button>
            </div>
          )}
        </div>

        {/* Main Report Content */}
        <div ref={reportRef}>
          {renderStatsCards()}

          {viewMode === 'charts' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className={`flex justify-between items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h3 className="text-lg font-semibold text-gray-900">
                  {reportTypes.find(t => t.id === activeReportType)?.label} {t.overview}
                </h3>
                <div className="text-xs text-gray-500">
                  {t.period} {dateRange === 'custom' ? `${customStartDate} ${t.to} ${customEndDate}` : t[dateRange]}
                </div>
              </div>
              <div className="h-96">
                {(() => {
                  let data = [];
                  
                  if (activeReportType === 'sales' && currentData?.chartData) {
                    data = currentData.chartData;
                  } else if (activeReportType === 'inventory' && currentData?.byCategory) {
                    data = currentData.byCategory.map(c => ({ name: c.category, value: c.value }));
                  } else if (activeReportType === 'warehouse' && currentData?.warehouseData) {
                    data = currentData.warehouseData.map(w => ({ name: w.name, value: w.stock }));
                  } else if (activeReportType === 'purchases' && currentData?.bySupplier) {
                    data = currentData.bySupplier.map(s => ({ name: s.supplier, value: s.amount }));
                  } else if (activeReportType === 'customers' && currentData?.topCustomers) {
                    data = currentData.topCustomers.map(c => ({ name: c.name, value: c.amount }));
                  } else if (activeReportType === 'daily' && currentData?.chartData) {
                    data = currentData.chartData;
                  } else if (activeReportType === 'ledger' && currentData?.byPerson) {
                    data = currentData.byPerson.map(p => ({ name: p.name, value: p.remaining }));
                  } else if (activeReportType === 'discounts' && currentData?.byType) {
                    data = currentData.byType;
                  }
                  
                  if (!data.length) {
                    return <div className={`text-center text-gray-500 py-12 ${isRTL ? 'text-right' : ''}`}>{t.noData}</div>;
                  }
                  
                  switch(chartType) {
                    case 'area':
                      return (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                            {activeReportType === 'daily' && <Area type="monotone" dataKey="income" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />}
                            {activeReportType === 'daily' && <Area type="monotone" dataKey="spend" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />}
                          </AreaChart>
                        </ResponsiveContainer>
                      );
                    case 'bar':
                      return (
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#10B981" />
                            {activeReportType === 'daily' && <Bar dataKey="income" fill="#3B82F6" />}
                            {activeReportType === 'daily' && <Bar dataKey="spend" fill="#EF4444" />}
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      );
                    case 'line':
                      return (
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      );
                    case 'pie':
                      return (
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={data}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className={`p-4 border-b border-gray-200 ${isRTL ? 'text-right' : ''}`}>
              <h3 className="text-lg font-semibold text-gray-900">{t.detailedBreakdown}</h3>
            </div>
            {renderTable()}
            
            {totalPages > 1 && (
              <div className={`flex items-center justify-between px-6 py-4 border-t border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <p className="text-sm text-gray-600">
                  {t.page} {currentPage} {t.of} {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    <ChevronLeft size={18} className={isRTL ? 'rotate-180' : ''} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drill Down Modal */}
      {showDrillDownModal && drillDownData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-xl font-bold">{t.details}</h2>
              <button onClick={() => setShowDrillDownModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(drillDownData, null, 2)}
              </pre>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Reports;