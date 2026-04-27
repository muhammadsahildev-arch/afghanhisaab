import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Search, Edit2, Trash2, Filter, Download, Upload,
  Package, AlertTriangle, CheckCircle, XCircle, Eye,
  ChevronDown, MoreVertical, Copy, Archive, AlertOctagon,
  Warehouse, Calendar, Tag, Layers, TrendingUp, TrendingDown,
  ArrowLeft, X, Save, RefreshCw, Printer, Box, Grid3x3,
  Table as TableIcon, ChevronLeft, ChevronRight, Info
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  getAllProductsAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
  clearErrors
} from "../../actions/productActions";
import { getAllWarehousesAction } from "../../actions/warehouseActions";
import { 
  CREATE_PRODUCT_RESET, 
  UPDATE_PRODUCT_RESET, 
  DELETE_PRODUCT_RESET
} from "../../constants/constants";

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

const Inventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get state from Redux
  const { products, loading, error, stats, pagination } = useSelector((state) => state.allProducts);
  const { warehouses, loading: warehousesLoading } = useSelector((state) => state.allWarehouses);
  const { loading: createLoading, success: createSuccess, error: createError } = useSelector((state) => state.newProduct);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector((state) => state.updateProduct);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.deleteProduct);
  
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  // Separate form states for add and edit
  const [addForm, setAddForm] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: '',
    brand: '',
    unitPrice: '',
    purchasePrice: '',
    reorderLevel: '',
    description: '',
    currency: 'USD'
  });

  const [editForm, setEditForm] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: '',
    brand: '',
    unitPrice: '',
    purchasePrice: '',
    reorderLevel: '',
    description: '',
    currency: 'USD'
  });

  // Language translations
  const translations = {
    en: {
      backToDashboard: "Back to Dashboard",
      inventoryManagement: "Inventory Management",
      inventoryDesc: "Manage products and track stock levels",
      exportCSV: "Export CSV",
      addProduct: "Add Product",
      totalProducts: "Total Products",
      lowStockItems: "Low Stock Items",
      criticalStock: "Critical Stock",
      totalInventoryValue: "Total Inventory Value",
      searchPlaceholder: "Search by name, SKU, barcode, or brand...",
      allCategories: "All Categories",
      products: "products",
      loadingProducts: "Loading products...",
      
      // Table Headers
      product: "Product",
      sku: "SKU",
      category: "Category",
      price: "Price",
      stock: "Stock",
      value: "Value",
      status: "Status",
      warehouses: "Warehouses",
      actions: "Actions",
      
      // Status
      inStock: "In Stock",
      lowStock: "Low Stock",
      criticalStockStatus: "Critical Stock",
      
      // Warehouse
      warehouseDistribution: "Warehouse Distribution",
      capacityUsed: "Capacity Used",
      manager: "Manager",
      units: "units",
      
      // Modal Titles
      addNewProduct: "Add New Product",
      editProduct: "Edit Product",
      productDetails: "Product Details",
      deleteProduct: "Delete Product",
      deleteConfirmation: "Are you sure you want to delete",
      deleteWarning: "This action cannot be undone.",
      stockWarning: "This product has {count} units in stock. Please sell or transfer stock before deleting.",
      
      // Form Labels
      productName: "Product Name",
      uniqueSkuCode: "Unique SKU code",
      barcodeLabel: "Barcode",
      scanBarcode: "Scan or enter barcode",
      categoryLabel: "Category",
      selectCategory: "Select Category",
      brandLabel: "Brand",
      enterBrand: "Enter brand name",
      unitPriceLabel: "Unit Price",
      sellingPrice: "Selling price",
      currencyLabel: "Currency",
      purchasePriceLabel: "Purchase Price",
      costPrice: "Cost price",
      reorderLevelLabel: "Reorder Level",
      alertWhenStockBelow: "Alert when stock below",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Product description, features, specifications...",
      
      // Buttons
      cancel: "Cancel",
      addProductBtn: "Add Product",
      updateProduct: "Update Product",
      deleteProductBtn: "Delete Product",
      editProductBtn: "Edit Product",
      close: "Close",
      
      // Pagination
      showing: "Showing",
      to: "to",
      of: "of",
      page: "Page",
      
      // Basic Info Section
      basicInformation: "Basic Information",
      pricingAndStock: "Pricing & Stock",
      createdAt: "Created At",
      lastUpdated: "Last Updated",
      noDescription: "No description provided",
      unknownWarehouse: "Unknown Warehouse",
      warehouseId: "Warehouse ID",
      
      // Product Details
      productNameLabel: "Product Name",
      skuLabel: "SKU",
      barcodeLabelShort: "Barcode",
      categoryLabelShort: "Category",
      brandLabelShort: "Brand",
      currencyLabelShort: "Currency",
      statusLabel: "Status",
      descriptionLabelShort: "Description",
      unitPriceLabelShort: "Unit Price",
      purchasePriceLabelShort: "Purchase Price",
      currentStock: "Current Stock",
      totalValue: "Total Value",
      reorderLevelLabelShort: "Reorder Level",
      
      // Success/Error Messages
      productAdded: "Product added successfully!",
      productUpdated: "Product updated successfully!",
      productDeleted: "Product deleted successfully!",
      exportSuccess: "Exported {count} products successfully!",
      exportFailed: "Failed to export data",
      fillRequiredFields: "Please fill required fields",
      
      // Warehouse stats
      capacityUsedLabel: "Capacity Used"
    },
    ur: {
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      inventoryManagement: "انوینٹری مینجمنٹ",
      inventoryDesc: "مصنوعات کا نظم کریں اور اسٹاک کی سطح کو ٹریک کریں",
      exportCSV: "CSV ایکسپورٹ کریں",
      addProduct: "پروڈکٹ شامل کریں",
      totalProducts: "کل مصنوعات",
      lowStockItems: "کم اسٹاک اشیاء",
      criticalStock: "نازک اسٹاک",
      totalInventoryValue: "کل انوینٹری ویلیو",
      searchPlaceholder: "نام، SKU، بارکوڈ، یا برانڈ سے تلاش کریں...",
      allCategories: "تمام زمرہ جات",
      products: "مصنوعات",
      loadingProducts: "مصنوعات لوڈ ہو رہی ہیں...",
      
      product: "پروڈکٹ",
      sku: "SKU",
      category: "زمرہ",
      price: "قیمت",
      stock: "اسٹاک",
      value: "قیمت",
      status: "حالت",
      warehouses: "گودام",
      actions: "اعمال",
      
      inStock: "اسٹاک میں",
      lowStock: "کم اسٹاک",
      criticalStockStatus: "نازک اسٹاک",
      
      warehouseDistribution: "گودام کی تقسیم",
      capacityUsed: "استعمال شدہ گنجائش",
      manager: "مینیجر",
      units: "اکائیاں",
      
      addNewProduct: "نئی پروڈکٹ شامل کریں",
      editProduct: "پروڈکٹ میں ترمیم کریں",
      productDetails: "پروڈکٹ کی تفصیلات",
      deleteProduct: "پروڈکٹ حذف کریں",
      deleteConfirmation: "کیا آپ واقعی حذف کرنا چاہتے ہیں",
      deleteWarning: "یہ عمل واپس نہیں لیا جا سکتا۔",
      stockWarning: "اس پروڈکٹ کے {count} یونٹ اسٹاک میں ہیں۔ براہ کرم حذف کرنے سے پہلے اسٹاک بیچیں یا منتقل کریں۔",
      
      productName: "پروڈکٹ کا نام",
      uniqueSkuCode: "منفرد SKU کوڈ",
      barcodeLabel: "بارکوڈ",
      scanBarcode: "بارکوڈ اسکین کریں یا درج کریں",
      categoryLabel: "زمرہ",
      selectCategory: "زمرہ منتخب کریں",
      brandLabel: "برانڈ",
      enterBrand: "برانڈ کا نام درج کریں",
      unitPriceLabel: "یونٹ قیمت",
      sellingPrice: "فروخت کی قیمت",
      currencyLabel: "کرنسی",
      purchasePriceLabel: "خریداری کی قیمت",
      costPrice: "لاگت کی قیمت",
      reorderLevelLabel: "دوبارہ آرڈر کی سطح",
      alertWhenStockBelow: "اسٹاک کم ہونے پر الرٹ",
      descriptionLabel: "تفصیل",
      descriptionPlaceholder: "پروڈکٹ کی تفصیل، خصوصیات، وضاحتیں...",
      
      cancel: "منسوخ کریں",
      addProductBtn: "پروڈکٹ شامل کریں",
      updateProduct: "پروڈکٹ اپ ڈیٹ کریں",
      deleteProductBtn: "پروڈکٹ حذف کریں",
      editProductBtn: "پروڈکٹ میں ترمیم کریں",
      close: "بند کریں",
      
      showing: "دکھا رہا ہے",
      to: "سے",
      of: "کل",
      page: "صفحہ",
      
      basicInformation: "بنیادی معلومات",
      pricingAndStock: "قیمت اور اسٹاک",
      createdAt: "تخلیق کردہ",
      lastUpdated: "آخری اپ ڈیٹ",
      noDescription: "کوئی تفصیل فراہم نہیں کی گئی",
      unknownWarehouse: "نامعلوم گودام",
      warehouseId: "گودام ID",
      
      productNameLabel: "پروڈکٹ کا نام",
      skuLabel: "SKU",
      barcodeLabelShort: "بارکوڈ",
      categoryLabelShort: "زمرہ",
      brandLabelShort: "برانڈ",
      currencyLabelShort: "کرنسی",
      statusLabel: "حالت",
      descriptionLabelShort: "تفصیل",
      unitPriceLabelShort: "یونٹ قیمت",
      purchasePriceLabelShort: "خریداری کی قیمت",
      currentStock: "موجودہ اسٹاک",
      totalValue: "کل قیمت",
      reorderLevelLabelShort: "دوبارہ آرڈر کی سطح",
      
      productAdded: "پروڈکٹ کامیابی سے شامل ہوگئی!",
      productUpdated: "پروڈکٹ کامیابی سے اپ ڈیٹ ہوگئی!",
      productDeleted: "پروڈکٹ کامیابی سے حذف ہوگئی!",
      exportSuccess: "{count} مصنوعات کامیابی سے ایکسپورٹ ہوگئیں!",
      exportFailed: "ڈیٹا ایکسپورٹ کرنے میں ناکامی",
      fillRequiredFields: "براہ کرم ضروری فیلڈز پُر کریں",
      
      capacityUsedLabel: "استعمال شدہ گنجائش"
    },
    ps: {
      backToDashboard: "ډشبورډ ته راګرځئ",
      inventoryManagement: "د انوینټري مدیریت",
      inventoryDesc: "محصولات اداره کړئ او د ذخیرې کچه وڅارئ",
      exportCSV: "CSV صادر کړئ",
      addProduct: "محصول اضافه کړئ",
      totalProducts: "ټول محصولات",
      lowStockItems: "کم ذخیره توکي",
      criticalStock: "حساس ذخیره",
      totalInventoryValue: "د انوینټري ټول ارزښت",
      searchPlaceholder: "د نوم، SKU، بارکوډ، یا برانډ له مخې لټون وکړئ...",
      allCategories: "ټول کټګورۍ",
      products: "محصولات",
      loadingProducts: "محصولات لوډ کیږي...",
      
      product: "محصول",
      sku: "SKU",
      category: "کټګورۍ",
      price: "قیمت",
      stock: "ذخیره",
      value: "ارزښت",
      status: "حالت",
      warehouses: "ګودامونه",
      actions: "کړنې",
      
      inStock: "په ذخیره کې",
      lowStock: "کمه ذخیره",
      criticalStockStatus: "حساس ذخیره",
      
      warehouseDistribution: "د ګودام ویش",
      capacityUsed: "کارول شوې ظرفیت",
      manager: "مدیر",
      units: "واحدونه",
      
      addNewProduct: "نوی محصول اضافه کړئ",
      editProduct: "محصول ترمیم کړئ",
      productDetails: "د محصول جزیات",
      deleteProduct: "محصول حذف کړئ",
      deleteConfirmation: "آیا تاسو واقعیا حذف کول غواړئ",
      deleteWarning: "دا عمل بیرته نشي اخیستل کیدی.",
      stockWarning: "دا محصول د {count} واحدونو ذخیره لري. مهرباني وکړئ د حذف کولو دمخه ذخیره وپلورئ یا انتقال کړئ.",
      
      productName: "د محصول نوم",
      uniqueSkuCode: "ځانګړی SKU کوډ",
      barcodeLabel: "بارکوډ",
      scanBarcode: "بارکوډ سکین کړئ یا دننه کړئ",
      categoryLabel: "کټګورۍ",
      selectCategory: "کټګورۍ وټاکئ",
      brandLabel: "برانډ",
      enterBrand: "د برانډ نوم دننه کړئ",
      unitPriceLabel: "د واحد قیمت",
      sellingPrice: "د پلور قیمت",
      currencyLabel: "اسعار",
      purchasePriceLabel: "د پیرود قیمت",
      costPrice: "لګښت قیمت",
      reorderLevelLabel: "د بیا امر کچه",
      alertWhenStockBelow: "کله چې ذخیره کمه شي خبرتیا",
      descriptionLabel: "تشریح",
      descriptionPlaceholder: "د محصول تشریح، ځانګړتیاوې، مشخصات...",
      
      cancel: "لغوه کړئ",
      addProductBtn: "محصول اضافه کړئ",
      updateProduct: "محصول تازه کړئ",
      deleteProductBtn: "محصول حذف کړئ",
      editProductBtn: "محصول ترمیم کړئ",
      close: "بند کړئ",
      
      showing: "ښکاره کوي",
      to: "ته",
      of: "د",
      page: "مخ",
      
      basicInformation: "بنسټیز معلومات",
      pricingAndStock: "قیمت او ذخیره",
      createdAt: "په نیټه جوړ شوی",
      lastUpdated: "وروستی تازه",
      noDescription: "کومه تشریح نده ورکړل شوې",
      unknownWarehouse: "نامعلوم ګودام",
      warehouseId: "د ګودام ID",
      
      productNameLabel: "د محصول نوم",
      skuLabel: "SKU",
      barcodeLabelShort: "بارکوډ",
      categoryLabelShort: "کټګورۍ",
      brandLabelShort: "برانډ",
      currencyLabelShort: "اسعار",
      statusLabel: "حالت",
      descriptionLabelShort: "تشریح",
      unitPriceLabelShort: "د واحد قیمت",
      purchasePriceLabelShort: "د پیرود قیمت",
      currentStock: "اوسنۍ ذخیره",
      totalValue: "ټول ارزښت",
      reorderLevelLabelShort: "د بیا امر کچه",
      
      productAdded: "محصول بریالی شو!",
      productUpdated: "محصول بریالی شو!",
      productDeleted: "محصول بریالی شو!",
      exportSuccess: "{count} محصولات بریالي صادر شول!",
      exportFailed: "د معلوماتو صادرول ناکام شول",
      fillRequiredFields: "مهرباني وکړئ اړین ساحې ډک کړئ",
      
      capacityUsedLabel: "کارول شوې ظرفیت"
    },
    fa: {
      backToDashboard: "بازگشت به داشبورد",
      inventoryManagement: "مدیریت انبار",
      inventoryDesc: "مدیریت محصولات و پیگیری سطح موجودی",
      exportCSV: "خروجی CSV",
      addProduct: "افزودن محصول",
      totalProducts: "کل محصولات",
      lowStockItems: "موارد موجودی کم",
      criticalStock: "موجودی بحرانی",
      totalInventoryValue: "ارزش کل انبار",
      searchPlaceholder: "جستجو بر اساس نام، SKU، بارکد یا برند...",
      allCategories: "همه دسته‌بندی‌ها",
      products: "محصولات",
      loadingProducts: "در حال بارگذاری محصولات...",
      
      product: "محصول",
      sku: "SKU",
      category: "دسته‌بندی",
      price: "قیمت",
      stock: "موجودی",
      value: "ارزش",
      status: "وضعیت",
      warehouses: "انبارها",
      actions: "عملیات",
      
      inStock: "در انبار",
      lowStock: "موجودی کم",
      criticalStockStatus: "موجودی بحرانی",
      
      warehouseDistribution: "توزیع در انبارها",
      capacityUsed: "ظرفیت استفاده شده",
      manager: "مدیر",
      units: "واحد",
      
      addNewProduct: "افزودن محصول جدید",
      editProduct: "ویرایش محصول",
      productDetails: "جزئیات محصول",
      deleteProduct: "حذف محصول",
      deleteConfirmation: "آیا مطمئن هستید که می‌خواهید حذف کنید",
      deleteWarning: "این عمل قابل بازگشت نیست.",
      stockWarning: "این محصول {count} واحد موجودی دارد. لطفاً قبل از حذف، موجودی را بفروشید یا انتقال دهید.",
      
      productName: "نام محصول",
      uniqueSkuCode: "کد SKU یکتا",
      barcodeLabel: "بارکد",
      scanBarcode: "بارکد را اسکن یا وارد کنید",
      categoryLabel: "دسته‌بندی",
      selectCategory: "انتخاب دسته‌بندی",
      brandLabel: "برند",
      enterBrand: "نام برند را وارد کنید",
      unitPriceLabel: "قیمت واحد",
      sellingPrice: "قیمت فروش",
      currencyLabel: "ارز",
      purchasePriceLabel: "قیمت خرید",
      costPrice: "قیمت تمام شده",
      reorderLevelLabel: "سطح سفارش مجدد",
      alertWhenStockBelow: "هشدار زمانی که موجودی کمتر شود",
      descriptionLabel: "توضیحات",
      descriptionPlaceholder: "توضیحات محصول، ویژگی‌ها، مشخصات...",
      
      cancel: "لغو",
      addProductBtn: "افزودن محصول",
      updateProduct: "به‌روزرسانی محصول",
      deleteProductBtn: "حذف محصول",
      editProductBtn: "ویرایش محصول",
      close: "بستن",
      
      showing: "نمایش",
      to: "تا",
      of: "از",
      page: "صفحه",
      
      basicInformation: "اطلاعات پایه",
      pricingAndStock: "قیمت و موجودی",
      createdAt: "تاریخ ایجاد",
      lastUpdated: "آخرین به‌روزرسانی",
      noDescription: "توضیحاتی ارائه نشده است",
      unknownWarehouse: "انبار ناشناس",
      warehouseId: "شناسه انبار",
      
      productNameLabel: "نام محصول",
      skuLabel: "SKU",
      barcodeLabelShort: "بارکد",
      categoryLabelShort: "دسته‌بندی",
      brandLabelShort: "برند",
      currencyLabelShort: "ارز",
      statusLabel: "وضعیت",
      descriptionLabelShort: "توضیحات",
      unitPriceLabelShort: "قیمت واحد",
      purchasePriceLabelShort: "قیمت خرید",
      currentStock: "موجودی فعلی",
      totalValue: "ارزش کل",
      reorderLevelLabelShort: "سطح سفارش مجدد",
      
      productAdded: "محصول با موفقیت اضافه شد!",
      productUpdated: "محصول با موفقیت به‌روز شد!",
      productDeleted: "محصول با موفقیت حذف شد!",
      exportSuccess: "{count} محصول با موفقیت خروجی گرفته شد!",
      exportFailed: "خروجی گرفتن داده ناموفق بود",
      fillRequiredFields: "لطفاً فیلدهای الزامی را پر کنید",
      
      capacityUsedLabel: "ظرفیت استفاده شده"
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

  // Categories
  const categories = [
    'Electronics', 'Phones', 'Laptops', 'Tablets', 
    'Audio', 'Wearables', 'Accessories', 'TVs', 'Computers'
  ];

  // Get currency symbol
  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

  // Calculate total value by currency
  const totalValueByCurrency = (products || []).reduce((acc, product) => {
    const value = product.currentStock * product.unitPrice;
    const currency = product.currency || 'USD';
    acc[currency] = (acc[currency] || 0) + value;
    return acc;
  }, {});

  // Fetch products on mount
  useEffect(() => {
    dispatch(getAllProductsAction(currentPage, itemsPerPage, searchTerm, selectedCategory !== 'all' ? selectedCategory : ''));
    dispatch(getAllWarehousesAction());
  }, [dispatch, currentPage, itemsPerPage, searchTerm, selectedCategory]);

  // Handle create product success
  useEffect(() => {
    if (createSuccess) {
      toast.success(t.productAdded);
      dispatch({ type: CREATE_PRODUCT_RESET });
      dispatch(getAllProductsAction(currentPage, itemsPerPage, searchTerm, selectedCategory !== 'all' ? selectedCategory : ''));
      setShowAddModal(false);
      resetAddForm();
    }
  }, [createSuccess, dispatch, currentPage, itemsPerPage, searchTerm, selectedCategory, t]);

  // Handle update product success
  useEffect(() => {
    if (updateSuccess) {
      toast.success(t.productUpdated);
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(getAllProductsAction(currentPage, itemsPerPage, searchTerm, selectedCategory !== 'all' ? selectedCategory : ''));
      setShowEditModal(false);
      setSelectedProduct(null);
      resetEditForm();
    }
  }, [updateSuccess, dispatch, currentPage, itemsPerPage, searchTerm, selectedCategory, t]);

  // Handle delete product success
  useEffect(() => {
    if (deleteSuccess) {
      toast.success(t.productDeleted);
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch(getAllProductsAction(currentPage, itemsPerPage, searchTerm, selectedCategory !== 'all' ? selectedCategory : ''));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  }, [deleteSuccess, dispatch, currentPage, itemsPerPage, searchTerm, selectedCategory, t]);

  // Handle errors
  useEffect(() => {
    if (error) toast.error(error);
    if (createError) toast.error(createError);
    if (updateError) toast.error(updateError);
    if (deleteError) toast.error(deleteError);
    dispatch(clearErrors());
  }, [error, createError, updateError, deleteError, dispatch]);

  // Reset forms
  const resetAddForm = () => {
    setAddForm({
      name: '',
      sku: '',
      barcode: '',
      category: '',
      brand: '',
      unitPrice: '',
      purchasePrice: '',
      reorderLevel: '',
      description: '',
      currency: 'USD'
    });
  };

  const resetEditForm = () => {
    setEditForm({
      name: '',
      sku: '',
      barcode: '',
      category: '',
      brand: '',
      unitPrice: '',
      purchasePrice: '',
      reorderLevel: '',
      description: '',
      currency: 'USD'
    });
  };

  // Calculate stats from Redux
  const totalProducts = stats?.totalProducts || products?.length || 0;
  const lowStockCount = stats?.lowStockCount || 0;
  const criticalStockCount = stats?.criticalStockCount || 0;

  // Filter products (already filtered by API)
  const filteredProducts = products || [];
  
  // Pagination from Redux
  const totalPages = pagination?.pages || 1;
  const currentProducts = filteredProducts;

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'In Stock': return 'text-green-600 bg-green-100';
      case 'Low Stock': return 'text-yellow-600 bg-yellow-100';
      case 'Critical Stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'In Stock': return t.inStock;
      case 'Low Stock': return t.lowStock;
      case 'Critical Stock': return t.criticalStockStatus;
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'In Stock': return <CheckCircle size={14} className="text-green-600" />;
      case 'Low Stock': return <AlertTriangle size={14} className="text-yellow-600" />;
      case 'Critical Stock': return <AlertOctagon size={14} className="text-red-600" />;
      default: return <Package size={14} className="text-gray-600" />;
    }
  };

  const handleAddProduct = () => {
    if (!addForm.name || !addForm.sku || !addForm.unitPrice) {
      toast.error(t.fillRequiredFields);
      return;
    }
    
    const productData = {
      name: addForm.name,
      sku: addForm.sku.toUpperCase(),
      barcode: addForm.barcode,
      category: addForm.category,
      brand: addForm.brand,
      unitPrice: parseFloat(addForm.unitPrice),
      purchasePrice: parseFloat(addForm.purchasePrice) || 0,
      reorderLevel: parseInt(addForm.reorderLevel) || 10,
      description: addForm.description || '',
      currency: addForm.currency
    };
    
    dispatch(createProductAction(productData));
  };

  const handleEditProduct = () => {
    if (!selectedProduct) return;
    
    const productData = {
      name: editForm.name,
      sku: editForm.sku.toUpperCase(),
      barcode: editForm.barcode,
      category: editForm.category,
      brand: editForm.brand,
      unitPrice: parseFloat(editForm.unitPrice),
      purchasePrice: parseFloat(editForm.purchasePrice) || 0,
      reorderLevel: parseInt(editForm.reorderLevel) || 10,
      description: editForm.description || '',
      currency: editForm.currency
    };
    
    dispatch(updateProductAction(selectedProduct.id, productData));
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProductAction(productToDelete.id));
    }
  };

  // Handle export
  const handleExport = () => {
    try {
      const exportData = (products || []).map(p => ({
        'Product Name': p.name,
        'SKU': p.sku,
        'Barcode': p.barcode,
        'Category': p.category,
        'Brand': p.brand,
        'Currency': p.currency,
        'Unit Price': p.unitPrice,
        'Purchase Price': p.purchasePrice,
        'Current Stock': p.currentStock,
        'Reorder Level': p.reorderLevel,
        'Status': p.status,
        'Description': p.description,
        'Created At': p.createdAt,
        'Last Updated': p.updatedAt,
        'Total Value': (p.currentStock * p.unitPrice).toFixed(2)
      }));

      const headers = Object.keys(exportData[0]);
      const csvRows = [headers.join(',')];
      
      for (const row of exportData) {
        const values = headers.map(header => {
          const value = row[header];
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csvRows.push(values.join(','));
      }
      
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(t.exportSuccess.replace('{count}', exportData.length));
    } catch (error) {
      console.error('Export error:', error);
      toast.error(t.exportFailed);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      sku: product.sku,
      barcode: product.barcode || '',
      category: product.category,
      brand: product.brand,
      unitPrice: product.unitPrice.toString(),
      purchasePrice: product.purchasePrice.toString(),
      reorderLevel: product.reorderLevel.toString(),
      description: product.description || '',
      currency: product.currency || 'USD'
    });
    setShowEditModal(true);
  };

  const openViewModal = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  // Calculate warehouse utilization correctly
  const getWarehouseUtilization = (warehouse) => {
    if (!warehouse.capacity || warehouse.capacity === 0) return 0;
    const utilization = (warehouse.currentStock / warehouse.capacity) * 100;
    return Math.min(utilization, 100).toFixed(1);
  };

  if (loading && !products || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loadingProducts}</p>
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
              <h1 className="text-2xl font-bold text-gray-900">{t.inventoryManagement}</h1>
              <p className="text-sm text-gray-500 mt-1">{t.inventoryDesc}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handleExport}
              className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Download size={16} />
              {t.exportCSV}
            </button>
            <button
              onClick={() => {
                resetAddForm();
                setShowAddModal(true);
              }}
              className={`px-4 py-2 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg hover:shadow-lg flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Plus size={16} />
              {t.addProduct}
            </button>
          </div>
        </div>

        {/* Stats Cards - Multi Currency Support */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.totalProducts}</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.lowStockItems}</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.criticalStock}</p>
                <p className="text-2xl font-bold text-red-600">{criticalStockCount}</p>
              </div>
              <AlertOctagon className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.totalInventoryValue}</p>
                <div className="space-y-1">
                  {Object.keys(totalValueByCurrency).length > 0 ? (
                    Object.entries(totalValueByCurrency).map(([currency, value]) => (
                      <p key={currency} className="text-lg font-bold text-gray-900">
                        {getCurrencySymbol(currency)} {value.toLocaleString()} <span className="text-xs font-normal text-gray-500">{currency}</span>
                      </p>
                    ))
                  ) : (
                    <p className="text-lg font-bold text-gray-900">$0</p>
                  )}
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className={`flex flex-col lg:flex-row gap-4 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1 relative">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="all">{t.allCategories}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 ${viewMode === 'table' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <TableIcon size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Warehouse Stock Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {(warehouses || []).map(warehouse => {
            const utilization = getWarehouseUtilization(warehouse);
            return (
              <div key={warehouse.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Warehouse size={18} className="text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{warehouse.name}</h3>
                  </div>
                  <span className="text-xs text-gray-500">{warehouse.location}</span>
                </div>
                <div className={`flex justify-between items-baseline mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <p className="text-2xl font-bold text-gray-900">{warehouse.currentStock}</p>
                  <p className="text-xs text-gray-500">Capacity: {warehouse.capacity}</p>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`rounded-full h-2 ${utilization > 90 ? 'bg-red-500' : utilization > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${utilization}%` }}
                  ></div>
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${isRTL ? 'text-right' : ''}`}>
                  {utilization}% {t.capacityUsedLabel}
                </p>
                {warehouse.manager && (
                  <p className={`text-xs text-gray-400 mt-2 ${isRTL ? 'text-right' : ''}`}>{t.manager}: {warehouse.manager}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Products Display - Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                onClick={() => openViewModal(product)}
              >
                <div className="p-4">
                  <div className={`flex items-start justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-gray-900 ${isRTL ? 'text-right' : ''}`}>{product.name}</h3>
                      <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{product.sku}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${getStatusColor(product.status)} ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {getStatusIcon(product.status)}
                      {getStatusText(product.status)}
                    </span>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-500">{t.price}:</span>
                      <span className="font-medium text-green-600">
                        {getCurrencySymbol(product.currency)} {product.unitPrice}
                      </span>
                    </div>
                    <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-500">{t.stock}:</span>
                      <span className={`font-medium ${product.currentStock <= product.reorderLevel ? 'text-red-600' : 'text-green-600'}`}>
                        {product.currentStock} {t.units}
                      </span>
                    </div>
                    <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-500">{t.reorderLevelLabelShort}:</span>
                      <span className="font-medium">{product.reorderLevel}</span>
                    </div>
                    <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-500">{t.warehouses}:</span>
                      <span className="font-medium">{product.warehouseStock?.length || 0}</span>
                    </div>
                    <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-500">{t.value}:</span>
                      <span className="font-medium text-blue-600">
                        {getCurrencySymbol(product.currency)} {(product.currentStock * product.unitPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Show warehouse distribution preview */}
                  {product.warehouseStock && product.warehouseStock.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <p className={`text-xs text-gray-500 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouseDistribution}:</p>
                      <div className="space-y-1">
                        {product.warehouseStock.slice(0, 2).map((wh, idx) => (
                          <div key={idx} className={`flex justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="text-gray-600">{wh.warehouseName}</span>
                            <span className="font-medium">{wh.quantity} {t.units}</span>
                          </div>
                        ))}
                        {product.warehouseStock.length > 2 && (
                          <p className={`text-xs text-gray-400 ${isRTL ? 'text-right' : ''}`}>+{product.warehouseStock.length - 2} more warehouses</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className={`mt-4 flex items-center justify-end gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(product);
                      }}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(product);
                      }}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Table View
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className={isRTL ? 'text-right' : 'text-left'}>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.product}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.sku}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.category}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-right">{t.price}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-right">{t.stock}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-right">{t.value}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.status}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.warehouses}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-right">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => openViewModal(product)}>
                    <td className="px-6 py-3">
                      <div>
                        <p className={`text-sm font-medium text-gray-900 ${isRTL ? 'text-right' : ''}`}>{product.name}</p>
                        <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{product.brand}</p>
                      </div>
                    </td>
                    <td className={`px-6 py-3 text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>{product.sku}</td>
                    <td className={`px-6 py-3 text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>{product.category}</td>
                    <td className="px-6 py-3 text-sm text-right font-medium">
                      {getCurrencySymbol(product.currency)} {product.unitPrice}
                    </td>
                    <td className="px-6 py-3 text-sm text-right">
                      <span className={product.currentStock <= product.reorderLevel ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {product.currentStock}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-right font-medium text-blue-600">
                      {getCurrencySymbol(product.currency)} {(product.currentStock * product.unitPrice).toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${getStatusColor(product.status)} ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {getStatusIcon(product.status)}
                        {getStatusText(product.status)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      <div className={`flex flex-wrap gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {product.warehouseStock?.slice(0, 2).map((wh, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                            {wh.warehouseName}: {wh.quantity}
                          </span>
                        ))}
                        {product.warehouseStock?.length > 2 && (
                          <span className="text-xs text-gray-400">+{product.warehouseStock.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className={`flex items-center justify-end gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(product);
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit2 size={14} className="text-blue-600" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(product);
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Trash2 size={14} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`flex items-center justify-between mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <p className="text-sm text-gray-600">
              {t.showing} {pagination?.page * pagination?.limit - pagination?.limit + 1} {t.to} {Math.min(pagination?.page * pagination?.limit, pagination?.total)} {t.of} {pagination?.total} {t.products}
            </p>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
              <span className="px-4 py-2 border rounded-lg bg-gray-50">
                {t.page} {currentPage} {t.of} {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                {isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.addNewProduct}</h2>
              <button onClick={() => {
                setShowAddModal(false);
                resetAddForm();
              }} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.productName} *</label>
                  <input
                    type="text"
                    value={addForm.name}
                    onChange={(e) => setAddForm({...addForm, name: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    placeholder={t.productName}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.sku} *</label>
                  <input
                    type="text"
                    value={addForm.sku}
                    onChange={(e) => setAddForm({...addForm, sku: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    placeholder={t.uniqueSkuCode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.barcodeLabel}</label>
                  <input
                    type="text"
                    value={addForm.barcode}
                    onChange={(e) => setAddForm({...addForm, barcode: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    placeholder={t.scanBarcode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.categoryLabel}</label>
                  <select
                    value={addForm.category}
                    onChange={(e) => setAddForm({...addForm, category: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  >
                    <option value="">{t.selectCategory}</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.brandLabel}</label>
                  <input
                    type="text"
                    value={addForm.brand}
                    onChange={(e) => setAddForm({...addForm, brand: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    placeholder={t.enterBrand}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.unitPriceLabel} *</label>
                  <input
                    type="number"
                    value={addForm.unitPrice}
                    onChange={(e) => setAddForm({...addForm, unitPrice: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    placeholder={t.sellingPrice}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.currencyLabel} *</label>
                  <select
                    value={addForm.currency}
                    onChange={(e) => setAddForm({...addForm, currency: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name} ({currency.symbol})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.purchasePriceLabel}</label>
                  <input
                    type="number"
                    value={addForm.purchasePrice}
                    onChange={(e) => setAddForm({...addForm, purchasePrice: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    placeholder={t.costPrice}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.reorderLevelLabel}</label>
                  <input
                    type="number"
                    value={addForm.reorderLevel}
                    onChange={(e) => setAddForm({...addForm, reorderLevel: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    placeholder={t.alertWhenStockBelow}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.descriptionLabel}</label>
                  <textarea
                    value={addForm.description}
                    onChange={(e) => setAddForm({...addForm, description: e.target.value})}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    placeholder={t.descriptionPlaceholder}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => {
                setShowAddModal(false);
                resetAddForm();
              }} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                {t.cancel}
              </button>
              <button onClick={handleAddProduct} disabled={createLoading} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
                {createLoading ? <RefreshCw size={16} className="animate-spin" /> : t.addProductBtn}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.editProduct}</h2>
              <button onClick={() => {
                setShowEditModal(false);
                resetEditForm();
                setSelectedProduct(null);
              }} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.productName} *</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.sku} *</label>
                  <input
                    type="text"
                    value={editForm.sku}
                    onChange={(e) => setEditForm({...editForm, sku: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.barcodeLabel}</label>
                  <input
                    type="text"
                    value={editForm.barcode}
                    onChange={(e) => setEditForm({...editForm, barcode: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.categoryLabel}</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  >
                    <option value="">{t.selectCategory}</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.brandLabel}</label>
                  <input
                    type="text"
                    value={editForm.brand}
                    onChange={(e) => setEditForm({...editForm, brand: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.unitPriceLabel} *</label>
                  <input
                    type="number"
                    value={editForm.unitPrice}
                    onChange={(e) => setEditForm({...editForm, unitPrice: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.currencyLabel} *</label>
                  <select
                    value={editForm.currency}
                    onChange={(e) => setEditForm({...editForm, currency: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name} ({currency.symbol})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.purchasePriceLabel}</label>
                  <input
                    type="number"
                    value={editForm.purchasePrice}
                    onChange={(e) => setEditForm({...editForm, purchasePrice: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.reorderLevelLabel}</label>
                  <input
                    type="number"
                    value={editForm.reorderLevel}
                    onChange={(e) => setEditForm({...editForm, reorderLevel: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>{t.descriptionLabel}</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => {
                setShowEditModal(false);
                resetEditForm();
                setSelectedProduct(null);
              }} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                {t.cancel}
              </button>
              <button onClick={handleEditProduct} disabled={updateLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {updateLoading ? <RefreshCw size={16} className="animate-spin" /> : t.updateProduct}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 size={32} className="text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{t.deleteProduct}</h3>
              <p className="text-center text-gray-600 mb-6">
                {t.deleteConfirmation} <span className="font-semibold">{productToDelete.name}</span>?<br />
                <span className="text-sm text-red-500">{t.deleteWarning}</span>
              </p>
              {productToDelete.currentStock > 0 && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 text-center">
                    ⚠️ {t.stockWarning.replace('{count}', productToDelete.currentStock)}
                  </p>
                </div>
              )}
              <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading || productToDelete.currentStock > 0}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? <RefreshCw size={16} className="animate-spin mx-auto" /> : t.deleteProductBtn}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* View Product Modal */}
      {showViewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{selectedProduct.name}</h2>
                <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.productDetails}</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Basic Information */}
              <div className="mb-6">
                <h3 className={`text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Info size={18} />
                  {t.basicInformation}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.productNameLabel}</p>
                    <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{selectedProduct.name}</p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.skuLabel}</p>
                    <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{selectedProduct.sku}</p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.barcodeLabelShort}</p>
                    <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{selectedProduct.barcode || 'N/A'}</p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.categoryLabelShort}</p>
                    <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.brandLabelShort}</p>
                    <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{selectedProduct.brand}</p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.currencyLabelShort}</p>
                    <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>
                      {getCurrencySymbol(selectedProduct.currency)} {selectedProduct.currency}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.statusLabel}</p>
                    <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${getStatusColor(selectedProduct.status)} ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {getStatusIcon(selectedProduct.status)}
                      {getStatusText(selectedProduct.status)}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.descriptionLabelShort}</p>
                    <p className={`font-medium text-gray-700 mt-1 leading-relaxed ${isRTL ? 'text-right' : ''}`}>{selectedProduct.description || t.noDescription}</p>
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="mb-6">
                <h3 className={`text-lg font-semibold text-gray-900 mb-3 ${isRTL ? 'text-right' : ''}`}>{t.pricingAndStock}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.unitPriceLabelShort}</p>
                    <p className={`text-xl font-bold text-green-600 ${isRTL ? 'text-right' : ''}`}>
                      {getCurrencySymbol(selectedProduct.currency)} {selectedProduct.unitPrice}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.purchasePriceLabelShort}</p>
                    <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{getCurrencySymbol(selectedProduct.currency)} {selectedProduct.purchasePrice}</p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.currentStock}</p>
                    <p className={`text-xl font-bold ${selectedProduct.currentStock <= selectedProduct.reorderLevel ? 'text-red-600' : 'text-gray-900'} ${isRTL ? 'text-right' : ''}`}>
                      {selectedProduct.currentStock} {t.units}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.totalValue}</p>
                    <p className={`text-xl font-bold text-blue-600 ${isRTL ? 'text-right' : ''}`}>
                      {getCurrencySymbol(selectedProduct.currency)} {(selectedProduct.currentStock * selectedProduct.unitPrice).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.reorderLevelLabelShort}</p>
                    <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{selectedProduct.reorderLevel} {t.units}</p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.createdAt}</p>
                    <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{selectedProduct.createdAt}</p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.lastUpdated}</p>
                    <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{selectedProduct.updatedAt}</p>
                  </div>
                </div>
              </div>

              {/* Warehouse Distribution */}
              {selectedProduct.warehouseStock && selectedProduct.warehouseStock.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Warehouse size={18} />
                    {t.warehouseDistribution}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProduct.warehouseStock.map((wh) => (
                      <div key={wh.warehouseId} className="bg-gray-50 rounded-lg p-3">
                        <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div>
                            <p className={`font-semibold ${isRTL ? 'text-right' : ''}`}>{wh.warehouseName || t.unknownWarehouse}</p>
                            <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.warehouseId}: {wh.warehouseId}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-blue-600">{wh.quantity}</p>
                            <p className="text-xs text-gray-500">{t.units}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse justify-start' : 'justify-end'}`}>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(selectedProduct);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {t.editProductBtn}
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Inventory;