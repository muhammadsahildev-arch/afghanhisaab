import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  Shield,
  Lock,
  Eye,
  FileText,
  CheckCircle,
  AlertCircle,
  Globe,
  Mail,
  Phone,
  Clock,
  Download,
  Printer,
  Share2,
  Users,
  Database,
  Server,
  Smartphone,
  Cookie,
  CreditCard,
  UserCheck,
  Bell,
  RefreshCw,
  Scale,
  Gavel,
  MapPin,
  Calendar,
  Fingerprint,
  Key,
  BellRing,
  FileCheck,
  FileWarning
} from 'lucide-react';

// Language Translations
const translations = {
  en: {
    // Hero Section
    heroTitle: "Privacy Policy",
    heroText: "Your privacy is our priority. Learn how we collect, use, and protect your personal information.",
    lastUpdated: "Last Updated",
    version: "Version",
    
    // Key Points
    keyPoints: [
      "We never sell your data",
      "Your information is encrypted",
      "You can request data deletion",
      "Regular security audits",
      "GDPR compliant",
      "Transparent practices"
    ],
    
    // Quick Actions
    downloadPDF: "Download PDF",
    print: "Print",
    share: "Share",
    
    // Policy Sections
    introduction: "Introduction",
    introContent: "At CurrencyExchange, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our currency exchange services, website, and mobile applications. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.",
    
    informationCollect: "Information We Collect",
    infoContent: "We may collect personal information that you voluntarily provide to us when you register for an account, express interest in obtaining information about us or our services, participate in activities, or contact us. The personal information we collect may include:",
    infoList: [
      "Name, email address, phone number, and mailing address",
      "Government-issued identification (CNIC, Passport, etc.)",
      "Financial information including bank account details",
      "Transaction history and currency exchange records",
      "Device information and IP address",
      "Browser type and operating system",
      "Location information (with your consent)"
    ],
    
    howWeUse: "How We Use Your Information",
    useContent: "We use the information we collect for various purposes, including:",
    useList: [
      "To process and manage your currency exchange transactions",
      "To verify your identity and prevent fraud",
      "To comply with legal and regulatory requirements",
      "To improve our services and develop new features",
      "To communicate with you about your account and transactions",
      "To send you important updates and promotional materials (with your consent)",
      "To analyze usage patterns and optimize user experience"
    ],
    
    sharingInfo: "Sharing Your Information",
    sharingContent: "We may share your information with third parties in the following situations:",
    sharingList: [
      "With banking partners to process transactions",
      "With regulatory authorities as required by law",
      "With service providers who assist in our operations",
      "During business transfers (merger, acquisition, or sale)",
      "With your consent or at your direction",
      "To protect our rights, privacy, safety, or property"
    ],
    sharingNote: "We do not sell your personal information to third parties.",
    
    dataSecurity: "Data Security",
    securityContent: "We implement industry-standard security measures to protect your information:",
    securityList: [
      "256-bit SSL encryption for all data transmission",
      "Multi-factor authentication for account access",
      "Regular security audits and penetration testing",
      "Firewalls and intrusion detection systems",
      "Employee training on data protection",
      "Secure data centers with 24/7 monitoring"
    ],
    
    cookies: "Cookies and Tracking Technologies",
    cookiesContent: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
    cookiesList: [
      "Essential cookies for website functionality",
      "Analytics cookies to understand user behavior",
      "Preference cookies to remember your settings",
      "Marketing cookies for targeted advertising (with consent)"
    ],
    
    yourRights: "Your Privacy Rights",
    rightsContent: "Depending on your location, you may have the following rights regarding your personal information:",
    rightsList: [
      "Right to access your personal data",
      "Right to correct inaccurate data",
      "Right to delete your data",
      "Right to restrict processing",
      "Right to data portability",
      "Right to object to processing",
      "Right to withdraw consent"
    ],
    
    dataRetention: "Data Retention",
    retentionContent: "We will retain your personal information only for as long as is necessary for the purposes set out in this privacy policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.",
    retentionNote: "Transaction records are retained for 7 years as required by financial regulations.",
    
    childrenPrivacy: "Children's Privacy",
    childrenContent: "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us immediately.",
    
    internationalTransfers: "International Data Transfers",
    internationalContent: "Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. We ensure appropriate safeguards are in place to protect your information.",
    
    policyChanges: "Changes to This Policy",
    changesContent: "We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the 'Last Updated' date. You are advised to review this privacy policy periodically for any changes.",
    
    contactUs: "Contact Us",
    contactContent: "If you have questions or concerns about this privacy policy or our data practices, please contact us at:",
    
    policySections: "Policy Sections",
    needHelp: "Need Help?",
    
    // Security Badges
    isoCertified: "ISO 27001 Certified",
    encryption: "256-bit Encryption",
    biometric: "Biometric Authentication",
    mfa: "Multi-factor Authentication",
    secureDataCenters: "Secure Data Centers",
    monitoring: "24/7 Monitoring",
    
    // FAQ Section
    faq: "FAQ",
    commonQuestions: "Common Questions",
    faq1Q: "How long do you keep my personal information?",
    faq1A: "We retain your personal information for as long as necessary to provide you with our services and as required by law. Transaction records are kept for 7 years to comply with financial regulations.",
    faq2Q: "Can I request deletion of my data?",
    faq2A: "Yes, you can request deletion of your personal data. Contact our privacy team at privacy@currencyexchange.com with your request. Note that some information may need to be retained for legal purposes.",
    faq3Q: "Is my payment information secure?",
    faq3A: "Absolutely. We use 256-bit SSL encryption and never store full payment information on our servers. All transactions are processed through PCI-DSS compliant payment gateways.",
    faq4Q: "Do you sell my data to third parties?",
    faq4A: "No, we never sell your personal information to third parties. We only share data as necessary to provide our services and comply with legal requirements.",
    faq5Q: "How can I update my privacy preferences?",
    faq5A: "You can update your privacy preferences at any time through your account settings or by contacting our support team.",
    
    // Consent Section
    yourConsent: "Your Consent",
    consentText: "By using our services, you consent to our privacy policy and agree to its terms.",
    acceptAll: "Accept All",
    managePreferences: "Manage Preferences",
    
    // Update Notification
    stayUpdated: "Stay Updated",
    updateText: "Subscribe to receive notifications about changes to our privacy policy",
    subscribe: "Subscribe",
    enterEmail: "Enter your email",
    
    // Company
    companyName: "CurrencyExchange"
  },
  ur: {
    heroTitle: "رازداری کی پالیسی",
    heroText: "آپ کی رازداری ہماری ترجیح ہے۔ جانیں کہ ہم آپ کی ذاتی معلومات کو کیسے جمع، استعمال اور محفوظ کرتے ہیں۔",
    lastUpdated: "آخری بار اپ ڈیٹ کیا گیا",
    version: "ورژن",
    
    keyPoints: [
      "ہم کبھی آپ کا ڈیٹا نہیں بیچتے",
      "آپ کی معلومات انکرپٹڈ ہیں",
      "آپ ڈیٹا حذف کرنے کی درخواست کر سکتے ہیں",
      "باقاعدہ سیکورٹی آڈٹ",
      "GDPR کے مطابق",
      "شفاف طریقے"
    ],
    
    downloadPDF: "پی ڈی ایف ڈاؤن لوڈ کریں",
    print: "پرنٹ کریں",
    share: "شیئر کریں",
    
    introduction: "تعارف",
    introContent: "CurrencyExchange میں، ہم آپ کی رازداری کو سنجیدگی سے لیتے ہیں۔ یہ رازداری کی پالیسی بتاتی ہے کہ ہم آپ کی معلومات کو کیسے جمع، استعمال، افشا اور محفوظ کرتے ہیں جب آپ ہماری کرنسی ایکسچینج خدمات، ویب سائٹ اور موبائل ایپلی کیشنز استعمال کرتے ہیں۔ براہ کرم اس رازداری کی پالیسی کو غور سے پڑھیں۔ اگر آپ اس رازداری کی پالیسی کی شرائط سے متفق نہیں ہیں، تو براہ کرم سائٹ تک رسائی حاصل نہ کریں یا ہماری خدمات استعمال نہ کریں۔",
    
    informationCollect: "ہم جو معلومات جمع کرتے ہیں",
    infoContent: "ہم وہ ذاتی معلومات جمع کر سکتے ہیں جو آپ رضاکارانہ طور پر ہمیں فراہم کرتے ہیں جب آپ اکاؤنٹ کے لیے رجسٹر ہوتے ہیں، ہمارے بارے میں معلومات حاصل کرنے میں دلچسپی ظاہر کرتے ہیں، سرگرمیوں میں حصہ لیتے ہیں، یا ہم سے رابطہ کرتے ہیں۔ ہم جو ذاتی معلومات جمع کر سکتے ہیں ان میں شامل ہیں:",
    infoList: [
      "نام، ای میل پتہ، فون نمبر، اور میلنگ پتہ",
      "حکومت کی طرف سے جاری کردہ شناخت (CNIC، پاسپورٹ، وغیرہ)",
      "بینک اکاؤنٹ کی تفصیلات سمیت مالی معلومات",
      "لین دین کی تاریخ اور کرنسی ایکسچینج ریکارڈ",
      "ڈیوائس کی معلومات اور IP پتہ",
      "براؤزر کی قسم اور آپریٹنگ سسٹم",
      "مقام کی معلومات (آپ کی رضامندی کے ساتھ)"
    ],
    
    howWeUse: "ہم آپ کی معلومات کا استعمال کیسے کرتے ہیں",
    useContent: "ہم جمع کردہ معلومات کو مختلف مقاصد کے لیے استعمال کرتے ہیں، بشمول:",
    useList: [
      "آپ کے کرنسی ایکسچینج لین دین پر کارروائی اور ان کا انتظام کرنے کے لیے",
      "آپ کی شناخت کی تصدیق کرنے اور دھوکہ دہی کو روکنے کے لیے",
      "قانونی اور ریگولیٹری تقاضوں کی تعمیل کرنے کے لیے",
      "ہماری خدمات کو بہتر بنانے اور نئی خصوصیات تیار کرنے کے لیے",
      "آپ کے اکاؤنٹ اور لین دین کے بارے میں آپ سے بات چیت کرنے کے لیے",
      "آپ کو اہم اپ ڈیٹس اور پروموشنل مواد بھیجنے کے لیے (آپ کی رضامندی کے ساتھ)",
      "استعمال کے نمونوں کا تجزیہ کرنے اور صارف کے تجربے کو بہتر بنانے کے لیے"
    ],
    
    sharingInfo: "آپ کی معلومات کا اشتراک",
    sharingContent: "ہم مندرجہ ذیل حالات میں آپ کی معلومات تیسرے فریقوں کے ساتھ شیئر کر سکتے ہیں:",
    sharingList: [
      "بینکنگ پارٹنرز کے ساتھ لین دین پر کارروائی کرنے کے لیے",
      "قانون کے مطابق ریگولیٹری حکام کے ساتھ",
      "سروس فراہم کرنے والوں کے ساتھ جو ہمارے کاموں میں مدد کرتے ہیں",
      "کاروباری منتقلی کے دوران (انضمام، حصول، یا فروخت)",
      "آپ کی رضامندی کے ساتھ یا آپ کی ہدایت پر",
      "ہمارے حقوق، رازداری، حفاظت، یا جائیداد کے تحفظ کے لیے"
    ],
    sharingNote: "ہم آپ کی ذاتی معلومات تیسرے فریقوں کو نہیں بیچتے۔",
    
    dataSecurity: "ڈیٹا سیکورٹی",
    securityContent: "ہم آپ کی معلومات کے تحفظ کے لیے صنعت کے معیاری حفاظتی اقدامات نافذ کرتے ہیں:",
    securityList: [
      "تمام ڈیٹا ٹرانسمیشن کے لیے 256-bit SSL انکرپشن",
      "اکاؤنٹ تک رسائی کے لیے ملٹی فیکٹر تصدیق",
      "باقاعدہ سیکورٹی آڈٹ اور دخول کی جانچ",
      "فائر والز اور مداخلت کا پتہ لگانے کے نظام",
      "ڈیٹا کے تحفظ پر ملازمین کی تربیت",
      "24/7 نگرانی کے ساتھ محفوظ ڈیٹا سینٹرز"
    ],
    
    cookies: "کوکیز اور ٹریکنگ ٹیکنالوجیز",
    cookiesContent: "ہم اپنی ویب سائٹ پر سرگرمی کو ٹریک کرنے اور مخصوص معلومات رکھنے کے لیے کوکیز اور اسی طرح کی ٹریکنگ ٹیکنالوجیز استعمال کرتے ہیں۔ کوکیز چھوٹی مقدار میں ڈیٹا والی فائلیں ہیں جن میں ایک گمنام منفرد شناخت کنندہ شامل ہو سکتا ہے۔ آپ اپنے براؤزر کو تمام کوکیز کو مسترد کرنے یا یہ بتانے کی ہدایت کر سکتے ہیں کہ کوکی کب بھیجی جا رہی ہے۔",
    cookiesList: [
      "ویب سائٹ کی فعالیت کے لیے ضروری کوکیز",
      "صارف کے رویے کو سمجھنے کے لیے تجزیاتی کوکیز",
      "آپ کی ترتیبات کو یاد رکھنے کے لیے ترجیحی کوکیز",
      "ٹارگٹڈ اشتہارات کے لیے مارکیٹنگ کوکیز (رضامندی کے ساتھ)"
    ],
    
    yourRights: "آپ کے رازداری کے حقوق",
    rightsContent: "آپ کے مقام کے لحاظ سے، آپ کو اپنی ذاتی معلومات کے حوالے سے درج ذیل حقوق حاصل ہو سکتے ہیں:",
    rightsList: [
      "آپ کے ذاتی ڈیٹا تک رسائی کا حق",
      "غلط ڈیٹا کو درست کرنے کا حق",
      "آپ کے ڈیٹا کو حذف کرنے کا حق",
      "پروسیسنگ کو محدود کرنے کا حق",
      "ڈیٹا پورٹیبلٹی کا حق",
      "پروسیسنگ پر اعتراض کرنے کا حق",
      "رضامندی واپس لینے کا حق"
    ],
    
    dataRetention: "ڈیٹا برقرار رکھنا",
    retentionContent: "ہم آپ کی ذاتی معلومات کو صرف اس وقت تک برقرار رکھیں گے جب تک اس رازداری کی پالیسی میں بیان کردہ مقاصد کے لیے ضروری ہے۔ ہم آپ کی معلومات کو اس حد تک برقرار رکھیں گے اور استعمال کریں گے جس حد تک ہماری قانونی ذمہ داریوں کی تعمیل، تنازعات کو حل کرنے، اور ہماری پالیسیوں کو نافذ کرنے کے لیے ضروری ہے۔",
    retentionNote: "مالی ضوابط کے مطابق لین دین کے ریکارڈ 7 سال تک برقرار رکھے جاتے ہیں۔",
    
    childrenPrivacy: "بچوں کی رازداری",
    childrenContent: "ہماری خدمات 18 سال سے کم عمر افراد کے لیے نہیں ہیں۔ ہم جان بوجھ کر 18 سال سے کم عمر بچوں سے ذاتی معلومات جمع نہیں کرتے۔ اگر آپ کو معلوم ہوتا ہے کہ کسی بچے نے ہمیں ذاتی معلومات فراہم کی ہیں، تو براہ کرم فوری طور پر ہم سے رابطہ کریں۔",
    
    internationalTransfers: "بین الاقوامی ڈیٹا منتقلی",
    internationalContent: "آپ کی معلومات آپ کی ریاست، صوبے، ملک، یا دیگر سرکاری دائرہ اختیار سے باہر واقع کمپیوٹرز پر منتقل اور برقرار رکھی جا سکتی ہیں جہاں ڈیٹا کے تحفظ کے قوانین مختلف ہو سکتے ہیں۔ ہم اس بات کو یقینی بناتے ہیں کہ آپ کی معلومات کے تحفظ کے لیے مناسب حفاظتی انتظامات موجود ہوں۔",
    
    policyChanges: "اس پالیسی میں تبدیلیاں",
    changesContent: "ہم وقتاً فوقتاً اپنی رازداری کی پالیسی کو اپ ڈیٹ کر سکتے ہیں۔ ہم آپ کو کسی بھی تبدیلی کے بارے میں اس صفحہ پر نئی رازداری کی پالیسی پوسٹ کرکے اور 'آخری بار اپ ڈیٹ کیا گیا' کی تاریخ کو اپ ڈیٹ کرکے مطلع کریں گے۔ آپ کو مشورہ دیا جاتا ہے کہ کسی بھی تبدیلی کے لیے اس رازداری کی پالیسی کا وقتاً فوقتاً جائزہ لیں۔",
    
    contactUs: "ہم سے رابطہ کریں",
    contactContent: "اگر آپ کو اس رازداری کی پالیسی یا ہمارے ڈیٹا کے طریقوں کے بارے میں سوالات یا خدشات ہیں، تو براہ کرم ہم سے یہاں رابطہ کریں:",
    
    policySections: "پالیسی کے حصے",
    needHelp: "مدد چاہیے؟",
    
    isoCertified: "ISO 27001 مصدقہ",
    encryption: "256-bit انکرپشن",
    biometric: "بائیومیٹرک تصدیق",
    mfa: "ملٹی فیکٹر تصدیق",
    secureDataCenters: "محفوظ ڈیٹا سینٹرز",
    monitoring: "24/7 نگرانی",
    
    faq: "عمومی سوالات",
    commonQuestions: "عام سوالات",
    faq1Q: "آپ میری ذاتی معلومات کب تک رکھتے ہیں؟",
    faq1A: "ہم آپ کی ذاتی معلومات کو اس وقت تک برقرار رکھتے ہیں جب تک آپ کو ہماری خدمات فراہم کرنے اور قانون کے مطابق ضروری ہے۔ مالی ضوابط کی تعمیل کے لیے لین دین کے ریکارڈ 7 سال تک رکھے جاتے ہیں۔",
    faq2Q: "کیا میں اپنے ڈیٹا کو حذف کرنے کی درخواست کر سکتا ہوں؟",
    faq2A: "جی ہاں، آپ اپنے ذاتی ڈیٹا کو حذف کرنے کی درخواست کر سکتے ہیں۔ اپنی درخواست کے ساتھ privacy@currencyexchange.com پر ہماری رازداری ٹیم سے رابطہ کریں۔ نوٹ کریں کہ قانونی مقاصد کے لیے کچھ معلومات کو برقرار رکھنے کی ضرورت پڑ سکتی ہے۔",
    faq3Q: "کیا میری ادائیگی کی معلومات محفوظ ہیں؟",
    faq3A: "بالکل۔ ہم 256-bit SSL انکرپشن استعمال کرتے ہیں اور اپنے سرورز پر مکمل ادائیگی کی معلومات کبھی ذخیرہ نہیں کرتے۔ تمام لین دین PCI-DSS کے مطابق ادائیگی گیٹ ویز کے ذریعے کارروائی کی جاتی ہے۔",
    faq4Q: "کیا آپ میرا ڈیٹا تیسرے فریقوں کو بیچتے ہیں؟",
    faq4A: "نہیں، ہم کبھی بھی آپ کی ذاتی معلومات تیسرے فریقوں کو نہیں بیچتے۔ ہم صرف اپنی خدمات فراہم کرنے اور قانونی تقاضوں کی تعمیل کے لیے ضروری ڈیٹا شیئر کرتے ہیں۔",
    faq5Q: "میں اپنی رازداری کی ترجیحات کو کیسے اپ ڈیٹ کر سکتا ہوں؟",
    faq5A: "آپ کسی بھی وقت اپنے اکاؤنٹ کی ترتیبات کے ذریعے یا ہماری سپورٹ ٹیم سے رابطہ کرکے اپنی رازداری کی ترجیحات کو اپ ڈیٹ کر سکتے ہیں۔",
    
    yourConsent: "آپ کی رضامندی",
    consentText: "ہماری خدمات کو استعمال کرکے، آپ ہماری رازداری کی پالیسی سے رضامند ہیں اور اس کی شرائط سے متفق ہیں۔",
    acceptAll: "سب قبول کریں",
    managePreferences: "ترجیحات کا نظم کریں",
    
    stayUpdated: "اپ ڈیٹ رہیں",
    updateText: "ہماری رازداری کی پالیسی میں تبدیلیوں کے بارے میں اطلاعات حاصل کرنے کے لیے سبسکرائب کریں",
    subscribe: "سبسکرائب کریں",
    enterEmail: "اپنا ای میل درج کریں",
    
    companyName: "کرنسی ایکسچینج"
  },
  ps: {
    heroTitle: "د پټتیا پالیسي",
    heroText: "ستاسو پټتیا زموږ لومړیتوب دی. زده کړئ چې موږ ستاسو شخصي معلومات څنګه راټولوو، کاروو او ساتو.",
    lastUpdated: "وروستی تازه",
    version: "نسخه",
    
    keyPoints: [
      "موږ ستاسو ډاټا هیڅکله نه پلورو",
      "ستاسو معلومات کوډ شوي دي",
      "تاسو د ډاټا حذف کولو غوښتنه کولی شئ",
      "منظم امنیتي پلټنې",
      "GDPR مطابق",
      "روڼ کړنې"
    ],
    
    downloadPDF: "PDF ډاونلوډ کړئ",
    print: "چاپ کړئ",
    share: "شریک کړئ",
    
    introduction: "پیژندنه",
    introContent: "په CurrencyExchange کې، موږ ستاسو پټتیا جدي نیسو. دا د پټتیا پالیسي تشریح کوي چې موږ ستاسو معلومات څنګه راټولوو، کاروو، افشا کوو او ساتو کله چې تاسو زموږ د اسعارو تبادلې خدماتو، ویب پاڼې، او ګرځنده غوښتنلیکونو څخه کار اخلئ. مهرباني وکړئ دا د پټتیا پالیسي په دقت سره ولولئ. که تاسو د دې پټتیا پالیسي له شرایطو سره موافق نه یاست، مهرباني وکړئ پاڼې ته لاسرسی مه کوئ یا زموږ خدمات مه کاروئ.",
    
    informationCollect: "موږ کوم معلومات راټولوو",
    infoContent: "موږ هغه شخصي معلومات راټولولی شو چې تاسو په رضاکارانه توګه موږ ته چمتو کوئ کله چې تاسو د حساب لپاره راجستر کوئ، زموږ په اړه د معلوماتو ترلاسه کولو لیوالتیا څرګندوئ، په فعالیتونو کې برخه اخلئ، یا موږ سره اړیکه ونیسئ. هغه شخصي معلومات چې موږ یې راټولولی شو پدې کې شامل دي:",
    infoList: [
      "نوم، بریښنالیک پته، تلیفون شمیره، او پوستي پته",
      "د حکومت لخوا صادر شوی پیژند پاڼه (CNIC، پاسپورټ، او داسې نور)",
      "د بانک حساب تفصیلاتو په شمول مالي معلومات",
      "د راکړې ورکړې تاریخ او د اسعارو تبادلې ریکارډونه",
      "د وسیلې معلومات او IP پته",
      "د براوزر ډول او عملیاتي سیسټم",
      "د موقعیت معلومات (ستاسو رضایت سره)"
    ],
    
    howWeUse: "موږ ستاسو معلومات څنګه کاروو",
    useContent: "موږ راټول شوي معلومات د مختلفو موخو لپاره کاروو، پشمول د:",
    useList: [
      "ستاسو د اسعارو تبادلې راکړو ورکړو پروسس او مدیریت کولو لپاره",
      "ستاسو هویت تایید او درغلۍ مخنیوي لپاره",
      "د قانوني او تنظیمي اړتیاو اطاعت لپاره",
      "زموږ خدماتو ښه والي او نوي ځانګړتیاوو پراختیا لپاره",
      "ستاسو حساب او راکړو ورکړو په اړه له تاسو سره اړیکه لپاره",
      "تاسو ته مهم تازه معلومات او پروموشنل مواد لیږلو لپاره (ستاسو رضایت سره)",
      "د استعمال نمونو تحلیل او د کارونکي تجربې اصلاح لپاره"
    ],
    
    sharingInfo: "ستاسو معلومات شریکول",
    sharingContent: "موږ ممکن لاندې شرایطو کې ستاسو معلومات دریم اړخونو سره شریک کړو:",
    sharingList: [
      "د بانکدارۍ شریکانو سره د راکړو ورکړو پروسس لپاره",
      "د قانون سره سم د تنظیمي چارواکو سره",
      "د خدماتو چمتو کونکو سره چې زموږ په عملیاتو کې مرسته کوي",
      "د کاروبار لیږد پرمهال (یوځای کیدل، اخیستل، یا پلورل)",
      "ستاسو رضایت سره یا ستاسو لارښوونې سره",
      "زموږ د حقونو، پټتیا، خوندیتوب، یا ملکیت د ساتنې لپاره"
    ],
    sharingNote: "موږ ستاسو شخصي معلومات دریم اړخونو ته نه پلورو.",
    
    dataSecurity: "ډاټا امنیت",
    securityContent: "موږ ستاسو معلوماتو د ساتنې لپاره د صنعت معیاري امنیتي اقدامات پلي کوو:",
    securityList: [
      "د ټولو ډاټا لیږد لپاره 256-bit SSL کوډ کول",
      "د حساب لاسرسي لپاره څو فکتوره تصدیق",
      "منظم امنیتي پلټنې او نفوذي ازموینې",
      "فائر والز او د نفوذ کشف سیسټمونه",
      "د ډاټا ساتنې په اړه د کارمندانو روزنه",
      "د 24/7 څارنې سره خوندي ډاټا مرکزونه"
    ],
    
    cookies: "کوکیز او تعقیب ټیکنالوژي",
    cookiesContent: "موږ په خپله ویب پاڼه کې فعالیت تعقیب او ځینې معلومات ساتلو لپاره کوکیز او ورته تعقیب ټیکنالوژي کاروو. کوکیز د معلوماتو لږ مقدار سره فایلونه دي چې یو نامعلوم ځانګړی پیژندونکی پکې شامل وي. تاسو کولی شئ خپل براوزر ته د ټولو کوکیز ردولو یا د کوکی لیږلو په وخت کې ښودلو لارښوونه وکړئ.",
    cookiesList: [
      "د ویب پاڼې فعالیت لپاره اړین کوکیز",
      "د کارونکي چلند پوهیدو لپاره تحلیلي کوکیز",
      "ستاسو تنظیماتو یادولو لپاره غوره توب کوکیز",
      "د هدف شوي اعلاناتو لپاره بازارموندنه کوکیز (د رضایت سره)"
    ],
    
    yourRights: "ستاسو د پټتیا حقونه",
    rightsContent: "ستاسو موقعیت پورې اړه لري، تاسو ممکن ستاسو د شخصي معلوماتو په اړه لاندې حقونه ولرئ:",
    rightsList: [
      "ستاسو شخصي ډاټا ته د لاسرسي حق",
      "غلط ډاټا د سمولو حق",
      "ستاسو ډاټا د حذف کولو حق",
      "د پروسس محدودولو حق",
      "د ډاټا لیږد حق",
      "د پروسس اعتراض کولو حق",
      "د رضایت بیرته اخیستلو حق"
    ],
    
    dataRetention: "ډاټا ساتنه",
    retentionContent: "موږ ستاسو شخصي معلومات یوازې هغه وخت پورې ساتو څومره چې د دې پټتیا پالیسي کې ذکر شوي موخو لپاره اړین وي. موږ ستاسو معلومات هغه حد پورې ساتو او کاروو څومره چې زموږ قانوني مکلفیتونو اطاعت، شخړو حل، او زموږ پالیسیو پلي کولو لپاره اړین وي.",
    retentionNote: "د مالي مقرراتو سره سم د راکړو ورکړو ریکارډونه 7 کاله ساتل کیږي.",
    
    childrenPrivacy: "د ماشومانو پټتیا",
    childrenContent: "زموږ خدمتونه د 18 کلونو څخه کم عمر لرونکو اشخاصو لپاره ندي. موږ په قصدي توګه د 18 کلونو څخه کم عمر لرونکو ماشومانو څخه شخصي معلومات نه راټولوو. که تاسو خبر شئ چې یو ماشوم موږ ته شخصي معلومات چمتو کړي، مهرباني وکړئ سمدستي موږ سره اړیکه ونیسئ.",
    
    internationalTransfers: "نړیوال ډاټا لیږد",
    internationalContent: "ستاسو معلومات ممکن ستاسو د ایالت، ولایت، هیواد، یا بل حکومتي حوزه څخه بهر موقعیت لرونکو کمپیوټرونو ته لیږدول او ساتل شي چیرې چې د ډاټا ساتنې قوانین ممکن توپیر ولري. موږ ډاډ ورکوو چې ستاسو معلوماتو ساتنې لپاره مناسب ساتونکي موجود دي.",
    
    policyChanges: "د دې پالیسي بدلونونه",
    changesContent: "موږ وخت په وخت خپله د پټتیا پالیسي تازه کولی شو. موږ به تاسو ته د کوم بدلون په اړه د دې پاڼې په واسطه نوي پټتیا پالیسي پوسټ کولو او د 'وروستی تازه' نیټې په تازه کولو سره خبر کړو. تاسو ته مشوره ورکول کیږي چې د دې پټتیا پالیسي په دوره توګه د کوم بدلون لپاره بیاکتنه وکړئ.",
    
    contactUs: "موږ سره اړیکه ونیسئ",
    contactContent: "که تاسو د دې پټتیا پالیسي یا زموږ د ډاټا کړنو په اړه پوښتنې یا اندیښنې لرئ، مهرباني وکړئ موږ سره دلته اړیکه ونیسئ:",
    
    policySections: "د پالیسي برخې",
    needHelp: "مرستې ته اړتیا لرئ؟",
    
    isoCertified: "ISO 27001 تصدیق شوی",
    encryption: "256-bit کوډ کول",
    biometric: "بایومتریک تصدیق",
    mfa: "څو فکتوره تصدیق",
    secureDataCenters: "خوندي ډاټا مرکزونه",
    monitoring: "24/7 څارنه",
    
    faq: "په مکرر ډول پوښتل شوي پوښتنې",
    commonQuestions: "عام پوښتنې",
    faq1Q: "تاسو زما شخصي معلومات څومره وخت ساتئ؟",
    faq1A: "موږ ستاسو شخصي معلومات هغه وخت پورې ساتو څومره چې تاسو ته زموږ خدماتو چمتو کولو او د قانون سره سم اړین وي. د مالي مقرراتو اطاعت لپاره د راکړو ورکړو ریکارډونه 7 کاله ساتل کیږي.",
    faq2Q: "ایا زه کولی شم خپل ډاټا د حذف کولو غوښتنه وکړم؟",
    faq2A: "هو، تاسو کولی شئ د خپل شخصي ډاټا حذف کولو غوښتنه وکړئ. خپلې غوښتنې سره زموږ د پټتیا ټیم سره په privacy@currencyexchange.com اړیکه ونیسئ. یادونه وکړئ چې ځینې معلومات ممکن د قانوني موخو لپاره ساتلو ته اړتیا ولري.",
    faq3Q: "ایا زما د تادیې معلومات خوندي دي؟",
    faq3A: "بالکل. موږ 256-bit SSL کوډ کول کاروو او هیڅکله زموږ سرورونو کې بشپړ تادیاتي معلومات نه ساتو. ټولې راکړې ورکړې د PCI-DSS مطابق تادیاتي دروازو له لارې پروسس کیږي.",
    faq4Q: "ایا تاسو زما ډاټا دریم اړخونو ته پلورئ؟",
    faq4A: "نه، موږ هیڅکله ستاسو شخصي معلومات دریم اړخونو ته نه پلورو. موږ یوازې د خپلو خدماتو چمتو کولو او قانوني اړتیاو اطاعت لپاره اړین ډاټا شریکوو.",
    faq5Q: "زه څنګه کولی شم خپل د پټتیا غوره توبونه تازه کړم؟",
    faq5A: "تاسو کولی شئ هر وخت د خپل حساب تنظیماتو له لارې یا زموږ د ملاتړ ټیم سره اړیکه کولو سره خپل د پټتیا غوره توبونه تازه کړئ.",
    
    yourConsent: "ستاسو رضایت",
    consentText: "زموږ د خدماتو په کارولو سره، تاسو زموږ د پټتیا پالیسي سره رضایت لرئ او د دې شرایطو سره موافق یاست.",
    acceptAll: "ټول ومنئ",
    managePreferences: "غوره توبونه اداره کړئ",
    
    stayUpdated: "تازه اوسئ",
    updateText: "زموږ د پټتیا پالیسي کې د بدلونونو په اړه خبرتیاو ترلاسه کولو لپاره ګډون وکړئ",
    subscribe: "ګډون وکړئ",
    enterEmail: "خپل بریښنالیک دننه کړئ",
    
    companyName: "اسعارو تبادله"
  },
  fa: {
    heroTitle: "سیاست حفظ حریم خصوصی",
    heroText: "حفظ حریم خصوصی شما اولویت ما است. بیاموزید که ما چگونه اطلاعات شخصی شما را جمع‌آوری، استفاده و محافظت می‌کنیم.",
    lastUpdated: "آخرین به‌روزرسانی",
    version: "نسخه",
    
    keyPoints: [
      "ما هرگز داده‌های شما را نمی‌فروشیم",
      "اطلاعات شما رمزگذاری شده است",
      "شما می‌توانید درخواست حذف داده کنید",
      "حسابرسی امنیتی منظم",
      "مطابق با GDPR",
      "رویه‌های شفاف"
    ],
    
    downloadPDF: "دانلود PDF",
    print: "چاپ",
    share: "اشتراک‌گذاری",
    
    introduction: "معرفی",
    introContent: "در CurrencyExchange، ما حفظ حریم خصوصی شما را جدی می‌گیریم. این سیاست حفظ حریم خصوصی توضیح می‌دهد که چگونه اطلاعات شما را هنگامی که از خدمات تبدیل ارز، وب‌سایت و برنامه‌های موبایل ما استفاده می‌کنید، جمع‌آوری، استفاده، افشا و محافظت می‌کنیم. لطفاً این سیاست حفظ حریم خصوصی را با دقت مطالعه کنید. اگر با شرایط این سیاست حفظ حریم خصوصی موافق نیستید، لطفاً به سایت دسترسی پیدا نکنید یا از خدمات ما استفاده نکنید.",
    
    informationCollect: "اطلاعاتی که جمع‌آوری می‌کنیم",
    infoContent: "ما ممکن است اطلاعات شخصی را که شما داوطلبانه هنگام ثبت‌نام برای حساب، ابراز علاقه به دریافت اطلاعات درباره ما یا خدمات ما، شرکت در فعالیت‌ها، یا تماس با ما ارائه می‌دهید، جمع‌آوری کنیم. اطلاعات شخصی که ما جمع‌آوری می‌کنیم ممکن است شامل موارد زیر باشد:",
    infoList: [
      "نام، آدرس ایمیل، شماره تلفن و آدرس پستی",
      "مدارک شناسایی صادر شده توسط دولت (CNIC، پاسپورت و غیره)",
      "اطلاعات مالی شامل جزئیات حساب بانکی",
      "سابقه تراکنش و سوابق تبدیل ارز",
      "اطلاعات دستگاه و آدرس IP",
      "نوع مرورگر و سیستم عامل",
      "اطلاعات موقعیت (با رضایت شما)"
    ],
    
    howWeUse: "چگونه از اطلاعات شما استفاده می‌کنیم",
    useContent: "ما از اطلاعات جمع‌آوری شده برای اهداف مختلف استفاده می‌کنیم، از جمله:",
    useList: [
      "برای پردازش و مدیریت تراکنش‌های تبدیل ارز شما",
      "برای تأیید هویت شما و جلوگیری از تقلب",
      "برای رعایت الزامات قانونی و نظارتی",
      "برای بهبود خدمات ما و توسعه ویژگی‌های جدید",
      "برای ارتباط با شما در مورد حساب و تراکنش‌هایتان",
      "برای ارسال به‌روزرسانی‌های مهم و مطالب تبلیغاتی (با رضایت شما)",
      "برای تجزیه و تحلیل الگوهای استفاده و بهینه‌سازی تجربه کاربری"
    ],
    
    sharingInfo: "اشتراک‌گذاری اطلاعات شما",
    sharingContent: "ما ممکن است اطلاعات شما را در موقعیت‌های زیر با اشخاص ثالث به اشتراک بگذاریم:",
    sharingList: [
      "با شرکای بانکی برای پردازش تراکنش‌ها",
      "با مقامات نظارتی طبق قانون",
      "با ارائه‌دهندگان خدمات که در عملیات ما کمک می‌کنند",
      "در طول انتقال کسب‌وکار (ادغام، خرید یا فروش)",
      "با رضایت شما یا به دستور شما",
      "برای محافظت از حقوق، حریم خصوصی، ایمنی یا اموال ما"
    ],
    sharingNote: "ما اطلاعات شخصی شما را به اشخاص ثالث نمی‌فروشیم.",
    
    dataSecurity: "امنیت داده",
    securityContent: "ما اقدامات امنیتی استاندارد صنعت را برای محافظت از اطلاعات شما اجرا می‌کنیم:",
    securityList: [
      "رمزگذاری 256-bit SSL برای همه انتقال‌های داده",
      "احراز هویت چند عاملی برای دسترسی به حساب",
      "حسابرسی امنیتی منظم و تست نفوذ",
      "دیوارهای آتش و سیستم‌های تشخیص نفوذ",
      "آموزش کارکنان در مورد حفاظت از داده",
      "مراکز داده امن با نظارت 24/7"
    ],
    
    cookies: "کوکی‌ها و فناوری‌های ردیابی",
    cookiesContent: "ما از کوکی‌ها و فناوری‌های ردیابی مشابه برای ردیابی فعالیت در وب‌سایت خود و نگهداری اطلاعات خاص استفاده می‌کنیم. کوکی‌ها فایل‌هایی با مقدار کمی داده هستند که ممکن است شامل یک شناسه منحصر به فرد ناشناس باشند. شما می‌توانید به مرورگر خود دستور دهید همه کوکی‌ها را رد کند یا زمانی که کوکی در حال ارسال است نشان دهد.",
    cookiesList: [
      "کوکی‌های ضروری برای عملکرد وب‌سایت",
      "کوکی‌های تحلیلی برای درک رفتار کاربر",
      "کوکی‌های ترجیحات برای به خاطر سپردن تنظیمات شما",
      "کوکی‌های بازاریابی برای تبلیغات هدفمند (با رضایت)"
    ],
    
    yourRights: "حقوق حفظ حریم خصوصی شما",
    rightsContent: "بسته به موقعیت مکانی شما، ممکن است حقوق زیر را در مورد اطلاعات شخصی خود داشته باشید:",
    rightsList: [
      "حق دسترسی به داده‌های شخصی شما",
      "حق تصحیح داده‌های نادرست",
      "حق حذف داده‌های شما",
      "حق محدود کردن پردازش",
      "حق حمل داده",
      "حق اعتراض به پردازش",
      "حق لغو رضایت"
    ],
    
    dataRetention: "نگهداری داده",
    retentionContent: "ما اطلاعات شخصی شما را تنها تا زمانی که برای اهداف ذکر شده در این سیاست حفظ حریم خصوصی ضروری است، نگهداری می‌کنیم. ما اطلاعات شما را تا حد لازم برای رعایت تعهدات قانونی، حل اختلافات و اجرای سیاست‌های خود نگهداری و استفاده می‌کنیم.",
    retentionNote: "سوابق تراکنش به مدت 7 سال طبق مقررات مالی نگهداری می‌شود.",
    
    childrenPrivacy: "حریم خصوصی کودکان",
    childrenContent: "خدمات ما برای افراد زیر 18 سال در نظر گرفته نشده است. ما آگاهانه اطلاعات شخصی کودکان زیر 18 سال را جمع‌آوری نمی‌کنیم. اگر متوجه شدید که کودکی اطلاعات شخصی در اختیار ما قرار داده است، لطفاً فوراً با ما تماس بگیرید.",
    
    internationalTransfers: "انتقال داده‌های بین‌المللی",
    internationalContent: "اطلاعات شما ممکن است به رایانه‌های واقع در خارج از ایالت، استان، کشور یا حوزه قضایی دولتی شما که قوانین حفاظت از داده ممکن است متفاوت باشد، منتقل و نگهداری شود. ما اطمینان می‌دهیم که حفاظت‌های مناسب برای محافظت از اطلاعات شما در جای خود قرار دارد.",
    
    policyChanges: "تغییرات در این سیاست",
    changesContent: "ما ممکن است هر از گاهی سیاست حفظ حریم خصوصی خود را به‌روز کنیم. ما با ارسال سیاست جدید حفظ حریم خصوصی در این صفحه و به‌روزرسانی تاریخ 'آخرین به‌روزرسانی'، شما را از هرگونه تغییر مطلع خواهیم کرد. به شما توصیه می‌شود که این سیاست حفظ حریم خصوصی را دوره‌ای برای هرگونه تغییر بررسی کنید.",
    
    contactUs: "تماس با ما",
    contactContent: "اگر سوال یا نگرانی در مورد این سیاست حفظ حریم خصوصی یا رویه‌های داده ما دارید، لطفاً با ما در تماس باشید:",
    
    policySections: "بخش‌های سیاست",
    needHelp: "نیاز به کمک دارید؟",
    
    isoCertified: "گواهی ISO 27001",
    encryption: "رمزگذاری 256-bit",
    biometric: "احراز هویت بیومتریک",
    mfa: "احراز هویت چند عاملی",
    secureDataCenters: "مراکز داده امن",
    monitoring: "نظارت 24/7",
    
    faq: "سوالات متداول",
    commonQuestions: "سوالات رایج",
    faq1Q: "چقدر اطلاعات شخصی من را نگهداری می‌کنید؟",
    faq1A: "ما اطلاعات شخصی شما را تا زمانی که برای ارائه خدمات به شما و طبق قانون لازم است، نگهداری می‌کنیم. سوابق تراکنش به مدت 7 سال برای رعایت مقررات مالی نگهداری می‌شود.",
    faq2Q: "آیا می‌توانم درخواست حذف داده‌هایم را بدهم؟",
    faq2A: "بله، شما می‌توانید درخواست حذف داده‌های شخصی خود را بدهید. با درخواست خود با تیم حریم خصوصی ما در privacy@currencyexchange.com تماس بگیرید. توجه داشته باشید که برخی اطلاعات ممکن است برای اهداف قانونی نیاز به نگهداری داشته باشند.",
    faq3Q: "آیا اطلاعات پرداخت من امن است؟",
    faq3A: "قطعاً. ما از رمزگذاری 256-bit SSL استفاده می‌کنیم و هرگز اطلاعات کامل پرداخت را روی سرورهای خود ذخیره نمی‌کنیم. همه تراکنش‌ها از طریق درگاه‌های پرداخت منطبق با PCI-DSS پردازش می‌شوند.",
    faq4Q: "آیا داده‌های من را به اشخاص ثالث می‌فروشید؟",
    faq4A: "خیر، ما هرگز اطلاعات شخصی شما را به اشخاص ثالث نمی‌فروشیم. ما فقط داده‌ها را در صورت لزوم برای ارائه خدمات و رعایت الزامات قانونی به اشتراک می‌گذاریم.",
    faq5Q: "چگونه می‌توانم تنظیمات حریم خصوصی خود را به‌روز کنم؟",
    faq5A: "شما می‌توانید در هر زمان از طریق تنظیمات حساب خود یا با تماس با تیم پشتیبانی ما، تنظیمات حریم خصوصی خود را به‌روز کنید.",
    
    yourConsent: "رضایت شما",
    consentText: "با استفاده از خدمات ما، شما با سیاست حفظ حریم خصوصی ما موافقت می‌کنید و با شرایط آن موافق هستید.",
    acceptAll: "پذیرش همه",
    managePreferences: "مدیریت تنظیمات",
    
    stayUpdated: "به‌روز بمانید",
    updateText: "برای دریافت اعلان‌های مربوط به تغییرات در سیاست حفظ حریم خصوصی ما مشترک شوید",
    subscribe: "اشتراک",
    enterEmail: "ایمیل خود را وارد کنید",
    
    companyName: "تبدیل ارز"
  }
};

const PrivacyPolicy = () => {
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

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

  const titleText = t.heroTitle.split(" ");
  const lastUpdated = "February 21, 2026";

  const policySections = [
    {
      id: "introduction",
      icon: <FileText className="w-6 h-6" />,
      title: t.introduction,
      content: t.introContent,
      color: "from-green-500 to-green-600"
    },
    {
      id: "information",
      icon: <Database className="w-6 h-6" />,
      title: t.informationCollect,
      content: t.infoContent,
      list: t.infoList,
      color: "from-red-500 to-red-600"
    },
    {
      id: "usage",
      icon: <Globe className="w-6 h-6" />,
      title: t.howWeUse,
      content: t.useContent,
      list: t.useList,
      color: "from-green-600 to-green-700"
    },
    {
      id: "sharing",
      icon: <Share2 className="w-6 h-6" />,
      title: t.sharingInfo,
      content: t.sharingContent,
      list: t.sharingList,
      note: t.sharingNote,
      color: "from-red-600 to-red-700"
    },
    {
      id: "security",
      icon: <Lock className="w-6 h-6" />,
      title: t.dataSecurity,
      content: t.securityContent,
      list: t.securityList,
      color: "from-green-500 to-green-600"
    },
    {
      id: "cookies",
      icon: <Cookie className="w-6 h-6" />,
      title: t.cookies,
      content: t.cookiesContent,
      list: t.cookiesList,
      color: "from-red-500 to-red-600"
    },
    {
      id: "rights",
      icon: <UserCheck className="w-6 h-6" />,
      title: t.yourRights,
      content: t.rightsContent,
      list: t.rightsList,
      color: "from-green-600 to-green-700"
    },
    {
      id: "retention",
      icon: <Clock className="w-6 h-6" />,
      title: t.dataRetention,
      content: t.retentionContent,
      note: t.retentionNote,
      color: "from-red-600 to-red-700"
    },
    {
      id: "children",
      icon: <Users className="w-6 h-6" />,
      title: t.childrenPrivacy,
      content: t.childrenContent,
      color: "from-green-500 to-green-600"
    },
    {
      id: "international",
      icon: <Globe className="w-6 h-6" />,
      title: t.internationalTransfers,
      content: t.internationalContent,
      color: "from-red-500 to-red-600"
    },
    {
      id: "changes",
      icon: <RefreshCw className="w-6 h-6" />,
      title: t.policyChanges,
      content: t.changesContent,
      color: "from-green-600 to-green-700"
    },
    {
      id: "contact",
      icon: <Mail className="w-6 h-6" />,
      title: t.contactUs,
      content: t.contactContent,
      contactInfo: [
        { icon: Mail, text: "privacy@currencyexchange.com", href: "mailto:privacy@currencyexchange.com" },
        { icon: Phone, text: "+92 300 1234567", href: "tel:+923001234567" },
        { icon: MapPin, text: "123 Business Avenue, Block 6, Karachi, Pakistan" }
      ],
      color: "from-red-600 to-red-700"
    }
  ];

  const securityBadges = [
    { icon: Shield, text: t.isoCertified, color: "green" },
    { icon: Lock, text: t.encryption, color: "red" },
    { icon: Fingerprint, text: t.biometric, color: "green" },
    { icon: Key, text: t.mfa, color: "red" },
    { icon: Server, text: t.secureDataCenters, color: "green" },
    { icon: Eye, text: t.monitoring, color: "red" }
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
      className="min-h-screen bg-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Hero Section - Full Width */}
      <motion.section 
        variants={fadeInUp}
        className="relative bg-black overflow-hidden py-20 md:py-28 w-full"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-red-500/20 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-green-500/20 animate-pulse-slower"></div>
          
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
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

        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className={`text-center max-w-4xl mx-auto ${isRTL ? 'text-right' : ''}`}>
            {/* Animated heading */}
            <motion.h1
              variants={wordVariants}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ${isRTL ? 'text-center' : ''}`}
            >
              {titleText.map((word, wordIndex) => (
                <motion.span key={wordIndex} className={`inline-block ${isRTL ? 'ml-2' : 'mr-2'}`}>
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={letterVariants}
                      className={`inline-block ${(word === 'Policy' || word === 'پالیسی' || word === 'پالیسي' || word === 'سیاست') ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-red-400' : ''}`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className={`text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-6 ${isRTL ? 'text-center' : ''}`}
            >
              {t.heroText}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className={`flex items-center justify-center space-x-4 text-sm ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <Calendar className="w-4 h-4 text-green-500" />
              <span className="text-gray-400">{t.lastUpdated}: {lastUpdated}</span>
              <span className="text-gray-600">|</span>
              <FileCheck className="w-4 h-4 text-red-500" />
              <span className="text-gray-400">{t.version} 2.1.0</span>
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
      </motion.section>

      {/* Key Points Bar - Full Width */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white border-b border-gray-200 py-6 w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className={`flex flex-wrap justify-center gap-4 md:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {t.keyPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
              >
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-gray-700 text-sm">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quick Actions - Full Width */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-8 bg-gray-50 w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className={`flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <Download size={18} className="text-green-600" />
              <span>{t.downloadPDF}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <Printer size={18} className="text-red-600" />
              <span>{t.print}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <Share2 size={18} className="text-green-600" />
              <span>{t.share}</span>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Security Badges - Full Width */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-12 bg-white w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {securityBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-${badge.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${badge.color}-600`} />
                  </div>
                  <p className="text-xs text-gray-600">{badge.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Main Content - Full Width */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-gray-50 w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className={`grid lg:grid-cols-3 gap-8 ${isRTL ? 'lg:grid-cols-3' : ''}`}>
            {/* Sidebar Navigation */}
            <motion.div 
              variants={fadeInLeft}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-6 sticky top-24 border border-gray-200 shadow-lg">
                <h3 className={`text-lg font-bold text-gray-900 mb-4 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <FileText className="w-5 h-5 text-green-600 mr-2" />
                  {t.policySections}
                </h3>
                <ul className="space-y-2">
                  {policySections.map((section, index) => (
                    <motion.li
                      key={section.id}
                      variants={itemVariants}
                      custom={index}
                    >
                      <a
                        href={`#${section.id}`}
                        className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 transition-colors py-2 px-3 rounded-lg hover:bg-green-50 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                      >
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        <span>{section.title}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Quick Contact */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className={`text-sm font-semibold text-gray-900 mb-3 ${isRTL ? 'text-right' : ''}`}>{t.needHelp}</h4>
                  <a 
                    href="mailto:privacy@currencyexchange.com"
                    className={`flex items-center space-x-2 text-sm text-green-600 hover:text-green-700 mb-2 ${isRTL ? 'flex-row-reverse space-x-reverse justify-end' : ''}`}
                  >
                    <Mail size={14} />
                    <span>privacy@currencyexchange.com</span>
                  </a>
                  <a 
                    href="tel:+923001234567"
                    className={`flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 ${isRTL ? 'flex-row-reverse space-x-reverse justify-end' : ''}`}
                  >
                    <Phone size={14} />
                    <span>+92 300 1234567</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Policy Content */}
            <motion.div 
              variants={fadeInRight}
              className="lg:col-span-2 space-y-8"
            >
              {policySections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  variants={itemVariants}
                  custom={index}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg scroll-mt-24"
                >
                  <div className={`flex items-start space-x-4 mb-6 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0`}>
                      {section.icon}
                    </div>
                    <h2 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : ''}`}>{section.title}</h2>
                  </div>

                  <div className="space-y-4">
                    <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                      {section.content}
                    </p>

                    {section.list && (
                      <ul className="space-y-2 mt-4">
                        {section.list.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-start space-x-3 text-gray-600 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                          >
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-1" />
                            <span className={isRTL ? 'text-right' : ''}>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {section.note && (
                      <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-yellow-700">{section.note}</p>
                        </div>
                      </div>
                    )}

                    {section.contactInfo && (
                      <div className="mt-6 space-y-3">
                        {section.contactInfo.map((item, idx) => {
                          const Icon = item.icon;
                          return item.href ? (
                            <a
                              key={idx}
                              href={item.href}
                              className={`flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse justify-end' : ''}`}
                            >
                              <Icon size={18} className="text-red-500" />
                              <span>{item.text}</span>
                            </a>
                          ) : (
                            <div key={idx} className={`flex items-center space-x-3 text-gray-600 ${isRTL ? 'flex-row-reverse space-x-reverse justify-end' : ''}`}>
                              <Icon size={18} className="text-red-500" />
                              <span>{item.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Consent Section */}
              <motion.div
                variants={scaleIn}
                className="bg-gradient-to-r from-green-600 to-red-600 rounded-2xl p-8 text-white"
              >
                <h3 className={`text-xl font-bold mb-4 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <BellRing className={`w-6 h-6 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t.yourConsent}
                </h3>
                <p className={`mb-6 text-white/90 ${isRTL ? 'text-right' : ''}`}>
                  {t.consentText}
                </p>
                <div className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    {t.acceptAll}
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                    {t.managePreferences}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section - Full Width */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-white w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className={`text-center mb-12 ${isRTL ? 'text-right' : ''}`}>
            <motion.span 
              variants={itemVariants}
              className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2 block"
            >
              {t.faq}
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {t.commonQuestions}
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A },
              { q: t.faq5Q, a: t.faq5A }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-green-500/30 transition-all duration-300"
              >
                <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : ''}`}>{faq.q}</h3>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : ''}`}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Update Notification - Full Width */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="pb-16 w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-black rounded-2xl p-8 text-center">
            <Bell className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className={`text-2xl font-bold text-white mb-2 ${isRTL ? 'text-center' : ''}`}>{t.stayUpdated}</h3>
            <p className={`text-gray-400 mb-6 max-w-2xl mx-auto ${isRTL ? 'text-center' : ''}`}>
              {t.updateText}
            </p>
            <div className={`flex max-w-md mx-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
              <input
                type="email"
                placeholder={t.enterEmail}
                className={`flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-l-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500 ${isRTL ? 'rounded-r-xl rounded-l-none' : 'rounded-l-xl rounded-r-none'}`}
              />
              <button className={`px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 ${isRTL ? 'rounded-r-xl rounded-l-none' : 'rounded-r-xl rounded-l-none'}`}>
                {t.subscribe}
              </button>
            </div>
          </div>
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
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </motion.div>
  );
};

export default PrivacyPolicy;