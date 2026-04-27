// src/modules/purchases/Purchases.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Search, Edit2, Trash2, Filter, Download, Upload,
  Package, AlertTriangle, CheckCircle, XCircle, Eye,
  ChevronDown, MoreVertical, Copy, Archive, AlertOctagon,
  Truck, Calendar, Tag, Layers, TrendingUp, TrendingDown,
  ArrowLeft, X, Save, RefreshCw, Printer, Box, Grid3x3,
  Table as TableIcon, ChevronLeft, ChevronRight, Info,
  User, Phone, Mail, MapPin, CreditCard, DollarSign,
  ShoppingCart, FileText, Send, Receipt, Clock, Award,
  Users, Warehouse, PlusCircle, MinusCircle, Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import {
  createSupplierAction,
  getAllSuppliersAction,
  updateSupplierAction,
  deleteSupplierAction,
  createPurchaseOrderAction,
  getAllPurchaseOrdersAction,
  receiveStockAction,
  updateOrderStatusAction,
  clearErrors
} from "../../actions/purchaseActions";
import { getAllProductsAction } from "../../actions/productActions";
import { getAllWarehousesAction } from "../../actions/warehouseActions";
import {
  CREATE_SUPPLIER_RESET,
  UPDATE_SUPPLIER_RESET,
  DELETE_SUPPLIER_RESET,
  CREATE_PURCHASE_ORDER_RESET,
  RECEIVE_STOCK_RESET,
  UPDATE_ORDER_STATUS_RESET
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

// Language Translations
const translations = {
  en: {
    // Header
    backToDashboard: "Back to Dashboard",
    purchaseManagement: "Purchase Management",
    purchaseDesc: "Manage suppliers, purchase orders, and receive stock",
    export: "Export",
    addSupplier: "Add Supplier",
    createOrder: "Create Order",
    
    // Tabs
    suppliers: "Suppliers",
    purchaseOrders: "Purchase Orders",
    
    // Search
    searchSuppliers: "Search suppliers by name, company, email...",
    searchOrders: "Search orders by order number, supplier...",
    
    // Supplier Stats
    totalSuppliers: "Total Suppliers",
    activeSuppliers: "Active Suppliers",
    totalPurchases: "Total Purchases",
    usdEquivalent: "(USD Equivalent)",
    outstandingBalance: "Outstanding Balance",
    
    // Order Stats
    totalOrders: "Total Orders",
    deliveredOrders: "Delivered Orders",
    processingOrders: "Processing Orders",
    totalByCurrency: "Total by Currency",
    ordersCount: "orders",
    
    // Table Headers - Suppliers
    supplier: "Supplier",
    company: "Company",
    contact: "Contact",
    currency: "Currency",
    discount: "Discount",
    totalPurchasesTable: "Total Purchases",
    status: "Status",
    actions: "Actions",
    
    // Table Headers - Orders
    orderNumber: "Order #",
    supplierName: "Supplier",
    orderDate: "Order Date",
    total: "Total",
    
    // Order Status
    delivered: "Delivered",
    processing: "Processing",
    pending: "Pending",
    partiallyReceived: "Partially Received",
    cancelled: "Cancelled",
    
    // Modal Titles
    addNewSupplier: "Add New Supplier",
    editSupplier: "Edit Supplier",
    deleteSupplier: "Delete Supplier",
    deleteSupplierConfirm: "Are you sure you want to delete",
    createPurchaseOrder: "Create Purchase Order",
    receiveStock: "Receive Stock",
    updateOrderStatus: "Update Order Status",
    orderDetails: "Order Details",
    addProductToOrder: "Add Product to Order",
    
    // Form Labels - Supplier
    supplierName: "Name *",
    companyName: "Company",
    email: "Email *",
    phone: "Phone",
    address: "Address",
    taxNumber: "Tax Number",
    discountPercent: "Discount (%)",
    currencyLabel: "Currency *",
    
    // Form Labels - Order
    selectSupplier: "Select Supplier",
    orderDateLabel: "Order Date *",
    discountLabel: "Discount (%)",
    notes: "Notes",
    orderItems: "Order Items",
    addProduct: "Add Product",
    noItemsYet: "No items added yet. Click \"Add Product\" to add items.",
    
    // Form Labels - Order Item
    product: "Product *",
    quantity: "Quantity *",
    unitPrice: "Unit Price *",
    warehouse: "Warehouse *",
    expectedDelivery: "Expected Delivery Date",
    
    // Product Selector
    selectProduct: "Select Product",
    stock: "Stock",
    selectWarehouse: "Select Warehouse",
    
    // Receive Stock
    receiveStockInfo: "Receiving stock will update product inventory and warehouse stock directly. Each product will be added to its specified warehouse.",
    itemsToReceive: "Items to be received:",
    subtotal: "Subtotal:",
    confirmReceive: "Confirm Receive Stock",
    processingText: "Processing...",
    
    // Update Status
    statusLabel: "Status *",
    notesOptional: "Notes (Optional)",
    addNotesPlaceholder: "Add any notes about this status change...",
    updateStatus: "Update Status",
    
    // Buttons
    cancel: "Cancel",
    addSupplierBtn: "Add Supplier",
    updateSupplierBtn: "Update Supplier",
    deleteSupplierBtn: "Delete Supplier",
    addToOrder: "Add to Order",
    createOrderBtn: "Create Order",
    receiveStockBtn: "Receive Stock",
    updateStatusBtn: "Update Status",
    close: "Close",
    
    // Pagination
    showing: "Showing",
    to: "to",
    of: "of",
    items: "items",
    page: "Page",
    
    // Success/Error Messages
    supplierAdded: "Supplier added successfully!",
    supplierUpdated: "Supplier updated successfully!",
    supplierDeleted: "Supplier deleted successfully!",
    orderCreated: "Purchase order created successfully!",
    stockReceived: "Stock received successfully! Inventory updated.",
    statusUpdated: "Order status updated successfully!",
    exportSuccess: "Export successful",
    fillRequiredFields: "Please fill required fields",
    selectSupplierAndProducts: "Please select supplier and add at least one product",
    cannotReceiveCancelled: "Cannot receive cancelled order",
    
    // Other
    sku: "SKU",
    qty: "Qty",
    expectedDeliveryCol: "Expected Delivery",
    action: "Action",
    notAssigned: "Not assigned",
    notSet: "Not set",
    subTotal: "Subtotal:",
    totalAmount: "Total:"
  },
  ur: {
    // Header
    backToDashboard: "ڈیش بورڈ پر واپس جائیں",
    purchaseManagement: "خریداری کا نظام",
    purchaseDesc: "سپلائرز، آرڈرز کا نظم کریں اور اسٹاک وصول کریں",
    export: "ایکسپورٹ",
    addSupplier: "سپلائر شامل کریں",
    createOrder: "آرڈر بنائیں",
    
    // Tabs
    suppliers: "سپلائرز",
    purchaseOrders: "پرسنز آرڈرز",
    
    // Search
    searchSuppliers: "سپلائرز کو نام، کمپنی، ای میل سے تلاش کریں...",
    searchOrders: "آرڈر نمبر، سپلائر سے تلاش کریں...",
    
    // Supplier Stats
    totalSuppliers: "کل سپلائرز",
    activeSuppliers: "فعال سپلائرز",
    totalPurchases: "کل خریداری",
    usdEquivalent: "(USD کے برابر)",
    outstandingBalance: "بقایا رقم",
    
    // Order Stats
    totalOrders: "کل آرڈرز",
    deliveredOrders: "ڈیلیور شدہ آرڈرز",
    processingOrders: "پروسیسنگ آرڈرز",
    totalByCurrency: "کرنسی کے حساب سے کل",
    ordersCount: "آرڈرز",
    
    // Table Headers - Suppliers
    supplier: "سپلائر",
    company: "کمپنی",
    contact: "رابطہ",
    currency: "کرنسی",
    discount: "چھوٹ",
    totalPurchasesTable: "کل خریداری",
    status: "حالت",
    actions: "اعمال",
    
    // Table Headers - Orders
    orderNumber: "آرڈر نمبر",
    supplierName: "سپلائر",
    orderDate: "آرڈر کی تاریخ",
    total: "کل",
    
    // Order Status
    delivered: "ڈیلیور شدہ",
    processing: "پروسیسنگ",
    pending: "زیر التواء",
    partiallyReceived: "جزوی طور پر موصول",
    cancelled: "منسوخ شدہ",
    
    // Modal Titles
    addNewSupplier: "نیا سپلائر شامل کریں",
    editSupplier: "سپلائر میں ترمیم کریں",
    deleteSupplier: "سپلائر حذف کریں",
    deleteSupplierConfirm: "کیا آپ واقعی حذف کرنا چاہتے ہیں",
    createPurchaseOrder: "پرسنز آرڈر بنائیں",
    receiveStock: "اسٹاک وصول کریں",
    updateOrderStatus: "آرڈر کی حالت تبدیل کریں",
    orderDetails: "آرڈر کی تفصیلات",
    addProductToOrder: "آرڈر میں پروڈکٹ شامل کریں",
    
    // Form Labels - Supplier
    supplierName: "نام *",
    companyName: "کمپنی",
    email: "ای میل *",
    phone: "فون",
    address: "پتہ",
    taxNumber: "ٹیکس نمبر",
    discountPercent: "چھوٹ (%)",
    currencyLabel: "کرنسی *",
    
    // Form Labels - Order
    selectSupplier: "سپلائر منتخب کریں",
    orderDateLabel: "آرڈر کی تاریخ *",
    discountLabel: "چھوٹ (%)",
    notes: "نوٹس",
    orderItems: "آرڈر کی اشیاء",
    addProduct: "پروڈکٹ شامل کریں",
    noItemsYet: "ابھی تک کوئی اشیاء شامل نہیں کی گئیں۔ \"پروڈکٹ شامل کریں\" پر کلک کریں۔",
    
    // Form Labels - Order Item
    product: "پروڈکٹ *",
    quantity: "مقدار *",
    unitPrice: "فی یونٹ قیمت *",
    warehouse: "گودام *",
    expectedDelivery: "متوقع ترسیل کی تاریخ",
    
    // Product Selector
    selectProduct: "پروڈکٹ منتخب کریں",
    stock: "اسٹاک",
    selectWarehouse: "گودام منتخب کریں",
    
    // Receive Stock
    receiveStockInfo: "اسٹاک وصول کرنے سے پروڈکٹ کی انوینٹری اور گودام کا اسٹاک براہ راست اپ ڈیٹ ہو جائے گا۔ ہر پروڈکٹ اس کے مخصوص گودام میں شامل ہو جائے گی۔",
    itemsToReceive: "وصول کی جانے والی اشیاء:",
    subtotal: "ذیلی کل:",
    confirmReceive: "اسٹاک وصول کرنے کی تصدیق کریں",
    processingText: "پروسیسنگ...",
    
    // Update Status
    statusLabel: "حالت *",
    notesOptional: "نوٹس (اختیاری)",
    addNotesPlaceholder: "اس حالت کی تبدیلی کے بارے میں کوئی نوٹ شامل کریں...",
    updateStatus: "حالت تبدیل کریں",
    
    // Buttons
    cancel: "منسوخ کریں",
    addSupplierBtn: "سپلائر شامل کریں",
    updateSupplierBtn: "سپلائر اپ ڈیٹ کریں",
    deleteSupplierBtn: "سپلائر حذف کریں",
    addToOrder: "آرڈر میں شامل کریں",
    createOrderBtn: "آرڈر بنائیں",
    receiveStockBtn: "اسٹاک وصول کریں",
    updateStatusBtn: "حالت تبدیل کریں",
    close: "بند کریں",
    
    // Pagination
    showing: "دکھا رہا ہے",
    to: "سے",
    of: "کل",
    items: "اشیاء",
    page: "صفحہ",
    
    // Success/Error Messages
    supplierAdded: "سپلائر کامیابی سے شامل ہو گیا!",
    supplierUpdated: "سپلائر کامیابی سے اپ ڈیٹ ہو گیا!",
    supplierDeleted: "سپلائر کامیابی سے حذف ہو گیا!",
    orderCreated: "پرسنز آرڈر کامیابی سے بن گیا!",
    stockReceived: "اسٹاک کامیابی سے موصول ہو گیا! انوینٹری اپ ڈیٹ ہو گئی۔",
    statusUpdated: "آرڈر کی حالت کامیابی سے تبدیل ہو گئی!",
    exportSuccess: "ایکسپورٹ کامیاب",
    fillRequiredFields: "براہ کرم ضروری فیلڈز پُر کریں",
    selectSupplierAndProducts: "براہ کرم سپلائر منتخب کریں اور کم از کم ایک پروڈکٹ شامل کریں",
    cannotReceiveCancelled: "منسوخ شدہ آرڈر وصول نہیں کیا جا سکتا",
    
    // Other
    sku: "SKU",
    qty: "مقدار",
    expectedDeliveryCol: "متوقع ترسیل",
    action: "عمل",
    notAssigned: "تفویض نہیں",
    notSet: "مقرر نہیں",
    subTotal: "ذیلی کل:",
    totalAmount: "کل:"
  },
  ps: {
    // Header
    backToDashboard: "ډشبورډ ته راګرځئ",
    purchaseManagement: "د پیرود مدیریت",
    purchaseDesc: "تامین کونکي، د پیرود امرونه اداره کړئ او سټاک ترلاسه کړئ",
    export: "صادرول",
    addSupplier: "تامین کوونکی اضافه کړئ",
    createOrder: "امر جوړ کړئ",
    
    // Tabs
    suppliers: "تامین کونکي",
    purchaseOrders: "د پیرود امرونه",
    
    // Search
    searchSuppliers: "تامین کونکي د نوم، شرکت، بریښنالیک له مخې وپلټئ...",
    searchOrders: "امرونه د امر شمیرې، تامین کونکي له مخې وپلټئ...",
    
    // Supplier Stats
    totalSuppliers: "ټول تامین کونکي",
    activeSuppliers: "فعال تامین کونکي",
    totalPurchases: "ټول پیرودونه",
    usdEquivalent: "(د USD برابر)",
    outstandingBalance: "پاتې پور",
    
    // Order Stats
    totalOrders: "ټول امرونه",
    deliveredOrders: "رسیدلي امرونه",
    processingOrders: "په پروسه کې امرونه",
    totalByCurrency: "د اسعارو له مخې ټول",
    ordersCount: "امرونه",
    
    // Table Headers - Suppliers
    supplier: "تامین کوونکی",
    company: "شرکت",
    contact: "اړیکه",
    currency: "اسعار",
    discount: "تخفیف",
    totalPurchasesTable: "ټول پیرودونه",
    status: "حالت",
    actions: "کړنې",
    
    // Table Headers - Orders
    orderNumber: "امر نمبر",
    supplierName: "تامین کوونکی",
    orderDate: "د امر نیټه",
    total: "ټول",
    
    // Order Status
    delivered: "رسیدلی",
    processing: "په پروسه کې",
    pending: "ځنډیدلی",
    partiallyReceived: "برخه یې ترلاسه شوې",
    cancelled: "لغوه شوی",
    
    // Modal Titles
    addNewSupplier: "نوی تامین کوونکی اضافه کړئ",
    editSupplier: "تامین کوونکی ترمیم کړئ",
    deleteSupplier: "تامین کوونکی حذف کړئ",
    deleteSupplierConfirm: "آیا تاسو واقعیا حذف کول غواړئ",
    createPurchaseOrder: "د پیرود امر جوړ کړئ",
    receiveStock: "سټاک ترلاسه کړئ",
    updateOrderStatus: "د امر حالت تازه کړئ",
    orderDetails: "د امر جزئیات",
    addProductToOrder: "امر ته محصول اضافه کړئ",
    
    // Form Labels - Supplier
    supplierName: "نوم *",
    companyName: "شرکت",
    email: "بریښنالیک *",
    phone: "تلیفون",
    address: "پته",
    taxNumber: "مالیې شمېره",
    discountPercent: "تخفیف (%)",
    currencyLabel: "اسعار *",
    
    // Form Labels - Order
    selectSupplier: "تامین کوونکی وټاکئ",
    orderDateLabel: "د امر نیټه *",
    discountLabel: "تخفیف (%)",
    notes: "یادښتونه",
    orderItems: "د امر توکي",
    addProduct: "محصول اضافه کړئ",
    noItemsYet: "تراوسه کوم توکي ندي اضافه شوي. د توکو اضافه کولو لپاره \"محصول اضافه کړئ\" کلیک وکړئ.",
    
    // Form Labels - Order Item
    product: "محصول *",
    quantity: "مقدار *",
    unitPrice: "د واحد قیمت *",
    warehouse: "ګودام *",
    expectedDelivery: "د رسیدو متوقع نیټه",
    
    // Product Selector
    selectProduct: "محصول وټاکئ",
    stock: "سټاک",
    selectWarehouse: "ګودام وټاکئ",
    
    // Receive Stock
    receiveStockInfo: "د سټاک ترلاسه کول به د محصول لیست او د ګودام سټاک په مستقیم ډول تازه کړي. هر محصول به خپل مشخص ګودام کې اضافه شي.",
    itemsToReceive: "د ترلاسه کولو توکي:",
    subtotal: "فرعي ټول:",
    confirmReceive: "د سټاک ترلاسه کولو تایید",
    processingText: "پروسه روانه ده...",
    
    // Update Status
    statusLabel: "حالت *",
    notesOptional: "یادښتونه (اختیاري)",
    addNotesPlaceholder: "د دې حالت بدلون په اړه کوم یادښتونه اضافه کړئ...",
    updateStatus: "حالت تازه کړئ",
    
    // Buttons
    cancel: "لغوه کړئ",
    addSupplierBtn: "تامین کوونکی اضافه کړئ",
    updateSupplierBtn: "تامین کوونکی تازه کړئ",
    deleteSupplierBtn: "تامین کوونکی حذف کړئ",
    addToOrder: "امر ته اضافه کړئ",
    createOrderBtn: "امر جوړ کړئ",
    receiveStockBtn: "سټاک ترلاسه کړئ",
    updateStatusBtn: "حالت تازه کړئ",
    close: "بند کړئ",
    
    // Pagination
    showing: "ښکاره کوي",
    to: "ته",
    of: "د",
    items: "توکي",
    page: "مخ",
    
    // Success/Error Messages
    supplierAdded: "تامین کوونکی په بریالیتوب سره اضافه شو!",
    supplierUpdated: "تامین کوونکی په بریالیتوب سره تازه شو!",
    supplierDeleted: "تامین کوونکی په بریالیتوب سره حذف شو!",
    orderCreated: "د پیرود امر په بریالیتوب سره جوړ شو!",
    stockReceived: "سټاک په بریالیتوب سره ترلاسه شو! لیست تازه شو.",
    statusUpdated: "د امر حالت په بریالیتوب سره تازه شو!",
    exportSuccess: "صادرول بریالي",
    fillRequiredFields: "مهرباني وکړئ اړین ساحې ډک کړئ",
    selectSupplierAndProducts: "مهرباني وکړئ تامین کوونکی وټاکئ او لږ تر لږه یو محصول اضافه کړئ",
    cannotReceiveCancelled: "لغوه شوی امر نشي ترلاسه کیدی",
    
    // Other
    sku: "SKU",
    qty: "مقدار",
    expectedDeliveryCol: "متوقع رسیدنه",
    action: "عمل",
    notAssigned: "نه ټاکل شوی",
    notSet: "نه ټاکل شوی",
    subTotal: "فرعي ټول:",
    totalAmount: "ټول:"
  },
  fa: {
    // Header
    backToDashboard: "بازگشت به داشبورد",
    purchaseManagement: "مدیریت خرید",
    purchaseDesc: "مدیریت تأمین‌کنندگان، سفارشات خرید و دریافت موجودی",
    export: "خروجی",
    addSupplier: "افزودن تأمین‌کننده",
    createOrder: "ایجاد سفارش",
    
    // Tabs
    suppliers: "تأمین‌کنندگان",
    purchaseOrders: "سفارشات خرید",
    
    // Search
    searchSuppliers: "جستجوی تأمین‌کنندگان بر اساس نام، شرکت، ایمیل...",
    searchOrders: "جستجوی سفارشات بر اساس شماره سفارش، تأمین‌کننده...",
    
    // Supplier Stats
    totalSuppliers: "کل تأمین‌کنندگان",
    activeSuppliers: "تأمین‌کنندگان فعال",
    totalPurchases: "کل خریدها",
    usdEquivalent: "(معادل USD)",
    outstandingBalance: "مانده بدهی",
    
    // Order Stats
    totalOrders: "کل سفارشات",
    deliveredOrders: "سفارشات تحویل شده",
    processingOrders: "سفارشات در حال پردازش",
    totalByCurrency: "مجموع بر اساس ارز",
    ordersCount: "سفارش",
    
    // Table Headers - Suppliers
    supplier: "تأمین‌کننده",
    company: "شرکت",
    contact: "تماس",
    currency: "ارز",
    discount: "تخفیف",
    totalPurchasesTable: "کل خریدها",
    status: "وضعیت",
    actions: "عملیات",
    
    // Table Headers - Orders
    orderNumber: "شماره سفارش",
    supplierName: "تأمین‌کننده",
    orderDate: "تاریخ سفارش",
    total: "مجموع",
    
    // Order Status
    delivered: "تحویل شده",
    processing: "در حال پردازش",
    pending: "در انتظار",
    partiallyReceived: "دریافت جزئی",
    cancelled: "لغو شده",
    
    // Modal Titles
    addNewSupplier: "افزودن تأمین‌کننده جدید",
    editSupplier: "ویرایش تأمین‌کننده",
    deleteSupplier: "حذف تأمین‌کننده",
    deleteSupplierConfirm: "آیا مطمئن هستید که می‌خواهید حذف کنید",
    createPurchaseOrder: "ایجاد سفارش خرید",
    receiveStock: "دریافت موجودی",
    updateOrderStatus: "به‌روزرسانی وضعیت سفارش",
    orderDetails: "جزئیات سفارش",
    addProductToOrder: "افزودن محصول به سفارش",
    
    // Form Labels - Supplier
    supplierName: "نام *",
    companyName: "شرکت",
    email: "ایمیل *",
    phone: "تلفن",
    address: "آدرس",
    taxNumber: "شماره مالیاتی",
    discountPercent: "تخفیف (%)",
    currencyLabel: "ارز *",
    
    // Form Labels - Order
    selectSupplier: "انتخاب تأمین‌کننده",
    orderDateLabel: "تاریخ سفارش *",
    discountLabel: "تخفیف (%)",
    notes: "یادداشت‌ها",
    orderItems: "آیتم‌های سفارش",
    addProduct: "افزودن محصول",
    noItemsYet: "هنوز آیتمی اضافه نشده است. برای افزودن آیتم روی \"افزودن محصول\" کلیک کنید.",
    
    // Form Labels - Order Item
    product: "محصول *",
    quantity: "تعداد *",
    unitPrice: "قیمت واحد *",
    warehouse: "انبار *",
    expectedDelivery: "تاریخ تحویل مورد انتظار",
    
    // Product Selector
    selectProduct: "انتخاب محصول",
    stock: "موجودی",
    selectWarehouse: "انتخاب انبار",
    
    // Receive Stock
    receiveStockInfo: "دریافت موجودی، موجودی محصول و انبار را مستقیماً به‌روز می‌کند. هر محصول به انبار مشخص شده اضافه می‌شود.",
    itemsToReceive: "آیتم‌های قابل دریافت:",
    subtotal: "جمع جزئی:",
    confirmReceive: "تأیید دریافت موجودی",
    processingText: "در حال پردازش...",
    
    // Update Status
    statusLabel: "وضعیت *",
    notesOptional: "یادداشت‌ها (اختیاری)",
    addNotesPlaceholder: "هر یادداشتی درباره این تغییر وضعیت اضافه کنید...",
    updateStatus: "به‌روزرسانی وضعیت",
    
    // Buttons
    cancel: "لغو",
    addSupplierBtn: "افزودن تأمین‌کننده",
    updateSupplierBtn: "به‌روزرسانی تأمین‌کننده",
    deleteSupplierBtn: "حذف تأمین‌کننده",
    addToOrder: "افزودن به سفارش",
    createOrderBtn: "ایجاد سفارش",
    receiveStockBtn: "دریافت موجودی",
    updateStatusBtn: "به‌روزرسانی وضعیت",
    close: "بستن",
    
    // Pagination
    showing: "نمایش",
    to: "تا",
    of: "از",
    items: "آیتم",
    page: "صفحه",
    
    // Success/Error Messages
    supplierAdded: "تأمین‌کننده با موفقیت اضافه شد!",
    supplierUpdated: "تأمین‌کننده با موفقیت به‌روز شد!",
    supplierDeleted: "تأمین‌کننده با موفقیت حذف شد!",
    orderCreated: "سفارش خرید با موفقیت ایجاد شد!",
    stockReceived: "موجودی با موفقیت دریافت شد! موجودی به‌روز شد.",
    statusUpdated: "وضعیت سفارش با موفقیت به‌روز شد!",
    exportSuccess: "خروجی با موفقیت انجام شد",
    fillRequiredFields: "لطفاً فیلدهای الزامی را پر کنید",
    selectSupplierAndProducts: "لطفاً تأمین‌کننده را انتخاب کنید و حداقل یک محصول اضافه کنید",
    cannotReceiveCancelled: "نمی‌توان سفارش لغو شده را دریافت کرد",
    
    // Other
    sku: "SKU",
    qty: "تعداد",
    expectedDeliveryCol: "تحویل مورد انتظار",
    action: "عملیات",
    notAssigned: "اختصاص داده نشده",
    notSet: "تنظیم نشده",
    subTotal: "جمع جزئی:",
    totalAmount: "مجموع:"
  }
};

const Purchases = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [activeTab, setActiveTab] = useState('suppliers');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Modal states
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showEditSupplierModal, setShowEditSupplierModal] = useState(false);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showViewOrderModal, setShowViewOrderModal] = useState(false);
  const [showReceiveStockModal, setShowReceiveStockModal] = useState(false);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [showDeleteSupplierModal, setShowDeleteSupplierModal] = useState(false);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  
  // Redux state
  const { suppliers, loading: suppliersLoading, stats: supplierStats } = useSelector((state) => state.allSuppliers);
  const { orders, loading: ordersLoading, stats: orderStats } = useSelector((state) => state.allPurchaseOrders);
  const { products, loading: productsLoading } = useSelector((state) => state.allProducts);
  const { warehouses, loading: warehousesLoading } = useSelector((state) => state.allWarehouses);
  const { loading: createSupplierLoading, success: createSupplierSuccess, error: createSupplierError } = useSelector((state) => state.newSupplier);
  const { loading: updateSupplierLoading, success: updateSupplierSuccess, error: updateSupplierError } = useSelector((state) => state.updateSupplier);
  const { loading: deleteSupplierLoading, success: deleteSupplierSuccess, error: deleteSupplierError } = useSelector((state) => state.deleteSupplier);
  const { loading: createOrderLoading, success: createOrderSuccess, error: createOrderError } = useSelector((state) => state.newPurchaseOrder);
  const { loading: receiveStockLoading, success: receiveStockSuccess, error: receiveStockError } = useSelector((state) => state.receiveStock);
  const { loading: updateStatusLoading, success: updateStatusSuccess, error: updateStatusError } = useSelector((state) => state.updateOrderStatus);
  
  // Form states
  const [supplierForm, setSupplierForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    taxNumber: '',
    discount: '',
    currency: 'USD'
  });
  
  const [orderForm, setOrderForm] = useState({
    supplierId: '',
    orderDate: new Date().toISOString().split('T')[0],
    currency: 'USD',
    discount: '',
    notes: '',
    items: []
  });
  
  // Order item form - NO BATCH FIELDS
  const [orderItemForm, setOrderItemForm] = useState({
    productId: '',
    quantity: 1,
    unitPrice: 0,
    warehouseId: '',
    expectedDeliveryDate: ''
  });
  
  const [statusUpdateForm, setStatusUpdateForm] = useState({
    status: '',
    notes: ''
  });

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
  
  // Fetch data on mount
  useEffect(() => {
    dispatch(getAllSuppliersAction(currentPage, itemsPerPage, searchTerm));
    dispatch(getAllPurchaseOrdersAction(currentPage, itemsPerPage, searchTerm));
    dispatch(getAllProductsAction(1, 100));
    dispatch(getAllWarehousesAction());
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);
  
  // Handle create supplier success
  useEffect(() => {
    if (createSupplierSuccess) {
      toast.success(t.supplierAdded);
      dispatch({ type: CREATE_SUPPLIER_RESET });
      dispatch(getAllSuppliersAction(currentPage, itemsPerPage, searchTerm));
      setShowAddSupplierModal(false);
      resetSupplierForm();
    }
  }, [createSupplierSuccess, dispatch, currentPage, itemsPerPage, searchTerm, t]);
  
  // Handle update supplier success
  useEffect(() => {
    if (updateSupplierSuccess) {
      toast.success(t.supplierUpdated);
      dispatch({ type: UPDATE_SUPPLIER_RESET });
      dispatch(getAllSuppliersAction(currentPage, itemsPerPage, searchTerm));
      setShowEditSupplierModal(false);
      setSelectedSupplier(null);
      resetSupplierForm();
    }
  }, [updateSupplierSuccess, dispatch, currentPage, itemsPerPage, searchTerm, t]);
  
  // Handle delete supplier success
  useEffect(() => {
    if (deleteSupplierSuccess) {
      toast.success(t.supplierDeleted);
      dispatch({ type: DELETE_SUPPLIER_RESET });
      dispatch(getAllSuppliersAction(currentPage, itemsPerPage, searchTerm));
      setShowDeleteSupplierModal(false);
      setSupplierToDelete(null);
    }
  }, [deleteSupplierSuccess, dispatch, currentPage, itemsPerPage, searchTerm, t]);
  
  // Handle create order success
  useEffect(() => {
    if (createOrderSuccess) {
      toast.success(t.orderCreated);
      dispatch({ type: CREATE_PURCHASE_ORDER_RESET });
      dispatch(getAllPurchaseOrdersAction(currentPage, itemsPerPage, searchTerm));
      setShowAddOrderModal(false);
      setOrderForm({
        supplierId: '',
        orderDate: new Date().toISOString().split('T')[0],
        currency: 'USD',
        discount: '',
        notes: '',
        items: []
      });
    }
  }, [createOrderSuccess, dispatch, currentPage, itemsPerPage, searchTerm, t]);
  
  // Handle receive stock success
  useEffect(() => {
    if (receiveStockSuccess) {
      toast.success(t.stockReceived);
      dispatch({ type: RECEIVE_STOCK_RESET });
      dispatch(getAllPurchaseOrdersAction(currentPage, itemsPerPage, searchTerm));
      dispatch(getAllProductsAction(1, 100));
      dispatch(getAllWarehousesAction());
      setShowReceiveStockModal(false);
    }
  }, [receiveStockSuccess, dispatch, currentPage, itemsPerPage, searchTerm, t]);
  
  // Handle update status success
  useEffect(() => {
    if (updateStatusSuccess) {
      toast.success(t.statusUpdated);
      dispatch({ type: UPDATE_ORDER_STATUS_RESET });
      dispatch(getAllPurchaseOrdersAction(currentPage, itemsPerPage, searchTerm));
      setShowUpdateStatusModal(false);
      setStatusUpdateForm({ status: '', notes: '' });
    }
  }, [updateStatusSuccess, dispatch, currentPage, itemsPerPage, searchTerm, t]);
  
  // Handle errors
  useEffect(() => {
    if (createSupplierError) toast.error(createSupplierError);
    if (updateSupplierError) toast.error(updateSupplierError);
    if (deleteSupplierError) toast.error(deleteSupplierError);
    if (createOrderError) toast.error(createOrderError);
    if (receiveStockError) toast.error(receiveStockError);
    if (updateStatusError) toast.error(updateStatusError);
    dispatch(clearErrors());
  }, [createSupplierError, updateSupplierError, deleteSupplierError, createOrderError, receiveStockError, updateStatusError, dispatch]);
  
  const resetSupplierForm = () => {
    setSupplierForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      taxNumber: '',
      discount: '',
      currency: 'USD'
    });
  };
  
  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      case 'Pending': return 'text-orange-600 bg-orange-100';
      case 'Partially Received': return 'text-blue-600 bg-blue-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getStatusText = (status) => {
    switch(status) {
      case 'Delivered': return t.delivered;
      case 'Processing': return t.processing;
      case 'Pending': return t.pending;
      case 'Partially Received': return t.partiallyReceived;
      case 'Cancelled': return t.cancelled;
      default: return status;
    }
  };
  
  const handleAddSupplier = () => {
    if (!supplierForm.name || !supplierForm.email) {
      toast.error(t.fillRequiredFields);
      return;
    }
    dispatch(createSupplierAction(supplierForm));
  };
  
  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setSupplierForm({
      name: supplier.name,
      company: supplier.company || '',
      email: supplier.email,
      phone: supplier.phone || '',
      address: supplier.address || '',
      taxNumber: supplier.taxNumber || '',
      discount: supplier.discount?.toString() || '',
      currency: supplier.currency || 'USD'
    });
    setShowEditSupplierModal(true);
  };
  
  const handleUpdateSupplier = () => {
    if (!supplierForm.name || !supplierForm.email) {
      toast.error(t.fillRequiredFields);
      return;
    }
    dispatch(updateSupplierAction(selectedSupplier.id, supplierForm));
  };
  
  const handleDeleteClick = (supplier) => {
    setSupplierToDelete(supplier);
    setShowDeleteSupplierModal(true);
  };
  
  const confirmDeleteSupplier = () => {
    if (supplierToDelete) {
      dispatch(deleteSupplierAction(supplierToDelete.id));
    }
  };
  
  const addOrderItem = () => {
    if (!orderItemForm.productId || !orderItemForm.quantity || !orderItemForm.unitPrice || !orderItemForm.warehouseId) {
      toast.error(t.fillRequiredFields);
      return;
    }
    
    const product = products.find(p => p.id === orderItemForm.productId);
    if (!product) return;
    
    setOrderForm({
      ...orderForm,
      items: [...orderForm.items, {
        id: Date.now(),
        productId: product.id,
        sku: product.sku,
        productName: product.name,
        quantity: parseInt(orderItemForm.quantity),
        unitPrice: parseFloat(orderItemForm.unitPrice),
        warehouseId: orderItemForm.warehouseId,
        expectedDeliveryDate: orderItemForm.expectedDeliveryDate,
        total: parseInt(orderItemForm.quantity) * parseFloat(orderItemForm.unitPrice)
      }]
    });
    
    setOrderItemForm({
      productId: '',
      quantity: 1,
      unitPrice: 0,
      warehouseId: '',
      expectedDeliveryDate: ''
    });
    setShowProductSelector(false);
  };
  
  const removeOrderItem = (itemId) => {
    const newItems = orderForm.items.filter(item => item.id !== itemId);
    setOrderForm({ ...orderForm, items: newItems });
  };
  
  const handleAddOrder = () => {
    if (!orderForm.supplierId || orderForm.items.length === 0) {
      toast.error(t.selectSupplierAndProducts);
      return;
    }
    
    const orderData = {
      supplierId: orderForm.supplierId,
      orderDate: orderForm.orderDate,
      currency: orderForm.currency,
      discount: parseFloat(orderForm.discount) || 0,
      notes: orderForm.notes,
      items: orderForm.items.map(item => ({
        productId: item.productId,
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        warehouseId: item.warehouseId,
        expectedDeliveryDate: item.expectedDeliveryDate
      }))
    };
    
    dispatch(createPurchaseOrderAction(orderData));
  };
  
  const handleReceiveStock = (order) => {
    if (order.status === 'Cancelled') {
      toast.error(t.cannotReceiveCancelled);
      return;
    }
    setSelectedOrder(order);
    setShowReceiveStockModal(true);
  };
  
  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setStatusUpdateForm({
      status: order.status,
      notes: ''
    });
    setShowUpdateStatusModal(true);
  };
  
  const handleSubmitStatusUpdate = () => {
    if (!statusUpdateForm.status) {
      toast.error(t.fillRequiredFields);
      return;
    }
    dispatch(updateOrderStatusAction(selectedOrder.id, statusUpdateForm.status));
  };
  
  const handleSubmitReceiveStock = () => {
    dispatch(receiveStockAction(selectedOrder.id));
  };
  
  const handleExport = () => {
    const data = activeTab === 'suppliers' ? suppliers : orders;
    const headers = activeTab === 'suppliers' 
      ? ['Name', 'Company', 'Email', 'Phone', 'Currency', 'Discount %', 'Total Purchases', 'Status']
      : ['Order #', 'Supplier', 'Date', 'Currency', 'Status', 'Total', 'Items Count'];
    
    const csvRows = [headers.join(',')];
    
    data.forEach(item => {
      if (activeTab === 'suppliers') {
        const row = [item.name, item.company, item.email, item.phone, item.currency, item.discount, item.totalPurchases, item.status];
        csvRows.push(row.join(','));
      } else {
        const row = [item.orderNumber, item.supplierName, item.orderDate, item.currency, item.status, item.totalAmount, item.items?.length || 0];
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
  
  // Calculate stats by currency
  const calculateCurrencyStats = () => {
    const currencyTotals = {};
    
    (orders || []).forEach(order => {
      if (!currencyTotals[order.currency]) {
        currencyTotals[order.currency] = {
          total: 0,
          count: 0,
          symbol: getCurrencySymbol(order.currency)
        };
      }
      currencyTotals[order.currency].total += order.totalAmount || 0;
      currencyTotals[order.currency].count++;
    });
    
    return currencyTotals;
  };
  
  // Filter suppliers and orders
  const filteredSuppliers = (suppliers || []).filter(supplier =>
    supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredOrders = (orders || []).filter(order =>
    order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.supplierName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((activeTab === 'suppliers' ? filteredSuppliers.length : filteredOrders.length) / itemsPerPage);
  
  const calculateOrderTotal = () => {
    const subtotal = orderForm.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const discountAmount = subtotal * (parseFloat(orderForm.discount) / 100);
    return subtotal - discountAmount;
  };

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
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button 
              onClick={() => navigate('/dashboard')}
              className={`flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
              <span>{t.backToDashboard}</span>
            </button>
            <div className="h-8 w-px bg-gray-300"></div>
            <div>
              <h1 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : ''}`}>{t.purchaseManagement}</h1>
              <p className={`text-sm text-gray-500 mt-1 ${isRTL ? 'text-right' : ''}`}>{t.purchaseDesc}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button onClick={handleExport} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Download size={16} />
              {t.export}
            </button>
            <button
              onClick={() => activeTab === 'suppliers' ? setShowAddSupplierModal(true) : setShowAddOrderModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg hover:shadow-lg flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              {activeTab === 'suppliers' ? t.addSupplier : t.createOrder}
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b">
            <button
              onClick={() => { setActiveTab('suppliers'); setCurrentPage(1); setSearchTerm(''); }}
              className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'suppliers' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'} ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Truck size={16} className={`inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.suppliers}
            </button>
            <button
              onClick={() => { setActiveTab('orders'); setCurrentPage(1); setSearchTerm(''); }}
              className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'orders' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'} ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <FileText size={16} className={`inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.purchaseOrders}
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
            <input
              type="text"
              placeholder={activeTab === 'suppliers' ? t.searchSuppliers : t.searchOrders}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500`}
            />
          </div>
        </div>
        
        {/* Stats Cards for Suppliers */}
        {activeTab === 'suppliers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.totalSuppliers}</p>
                  <p className="text-2xl font-bold text-gray-900">{supplierStats?.totalSuppliers || 0}</p>
                </div>
                <Users size={24} className="text-blue-600 opacity-50" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.activeSuppliers}</p>
                  <p className="text-2xl font-bold text-green-600">{supplierStats?.activeSuppliers || 0}</p>
                </div>
                <CheckCircle size={24} className="text-green-600 opacity-50" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.totalPurchases}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {getCurrencySymbol('USD')}{(supplierStats?.totalPurchases || 0).toLocaleString()}
                  </p>
                  <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.usdEquivalent}</p>
                </div>
                <TrendingUp size={24} className="text-purple-600 opacity-50" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.outstandingBalance}</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {getCurrencySymbol('USD')}{(supplierStats?.outstandingBalance || 0).toLocaleString()}
                  </p>
                  <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.usdEquivalent}</p>
                </div>
                <AlertTriangle size={24} className="text-orange-600 opacity-50" />
              </div>
            </div>
          </div>
        )}
        
        {/* Stats Cards for Orders */}
        {activeTab === 'orders' && (
          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.totalOrders}</p>
                    <p className="text-2xl font-bold text-gray-900">{orderStats?.totalOrders || 0}</p>
                  </div>
                  <ShoppingCart size={24} className="text-blue-600 opacity-50" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.deliveredOrders}</p>
                    <p className="text-2xl font-bold text-green-600">{orderStats?.deliveredOrders || 0}</p>
                  </div>
                  <CheckCircle size={24} className="text-green-600 opacity-50" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.processingOrders}</p>
                    <p className="text-2xl font-bold text-yellow-600">{orderStats?.processingOrders || 0}</p>
                  </div>
                  <Clock size={24} className="text-yellow-600 opacity-50" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <h3 className={`text-sm font-medium text-gray-700 mb-3 ${isRTL ? 'text-right' : ''}`}>{t.totalByCurrency}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.entries(calculateCurrencyStats()).map(([currency, data]) => (
                  <div key={currency} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{data.symbol}</div>
                    <div className="text-lg font-semibold text-gray-800">{data.total.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{currency} ({data.count} {t.ordersCount})</div>
                  </div>
                ))}
                {Object.keys(calculateCurrencyStats()).length === 0 && (
                  <div className={`col-span-full text-center text-gray-500 py-4 ${isRTL ? 'text-right' : ''}`}>
                    No orders found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Suppliers Table */}
        {activeTab === 'suppliers' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className={isRTL ? 'text-right' : 'text-left'}>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.supplier}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.company}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.contact}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-center">{t.currency}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-right">{t.discount}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-right">{t.totalPurchasesTable}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.status}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-right">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {currentSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div>
                        <p className={`text-sm font-medium text-gray-900 ${isRTL ? 'text-right' : ''}`}>{supplier.name}</p>
                        <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{supplier.email}</p>
                      </div>
                    </td>
                    <td className={`px-6 py-3 text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>{supplier.company}</td>
                    <td className="px-6 py-3">
                      <div>
                        <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>{supplier.phone}</p>
                        <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{supplier.address}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className="text-sm font-medium">{getCurrencySymbol(supplier.currency)} {supplier.currency}</span>
                    </td>
                    <td className={`px-6 py-3 text-sm text-right ${isRTL ? 'text-right' : ''}`}>{supplier.discount}%</td>
                    <td className={`px-6 py-3 text-sm text-right ${isRTL ? 'text-right' : ''}`}>
                      {getCurrencySymbol(supplier.currency)}{(supplier.totalPurchases || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">{supplier.status}</span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className={`flex items-center justify-end gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button onClick={() => handleEditSupplier(supplier)} className="p-1 hover:bg-gray-100 rounded">
                          <Edit2 size={14} className="text-blue-600" />
                        </button>
                        <button onClick={() => handleDeleteClick(supplier)} className="p-1 hover:bg-gray-100 rounded">
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
        
        {/* Purchase Orders Table */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className={isRTL ? 'text-right' : 'text-left'}>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.orderNumber}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.supplierName}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.orderDate}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-center">{t.currency}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-right">{t.total}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">{t.status}</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-right">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" 
                    onClick={() => { setSelectedOrder(order); setShowViewOrderModal(true); }}
                  >
                    <td className={`px-6 py-3 text-sm font-medium text-gray-900 ${isRTL ? 'text-right' : ''}`}>{order.orderNumber}</td>
                    <td className={`px-6 py-3 text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>{order.supplierName}</td>
                    <td className={`px-6 py-3 text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>{order.orderDate}</td>
                    <td className="px-6 py-3 text-center text-sm font-medium">{getCurrencySymbol(order.currency)} {order.currency}</td>
                    <td className={`px-6 py-3 text-sm text-right font-medium ${isRTL ? 'text-right' : ''}`}>
                      {getCurrencySymbol(order.currency)}{(order.totalAmount || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className={`flex items-center justify-end gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleUpdateStatus(order); }} 
                          className="p-1 hover:bg-gray-100 rounded"
                          title={t.updateStatus}
                        >
                          <Edit2 size={14} className="text-blue-600" />
                        </button>
                        {(order.status === 'Processing' || order.status === 'Partially Received') && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleReceiveStock(order); }} 
                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                          >
                            {t.receiveStockBtn}
                          </button>
                        )}
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
              {t.showing} {indexOfFirstItem + 1} {t.to} {Math.min(indexOfLastItem, (activeTab === 'suppliers' ? filteredSuppliers.length : filteredOrders.length))} {t.of} {(activeTab === 'suppliers' ? filteredSuppliers.length : filteredOrders.length)} {t.items}
            </p>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50">
                {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
              <span className="px-4 py-2 border rounded-lg bg-gray-50">{t.page} {currentPage} {t.of} {totalPages}</span>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50">
                {isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Supplier Modal */}
      {showAddSupplierModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.addNewSupplier}</h2>
              <button onClick={() => setShowAddSupplierModal(false)} className="hover:bg-gray-100 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.supplierName}</label>
                  <input type="text" value={supplierForm.name} onChange={(e) => setSupplierForm({...supplierForm, name: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.companyName}</label>
                  <input type="text" value={supplierForm.company} onChange={(e) => setSupplierForm({...supplierForm, company: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.email}</label>
                  <input type="email" value={supplierForm.email} onChange={(e) => setSupplierForm({...supplierForm, email: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.phone}</label>
                  <input type="tel" value={supplierForm.phone} onChange={(e) => setSupplierForm({...supplierForm, phone: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.address}</label>
                  <textarea value={supplierForm.address} onChange={(e) => setSupplierForm({...supplierForm, address: e.target.value})} rows="2" className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.taxNumber}</label>
                  <input type="text" value={supplierForm.taxNumber} onChange={(e) => setSupplierForm({...supplierForm, taxNumber: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.discountPercent}</label>
                  <input type="number" value={supplierForm.discount} onChange={(e) => setSupplierForm({...supplierForm, discount: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.currencyLabel}</label>
                  <select value={supplierForm.currency} onChange={(e) => setSupplierForm({...supplierForm, currency: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}>
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name} ({currency.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => setShowAddSupplierModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50">{t.cancel}</button>
              <button onClick={handleAddSupplier} disabled={createSupplierLoading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
                {createSupplierLoading ? <RefreshCw size={16} className="animate-spin" /> : t.addSupplierBtn}
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Edit Supplier Modal */}
      {showEditSupplierModal && selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.editSupplier}</h2>
              <button onClick={() => setShowEditSupplierModal(false)} className="hover:bg-gray-100 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.supplierName}</label>
                  <input type="text" value={supplierForm.name} onChange={(e) => setSupplierForm({...supplierForm, name: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.companyName}</label>
                  <input type="text" value={supplierForm.company} onChange={(e) => setSupplierForm({...supplierForm, company: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.email}</label>
                  <input type="email" value={supplierForm.email} onChange={(e) => setSupplierForm({...supplierForm, email: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.phone}</label>
                  <input type="tel" value={supplierForm.phone} onChange={(e) => setSupplierForm({...supplierForm, phone: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.address}</label>
                  <textarea value={supplierForm.address} onChange={(e) => setSupplierForm({...supplierForm, address: e.target.value})} rows="2" className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.taxNumber}</label>
                  <input type="text" value={supplierForm.taxNumber} onChange={(e) => setSupplierForm({...supplierForm, taxNumber: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.discountPercent}</label>
                  <input type="number" value={supplierForm.discount} onChange={(e) => setSupplierForm({...supplierForm, discount: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.currencyLabel}</label>
                  <select value={supplierForm.currency} onChange={(e) => setSupplierForm({...supplierForm, currency: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}>
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name} ({currency.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => setShowEditSupplierModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50">{t.cancel}</button>
              <button onClick={handleUpdateSupplier} disabled={updateSupplierLoading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
                {updateSupplierLoading ? <RefreshCw size={16} className="animate-spin" /> : t.updateSupplierBtn}
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Delete Supplier Modal */}
      {showDeleteSupplierModal && supplierToDelete && (
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
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{t.deleteSupplier}</h3>
              <p className="text-center text-gray-600 mb-6">
                {t.deleteSupplierConfirm} <span className="font-semibold">{supplierToDelete.name}</span>?
              </p>
              <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button onClick={() => setShowDeleteSupplierModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">{t.cancel}</button>
                <button onClick={confirmDeleteSupplier} disabled={deleteSupplierLoading} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
                  {deleteSupplierLoading ? <RefreshCw size={16} className="animate-spin mx-auto" /> : t.deleteSupplierBtn}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Create Purchase Order Modal */}
      {showAddOrderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
          >
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.createPurchaseOrder}</h2>
              <button onClick={() => setShowAddOrderModal(false)} className="hover:bg-gray-100 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {/* Order Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.selectSupplier} *</label>
                  <select 
                    value={orderForm.supplierId} 
                    onChange={(e) => setOrderForm({...orderForm, supplierId: e.target.value})} 
                    className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  >
                    <option value="">{t.selectSupplier}</option>
                    {(suppliers || []).map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} {s.company ? `- ${s.company}` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.orderDateLabel}</label>
                  <input type="date" value={orderForm.orderDate} onChange={(e) => setOrderForm({...orderForm, orderDate: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.currencyLabel}</label>
                  <select value={orderForm.currency} onChange={(e) => setOrderForm({...orderForm, currency: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}>
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name} ({currency.symbol})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.discountLabel}</label>
                  <input type="number" value={orderForm.discount} onChange={(e) => setOrderForm({...orderForm, discount: e.target.value})} className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.notes}</label>
                  <textarea value={orderForm.notes} onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})} rows="2" className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} />
                </div>
              </div>
              
              {/* Order Items */}
              <div className="border-t pt-4">
                <div className={`flex justify-between items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h3 className="font-semibold text-gray-900">{t.orderItems}</h3>
                  <button onClick={() => setShowProductSelector(true)} className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center gap-1">
                    <Plus size={14} />
                    {t.addProduct}
                  </button>
                </div>
                
                {orderForm.items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                    <Package size={48} className="mx-auto mb-2 opacity-50" />
                    <p>{t.noItemsYet}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr className={isRTL ? 'text-right' : 'text-left'}>
                          <th className="p-2 text-xs font-medium text-gray-500">{t.product}</th>
                          <th className="p-2 text-xs font-medium text-gray-500 text-right">{t.sku}</th>
                          <th className="p-2 text-xs font-medium text-gray-500 text-right">{t.qty}</th>
                          <th className="p-2 text-xs font-medium text-gray-500 text-right">{t.unitPrice}</th>
                          <th className="p-2 text-xs font-medium text-gray-500">{t.warehouse}</th>
                          <th className="p-2 text-xs font-medium text-gray-500">{t.expectedDeliveryCol}</th>
                          <th className="p-2 text-xs font-medium text-gray-500 text-right">{t.total}</th>
                          <th className="p-2 text-xs font-medium text-gray-500 text-center">{t.action}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderForm.items.map((item) => {
                          const warehouse = warehouses.find(w => w.id === item.warehouseId);
                          return (
                            <tr key={item.id} className="border-b">
                              <td className={`p-2 text-sm ${isRTL ? 'text-right' : ''}`}>{item.productName}</td>
                              <td className={`p-2 text-sm text-right ${isRTL ? 'text-right' : ''}`}>{item.sku}</td>
                              <td className={`p-2 text-sm text-right ${isRTL ? 'text-right' : ''}`}>{item.quantity}</td>
                              <td className={`p-2 text-sm text-right ${isRTL ? 'text-right' : ''}`}>{getCurrencySymbol(orderForm.currency)} {item.unitPrice}</td>
                              <td className={`p-2 text-sm ${isRTL ? 'text-right' : ''}`}>{warehouse?.name || t.notAssigned}</td>
                              <td className={`p-2 text-sm ${isRTL ? 'text-right' : ''}`}>{item.expectedDeliveryDate || t.notSet}</td>
                              <td className={`p-2 text-sm text-right font-medium ${isRTL ? 'text-right' : ''}`}>{getCurrencySymbol(orderForm.currency)} {item.total}</td>
                              <td className="p-2 text-center">
                                <button onClick={() => removeOrderItem(item.id)} className="text-red-500 hover:text-red-700">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan="6" className={`p-2 font-bold ${isRTL ? 'text-right' : 'text-right'}`}>{t.subTotal}:</td>
                          <td className={`p-2 text-right font-bold ${isRTL ? 'text-right' : ''}`}>
                            {getCurrencySymbol(orderForm.currency)} {orderForm.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                          </td>
                          <td></td>
                        </tr>
                        {orderForm.discount > 0 && (
                          <tr>
                            <td colSpan="6" className={`p-2 text-green-600 ${isRTL ? 'text-right' : 'text-right'}`}>{t.discountLabel} ({orderForm.discount}%):</td>
                            <td className={`p-2 text-right text-green-600 ${isRTL ? 'text-right' : ''}`}>
                              -{getCurrencySymbol(orderForm.currency)} {(orderForm.items.reduce((sum, item) => sum + item.total, 0) * (orderForm.discount / 100)).toFixed(2)}
                            </td>
                            <td></td>
                          </tr>
                        )}
                        <tr>
                          <td colSpan="6" className={`p-2 font-bold text-lg ${isRTL ? 'text-right' : 'text-right'}`}>{t.totalAmount}:</td>
                          <td className={`p-2 text-right font-bold text-lg text-green-600 ${isRTL ? 'text-right' : ''}`}>
                            {getCurrencySymbol(orderForm.currency)} {calculateOrderTotal().toFixed(2)}
                          </td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => setShowAddOrderModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50">{t.cancel}</button>
              <button onClick={handleAddOrder} disabled={createOrderLoading || orderForm.items.length === 0} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
                {createOrderLoading ? <RefreshCw size={16} className="animate-spin" /> : t.createOrderBtn}
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Product Selector Modal */}
      {showProductSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className={`p-4 border-b flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-lg font-bold ${isRTL ? 'text-right' : ''}`}>{t.addProductToOrder}</h2>
              <button onClick={() => setShowProductSelector(false)} className="hover:bg-gray-100 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.product}</label>
                  <select
                    value={orderItemForm.productId}
                    onChange={(e) => {
                      const product = products.find(p => p.id === e.target.value);
                      setOrderItemForm({
                        ...orderItemForm,
                        productId: e.target.value,
                        unitPrice: product?.purchasePrice || product?.unitPrice || 0
                      });
                    }}
                    className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  >
                    <option value="">{t.selectProduct}</option>
                    {(products || []).map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {product.sku} ({t.stock}: {product.currentStock}) - {getCurrencySymbol(product.currency)} {product.unitPrice}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.quantity}</label>
                  <input
                    type="number"
                    value={orderItemForm.quantity}
                    onChange={(e) => setOrderItemForm({...orderItemForm, quantity: parseInt(e.target.value) || 1})}
                    className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    min="1"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.unitPrice}</label>
                  <input
                    type="number"
                    value={orderItemForm.unitPrice}
                    onChange={(e) => setOrderItemForm({...orderItemForm, unitPrice: parseFloat(e.target.value) || 0})}
                    className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    step="0.01"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.warehouse}</label>
                  <select
                    value={orderItemForm.warehouseId}
                    onChange={(e) => setOrderItemForm({...orderItemForm, warehouseId: e.target.value})}
                    className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  >
                    <option value="">{t.selectWarehouse}</option>
                    {(warehouses || []).map(w => (
                      <option key={w.id} value={w.id}>{w.name} - {w.location} ({t.stock}: {w.currentStock}/{w.capacity})</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.expectedDelivery}</label>
                  <input
                    type="date"
                    value={orderItemForm.expectedDeliveryDate}
                    onChange={(e) => setOrderItemForm({...orderItemForm, expectedDeliveryDate: e.target.value})}
                    className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
              </div>
              <div className={`flex gap-2 mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button onClick={() => setShowProductSelector(false)} className="flex-1 px-4 py-2 border rounded hover:bg-gray-50">{t.cancel}</button>
                <button onClick={addOrderItem} className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">{t.addToOrder}</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Receive Stock Modal */}
      {showReceiveStockModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.receiveStock} - {selectedOrder.orderNumber}</h2>
              <button onClick={() => setShowReceiveStockModal(false)} className="hover:bg-gray-100 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className={`text-sm text-blue-800 ${isRTL ? 'text-right' : ''}`}>
                  {t.receiveStockInfo}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className={`font-medium text-sm mb-3 ${isRTL ? 'text-right' : ''}`}>{t.itemsToReceive}</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedOrder.items.map((item, idx) => {
                    const warehouse = warehouses?.find(w => w.id === item.warehouseId);
                    return (
                      <div key={idx} className="border rounded-lg p-3 bg-gray-50">
                        <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div>
                            <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{item.productName}</p>
                            <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.sku}: {item.sku}</p>
                          </div>
                          <span className="text-sm font-semibold text-green-600">
                            {getCurrencySymbol(selectedOrder.currency)}{item.unitPrice} × {item.quantity}
                          </span>
                        </div>
                        <div className={`mt-2 grid grid-cols-2 gap-2 text-xs ${isRTL ? 'text-right' : ''}`}>
                          <div>
                            <span className="text-gray-500">{t.warehouse}:</span>
                            <p className="font-medium">{warehouse?.name || t.notSpecified || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">{t.expectedDelivery}:</span>
                            <p className="font-medium">{item.expectedDeliveryDate || t.notSet}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className={`flex justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm">{t.subTotal}:</span>
                    <span className="text-sm font-medium">
                      {getCurrencySymbol(selectedOrder.currency)}{selectedOrder.totalAmount}
                    </span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className={`flex justify-between mb-2 text-green-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm">{t.discountLabel} ({selectedOrder.discount}%):</span>
                      <span className="text-sm">
                        -{getCurrencySymbol(selectedOrder.currency)}{(selectedOrder.totalAmount * selectedOrder.discount / 100).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className={`flex justify-between pt-2 border-t font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>{t.totalAmount}:</span>
                    <span className="text-green-600">
                      {getCurrencySymbol(selectedOrder.currency)}{selectedOrder.totalAmount}
                    </span>
                  </div>
                </div>
                
                <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button onClick={() => setShowReceiveStockModal(false)} className="flex-1 px-4 py-2 border rounded hover:bg-gray-50">{t.cancel}</button>
                  <button onClick={handleSubmitReceiveStock} disabled={receiveStockLoading} className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2">
                    {receiveStockLoading ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        {t.processingText}
                      </>
                    ) : (
                      t.confirmReceive
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Update Status Modal */}
      {showUpdateStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-md"
          >
            <div className={`p-4 border-b flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-lg font-bold ${isRTL ? 'text-right' : ''}`}>{t.updateOrderStatus}</h2>
              <button onClick={() => setShowUpdateStatusModal(false)} className="hover:bg-gray-100 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <p className={`text-sm text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>{t.orderDetails}: {selectedOrder.orderNumber}</p>
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.statusLabel}</label>
                <select
                  value={statusUpdateForm.status}
                  onChange={(e) => setStatusUpdateForm({...statusUpdateForm, status: e.target.value})}
                  className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                >
                  <option value="Pending">{t.pending}</option>
                  <option value="Processing">{t.processing}</option>
                  <option value="Partially Received">{t.partiallyReceived}</option>
                  <option value="Delivered">{t.delivered}</option>
                  <option value="Cancelled">{t.cancelled}</option>
                </select>
              </div>
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.notesOptional}</label>
                <textarea
                  value={statusUpdateForm.notes}
                  onChange={(e) => setStatusUpdateForm({...statusUpdateForm, notes: e.target.value})}
                  rows="3"
                  className={`w-full p-2 border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                  placeholder={t.addNotesPlaceholder}
                />
              </div>
              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button onClick={() => setShowUpdateStatusModal(false)} className="flex-1 px-4 py-2 border rounded hover:bg-gray-50">{t.cancel}</button>
                <button onClick={handleSubmitStatusUpdate} disabled={updateStatusLoading} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                  {updateStatusLoading ? <RefreshCw size={16} className="animate-spin mx-auto" /> : t.updateStatusBtn}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* View Order Modal */}
      {showViewOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
          >
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.orderDetails}</h2>
                <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{selectedOrder.orderNumber}</p>
              </div>
              <button onClick={() => setShowViewOrderModal(false)} className="hover:bg-gray-100 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div>
                  <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.supplierName}</p>
                  <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{selectedOrder.supplierName}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.orderDate}</p>
                  <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{selectedOrder.orderDate}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.currency}</p>
                  <p className={`font-medium ${isRTL ? 'text-right' : ''}`}>{getCurrencySymbol(selectedOrder.currency)} {selectedOrder.currency}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.status}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                <div>
                  <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.total}</p>
                  <p className={`font-bold text-green-600 ${isRTL ? 'text-right' : ''}`}>{getCurrencySymbol(selectedOrder.currency)} {(selectedOrder.totalAmount || 0).toFixed(2)}</p>
                </div>
              </div>
              
              <h3 className={`font-semibold mb-3 ${isRTL ? 'text-right' : ''}`}>{t.orderItems}</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className={isRTL ? 'text-right' : 'text-left'}>
                      <th className="p-2">{t.product}</th>
                      <th className="p-2 text-right">{t.sku}</th>
                      <th className="p-2 text-right">{t.qty}</th>
                      <th className="p-2 text-right">{t.unitPrice}</th>
                      <th className="p-2">{t.warehouse}</th>
                      <th className="p-2">{t.expectedDeliveryCol}</th>
                      <th className="p-2 text-right">{t.total}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item, idx) => {
                      const warehouse = warehouses.find(w => w.id === item.warehouseId);
                      return (
                        <tr key={idx} className="border-b">
                          <td className={`p-2 ${isRTL ? 'text-right' : ''}`}>{item.productName}</td>
                          <td className={`p-2 text-right ${isRTL ? 'text-right' : ''}`}>{item.sku}</td>
                          <td className={`p-2 text-right ${isRTL ? 'text-right' : ''}`}>{item.quantity}</td>
                          <td className={`p-2 text-right ${isRTL ? 'text-right' : ''}`}>{getCurrencySymbol(selectedOrder.currency)} {item.unitPrice}</td>
                          <td className={`p-2 ${isRTL ? 'text-right' : ''}`}>{warehouse?.name || item.warehouseId}</td>
                          <td className={`p-2 ${isRTL ? 'text-right' : ''}`}>{item.expectedDeliveryDate || t.notSet}</td>
                          <td className={`p-2 text-right font-medium ${isRTL ? 'text-right' : ''}`}>{getCurrencySymbol(selectedOrder.currency)} {(item.quantity * item.unitPrice).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {selectedOrder.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className={`text-sm font-medium mb-1 ${isRTL ? 'text-right' : ''}`}>{t.notes}:</p>
                  <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>{selectedOrder.notes}</p>
                </div>
              )}
              
              <div className={`flex gap-2 justify-end mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => {
                    setShowViewOrderModal(false);
                    handleUpdateStatus(selectedOrder);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {t.updateStatusBtn}
                </button>
                <button onClick={() => setShowViewOrderModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50">{t.close}</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Purchases;