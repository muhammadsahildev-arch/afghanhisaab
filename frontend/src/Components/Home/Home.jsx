import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  ChevronRight,
  Sparkles,
  Shield,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Wallet,
  CreditCard,
  Landmark,
  ArrowLeftRight,
  Smartphone,
  HeadphonesIcon,
  Building2,
  Briefcase,
  Factory,
  Plane,
  Hospital,
  GraduationCap,
  ShoppingBag,
  Truck,
  Laptop,
  Handshake,
  Coffee,
  Target
} from 'lucide-react';
import bi from '../../assets/bi.avif'
import boy from '../../assets/boy.avif'
import bib from '../../assets/1.avif'

// Language Translations
const translations = {
  en: {
    // Hero Section
    heroBadge: "Trusted by 15,000+ customers & 200+ businesses",
    heroTitle1: "Currency Exchange",
    heroTitle2: "Made Simple",
    heroText: "Experience fast, secure, and transparent currency exchange with competitive rates. Join thousands of satisfied customers and 200+ businesses who trust us for their international currency needs.",
    getStarted: "Get Started",
    signIn: "Sign In",
    liveExchangeRates: "Live Exchange Rates",
    updatedRealTime: "Updated in real-time",
    viewAllCurrencies: "View All 30+ Currencies",
    noHiddenFees: "No hidden fees",
    realTimeRates: "Real-time rates",
    secureTransactions: "Secure transactions",
    instantConfirmation: "Instant confirmation",
    support247: "24/7 support",
    mobileApp: "Mobile app access",
    corporateAccounts: "Corporate accounts",
    multiLanguage: "Multi-language support",
    freeRateAlerts: "Free rate alerts",
    bulkDiscounts: "Bulk discounts",
    trustedBy: "Trusted by 15,000+ customers",
    
    // Stats Section
    yearsOfExperience: "Years of Experience",
    happyCustomers: "Happy Customers",
    currencies: "Currencies",
    branches: "Branches",
    dailyTransactions: "Daily Transactions",
    corporateClients: "Corporate Clients",
    
    // Services Section
    ourServices: "Our Services",
    whyChooseUs: "Why Choose Us",
    weProvide: "We provide comprehensive currency exchange solutions tailored to your needs",
    multiCurrencySupport: "Multi-Currency Support",
    multiCurrencyDesc: "Exchange over 30+ global currencies including USD, EUR, GBP, AED, SAR at competitive rates",
    secureTransactionsDesc: "Bank-grade 256-bit encryption and ISO 27001 certified security for all your transactions",
    instantExchange: "Instant Exchange",
    instantExchangeDesc: "Real-time currency conversion with minimal waiting time - complete in under 2 minutes",
    mobileAppDesc: "Manage exchanges on-the-go with our iOS and Android apps with biometric login",
    support247Desc: "Round-the-clock customer assistance via phone, email, and live chat in multiple languages",
    liveRates: "Live Rates",
    liveRatesDesc: "Real-time market rates updated every second from major global financial markets",
    
    // Partners Section
    ourPartners: "Our Partners",
    companiesThatTrustUs: "Companies That Trust Us",
    partnersDesc: "We're proud to work with leading companies across various industries",
    bankingPartner: "Banking Partner",
    financialPartner: "Financial Partner",
    islamicBanking: "Islamic Banking",
    corporateClient: "Corporate Client",
    aviationPartner: "Aviation Partner",
    healthcarePartner: "Healthcare Partner",
    educationPartner: "Education Partner",
    ecommercePartner: "E-commerce Partner",
    logisticsPartner: "Logistics Partner",
    technologyPartner: "Technology Partner",
    since: "Since",
    successStories: "Success Stories",
    reducedCosts: "Reduced international transaction costs by 35% compared to traditional banking",
    processedVolume: "Processed over $5 million in international trade payments seamlessly",
    helpedStudents: "Helped 500+ students with international tuition fee payments",
    isoCertified: "ISO 27001 Certified",
    stateBankLicensed: "State Bank Licensed",
    
    // Benefits Section
    whyChooseUsTitle: "Why Choose Us",
    theSmartChoice: "The Smart Choice for Currency Exchange",
    benefitsDesc: "We combine competitive rates with exceptional service to give you the best currency exchange experience possible. Join 200+ businesses that trust us.",
    bestRatesGuaranteed: "Best Rates Guaranteed",
    bestRatesDesc: "We offer the most competitive exchange rates in the market with zero hidden fees",
    fastProcessing: "Fast Processing",
    fastProcessingDesc: "Complete your transactions in minutes, not hours with our streamlined process",
    happyCustomersDesc: "Trusted by thousands of satisfied clients including businesses and individuals",
    fullyLicensed: "Fully Licensed",
    fullyLicensedDesc: "Regulated and certified by State Bank of Pakistan and financial authorities",
    corporateSolutions: "Corporate Solutions",
    corporateSolutionsDesc: "Tailored currency exchange solutions for businesses of all sizes",
    premiumService: "Premium Service",
    premiumServiceDesc: "Dedicated relationship managers for high-value clients and businesses",
    openAccount: "Open an Account",
    
    // How It Works Section
    simpleProcess: "Simple Process",
    howItWorks: "How It Works",
    howItWorksDesc: "Get started in minutes with our simple 4-step process",
    chooseCurrency: "Choose Currency",
    chooseCurrencyDesc: "Select the currencies you want to exchange from 30+ options",
    enterAmount: "Enter Amount",
    enterAmountDesc: "Specify the amount you wish to exchange (no minimum limit)",
    lockRate: "Lock Rate",
    lockRateDesc: "Lock in our competitive exchange rate for 24 hours",
    completeTransaction: "Complete Transaction",
    completeTransactionDesc: "Finish your exchange instantly and get confirmation",
    avgTransactionTime: "Average transaction time:",
    minutes: "2 minutes",
    noHiddenFeesSmall: "No hidden fees",
    
    // Testimonials Section
    testimonials: "Testimonials",
    whatOurClientsSay: "What Our Clients Say",
    testimonialsDesc: "Hear from our satisfied customers across different industries",
    fiveStarReviews: "5-Star Reviews",
    customerSatisfaction: "Customer Satisfaction",
    
    // CTA Section
    readyToExchange: "Ready to Exchange?",
    ctaText: "Join thousands of satisfied customers and 200+ businesses who trust us with their currency needs",
    openAccount: "Open an Account",
    
    // Success Stories
    savings: "Savings",
    volume: "Volume",
    students: "Students",
    
    // Currency
    pkr: "PKR"
  },
  ur: {
    // Hero Section
    heroBadge: "15,000+ گاہکوں اور 200+ کاروباروں کی طرف سے قابل اعتماد",
    heroTitle1: "کرنسی ایکسچینج",
    heroTitle2: "آسان بنایا گیا",
    heroText: "مسابقتی شرحوں کے ساتھ تیز، محفوظ، اور شفاف کرنسی ایکسچینج کا تجربہ کریں۔ ہزاروں مطمئن گاہکوں اور 200+ کاروباروں میں شامل ہوں جو ہم پر اپنی بین الاقوامی کرنسی کی ضروریات کے لیے بھروسہ کرتے ہیں۔",
    getStarted: "شروع کریں",
    signIn: "سائن ان کریں",
    liveExchangeRates: "لائیو ایکسچینج ریٹ",
    updatedRealTime: "ریئل ٹائم میں اپڈیٹ",
    viewAllCurrencies: "تمام 30+ کرنسیاں دیکھیں",
    noHiddenFees: "کوئی پوشیدہ فیس نہیں",
    realTimeRates: "ریئل ٹائم ریٹ",
    secureTransactions: "محفوظ لین دین",
    instantConfirmation: "فوری تصدیق",
    support247: "24/7 سپورٹ",
    mobileApp: "موبائل ایپ تک رسائی",
    corporateAccounts: "کارپوریٹ اکاؤنٹس",
    multiLanguage: "متعدد زبانوں کی سپورٹ",
    freeRateAlerts: "مفت ریٹ الرٹس",
    bulkDiscounts: "بلک ڈسکاؤنٹس",
    trustedBy: "15,000+ گاہکوں کی طرف سے قابل اعتماد",
    
    // Stats Section
    yearsOfExperience: "سال کا تجربہ",
    happyCustomers: "خوش گاہک",
    currencies: "کرنسیاں",
    branches: "شاخیں",
    dailyTransactions: "روزانہ لین دین",
    corporateClients: "کارپوریٹ کلائنٹس",
    
    // Services Section
    ourServices: "ہماری خدمات",
    whyChooseUs: "ہمیں کیوں منتخب کریں",
    weProvide: "ہم آپ کی ضروریات کے مطابق جامع کرنسی ایکسچینج حل فراہم کرتے ہیں",
    multiCurrencySupport: "متعدد کرنسی سپورٹ",
    multiCurrencyDesc: "USD، EUR، GBP، AED، SAR سمیت 30+ عالمی کرنسیوں کا مسابقتی شرحوں پر تبادلہ کریں",
    secureTransactionsDesc: "آپ کے تمام لین دین کے لیے بینک گریڈ 256-bit انکرپشن اور ISO 27001 مصدقہ سیکورٹی",
    instantExchange: "فوری تبادلہ",
    instantExchangeDesc: "کم سے کم انتظار کے وقت کے ساتھ ریئل ٹائم کرنسی کنورژن - 2 منٹ میں مکمل",
    mobileAppDesc: "بائیومیٹرک لاگ ان کے ساتھ ہمارے iOS اور Android ایپس کے ساتھ چلتے پھرتے تبادلے کا انتظام کریں",
    support247Desc: "فون، ای میل، اور لائیو چیٹ کے ذریعے متعدد زبانوں میں 24/7 کسٹمر امداد",
    liveRatesDesc: "بڑی عالمی مالیاتی منڈیوں سے ہر سیکنڈ میں اپڈیٹ ہونے والے ریئل ٹائم مارکیٹ ریٹ",
    
    // Partners Section
    ourPartners: "ہمارے پارٹنرز",
    companiesThatTrustUs: "کمپنیاں جو ہم پر بھروسہ کرتی ہیں",
    partnersDesc: "ہمیں مختلف صنعتوں میں معروف کمپنیوں کے ساتھ کام کرنے پر فخر ہے",
    bankingPartner: "بینکنگ پارٹنر",
    financialPartner: "مالی پارٹنر",
    islamicBanking: "اسلامی بینکنگ",
    corporateClient: "کارپوریٹ کلائنٹ",
    aviationPartner: "ایوی ایشن پارٹنر",
    healthcarePartner: "صحت کی دیکھ بھال پارٹنر",
    educationPartner: "تعلیمی پارٹنر",
    ecommercePartner: "ای کامرس پارٹنر",
    logisticsPartner: "لاجسٹکس پارٹنر",
    technologyPartner: "ٹیکنالوجی پارٹنر",
    since: "سے",
    successStories: "کامیابی کی کہانیاں",
    reducedCosts: "روایتی بینکنگ کے مقابلے میں بین الاقوامی لین دین کے اخراجات میں 35% کمی",
    processedVolume: "50 لاکھ ڈالر سے زیادہ بین الاقوامی تجارتی ادائیگیاں بغیر کسی رکاوٹ کے پروسیس کی گئیں",
    helpedStudents: "500+ طلباء کو بین الاقوامی ٹیوشن فیس کی ادائیگی میں مدد کی گئی",
    isoCertified: "ISO 27001 مصدقہ",
    stateBankLicensed: "اسٹیٹ بینک لائسنس یافتہ",
    
    // Benefits Section
    whyChooseUsTitle: "ہمیں کیوں منتخب کریں",
    theSmartChoice: "کرنسی ایکسچینج کے لیے دانشمندانہ انتخاب",
    benefitsDesc: "ہم مسابقتی شرحوں کو غیر معمولی خدمت کے ساتھ جوڑتے ہیں تاکہ آپ کو بہترین کرنسی ایکسچینج تجربہ مل سکے۔ 200+ کاروباروں میں شامل ہوں جو ہم پر بھروسہ کرتے ہیں۔",
    bestRatesGuaranteed: "بہترین شرح کی ضمانت",
    bestRatesDesc: "ہم مارکیٹ میں صفر پوشیدہ فیس کے ساتھ سب سے مسابقتی ایکسچینج ریٹ پیش کرتے ہیں",
    fastProcessing: "تیز پروسیسنگ",
    fastProcessingDesc: "اپنے لین دین کو گھنٹوں میں نہیں، منٹوں میں مکمل کریں",
    happyCustomersDesc: "کاروباروں اور افراد سمیت ہزاروں مطمئن گاہکوں کی طرف سے قابل اعتماد",
    fullyLicensed: "مکمل طور پر لائسنس یافتہ",
    fullyLicensedDesc: "اسٹیٹ بینک آف پاکستان اور مالیاتی حکام کے ذریعے ریگولیٹ اور مصدقہ",
    corporateSolutionsDesc: "تمام سائز کے کاروباروں کے لیے تیار کردہ کرنسی ایکسچینج حل",
    premiumServiceDesc: "اعلیٰ قیمت والے کلائنٹس اور کاروباروں کے لیے وقف تعلقات کے مینیجرز",
    openAccount: "اکاؤنٹ کھولیں",
    
    // How It Works Section
    simpleProcess: "آسان عمل",
    howItWorks: "یہ کیسے کام کرتا ہے",
    howItWorksDesc: "اپنے آسان 4 مرحلہ وار عمل کے ساتھ منٹوں میں شروع کریں",
    chooseCurrency: "کرنسی منتخب کریں",
    chooseCurrencyDesc: "30+ اختیارات میں سے وہ کرنسیاں منتخب کریں جن کا آپ تبادلہ کرنا چاہتے ہیں",
    enterAmount: "رقم درج کریں",
    enterAmountDesc: "وہ رقم بتائیں جس کا آپ تبادلہ کرنا چاہتے ہیں (کوئی کم از کم حد نہیں)",
    lockRate: "شرح مقفل کریں",
    lockRateDesc: "ہماری مسابقتی ایکسچینج ریٹ کو 24 گھنٹے کے لیے مقفل کریں",
    completeTransaction: "لین دین مکمل کریں",
    completeTransactionDesc: "اپنا تبادلہ فوری طور پر مکمل کریں اور تصدیق حاصل کریں",
    avgTransactionTime: "اوسط لین دین کا وقت:",
    minutes: "2 منٹ",
    noHiddenFeesSmall: "کوئی پوشیدہ فیس نہیں",
    
    // Testimonials Section
    testimonials: "گاہکوں کے تجربات",
    whatOurClientsSay: "ہمارے گاہک کیا کہتے ہیں",
    testimonialsDesc: "مختلف صنعتوں سے تعلق رکھنے والے ہمارے مطمئن گاہکوں سے سنیں",
    fiveStarReviews: "5-ستارہ جائزے",
    customerSatisfaction: "کسٹمر اطمینان",
    
    // CTA Section
    readyToExchange: "تبادلہ کرنے کے لیے تیار ہیں؟",
    ctaText: "ہزاروں مطمئن گاہکوں اور 200+ کاروباروں میں شامل ہوں جو ہم پر اپنی کرنسی کی ضروریات کے لیے بھروسہ کرتے ہیں",
    
    // Success Stories
    savings: "بچت",
    volume: "حجم",
    students: "طلباء",
    
    // Currency
    pkr: "پاکستانی روپے"
  },
  ps: {
    // Hero Section
    heroBadge: "د 15,000+ پیرودونکو او 200+ سوداګریو لخوا باوري",
    heroTitle1: "اسعارو تبادله",
    heroTitle2: "ساده شوی",
    heroText: "د سیالي نرخونو سره چټک، خوندي، او روڼ اسعارو تبادله تجربه کړئ. د زرګونو راضي پیرودونکو او 200+ سوداګریو سره یوځای شئ څوک چې زموږ په نړیوالو اسعارو اړتیاو باور لري.",
    getStarted: "پیل کړئ",
    signIn: "ننوتل",
    liveExchangeRates: "ژوندی تبادله نرخونه",
    updatedRealTime: "په ریښتیني وخت کې تازه شوی",
    viewAllCurrencies: "ټول 30+ اسعار وګورئ",
    noHiddenFees: "پټې فیس نشته",
    realTimeRates: "ریښتیني وخت نرخونه",
    secureTransactions: "خوندي راکړې ورکړې",
    instantConfirmation: "فوري تصدیق",
    support247: "24/7 ملاتړ",
    mobileApp: "موبایل اپلیکیشن لاسرسی",
    corporateAccounts: "کارپوریټ حسابونه",
    multiLanguage: "څو ژبو ملاتړ",
    freeRateAlerts: "وړیا نرخ خبرتیاوې",
    bulkDiscounts: "لوی تخفیفونه",
    trustedBy: "د 15,000+ پیرودونکو لخوا باوري",
    
    // Stats Section
    yearsOfExperience: "کلونه تجربه",
    happyCustomers: "خوشحاله پیرودونکي",
    currencies: "اسعار",
    branches: "څانګې",
    dailyTransactions: "ورځني راکړې ورکړې",
    corporateClients: "کارپوریټ کلاینټان",
    
    // Services Section
    ourServices: "زموږ خدمتونه",
    whyChooseUs: "ولې موږ غوره کړو",
    weProvide: "موږ ستاسو اړتیاو سره سم د اسعارو تبادلې هراړخیز حلونه چمتو کوو",
    multiCurrencySupport: "څو اسعارو ملاتړ",
    multiCurrencyDesc: "د USD، EUR، GBP، AED، SAR په شمول د 30+ نړیوالو اسعارو تبادله په سیالي نرخونو کې وکړئ",
    secureTransactionsDesc: "د ستاسو د ټولو راکړو ورکړو لپاره د بانک درجې 256-bit کوډ کول او ISO 27001 تصدیق شوی امنیت",
    instantExchange: "فوري تبادله",
    instantExchangeDesc: "د لږترلږه انتظار وخت سره ریښتیني وخت اسعارو تبادله - په 2 دقیقو کې بشپړه",
    mobileAppDesc: "د بایومتریک ننوتلو سره زموږ د iOS او Android ایپسونو سره په تګ کې تبادلې اداره کړئ",
    support247Desc: "د تلیفون، بریښنالیک، او ژوندی چیټ له لارې په څو ژبو کې 24/7 پیرودونکي مرسته",
    liveRatesDesc: "د لوی نړیوال مالي بازارونو څخه هر ثانیه کې تازه شوي ریښتیني وخت بازار نرخونه",
    
    // Partners Section
    ourPartners: "زموږ شریکان",
    companiesThatTrustUs: "هغه شرکتونه چې زموږ باور کوي",
    partnersDesc: "موږ ویاړو چې په مختلفو صنعتونو کې د مشهور شرکتونو سره کار کوو",
    bankingPartner: "بانکداري شریک",
    financialPartner: "مالي شریک",
    islamicBanking: "اسلامي بانکداري",
    corporateClient: "کارپوریټ کلاینټ",
    aviationPartner: "هوايي چلند شریک",
    healthcarePartner: "روغتیا ساتنه شریک",
    educationPartner: "تعلیمي شریک",
    ecommercePartner: "ای کامرس شریک",
    logisticsPartner: "لوجستیک شریک",
    technologyPartner: "ټیکنالوژي شریک",
    since: "له",
    successStories: "د بریالیتوب کیسې",
    reducedCosts: "د دودیز بانکداري په پرتله د نړیوالو راکړو ورکړو لګښتونو کې 35٪ کمښت",
    processedVolume: "د 5 ملیون ډالرو څخه ډیر نړیوال سوداګریز تادیات پرته له خنډه پروسس شوي",
    helpedStudents: "د 500+ زده کونکو سره د نړیوال تدریس فیس تادیه کې مرسته شوې",
    isoCertified: "ISO 27001 تصدیق شوی",
    stateBankLicensed: "د دولتي بانک جواز لرونکی",
    
    // Benefits Section
    whyChooseUsTitle: "ولې موږ غوره کړو",
    theSmartChoice: "د اسعارو تبادلې لپاره هوښیار انتخاب",
    benefitsDesc: "موږ سیالي نرخونه د غیر معمولي خدمت سره یوځای کوو ترڅو تاسو ته د اسعارو تبادلې غوره تجربه درکړو. د 200+ سوداګریو سره یوځای شئ چې زموږ باور کوي.",
    bestRatesGuaranteed: "غوره نرخ تضمین شوی",
    bestRatesDesc: "موږ په بازار کې د صفر پټو فیسونو سره ترټولو سیالي تبادله نرخونه وړاندې کوو",
    fastProcessing: "چټک پروسس",
    fastProcessingDesc: "خپلې راکړې ورکړې په ساعتونو کې نه، په دقیقو کې بشپړې کړئ",
    happyCustomersDesc: "د سوداګریو او افرادو په شمول د زرګونو راضي پیرودونکو لخوا باوري",
    fullyLicensed: "په بشپړه توګه جواز لرونکی",
    fullyLicensedDesc: "د پاکستان دولتي بانک او مالي چارواکو لخوا تنظیم شوی او تصدیق شوی",
    corporateSolutionsDesc: "د ټولو اندازو سوداګریو لپاره د اسعارو تبادلې حلونه",
    premiumServiceDesc: "د لوړ ارزښت لرونکو کلاینټانو او سوداګریو لپاره وقف شوي اړیکو مدیران",
    openAccount: "حساب خلاص کړئ",
    
    // How It Works Section
    simpleProcess: "ساده پروسه",
    howItWorks: "دا څنګه کار کوي",
    howItWorksDesc: "د خپل ساده 4 مرحلې پروسې سره په دقیقو کې پیل کړئ",
    chooseCurrency: "اسعار وټاکئ",
    chooseCurrencyDesc: "د 30+ اختیارونو څخه هغه اسعار غوره کړئ چې تاسو یې تبادله کول غواړئ",
    enterAmount: "رقم دننه کړئ",
    enterAmountDesc: "هغه رقم مشخص کړئ چې تاسو یې تبادله کول غواړئ (هیڅ لږ تر لږه حد نشته)",
    lockRate: "نرخ لاک کړئ",
    lockRateDesc: "زموږ سیالي تبادله نرخ د 24 ساعتونو لپاره لاک کړئ",
    completeTransaction: "راکړه ورکړه بشپړه کړئ",
    completeTransactionDesc: "خپله تبادله سمدستي بشپړه کړئ او تصدیق ترلاسه کړئ",
    avgTransactionTime: "د راکړې ورکړې اوسط وخت:",
    minutes: "2 دقیقې",
    noHiddenFeesSmall: "پټې فیس نشته",
    
    // Testimonials Section
    testimonials: "تعریفونه",
    whatOurClientsSay: "زموږ پیرودونکي څه وايي",
    testimonialsDesc: "زموږ د راضي پیرودونکو څخه واورئ چې په مختلفو صنعتونو کې دي",
    fiveStarReviews: "5-ستوری بیاکتنې",
    customerSatisfaction: "پیرودونکي رضایت",
    
    // CTA Section
    readyToExchange: "د تبادلې لپاره چمتو یاست؟",
    ctaText: "د زرګونو راضي پیرودونکو او 200+ سوداګریو سره یوځای شئ څوک چې زموږ په اسعارو اړتیاو باور لري",
    
    // Success Stories
    savings: "سپما",
    volume: "حجم",
    students: "زده کونکي",
    
    // Currency
    pkr: "پاکستاني روپۍ"
  },
  fa: {
    // Hero Section
    heroBadge: "مورد اعتماد بیش از 15,000 مشتری و 200+ کسب‌وکار",
    heroTitle1: "تبدیل ارز",
    heroTitle2: "ساده شده",
    heroText: "تبدیل ارز سریع، امن و شفاف با نرخ‌های رقابتی را تجربه کنید. به هزاران مشتری راضی و 200+ کسب‌وکار بپیوندید که نیازهای ارزی بین‌المللی خود را به ما می‌سپارند.",
    getStarted: "شروع کنید",
    signIn: "ورود",
    liveExchangeRates: "نرخ‌های لحظه‌ای ارز",
    updatedRealTime: "به‌روزرسانی لحظه‌ای",
    viewAllCurrencies: "مشاهده همه 30+ ارز",
    noHiddenFees: "بدون هزینه پنهان",
    realTimeRates: "نرخ‌های لحظه‌ای",
    secureTransactions: "تراکنش‌های امن",
    instantConfirmation: "تأیید فوری",
    support247: "پشتیبانی 24/7",
    mobileApp: "دسترسی به اپلیکیشن موبایل",
    corporateAccounts: "حساب‌های شرکتی",
    multiLanguage: "پشتیبانی چند زبانه",
    freeRateAlerts: "هشدارهای نرخ رایگان",
    bulkDiscounts: "تخفیف‌های عمده",
    trustedBy: "مورد اعتماد بیش از 15,000 مشتری",
    
    // Stats Section
    yearsOfExperience: "سال تجربه",
    happyCustomers: "مشتریان راضی",
    currencies: "ارزها",
    branches: "شعبه‌ها",
    dailyTransactions: "تراکنش‌های روزانه",
    corporateClients: "مشتریان شرکتی",
    
    // Services Section
    ourServices: "خدمات ما",
    whyChooseUs: "چرا ما را انتخاب کنید",
    weProvide: "ما راه‌حل‌های جامع تبدیل ارز متناسب با نیازهای شما ارائه می‌دهیم",
    multiCurrencySupport: "پشتیبانی چند ارزی",
    multiCurrencyDesc: "تبادل بیش از 30 ارز جهانی از جمله USD، EUR، GBP، AED، SAR با نرخ‌های رقابتی",
    secureTransactionsDesc: "رمزگذاری 256 بیتی در سطح بانک و امنیت تأیید شده ISO 27001 برای تمام تراکنش‌های شما",
    instantExchange: "تبادل فوری",
    instantExchangeDesc: "تبدیل ارز لحظه‌ای با حداقل زمان انتظار - تکمیل در کمتر از 2 دقیقه",
    mobileAppDesc: "مدیریت تبادلات در حال حرکت با اپلیکیشن‌های iOS و Android ما با ورود بیومتریک",
    support247Desc: "پشتیبانی مشتری 24/7 از طریق تلفن، ایمیل و چت زنده به چندین زبان",
    liveRatesDesc: "نرخ‌های لحظه‌ای بازار که هر ثانیه از بازارهای مالی بزرگ جهانی به‌روز می‌شوند",
    
    // Partners Section
    ourPartners: "شرکای ما",
    companiesThatTrustUs: "شرکت‌هایی که به ما اعتماد دارند",
    partnersDesc: "ما به همکاری با شرکت‌های پیشرو در صنایع مختلف افتخار می‌کنیم",
    bankingPartner: "شریک بانکی",
    financialPartner: "شریک مالی",
    islamicBanking: "بانکداری اسلامی",
    corporateClient: "مشتری شرکتی",
    aviationPartner: "شریک هوانوردی",
    healthcarePartner: "شریک بهداشت و درمان",
    educationPartner: "شریک آموزشی",
    ecommercePartner: "شریک تجارت الکترونیک",
    logisticsPartner: "شریک لجستیک",
    technologyPartner: "شریک فناوری",
    since: "از",
    successStories: "داستان‌های موفقیت",
    reducedCosts: "کاهش 35٪ هزینه‌های تراکنش‌های بین‌المللی در مقایسه با بانکداری سنتی",
    processedVolume: "پردازش بیش از 5 میلیون دلار پرداخت‌های تجاری بین‌المللی بدون مشکل",
    helpedStudents: "کمک به 500+ دانشجو برای پرداخت شهریه بین‌المللی",
    isoCertified: "گواهی ISO 27001",
    stateBankLicensed: "دارای مجوز از بانک مرکزی",
    
    // Benefits Section
    whyChooseUsTitle: "چرا ما را انتخاب کنید",
    theSmartChoice: "انتخاب هوشمندانه برای تبدیل ارز",
    benefitsDesc: "ما نرخ‌های رقابتی را با خدمات استثنایی ترکیب می‌کنیم تا بهترین تجربه تبدیل ارز را به شما ارائه دهیم. به 200+ کسب‌وکار بپیوندید که به ما اعتماد دارند.",
    bestRatesGuaranteed: "بهترین نرخ‌ها تضمین شده",
    bestRatesDesc: "ما رقابتی‌ترین نرخ‌های تبدیل ارز را در بازار بدون هیچ هزینه پنهانی ارائه می‌دهیم",
    fastProcessing: "پردازش سریع",
    fastProcessingDesc: "تراکنش‌های خود را در عرض چند دقیقه تکمیل کنید، نه چند ساعت",
    happyCustomersDesc: "مورد اعتماد هزاران مشتری راضی شامل کسب‌وکارها و افراد",
    fullyLicensed: "کاملاً مجاز",
    fullyLicensedDesc: "تنظیم شده و تأیید شده توسط بانک مرکزی پاکستان و مقامات مالی",
    corporateSolutionsDesc: "راه‌حل‌های تبدیل ارز متناسب برای کسب‌وکارهای در هر اندازه",
    premiumServiceDesc: "مدیران ارتباط اختصاصی برای مشتریان با ارزش بالا و کسب‌وکارها",
    openAccount: "افتتاح حساب",
    
    // How It Works Section
    simpleProcess: "فرآیند ساده",
    howItWorks: "نحوه عملکرد",
    howItWorksDesc: "با فرآیند ساده 4 مرحله‌ای ما در عرض چند دقیقه شروع کنید",
    chooseCurrency: "ارز را انتخاب کنید",
    chooseCurrencyDesc: "ارزهایی را که می‌خواهید تبدیل کنید از بین 30+ گزینه انتخاب کنید",
    enterAmount: "مبلغ را وارد کنید",
    enterAmountDesc: "مبلغی را که می‌خواهید تبدیل کنید مشخص کنید (بدون حداقل محدودیت)",
    lockRate: "قفل نرخ",
    lockRateDesc: "نرخ تبدیل رقابتی ما را به مدت 24 ساعت قفل کنید",
    completeTransaction: "تکمیل تراکنش",
    completeTransactionDesc: "تبدیل خود را فوراً تکمیل کنید و تأییدیه دریافت کنید",
    avgTransactionTime: "میانگین زمان تراکنش:",
    minutes: "2 دقیقه",
    noHiddenFeesSmall: "بدون هزینه پنهان",
    
    // Testimonials Section
    testimonials: "نظرات مشتریان",
    whatOurClientsSay: "مشتریان ما چه می‌گویند",
    testimonialsDesc: "از مشتریان راضی ما در صنایع مختلف بشنوید",
    fiveStarReviews: "بررسی‌های 5 ستاره",
    customerSatisfaction: "رضایت مشتری",
    
    // CTA Section
    readyToExchange: "آماده برای تبدیل هستید؟",
    ctaText: "به هزاران مشتری راضی و 200+ کسب‌وکار بپیوندید که نیازهای ارزی خود را به ما می‌سپارند",
    
    // Success Stories
    savings: "صرفه‌جویی",
    volume: "حجم",
    students: "دانشجویان",
    
    // Currency
    pkr: "روپیه پاکستان"
  }
};

const Home = () => {
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [exchangeRates, setExchangeRates] = useState([
    { currency: 'USD', rate: '278.50', change: '+0.5%', direction: 'up' },
    { currency: 'EUR', rate: '301.75', change: '-0.3%', direction: 'down' },
    { currency: 'GBP', rate: '352.25', change: '+0.8%', direction: 'up' },
    { currency: 'AED', rate: '75.80', change: '+0.2%', direction: 'up' },
    { currency: 'SAR', rate: '74.20', change: '-0.1%', direction: 'down' },
    { currency: 'CNY', rate: '38.45', change: '+0.4%', direction: 'up' }
  ]);

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const titleText = t.heroTitle1.split(" ");
  const subtitleText = t.heroTitle2.split(" ");

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: t.multiCurrencySupport,
      description: t.multiCurrencyDesc,
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t.secureTransactions,
      description: t.secureTransactionsDesc,
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t.instantExchange,
      description: t.instantExchangeDesc,
      color: "from-green-600 to-green-700"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t.mobileApp,
      description: t.mobileAppDesc,
      color: "from-red-600 to-red-700"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: t.support247,
      description: t.support247Desc,
      color: "from-green-500 to-green-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t.liveRates,
      description: t.liveRatesDesc,
      color: "from-red-500 to-red-600"
    }
  ];

  const benefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: t.bestRatesGuaranteed,
      description: t.bestRatesDesc
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t.fastProcessing,
      description: t.fastProcessingDesc
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t.happyCustomers,
      description: t.happyCustomersDesc
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t.fullyLicensed,
      description: t.fullyLicensedDesc
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: t.corporateSolutions,
      description: t.corporateSolutionsDesc
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: t.premiumService,
      description: t.premiumServiceDesc
    }
  ];

  const testimonials = [
    {
      name: "Mohammad Rizwan",
      role: "CEO, Rizwan Enterprises",
      content: t.testimonial1 || "Best currency exchange service in town. We've saved over 15% on our international transactions compared to banks. Competitive rates and excellent customer service!",
      rating: 5,
      image: bi,
      company: "Rizwan Enterprises"
    },
    {
      name: "Ayesha Khan",
      role: "International Travel Consultant",
      content: t.testimonial2 || "I arrange tours for hundreds of clients yearly and always use their service. Quick, reliable, and trustworthy. My clients appreciate the great rates!",
      rating: 5,
      image: boy,
      company: "Ayesha Travels"
    },
    {
      name: "Bilal Ahmed",
      role: "Import-Export Business Owner",
      content: t.testimonial3 || "Their online platform makes it so easy to manage currency for my import business. Real-time rates and instant transfers have streamlined our operations.",
      rating: 5,
      image: bib,
      company: "Ahmed Traders"
    },
    {
      name: "Fatima Ali",
      role: "Student (International Education)",
      content: t.testimonial4 || "Great rates for international tuition payments. Saved a lot of money compared to banks. Their student support team is very helpful!",
      rating: 5,
      image: bi,
      company: "University of London"
    }
  ];

  const stats = [
    { label: t.yearsOfExperience, value: '10+', icon: Clock },
    { label: t.happyCustomers, value: '15,000+', icon: Users },
    { label: t.currencies, value: '30+', icon: Globe },
    { label: t.branches, value: '3', icon: Landmark },
    { label: t.dailyTransactions, value: '500+', icon: TrendingUp },
    { label: t.corporateClients, value: '200+', icon: Building2 }
  ];

  const features = [
    t.noHiddenFees,
    t.realTimeRates,
    t.secureTransactions,
    t.instantConfirmation,
    t.support247,
    t.mobileApp,
    t.corporateAccounts,
    t.multiLanguage,
    t.freeRateAlerts,
    t.bulkDiscounts
  ];

  // Partners data
  const partners = [
    { name: "Habib Bank Ltd", icon: <Landmark className="w-8 h-8" />, category: t.bankingPartner, since: "2016" },
    { name: "United Bank Ltd", icon: <Building2 className="w-8 h-8" />, category: t.financialPartner, since: "2017" },
    { name: "Allied Bank", icon: <Briefcase className="w-8 h-8" />, category: t.bankingPartner, since: "2018" },
    { name: "Meezan Bank", icon: <Landmark className="w-8 h-8" />, category: t.islamicBanking, since: "2019" },
    { name: "Engro Corporation", icon: <Factory className="w-8 h-8" />, category: t.corporateClient, since: "2017" },
    { name: "Pakistan International Airlines", icon: <Plane className="w-8 h-8" />, category: t.aviationPartner, since: "2018" },
    { name: "Aga Khan University Hospital", icon: <Hospital className="w-8 h-8" />, category: t.healthcarePartner, since: "2020" },
    { name: "LUMS", icon: <GraduationCap className="w-8 h-8" />, category: t.educationPartner, since: "2019" },
    { name: "Daraz.pk", icon: <ShoppingBag className="w-8 h-8" />, category: t.ecommercePartner, since: "2021" },
    { name: "TCS Logistics", icon: <Truck className="w-8 h-8" />, category: t.logisticsPartner, since: "2018" },
    { name: "Systems Limited", icon: <Laptop className="w-8 h-8" />, category: t.technologyPartner, since: "2022" },
    { name: "Nestlé Pakistan", icon: <Factory className="w-8 h-8" />, category: t.corporateClient, since: "2019" }
  ];

  // Success stories
  const successStories = [
    { company: "TechStart Solutions", savings: "35%", duration: "2 years", story: t.reducedCosts },
    { company: "Global Traders PK", volume: "$5M+", duration: "3 years", story: t.processedVolume },
    { company: "EduConnect International", students: "500+", duration: "1 year", story: t.helpedStudents }
  ];

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-white overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
     {/* Hero Section */}
<motion.section 
  variants={fadeInUp}
  className="relative bg-black overflow-hidden min-h-[90vh] flex items-center"
>
  {/* Animated background */}
  <div className="absolute inset-0">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-red-500/20 animate-pulse-slow"></div>
    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-green-500/20 animate-pulse-slower"></div>
    
    {/* Floating particles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>

  {/* Decorative gradient bar */}
  <motion.div 
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-red-500 to-green-500 origin-left"
  />

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
    <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
      {/* Left Content */}
      <motion.div variants={fadeInLeft} className={isRTL ? 'text-right' : ''}>
        <motion.div
          variants={itemVariants}
          className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-green-500/30 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Sparkles className="w-4 h-4 text-green-400" />
          <span className="text-sm text-white">{t.heroBadge}</span>
        </motion.div>

        {/* Fixed heading - no character splitting for RTL languages */}
        {isRTL ? (
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-right"
            style={{ direction: 'rtl' }}
          >
            {t.heroTitle}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-red-400">
              {t.heroTitleGradient}
            </span>
          </motion.h1>
        ) : (
          <motion.h1 
            variants={wordVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {titleText.map((word, wordIndex) => (
              <motion.span key={wordIndex} className="inline-block mr-2">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            ))}
            <br />
            {subtitleText.map((word, wordIndex) => (
              <motion.span key={wordIndex} className="inline-block mr-2">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterVariants}
                    className={`inline-block ${word === 'Simple' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-red-400' : ''}`}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </motion.h1>
        )}

        <motion.p 
          variants={itemVariants}
          className={`text-gray-300 text-lg md:text-xl mb-8 max-w-xl ${isRTL ? 'text-right' : ''}`}
          style={isRTL ? { direction: 'rtl' } : {}}
        >
          {t.heroText}
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Link to="/sign-up">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold overflow-hidden shadow-lg hover:shadow-xl hover:shadow-green-500/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className={`relative flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t.getStarted}
                <ArrowRight size={18} className={`${isRTL ? 'ml-2 rotate-180' : 'mr-2'} group-hover:translate-x-1 transition-transform`} />
              </span>
            </motion.button>
          </Link>
          
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-500/10 transition-all duration-300"
            >
              {t.signIn}
            </motion.button>
          </Link>
        </motion.div>

        {/* Features list */}
        <motion.div 
          variants={itemVariants}
          className={`grid grid-cols-2 gap-4 mt-10 ${isRTL ? 'text-right' : ''}`}
        >
          {features.slice(0, 6).map((feature, index) => (
            <div key={index} className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}>
              <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
              <span className="text-gray-400 text-sm">{feature}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div 
          variants={itemVariants}
          className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'} mt-6`}
        >
          <div className={`flex ${isRTL ? '-space-x-reverse space-x-reverse' : '-space-x-2'}`}>
            {[1,2,3,4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-red-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                {i}
              </div>
            ))}
          </div>
          <span className="text-gray-400 text-sm">{t.trustedBy}</span>
        </motion.div>
      </motion.div>

      {/* Right Content - Exchange Rates Card */}
      <motion.div 
        variants={fadeInRight}
        className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 shadow-2xl"
      >
        <div className={`flex justify-between items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h3 className="text-white font-semibold text-lg">{t.liveExchangeRates}</h3>
          <span className="text-xs text-green-500 bg-green-500/10 px-3 py-1 rounded-full animate-pulse">{t.updatedRealTime}</span>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
          {exchangeRates.map((rate, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{rate.currency}</span>
                </div>
                <span className="text-white font-medium">{rate.currency}</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                <span className="text-white font-bold">{t.pkr} {rate.rate}</span>
                <span className={`text-sm ${
                  rate.direction === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {rate.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className={`w-full mt-6 bg-gradient-to-r from-gray-900 to-black text-white py-3 rounded-xl font-medium border border-gray-800 hover:border-green-500/30 transition-all duration-300 flex items-center justify-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'} group`}
        >
          <span>{t.viewAllCurrencies}</span>
          <ChevronRight size={16} className={`${isRTL ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
        </motion.button>
      </motion.div>
    </div>
  </div>

  {/* Animated wave at bottom */}
  <div className="absolute bottom-0 left-0 w-full">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
      <motion.path 
        fill="#ffffff" 
        fillOpacity="1" 
        d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
        animate={{
          d: [
            "M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z",
            "M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z",
            "M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ]
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
    </svg>
  </div>
</motion.section>

      {/* Stats Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`text-center group ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-green-500/10 to-red-500/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
            <motion.span 
              variants={itemVariants}
              className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2 block"
            >
              {t.ourServices}
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {t.whyChooseUs}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">
                ?
              </span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              {t.weProvide}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 ${isRTL ? 'text-right' : ''}`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:rotate-6 transition-all duration-300 group-hover:scale-110 ${isRTL ? 'mx-0' : ''}`}>
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
            <motion.span 
              variants={itemVariants}
              className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2 block"
            >
              {t.ourPartners}
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {t.companiesThatTrustUs}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              {t.partnersDesc}
            </motion.p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`group bg-white rounded-xl p-4 border border-gray-200 hover:border-green-500/30 hover:shadow-xl transition-all duration-300 text-center ${isRTL ? 'text-right' : ''}`}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-500/10 to-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="text-green-600">{partner.icon}</div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-500 mb-1">{partner.category}</p>
                <span className="text-xs text-green-600">{t.since} {partner.since}</span>
              </motion.div>
            ))}
          </div>

          {/* Success Stories */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 bg-gradient-to-r from-green-600 to-red-600 rounded-3xl p-10 text-white"
          >
            <h3 className={`text-2xl font-bold mb-6 text-center ${isRTL ? 'text-right' : ''}`}>{t.successStories}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="text-3xl font-bold mb-2">{story.savings || story.volume || story.students}</div>
                  <div className="text-lg font-semibold mb-1">{story.company}</div>
                  <p className="text-sm text-white/80">{story.story}</p>
                  <div className="mt-2 text-xs text-white/60">{story.duration}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className={`mt-12 flex flex-wrap justify-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">{t.isoCertified}</span>
            </div>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">{t.stateBankLicensed}</span>
            </div>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">{t.corporateClients}</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-black text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-cols-2' : ''}`}>
            <motion.div variants={fadeInLeft} className={isRTL ? 'text-right' : ''}>
              <motion.span 
                variants={itemVariants}
                className="text-green-500 font-semibold text-sm uppercase tracking-wider mb-2 block"
              >
                {t.whyChooseUsTitle}
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                {t.theSmartChoice}
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-gray-400 text-lg mb-8"
              >
                {t.benefitsDesc}
              </motion.p>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link to="/signup">
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-10 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 group"
                >
                  <span>{t.openAccount}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Right Content - Feature Grid */}
            <motion.div 
              variants={fadeInRight}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gray-900 rounded-xl p-6 text-center border border-gray-800 hover:border-green-500/30 transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <p className="text-white font-medium">{feature}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
            <motion.span 
              variants={itemVariants}
              className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2 block"
            >
              {t.simpleProcess}
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {t.howItWorks}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              {t.howItWorksDesc}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 via-red-500 to-green-500 transform -translate-y-1/2 hidden md:block"></div>

            {[
              { step: '01', title: t.chooseCurrency, description: t.chooseCurrencyDesc, icon: ArrowLeftRight },
              { step: '02', title: t.enterAmount, description: t.enterAmountDesc, icon: Wallet },
              { step: '03', title: t.lockRate, description: t.lockRateDesc, icon: CheckCircle },
              { step: '04', title: t.completeTransaction, description: t.completeTransactionDesc, icon: CreditCard }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className={`relative z-10 text-center ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600 mb-2">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={itemVariants}
            className={`mt-12 text-center ${isRTL ? 'text-right' : ''}`}
          >
            <p className="text-gray-600">
              {t.avgTransactionTime} <span className="font-bold text-green-600">{t.minutes}</span> | 
              {t.noHiddenFeesSmall} | 
              <span className="font-bold text-red-600"> {t.support247}</span>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
            <motion.span 
              variants={itemVariants}
              className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2 block"
            >
              {t.testimonials}
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {t.whatOurClientsSay}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              {t.testimonialsDesc}
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Active Testimonial */}
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-black rounded-3xl p-10 text-white relative overflow-hidden mb-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(34,197,94,0.1),_transparent_50%)]"></div>
              
              <div className="relative">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'} mb-6`}>
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500">
                    <img 
                      src={testimonials[activeTestimonial].image} 
                      alt={testimonials[activeTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h4 className="text-white font-bold text-lg">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-gray-400">{testimonials[activeTestimonial].role}</p>
                    <p className="text-green-500 text-sm">{testimonials[activeTestimonial].company}</p>
                  </div>
                </div>

                <div className={`flex mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-500 fill-current" />
                  ))}
                </div>

                <p className={`text-gray-300 text-lg italic ${isRTL ? 'text-right' : ''}`}>"{testimonials[activeTestimonial].content}"</p>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className={`flex justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index 
                      ? 'w-8 bg-gradient-to-r from-green-500 to-red-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Stats */}
            <motion.div
              variants={itemVariants}
              className={`flex justify-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'} mt-8`}
            >
              <div className={`text-center ${isRTL ? 'text-right' : ''}`}>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-gray-600">{t.fiveStarReviews}</div>
              </div>
              <div className={`text-center ${isRTL ? 'text-right' : ''}`}>
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-gray-600">{t.customerSatisfaction}</div>
              </div>
              <div className={`text-center ${isRTL ? 'text-right' : ''}`}>
                <div className="text-2xl font-bold text-gray-900">15k+</div>
                <div className="text-gray-600">{t.happyCustomers}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-green-600 to-red-600 rounded-3xl p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.2),_transparent_60%)]"
            />
            
            <div className="relative">
              <motion.h2 
                variants={itemVariants}
                className={`text-4xl md:text-5xl font-bold text-white mb-4 ${isRTL ? 'text-right text-center' : ''}`}
              >
                {t.readyToExchange}
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className={`text-white/90 text-xl mb-8 max-w-2xl mx-auto ${isRTL ? 'text-right' : ''}`}
              >
                {t.ctaText}
              </motion.p>
              
              <motion.div 
                variants={containerVariants}
                className={`flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  >
                    {t.openAccount}
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    {t.signIn}
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div 
                variants={containerVariants}
                className={`flex flex-wrap justify-center gap-8 mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {[
                  { icon: Shield, text: t.isoCertified },
                  { icon: Clock, text: t.support247 },
                  { icon: Globe, text: t.currencies },
                  { icon: Users, text: t.happyCustomers }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
                    >
                      <Icon size={16} className="text-white" />
                      <span className="text-white/80 text-sm">{item.text}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Animated rings */}
            <motion.div 
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-white/20 rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-white/10 rounded-full"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 4s ease-in-out infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #22c55e, #ef4444);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #16a34a, #dc2626);
        }
      `}</style>
    </motion.div>
  );
};

export default Home;