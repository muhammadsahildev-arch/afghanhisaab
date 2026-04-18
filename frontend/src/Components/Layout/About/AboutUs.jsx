import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award, 
  Shield, 
  TrendingUp,
  Globe,
  Clock,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Star,
  Heart,
  Handshake,
  Briefcase,
  Coffee,
  Zap
} from 'lucide-react';

// Language Translations
const translations = {
  en: {
    // Hero Section
    aboutOurCompany: "About Our Company",
    heroText: "Your trusted partner in currency exchange management since 2015. We help businesses grow with reliable and secure financial solutions.",
    learnMore: "Learn More",
    contactUs: "Contact Us",
    
    // Stats
    yearsOfExperience: "Years of Experience",
    happyCustomers: "Happy Customers",
    currenciesOffered: "Currencies Offered",
    branches: "Branches",
    dailyTransactions: "Daily Transactions",
    securityRating: "Security Rating",
    
    // Our Story
    ourStory: "Our Story",
    buildingTrustThrough: "Building Trust Through",
    excellence: "Excellence",
    storyP1: "Founded in 2015, CurrencyExchange started with a simple mission: to provide transparent, reliable, and efficient currency exchange services to businesses and individuals across Pakistan.",
    storyP2: "What began as a single branch in Karachi has grown into a trusted network of 3 branches serving thousands of satisfied customers. Our journey has been driven by innovation, integrity, and an unwavering commitment to customer satisfaction.",
    storyP3: "Today, we're proud to be at the forefront of currency exchange management technology, helping businesses streamline their operations while providing individuals with competitive rates and exceptional service.",
    isoCertified: "ISO 27001 Certified Security",
    realTimeRates: "Real-time Exchange Rates",
    multiCurrencySupport: "Multi-currency Support",
    roundTheClockService: "24/7 Customer Service",
    founded: "Founded",
    customers: "Customers",
    currencies: "Currencies",
    bestExchangeService: "Best Exchange Service",
    awarded: "Awarded",
    
    // Mission & Vision
    mission: "Mission",
    vision: "Vision",
    ourMission: "Our Mission",
    ourVision: "Our Vision",
    missionText: "To empower businesses and individuals with seamless, secure, and transparent currency exchange solutions that drive growth and foster financial inclusion across Pakistan.",
    visionText: "To become Pakistan's most trusted and innovative currency exchange platform, bridging the gap between local businesses and global markets through cutting-edge technology and exceptional service.",
    fastEfficient: "Fast & Efficient",
    secureTransactions: "Secure Transactions",
    bestRates: "Best Rates",
    support247: "24/7 Support",
    goal2025: "2025 Goal",
    newBranchesBy2025: "5 new branches by 2025",
    
    // Our Values
    whatWeStandFor: "What We Stand For",
    ourCoreValues: "Our Core",
    values: "Values",
    thePrinciples: "The principles that guide everything we do",
    securityFirst: "Security First",
    securityDesc: "Your transactions and data are protected with enterprise-grade security measures.",
    trustIntegrity: "Trust & Integrity",
    trustDesc: "We build lasting relationships through honest and transparent practices.",
    fastService: "Fast Service",
    fastDesc: "Quick and efficient currency exchange with minimal waiting time.",
    customerFocus: "Customer Focus",
    customerDesc: "Your satisfaction is our top priority. We go above and beyond for you.",
    accuracy: "Accuracy",
    accuracyDesc: "Precise calculations and up-to-date exchange rates guaranteed.",
    support247Desc: "Round-the-clock customer service for all your currency needs.",
    
    // Milestones
    ourJourney: "Our Journey",
    keyMilestones: "Key",
    milestones: "Milestones",
    companyFounded: "Company Founded",
    companyFoundedDesc: "Started with a single branch in Karachi",
    expansion: "Expansion",
    expansionDesc: "Opened second branch in Lahore",
    digitalPlatform: "Digital Platform",
    digitalPlatformDesc: "Launched online currency exchange platform",
    customersMilestone: "10,000+ Customers",
    customersMilestoneDesc: "Reached milestone of serving 10,000 happy clients",
    isoCertification: "ISO Certification",
    isoCertificationDesc: "Received ISO 27001 certification for security",
    branchesMilestone: "3 Branches & Growing",
    branchesMilestoneDesc: "Operating in 3 major cities with more coming soon",
    
    // Team Section
    ourTeam: "Our Team",
    meetTheExperts: "Meet The",
    experts: "Experts",
    dedicatedProfessionals: "Dedicated professionals committed to your success",
    experience: "experience",
    
    // Testimonials
    testimonials: "Testimonials",
    whatOurClientsSay: "What Our",
    clientsSay: "Clients Say",
    businessOwner: "Business Owner",
    frequentTraveler: "Frequent Traveler",
    importer: "Importer",
    testimonial1: "Best currency exchange service in town. Competitive rates and excellent customer service!",
    testimonial2: "I travel frequently for work and always use their service. Quick, reliable, and trustworthy.",
    testimonial3: "Their online platform makes it so easy to manage currency for my business. Highly recommended!",
    
    // CTA Section
    readyToGetStarted: "Ready to Get Started?",
    ctaText: "Join thousands of satisfied customers who trust us with their currency exchange needs",
    openAnAccount: "Open an Account",
    contactSales: "Contact Sales",
    isoCertified: "ISO Certified",
    globalReach: "Global Reach",
    
    // Company Name
    companyName: "CurrencyExchange"
  },
  ur: {
    // Hero Section
    aboutOurCompany: "ہماری کمپنی کے بارے میں",
    heroText: "2015 سے کرنسی ایکسچینج مینجمنٹ میں آپ کا قابل اعتماد پارٹنر۔ ہم کاروباروں کو قابل اعتماد اور محفوظ مالیاتی حل کے ساتھ بڑھنے میں مدد کرتے ہیں۔",
    learnMore: "مزید جانیں",
    contactUs: "رابطہ کریں",
    
    // Stats
    yearsOfExperience: "سال کا تجربہ",
    happyCustomers: "خوش گاہک",
    currenciesOffered: "کرنسیاں پیش کی گئیں",
    branches: "شاخیں",
    dailyTransactions: "روزانہ لین دین",
    securityRating: "سیکورٹی ریٹنگ",
    
    // Our Story
    ourStory: "ہماری کہانی",
    buildingTrustThrough: "بھروسہ تعمیر کرنا",
    excellence: "مہارت کے ذریعے",
    storyP1: "2015 میں قائم ہونے والا، CurrencyExchange ایک سادہ مشن کے ساتھ شروع ہوا: پاکستان بھر میں کاروباروں اور افراد کو شفاف، قابل اعتماد، اور موثر کرنسی ایکسچینج خدمات فراہم کرنا۔",
    storyP2: "کراچی میں ایک شاخ کے طور پر جو شروع ہوا وہ 3 شاخوں کے قابل اعتماد نیٹ ورک میں تبدیل ہو گیا ہے جو ہزاروں مطمئن گاہکوں کو خدمات فراہم کر رہا ہے۔ ہمارا سفر جدت، دیانتداری، اور گاہک کی اطمینان کے لیے غیر متزلزل عزم سے کارفرما رہا ہے۔",
    storyP3: "آج، ہمیں کرنسی ایکسچینج مینجمنٹ ٹیکنالوجی میں سب سے آگے ہونے پر فخر ہے، جو کاروباروں کو ان کے کاموں کو ہموار کرنے میں مدد کرتے ہیں جبکہ افراد کو مسابقتی شرحوں اور غیر معمولی خدمات فراہم کرتے ہیں۔",
    isoCertified: "ISO 27001 مصدقہ سیکورٹی",
    realTimeRates: "ریئل ٹائم ایکسچینج ریٹ",
    multiCurrencySupport: "متعدد کرنسی سپورٹ",
    roundTheClockService: "24/7 کسٹمر سروس",
    founded: "قائم ہوا",
    customers: "گاہک",
    currencies: "کرنسیاں",
    bestExchangeService: "بہترین ایکسچینج سروس",
    awarded: "ایوارڈ یافتہ",
    
    // Mission & Vision
    mission: "مشن",
    vision: "ویژن",
    ourMission: "ہمارا مشن",
    ourVision: "ہمارا ویژن",
    missionText: "کاروباروں اور افراد کو ہموار، محفوظ، اور شفاف کرنسی ایکسچینج حل فراہم کرنا جو پاکستان بھر میں ترقی کو فروغ دیں اور مالی شمولیت کو فروغ دیں۔",
    visionText: "پاکستان کا سب سے قابل اعتماد اور جدید کرنسی ایکسچینج پلیٹ فارم بننا، جدید ٹیکنالوجی اور غیر معمولی خدمات کے ذریعے مقامی کاروباروں اور عالمی منڈیوں کے درمیان فرق کو ختم کرنا۔",
    fastEfficient: "تیز اور موثر",
    secureTransactions: "محفوظ لین دین",
    bestRates: "بہترین شرحیں",
    support247: "24/7 سپورٹ",
    goal2025: "2025 کا ہدف",
    newBranchesBy2025: "2025 تک 5 نئی شاخیں",
    
    // Our Values
    whatWeStandFor: "ہم کس کے لیے کھڑے ہیں",
    ourCoreValues: "ہماری بنیادی",
    values: "قدریں",
    thePrinciples: "وہ اصول جو ہماری ہر چیز کی رہنمائی کرتے ہیں",
    securityFirst: "سیکورٹی پہلے",
    securityDesc: "آپ کے لین دین اور ڈیٹا کو انٹرپرائز گریڈ سیکورٹی اقدامات سے محفوظ کیا جاتا ہے۔",
    trustIntegrity: "اعتماد اور دیانتداری",
    trustDesc: "ہم ایماندار اور شفاف طریقوں سے دیرپا تعلقات استوار کرتے ہیں۔",
    fastService: "تیز سروس",
    fastDesc: "کم سے کم انتظار کے وقت کے ساتھ تیز اور موثر کرنسی ایکسچینج۔",
    customerFocus: "گاہک پر توجہ",
    customerDesc: "آپ کی اطمینان ہماری اولین ترجیح ہے۔ ہم آپ کے لیے حد سے بڑھ کر جاتے ہیں۔",
    accuracy: "درستگی",
    accuracyDesc: "درست حسابات اور تازہ ترین ایکسچینج ریٹ ضمانت شدہ۔",
    support247Desc: "آپ کی تمام کرنسی ضروریات کے لیے 24/7 کسٹمر سروس۔",
    
    // Milestones
    ourJourney: "ہمارا سفر",
    keyMilestones: "اہم",
    milestones: "میل کے پتھر",
    companyFounded: "کمپنی قائم ہوئی",
    companyFoundedDesc: "کراچی میں ایک شاخ سے شروع کیا",
    expansion: "توسیع",
    expansionDesc: "لاہور میں دوسری شاخ کھولی",
    digitalPlatform: "ڈیجیٹل پلیٹ فارم",
    digitalPlatformDesc: "آن لائن کرنسی ایکسچینج پلیٹ فارم لانچ کیا",
    customersMilestone: "10,000+ گاہک",
    customersMilestoneDesc: "10,000 خوش گاہکوں کی خدمت کا سنگ میل حاصل کیا",
    isoCertification: "آئی ایس او سرٹیفیکیشن",
    isoCertificationDesc: "سیکورٹی کے لیے ISO 27001 سرٹیفیکیشن حاصل کیا",
    branchesMilestone: "3 شاخیں اور بڑھ رہی ہیں",
    branchesMilestoneDesc: "3 بڑے شہروں میں کام کر رہے ہیں اور مزید آنے والے ہیں",
    
    // Team Section
    ourTeam: "ہماری ٹیم",
    meetTheExperts: "ماہرین سے",
    experts: "ملیں",
    dedicatedProfessionals: "آپ کی کامیابی کے لیے وقف پیشہ ور",
    experience: "سال کا تجربہ",
    
    // Testimonials
    testimonials: "گاہکوں کے تجربات",
    whatOurClientsSay: "ہمارے",
    clientsSay: "گاہک کیا کہتے ہیں",
    businessOwner: "کاروباری مالک",
    frequentTraveler: "بار بار سفر کرنے والا",
    importer: "درآمد کنندہ",
    testimonial1: "شہر میں بہترین کرنسی ایکسچینج سروس۔ مسابقتی شرحیں اور بہترین کسٹمر سروس!",
    testimonial2: "میں کام کے لیے اکثر سفر کرتا ہوں اور ہمیشہ ان کی سروس استعمال کرتا ہوں۔ تیز، قابل اعتماد، اور بھروسہ مند۔",
    testimonial3: "ان کا آن لائن پلیٹ فارم میرے کاروبار کے لیے کرنسی کا انتظام بہت آسان بناتا ہے۔ انتہائی سفارش کی جاتی ہے!",
    
    // CTA Section
    readyToGetStarted: "شروع کرنے کے لیے تیار ہیں؟",
    ctaText: "ہزاروں مطمئن گاہکوں میں شامل ہوں جو ہم پر اپنی کرنسی ایکسچینج کی ضروریات کے لیے بھروسہ کرتے ہیں",
    openAnAccount: "اکاؤنٹ کھولیں",
    contactSales: "سیلز سے رابطہ کریں",
    isoCertified: "آئی ایس او مصدقہ",
    globalReach: "عالمی رسائی",
    
    // Company Name
    companyName: "کرنسی ایکسچینج"
  },
  ps: {
    // Hero Section
    aboutOurCompany: "زموږ د شرکت په اړه",
    heroText: "له 2015 راهیسې د اسعارو تبادلې مدیریت کې ستاسو باوري شریک. موږ سوداګرۍ سره د باوري او خوندي مالي حلونو سره وده کولو کې مرسته کوو.",
    learnMore: "نور زده کړئ",
    contactUs: "موږ سره اړیکه ونیسئ",
    
    // Stats
    yearsOfExperience: "کلونه تجربه",
    happyCustomers: "خوشحاله پیرودونکي",
    currenciesOffered: "وړاندې شوي اسعار",
    branches: "څانګې",
    dailyTransactions: "ورځني راکړې ورکړې",
    securityRating: "امنیت درجه بندي",
    
    // Our Story
    ourStory: "زموږ کیسه",
    buildingTrustThrough: "باور جوړول",
    excellence: "د غوړتیا له لارې",
    storyP1: "په 2015 کې تاسیس شوی، CurrencyExchange یو ساده ماموریت سره پیل شو: په ټول پاکستان کې سوداګرۍ او افرادو ته روښانه، باوري، او اغیزمن اسعارو تبادلې خدمتونه چمتو کول.",
    storyP2: "هغه څه چې په کراچۍ کې د یوې څانګې په توګه پیل شول د 3 څانګو باوري شبکې ته وده ورکړه چې زرګونو راضي پیرودونکو ته خدمت کوي. زموږ سفر د نوښت، صداقت، او د پیرودونکي رضایت لپاره د نه بدلیدونکي ژمنې لخوا پرمخ وړل شوی دی.",
    storyP3: "نن، موږ ویاړو چې د اسعارو تبادلې مدیریت ټیکنالوژۍ په سر کې یو، سوداګرۍ سره مرسته کوو چې خپل عملیات منظم کړي پداسې حال کې چې افرادو ته سیالي نرخونه او غیر معمولي خدمت وړاندې کوي.",
    isoCertified: "ISO 27001 تصدیق شوی امنیت",
    realTimeRates: "ریښتیني وخت تبادلې نرخونه",
    multiCurrencySupport: "څو اسعارو ملاتړ",
    roundTheClockService: "24/7 پیرودونکي خدمت",
    founded: "تاسیس شو",
    customers: "پیرودونکي",
    currencies: "اسعار",
    bestExchangeService: "غوره تبادله خدمت",
    awarded: "جايزه يافته",
    
    // Mission & Vision
    mission: "ماموریت",
    vision: "لید",
    ourMission: "زموږ ماموریت",
    ourVision: "زموږ لید",
    missionText: "سوداګرۍ او افرادو ته د اسعارو د تبادلې بې ساري، خوندي، او روښانه حلونو سره ځواک ورکول چې په ټول پاکستان کې وده او مالي شمولیت ته وده ورکړي.",
    visionText: "د پاکستان ترټولو باوري او نوښتګر اسعارو تبادلې پلیټ فارم شي، د پرمختللي ټیکنالوژۍ او غیر معمولي خدمت له لارې د محلي سوداګرۍ او نړیوالو بازارونو ترمنځ واټن کمول.",
    fastEfficient: "چټک او اغیزمن",
    secureTransactions: "خوندي راکړې ورکړې",
    bestRates: "غوره نرخونه",
    support247: "24/7 ملاتړ",
    goal2025: "2025 هدف",
    newBranchesBy2025: "د 2025 پورې 5 نوي څانګې",
    
    // Our Values
    whatWeStandFor: "موږ د څه لپاره ولاړ یو",
    ourCoreValues: "زموږ اصلي",
    values: "ارزښتونه",
    thePrinciples: "اصول چې هرڅه لارښوونه کوي موږ کوو",
    securityFirst: "امنیت لومړی",
    securityDesc: "ستاسو راکړې ورکړې او معلومات د تصدۍ درجې امنیتي اقداماتو سره خوندي دي.",
    trustIntegrity: "باور او صداقت",
    trustDesc: "موږ د صادقانه او روښانه کړنو له لارې دوامداره اړیکې جوړوو.",
    fastService: "چټک خدمت",
    fastDesc: "لږترلږه انتظار وخت سره چټک او اغیزمن اسعارو تبادله.",
    customerFocus: "پیرودونکي تمرکز",
    customerDesc: "ستاسو رضایت زموږ لومړیتوب دی. موږ ستاسو لپاره له حد څخه تیریږو.",
    accuracy: "دقت",
    accuracyDesc: "قیاسي محاسبې او تر تازه پورې د تبادلې نرخونه تضمین شوي.",
    support247Desc: "ستاسو د ټولو اسعارو اړتیاو لپاره 24/7 پیرودونکي خدمت.",
    
    // Milestones
    ourJourney: "زموږ سفر",
    keyMilestones: "کلیدي",
    milestones: "نښې",
    companyFounded: "شرکت تاسیس شو",
    companyFoundedDesc: "په کراچۍ کې د یوې څانګې سره پیل شو",
    expansion: "پراختیا",
    expansionDesc: "په لاهور کې دوهمه څانګه پرانیستل شوه",
    digitalPlatform: "ډیجیټل پلیټ فارم",
    digitalPlatformDesc: "آنلاین اسعارو تبادلې پلیټ فارم پیل شو",
    customersMilestone: "10,000+ پیرودونکي",
    customersMilestoneDesc: "د 10,000 خوشحاله پیرودونکو خدمت کولو نښه ترلاسه شوه",
    isoCertification: "ISO تصدیق",
    isoCertificationDesc: "د امنیت لپاره ISO 27001 تصدیق ترلاسه شو",
    branchesMilestone: "3 څانګې او وده کوي",
    branchesMilestoneDesc: "په 3 لویو ښارونو کې عملیات او نور ژر راځي",
    
    // Team Section
    ourTeam: "زموږ ټیم",
    meetTheExperts: "متخصصین سره",
    experts: "ووینئ",
    dedicatedProfessionals: "مسلکیان ستاسو بریا ته وقف شوي",
    experience: "کلونه تجربه",
    
    // Testimonials
    testimonials: "تعریفونه",
    whatOurClientsSay: "زموږ",
    clientsSay: "پیرودونکي څه وايي",
    businessOwner: "سوداګرۍ مالک",
    frequentTraveler: "پرله پسې مسافر",
    importer: "واردونکی",
    testimonial1: "په ښار کې غوره اسعارو تبادله خدمت. سیالي نرخونه او غوره پیرودونکي خدمت!",
    testimonial2: "زه د کار لپاره په مکرر ډول سفر کوم او تل د دوی خدمت کاروم. چټک، باوري، او د باور وړ.",
    testimonial3: "د دوی آنلاین پلیټ فارم زما د سوداګرۍ لپاره د اسعارو اداره کول خورا اسانه کوي. خورا سپارښتنه کیږي!",
    
    // CTA Section
    readyToGetStarted: "د پیل کولو لپاره چمتو یاست؟",
    ctaText: "د زرګونو راضي پیرودونکو سره یوځای شئ څوک چې زموږ په اسعارو تبادله اړتیاو باور لري",
    openAnAccount: "حساب خلاص کړئ",
    contactSales: "پلور سره اړیکه ونیسئ",
    isoCertified: "ISO تصدیق شوی",
    globalReach: "نړیوال لاسرسی",
    
    // Company Name
    companyName: "اسعارو تبادله"
  },
  fa: {
    // Hero Section
    aboutOurCompany: "درباره شرکت ما",
    heroText: "شریک قابل اعتماد شما در مدیریت تبادل ارز از سال 2015. ما به کسب‌وکارها کمک می‌کنیم با راه‌حل‌های مالی قابل اعتماد و امن رشد کنند.",
    learnMore: "بیشتر بدانید",
    contactUs: "تماس با ما",
    
    // Stats
    yearsOfExperience: "سال تجربه",
    happyCustomers: "مشتریان راضی",
    currenciesOffered: "ارزهای ارائه شده",
    branches: "شعبه‌ها",
    dailyTransactions: "تراکنش‌های روزانه",
    securityRating: "رتبه امنیتی",
    
    // Our Story
    ourStory: "داستان ما",
    buildingTrustThrough: "ساخت اعتماد از طریق",
    excellence: "تعالی",
    storyP1: "تاسیس شده در 2015، CurrencyExchange با یک ماموریت ساده شروع شد: ارائه خدمات تبادل ارز شفاف، قابل اعتماد و کارآمد به کسب‌وکارها و افراد در سراسر پاکستان.",
    storyP2: "آنچه به عنوان یک شعبه در کراچی آغاز شد به شبکه قابل اعتمادی از 3 شعبه تبدیل شده است که به هزاران مشتری راضی خدمات ارائه می‌دهد. سفر ما با نوآوری، صداقت و تعهد تزلزل‌ناپذیر به رضایت مشتری هدایت شده است.",
    storyP3: "امروز، ما به خود می‌بالیم که در خط مقدم فناوری مدیریت تبادل ارز هستیم و به کسب‌وکارها کمک می‌کنیم عملیات خود را ساده‌سازی کنند در حالی که به افراد نرخ‌های رقابتی و خدمات استثنایی ارائه می‌دهیم.",
    isoCertified: "امنیت گواهی شده ISO 27001",
    realTimeRates: "نرخ‌های لحظه‌ای ارز",
    multiCurrencySupport: "پشتیبانی چند ارزی",
    roundTheClockService: "خدمات مشتری 24/7",
    founded: "تاسیس",
    customers: "مشتریان",
    currencies: "ارزها",
    bestExchangeService: "بهترین خدمات تبادل",
    awarded: "برنده جایزه",
    
    // Mission & Vision
    mission: "ماموریت",
    vision: "چشم‌انداز",
    ourMission: "ماموریت ما",
    ourVision: "چشم‌انداز ما",
    missionText: "توانمندسازی کسب‌وکارها و افراد با راه‌حل‌های تبادل ارز یکپارچه، امن و شفاف که باعث رشد و ترویج شمول مالی در سراسر پاکستان می‌شود.",
    visionText: "تبدیل شدن به قابل اعتمادترین و نوآورترین پلتفرم تبادل ارز پاکستان، پر کردن شکاف بین کسب‌وکارهای محلی و بازارهای جهانی از طریق فناوری پیشرفته و خدمات استثنایی.",
    fastEfficient: "سریع و کارآمد",
    secureTransactions: "تراکنش‌های امن",
    bestRates: "بهترین نرخ‌ها",
    support247: "پشتیبانی 24/7",
    goal2025: "هدف 2025",
    newBranchesBy2025: "5 شعبه جدید تا 2025",
    
    // Our Values
    whatWeStandFor: "چیزی که ما برای آن ایستاده‌ایم",
    ourCoreValues: "ارزش‌های اصلی",
    values: "ما",
    thePrinciples: "اصولی که همه چیز را راهنمایی می‌کند",
    securityFirst: "امنیت اول",
    securityDesc: "تراکنش‌ها و داده‌های شما با اقدامات امنیتی در سطح سازمانی محافظت می‌شوند.",
    trustIntegrity: "اعتماد و صداقت",
    trustDesc: "ما روابط ماندگار را از طریق شیوه‌های صادقانه و شفاف ایجاد می‌کنیم.",
    fastService: "خدمت سریع",
    fastDesc: "تبادل ارز سریع و کارآمد با حداقل زمان انتظار.",
    customerFocus: "تمرکز بر مشتری",
    customerDesc: "رضایت شما اولویت اصلی ماست. ما فراتر از انتظارات شما می‌رویم.",
    accuracy: "دقت",
    accuracyDesc: "محاسبات دقیق و نرخ‌های به‌روز ارز تضمین شده.",
    support247Desc: "خدمات مشتری شبانه‌روزی برای تمام نیازهای ارزی شما.",
    
    // Milestones
    ourJourney: "سفر ما",
    keyMilestones: "نقاط عطف",
    milestones: "کلیدی",
    companyFounded: "شرکت تاسیس شد",
    companyFoundedDesc: "با یک شعبه در کراچی شروع شد",
    expansion: "توسعه",
    expansionDesc: "شعبه دوم در لاهور افتتاح شد",
    digitalPlatform: "پلتفرم دیجیتال",
    digitalPlatformDesc: "پلتفرم تبادل ارز آنلاین راه‌اندازی شد",
    customersMilestone: "بیش از 10,000 مشتری",
    customersMilestoneDesc: "به نقطه عطف خدمت به 10,000 مشتری راضی رسیدیم",
    isoCertification: "گواهینامه ISO",
    isoCertificationDesc: "گواهینامه ISO 27001 برای امنیت دریافت شد",
    branchesMilestone: "3 شعبه و در حال رشد",
    branchesMilestoneDesc: "فعالیت در 3 شهر بزرگ با شعبه‌های بیشتر در آینده",
    
    // Team Section
    ourTeam: "تیم ما",
    meetTheExperts: "با",
    experts: "کارشناسان آشنا شوید",
    dedicatedProfessionals: "متخصصان متعهد به موفقیت شما",
    experience: "سال تجربه",
    
    // Testimonials
    testimonials: "نظرات مشتریان",
    whatOurClientsSay: "مشتریان ما",
    clientsSay: "چه می‌گویند",
    businessOwner: "صاحب کسب‌وکار",
    frequentTraveler: "مسافر مکرر",
    importer: "واردکننده",
    testimonial1: "بهترین خدمات تبادل ارز در شهر. نرخ‌های رقابتی و خدمات عالی به مشتریان!",
    testimonial2: "من اغلب برای کار سفر می‌کنم و همیشه از خدمات آنها استفاده می‌کنم. سریع، قابل اعتماد و مورد اعتماد.",
    testimonial3: "پلتفرم آنلاین آنها مدیریت ارز را برای کسب‌وکار من بسیار آسان می‌کند. بسیار توصیه می‌شود!",
    
    // CTA Section
    readyToGetStarted: "آماده برای شروع هستید؟",
    ctaText: "به هزاران مشتری راضی بپیوندید که نیازهای تبادل ارز خود را به ما می‌سپارند",
    openAnAccount: "افتتاح حساب",
    contactSales: "تماس با فروش",
    isoCertified: "گواهی ISO",
    globalReach: "دسترسی جهانی",
    
    // Company Name
    companyName: "تبدیل ارز"
  }
};

const AboutUs = () => {
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [activeTab, setActiveTab] = useState('mission');
  const [animatedValues, setAnimatedValues] = useState([]);
  
  // Refs for animation
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = [];
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe sections
    const sections = [heroRef, storyRef, valuesRef, teamRef, statsRef, ctaRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
        observers.push({ ref: ref.current, observer });
      }
    });

    return () => {
      observers.forEach(({ ref, observer }) => {
        observer.unobserve(ref);
      });
    };
  }, []);

  // Typing animation for hero text
  const [heroText, setHeroText] = useState('');
  const fullHeroText = t.heroText;
  
  useEffect(() => {
    setHeroText('');
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < fullHeroText.length) {
        setHeroText(fullHeroText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 30);

    return () => clearInterval(typingEffect);
  }, [currentLang, fullHeroText]);

  const milestones = [
    { year: '2015', title: t.companyFounded, description: t.companyFoundedDesc, icon: Briefcase },
    { year: '2017', title: t.expansion, description: t.expansionDesc, icon: TrendingUp },
    { year: '2019', title: t.digitalPlatform, description: t.digitalPlatformDesc, icon: Globe },
    { year: '2021', title: t.customersMilestone, description: t.customersMilestoneDesc, icon: Users },
    { year: '2023', title: t.isoCertification, description: t.isoCertificationDesc, icon: Award },
    { year: '2024', title: t.branchesMilestone, description: t.branchesMilestoneDesc, icon: Star }
  ];

  const values = [
    {
      icon: Shield,
      title: t.securityFirst,
      description: t.securityDesc,
      color: 'from-green-500 to-green-600',
      delay: '0.1s'
    },
    {
      icon: Handshake,
      title: t.trustIntegrity,
      description: t.trustDesc,
      color: 'from-red-500 to-red-600',
      delay: '0.2s'
    },
    {
      icon: Zap,
      title: t.fastService,
      description: t.fastDesc,
      color: 'from-green-600 to-green-700',
      delay: '0.3s'
    },
    {
      icon: Heart,
      title: t.customerFocus,
      description: t.customerDesc,
      color: 'from-red-600 to-red-700',
      delay: '0.4s'
    },
    {
      icon: Target,
      title: t.accuracy,
      description: t.accuracyDesc,
      color: 'from-green-500 to-green-600',
      delay: '0.5s'
    },
    {
      icon: Coffee,
      title: t.support247,
      description: t.support247Desc,
      color: 'from-red-500 to-red-600',
      delay: '0.6s'
    }
  ];

  const team = [
    {
      name: 'Dawood Khan',
      position: 'Founder & CEO',
      experience: '15+',
      image: 'https://i.ibb.co/cX7XVTbr/Gemini-Generated-Image-utgx8jutgx8jutgx.png',
      bio: 'Former banker with extensive experience in foreign exchange markets.',
      social: ['twitter', 'linkedin', 'facebook']
    },
    {
      name: 'Prince',
      position: 'CEO & VP',
      experience: '12+',
      image: 'https://i.ibb.co/kssYBSGy/Gemini-Generated-Image-w0smbrw0smbrw0sm.png',
      bio: 'Expert in financial operations and customer service excellence.',
      social: ['linkedin', 'twitter']
    },
    {
      name: 'Zerena Chaudhry',
      position: 'Head of Trading',
      experience: '10+',
      image: 'https://i.ibb.co/d499fD43/1.avif',
      bio: 'Specializes in forex trading and market analysis.',
      social: ['linkedin', 'twitter', 'instagram']
    },
    {
      name: 'Sara Ahmed',
      position: 'Customer Relations',
      experience: '8+',
      image: 'https://i.ibb.co/Rp5dR62J/bi.avif',
      bio: 'Dedicated to providing exceptional customer experiences.',
      social: ['linkedin', 'facebook']
    }
  ];

  const stats = [
    { label: t.yearsOfExperience, value: '10+', icon: Clock, color: 'green' },
    { label: t.happyCustomers, value: '15,000+', icon: Users, color: 'red' },
    { label: t.currenciesOffered, value: '30+', icon: Globe, color: 'green' },
    { label: t.branches, value: '3', icon: Briefcase, color: 'red' },
    { label: t.dailyTransactions, value: '500+', icon: TrendingUp, color: 'green' },
    { label: t.securityRating, value: '99.9%', icon: Shield, color: 'red' }
  ];

  const testimonials = [
    {
      name: 'Mohammad Rizwan',
      role: t.businessOwner,
      content: t.testimonial1,
      rating: 5,
      image: 'https://i.ibb.co/FL03gKVW/boy.avif'
    },
    {
      name: 'Ayesha Khan',
      role: t.frequentTraveler,
      content: t.testimonial2,
      rating: 5,
      image: 'https://i.ibb.co/PGZGZt0h/b.jpg'
    },
    {
      name: 'Bilal Ahmed',
      role: t.importer,
      content: t.testimonial3,
      rating: 5,
      image: 'https://i.ibb.co/B5zVGXBR/b.jpg'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  const titleText = t.aboutOurCompany.split(" ");

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
    <div className="min-h-screen bg-white overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-black overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-red-500/20 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-green-500/20 animate-pulse-slower"></div>
          
          {/* Floating particles */}
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-500 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            className="absolute top-3/4 left-1/2 w-3 h-3 bg-red-500 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, -25, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ repeat: Infinity, duration: 4.5, delay: 2 }}
            className="absolute top-1/2 left-3/4 w-2 h-2 bg-green-500 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, -35, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ repeat: Infinity, duration: 5.5, delay: 0.5 }}
            className="absolute top-1/3 left-2/3 w-4 h-4 bg-red-500 rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated heading with word reveal */}
            <motion.div
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ${isRTL ? 'text-right' : ''}`}
            >
              {titleText.map((word, wordIndex) => (
                <motion.span key={wordIndex} className="inline-block mr-2">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={letterVariants}
                      className={`inline-block ${word === 'Company' || word === 'کمپنی' || word === 'شرکت' || word === 'ما' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-red-400' : ''}`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.div>

            {/* Typing animation */}
            <motion.p
              variants={itemVariants}
              className={`text-gray-300 text-lg md:text-xl max-w-3xl mx-auto ${isRTL ? 'text-right' : ''}`}
            >
              {heroText}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className={`flex flex-wrap justify-center gap-4 mt-10 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className={`relative flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t.learnMore}
                  <ChevronRight size={18} className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
                </span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-500/10 transition-all duration-300"
              >
                {t.contactUs}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Animated wave */}
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
      </motion.div>

      {/* Stats Section */}
      <motion.div
        ref={statsRef}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.05 }}
                className="bg-black rounded-2xl p-6 text-center group cursor-pointer border border-gray-800 hover:border-green-500/30 transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: 6 }}
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center transition-transform duration-300`}
                >
                  <Icon size={24} className="text-white" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`text-2xl font-bold text-${stat.color}-500 mb-1`}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Our Story Section */}
      <motion.div
        ref={storyRef}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-cols-2' : ''}`}>
          {/* Left side - Content */}
          <motion.div variants={fadeInLeft} className={isRTL ? 'text-right' : ''}>
            <motion.span 
              variants={itemVariants}
              className="text-green-500 font-semibold text-sm uppercase tracking-wider mb-2 block"
            >
              {t.ourStory}
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-black mb-6"
            >
              {t.buildingTrustThrough}{' '}
              <span className="bg-gradient-to-r from-green-500 to-red-500 bg-clip-text text-transparent">
                {t.excellence}
              </span>
            </motion.h2>
            
            <motion.div variants={itemVariants} className="space-y-4 text-gray-600">
              <motion.p variants={itemVariants}>{t.storyP1}</motion.p>
              <motion.p variants={itemVariants}>{t.storyP2}</motion.p>
              <motion.p variants={itemVariants}>{t.storyP3}</motion.p>
            </motion.div>

            {/* Features list */}
            <motion.div variants={itemVariants} className="mt-8 space-y-3">
              {[
                t.isoCertified,
                t.realTimeRates,
                t.multiCurrencySupport,
                t.roundTheClockService
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                  className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}
                >
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Image/Stats */}
          <motion.div 
            variants={fadeInRight}
            className="relative"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-black rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-red-500/10"></div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '2015', label: t.founded, color: 'green' },
                    { value: '3', label: t.branches, color: 'red' },
                    { value: '15k+', label: t.customers, color: 'green' },
                    { value: '30+', label: t.currencies, color: 'red' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-4 bg-white/5 rounded-xl"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                        className={`text-3xl font-bold text-${item.color}-500 mb-1`}
                      >
                        {item.value}
                      </motion.div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative elements */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"
                />
              </div>
            </motion.div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className={`absolute -bottom-6 ${isRTL ? '-right-6' : '-left-6'} bg-black rounded-xl p-4 shadow-2xl border border-green-500/30`}
            >
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}>
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 bg-gradient-to-br from-green-500 to-red-500 rounded-lg flex items-center justify-center"
                >
                  <Award size={20} className="text-white" />
                </motion.div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-white text-sm font-semibold">{t.bestExchangeService}</p>
                  <p className="text-gray-400 text-xs">{t.awarded} 2023</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission & Vision Tabs */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-4xl mx-auto">
          {/* Tab Buttons */}
          <motion.div variants={itemVariants} className={`flex justify-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'} mb-8`}>
            {['mission', 'vision'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-green-500 to-red-500 text-white shadow-lg'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {tab === 'mission' ? t.mission : t.vision}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(34,197,94,0.1),_transparent_50%)]"></div>
            
            <div className="relative">
              {activeTab === 'mission' ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={scaleIn}>
                    <Target size={48} className="text-green-500 mb-4" />
                  </motion.div>
                  <motion.h3 variants={itemVariants} className={`text-2xl font-bold text-white mb-4 ${isRTL ? 'text-right' : ''}`}>
                    {t.ourMission}
                  </motion.h3>
                  <motion.p variants={itemVariants} className={`text-gray-300 text-lg leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                    {t.missionText}
                  </motion.p>
                  <motion.div variants={itemVariants} className="mt-6 grid grid-cols-2 gap-4">
                    {[t.fastEfficient, t.secureTransactions, t.bestRates, t.support247].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}
                      >
                        <CheckCircle size={18} className="text-green-500" />
                        <span className="text-gray-400">{item}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={scaleIn}>
                    <TrendingUp size={48} className="text-red-500 mb-4" />
                  </motion.div>
                  <motion.h3 variants={itemVariants} className={`text-2xl font-bold text-white mb-4 ${isRTL ? 'text-right' : ''}`}>
                    {t.ourVision}
                  </motion.h3>
                  <motion.p variants={itemVariants} className={`text-gray-300 text-lg leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                    {t.visionText}
                  </motion.p>
                  <motion.div variants={itemVariants} className="mt-8">
                    <div className="relative pt-1">
                      <div className={`flex mb-2 items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                            {t.goal2025}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-green-600">
                            70%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '70%' }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-red-500"
                        />
                      </div>
                    </div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className={`text-gray-400 text-sm ${isRTL ? 'text-right' : ''}`}
                    >
                      {t.newBranchesBy2025}
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Our Values */}
      <motion.div
        ref={valuesRef}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-black py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.span 
              variants={itemVariants}
              className="text-green-500 font-semibold text-sm uppercase tracking-wider mb-2 block"
            >
              {t.whatWeStandFor}
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              {t.ourCoreValues}{' '}
              <span className="bg-gradient-to-r from-green-400 to-red-400 bg-clip-text text-transparent">
                {t.values}
              </span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              {t.thePrinciples}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  <motion.div 
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 transition-all duration-300`}
                  >
                    <Icon size={32} className="text-white" />
                  </motion.div>
                  <h3 className={`text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors ${isRTL ? 'text-right' : ''}`}>
                    {value.title}
                  </h3>
                  <p className={`text-gray-400 ${isRTL ? 'text-right' : ''}`}>
                    {value.description}
                  </p>
                  
                  {/* Hover effect line */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-red-500 origin-left"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Milestones Timeline */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center mb-12">
          <motion.span 
            variants={itemVariants}
            className="text-green-500 font-semibold text-sm uppercase tracking-wider mb-2 block"
          >
            {t.ourJourney}
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-black mb-4"
          >
            {t.keyMilestones}{' '}
            <span className="bg-gradient-to-r from-green-500 to-red-500 bg-clip-text text-transparent">
              {t.milestones}
            </span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-red-500 to-green-500 hidden lg:block origin-top"
          />

          <div className="space-y-8 lg:space-y-0">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  className={`relative lg:flex ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:mb-8`}
                >
                  {/* Content */}
                  <div className={`lg:w-1/2 ${isEven ? (isRTL ? 'lg:pl-12' : 'lg:pr-12') : (isRTL ? 'lg:pr-12' : 'lg:pl-12')}`}>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-black rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300 group"
                    >
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'}`}>
                        <motion.div 
                          whileHover={{ rotate: 6 }}
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center transition-transform"
                        >
                          <Icon size={24} className="text-white" />
                        </motion.div>
                        <div className={isRTL ? 'text-right' : ''}>
                          <span className="text-green-500 font-bold text-lg">{milestone.year}</span>
                          <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors">
                            {milestone.title}
                          </h3>
                        </div>
                      </div>
                      <p className={`text-gray-400 mt-3 text-sm ${isRTL ? 'text-right' : ''}`}>{milestone.description}</p>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-red-500 rounded-full hidden lg:block"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-gradient-to-r from-green-500 to-red-500 rounded-full opacity-50"
                    />
                  </motion.div>

                  {/* Empty space for other side */}
                  <div className="lg:w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

   {/* Team Section */}
{/* Team Section */}
<motion.div
  ref={teamRef}
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  className="bg-black py-16"
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <motion.span 
        variants={itemVariants}
        className="text-green-500 font-semibold text-sm uppercase tracking-wider mb-2 block"
      >
        {t.ourTeam}
      </motion.span>
      <motion.h2 
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold text-white mb-4"
      >
        {t.meetTheExperts}{' '}
        <span className="bg-gradient-to-r from-green-400 to-red-400 bg-clip-text text-transparent">
          {t.experts}
        </span>
      </motion.h2>
      <motion.p 
        variants={itemVariants}
        className="text-gray-400 max-w-2xl mx-auto"
      >
        {t.dedicatedProfessionals}
      </motion.p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((member, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          custom={index}
          whileHover={{ y: -10, scale: 1.02 }}
          className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/30 transition-all duration-300"
        >
          <div className="relative overflow-hidden" style={{ paddingTop: '125%' }}> {/* 4:5 Aspect Ratio */}
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              src={member.image} 
              alt={member.name}
              className="absolute top-0 left-0 w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x500?text=' + member.name.split(' ')[0];
              }}
            />
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
            />
            
            {/* Social icons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
            >
              {member.social.map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                >
                  {social === 'twitter' && (
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.905-5.688c.424-.994.642-2.052.642-3.125 0-.213-.005-.426-.014-.637A10.038 10.038 0 0024 4.57z"/>
                    </svg>
                  )}
                  {social === 'linkedin' && (
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
                    </svg>
                  )}
                  {social === 'facebook' && (
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  {social === 'instagram' && (
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          <div className="p-6">
            <h3 className="text-white font-bold text-lg mb-1 group-hover:text-green-400 transition-colors">
              {member.name}
            </h3>
            <p className="text-green-500 text-sm mb-2">{member.position}</p>
            <p className="text-gray-400 text-xs mb-2">{member.experience} {t.experience}</p>
            <p className="text-gray-500 text-sm">{member.bio}</p>
          </div>

          {/* Experience badge */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10"
          >
            {member.experience}+
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>
      {/* Testimonials Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center mb-12">
          <motion.span 
            variants={itemVariants}
            className="text-green-500 font-semibold text-sm uppercase tracking-wider mb-2 block"
          >
            {t.testimonials}
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-black mb-4"
          >
            {t.whatOurClientsSay}{' '}
            <span className="bg-gradient-to-r from-green-500 to-red-500 bg-clip-text text-transparent">
              {t.clientsSay}
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-black rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                className="mb-4"
              >
                <svg className="w-10 h-10 text-green-500 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </motion.div>

              {/* Content */}
              <p className={`text-gray-300 mb-6 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                {testimonial.content}
              </p>

              {/* Author */}
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'}`}>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                />
                <div className={isRTL ? 'text-right' : ''}>
                  <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  
                  {/* Rating Stars */}
                  <div className={`flex ${isRTL ? 'flex-row-reverse justify-end' : ''} mt-1`}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        ref={ctaRef}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative bg-black py-20 mt-16 overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-red-500/20"></div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ repeat: Infinity, duration: 10, delay: 2 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              {t.readyToGetStarted}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-300 text-lg md:text-xl mb-8"
            >
              {t.ctaText}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className={`flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative flex items-center">
                  {t.openAnAccount}
                  <Sparkles size={18} className="ml-2 group-hover:rotate-12 transition-transform" />
                </span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-500/10 transition-all duration-300"
              >
                {t.contactSales}
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div 
              variants={itemVariants}
              className={`flex justify-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'} mt-8`}
            >
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Shield size={20} className="text-green-500" />
                <span className="text-gray-400 text-sm">{t.isoCertified}</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Globe size={20} className="text-red-500" />
                <span className="text-gray-400 text-sm">{t.globalReach}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;