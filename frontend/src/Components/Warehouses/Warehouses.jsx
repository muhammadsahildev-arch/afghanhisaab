import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Search, Edit2, Trash2, Filter, Download, Upload,
  Package, AlertTriangle, CheckCircle, XCircle, Eye,
  ChevronDown, MoreVertical, Copy, Archive, AlertOctagon,
  Warehouse, Calendar, Tag, Layers, TrendingUp, TrendingDown,
  ArrowLeft, X, Save, RefreshCw, Printer, Box, Grid3x3,
  Table as TableIcon, ChevronLeft, ChevronRight, Info,
  MapPin, Building2, ClipboardList, Truck, ArrowRightLeft,
  BarChart3, Activity, Zap, Settings, Users, DollarSign,
  MoveRight, MoveLeft, CircleDot, Clock, Shield, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  getAllWarehousesAction,
  createWarehouseAction,
  updateWarehouseAction,
  deleteWarehouseAction,
  transferStockAction,
  getAllTransfersAction,
  clearErrors
} from "../../actions/warehouseActions";
import { getAllProductsAction } from "../../actions/productActions";
import { 
  CREATE_WAREHOUSE_RESET, 
  UPDATE_WAREHOUSE_RESET, 
  DELETE_WAREHOUSE_RESET,
  TRANSFER_STOCK_RESET
} from "../../constants/constants";

const Warehouses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get state from Redux
  const { warehouses, loading, error, stats, pagination } = useSelector((state) => state.allWarehouses);
  const { products, loading: productsLoading } = useSelector((state) => state.allProducts);
  const { transfers, loading: transfersLoading } = useSelector((state) => state.allTransfers);
  const { loading: createLoading, success: createSuccess, error: createError } = useSelector((state) => state.newWarehouse);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector((state) => state.updateWarehouse);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.deleteWarehouse);
  const { loading: transferLoading, success: transferSuccess, error: transferError } = useSelector((state) => state.transferStock);
  
  const [activeTab, setActiveTab] = useState('warehouses');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showEditWarehouseModal, setShowEditWarehouseModal] = useState(false);
  const [showDeleteWarehouseModal, setShowDeleteWarehouseModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Warehouse Form
  const [warehouseForm, setWarehouseForm] = useState({
    name: '',
    code: '',
    location: '',
    address: '',
    manager: '',
    phone: '',
    capacity: '',
    description: ''
  });
  
  // Transfer Form
  const [transferForm, setTransferForm] = useState({
    fromWarehouseId: '',
    toWarehouseId: '',
    productId: '',
    quantity: '',
    notes: ''
  });

  // Language translations
  const translations = {
    en: {
      // Navigation & Header
      backToDashboard: "Back to Dashboard",
      warehouseManagement: "Warehouse Management",
      warehouseDesc: "Manage multiple warehouses, transfer stock, track inventory",
      export: "Export",
      transferStock: "Transfer Stock",
      addWarehouse: "Add Warehouse",
      
      // Tabs
      warehouses: "Warehouses",
      stockTransfers: "Stock Transfers",
      analytics: "Analytics",
      
      // Stats Cards
      totalWarehouses: "Total Warehouses",
      totalCapacity: "Total Capacity",
      totalStock: "Total Stock",
      avgUtilization: "Avg Utilization",
      
      // Search
      searchWarehouses: "Search warehouses by name, code, location...",
      searchTransfers: "Search transfers by product, warehouse...",
      
      // Table Headers
      date: "Date",
      fromWarehouse: "From Warehouse",
      toWarehouse: "To Warehouse",
      product: "Product",
      quantity: "Quantity",
      status: "Status",
      notes: "Notes",
      name: "Name",
      code: "Code",
      location: "Location",
      manager: "Manager",
      capacity: "Capacity",
      currentStock: "Current Stock",
      utilization: "Utilization",
      actions: "Actions",
      
      // Status
      active: "Active",
      maintenance: "Maintenance",
      full: "Full",
      completed: "Completed",
      pending: "Pending",
      
      // Analytics
      warehouseUtilization: "Warehouse Utilization",
      stockDistribution: "Stock Distribution by Warehouse",
      stockStatusOverview: "Stock Status Overview",
      wellStocked: "Well Stocked",
      moderateStock: "Moderate Stock",
      overstockCritical: "Overstock / Critical",
      recentTransferActivity: "Recent Transfer Activity",
      units: "units",
      
      // Modals
      addNewWarehouse: "Add New Warehouse",
      editWarehouse: "Edit Warehouse",
      transferStockTitle: "Transfer Stock",
      deleteWarehouse: "Delete Warehouse",
      
      // Form Labels
      warehouseName: "Name",
      warehouseCode: "Code",
      warehouseLocation: "Location",
      warehouseManager: "Manager",
      warehousePhone: "Phone",
      warehouseCapacity: "Capacity (units)",
      warehouseAddress: "Address",
      fromWarehouseLabel: "From Warehouse",
      toWarehouseLabel: "To Warehouse",
      productLabel: "Product",
      quantityLabel: "Quantity",
      transferNotes: "Notes",
      selectSourceWarehouse: "Select Source Warehouse",
      selectDestinationWarehouse: "Select Destination Warehouse",
      selectProduct: "Select Product",
      reasonForTransfer: "Reason for transfer...",
      
      // Buttons
      cancel: "Cancel",
      addWarehouseBtn: "Add Warehouse",
      updateWarehouse: "Update Warehouse",
      deleteWarehouseBtn: "Delete",
      initiateTransfer: "Initiate Transfer",
      transferring: "Transferring...",
      deleting: "Deleting...",
      close: "Close",
      
      // Messages
      warehouseAdded: "Warehouse added successfully!",
      warehouseUpdated: "Warehouse updated successfully!",
      warehouseDeleted: "Warehouse deleted successfully!",
      stockTransferred: "Stock transferred successfully!",
      fillRequiredFields: "Please fill required fields",
      quantityGreaterThanZero: "Quantity must be greater than 0",
      differentWarehouses: "Source and destination warehouses must be different",
      noProductsAvailable: "No products available in this warehouse",
      available: "Available",
      noDataToExport: "No data to export",
      exportSuccess: "Export successful",
      loadingWarehouses: "Loading warehouses...",
      deleteConfirmation: "Are you sure you want to delete the warehouse",
      deleteWarning: "This action cannot be undone.",
      
      // Pagination
      showing: "Showing",
      to: "to",
      of: "of",
      items: "items",
      
      // Warehouse card
      managerLabel: "Manager:",
      productsLabel: "Products:",
      noProducts: "No products in this warehouse",
      unitsShort: "units"
    },
    ur: {
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      warehouseManagement: "گودام کا نظم",
      warehouseDesc: "متعدد گوداموں کا نظم کریں، اسٹاک منتقل کریں، انوینٹری کو ٹریک کریں",
      export: "ایکسپورٹ کریں",
      transferStock: "اسٹاک منتقل کریں",
      addWarehouse: "گودام شامل کریں",
      
      warehouses: "گودام",
      stockTransfers: "اسٹاک کی منتقلی",
      analytics: "تجزیات",
      
      totalWarehouses: "کل گودام",
      totalCapacity: "کل گنجائش",
      totalStock: "کل اسٹاک",
      avgUtilization: "اوسط استعمال",
      
      searchWarehouses: "نام، کوڈ، مقام سے گودام تلاش کریں...",
      searchTransfers: "پروڈکٹ، گودام سے منتقلی تلاش کریں...",
      
      date: "تاریخ",
      fromWarehouse: "ماخذ گودام",
      toWarehouse: "منزل گودام",
      product: "پروڈکٹ",
      quantity: "مقدار",
      status: "حالت",
      notes: "نوٹس",
      name: "نام",
      code: "کوڈ",
      location: "مقام",
      manager: "مینیجر",
      capacity: "گنجائش",
      currentStock: "موجودہ اسٹاک",
      utilization: "استعمال",
      actions: "اعمال",
      
      active: "فعال",
      maintenance: "دیکھ بھال",
      full: "مکمل",
      completed: "مکمل شدہ",
      pending: "زیر التواء",
      
      warehouseUtilization: "گودام کا استعمال",
      stockDistribution: "گودام کے لحاظ سے اسٹاک کی تقسیم",
      stockStatusOverview: "اسٹاک کی حالت کا جائزہ",
      wellStocked: "اچھا اسٹاک",
      moderateStock: "معتدل اسٹاک",
      overstockCritical: "زیادہ اسٹاک / نازک",
      recentTransferActivity: "حالیہ منتقلی کی سرگرمی",
      units: "اکائیاں",
      
      addNewWarehouse: "نیا گودام شامل کریں",
      editWarehouse: "گودام میں ترمیم کریں",
      transferStockTitle: "اسٹاک منتقل کریں",
      deleteWarehouse: "گودام حذف کریں",
      
      warehouseName: "نام",
      warehouseCode: "کوڈ",
      warehouseLocation: "مقام",
      warehouseManager: "مینیجر",
      warehousePhone: "فون",
      warehouseCapacity: "گنجائش (اکائیاں)",
      warehouseAddress: "پتہ",
      fromWarehouseLabel: "ماخذ گودام",
      toWarehouseLabel: "منزل گودام",
      productLabel: "پروڈکٹ",
      quantityLabel: "مقدار",
      transferNotes: "نوٹس",
      selectSourceWarehouse: "ماخذ گودام منتخب کریں",
      selectDestinationWarehouse: "منزل گودام منتخب کریں",
      selectProduct: "پروڈکٹ منتخب کریں",
      reasonForTransfer: "منتقلی کی وجہ...",
      
      cancel: "منسوخ کریں",
      addWarehouseBtn: "گودام شامل کریں",
      updateWarehouse: "گودام اپ ڈیٹ کریں",
      deleteWarehouseBtn: "حذف کریں",
      initiateTransfer: "منتقلی شروع کریں",
      transferring: "منتقلی ہو رہی ہے...",
      deleting: "حذف ہو رہا ہے...",
      close: "بند کریں",
      
      warehouseAdded: "گودام کامیابی سے شامل ہوگیا!",
      warehouseUpdated: "گودام کامیابی سے اپ ڈیٹ ہوگیا!",
      warehouseDeleted: "گودام کامیابی سے حذف ہوگیا!",
      stockTransferred: "اسٹاک کامیابی سے منتقل ہوگیا!",
      fillRequiredFields: "براہ کرم ضروری فیلڈز پُر کریں",
      quantityGreaterThanZero: "مقدار صفر سے زیادہ ہونی چاہیے",
      differentWarehouses: "ماخذ اور منزل گودام مختلف ہونے چاہئیں",
      noProductsAvailable: "اس گودام میں کوئی پروڈکٹ دستیاب نہیں",
      available: "دستیاب",
      noDataToExport: "ایکسپورٹ کرنے کے لیے کوئی ڈیٹا نہیں",
      exportSuccess: "ایکسپورٹ کامیاب",
      loadingWarehouses: "گودام لوڈ ہو رہے ہیں...",
      deleteConfirmation: "کیا آپ واقعی گودام حذف کرنا چاہتے ہیں",
      deleteWarning: "یہ عمل واپس نہیں لیا جا سکتا۔",
      
      showing: "دکھا رہا ہے",
      to: "سے",
      of: "کل",
      items: "آئٹمز",
      
      managerLabel: "مینیجر:",
      productsLabel: "پروڈکٹس:",
      noProducts: "اس گودام میں کوئی پروڈکٹ نہیں",
      unitsShort: "اکائیاں"
    },
    ps: {
      backToDashboard: "ډشبورډ ته راګرځئ",
      warehouseManagement: "د ګودام مدیریت",
      warehouseDesc: "ګڼ شمېر ګودامونه اداره کړئ، ذخیره انتقال کړئ، انوینټري تعقیب کړئ",
      export: "صادر کړئ",
      transferStock: "ذخیره انتقال کړئ",
      addWarehouse: "ګودام اضافه کړئ",
      
      warehouses: "ګودامونه",
      stockTransfers: "د ذخیرې انتقال",
      analytics: "تحلیلونه",
      
      totalWarehouses: "ټول ګودامونه",
      totalCapacity: "ټول ظرفیت",
      totalStock: "ټوله ذخیره",
      avgUtilization: "اوسط استعمال",
      
      searchWarehouses: "د نوم، کوډ، موقعیت له مخې ګودامونه وپلټئ...",
      searchTransfers: "د محصول، ګودام له مخې انتقالات وپلټئ...",
      
      date: "نیټه",
      fromWarehouse: "د سرچینې ګودام",
      toWarehouse: "د منزل ګودام",
      product: "محصول",
      quantity: "کمیت",
      status: "حالت",
      notes: "یادښتونه",
      name: "نوم",
      code: "کوډ",
      location: "موقعیت",
      manager: "مدیر",
      capacity: "ظرفیت",
      currentStock: "اوسنۍ ذخیره",
      utilization: "استعمال",
      actions: "کړنې",
      
      active: "فعال",
      maintenance: "ساتنه",
      full: "ډک",
      completed: "بشپړ شوی",
      pending: "په انتظار",
      
      warehouseUtilization: "د ګودام استعمال",
      stockDistribution: "د ګودام له مخې د ذخیرې ویش",
      stockStatusOverview: "د ذخیرې حالت کتنه",
      wellStocked: "ښه ذخیره",
      moderateStock: "منځنۍ ذخیره",
      overstockCritical: "ډیره ذخیره / حساس",
      recentTransferActivity: "وروستي انتقالي فعالیتونه",
      units: "واحدونه",
      
      addNewWarehouse: "نوی ګودام اضافه کړئ",
      editWarehouse: "ګودام ترمیم کړئ",
      transferStockTitle: "ذخیره انتقال کړئ",
      deleteWarehouse: "ګودام حذف کړئ",
      
      warehouseName: "نوم",
      warehouseCode: "کوډ",
      warehouseLocation: "موقعیت",
      warehouseManager: "مدیر",
      warehousePhone: "تلیفون",
      warehouseCapacity: "ظرفیت (واحدونه)",
      warehouseAddress: "پته",
      fromWarehouseLabel: "د سرچینې ګودام",
      toWarehouseLabel: "د منزل ګودام",
      productLabel: "محصول",
      quantityLabel: "کمیت",
      transferNotes: "یادښتونه",
      selectSourceWarehouse: "د سرچینې ګودام وټاکئ",
      selectDestinationWarehouse: "د منزل ګودام وټاکئ",
      selectProduct: "محصول وټاکئ",
      reasonForTransfer: "د انتقال دلیل...",
      
      cancel: "لغوه کړئ",
      addWarehouseBtn: "ګودام اضافه کړئ",
      updateWarehouse: "ګودام تازه کړئ",
      deleteWarehouseBtn: "حذف کړئ",
      initiateTransfer: "انتقال پیل کړئ",
      transferring: "انتقال کیږي...",
      deleting: "حذف کیږي...",
      close: "بند کړئ",
      
      warehouseAdded: "ګودام بریالی شو!",
      warehouseUpdated: "ګودام بریالی شو!",
      warehouseDeleted: "ګودام بریالی شو!",
      stockTransferred: "ذخیره بریالۍ شوه!",
      fillRequiredFields: "مهرباني وکړئ اړین ساحې ډک کړئ",
      quantityGreaterThanZero: "کمیت باید له صفر څخه زیات وي",
      differentWarehouses: "د سرچینې او منزل ګودام باید مختلف وي",
      noProductsAvailable: "په دې ګودام کې کوم محصول شتون نلري",
      available: "شته",
      noDataToExport: "د صادرولو لپاره معلومات نشته",
      exportSuccess: "صادرول بریالي شول",
      loadingWarehouses: "ګودامونه لوډ کیږي...",
      deleteConfirmation: "آیا تاسو واقعیا غواړئ ګودام حذف کړئ",
      deleteWarning: "دا عمل بیرته نشي اخیستل کیدی.",
      
      showing: "ښکاره کوي",
      to: "ته",
      of: "د",
      items: "توکي",
      
      managerLabel: "مدیر:",
      productsLabel: "محصولات:",
      noProducts: "په دې ګودام کې کوم محصول نشته",
      unitsShort: "واحدونه"
    },
    fa: {
      backToDashboard: "بازگشت به داشبورد",
      warehouseManagement: "مدیریت انبار",
      warehouseDesc: "مدیریت چندین انبار، انتقال موجودی، پیگیری موجودی",
      export: "خروجی",
      transferStock: "انتقال موجودی",
      addWarehouse: "افزودن انبار",
      
      warehouses: "انبارها",
      stockTransfers: "انتقالات موجودی",
      analytics: "تحلیل‌ها",
      
      totalWarehouses: "کل انبارها",
      totalCapacity: "کل ظرفیت",
      totalStock: "کل موجودی",
      avgUtilization: "میانگین استفاده",
      
      searchWarehouses: "جستجوی انبارها بر اساس نام، کد، مکان...",
      searchTransfers: "جستجوی انتقالات بر اساس محصول، انبار...",
      
      date: "تاریخ",
      fromWarehouse: "انبار مبدأ",
      toWarehouse: "انبار مقصد",
      product: "محصول",
      quantity: "تعداد",
      status: "وضعیت",
      notes: "یادداشت‌ها",
      name: "نام",
      code: "کد",
      location: "مکان",
      manager: "مدیر",
      capacity: "ظرفیت",
      currentStock: "موجودی فعلی",
      utilization: "استفاده",
      actions: "عملیات",
      
      active: "فعال",
      maintenance: "در حال تعمیر",
      full: "پر",
      completed: "تکمیل شده",
      pending: "در انتظار",
      
      warehouseUtilization: "استفاده از انبار",
      stockDistribution: "توزیع موجودی بر اساس انبار",
      stockStatusOverview: "بررسی وضعیت موجودی",
      wellStocked: "موجودی خوب",
      moderateStock: "موجودی متوسط",
      overstockCritical: "موجودی بیش از حد / بحرانی",
      recentTransferActivity: "فعالیت‌های اخیر انتقال",
      units: "واحد",
      
      addNewWarehouse: "افزودن انبار جدید",
      editWarehouse: "ویرایش انبار",
      transferStockTitle: "انتقال موجودی",
      deleteWarehouse: "حذف انبار",
      
      warehouseName: "نام",
      warehouseCode: "کد",
      warehouseLocation: "مکان",
      warehouseManager: "مدیر",
      warehousePhone: "تلفن",
      warehouseCapacity: "ظرفیت (واحد)",
      warehouseAddress: "آدرس",
      fromWarehouseLabel: "انبار مبدأ",
      toWarehouseLabel: "انبار مقصد",
      productLabel: "محصول",
      quantityLabel: "تعداد",
      transferNotes: "یادداشت‌ها",
      selectSourceWarehouse: "انتخاب انبار مبدأ",
      selectDestinationWarehouse: "انتخاب انبار مقصد",
      selectProduct: "انتخاب محصول",
      reasonForTransfer: "دلیل انتقال...",
      
      cancel: "لغو",
      addWarehouseBtn: "افزودن انبار",
      updateWarehouse: "به‌روزرسانی انبار",
      deleteWarehouseBtn: "حذف",
      initiateTransfer: "شروع انتقال",
      transferring: "در حال انتقال...",
      deleting: "در حال حذف...",
      close: "بستن",
      
      warehouseAdded: "انبار با موفقیت اضافه شد!",
      warehouseUpdated: "انبار با موفقیت به‌روز شد!",
      warehouseDeleted: "انبار با موفقیت حذف شد!",
      stockTransferred: "موجودی با موفقیت انتقال یافت!",
      fillRequiredFields: "لطفاً فیلدهای الزامی را پر کنید",
      quantityGreaterThanZero: "تعداد باید بیشتر از صفر باشد",
      differentWarehouses: "انبارهای مبدأ و مقصد باید متفاوت باشند",
      noProductsAvailable: "هیچ محصولی در این انبار موجود نیست",
      available: "موجود",
      noDataToExport: "داده‌ای برای خروجی وجود ندارد",
      exportSuccess: "خروجی با موفقیت انجام شد",
      loadingWarehouses: "در حال بارگذاری انبارها...",
      deleteConfirmation: "آیا مطمئن هستید که می‌خواهید انبار را حذف کنید",
      deleteWarning: "این عمل قابل بازگشت نیست.",
      
      showing: "نمایش",
      to: "تا",
      of: "از",
      items: "آیتم",
      
      managerLabel: "مدیر:",
      productsLabel: "محصولات:",
      noProducts: "هیچ محصولی در این انبار نیست",
      unitsShort: "واحد"
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

  // Fetch warehouses, products, and transfers on mount and when refreshKey changes
  useEffect(() => {
    dispatch(getAllWarehousesAction(currentPage, itemsPerPage, searchTerm));
    dispatch(getAllProductsAction(1, 9999));
    dispatch(getAllTransfersAction());
  }, [dispatch, currentPage, itemsPerPage, searchTerm, refreshKey]);

  // Handle create warehouse success
  useEffect(() => {
    if (createSuccess) {
      toast.success(t.warehouseAdded);
      dispatch({ type: CREATE_WAREHOUSE_RESET });
      setRefreshKey(prev => prev + 1);
      setShowAddWarehouseModal(false);
      resetWarehouseForm();
    }
  }, [createSuccess, dispatch, t]);

  // Handle update warehouse success
  useEffect(() => {
    if (updateSuccess) {
      toast.success(t.warehouseUpdated);
      dispatch({ type: UPDATE_WAREHOUSE_RESET });
      setRefreshKey(prev => prev + 1);
      setShowEditWarehouseModal(false);
      setSelectedWarehouse(null);
      resetWarehouseForm();
    }
  }, [updateSuccess, dispatch, t]);

  // Handle delete warehouse success
  useEffect(() => {
    if (deleteSuccess) {
      toast.success(t.warehouseDeleted);
      dispatch({ type: DELETE_WAREHOUSE_RESET });
      setRefreshKey(prev => prev + 1);
      setShowDeleteWarehouseModal(false);
      setSelectedWarehouse(null);
    }
  }, [deleteSuccess, dispatch, t]);

  // Handle transfer stock success
  useEffect(() => {
    if (transferSuccess) {
      toast.success(t.stockTransferred);
      dispatch({ type: TRANSFER_STOCK_RESET });
      setRefreshKey(prev => prev + 1);
      setShowTransferModal(false);
      resetTransferForm();
    }
  }, [transferSuccess, dispatch, t]);

  // Handle errors
  useEffect(() => {
    if (error) toast.error(error);
    if (createError) toast.error(createError);
    if (updateError) toast.error(updateError);
    if (deleteError) toast.error(deleteError);
    if (transferError) toast.error(transferError);
    dispatch(clearErrors());
  }, [error, createError, updateError, deleteError, transferError, dispatch]);

  // Reset forms
  const resetWarehouseForm = () => {
    setWarehouseForm({
      name: '', code: '', location: '', address: '', manager: '', phone: '', capacity: '', description: ''
    });
  };

  const resetTransferForm = () => {
    setTransferForm({
      fromWarehouseId: '', toWarehouseId: '', productId: '', quantity: '', notes: ''
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'Full': return 'text-red-600 bg-red-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'Active': return t.active;
      case 'Maintenance': return t.maintenance;
      case 'Full': return t.full;
      case 'Completed': return t.completed;
      case 'Pending': return t.pending;
      default: return status;
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 80) return 'text-red-600';
    if (utilization >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Handle add warehouse
  const handleAddWarehouse = () => {
    if (!warehouseForm.name || !warehouseForm.code || !warehouseForm.location) {
      toast.error(t.fillRequiredFields);
      return;
    }

    const warehouseData = {
      name: warehouseForm.name,
      code: warehouseForm.code.toUpperCase(),
      location: warehouseForm.location,
      address: warehouseForm.address,
      manager: warehouseForm.manager,
      phone: warehouseForm.phone,
      capacity: parseInt(warehouseForm.capacity) || 1000
    };

    dispatch(createWarehouseAction(warehouseData));
  };

  // Handle edit warehouse
  const handleEditWarehouse = () => {
    if (!selectedWarehouse) return;

    const warehouseData = {
      name: warehouseForm.name,
      code: warehouseForm.code.toUpperCase(),
      location: warehouseForm.location,
      address: warehouseForm.address,
      manager: warehouseForm.manager,
      phone: warehouseForm.phone,
      capacity: parseInt(warehouseForm.capacity) || selectedWarehouse.capacity
    };

    dispatch(updateWarehouseAction(selectedWarehouse.id, warehouseData));
  };

  // Handle delete warehouse - Open modal
  const handleDeleteWarehouseClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowDeleteWarehouseModal(true);
  };

  // Confirm delete warehouse
  const confirmDeleteWarehouse = () => {
    if (selectedWarehouse) {
      dispatch(deleteWarehouseAction(selectedWarehouse.id));
    }
  };

  // Handle transfer stock
  const handleTransferStock = () => {
    if (!transferForm.fromWarehouseId || !transferForm.toWarehouseId || !transferForm.productId || !transferForm.quantity) {
      toast.error(t.fillRequiredFields);
      return;
    }

    const quantity = parseInt(transferForm.quantity);
    if (quantity <= 0) {
      toast.error(t.quantityGreaterThanZero);
      return;
    }

    if (transferForm.fromWarehouseId === transferForm.toWarehouseId) {
      toast.error(t.differentWarehouses);
      return;
    }

    const transferData = {
      fromWarehouseId: transferForm.fromWarehouseId,
      toWarehouseId: transferForm.toWarehouseId,
      productId: transferForm.productId,
      quantity: quantity,
      notes: transferForm.notes
    };

    dispatch(transferStockAction(transferData));
  };

  // Get available stock for selected product in source warehouse
  const getAvailableStock = () => {
    if (!transferForm.fromWarehouseId || !transferForm.productId) return 0;
    
    const product = products?.find(p => p.id === transferForm.productId);
    if (!product) return 0;
    
    const warehouseStock = product.warehouseStock?.find(
      ws => ws.warehouseId === transferForm.fromWarehouseId
    );
    
    return warehouseStock?.quantity || 0;
  };

  const availableStock = getAvailableStock();

  // Get products available in source warehouse
  const getProductsInSourceWarehouse = () => {
    if (!transferForm.fromWarehouseId) return [];
    
    const availableProducts = (products || []).filter(product => {
      const warehouseStock = product.warehouseStock?.find(
        ws => ws.warehouseId === transferForm.fromWarehouseId
      );
      return warehouseStock && warehouseStock.quantity > 0;
    });
    
    return availableProducts.map(product => {
      const warehouseStock = product.warehouseStock.find(
        ws => ws.warehouseId === transferForm.fromWarehouseId
      );
      return {
        productId: product.id,
        name: product.name,
        sku: product.sku,
        quantity: warehouseStock.quantity
      };
    });
  };

  const productsInSourceWarehouse = getProductsInSourceWarehouse();

  // Handle export
  const handleExport = () => {
    const data = activeTab === 'warehouses' ? warehouses : transfers;
    if (!data || data.length === 0) {
      toast.error(t.noDataToExport);
      return;
    }
    
    const headers = activeTab === 'warehouses' 
      ? [t.name, t.code, t.location, t.manager, t.capacity, t.currentStock, t.utilization, t.status]
      : [t.date, t.fromWarehouse, t.toWarehouse, t.product, t.quantity, t.status, t.notes];
    
    const csvRows = [headers.join(',')];
    
    data.forEach(item => {
      if (activeTab === 'warehouses') {
        const row = [
          `"${(item.name || '').replace(/"/g, '""')}"`,
          item.code,
          `"${(item.location || '').replace(/"/g, '""')}"`,
          `"${(item.manager || '').replace(/"/g, '""')}"`,
          item.capacity,
          item.currentStock,
          `${item.utilization || 0}%`,
          item.status
        ];
        csvRows.push(row.join(','));
      } else {
        const row = [
          item.date,
          `"${(item.fromWarehouse || '').replace(/"/g, '""')}"`,
          `"${(item.toWarehouse || '').replace(/"/g, '""')}"`,
          `"${(item.product || '').replace(/"/g, '""')}"`,
          item.quantity,
          item.status,
          `"${(item.notes || '').replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(','));
      }
    });
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${activeTab}_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success(t.exportSuccess);
  };

  const openEditModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setWarehouseForm({
      name: warehouse.name,
      code: warehouse.code,
      location: warehouse.location,
      address: warehouse.address || '',
      manager: warehouse.manager || '',
      phone: warehouse.phone || '',
      capacity: warehouse.capacity?.toString() || '',
      description: warehouse.description || ''
    });
    setShowEditWarehouseModal(true);
  };

  // Calculate totals from stats
  const totalWarehouses = stats?.totalWarehouses || warehouses?.length || 0;
  const totalCapacity = stats?.totalCapacity || 0;
  const totalStock = stats?.totalStock || 0;
  const avgUtilization = stats?.avgUtilization || 0;

  const currentWarehouses = warehouses || [];
  const currentTransfers = transfers || [];

  if ((loading && !warehouses) || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loadingWarehouses}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="p-4 md:p-6">
        {/* Header with Back Button */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/dashboard">
              <button className={`flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
                <span>{t.backToDashboard}</span>
              </button>
            </Link>
            <div className="h-8 w-px bg-gray-300"></div>
            <div>
              <h1 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : ''}`}>{t.warehouseManagement}</h1>
              <p className={`text-sm text-gray-500 mt-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseDesc}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button onClick={handleExport} className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Download size={16} />
              {t.export}
            </button>
            <button
              onClick={() => setShowTransferModal(true)}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowRightLeft size={16} />
              {t.transferStock}
            </button>
            <button
              onClick={() => setShowAddWarehouseModal(true)}
              className={`px-4 py-2 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg hover:shadow-lg flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Plus size={16} />
              {t.addWarehouse}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className={`flex border-b ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => { setActiveTab('warehouses'); setCurrentPage(1); setSearchTerm(''); }}
              className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'warehouses' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'} ${isRTL ? 'text-right' : ''}`}
            >
              <Warehouse size={16} className={`inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.warehouses}
            </button>
            <button
              onClick={() => { setActiveTab('transfers'); setCurrentPage(1); setSearchTerm(''); }}
              className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'transfers' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'} ${isRTL ? 'text-right' : ''}`}
            >
              <ArrowRightLeft size={16} className={`inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.stockTransfers}
            </button>
            <button
              onClick={() => { setActiveTab('analytics'); setCurrentPage(1); setSearchTerm(''); }}
              className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'} ${isRTL ? 'text-right' : ''}`}
            >
              <BarChart3 size={16} className={`inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.analytics}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {activeTab !== 'analytics' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
            <div className="relative">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
              <input
                type="text"
                placeholder={activeTab === 'warehouses' ? t.searchWarehouses : t.searchTransfers}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500`}
              />
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.totalWarehouses}</p>
                <p className="text-2xl font-bold text-gray-900">{totalWarehouses}</p>
              </div>
              <Warehouse size={24} className="text-blue-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.totalCapacity}</p>
                <p className="text-2xl font-bold text-gray-900">{totalCapacity.toLocaleString()}</p>
              </div>
              <Package size={24} className="text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.totalStock}</p>
                <p className="text-2xl font-bold text-gray-900">{totalStock.toLocaleString()}</p>
              </div>
              <Box size={24} className="text-purple-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.avgUtilization}</p>
                <p className={`text-2xl font-bold ${getUtilizationColor(avgUtilization)}`}>{avgUtilization.toFixed(1)}%</p>
              </div>
              <Activity size={24} className="text-orange-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Warehouses Grid */}
        {activeTab === 'warehouses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWarehouses.map((warehouse) => (
              <motion.div
                key={warehouse.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-5">
                  <div className={`flex items-start justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div>
                      <h3 className={`text-lg font-semibold text-gray-900 ${isRTL ? 'text-right' : ''}`}>{warehouse.name}</h3>
                      <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{warehouse.code}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(warehouse.status)}`}>
                      {getStatusText(warehouse.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-gray-600">{warehouse.location}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <Users size={14} className="text-gray-400" />
                      <span className="text-gray-600">{t.managerLabel} {warehouse.manager}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <Package size={14} className="text-gray-400" />
                      <span className="text-gray-600">{warehouse.currentStock?.toLocaleString() || 0} / {warehouse.capacity?.toLocaleString() || 0} {t.unitsShort}</span>
                    </div>
                  </div>

                  {/* Utilization Bar */}
                  <div className="mb-4">
                    <div className={`flex justify-between text-xs text-gray-500 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{t.utilization}</span>
                      <span className={getUtilizationColor(warehouse.utilization || 0)}>{(warehouse.utilization || 0).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`rounded-full h-2 transition-all ${
                          (warehouse.utilization || 0) >= 80 ? 'bg-red-600' : 
                          (warehouse.utilization || 0) >= 60 ? 'bg-yellow-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${warehouse.utilization || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Products Preview */}
                  <div className="border-t pt-3">
                    <p className={`text-xs font-medium text-gray-500 mb-2 ${isRTL ? 'text-right' : ''}`}>{t.productsLabel}</p>
                    <div className="space-y-1">
                      {warehouse.products?.slice(0, 3).map((product, idx) => (
                        <div key={idx} className={`flex justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="text-gray-600">{product.name}</span>
                          <span className="font-medium">{product.quantity} {t.unitsShort}</span>
                        </div>
                      ))}
                      {warehouse.products?.length === 0 && (
                        <p className={`text-xs text-gray-400 ${isRTL ? 'text-right' : ''}`}>{t.noProducts}</p>
                      )}
                    </div>
                  </div>

                  <div className={`mt-4 flex items-center justify-end gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button 
                      onClick={() => openEditModal(warehouse)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleDeleteWarehouseClick(warehouse)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Transfers Table */}
        {activeTab === 'transfers' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className={isRTL ? 'text-right' : 'text-left'}>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.date}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.fromWarehouse}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.toWarehouse}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.product}</th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>{t.quantity}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.status}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.notes}</th>
                </tr>
              </thead>
              <tbody>
                {currentTransfers.map((transfer) => (
                  <tr key={transfer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className={`px-6 py-3 text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>{transfer.date}</td>
                    <td className={`px-6 py-3 text-sm text-gray-900 ${isRTL ? 'text-right' : ''}`}>{transfer.fromWarehouse}</td>
                    <td className={`px-6 py-3 text-sm text-gray-900 ${isRTL ? 'text-right' : ''}`}>{transfer.toWarehouse}</td>
                    <td className={`px-6 py-3 text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>{transfer.product}</td>
                    <td className={`px-6 py-3 text-sm font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{transfer.quantity}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transfer.status)}`}>
                        {getStatusText(transfer.status)}
                      </span>
                    </td>
                    <td className={`px-6 py-3 text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{transfer.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Analytics Dashboard */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Utilization Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : ''}`}>{t.warehouseUtilization}</h3>
              <div className="space-y-4">
                {(warehouses || []).map((warehouse) => (
                  <div key={warehouse.id}>
                    <div className={`flex justify-between text-sm mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium">{warehouse.name}</span>
                      <span className={getUtilizationColor(warehouse.utilization || 0)}>{(warehouse.utilization || 0).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`rounded-full h-3 transition-all ${
                          (warehouse.utilization || 0) >= 80 ? 'bg-red-600' : 
                          (warehouse.utilization || 0) >= 60 ? 'bg-yellow-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${warehouse.utilization || 0}%` }}
                      ></div>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${isRTL ? 'text-right' : ''}`}>{warehouse.currentStock?.toLocaleString() || 0} / {warehouse.capacity?.toLocaleString() || 0} {t.unitsShort}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : ''}`}>{t.stockDistribution}</h3>
                <div className="space-y-3">
                  {(warehouses || []).map((warehouse) => {
                    const percentage = totalStock > 0 ? ((warehouse.currentStock || 0) / totalStock) * 100 : 0;
                    return (
                      <div key={warehouse.id} className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm text-gray-600">{warehouse.name}</span>
                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="w-48 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 rounded-full h-2"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{Math.round(percentage)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : ''}`}>{t.stockStatusOverview}</h3>
                <div className="space-y-3">
                  <div className={`flex justify-between items-center p-3 bg-green-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm text-green-700">{t.wellStocked}</span>
                    <span className="text-lg font-bold text-green-700">
                      {(warehouses || []).filter(w => (w.utilization || 0) < 60).length}
                    </span>
                  </div>
                  <div className={`flex justify-between items-center p-3 bg-yellow-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm text-yellow-700">{t.moderateStock}</span>
                    <span className="text-lg font-bold text-yellow-700">
                      {(warehouses || []).filter(w => (w.utilization || 0) >= 60 && (w.utilization || 0) < 80).length}
                    </span>
                  </div>
                  <div className={`flex justify-between items-center p-3 bg-red-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm text-red-700">{t.overstockCritical}</span>
                    <span className="text-lg font-bold text-red-700">
                      {(warehouses || []).filter(w => (w.utilization || 0) >= 80).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transfer Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : ''}`}>{t.recentTransferActivity}</h3>
              <div className="space-y-3">
                {(transfers || []).slice(0, 5).map((transfer) => (
                  <div key={transfer.id} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <ArrowRightLeft size={16} className="text-blue-600" />
                      <div>
                        <p className={`text-sm font-medium ${isRTL ? 'text-right' : ''}`}>{transfer.product}</p>
                        <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{transfer.fromWarehouse} → {transfer.toWarehouse}</p>
                      </div>
                    </div>
                    <div className={`text-right ${isRTL ? 'text-left' : 'text-right'}`}>
                      <p className="text-sm font-semibold">{transfer.quantity} {t.unitsShort}</p>
                      <p className="text-xs text-gray-500">{transfer.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {activeTab !== 'analytics' && pagination && pagination.totalPages > 1 && (
          <div className={`flex items-center justify-between mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <p className="text-sm text-gray-600">
              {t.showing} {pagination.page * pagination.limit - pagination.limit + 1} {t.to} {Math.min(pagination.page * pagination.limit, pagination.total)} {t.of} {pagination.total} {t.items}
            </p>
            <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                disabled={currentPage === pagination.totalPages}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Warehouse Modal */}
      {showAddWarehouseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.addNewWarehouse}</h2>
              <button onClick={() => setShowAddWarehouseModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseName} *</label>
                  <input type="text" value={warehouseForm.name} onChange={(e) => setWarehouseForm({...warehouseForm, name: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseCode} *</label>
                  <input type="text" value={warehouseForm.code} onChange={(e) => setWarehouseForm({...warehouseForm, code: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseLocation} *</label>
                  <input type="text" value={warehouseForm.location} onChange={(e) => setWarehouseForm({...warehouseForm, location: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseManager}</label>
                  <input type="text" value={warehouseForm.manager} onChange={(e) => setWarehouseForm({...warehouseForm, manager: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehousePhone}</label>
                  <input type="tel" value={warehouseForm.phone} onChange={(e) => setWarehouseForm({...warehouseForm, phone: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseCapacity}</label>
                  <input type="number" value={warehouseForm.capacity} onChange={(e) => setWarehouseForm({...warehouseForm, capacity: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseAddress}</label>
                  <textarea value={warehouseForm.address} onChange={(e) => setWarehouseForm({...warehouseForm, address: e.target.value})} rows="2" className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`}></textarea>
                </div>
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => setShowAddWarehouseModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50">{t.cancel}</button>
              <button onClick={handleAddWarehouse} disabled={createLoading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
                {createLoading ? <RefreshCw size={16} className="animate-spin" /> : t.addWarehouseBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Warehouse Modal */}
      {showEditWarehouseModal && selectedWarehouse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.editWarehouse}</h2>
              <button onClick={() => setShowEditWarehouseModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseName} *</label>
                  <input type="text" value={warehouseForm.name} onChange={(e) => setWarehouseForm({...warehouseForm, name: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseCode} *</label>
                  <input type="text" value={warehouseForm.code} onChange={(e) => setWarehouseForm({...warehouseForm, code: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseLocation} *</label>
                  <input type="text" value={warehouseForm.location} onChange={(e) => setWarehouseForm({...warehouseForm, location: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseManager}</label>
                  <input type="text" value={warehouseForm.manager} onChange={(e) => setWarehouseForm({...warehouseForm, manager: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehousePhone}</label>
                  <input type="tel" value={warehouseForm.phone} onChange={(e) => setWarehouseForm({...warehouseForm, phone: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseCapacity}</label>
                  <input type="number" value={warehouseForm.capacity} onChange={(e) => setWarehouseForm({...warehouseForm, capacity: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseAddress}</label>
                  <textarea value={warehouseForm.address} onChange={(e) => setWarehouseForm({...warehouseForm, address: e.target.value})} rows="2" className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`}></textarea>
                </div>
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => setShowEditWarehouseModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50">{t.cancel}</button>
              <button onClick={handleEditWarehouse} disabled={updateLoading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
                {updateLoading ? <RefreshCw size={16} className="animate-spin" /> : t.updateWarehouse}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Stock Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.transferStockTitle}</h2>
              <button onClick={() => setShowTransferModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.fromWarehouseLabel} *</label>
                  <select 
                    value={transferForm.fromWarehouseId} 
                    onChange={(e) => {
                      setTransferForm({...transferForm, fromWarehouseId: e.target.value, productId: '', quantity: ''});
                    }} 
                    className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`}
                  >
                    <option value="">{t.selectSourceWarehouse}</option>
                    {(warehouses || []).map(w => (
                      <option key={w.id} value={w.id}>{w.name} ({t.totalStock}: {w.currentStock} {t.unitsShort})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.toWarehouseLabel} *</label>
                  <select 
                    value={transferForm.toWarehouseId} 
                    onChange={(e) => setTransferForm({...transferForm, toWarehouseId: e.target.value})} 
                    className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`}
                  >
                    <option value="">{t.selectDestinationWarehouse}</option>
                    {(warehouses || []).filter(w => w.id !== transferForm.fromWarehouseId).map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.productLabel} *</label>
                  <select 
                    value={transferForm.productId} 
                    onChange={(e) => {
                      setTransferForm({...transferForm, productId: e.target.value, quantity: ''});
                    }} 
                    className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`}
                    disabled={!transferForm.fromWarehouseId}
                  >
                    <option value="">{t.selectProduct}</option>
                    {productsInSourceWarehouse.map(p => (
                      <option key={p.productId} value={p.productId}>
                        {p.name} ({p.sku}) - {t.available}: {p.quantity} {t.unitsShort}
                      </option>
                    ))}
                  </select>
                  {transferForm.fromWarehouseId && productsInSourceWarehouse.length === 0 && (
                    <p className={`text-xs text-yellow-600 mt-1 ${isRTL ? 'text-right' : ''}`}>{t.noProductsAvailable}</p>
                  )}
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.quantityLabel} *</label>
                  <input 
                    type="number" 
                    value={transferForm.quantity} 
                    onChange={(e) => setTransferForm({...transferForm, quantity: e.target.value})} 
                    className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} 
                    min="1"
                    max={availableStock}
                  />
                  {availableStock > 0 && (
                    <p className={`text-xs text-gray-500 mt-1 ${isRTL ? 'text-right' : ''}`}>{t.available}: {availableStock} {t.unitsShort}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.transferNotes}</label>
                  <textarea 
                    value={transferForm.notes} 
                    onChange={(e) => setTransferForm({...transferForm, notes: e.target.value})} 
                    rows="2" 
                    className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} 
                    placeholder={t.reasonForTransfer}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => setShowTransferModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50">{t.cancel}</button>
              <button 
                onClick={handleTransferStock} 
                disabled={transferLoading || !transferForm.fromWarehouseId || !transferForm.toWarehouseId || !transferForm.productId || !transferForm.quantity || parseInt(transferForm.quantity) > availableStock}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {transferLoading ? <RefreshCw size={16} className="animate-spin" /> : <ArrowRightLeft size={16} />}
                {transferLoading ? t.transferring : t.initiateTransfer}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Warehouse Confirmation Modal */}
      {showDeleteWarehouseModal && selectedWarehouse && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteWarehouseModal(false)}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle size={32} className="text-red-600" />
                  </div>
                </div>
                <h3 className={`text-xl font-bold text-gray-900 text-center mb-2 ${isRTL ? 'text-right' : ''}`}>{t.deleteWarehouse}</h3>
                <p className={`text-gray-600 text-center mb-6 ${isRTL ? 'text-right' : ''}`}>
                  {t.deleteConfirmation} <span className="font-semibold">{selectedWarehouse.name}</span>?<br />
                  <span className="text-sm text-red-500">{t.deleteWarning}</span>
                </p>
                <div className={`flex space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <button
                    onClick={confirmDeleteWarehouse}
                    disabled={deleteLoading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
                  >
                    {deleteLoading ? (
                      <>
                        <RefreshCw size={14} className="animate-spin mr-2" />
                        {t.deleting}
                      </>
                    ) : (
                      t.deleteWarehouseBtn
                    )}
                  </button>
                  <button
                    onClick={() => setShowDeleteWarehouseModal(false)}
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
    </div>
  );
};

export default Warehouses;