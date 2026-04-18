// src/modules/pos/POS.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, Plus, Minus, Trash2, Printer, CreditCard, 
  DollarSign, ShoppingCart, User, Camera, Warehouse,
  QrCode, Percent, CheckCircle, ArrowLeft, Keyboard,
  ScanLine, ChevronDown, ChevronUp, AlertCircle, Loader
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllProductsAction } from '../../actions/productActions';
import { getAllWarehousesAction } from '../../actions/warehouseActions';
import { createSaleAction, clearErrors } from '../../actions/saleActions';

// Language Translations
const translations = {
  en: {
    // Header
    back: "Back",
    pointOfSale: "Point of Sale",
    shortcutsHint: "F2:New | F3:Search | F4:Barcode | F5:Scan | F9:Print",
    newSale: "New Sale",
    
    // Search & Barcode
    searchProducts: "Search products... (F3)",
    scanBarcode: "Scan or enter barcode... (F4)",
    
    // Cart
    cart: "Cart",
    items: "items",
    clear: "Clear",
    cartEmpty: "Cart is empty",
    scanToAdd: "Scan or search products to add",
    
    // Product Card
    stock: "Stock",
    warehouse: "Warehouse",
    warehousesCount: "warehouse(s)",
    
    // Cart Item
    discountPercent: "Disc%",
    
    // Summary
    subtotal: "Subtotal",
    discount: "Discount",
    total: "Total",
    billDiscount: "Bill Discount",
    itemDiscount: "Item Discount",
    customer: "Customer",
    qty: "Qty",
    unitPrice: "Unit Price",
    paymentMethod: "Payment Method",
    from: "from",
    in: "in",
    
    // Payment
    cash: "Cash",
    card: "Card",
    addCustomer: "Add Customer (Ctrl+C)",
    payNow: "Pay Now",
    processing: "Processing...",
    
    // Customer Modal
    customerInformation: "Customer Information",
    nameRequired: "Name *",
    phone: "Phone",
    email: "Email",
    saveCustomer: "Save Customer",
    cancel: "Cancel",
    customerAdded: "Customer added",
    nameRequiredError: "Name required",
    
    // Clear Cart Modal
    clearCartTitle: "Clear Cart",
    clearCartMessage: "Are you sure you want to clear all items from your cart? This action cannot be undone.",
    yesClearCart: "Yes, Clear Cart",
    
    // Keyboard Shortcuts Modal
    keyboardShortcuts: "Keyboard Shortcuts",
    close: "Close",
    newSaleShortcut: "New Sale",
    searchProductsShortcut: "Search Products",
    barcodeInputShortcut: "Barcode Input",
    openScannerShortcut: "Open Scanner",
    printReceiptShortcut: "Print Receipt",
    addDiscountShortcut: "Add Discount",
    addCustomerShortcut: "Add Customer",
    clearSearchShortcut: "Clear Search",
    
    // Scanner Modal
    scanBarcodeTitle: "Scan Barcode",
    cameraAccessRequired: "Camera access required",
    tryAgain: "Try Again",
    startingCamera: "Starting camera...",
    orEnterManually: "Or enter barcode manually",
    enterBarcode: "Enter barcode number",
    add: "Add",
    
    // Success/Error Messages
    productAdded: "added",
    productAddedViaScanner: "added via scanner",
    productNotFound: "Product not found!",
    noStockAvailable: "has no stock available!",
    notEnoughStock: "Not enough stock in",
    available: "Available",
    warehouseChanged: "Warehouse changed to",
    cartCleared: "Cart cleared",
    saleCompleted: "Sale completed successfully!",
    paymentSuccessful: "Payment successful! PDF downloaded.",
    paymentFailed: "Payment failed! Please try again.",
    noStockInWarehouse: "No stock available in",
    onlyUnitsAvailable: "Only {0} units available in",
    
    // Other
    loading: "Loading POS...",
    unknownWarehouse: "Unknown",
    notSpecified: "Not specified"
  },
  ur: {
    // Header
    back: "واپس",
    pointOfSale: "نقطہ فروخت",
    shortcutsHint: "F2:نیا | F3:تلاش | F4:بارکوڈ | F5:اسکین | F9:پرنٹ",
    newSale: "نیا سیل",
    
    // Search & Barcode
    searchProducts: "مصنوعات تلاش کریں... (F3)",
    scanBarcode: "بارکوڈ اسکین یا درج کریں... (F4)",
    
    // Cart
    cart: "کارٹ",
    items: "اشیاء",
    clear: "صاف کریں",
    cartEmpty: "کارٹ خالی ہے",
    scanToAdd: "شامل کرنے کے لیے اسکین یا تلاش کریں",
    
    // Product Card
    stock: "اسٹاک",
    warehouse: "گودام",
    warehousesCount: "گودام(ہائے)",
    
    // Cart Item
    discountPercent: "چھوٹ%",
    
    // Summary
    subtotal: "ذیلی کل",
    discount: "چھوٹ",
    total: "کل",
    billDiscount: "بل چھوٹ",
    itemDiscount: "آئٹم چھوٹ",
    customer: "گاہک",
    qty: "مقدار",
    unitPrice: "فی یونٹ قیمت",
    paymentMethod: "ادائیگی کا طریقہ",
    from: "سے",
    in: "میں",
    
    // Payment
    cash: "نقد",
    card: "کارڈ",
    addCustomer: "گاہک شامل کریں (Ctrl+C)",
    payNow: "ادا کریں",
    processing: "پروسیسنگ...",
    
    // Customer Modal
    customerInformation: "گاہک کی معلومات",
    nameRequired: "نام *",
    phone: "فون",
    email: "ای میل",
    saveCustomer: "گاہک محفوظ کریں",
    cancel: "منسوخ کریں",
    customerAdded: "گاہک شامل ہو گیا",
    nameRequiredError: "نام درکار ہے",
    
    // Clear Cart Modal
    clearCartTitle: "کارٹ صاف کریں",
    clearCartMessage: "کیا آپ واقعی اپنے کارٹ کی تمام اشیاء کو صاف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں جا سکتا۔",
    yesClearCart: "جی ہاں، کارٹ صاف کریں",
    
    // Keyboard Shortcuts Modal
    keyboardShortcuts: "کی بورڈ شارٹ کٹس",
    close: "بند کریں",
    newSaleShortcut: "نیا سیل",
    searchProductsShortcut: "مصنوعات تلاش کریں",
    barcodeInputShortcut: "بارکوڈ ان پٹ",
    openScannerShortcut: "اسکینر کھولیں",
    printReceiptShortcut: "رسید پرنٹ کریں",
    addDiscountShortcut: "چھوٹ شامل کریں",
    addCustomerShortcut: "گاہک شامل کریں",
    clearSearchShortcut: "تلاش صاف کریں",
    
    // Scanner Modal
    scanBarcodeTitle: "بارکوڈ اسکین کریں",
    cameraAccessRequired: "کیمرے تک رسائی درکار ہے",
    tryAgain: "دوبارہ کوشش کریں",
    startingCamera: "کیمرہ شروع ہو رہا ہے...",
    orEnterManually: "یا بارکوڈ دستی طور پر درج کریں",
    enterBarcode: "بارکوڈ نمبر درج کریں",
    add: "شامل کریں",
    
    // Success/Error Messages
    productAdded: "شامل ہو گئی",
    productAddedViaScanner: "اسکینر کے ذریعے شامل ہو گئی",
    productNotFound: "پروڈکٹ نہیں ملی!",
    noStockAvailable: "کا کوئی اسٹاک دستیاب نہیں ہے!",
    notEnoughStock: "میں کافی اسٹاک نہیں ہے",
    available: "دستیاب",
    warehouseChanged: "گودام تبدیل کر دیا گیا",
    cartCleared: "کارٹ صاف ہو گیا",
    saleCompleted: "سیل کامیابی سے مکمل ہو گیا!",
    paymentSuccessful: "ادائیگی کامیاب! PDF ڈاؤن لوڈ ہو گئی۔",
    paymentFailed: "ادائیگی ناکام! براہ کرم دوبارہ کوشش کریں۔",
    noStockInWarehouse: "میں کوئی اسٹاک دستیاب نہیں ہے",
    onlyUnitsAvailable: "میں صرف {0} یونٹ دستیاب ہیں",
    
    // Other
    loading: "POS لوڈ ہو رہا ہے...",
    unknownWarehouse: "نامعلوم گودام",
    notSpecified: "واضح نہیں"
  },
  ps: {
    // Header
    back: "شاته",
    pointOfSale: "د پلور ځای",
    shortcutsHint: "F2:نوی | F3:لټون | F4:بارکوډ | F5:سکین | F9:چاپ",
    newSale: "نوی پلور",
    
    // Search & Barcode
    searchProducts: "محصولات وپلټئ... (F3)",
    scanBarcode: "بارکوډ سکین یا دننه کړئ... (F4)",
    
    // Cart
    cart: "کارټ",
    items: "توکي",
    clear: "پاک کړئ",
    cartEmpty: "کارټ خالي دی",
    scanToAdd: "د اضافه کولو لپاره سکین یا لټون وکړئ",
    
    // Product Card
    stock: "ذخیره",
    warehouse: "ګودام",
    warehousesCount: "ګودام(ونه)",
    
    // Cart Item
    discountPercent: "تخفیف%",
    
    // Summary
    subtotal: "فرعي ټول",
    discount: "تخفیف",
    total: "ټول",
    billDiscount: "بل تخفیف",
    itemDiscount: "د توکي تخفیف",
    customer: "پیرودونکی",
    qty: "کمیت",
    unitPrice: "د واحد قیمت",
    paymentMethod: "د تادیې طریقه",
    from: "له",
    in: "کې",
    
    // Payment
    cash: "نقد",
    card: "کارډ",
    addCustomer: "پیرودونکی اضافه کړئ (Ctrl+C)",
    payNow: "ادا کړئ",
    processing: "پروسس کې دی...",
    
    // Customer Modal
    customerInformation: "د پیرودونکي معلومات",
    nameRequired: "نوم *",
    phone: "تلیفون",
    email: "بریښنالیک",
    saveCustomer: "پیرودونکی خوندي کړئ",
    cancel: "لغوه کړئ",
    customerAdded: "پیرودونکی اضافه شو",
    nameRequiredError: "نوم اړین دی",
    
    // Clear Cart Modal
    clearCartTitle: "کارټ پاک کړئ",
    clearCartMessage: "ایا تاسو واقعیا غواړئ خپل کارټ ټول توکي پاک کړئ؟ دا عمل بیرته نشي اخیستل کیدی.",
    yesClearCart: "هو، کارټ پاک کړئ",
    
    // Keyboard Shortcuts Modal
    keyboardShortcuts: "کی بورډ شارټ کټونه",
    close: "بند کړئ",
    newSaleShortcut: "نوی پلور",
    searchProductsShortcut: "محصولات وپلټئ",
    barcodeInputShortcut: "بارکوډ داخل کړئ",
    openScannerShortcut: "سکینر خلاص کړئ",
    printReceiptShortcut: "رسید چاپ کړئ",
    addDiscountShortcut: "تخفیف اضافه کړئ",
    addCustomerShortcut: "پیرودونکی اضافه کړئ",
    clearSearchShortcut: "لټون پاک کړئ",
    
    // Scanner Modal
    scanBarcodeTitle: "بارکوډ سکین کړئ",
    cameraAccessRequired: "کیمرې ته لاسرسی اړین دی",
    tryAgain: "بیا هڅه وکړئ",
    startingCamera: "کیمره پیل کیږي...",
    orEnterManually: "یا بارکوډ په لاسي ډول دننه کړئ",
    enterBarcode: "د بارکوډ شمیره دننه کړئ",
    add: "اضافه کړئ",
    
    // Success/Error Messages
    productAdded: "اضافه شو",
    productAddedViaScanner: "د سکینر له لارې اضافه شو",
    productNotFound: "محصول ونه موندل شو!",
    noStockAvailable: "هیڅ ذخیره شتون نلري!",
    notEnoughStock: "کافي ذخیره نشته په",
    available: "شته",
    warehouseChanged: "ګودام بدل شو",
    cartCleared: "کارټ پاک شو",
    saleCompleted: "پلور په بریالیتوب سره بشپړ شو!",
    paymentSuccessful: "ادا بریالۍ شوه! PDF ډاونلوډ شو.",
    paymentFailed: "ادا ناکامه شوه! مهرباني وکړئ بیا هڅه وکړئ.",
    noStockInWarehouse: "کې هیڅ ذخیره نشته",
    onlyUnitsAvailable: "کې یوازې {0} واحدونه شتون لري",
    
    // Other
    loading: "POS لوډ کېږي...",
    unknownWarehouse: "نامعلوم ګودام",
    notSpecified: "نه ټاکل شوی"
  },
  fa: {
    // Header
    back: "بازگشت",
    pointOfSale: "نقطه فروش",
    shortcutsHint: "F2:جدید | F3:جستجو | F4:بارکد | F5:اسکن | F9:چاپ",
    newSale: "فروش جدید",
    
    // Search & Barcode
    searchProducts: "جستجوی محصولات... (F3)",
    scanBarcode: "بارکد را اسکن یا وارد کنید... (F4)",
    
    // Cart
    cart: "سبد خرید",
    items: "آیتم",
    clear: "پاک کردن",
    cartEmpty: "سبد خرید خالی است",
    scanToAdd: "برای افزودن اسکن یا جستجو کنید",
    
    // Product Card
    stock: "موجودی",
    warehouse: "انبار",
    warehousesCount: "انبار(ها)",
    
    // Cart Item
    discountPercent: "تخفیف%",
    
    // Summary
    subtotal: "جمع جزئی",
    discount: "تخفیف",
    total: "مجموع",
    billDiscount: "تخفیف فاکتور",
    itemDiscount: "تخفیف آیتم",
    customer: "مشتری",
    qty: "تعداد",
    unitPrice: "قیمت واحد",
    paymentMethod: "روش پرداخت",
    from: "از",
    in: "در",
    
    // Payment
    cash: "نقدی",
    card: "کارت",
    addCustomer: "افزودن مشتری (Ctrl+C)",
    payNow: "پرداخت",
    processing: "در حال پردازش...",
    
    // Customer Modal
    customerInformation: "اطلاعات مشتری",
    nameRequired: "نام *",
    phone: "تلفن",
    email: "ایمیل",
    saveCustomer: "ذخیره مشتری",
    cancel: "لغو",
    customerAdded: "مشتری اضافه شد",
    nameRequiredError: "نام الزامی است",
    
    // Clear Cart Modal
    clearCartTitle: "پاک کردن سبد خرید",
    clearCartMessage: "آیا مطمئن هستید که می‌خواهید تمام آیتم‌های سبد خرید را پاک کنید؟ این عمل قابل بازگشت نیست.",
    yesClearCart: "بله، سبد خرید را پاک کن",
    
    // Keyboard Shortcuts Modal
    keyboardShortcuts: "میانبرهای صفحه کلید",
    close: "بستن",
    newSaleShortcut: "فروش جدید",
    searchProductsShortcut: "جستجوی محصولات",
    barcodeInputShortcut: "ورودی بارکد",
    openScannerShortcut: "باز کردن اسکنر",
    printReceiptShortcut: "چاپ رسید",
    addDiscountShortcut: "افزودن تخفیف",
    addCustomerShortcut: "افزودن مشتری",
    clearSearchShortcut: "پاک کردن جستجو",
    
    // Scanner Modal
    scanBarcodeTitle: "اسکن بارکد",
    cameraAccessRequired: "دسترسی به دوربین الزامی است",
    tryAgain: "تلاش مجدد",
    startingCamera: "راه‌اندازی دوربین...",
    orEnterManually: "یا بارکد را دستی وارد کنید",
    enterBarcode: "شماره بارکد را وارد کنید",
    add: "افزودن",
    
    // Success/Error Messages
    productAdded: "اضافه شد",
    productAddedViaScanner: "از طریق اسکنر اضافه شد",
    productNotFound: "محصول یافت نشد!",
    noStockAvailable: "موجودی در دسترس ندارد!",
    notEnoughStock: "موجودی کافی در",
    available: "موجود",
    warehouseChanged: "انبار تغییر یافت",
    cartCleared: "سبد خرید پاک شد",
    saleCompleted: "فروش با موفقیت انجام شد!",
    paymentSuccessful: "پرداخت موفق! PDF دانلود شد.",
    paymentFailed: "پرداخت ناموفق! لطفاً دوباره تلاش کنید.",
    noStockInWarehouse: "هیچ موجودی در",
    onlyUnitsAvailable: "فقط {0} واحد در {1} موجود است",
    
    // Other
    loading: "در حال بارگذاری POS...",
    unknownWarehouse: "انبار ناشناس",
    notSpecified: "مشخص نشده"
  }
};

// Currency helper functions
const getCurrencySymbol = (currencyCode) => {
  const currencies = {
    'USD': { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    'EUR': { symbol: '€', name: 'Euro', flag: '🇪🇺' },
    'GBP': { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    'PKR': { symbol: '₨', name: 'Pakistani Rupee', flag: '🇵🇰' },
    'AED': { symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
    'SAR': { symbol: 'ر.س', name: 'Saudi Riyal', flag: '🇸🇦' },
    'AFN': { symbol: '؋', name: 'Afghan Afghani', flag: '🇦🇫' }
  };
  return currencies[currencyCode] || { symbol: '$', name: 'US Dollar', flag: '🇺🇸' };
};

const formatPrice = (amount, currencyCode) => {
  const currency = getCurrencySymbol(currencyCode);
  return `${currency.symbol} ${amount.toLocaleString()}`;
};

// Scanner Modal Component
const ScannerModal = ({ onScan, onClose, t, isRTL }) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setScanning(true);
        }
      } catch (err) {
        setError(true);
        toast.error('Camera access denied');
      }
    };
    startScanner();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleManualAdd = () => {
    if (manualBarcode) {
      onScan(manualBarcode);
      setManualBarcode('');
      onClose();
    } else {
      toast.error(t.enterBarcode);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <button onClick={onClose} className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300">
          <X size={24} />
        </button>
        
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-gradient-to-r from-green-600 to-red-600 text-white">
            <h3 className={`text-lg font-bold flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <QrCode size={20} />
              {t.scanBarcodeTitle}
            </h3>
          </div>
          
          <div className="p-4">
            {error ? (
              <div className="text-center py-8">
                <AlertCircle size={48} className="mx-auto text-red-500 mb-3" />
                <p className="text-gray-600 mb-4">{t.cameraAccessRequired}</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-green-600 text-white rounded-lg">
                  {t.tryAgain}
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="bg-gray-900 rounded-lg overflow-hidden aspect-square">
                  <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline />
                  {!scanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p className="text-sm">{t.startingCamera}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className={`text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>{t.orEnterManually}</p>
              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="text"
                  placeholder={t.enterBarcode}
                  value={manualBarcode}
                  onChange={(e) => setManualBarcode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualAdd()}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 text-sm ${isRTL ? 'text-right' : ''}`}
                />
                <button onClick={handleManualAdd} className="px-4 py-2 bg-green-600 text-white rounded-lg">
                  {t.add}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Yes", cancelText = "Cancel", t, isRTL }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-600" />
          </div>
          <h3 className={`text-xl font-bold text-gray-900 mb-2 ${isRTL ? 'text-right' : ''}`}>{title}</h3>
          <p className={`text-gray-600 mb-6 ${isRTL ? 'text-right' : ''}`}>{message}</p>
          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              {cancelText}
            </button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              {confirmText}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Customer Modal
const CustomerModal = ({ isOpen, onClose, onSave, customerInfo, setCustomerInfo, t, isRTL }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className={`flex justify-between items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.customerInformation}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        
        <input 
          type="text" 
          placeholder={t.nameRequired} 
          value={customerInfo.name} 
          onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} 
          className={`w-full p-3 border rounded-lg mb-3 focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} 
        />
        <input 
          type="tel" 
          placeholder={t.phone} 
          value={customerInfo.phone} 
          onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} 
          className={`w-full p-3 border rounded-lg mb-3 focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} 
        />
        <input 
          type="email" 
          placeholder={t.email} 
          value={customerInfo.email} 
          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} 
          className={`w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`} 
        />
        
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
            {t.cancel}
          </button>
          <button onClick={onSave} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            {t.saveCustomer}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Keyboard Shortcuts Modal
const ShortcutsModal = ({ isOpen, onClose, t, isRTL }) => {
  if (!isOpen) return null;
  
  const shortcuts = [
    { key: 'F2', action: t.newSaleShortcut },
    { key: 'F3', action: t.searchProductsShortcut },
    { key: 'F4', action: t.barcodeInputShortcut },
    { key: 'F5', action: t.openScannerShortcut },
    { key: 'F9', action: t.printReceiptShortcut },
    { key: 'Ctrl + D', action: t.addDiscountShortcut },
    { key: 'Ctrl + C', action: t.addCustomerShortcut },
    { key: 'Esc', action: t.clearSearchShortcut }
  ];
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className={`flex justify-between items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h2 className={`text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.keyboardShortcuts}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className={`flex justify-between items-center py-2 border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="font-mono bg-gray-100 px-3 py-1 rounded text-sm font-bold">
                {shortcut.key}
              </span>
              <span className={`text-gray-600 ${isRTL ? 'text-right' : ''}`}>{shortcut.action}</span>
            </div>
          ))}
        </div>
        
        <button onClick={onClose} className="w-full mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
          {t.close}
        </button>
      </motion.div>
    </div>
  );
};

const POS = () => {
  const dispatch = useDispatch();
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { products, loading: productsLoading } = useSelector((state) => state.allProducts);
  const { warehouses, loading: warehousesLoading } = useSelector((state) => state.allWarehouses);
  const { loading: saleLoading, success: saleSuccess, error: saleError } = useSelector((state) => state.newSale);
  
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [billDiscount, setBillDiscount] = useState(0);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cartExpanded, setCartExpanded] = useState(true);
  
  const barcodeRef = useRef(null);
  const searchRef = useRef(null);

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

  // Fetch products and warehouses
  useEffect(() => {
    dispatch(getAllProductsAction(1, 100));
    dispatch(getAllWarehousesAction());
  }, [dispatch]);

  // Handle sale success
  useEffect(() => {
    if (saleSuccess) {
      toast.success(t.saleCompleted);
      setCart([]);
      setCustomerInfo({ name: '', phone: '', email: '' });
      setBillDiscount(0);
      dispatch({ type: 'CREATE_SALE_RESET' });
      dispatch(getAllProductsAction(1, 100));
      dispatch(getAllWarehousesAction());
    }
  }, [saleSuccess, dispatch, t]);

  // Handle errors
  useEffect(() => {
    if (saleError) {
      toast.error(saleError);
      dispatch(clearErrors());
    }
  }, [saleError, dispatch]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setCartExpanded(window.innerWidth >= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Focus input on load
  useEffect(() => {
    if (!isMobile && barcodeRef.current) {
      barcodeRef.current.focus();
    }
  }, [isMobile, products]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'F2') { e.preventDefault(); setShowClearCartModal(true); }
      if (e.key === 'F3') { e.preventDefault(); searchRef.current?.focus(); }
      if (e.key === 'F4') { e.preventDefault(); barcodeRef.current?.focus(); }
      if (e.key === 'F5') { e.preventDefault(); setShowScanner(true); }
      if (e.key === 'F9') { e.preventDefault(); if(cart.length) handlePrint(); }
      if (e.key === 'F12') { e.preventDefault(); setShowShortcutsModal(true); }
      if (e.ctrlKey && e.key === 'd') { e.preventDefault(); 
        const discount = prompt('Discount %:', billDiscount);
        if(discount && !isNaN(discount)) setBillDiscount(parseFloat(discount));
      }
      if (e.ctrlKey && e.key === 'c') { e.preventDefault(); setShowCustomerModal(true); }
      if (e.key === 'Escape') { setSearchTerm(''); barcodeRef.current?.focus(); }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [cart, billDiscount]);

  // Filter products
  const filteredProducts = (products || []).filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle barcode scanning
  useEffect(() => {
    if (barcodeInput.length >= 5) {
      const product = (products || []).find(p => p.barcode === barcodeInput);
      if (product) {
        addToCart(product);
        setBarcodeInput('');
        toast.success(`${product.name} ${t.productAdded}`);
      } else {
        toast.error(t.productNotFound);
        setBarcodeInput('');
      }
    }
  }, [barcodeInput, products, t]);

  // Handle scan from camera
  const handleScan = useCallback((scannedData) => {
    const product = (products || []).find(p => p.barcode === scannedData);
    if (product) {
      addToCart(product);
      toast.success(`${product.name} ${t.productAddedViaScanner}`);
    } else {
      toast.error(t.productNotFound);
    }
    setShowScanner(false);
  }, [products, t]);

  // Get available stock for a product in a specific warehouse
  const getAvailableStock = (product, warehouseId) => {
    if (!product.warehouseStock) return 0;
    const stock = product.warehouseStock.find(ws => ws.warehouseId === warehouseId);
    return stock ? stock.quantity : 0;
  };

  // Get all warehouses that have stock for a product
  const getAvailableWarehouses = (product) => {
    if (!product.warehouseStock || !warehouses) return [];
    return product.warehouseStock
      .filter(ws => ws.quantity > 0)
      .map(ws => {
        const warehouse = warehouses.find(w => w.id === ws.warehouseId);
        return {
          id: ws.warehouseId,
          name: warehouse?.name || t.unknownWarehouse,
          quantity: ws.quantity
        };
      });
  };

  const addToCart = (product) => {
    if (!product.warehouseStock || product.warehouseStock.length === 0) {
      toast.error(`${product.name} ${t.noStockAvailable}`);
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      const currentWarehouseStock = getAvailableStock(product, existingItem.warehouseId);
      if (existingItem.quantity + 1 > currentWarehouseStock) {
        toast.error(`${t.notEnoughStock} ${existingItem.warehouseName}! ${t.available}: ${currentWarehouseStock}`);
        return;
      }
      setCart(cart.map(item => item.id === product.id ? { 
        ...item, 
        quantity: item.quantity + 1, 
        total: (item.quantity + 1) * item.unitPrice * (1 - (item.discount || 0)/100) 
      } : item));
      toast.success(`${product.name} ${t.productAdded}`);
    } else {
      const availableWarehouses = getAvailableWarehouses(product);
      if (availableWarehouses.length === 0) {
        toast.error(`${t.noStockAvailable} ${product.name}`);
        return;
      }
      
      const defaultWarehouse = availableWarehouses[0];
      
      setCart([...cart, { 
        ...product, 
        quantity: 1, 
        discount: 0, 
        total: product.unitPrice,
        warehouseId: defaultWarehouse.id,
        warehouseName: defaultWarehouse.name,
        availableWarehouses: availableWarehouses,
        currencySymbol: getCurrencySymbol(product.currency).symbol
      }]);
      toast.success(`${product.name} ${t.productAdded} ${t.from} ${defaultWarehouse.name}`);
    }
    setSearchTerm('');
    if (!isMobile) barcodeRef.current?.focus();
  };

  const updateWarehouse = (itemId, warehouseId, warehouseName, product) => {
    const availableStock = getAvailableStock(product, warehouseId);
    const existingItem = cart.find(item => item.id === itemId);
    
    if (availableStock === 0) {
      toast.error(`${t.noStockInWarehouse} ${warehouseName}`);
      return;
    }
    
    if (existingItem.quantity > availableStock) {
      toast.error(t.onlyUnitsAvailable.replace('{0}', availableStock) + ` ${t.in} ${warehouseName}`);
      return;
    }
    
    setCart(cart.map(item => item.id === itemId ? { 
      ...item, 
      warehouseId, 
      warehouseName,
      total: item.quantity * item.unitPrice * (1 - (item.discount || 0)/100)
    } : item));
    
    toast.success(`${t.warehouseChanged} ${warehouseName}`);
  };

  const updateQuantity = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    const availableStock = getAvailableStock(item, item.warehouseId);
    
    if (delta === -1 && item.quantity === 1) {
      setCart(cart.filter(i => i.id !== id));
      return;
    }
    if (delta === 1 && item.quantity + 1 > availableStock) {
      toast.error(`${t.notEnoughStock} ${item.warehouseName}! ${t.available}: ${availableStock}`);
      return;
    }
    setCart(cart.map(item => item.id === id ? { 
      ...item, 
      quantity: item.quantity + delta, 
      total: (item.quantity + delta) * item.unitPrice * (1 - (item.discount || 0)/100) 
    } : item));
  };

  const updateItemDiscount = (id, discountPercent) => {
    const discount = Math.min(Math.max(discountPercent, 0), 100);
    setCart(cart.map(item => item.id === id ? { 
      ...item, 
      discount, 
      total: item.unitPrice * item.quantity * (1 - discount/100) 
    } : item));
  };

  const clearCart = () => {
    setCart([]);
    setBillDiscount(0);
    setShowClearCartModal(false);
    toast.success(t.cartCleared);
  };

  // Calculate totals with multi-currency support - FIXED
  const totalsByCurrency = cart.reduce((acc, item) => {
    const currency = item.currency;
    if (!acc[currency]) {
      acc[currency] = {
        subtotal: 0,
        discountAmount: 0,
        total: 0,
        symbol: getCurrencySymbol(currency).symbol,
        items: []
      };
    }
    const itemTotal = item.unitPrice * item.quantity;
    const itemDiscount = itemTotal * (item.discount / 100);
    const itemFinal = itemTotal - itemDiscount;
    acc[currency].subtotal += itemTotal;
    acc[currency].discountAmount += itemDiscount;
    acc[currency].total += itemFinal;
    acc[currency].items.push(item);
    return acc;
  }, {});

  const overallSubtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const overallDiscountAmount = (overallSubtotal * billDiscount) / 100;
  const overallTotal = overallSubtotal - overallDiscountAmount;

  // Calculate final totals by currency with bill discount applied - FIXED
  const finalTotalsByCurrency = Object.entries(totalsByCurrency).reduce((acc, [currency, data]) => {
    const currencyProportion = overallSubtotal > 0 ? data.subtotal / overallSubtotal : 0;
    const currencyBillDiscount = overallDiscountAmount * currencyProportion;
    acc[currency] = {
      ...data,
      finalTotal: data.total - currencyBillDiscount,
      billDiscountAmount: currencyBillDiscount
    };
    return acc;
  }, {});

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Generate and download PDF
  const downloadPDF = (invoiceHTML, filename) => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
    
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              margin: 0;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
            }
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          ${invoiceHTML}
        </body>
      </html>
    `);
    iframeDoc.close();
    
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 500);
  };

  const generateInvoiceHTML = () => {
    const invoiceNumber = `INV-${Date.now()}`;
    const date = new Date().toLocaleString();
    
    const itemsHTML = cart.map(item => {
      const currencySymbol = getCurrencySymbol(item.currency).symbol;
      return `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0;" ${isRTL ? 'align="right"' : ''}>
            ${item.name}<br/>
            <small style="color: #666;">${t.warehouse}: ${item.warehouseName}</small>
            ${item.discount > 0 ? `<br/><small style="color: #e74c3c;">${t.discount}: ${item.discount}%</small>` : ''}
          </td>
          <td style="padding: 8px 0; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px 0; text-align: right;">${currencySymbol} ${item.unitPrice.toFixed(2)}</td>
          <td style="padding: 8px 0; text-align: right;">${currencySymbol} ${(item.unitPrice * item.quantity * (1 - item.discount/100)).toFixed(2)}</td>
        </tr>
      `;
    }).join('');
    
    const totalsHTML = Object.entries(finalTotalsByCurrency).map(([currency, data]) => `
      <div style="margin-bottom: 10px;" ${isRTL ? 'dir="rtl"' : ''}>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span>${t.subtotal} (${currency}):</span>
          <span>${data.symbol} ${data.subtotal.toFixed(2)}</span>
        </div>
        ${data.discountAmount > 0 ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px; color: #e74c3c;">
            <span>${t.itemDiscount}:</span>
            <span>-${data.symbol} ${data.discountAmount.toFixed(2)}</span>
          </div>
        ` : ''}
        ${billDiscount > 0 ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px; color: #e74c3c;">
            <span>${t.billDiscount} (${billDiscount}%):</span>
            <span>-${data.symbol} ${data.billDiscountAmount.toFixed(2)}</span>
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px;">
          <span>${t.total} (${currency}):</span>
          <span>${data.symbol} ${data.finalTotal.toFixed(2)}</span>
        </div>
      </div>
    `).join('');
    
    return `
      <div class="invoice-container" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;" ${isRTL ? 'dir="rtl"' : ''}>
        <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
          <h1 style="margin: 0; color: #2c3e50;">${t.pointOfSale}</h1>
          <p style="margin: 5px 0; color: #666;">123 Business Street, City</p>
          <p style="margin: 5px 0; color: #666;">Phone: (123) 456-7890 | Email: info@pos.com</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <strong>Invoice #:</strong> ${invoiceNumber}<br/>
            <strong>Date:</strong> ${date}
          </div>
          <div ${isRTL ? 'align="right"' : ''}>
            <strong>${t.customer}:</strong> ${customerInfo.name || t.addCustomer}<br/>
            ${customerInfo.phone ? `<strong>${t.phone}:</strong> ${customerInfo.phone}<br/>` : ''}
            ${customerInfo.email ? `<strong>${t.email}:</strong> ${customerInfo.email}` : ''}
          </div>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f8f9fa; border-bottom: 2px solid #ddd;">
              <th style="padding: 10px; text-align: left;">${t.product}</th>
              <th style="padding: 10px; text-align: center;">${t.qty}</th>
              <th style="padding: 10px; text-align: right;">${t.unitPrice}</th>
              <th style="padding: 10px; text-align: right;">${t.total}</th>
             </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
        
        <div style="border-top: 2px solid #ddd; padding-top: 20px;">
          ${totalsHTML}
        </div>
        
        <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
          <div style="display: flex; justify-content: space-between;">
            <strong>${t.paymentMethod}:</strong>
            <span>${paymentMethod === 'cash' ? t.cash : t.card}</span>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Thank you for your business!</p>
          <p>Please keep this receipt for future reference</p>
        </div>
      </div>
    `;
  };

  const handlePrint = () => {
    const invoiceHTML = generateInvoiceHTML();
    downloadPDF(invoiceHTML, `invoice_${Date.now()}.pdf`);
  };

  const handlePayNow = async () => {
    if (!cart.length) {
      toast.error(t.cartEmpty);
      return;
    }
    
    if (!customerInfo.name) {
      setShowCustomerModal(true);
      toast.error(t.nameRequiredError);
      return;
    }
    
    try {
      const saleData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        items: cart.map(item => ({
          productId: item.id,
          warehouseId: item.warehouseId,
          quantity: item.quantity,
          discount: item.discount,
          unitPrice: item.unitPrice
        })),
        discount: billDiscount,
        paymentMethod: paymentMethod
      };
      
      // FIXED: Properly await the dispatch
      await dispatch(createSaleAction(saleData));
      
      const invoiceHTML = generateInvoiceHTML();
      downloadPDF(invoiceHTML, `invoice_${Date.now()}.pdf`);
      
      toast.success(t.paymentSuccessful);
      
      setCart([]);
      setCustomerInfo({ name: '', phone: '', email: '' });
      setBillDiscount(0);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(t.paymentFailed);
    }
  };

  if (productsLoading || warehousesLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 md:px-6 md:py-4">
        <div className={`flex flex-wrap items-center justify-between gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 md:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/dashboard">
              <button className={`flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-3 md:py-2 text-sm md:text-base text-gray-600 hover:bg-gray-100 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
                <span className="hidden sm:inline">{t.back}</span>
              </button>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className={`text-base md:text-xl font-bold ${isRTL ? 'text-right' : ''}`}>{t.pointOfSale}</h1>
              <p className={`text-xs text-gray-500 hidden sm:block ${isRTL ? 'text-right' : ''}`}>{t.shortcutsHint}</p>
            </div>
          </div>
          <div className={`flex gap-1 md:gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button onClick={() => setShowShortcutsModal(true)} className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg">
              <Keyboard size={18} className="md:w-5 md:h-5" />
            </button>
            <button onClick={() => setShowScanner(true)} className="p-1.5 md:p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <QrCode size={18} className="md:w-5 md:h-5" />
            </button>
            <button onClick={() => setShowClearCartModal(true)} className="px-2 py-1.5 md:px-4 md:py-2 border border-red-500 text-red-500 rounded-lg text-sm md:text-base">
              {t.newSale}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Products Section */}
        <div className={`flex-1 flex flex-col overflow-hidden ${isMobile && cartExpanded ? 'hidden' : ''}`}>
          {/* Search & Barcode Input */}
          <div className="p-3 md:p-4 bg-white border-b">
            <div className="relative mb-2">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
              <input
                ref={searchRef}
                type="text"
                placeholder={t.searchProducts}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2 border rounded-lg focus:outline-none focus:border-green-500 text-sm md:text-base`}
              />
            </div>
            <div className="relative">
              <ScanLine className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={16} />
              <input
                ref={barcodeRef}
                type="text"
                placeholder={t.scanBarcode}
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10'} py-2 border rounded-lg focus:outline-none focus:border-green-500 text-sm md:text-base`}
              />
              <Camera 
                onClick={() => setShowScanner(true)} 
                className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600`} 
                size={16} 
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {(searchTerm ? filteredProducts : products || []).map(product => {
                const totalStock = product.currentStock || 0;
                const warehousesWithStock = getAvailableWarehouses(product);
                const hasStock = totalStock > 0;
                const currencySymbol = getCurrencySymbol(product.currency).symbol;
                
                return (
                  <div 
                    key={product.id} 
                    onClick={() => hasStock && addToCart(product)} 
                    className={`bg-white rounded-lg md:rounded-xl p-2 md:p-4 shadow hover:shadow-lg cursor-pointer border ${!hasStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <h3 className={`font-semibold text-xs md:text-sm truncate ${isRTL ? 'text-right' : ''}`}>{product.name}</h3>
                    <p className={`text-xs text-gray-500 hidden sm:block ${isRTL ? 'text-right' : ''}`}>{product.sku}</p>
                    <p className={`text-sm md:text-xl font-bold text-green-600 mt-1 md:mt-2 ${isRTL ? 'text-right' : ''}`}>
                      {currencySymbol} {product.unitPrice}
                    </p>
                    <p className={`text-xs text-gray-500 mt-1 ${isRTL ? 'text-right' : ''}`}>{t.stock}: {totalStock}</p>
                    <p className={`text-xs text-blue-500 mt-1 truncate ${isRTL ? 'text-right' : ''}`}>
                      {product.currency} • {warehousesWithStock.length} {t.warehousesCount}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        {isMobile && (
          <button
            onClick={() => setCartExpanded(!cartExpanded)}
            className="fixed bottom-4 right-4 z-10 bg-gradient-to-r from-green-600 to-red-600 text-white p-3 rounded-full shadow-lg"
          >
            {cartExpanded ? <ChevronDown size={24} /> : <ShoppingCart size={24} />}
            {cartItemCount > 0 && !cartExpanded && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        )}

        {/* Cart Section */}
        <div className={`${isMobile ? 'fixed inset-0 z-20 bg-white' : 'w-96 lg:w-[450px]'} ${isMobile && !cartExpanded ? 'hidden' : 'flex'} flex-col border-l`}>
          {/* Cart Header */}
          <div className={`p-3 md:p-4 border-b flex justify-between items-center bg-white ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className={`text-base md:text-lg font-bold flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ShoppingCart size={18} />
              {t.cart} ({cartItemCount} {t.items})
            </h2>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {isMobile && (
                <button onClick={() => setCartExpanded(false)} className="p-1">
                  <X size={20} />
                </button>
              )}
              <button onClick={() => setShowClearCartModal(true)} className="text-red-500 text-sm">{t.clear}</button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4">
            {cart.map(item => {
              const availableWarehouses = getAvailableWarehouses(item);
              const currencySymbol = getCurrencySymbol(item.currency).symbol;
              
              return (
                <div key={item.id} className="mb-3 p-2 md:p-3 bg-gray-50 rounded-lg">
                  <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${isRTL ? 'text-right' : ''}`}>{item.name}</h4>
                      <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : ''}`}>{currencySymbol} {item.unitPrice} ({item.currency})</p>
                    </div>
                    <button onClick={() => setCart(cart.filter(i=>i.id!==item.id))} className="text-red-500">
                      <X size={14} />
                    </button>
                  </div>
                  
                  {/* Warehouse Selection */}
                  <div className="mt-2">
                    <label className={`text-xs text-gray-500 flex items-center gap-1 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Warehouse size={12} />
                      {t.warehouse}
                    </label>
                    <select
                      value={item.warehouseId}
                      onChange={(e) => {
                        const selected = availableWarehouses.find(w => w.id === e.target.value);
                        if (selected) {
                          updateWarehouse(item.id, selected.id, selected.name, item);
                        }
                      }}
                      className={`w-full p-1 text-xs border rounded focus:outline-none focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
                    >
                      {availableWarehouses.map(wh => (
                        <option key={wh.id} value={wh.id}>
                          {wh.name} ({t.stock}: {wh.quantity})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className={`flex justify-between items-center mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-gray-200 rounded"><Minus size={12} /></button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-gray-200 rounded"><Plus size={12} /></button>
                    </div>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <input 
                        type="number" 
                        value={item.discount} 
                        onChange={(e) => updateItemDiscount(item.id, parseFloat(e.target.value) || 0)} 
                        className={`w-14 px-1 py-1 text-xs border rounded ${isRTL ? 'text-right' : ''}`} 
                        placeholder={t.discountPercent} 
                      />
                      <span className="font-bold text-green-600 text-sm">{currencySymbol} {item.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            {!cart.length && (
              <div className={`text-center py-8 text-gray-500 ${isRTL ? 'text-right' : ''}`}>
                <ShoppingCart size={40} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">{t.cartEmpty}</p>
                <p className="text-xs">{t.scanToAdd}</p>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="p-3 md:p-4 border-t bg-white">
              <div className="space-y-2 mb-3">
                {/* Show totals by currency with correct bill discount */}
                {Object.entries(finalTotalsByCurrency).map(([currency, data]) => (
                  <div key={currency} className="border-b border-gray-100 pb-2 mb-2">
                    <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{t.subtotal} ({currency})</span>
                      <span>{data.symbol} {data.subtotal.toFixed(2)}</span>
                    </div>
                    {data.discountAmount > 0 && (
                      <div className={`flex justify-between text-sm text-red-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{t.itemDiscount}</span>
                        <span>-{data.symbol} {data.discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    {billDiscount > 0 && (
                      <div className={`flex justify-between text-sm text-red-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{t.billDiscount} ({billDiscount}%)</span>
                        <span>-{data.symbol} {data.billDiscountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className={`flex justify-between pt-1 font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{t.total} ({currency})</span>
                      <span className="text-green-600">{data.symbol} {data.finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
                
                {/* Bill Discount Input */}
                <div className={`flex justify-between items-center pt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="flex gap-1 items-center">
                    <Percent size={14} className="text-gray-500" />
                    <span className="text-sm">{t.billDiscount}</span>
                    <input 
                      type="number" 
                      value={billDiscount} 
                      onChange={(e) => setBillDiscount(parseFloat(e.target.value)||0)} 
                      className="w-16 px-2 py-1 border rounded text-sm text-center" 
                      step="1"
                      min="0"
                      max="100"
                    />%
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button 
                  onClick={() => setPaymentMethod('cash')} 
                  className={`p-2 border rounded text-sm ${paymentMethod === 'cash' ? 'border-green-500 bg-green-50' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <DollarSign size={14} className="inline mr-1" /> {t.cash}
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')} 
                  className={`p-2 border rounded text-sm ${paymentMethod === 'card' ? 'border-green-500 bg-green-50' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <CreditCard size={14} className="inline mr-1" /> {t.card}
                </button>
              </div>

              {/* Customer Button */}
              <button 
                onClick={() => setShowCustomerModal(true)} 
                className={`w-full p-2 bg-gray-100 rounded mb-3 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <User size={14} className="inline mr-1" />
                {customerInfo.name || t.addCustomer}
              </button>

              {/* Single Pay Now Button */}
              <button 
                onClick={handlePayNow} 
                disabled={saleLoading} 
                className="w-full p-3 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg text-base font-semibold flex items-center justify-center gap-2"
              >
                {saleLoading ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <CheckCircle size={18} />
                )}
                {saleLoading ? t.processing : t.payNow}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Customer Modal */}
      <CustomerModal 
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        onSave={() => {
          if(customerInfo.name) { 
            setShowCustomerModal(false); 
            toast.success(t.customerAdded); 
          } else toast.error(t.nameRequiredError);
        }}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        t={t}
        isRTL={isRTL}
      />

      {/* Clear Cart Confirmation Modal */}
      <ConfirmModal 
        isOpen={showClearCartModal}
        onClose={() => setShowClearCartModal(false)}
        onConfirm={clearCart}
        title={t.clearCartTitle}
        message={t.clearCartMessage}
        confirmText={t.yesClearCart}
        cancelText={t.cancel}
        t={t}
        isRTL={isRTL}
      />

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal 
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
        t={t}
        isRTL={isRTL}
      />

      {/* Scanner Modal */}
      {showScanner && (
        <ScannerModal onScan={handleScan} onClose={() => setShowScanner(false)} t={t} isRTL={isRTL} />
      )}
    </div>
  );
};

export default POS;