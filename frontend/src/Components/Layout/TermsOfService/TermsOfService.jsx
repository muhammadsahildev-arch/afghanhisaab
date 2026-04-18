import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  FileText,
  Scale,
  Gavel,
  AlertCircle,
  CheckCircle,
  Globe,
  Mail,
  Phone,
  Clock,
  Download,
  Printer,
  Share2,
  Users,
  Shield,
  Lock,
  Eye,
  CreditCard,
  UserCheck,
  Bell,
  RefreshCw,
  MapPin,
  Calendar,
  FileCheck,
  FileWarning,
  BookOpen,
  HelpCircle,
  Info,
  AlertTriangle,
  Ban,
  DollarSign,
  ArrowLeftRight,
  Landmark,
  Briefcase,
  Loader
} from 'lucide-react';

const translations = {
  en: {
    // Hero Section
    termsOfService: "Terms of Service",
    pleaseReadCarefully: "Please read these terms carefully before using our currency exchange services.",
    lastUpdated: "Last Updated",
    effective: "Effective",
    version: "Version",
    
    // Key Points
    mustBe18: "Must be 18+ to use",
    transactionsFinal: "Transactions are final",
    feesApply: "Fees apply",
    noIllegalUse: "No illegal use",
    weProtectData: "We protect your data",
    termsMayChange: "Terms may change",
    
    // Action Buttons
    downloadTerms: "Download Terms",
    print: "Print",
    share: "Share",
    
    // Agreement Highlights
    secureTransactions: "Secure Transactions",
    service247: "24/7 Service",
    globalOperations: "Global Operations",
    competitiveRates: "Competitive Rates",
    dataProtection: "Data Protection",
    verifiedUsers: "Verified Users",
    
    // Sidebar
    termsSections: "Terms Sections",
    needHelp: "Need Help?",
    importantNotice: "Important Notice",
    legallyBinding: "These terms constitute a legally binding agreement. Please read carefully.",
    
    // Terms Sections
    acceptanceTitle: "1. Acceptance of Terms",
    acceptanceContent: "By accessing or using CurrencyExchange's services, website, or mobile applications, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.",
    
    eligibilityTitle: "2. Eligibility",
    eligibilityContent: "To use our services, you must:",
    eligibilityList1: "Be at least 18 years of age",
    eligibilityList2: "Have the legal capacity to enter into binding contracts",
    eligibilityList3: "Provide accurate and complete registration information",
    eligibilityList4: "Not be located in a country that is subject to sanctions",
    eligibilityList5: "Not be using our services for illegal purposes",
    eligibilityNote: "We reserve the right to verify your identity and eligibility at any time.",
    
    accountsTitle: "3. Account Registration",
    accountsContent: "When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.",
    accountsList1: "You are responsible for maintaining the security of your account",
    accountsList2: "You are fully responsible for all activities that occur under your account",
    accountsList3: "You must notify us immediately of any unauthorized use of your account",
    accountsList4: "We cannot and will not be liable for any loss or damage arising from your failure to comply",
    accountsList5: "You may not use as a username the name of another person or entity",
    
    servicesTitle: "4. Currency Exchange Services",
    servicesContent: "Our currency exchange services allow you to convert between different currencies at rates determined by us. By using our services, you acknowledge and agree that:",
    servicesList1: "Exchange rates are subject to change without notice",
    servicesList2: "All transactions are final and non-refundable once processed",
    servicesList3: "We may limit transaction amounts for security purposes",
    servicesList4: "Additional verification may be required for large transactions",
    servicesList5: "We reserve the right to refuse or cancel any transaction",
    servicesList6: "Processing times may vary based on payment method",
    
    feesTitle: "5. Fees and Charges",
    feesContent: "We charge fees for our currency exchange services. All applicable fees will be disclosed before you complete a transaction. By completing a transaction, you agree to pay all fees and charges associated with your use of our services.",
    feesList1: "Exchange rate margins",
    feesList2: "Transaction fees (where applicable)",
    feesList3: "Wire transfer fees",
    feesList4: "International payment fees",
    feesList5: "Early withdrawal or cancellation fees",
    feesNote: "Fees are subject to change with prior notice. We will notify you of any fee changes at least 30 days in advance.",
    
    paymentsTitle: "6. Payments and Transactions",
    paymentsContent: "When you initiate a transaction, you authorize us to process the payment and complete the currency exchange. You represent and warrant that:",
    paymentsList1: "You have the legal right to use any payment method you provide",
    paymentsList2: "The payment information you provide is true and correct",
    paymentsList3: "You will not use our services for any fraudulent or illegal activity",
    paymentsList4: "You will comply with all applicable laws and regulations",
    paymentsList5: "You have sufficient funds to complete the transaction",
    
    limitsTitle: "7. Transaction Limits",
    limitsContent: "We may impose transaction limits on your account for security and regulatory compliance reasons. These limits may include:",
    limitsList1: "Minimum and maximum transaction amounts",
    limitsList2: "Daily, weekly, or monthly transaction limits",
    limitsList3: "Cumulative transaction limits",
    limitsList4: "Limits based on verification level",
    limitsList5: "Geographic restrictions",
    limitsNote: "We may adjust these limits at our discretion and without prior notice.",
    
    prohibitedTitle: "8. Prohibited Activities",
    prohibitedContent: "You may not use our services for any illegal or unauthorized purpose. Prohibited activities include, but are not limited to:",
    prohibitedList1: "Money laundering or terrorist financing",
    prohibitedList2: "Fraud or deceptive practices",
    prohibitedList3: "Gambling or illegal gaming transactions",
    prohibitedList4: "Purchasing illegal goods or services",
    prohibitedList5: "Circumventing our transaction limits or security measures",
    prohibitedList6: "Impersonating another person or entity",
    prohibitedList7: "Interfering with the proper functioning of our services",
    prohibitedList8: "Reverse engineering our software or systems",
    
    intellectualTitle: "9. Intellectual Property",
    intellectualContent: "The Service and its original content, features, and functionality are and will remain the exclusive property of CurrencyExchange and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.",
    intellectualList1: "All content on our website is protected by copyright",
    intellectualList2: "You may not copy, modify, or distribute our content",
    intellectualList3: "You retain ownership of your data",
    intellectualList4: "You grant us a license to use your data to provide services",
    
    terminationTitle: "10. Termination",
    terminationContent: "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.",
    terminationList1: "You may terminate your account at any time",
    terminationList2: "Upon termination, your right to use the Service will immediately cease",
    terminationList3: "We may retain your information as required by law",
    terminationList4: "Certain provisions of the Terms will survive termination",
    
    liabilityTitle: "11. Limitation of Liability",
    liabilityContent: "To the maximum extent permitted by law, in no event shall CurrencyExchange, its directors, employees, partners, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:",
    liabilityList1: "Your use or inability to use the Service",
    liabilityList2: "Any conduct or content of any third party on the Service",
    liabilityList3: "Any content obtained from the Service",
    liabilityList4: "Unauthorized access, use, or alteration of your transmissions or content",
    liabilityNote: "Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for certain types of damages, so some of the above limitations may not apply to you.",
    
    indemnificationTitle: "12. Indemnification",
    indemnificationContent: "You agree to defend, indemnify, and hold harmless CurrencyExchange and its licensees, licensors, employees, contractors, officers, and directors from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from:",
    indemnificationList1: "Your use of and access to the Service",
    indemnificationList2: "Your violation of any term of these Terms",
    indemnificationList3: "Your violation of any third-party right",
    indemnificationList4: "Any claim that your content caused damage to a third party",
    
    disclaimersTitle: "13. Disclaimers",
    disclaimersContent: "Your use of the Service is at your sole risk. The Service is provided on an 'AS IS' and 'AS AVAILABLE' basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.",
    disclaimersList1: "We do not warrant that the Service will function uninterrupted",
    disclaimersList2: "We do not warrant that errors will be corrected",
    disclaimersList3: "We do not warrant that the Service is free of viruses",
    disclaimersList4: "We do not guarantee the accuracy of exchange rates",
    
    governingTitle: "14. Governing Law",
    governingContent: "These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.",
    governingNote: "Any disputes arising under these Terms shall be resolved exclusively by the courts located in Karachi, Pakistan.",
    
    changesTitle: "15. Changes to Terms",
    changesContent: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
    
    contactTitle: "16. Contact Us",
    contactContent: "If you have any questions about these Terms, please contact us at:",
    
    // FAQ Section
    faq: "FAQ",
    commonQuestions: "Common",
    questions: "Questions",
    faq1Q: "Can I cancel a transaction after it's been processed?",
    faq1A: "Once a currency exchange transaction has been processed and confirmed, it cannot be canceled or reversed. Please verify all details before completing your transaction.",
    faq2Q: "How are exchange rates determined?",
    faq2A: "Our exchange rates are based on real-time market rates plus a transparent margin. Rates are clearly displayed before you confirm any transaction.",
    faq3Q: "What happens if my account is compromised?",
    faq3A: "You must notify us immediately if you suspect unauthorized access. We'll help secure your account and investigate any unauthorized transactions.",
    faq4Q: "Are there any hidden fees?",
    faq4A: "No, we believe in transparency. All fees and charges are clearly disclosed before you complete any transaction. There are no hidden fees.",
    faq5Q: "How do I close my account?",
    faq5A: "You can close your account by contacting our support team. Any pending transactions must be completed before account closure.",
    
    // Legal Notice
    legalCompliance: "Legal Compliance",
    compliantText: "Fully compliant with Pakistani financial regulations",
    licensed: "Licensed",
    sbpRegulated: "SBP Regulated",
    insured: "Insured",
    fundsProtected: "Funds Protected",
    audited: "Audited",
    annualReviews: "Annual Reviews",
    
    // Agreement Section
    agreementAcknowledgment: "Agreement Acknowledgment",
    agreementText: "By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.",
    iAgree: "I Agree",
    viewSummary: "View Summary",
    
    // Loading
    loading: "Loading..."
  },
  ur: {
    // Hero Section
    termsOfService: "خدمات کی شرائط",
    pleaseReadCarefully: "براہ کرم ہماری کرنسی ایکسچینج سروسز استعمال کرنے سے پہلے ان شرائط کو غور سے پڑھیں۔",
    lastUpdated: "آخری بار اپ ڈیٹ",
    effective: "نافذ العمل",
    version: "ورژن",
    
    // Key Points
    mustBe18: "استعمال کے لیے 18+ ہونا ضروری ہے",
    transactionsFinal: "لین دین حتمی ہیں",
    feesApply: "فیس لاگو ہوتی ہے",
    noIllegalUse: "کوئی غیر قانونی استعمال نہیں",
    weProtectData: "ہم آپ کے ڈیٹا کی حفاظت کرتے ہیں",
    termsMayChange: "شرائط تبدیل ہو سکتی ہیں",
    
    // Action Buttons
    downloadTerms: "شرائط ڈاؤن لوڈ کریں",
    print: "پرنٹ کریں",
    share: "شیئر کریں",
    
    // Agreement Highlights
    secureTransactions: "محفوظ لین دین",
    service247: "24/7 سروس",
    globalOperations: "عالمی آپریشنز",
    competitiveRates: "مسابقتی شرحیں",
    dataProtection: "ڈیٹا کا تحفظ",
    verifiedUsers: "تصدیق شدہ صارفین",
    
    // Sidebar
    termsSections: "شرائط کے حصے",
    needHelp: "مدد درکار ہے؟",
    importantNotice: "اہم نوٹس",
    legallyBinding: "یہ شرائط ایک قانونی طور پر پابند معاہدہ ہیں۔ براہ کرم غور سے پڑھیں۔",
    
    // Terms Sections
    acceptanceTitle: "1. شرائط کی قبولیت",
    acceptanceContent: "کرنسی ایکسچینج کی خدمات، ویب سائٹ یا موبائل ایپلیکیشنز تک رسائی یا استعمال کرکے، آپ خدمات کی ان شرائط اور تمام قابل اطلاق قوانین و ضوابط کا پابند ہونے سے اتفاق کرتے ہیں۔ اگر آپ ان شرائط کے کسی حصے سے متفق نہیں ہیں، تو آپ ہماری خدمات استعمال نہیں کر سکتے۔",
    
    eligibilityTitle: "2. اہلیت",
    eligibilityContent: "ہماری خدمات استعمال کرنے کے لیے، آپ کو ضروری ہے:",
    eligibilityList1: "کم از کم 18 سال کی عمر کا ہونا",
    eligibilityList2: "پابند معاہدوں میں داخل ہونے کی قانونی اہلیت رکھنا",
    eligibilityList3: "درست اور مکمل رجسٹریشن معلومات فراہم کرنا",
    eligibilityList4: "ایسے ملک میں موجود نہ ہونا جو پابندیوں کا شکار ہو",
    eligibilityList5: "ہماری خدمات کو غیر قانونی مقاصد کے لیے استعمال نہ کرنا",
    eligibilityNote: "ہم کسی بھی وقت آپ کی شناخت اور اہلیت کی تصدیق کا حق محفوظ رکھتے ہیں۔",
    
    accountsTitle: "3. اکاؤنٹ رجسٹریشن",
    accountsContent: "جب آپ ہمارے ساتھ اکاؤنٹ بناتے ہیں، تو آپ کو درست، مکمل اور موجودہ معلومات فراہم کرنی ہوتی ہیں۔ ایسا نہ کرنا شرائط کی خلاف ورزی ہے، جس کے نتیجے میں آپ کا اکاؤنٹ فوری طور پر ختم کیا جا سکتا ہے۔",
    accountsList1: "آپ اپنے اکاؤنٹ کی سیکیورٹی برقرار رکھنے کے ذمہ دار ہیں",
    accountsList2: "آپ اپنے اکاؤنٹ کے تحت ہونے والی تمام سرگرمیوں کے مکمل ذمہ دار ہیں",
    accountsList3: "آپ کو اپنے اکاؤنٹ کے کسی غیر مجاز استعمال کی فوری اطلاع ہمیں دینی ہوگی",
    accountsList4: "ہم آپ کی عدم تعمیل سے پیدا ہونے والے کسی نقصان کے ذمہ دار نہیں ہوں گے",
    accountsList5: "آپ کسی دوسرے شخص یا ادارے کا نام بطور صارف نام استعمال نہیں کر سکتے",
    
    servicesTitle: "4. کرنسی ایکسچینج خدمات",
    servicesContent: "ہماری کرنسی ایکسچینج خدمات آپ کو ہمارے مقرر کردہ نرخوں پر مختلف کرنسیوں کے درمیان تبدیل کرنے کی اجازت دیتی ہیں۔ ہماری خدمات استعمال کرکے، آپ تسلیم اور اتفاق کرتے ہیں کہ:",
    servicesList1: "تبادلہ کی شرحیں بغیر اطلاع کے تبدیل ہو سکتی ہیں",
    servicesList2: "پروسیس ہونے کے بعد تمام لین دین حتمی اور ناقابل واپسی ہوتے ہیں",
    servicesList3: "ہم سیکیورٹی مقاصد کے لیے لین دین کی مقدار محدود کر سکتے ہیں",
    servicesList4: "بڑے لین دین کے لیے اضافی تصدیق کی ضرورت ہو سکتی ہے",
    servicesList5: "ہم کسی بھی لین دین کو مسترد یا منسوخ کرنے کا حق محفوظ رکھتے ہیں",
    servicesList6: "پروسیسنگ کا وقت ادائیگی کے طریقے کے مطابق مختلف ہو سکتا ہے",
    
    feesTitle: "5. فیس اور چارجز",
    feesContent: "ہم اپنی کرنسی ایکسچینج خدمات کے لیے فیس وصول کرتے ہیں۔ تمام قابل اطلاق فیس آپ کے لین دین مکمل کرنے سے پہلے ظاہر کر دی جائیں گی۔ لین دین مکمل کرکے، آپ اپنی خدمات کے استعمال سے منسلک تمام فیسوں اور چارجز کی ادائیگی سے اتفاق کرتے ہیں۔",
    feesList1: "تبادلہ شرح کا مارجن",
    feesList2: "لین دین کی فیس (جہاں قابل اطلاق ہو)",
    feesList3: "وائر ٹرانسفر فیس",
    feesList4: "بین الاقوامی ادائیگی کی فیس",
    feesList5: "جلد نکالنے یا منسوخی کی فیس",
    feesNote: "فیس پیشگی اطلاع کے ساتھ تبدیل ہو سکتی ہے۔ ہم کسی بھی فیس تبدیلی کے بارے میں کم از کم 30 دن پہلے مطلع کریں گے۔",
    
    paymentsTitle: "6. ادائیگیاں اور لین دین",
    paymentsContent: "جب آپ لین دین شروع کرتے ہیں، تو آپ ہمیں ادائیگی پر کارروائی کرنے اور کرنسی کا تبادلہ مکمل کرنے کی اجازت دیتے ہیں۔ آپ ظاہر اور ضمانت دیتے ہیں کہ:",
    paymentsList1: "آپ کو اپنے فراہم کردہ ادائیگی کے کسی بھی طریقے کو استعمال کرنے کا قانونی حق حاصل ہے",
    paymentsList2: "آپ کی فراہم کردہ ادائیگی کی معلومات سچی اور درست ہیں",
    paymentsList3: "آپ ہماری خدمات کو کسی دھوکہ دہی یا غیر قانونی سرگرمی کے لیے استعمال نہیں کریں گے",
    paymentsList4: "آپ تمام قابل اطلاق قوانین اور ضوابط کی تعمیل کریں گے",
    paymentsList5: "آپ کے پاس لین دین مکمل کرنے کے لیے کافی فنڈز ہیں",
    
    limitsTitle: "7. لین دین کی حدود",
    limitsContent: "ہم سیکیورٹی اور ریگولیٹری تعمیل کی وجوہات کی بنا پر آپ کے اکاؤنٹ پر لین دین کی حدود عائد کر سکتے ہیں۔ ان حدود میں شامل ہو سکتے ہیں:",
    limitsList1: "کم از کم اور زیادہ سے زیادہ لین دین کی مقدار",
    limitsList2: "یومیہ، ہفتہ وار، یا ماہانہ لین دین کی حدود",
    limitsList3: "مجموعی لین دین کی حدود",
    limitsList4: "تصدیق کی سطح پر مبنی حدود",
    limitsList5: "جغرافیائی پابندیاں",
    limitsNote: "ہم اپنی صوابدید پر اور بغیر پیشگی اطلاع کے ان حدود کو ایڈجسٹ کر سکتے ہیں۔",
    
    prohibitedTitle: "8. ممنوعہ سرگرمیاں",
    prohibitedContent: "آپ ہماری خدمات کو کسی غیر قانونی یا غیر مجاز مقصد کے لیے استعمال نہیں کر سکتے۔ ممنوعہ سرگرمیوں میں شامل ہیں، لیکن ان تک محدود نہیں:",
    prohibitedList1: "منی لانڈرنگ یا دہشت گردی کی مالی معاونت",
    prohibitedList2: "دھوکہ دہی یا فریب دہ طریقے",
    prohibitedList3: "جوئے یا غیر قانونی گیمنگ لین دین",
    prohibitedList4: "غیر قانونی اشیاء یا خدمات کی خریداری",
    prohibitedList5: "ہمارے لین دین کی حدود یا حفاظتی اقدامات کو نظرانداز کرنا",
    prohibitedList6: "کسی دوسرے شخص یا ادارے کا روپ دھارنا",
    prohibitedList7: "ہماری خدمات کے مناسب کام میں مداخلت کرنا",
    prohibitedList8: "ہمارے سافٹ ویئر یا سسٹمز کا ریورس انجینئرنگ کرنا",
    
    intellectualTitle: "9. دانشورانہ املاک",
    intellectualContent: "یہ سروس اور اس کا اصل مواد، خصوصیات، اور فعالیت کرنسی ایکسچینج اور اس کے لائسنس دہندگان کی خصوصی ملکیت ہیں اور رہیں گی۔ ہمارے ٹریڈ مارک اور ٹریڈ ڈریس کو ہماری پیشگی تحریری رضامندی کے بغیر کسی بھی مصنوعہ یا خدمت کے سلسلے میں استعمال نہیں کیا جا سکتا۔",
    intellectualList1: "ہماری ویب سائٹ پر موجود تمام مواد کاپی رائٹ کے ذریعے محفوظ ہے",
    intellectualList2: "آپ ہمارے مواد کو کاپی، ترمیم، یا تقسیم نہیں کر سکتے",
    intellectualList3: "آپ اپنے ڈیٹا کی ملکیت برقرار رکھتے ہیں",
    intellectualList4: "آپ ہمیں خدمات فراہم کرنے کے لیے آپ کا ڈیٹا استعمال کرنے کا لائسنس دیتے ہیں",
    
    terminationTitle: "10. خاتمہ",
    terminationContent: "ہم آپ کا اکاؤنٹ ختم یا معطل کر سکتے ہیں اور سروس تک رسائی کو فوری طور پر روک سکتے ہیں، بغیر پیشگی اطلاع یا ذمہ داری کے، اپنی صوابدید پر، کسی بھی وجہ سے، بشمول بغیر کسی حد کے اگر آپ شرائط کی خلاف ورزی کرتے ہیں۔",
    terminationList1: "آپ کسی بھی وقت اپنا اکاؤنٹ ختم کر سکتے ہیں",
    terminationList2: "خاتمے پر، سروس استعمال کرنے کا آپ کا حق فوری طور پر ختم ہو جائے گا",
    terminationList3: "ہم قانون کے مطابق آپ کی معلومات برقرار رکھ سکتے ہیں",
    terminationList4: "شرائط کی بعض دفعات خاتمے کے بعد بھی برقرار رہیں گی",
    
    liabilityTitle: "11. ذمہ داری کی حد",
    liabilityContent: "قانون کی طرف سے زیادہ سے زیادہ حد تک، کسی بھی صورت میں کرنسی ایکسچینج، اس کے ڈائریکٹرز، ملازمین، شراکت داروں، یا ایجنٹس کسی بھی بالواسطہ، واقعاتی، خصوصی، نتیجہ خیز، یا تعزیری ہرجانے کے ذمہ دار نہیں ہوں گے، بشمول بغیر کسی حد کے، منافع، ڈیٹا، استعمال، خواہش حسن، یا دیگر غیر محسوس نقصانات، جو اس کے نتیجے میں ہوں:",
    liabilityList1: "آپ کا سروس کا استعمال یا استعمال کرنے میں ناکامی",
    liabilityList2: "سروس پر کسی تیسرے فریق کا کوئی رویہ یا مواد",
    liabilityList3: "سروس سے حاصل کردہ کوئی بھی مواد",
    liabilityList4: "آپ کی ترسیلات یا مواد تک غیر مجاز رسائی، استعمال، یا تبدیلی",
    liabilityNote: "کچھ دائرہ اختیار بعض وارنٹیز کے اخراج یا بعض اقسام کے نقصانات کے لیے ذمہ داری کی حد کی اجازت نہیں دیتے، لہذا مندرجہ بالا میں سے کچھ حدیں آپ پر لاگو نہیں ہو سکتیں۔",
    
    indemnificationTitle: "12. معاوضہ",
    indemnificationContent: "آپ کرنسی ایکسچینج اور اس کے لائسنس یافتگان، لائسنس دہندگان، ملازمین، ٹھیکیداروں، افسران، اور ڈائریکٹرز کو ان سے پیدا ہونے والے تمام دعووں، ہرجانوں، ذمہ داریوں، نقصانات، اخراجات، یا قرض، اور مصارف سے بچانے، معاوضہ دینے، اور بے ضرر رکھنے سے اتفاق کرتے ہیں:",
    indemnificationList1: "آپ کا سروس کا استعمال اور رسائی",
    indemnificationList2: "آپ کی ان شرائط کی کسی بھی شق کی خلاف ورزی",
    indemnificationList3: "آپ کی کسی تیسرے فریق کے حق کی خلاف ورزی",
    indemnificationList4: "کوئی بھی دعویٰ کہ آپ کے مواد نے کسی تیسرے فریق کو نقصان پہنچایا",
    
    disclaimersTitle: "13. اعلان دستبرداری",
    disclaimersContent: "سروس کا آپ کا استعمال آپ کے اپنے خطرے پر ہے۔ سروس 'جیسی ہے' اور 'جیسے دستیاب ہے' کی بنیاد پر فراہم کی جاتی ہے۔ سروس بغیر کسی قسم کی وارنٹی کے فراہم کی جاتی ہے، خواہ ظاہری ہو یا مضمر، بشمول، لیکن ان تک محدود نہیں، تجارتی قابلیت، کسی خاص مقصد کے لیے مناسبت، عدم خلاف ورزی، یا کارکردگی کے دوران کی مضمر وارنٹیاں۔",
    disclaimersList1: "ہم اس بات کی وارنٹی نہیں دیتے کہ سروس بلا تعطل کام کرے گی",
    disclaimersList2: "ہم اس بات کی وارنٹی نہیں دیتے کہ خرابیوں کو درست کیا جائے گا",
    disclaimersList3: "ہم اس بات کی وارنٹی نہیں دیتے کہ سروس وائرس سے پاک ہے",
    disclaimersList4: "ہم شرح تبادلہ کی درستگی کی ضمانت نہیں دیتے",
    
    governingTitle: "14. حکمرانی کا قانون",
    governingContent: "یہ شرائط پاکستان کے قوانین کے مطابق زیر انتظام اور تشریح کی جائیں گی، بغیر اس کے قانون کے تصادم کی دفعات کے۔ ان شرائط کے کسی حق یا شق کو نافذ کرنے میں ہماری ناکامی ان حقوق کی دستبرداری نہیں سمجھی جائے گی۔",
    governingNote: "ان شرائط کے تحت پیدا ہونے والے کسی بھی تنازع کو خصوصی طور پر کراچی، پاکستان میں واقع عدالتوں کے ذریعے حل کیا جائے گا۔",
    
    changesTitle: "15. شرائط میں تبدیلیاں",
    changesContent: "ہم کسی بھی وقت، اپنی صوابدید پر، ان شرائط میں ترمیم یا تبدیلی کا حق محفوظ رکھتے ہیں۔ اگر نظر ثانی اہم ہے، تو ہم کسی بھی نئی شرائط کے نافذ ہونے سے کم از کم 30 دن پہلے اطلاع دینے کی کوشش کریں گے۔ کیا اہم تبدیلی ہے اس کا تعین ہماری صوابدید پر کیا جائے گا۔",
    
    contactTitle: "16. ہم سے رابطہ کریں",
    contactContent: "اگر ان شرائط کے بارے میں آپ کے کوئی سوالات ہیں، تو براہ کرم ہم سے اس پر رابطہ کریں:",
    
    // FAQ Section
    faq: "عمومی سوالات",
    commonQuestions: "عمومی",
    questions: "سوالات",
    faq1Q: "کیا میں لین دین پروسیس ہونے کے بعد اسے منسوخ کر سکتا ہوں؟",
    faq1A: "ایک بار کرنسی ایکسچینج لین دین پروسیس اور تصدیق ہو جانے کے بعد، اسے منسوخ یا واپس نہیں کیا جا سکتا۔ براہ کرم اپنا لین دین مکمل کرنے سے پہلے تمام تفصیلات کی تصدیق کریں۔",
    faq2Q: "شرح تبادلہ کیسے طے ہوتی ہے؟",
    faq2A: "ہماری شرح تبادلہ ریئل ٹائم مارکیٹ ریٹس کے علاوہ ایک شفاف مارجن پر مبنی ہے۔ شرحیں آپ کے کسی بھی لین دین کی تصدیق کرنے سے پہلے واضح طور پر ظاہر کی جاتی ہیں۔",
    faq3Q: "اگر میرا اکاؤنٹ سمجھوتہ ہو جائے تو کیا ہوگا؟",
    faq3A: "اگر آپ کو غیر مجاز رسائی کا شبہ ہو تو آپ کو فوری طور پر ہمیں مطلع کرنا ہوگا۔ ہم آپ کے اکاؤنٹ کو محفوظ بنانے اور کسی بھی غیر مجاز لین دین کی تحقیقات میں مدد کریں گے۔",
    faq4Q: "کیا کوئی پوشیدہ فیس ہے؟",
    faq4A: "نہیں، ہم شفافیت پر یقین رکھتے ہیں۔ تمام فیس اور چارجز آپ کے کسی بھی لین دین کو مکمل کرنے سے پہلے واضح طور پر ظاہر کر دیے جاتے ہیں۔ کوئی پوشیدہ فیس نہیں ہے۔",
    faq5Q: "میں اپنا اکاؤنٹ کیسے بند کروں؟",
    faq5A: "آپ ہماری سپورٹ ٹیم سے رابطہ کرکے اپنا اکاؤنٹ بند کر سکتے ہیں۔ اکاؤنٹ بند کرنے سے پہلے کسی بھی زیر التواء لین دین کو مکمل کرنا ہوگا۔",
    
    // Legal Notice
    legalCompliance: "قانونی تعمیل",
    compliantText: "پاکستانی مالیاتی ضوابط کی مکمل تعمیل",
    licensed: "لائسنس یافتہ",
    sbpRegulated: "ایس بی پی ریگولیٹڈ",
    insured: "انشورنس شدہ",
    fundsProtected: "فنڈز محفوظ",
    audited: "آڈٹ شدہ",
    annualReviews: "سالانہ جائزے",
    
    // Agreement Section
    agreementAcknowledgment: "معاہدے کا اعتراف",
    agreementText: "ہماری خدمات استعمال کرکے، آپ تسلیم کرتے ہیں کہ آپ نے خدمات کی شرائط کو پڑھ لیا ہے، سمجھ لیا ہے، اور ان کا پابند ہونے پر اتفاق کرتے ہیں۔",
    iAgree: "میں متفق ہوں",
    viewSummary: "خلاصہ دیکھیں",
    
    // Loading
    loading: "لوڈ ہو رہا ہے..."
  },
  pa: {
    // Hero Section - Shahmukhi Punjabi
    termsOfService: "سروس دی شرطاں",
    pleaseReadCarefully: "مہربانی کرکے ساڈی کرنسی ایکسچینج سروسز استعمال کرن توں پہلے انہاں شرطاں نوں غلط نال پڑھو۔",
    lastUpdated: "آخری وار اپڈیٹ",
    effective: "نافذ العمل",
    version: "ورژن",
    
    // Key Points
    mustBe18: "استعمال لئی 18+ ہونا ضروری اے",
    transactionsFinal: "لین دین حتمی نیں",
    feesApply: "فیس لاگو ہوندی اے",
    noIllegalUse: "کوئی غیر قانونی استعمال نئیں",
    weProtectData: "اسيں تواڈے ڈیٹا دی حفاظت کردے آں",
    termsMayChange: "شرطاں بدل سکدیاں نیں",
    
    // Action Buttons
    downloadTerms: "شرطاں ڈاؤن لوڈ کرو",
    print: "پرنٹ کرو",
    share: "شیئر کرو",
    
    // Agreement Highlights
    secureTransactions: "محفوظ لین دین",
    service247: "24/7 سروس",
    globalOperations: "عالمی آپریشنز",
    competitiveRates: "مسابقتی شرحاں",
    dataProtection: "ڈیٹا دا تحفظ",
    verifiedUsers: "تصدیق شدہ صارفین",
    
    // Sidebar
    termsSections: "شرطاں دے حصے",
    needHelp: "مدد چاہیدی اے؟",
    importantNotice: "اہم نوٹس",
    legallyBinding: "ایہہ شرطاں اک قانونی طور تے پابند معاہدہ نیں۔ مہربانی کرکے غلط نال پڑھو۔",
    
    // Terms Sections
    acceptanceTitle: "1. شرطاں دی قبولیت",
    acceptanceContent: "کرنسی ایکسچینج دیاں سروسز، ویب سائٹ یا موبائل ایپلیکیشنز تک رسائی یا استعمال کرکے، تسیں سروس دیاں انہاں شرطاں تے تمام قابل اطلاق قوانین و ضوابط دا پابند ہون نال اتفاق کردے او۔ جے تسیں انہاں شرطاں دے کسے حصے نال متفق نئیں ہو، تے تسیں ساڈیاں سروسز استعمال نئیں کر سکدے۔",
    
    eligibilityTitle: "2. اہلیت",
    eligibilityContent: "ساڈیاں سروسز استعمال کرن لئی، تواڈے لئی ضروری اے:",
    eligibilityList1: "گھٹ توں گھٹ 18 سال دی عمر دا ہونا",
    eligibilityList2: "پابند معاہدیاں وچ داخل ہون دی قانونی اہلیت رکھنا",
    eligibilityList3: "درست تے مکمل رجسٹریشن معلومات فراہم کرنا",
    eligibilityList4: "ایسے ملک وچ موجود نہ ہونا جو پابندیاں دا شکار ہووے",
    eligibilityList5: "ساڈیاں سروسز نوں غیر قانونی مقصداں لئی استعمال نہ کرنا",
    eligibilityNote: "اسيں کسے وی ویلے تواڈی شناخت تے اہلیت دی تصدیق دا حق محفوظ رکھدے آں۔",
    
    accountsTitle: "3. اکاؤنٹ رجسٹریشن",
    accountsContent: "جدوں تسیں ساڈے نال اکاؤنٹ بندے او، تے تسیں درست، مکمل تے موجودہ معلومات فراہم کرنی ہوندی اے۔ ایسا نہ کرنا شرطاں دی خلاف ورزی اے، جس دے نتیجے وچ تواڈا اکاؤنٹ فوری طور تے ختم کیتا جا سکدا اے۔",
    accountsList1: "تسیں اپنے اکاؤنٹ دی سیکیورٹی برقرار رکھن دے ذمہ دار او",
    accountsList2: "تسیں اپنے اکاؤنٹ دے تھلے ہون والیاں تمام سرگرمیاں دے مکمل ذمہ دار او",
    accountsList3: "تسیں اپنے اکاؤنٹ دے کسے غیر مجاز استعمال دی فوری اطلاع سانوں دینی ہوویگی",
    accountsList4: "اسيں تواڈی عدم تعمیل توں پیدا ہون والے کسے نقصان دے ذمہ دار نئیں ہون گے",
    accountsList5: "تسیں کسے دوجے شخص یا ادارے دا ناں بطور صارف نام استعمال نئیں کر سکدے",
    
    servicesTitle: "4. کرنسی ایکسچینج سروسز",
    servicesContent: "ساڈیاں کرنسی ایکسچینج سروسز تواڈے نوں ساڈے مقرر کردہ نرخاں تے مختلف کرنسیاں دے وشکار تبدیل کرن دی اجازت دیندیاں نیں۔ ساڈیاں سروسز استعمال کرکے، تسیں تسلیم تے اتفاق کردے او کہ:",
    servicesList1: "تبادلہ دیاں شرحاں بغیر اطلاع دے بدل سکدیاں نیں",
    servicesList2: "پروسيس ہون توں بعد تمام لین دین حتمی تے ناقابل واپسی ہوندے نیں",
    servicesList3: "اسيں سیکیورٹی مقصداں لئی لین دین دی مقدار محدود کر سکدے آں",
    servicesList4: "وڈے لین دین لئی اضافی تصدیق دی لوڑ ہو سکدی اے",
    servicesList5: "اسيں کسے وی لین دین نوں مسترد یا منسوخ کرن دا حق محفوظ رکھدے آں",
    servicesList6: "پروسيسنگ دا ویلہ ادائیگی دے طریقے مطابق مختلف ہو سکدا اے",
    
    feesTitle: "5. فیس تے چارجز",
    feesContent: "اسيں اپنیاں کرنسی ایکسچینج سروسز لئی فیس وصول کردے آں۔ تمام قابل اطلاق فیس تواڈے لین دین مکمل کرن توں پہلے ظاہر کر دتیاں جان گیاں۔ لین دین مکمل کرکے، تسیں اپنیاں سروسز دے استعمال نال منسلک تمام فیسیاں تے چارجز دی ادائیگی نال اتفاق کردے او۔",
    feesList1: "تبادلہ شرح دا مارجن",
    feesList2: "لین دین دی فیس (جتھے قابل اطلاق ہووے)",
    feesList3: "وائر ٹرانسفر فیس",
    feesList4: "بین الاقوامی ادائیگی دی فیس",
    feesList5: "جلد کڈھن یا منسوخی دی فیس",
    feesNote: "فیس پیشگی اطلاع نال بدل سکدیاں نیں۔ اسيں کسے وی فیس تبدیلی بارے گھٹ توں گھٹ 30 دن پہلے مطلع کرن گے۔",
    
    paymentsTitle: "6. ادائیگیاں تے لین دین",
    paymentsContent: "جدوں تسیں لین دین شروع کردے او، تے تسیں سانوں ادائیگی تے کارروائی کرن تے کرنسی دا تبادلہ مکمل کرن دی اجازت دیندے او۔ تسیں ظاہر تے ضمانت دیندے او کہ:",
    paymentsList1: "تواڈے کول اپنے فراہم کردہ ادائیگی دے کسے وی طریقے نوں استعمال کرن دا قانونی حق حاصل اے",
    paymentsList2: "تواڈی فراہم کردہ ادائیگی دی معلومات سچی تے درست نیں",
    paymentsList3: "تسیں ساڈیاں سروسز نوں کسے دھوکہ دہی یا غیر قانونی سرگرمی لئی استعمال نئیں کرو گے",
    paymentsList4: "تسیں تمام قابل اطلاق قوانین تے ضوابط دی تعمیل کرو گے",
    paymentsList5: "تواڈے کول لین دین مکمل کرن لئی کافی فنڈز نیں",
    
    limitsTitle: "7. لین دین دیاں حداں",
    limitsContent: "اسيں سیکیورٹی تے ریگولیٹری تعمیل دیاں وجوہات دی بنا تے تواڈے اکاؤنٹ تے لین دین دیاں حداں عائد کر سکدے آں۔ انہاں حدوں وچ شامل ہو سکدے نیں:",
    limitsList1: "گھٹ توں گھٹ تے زیادہ توں زیادہ لین دین دی مقدار",
    limitsList2: "یومیہ، ہفتہ وار، یا ماہانہ لین دین دیاں حداں",
    limitsList3: "مجموعی لین دین دیاں حداں",
    limitsList4: "تصدیق دی سطح تے مبنی حداں",
    limitsList5: "جغرافیائی پابندیاں",
    limitsNote: "اسيں اپنی صوابدید تے بغیر پیشگی اطلاع دے انہاں حدوں نوں ایڈجسٹ کر سکدے آں۔",
    
    prohibitedTitle: "8. ممنوعہ سرگرمیاں",
    prohibitedContent: "تسیں ساڈیاں سروسز نوں کسے غیر قانونی یا غیر مجاز مقصد لئی استعمال نئیں کر سکدے۔ ممنوعہ سرگرمیاں وچ شامل نیں، پر انہاں تک محدود نئیں:",
    prohibitedList1: "منی لانڈرنگ یا دہشت گردی دی مالی معاونت",
    prohibitedList2: "دھوکہ دہی یا فریب دہ طریقے",
    prohibitedList3: "جوئے یا غیر قانونی گیمنگ لین دین",
    prohibitedList4: "غیر قانونی اشیاء یا خدمات دی خریداری",
    prohibitedList5: "ساڈے لین دین دیاں حدوں یا حفاظتی اقدامات نوں نظر انداز کرنا",
    prohibitedList6: "کسے دوجے شخص یا ادارے دا روپ دھارنا",
    prohibitedList7: "ساڈیاں سروسز دے مناسب کم وچ مداخلت کرنا",
    prohibitedList8: "ساڈے سافٹ ویئر یا سسٹمز دا ریورس انجینئرنگ کرنا",
    
    intellectualTitle: "9. دانشورانہ املاک",
    intellectualContent: "ایہہ سروس تے اس دا اصل مواد، خصوصیات، تے فعالیت کرنسی ایکسچینج تے اس دے لائسنس دہندگان دی خصوصی ملکیت نیں تے رہن گیاں۔ ساڈے ٹریڈ مارک تے ٹریڈ ڈریس نوں ساڈی پیشگی تحریری رضامندی دے بغیر کسے وی مصنوعہ یا خدمت دے سلسلے وچ استعمال نئیں کیتا جا سکدا۔",
    intellectualList1: "ساڈی ویب سائٹ تے موجود تمام مواد کاپی رائٹ دے ذریعے محفوظ اے",
    intellectualList2: "تسیں ساڈے مواد نوں کاپی، ترمیم، یا تقسیم نئیں کر سکدے",
    intellectualList3: "تسیں اپنے ڈیٹا دی ملکیت برقرار رکھدے او",
    intellectualList4: "تسیں سانوں خدمات فراہم کرن لئی تواڈا ڈیٹا استعمال کرن دا لائسنس دیندے او",
    
    terminationTitle: "10. خاتمہ",
    terminationContent: "اسيں تواڈا اکاؤنٹ ختم یا معطل کر سکدے آں تے سروس تک رسائی نوں فوری طور تے روک سکدے آں، بغیر پیشگی اطلاع یا ذمہ داری دے، اپنی صوابدید تے، کسے وی وجہ توں، بشمول بغیر کسے حد دے جے تسیں شرطاں دی خلاف ورزی کردے او۔",
    terminationList1: "تسیں کسے وی ویلے اپنا اکاؤنٹ ختم کر سکدے او",
    terminationList2: "خاتمے تے، سروس استعمال کرن دا تواڈا حق فوری طور تے ختم ہو جاوے گا",
    terminationList3: "اسيں قانون دے مطابق تواڈی معلومات برقرار رکھ سکدے آں",
    terminationList4: "شرطاں دیاں کجھ دفعات خاتمے توں بعد وی برقرار رہن گیاں",
    
    liabilityTitle: "11. ذمہ داری دی حد",
    liabilityContent: "قانون دی طرف توں زیادہ توں زیادہ حد تک، کسے وی صورت وچ کرنسی ایکسچینج، اس دے ڈائریکٹرز، ملازمین، شراکت داراں، یا ایجنٹس کسے وی بالواسطہ، واقعاتی، خصوصی، نتیجہ خیز، یا تعزیری ہرجانے دے ذمہ دار نئیں ہون گے، بشمول بغیر کسے حد دے، منافع، ڈیٹا، استعمال، خواہش حسن، یا دوجے غیر محسوس نقصانات، جو اس دے نتیجے وچ ہون:",
    liabilityList1: "تواڈا سروس دا استعمال یا استعمال کرن وچ ناکامی",
    liabilityList2: "سروس تے کسے تیسرے فریق دا کوئی رویہ یا مواد",
    liabilityList3: "سروس توں حاصل کردہ کوئی وی مواد",
    liabilityList4: "تواڈیاں ترسیلات یا مواد تک غیر مجاز رسائی، استعمال، یا تبدیلی",
    liabilityNote: "کجھ دائرہ اختیار کجھ وارنٹیز دے اخراج یا کجھ قسماں دے نقصانات لئی ذمہ داری دی حد دی اجازت نئیں دیندے، لہذا مندرجہ بالا وچوں کجھ حداں تواڈے تے لاگو نئیں ہو سکدیاں۔",
    
    indemnificationTitle: "12. معاوضہ",
    indemnificationContent: "تسیں کرنسی ایکسچینج تے اس دے لائسنس یافتگان، لائسنس دہندگان، ملازمین، ٹھیکیداراں، افسران، تے ڈائریکٹرز نوں انہاں توں پیدا ہون والے تمام دعوواں، ہرجانیاں، ذمہ داریاں، نقصانات، اخراجات، یا قرض، تے مصارف توں بچان، معاوضہ دین، تے بے ضرر رکھن نال اتفاق کردے او:",
    indemnificationList1: "تواڈا سروس دا استعمال تے رسائی",
    indemnificationList2: "تواڈی انہاں شرطاں دی کسے وی شق دی خلاف ورزی",
    indemnificationList3: "تواڈی کسے تیسرے فریق دے حق دی خلاف ورزی",
    indemnificationList4: "کوئی وی دعویٰ کہ تواڈے مواد نے کسے تیسرے فریق نوں نقصان پہنچایا",
    
    disclaimersTitle: "13. اعلان دستبرداری",
    disclaimersContent: "سروس دا تواڈا استعمال تواڈے اپنے خطرے تے اے۔ سروس 'جیسی اے' تے 'جیویں دستیاب اے' دی بنیاد تے فراہم کیتی جاندی اے۔ سروس بغیر کسے قسم دی وارنٹی دے فراہم کیتی جاندی اے، خواہ ظاہری ہووے یا مضمر، بشمول، لیکن انہاں تک محدود نئیں، تجارتی قابلیت، کسے خاص مقصد لئی مناسبت، عدم خلاف ورزی، یا کارکردگی دے دوران دیاں مضمر وارنٹیاں۔",
    disclaimersList1: "اسيں اس گل دی وارنٹی نئیں دیندے کہ سروس بلا تعطل کم کریگی",
    disclaimersList2: "اسيں اس گل دی وارنٹی نئیں دیندے کہ خرابیاں نوں درست کیتا جاوے گا",
    disclaimersList3: "اسيں اس گل دی وارنٹی نئیں دیندے کہ سروس وائرس توں پاک اے",
    disclaimersList4: "اسيں شرح تبادلہ دی درستگی دی ضمانت نئیں دیندے",
    
    governingTitle: "14. حکمرانی دا قانون",
    governingContent: "ایہہ شرطاں پاکستان دے قوانین دے مطابق زیر انتظام تے تشریح کیتیاں جان گیاں، بغیر اس دے قانون دے تصادم دیاں دفعات دے۔ انہاں شرطاں دے کسے حق یا شق نوں نافذ کرن وچ ساڈی ناکامی انہاں حقوق دی دستبرداری نئیں سمجھی جاوے گی۔",
    governingNote: "انہاں شرطاں دے تھلے پیدا ہون والے کسے وی تنازع نوں خصوصی طور تے کراچی، پاکستان وچ واقع عدالتاں دے ذریعے حل کیتا جاوے گا۔",
    
    changesTitle: "15. شرطاں وچ تبدیلیاں",
    changesContent: "اسيں کسے وی ویلے، اپنی صوابدید تے، انہاں شرطاں وچ ترمیم یا تبدیلی دا حق محفوظ رکھدے آں۔ جے نظر ثانی اہم اے، تے اسيں کسے وی نویاں شرطاں دے نافذ ہون توں گھٹ توں گھٹ 30 دن پہلے اطلاع دین دی کوشش کرن گے۔ کیہ اہم تبدیلی اے اس دا تعین ساڈی صوابدید تے کیتا جاوے گا۔",
    
    contactTitle: "16. ساڈے نال رابطہ کرو",
    contactContent: "جے انہاں شرطاں بارے تواڈے کوئی سوال نیں، تے مہربانی کرکے ساڈے نال اس تے رابطہ کرو:",
    
    // FAQ Section
    faq: "عام سوالات",
    commonQuestions: "عام",
    questions: "سوالات",
    faq1Q: "کیا میں لین دین پروسيس ہون توں بعد اس نوں منسوخ کر سکدا ہاں؟",
    faq1A: "اک وار کرنسی ایکسچینج لین دین پروسيس تے تصدیق ہو جان توں بعد، اس نوں منسوخ یا واپس نئیں کیتا جا سکدا۔ مہربانی کرکے اپنا لین دین مکمل کرن توں پہلے تمام تفصیلات دی تصدیق کرو۔",
    faq2Q: "شرح تبادلہ کیویں طے ہوندی اے؟",
    faq2A: "ساڈی شرح تبادلہ ریئل ٹائم مارکیٹ ریٹس دے علاوہ اک شفاف مارجن تے مبنی اے۔ شرحاں تواڈے کسے وی لین دین دی تصدیق کرن توں پہلے واضح طور تے ظاہر کیتیاں جاندیاں نیں۔",
    faq3Q: "جے میرا اکاؤنٹ سمجھوتہ ہو جاوے تے کیا ہووے گا؟",
    faq3A: "جے تواڈے نوں غیر مجاز رسائی دا شبہ ہووے تے تواڈے نوں فوری طور تے سانوں مطلع کرنا ہووے گا۔ اسيں تواڈے اکاؤنٹ نوں محفوظ بنان تے کسے وی غیر مجاز لین دین دی تحقیقات وچ مدد کرن گے۔",
    faq4Q: "کیا کوئی لکی ہوئی فیس اے؟",
    faq4A: "نئیں، اسيں شفافیت تے یقین رکھدے آں۔ تمام فیس تے چارجز تواڈے کسے وی لین دین نوں مکمل کرن توں پہلے واضح طور تے ظاہر کر دتے جاندے نیں۔ کوئی لکی ہوئی فیس نئیں اے۔",
    faq5Q: "میں اپنا اکاؤنٹ کیویں بند کراں؟",
    faq5A: "تسیں ساڈی سپورٹ ٹیم نال رابطہ کرکے اپنا اکاؤنٹ بند کر سکدے او۔ اکاؤنٹ بند کرن توں پہلے کسے وی زیر التواء لین دین نوں مکمل کرنا ہووے گا۔",
    
    // Legal Notice
    legalCompliance: "قانونی تعمیل",
    compliantText: "پاکستانی مالیاتی ضوابط دی مکمل تعمیل",
    licensed: "لائسنس یافتہ",
    sbpRegulated: "ایس بی پی ریگولیٹڈ",
    insured: "انشورنس شدہ",
    fundsProtected: "فنڈز محفوظ",
    audited: "آڈٹ شدہ",
    annualReviews: "سالانہ جائزے",
    
    // Agreement Section
    agreementAcknowledgment: "معاہدے دا اعتراف",
    agreementText: "ساڈیاں خدمات استعمال کرکے، تسیں تسلیم کردے او کہ تسیں نے خدمات دیاں شرطاں نوں پڑھ لیا اے، سمجھ لیا اے، تے انہاں دا پابند ہون تے اتفاق کردے او۔",
    iAgree: "میں متفق ہاں",
    viewSummary: "خلاصہ ویکھو",
    
    // Loading
    loading: "لوڈ ہو رہا اے..."
  },
  fa: {
    // Hero Section
    termsOfService: "شرایط خدمات",
    pleaseReadCarefully: "لطفاً قبل از استفاده از خدمات تبدیل ارز ما، این شرایط را به دقت مطالعه کنید.",
    lastUpdated: "آخرین به‌روزرسانی",
    effective: "اجرایی از",
    version: "نسخه",
    
    // Key Points
    mustBe18: "برای استفاده باید 18+ سال باشد",
    transactionsFinal: "تراکنش‌ها نهایی هستند",
    feesApply: "کارمزد اعمال می‌شود",
    noIllegalUse: "بدون استفاده غیرقانونی",
    weProtectData: "ما از داده‌های شما محافظت می‌کنیم",
    termsMayChange: "شرایط ممکن است تغییر کند",
    
    // Action Buttons
    downloadTerms: "دانلود شرایط",
    print: "چاپ",
    share: "اشتراک‌گذاری",
    
    // Agreement Highlights
    secureTransactions: "تراکنش‌های امن",
    service247: "خدمات 24/7",
    globalOperations: "عملیات جهانی",
    competitiveRates: "نرخ‌های رقابتی",
    dataProtection: "حفاظت از داده",
    verifiedUsers: "کاربران تأیید شده",
    
    // Sidebar
    termsSections: "بخش‌های شرایط",
    needHelp: "نیاز به کمک دارید؟",
    importantNotice: "اطلاعیه مهم",
    legallyBinding: "این شرایط یک توافقنامه الزام‌آور قانونی است. لطفاً با دقت مطالعه کنید.",
    
    // Terms Sections
    acceptanceTitle: "1. پذیرش شرایط",
    acceptanceContent: "با دسترسی یا استفاده از خدمات، وب‌سایت یا برنامه‌های موبایل CurrencyExchange، شما موافقت می‌کنید که به این شرایط خدمات و تمام قوانین و مقررات قابل اجرا پایبند باشید. اگر با هیچ بخشی از این شرایط موافق نیستید، نمی‌توانید از خدمات ما استفاده کنید.",
    
    eligibilityTitle: "2. شرایط احراز صلاحیت",
    eligibilityContent: "برای استفاده از خدمات ما، شما باید:",
    eligibilityList1: "حداقل 18 سال سن داشته باشید",
    eligibilityList2: "ظرفیت قانونی برای انعقاد قراردادهای الزام‌آور را داشته باشید",
    eligibilityList3: "اطلاعات ثبت‌نام دقیق و کامل ارائه دهید",
    eligibilityList4: "در کشوری که تحت تحریم است مستقر نباشید",
    eligibilityList5: "از خدمات ما برای اهداف غیرقانونی استفاده نکنید",
    eligibilityNote: "ما حق داریم در هر زمان هویت و صلاحیت شما را تأیید کنیم.",
    
    accountsTitle: "3. ثبت‌نام حساب",
    accountsContent: "هنگامی که در نزد ما حساب ایجاد می‌کنید، باید اطلاعات دقیق، کامل و به‌روز ارائه دهید. عدم انجام این کار نقض شرایط محسوب می‌شود که ممکن است منجر به خاتمه فوری حساب شما شود.",
    accountsList1: "شما مسئول حفظ امنیت حساب خود هستید",
    accountsList2: "شما کاملاً مسئول تمام فعالیت‌هایی هستید که تحت حساب شما انجام می‌شود",
    accountsList3: "شما باید بلافاصله هرگونه استفاده غیرمجاز از حساب خود را به ما اطلاع دهید",
    accountsList4: "ما در قبال هیچ گونه ضرر یا زیان ناشی از عدم رعایت شما مسئول نخواهیم بود",
    accountsList5: "شما نمی‌توانید از نام شخص یا نهاد دیگر به عنوان نام کاربری استفاده کنید",
    
    servicesTitle: "4. خدمات تبدیل ارز",
    servicesContent: "خدمات تبدیل ارز ما به شما امکان می‌دهد بین ارزهای مختلف با نرخ‌های تعیین شده توسط ما تبدیل کنید. با استفاده از خدمات ما، شما اذعان و موافقت می‌کنید که:",
    servicesList1: "نرخ‌های ارز بدون اطلاع قبلی قابل تغییر هستند",
    servicesList2: "پس از پردازش، تمام تراکنش‌ها نهایی و غیرقابل استرداد هستند",
    servicesList3: "ما ممکن است مبالغ تراکنش را برای اهداف امنیتی محدود کنیم",
    servicesList4: "برای تراکنش‌های بزرگ ممکن است تأیید اضافی لازم باشد",
    servicesList5: "ما حق رد یا لغو هر تراکنشی را محفوظ می‌داریم",
    servicesList6: "زمان پردازش ممکن است بر اساس روش پرداخت متفاوت باشد",
    
    feesTitle: "5. کارمزدها و هزینه‌ها",
    feesContent: "ما برای خدمات تبدیل ارز خود کارمزد دریافت می‌کنیم. تمام کارمزدهای قابل اعمال قبل از تکمیل تراکنش به شما اطلاع داده می‌شود. با تکمیل تراکنش، شما موافقت می‌کنید که تمام کارمزدها و هزینه‌های مرتبط با استفاده از خدمات ما را بپردازید.",
    feesList1: "حاشیه نرخ ارز",
    feesList2: "کارمزد تراکنش (در صورت وجود)",
    feesList3: "کارمزد حواله بانکی",
    feesList4: "کارمزد پرداخت بین‌المللی",
    feesList5: "کارمزد برداشت زودهنگام یا لغو",
    feesNote: "کارمزدها با اطلاع قبلی قابل تغییر هستند. ما حداقل 30 روز قبل هرگونه تغییر کارمزد را به شما اطلاع خواهیم داد.",
    
    paymentsTitle: "6. پرداخت‌ها و تراکنش‌ها",
    paymentsContent: "هنگامی که تراکنشی را آغاز می‌کنید، به ما اجازه می‌دهید پرداخت را پردازش و تبدیل ارز را تکمیل کنیم. شما اظهار و تضمین می‌کنید که:",
    paymentsList1: "حق قانونی استفاده از هر روش پرداختی که ارائه می‌دهید را دارید",
    paymentsList2: "اطلاعات پرداختی که ارائه می‌دهید صحیح و درست است",
    paymentsList3: "از خدمات ما برای هیچ فعالیت کلاهبرداری یا غیرقانونی استفاده نمی‌کنید",
    paymentsList4: "از تمام قوانین و مقررات قابل اجرا پیروی خواهید کرد",
    paymentsList5: "بودجه کافی برای تکمیل تراکنش دارید",
    
    limitsTitle: "7. محدودیت‌های تراکنش",
    limitsContent: "ما ممکن است به دلایل امنیتی و رعایت مقررات، محدودیت‌های تراکنش را در حساب شما اعمال کنیم. این محدودیت‌ها ممکن است شامل موارد زیر باشد:",
    limitsList1: "حداقل و حداکثر مبالغ تراکنش",
    limitsList2: "محدودیت‌های تراکنش روزانه، هفتگی یا ماهانه",
    limitsList3: "محدودیت‌های تجمعی تراکنش",
    limitsList4: "محدودیت‌های مبتنی بر سطح تأیید",
    limitsList5: "محدودیت‌های جغرافیایی",
    limitsNote: "ما ممکن است این محدودیت‌ها را به صلاحدید خود و بدون اطلاع قبلی調整 کنیم.",
    
    prohibitedTitle: "8. فعالیت‌های ممنوع",
    prohibitedContent: "شما نمی‌توانید از خدمات ما برای هیچ هدف غیرقانونی یا غیرمجاز استفاده کنید. فعالیت‌های ممنوع شامل موارد زیر است اما محدود به آنها نیست:",
    prohibitedList1: "پولشویی یا تأمین مالی تروریسم",
    prohibitedList2: "کلاهبرداری یا اقدامات فریبکارانه",
    prohibitedList3: "تراکنش‌های قمار یا بازی غیرقانونی",
    prohibitedList4: "خرید کالاها یا خدمات غیرقانونی",
    prohibitedList5: "دور زدن محدودیت‌های تراکنش یا اقدامات امنیتی ما",
    prohibitedList6: "جعل هویت شخص یا نهاد دیگر",
    prohibitedList7: "تداخل در عملکرد صحیح خدمات ما",
    prohibitedList8: "مهندسی معکوس نرم‌افزار یا سیستم‌های ما",
    
    intellectualTitle: "9. مالکیت فکری",
    intellectualContent: "سرویس و محتوای اصلی، ویژگی‌ها و عملکرد آن متعلق به CurrencyExchange و مجوزدهندگان آن است و خواهد ماند. علائم تجاری و ظاهر تجاری ما بدون رضایت کتبی قبلی ما نمی‌تواند در ارتباط با هیچ محصول یا خدمتی استفاده شود.",
    intellectualList1: "تمام محتوای وب‌سایت ما تحت حمایت کپی‌رایت است",
    intellectualList2: "شما نمی‌توانید محتوای ما را کپی، تغییر یا توزیع کنید",
    intellectualList3: "شما مالکیت داده‌های خود را حفظ می‌کنید",
    intellectualList4: "شما مجوز استفاده از داده‌های خود را برای ارائه خدمات به ما می‌دهید",
    
    terminationTitle: "10. فسخ",
    terminationContent: "ما ممکن است حساب شما را فسخ یا تعلیق کنیم و دسترسی به سرویس را فوراً، بدون اطلاع قبلی یا مسئولیت، به صلاحدید خود، به هر دلیلی از جمله بدون محدودیت در صورت نقض شرایط، مسدود کنیم.",
    terminationList1: "شما می‌توانید در هر زمان حساب خود را فسخ کنید",
    terminationList2: "پس از فسخ، حق استفاده شما از سرویس بلافاصله از بین می‌رود",
    terminationList3: "ما ممکن است اطلاعات شما را طبق قانون حفظ کنیم",
    terminationList4: "برخی از مقررات شرایط پس از فسخ نیز باقی خواهند ماند",
    
    liabilityTitle: "11. محدودیت مسئولیت",
    liabilityContent: "تا حداکثر حد مجاز توسط قانون، تحت هیچ شرایطی CurrencyExchange، مدیران، کارمندان، شرکا یا عوامل آن برای هیچ گونه خسارت غیرمستقیم، اتفاقی، ویژه، تبعی یا تنبیهی، از جمله بدون محدودیت، ضرر سود، داده، استفاده، سرقفلی یا سایر ضررهای نامشهود ناشی از موارد زیر مسئول نخواهند بود:",
    liabilityList1: "استفاده یا عدم توانایی شما در استفاده از سرویس",
    liabilityList2: "هرگونه رفتار یا محتوای هر شخص ثالث در سرویس",
    liabilityList3: "هر محتوای به دست آمده از سرویس",
    liabilityList4: "دسترسی، استفاده یا تغییر غیرمجاز ارسال‌ها یا محتوای شما",
    liabilityNote: "برخی از حوزه‌های قضایی استثنای برخی ضمانت‌ها یا محدودیت مسئولیت برای انواع خاصی از خسارات را مجاز نمی‌دانند، بنابراین ممکن است برخی از محدودیت‌های فوق برای شما اعمال نشود.",
    
    indemnificationTitle: "12. غرامت",
    indemnificationContent: "شما موافقت می‌کنید که از CurrencyExchange و مجوزگیرندگان، مجوزدهندگان، کارمندان، پیمانکاران، افسران و مدیران آن در برابر و در مقابل تمام ادعاها، خسارات، تعهدات، ضررها، بدهی‌ها، هزینه‌ها یا بدهی و مخارج ناشی از موارد زیر دفاع، غرامت و بی‌آزار نگه دارید:",
    indemnificationList1: "استفاده و دسترسی شما به سرویس",
    indemnificationList2: "نقض هر یک از شرایط این شرایط توسط شما",
    indemnificationList3: "نقض هر حق شخص ثالث توسط شما",
    indemnificationList4: "هر ادعایی که محتوای شما باعث آسیب به شخص ثالث شده است",
    
    disclaimersTitle: "13. سلب مسئولیت",
    disclaimersContent: "استفاده شما از سرویس صرفاً با خطر شماست. سرویس بر اساس 'همانطور که هست' و 'همانطور که در دسترس است' ارائه می‌شود. سرویس بدون هیچ گونه ضمانتی، چه صریح یا ضمنی، از جمله اما نه محدود به، ضمانت‌های ضمنی تجارت‌پذیری، تناسب برای هدف خاص، عدم نقض یا روند عملکرد ارائه می‌شود.",
    disclaimersList1: "ما تضمین نمی‌کنیم که سرویس بدون وقفه کار کند",
    disclaimersList2: "ما تضمین نمی‌کنیم که خطاها تصحیح شوند",
    disclaimersList3: "ما تضمین نمی‌کنیم که سرویس عاری از ویروس است",
    disclaimersList4: "ما دقت نرخ‌های ارز را تضمین نمی‌کنیم",
    
    governingTitle: "14. قانون حاکم",
    governingContent: "این شرایط مطابق با قوانین پاکستان، بدون توجه به مقررات تعارض قوانین آن، تفسیر و اعمال خواهد شد. عدم اجرای هر حق یا مقرره از این شرایط توسط ما به منزله چشم‌پوشی از آن حقوق تلقی نخواهد شد.",
    governingNote: "هرگونه اختلاف ناشی از این شرایط منحصراً توسط دادگاه‌های واقع در کراچی، پاکستان حل و فصل خواهد شد.",
    
    changesTitle: "15. تغییرات شرایط",
    changesContent: "ما حق داریم، به صلاحدید خود، در هر زمان این شرایط را اصلاح یا جایگزین کنیم. اگر بازبینی اساسی باشد، ما سعی خواهیم کرد حداقل 30 روز قبل از اجرایی شدن هر شرایط جدید اطلاع‌رسانی کنیم. اینکه چه چیزی تغییر اساسی را تشکیل می‌دهد به صلاحدید ما تعیین می‌شود.",
    
    contactTitle: "16. تماس با ما",
    contactContent: "اگر سوالی در مورد این شرایط دارید، لطفاً با ما تماس بگیرید:",
    
    // FAQ Section
    faq: "سوالات متداول",
    commonQuestions: "سوالات",
    questions: "متداول",
    faq1Q: "آیا می‌توانم پس از پردازش تراکنش، آن را لغو کنم؟",
    faq1A: "پس از پردازش و تأیید تراکنش تبدیل ارز، قابل لغو یا برگشت نیست. لطفاً قبل از تکمیل تراکنش خود، تمام جزئیات را تأیید کنید.",
    faq2Q: "نرخ‌های ارز چگونه تعیین می‌شوند؟",
    faq2A: "نرخ‌های ارز ما بر اساس نرخ‌های لحظه‌ای بازار به اضافه حاشیه شفاف است. نرخ‌ها قبل از تأیید هر تراکنش به وضوح نمایش داده می‌شوند.",
    faq3Q: "اگر حساب من به خطر بیفتد چه اتفاقی می‌افتد؟",
    faq3A: "اگر مشکوک به دسترسی غیرمجاز هستید، باید بلافاصله به ما اطلاع دهید. ما به ایمن‌سازی حساب شما و بررسی هرگونه تراکنش غیرمجاز کمک خواهیم کرد.",
    faq4Q: "آیا کارمزد پنهانی وجود دارد؟",
    faq4A: "خیر، ما به شفافیت اعتقاد داریم. تمام کارمزدها و هزینه‌ها قبل از تکمیل هر تراکنش به وضوح افشا می‌شوند. هیچ کارمزد پنهانی وجود ندارد.",
    faq5Q: "چگونه حساب خود را ببندم؟",
    faq5A: "می‌توانید با تماس با تیم پشتیبانی ما، حساب خود را ببندید. هرگونه تراکنش در انتظار باید قبل از بسته شدن حساب تکمیل شود.",
    
    // Legal Notice
    legalCompliance: "انطباق قانونی",
    compliantText: "کاملاً منطبق با مقررات مالی پاکستان",
    licensed: "دارای مجوز",
    sbpRegulated: "تنظیم شده توسط SBP",
    insured: "بیمه شده",
    fundsProtected: "وجوه محافظت شده",
    audited: "حسابرسی شده",
    annualReviews: "بررسی‌های سالانه",
    
    // Agreement Section
    agreementAcknowledgment: "تأیید توافقنامه",
    agreementText: "با استفاده از خدمات ما، شما تأیید می‌کنید که شرایط خدمات را خوانده‌اید، درک کرده‌اید و موافقت می‌کنید که به آنها ملزم باشید.",
    iAgree: "موافقم",
    viewSummary: "مشاهده خلاصه",
    
    // Loading
    loading: "در حال بارگذاری..."
  }
};

const TermsOfService = () => {
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

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

  const titleText = t.termsOfService.split(" ");
  const lastUpdated = "February 21, 2026";
  const effectiveDate = "January 1, 2026";

  const keyPoints = [
    t.mustBe18,
    t.transactionsFinal,
    t.feesApply,
    t.noIllegalUse,
    t.weProtectData,
    t.termsMayChange
  ];

  const agreementHighlights = [
    { icon: Shield, text: t.secureTransactions, color: "green" },
    { icon: Clock, text: t.service247, color: "red" },
    { icon: Globe, text: t.globalOperations, color: "green" },
    { icon: DollarSign, text: t.competitiveRates, color: "red" },
    { icon: Lock, text: t.dataProtection, color: "green" },
    { icon: UserCheck, text: t.verifiedUsers, color: "red" }
  ];

  const termsSections = [
    {
      id: "acceptance",
      icon: <FileCheck className="w-6 h-6" />,
      title: t.acceptanceTitle,
      content: t.acceptanceContent,
      color: "from-green-500 to-green-600"
    },
    {
      id: "eligibility",
      icon: <UserCheck className="w-6 h-6" />,
      title: t.eligibilityTitle,
      content: t.eligibilityContent,
      list: [
        t.eligibilityList1,
        t.eligibilityList2,
        t.eligibilityList3,
        t.eligibilityList4,
        t.eligibilityList5
      ],
      note: t.eligibilityNote,
      color: "from-red-500 to-red-600"
    },
    {
      id: "accounts",
      icon: <Users className="w-6 h-6" />,
      title: t.accountsTitle,
      content: t.accountsContent,
      list: [
        t.accountsList1,
        t.accountsList2,
        t.accountsList3,
        t.accountsList4,
        t.accountsList5
      ],
      color: "from-green-600 to-green-700"
    },
    {
      id: "services",
      icon: <ArrowLeftRight className="w-6 h-6" />,
      title: t.servicesTitle,
      content: t.servicesContent,
      list: [
        t.servicesList1,
        t.servicesList2,
        t.servicesList3,
        t.servicesList4,
        t.servicesList5,
        t.servicesList6
      ],
      color: "from-red-600 to-red-700"
    },
    {
      id: "fees",
      icon: <DollarSign className="w-6 h-6" />,
      title: t.feesTitle,
      content: t.feesContent,
      list: [
        t.feesList1,
        t.feesList2,
        t.feesList3,
        t.feesList4,
        t.feesList5
      ],
      note: t.feesNote,
      color: "from-green-500 to-green-600"
    },
    {
      id: "payments",
      icon: <CreditCard className="w-6 h-6" />,
      title: t.paymentsTitle,
      content: t.paymentsContent,
      list: [
        t.paymentsList1,
        t.paymentsList2,
        t.paymentsList3,
        t.paymentsList4,
        t.paymentsList5
      ],
      color: "from-red-500 to-red-600"
    },
    {
      id: "limits",
      icon: <Ban className="w-6 h-6" />,
      title: t.limitsTitle,
      content: t.limitsContent,
      list: [
        t.limitsList1,
        t.limitsList2,
        t.limitsList3,
        t.limitsList4,
        t.limitsList5
      ],
      note: t.limitsNote,
      color: "from-green-600 to-green-700"
    },
    {
      id: "prohibited",
      icon: <AlertTriangle className="w-6 h-6" />,
      title: t.prohibitedTitle,
      content: t.prohibitedContent,
      list: [
        t.prohibitedList1,
        t.prohibitedList2,
        t.prohibitedList3,
        t.prohibitedList4,
        t.prohibitedList5,
        t.prohibitedList6,
        t.prohibitedList7,
        t.prohibitedList8
      ],
      color: "from-red-600 to-red-700"
    },
    {
      id: "intellectual",
      icon: <BookOpen className="w-6 h-6" />,
      title: t.intellectualTitle,
      content: t.intellectualContent,
      list: [
        t.intellectualList1,
        t.intellectualList2,
        t.intellectualList3,
        t.intellectualList4
      ],
      color: "from-green-500 to-green-600"
    },
    {
      id: "termination",
      icon: <Ban className="w-6 h-6" />,
      title: t.terminationTitle,
      content: t.terminationContent,
      list: [
        t.terminationList1,
        t.terminationList2,
        t.terminationList3,
        t.terminationList4
      ],
      color: "from-red-500 to-red-600"
    },
    {
      id: "liability",
      icon: <Scale className="w-6 h-6" />,
      title: t.liabilityTitle,
      content: t.liabilityContent,
      list: [
        t.liabilityList1,
        t.liabilityList2,
        t.liabilityList3,
        t.liabilityList4
      ],
      note: t.liabilityNote,
      color: "from-green-600 to-green-700"
    },
    {
      id: "indemnification",
      icon: <Shield className="w-6 h-6" />,
      title: t.indemnificationTitle,
      content: t.indemnificationContent,
      list: [
        t.indemnificationList1,
        t.indemnificationList2,
        t.indemnificationList3,
        t.indemnificationList4
      ],
      color: "from-red-600 to-red-700"
    },
    {
      id: "disclaimers",
      icon: <AlertCircle className="w-6 h-6" />,
      title: t.disclaimersTitle,
      content: t.disclaimersContent,
      list: [
        t.disclaimersList1,
        t.disclaimersList2,
        t.disclaimersList3,
        t.disclaimersList4
      ],
      color: "from-green-500 to-green-600"
    },
    {
      id: "governing",
      icon: <Gavel className="w-6 h-6" />,
      title: t.governingTitle,
      content: t.governingContent,
      note: t.governingNote,
      color: "from-red-500 to-red-600"
    },
    {
      id: "changes",
      icon: <RefreshCw className="w-6 h-6" />,
      title: t.changesTitle,
      content: t.changesContent,
      color: "from-green-600 to-green-700"
    },
    {
      id: "contact",
      icon: <Mail className="w-6 h-6" />,
      title: t.contactTitle,
      content: t.contactContent,
      contactInfo: [
        { icon: Mail, text: "legal@currencyexchange.com", href: "mailto:legal@currencyexchange.com" },
        { icon: Phone, text: "+92 300 1234567", href: "tel:+923001234567" },
        { icon: MapPin, text: "123 Business Avenue, Block 6, Karachi, Pakistan" }
      ],
      color: "from-red-600 to-red-700"
    }
  ];

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A }
  ];

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">{t.loading}</p>
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
      {/* Hero Section */}
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
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated heading */}
            <motion.h1
              variants={wordVariants}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ${isRTL ? 'text-right' : ''}`}
            >
              {titleText.map((word, wordIndex) => (
                <motion.span key={wordIndex} className={`inline-block ${isRTL ? 'ml-2' : 'mr-2'}`}>
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={letterVariants}
                      className={`inline-block ${word === 'Service' || word === 'خدمات' || word === 'خدمات' || word === 'خدمات' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-red-400' : ''}`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className={`text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-6 ${isRTL ? 'text-right' : ''}`}
            >
              {t.pleaseReadCarefully}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className={`flex flex-wrap items-center justify-center gap-4 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Calendar className="w-4 h-4 text-green-500" />
                <span className="text-gray-400">{t.lastUpdated}: {lastUpdated}</span>
              </div>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Clock className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">{t.effective}: {effectiveDate}</span>
              </div>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <FileCheck className="w-4 h-4 text-green-500" />
                <span className="text-gray-400">{t.version} 3.1.0</span>
              </div>
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

      {/* Key Points Bar */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white border-b border-gray-200 py-6 w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className={`flex flex-wrap justify-center gap-4 md:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {keyPoints.map((point, index) => (
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

      {/* Quick Actions */}
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
              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200`}
            >
              <Download size={18} className="text-green-600" />
              <span>{t.downloadTerms}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200`}
            >
              <Printer size={18} className="text-red-600" />
              <span>{t.print}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200`}
            >
              <Share2 size={18} className="text-green-600" />
              <span>{t.share}</span>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Agreement Highlights */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-12 bg-white w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {agreementHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-${item.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                  <p className="text-xs text-gray-600">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
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
                <h3 className={`text-lg font-bold text-gray-900 mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FileText className="w-5 h-5 text-green-600 mr-2" />
                  {t.termsSections}
                </h3>
                <ul className={`space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar ${isRTL ? 'pr-2' : 'pr-2'}`}>
                  {termsSections.map((section, index) => (
                    <motion.li
                      key={section.id}
                      variants={itemVariants}
                      custom={index}
                    >
                      <a
                        href={`#${section.id}`}
                        className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'} text-sm text-gray-600 hover:text-green-600 transition-colors py-2 px-3 rounded-lg hover:bg-green-50`}
                      >
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        <span className="truncate">{section.title}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Quick Contact */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className={`text-sm font-semibold text-gray-900 mb-3 ${isRTL ? 'text-right' : ''}`}>{t.needHelp}</h4>
                  <a 
                    href="mailto:legal@currencyexchange.com"
                    className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'} text-sm text-green-600 hover:text-green-700 mb-2`}
                  >
                    <Mail size={14} />
                    <span>legal@currencyexchange.com</span>
                  </a>
                  <a 
                    href="tel:+923001234567"
                    className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'} text-sm text-red-600 hover:text-red-700`}
                  >
                    <Phone size={14} />
                    <span>+92 300 1234567</span>
                  </a>
                </div>

                {/* Important Notice */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}>
                    <AlertTriangle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-700">{t.legallyBinding}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Terms Content */}
            <motion.div 
              variants={fadeInRight}
              className="lg:col-span-2 space-y-8"
            >
              {termsSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  variants={itemVariants}
                  custom={index}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg scroll-mt-24"
                >
                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'} mb-6`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0`}>
                      {section.icon}
                    </div>
                    <h2 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : ''}`}>{section.title}</h2>
                  </div>

                  <div className={`space-y-4 ${isRTL ? 'text-right' : ''}`}>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>

                    {section.list && (
                      <ul className={`space-y-2 mt-4 ${isRTL ? 'mr-4' : 'ml-4'}`}>
                        {section.list.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'} text-gray-600`}
                          >
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-1" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {section.note && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}>
                          <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-700">{section.note}</p>
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
                              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'} text-gray-600 hover:text-green-600 transition-colors`}
                            >
                              <Icon size={18} className="text-red-500" />
                              <span>{item.text}</span>
                            </a>
                          ) : (
                            <div key={idx} className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'} text-gray-600`}>
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

              {/* Agreement Section */}
              <motion.div
                variants={scaleIn}
                className="bg-gradient-to-r from-green-600 to-red-600 rounded-2xl p-8 text-white"
              >
                <h3 className={`text-xl font-bold mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Gavel className={`w-6 h-6 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t.agreementAcknowledgment}
                </h3>
                <p className={`mb-6 text-white/90 ${isRTL ? 'text-right' : ''}`}>
                  {t.agreementText}
                </p>
                <div className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    {t.iAgree}
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                    {t.viewSummary}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
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
              {t.commonQuestions}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">
                {t.questions}
              </span>
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-green-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <h3 className={`text-lg font-semibold text-gray-900 mb-2 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <HelpCircle size={18} className={`text-green-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {faq.q}
                </h3>
                {expandedFaq === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`text-gray-600 ${isRTL ? 'mr-7 text-right' : 'ml-7'}`}
                  >
                    {faq.a}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Legal Notice */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="pb-16 w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-black rounded-2xl p-8">
            <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className="text-white font-bold text-lg">{t.legalCompliance}</h3>
                  <p className="text-gray-400 text-sm">{t.compliantText}</p>
                </div>
              </div>
              <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-center">
                  <div className="text-green-500 font-bold">{t.licensed}</div>
                  <div className="text-gray-400 text-xs">{t.sbpRegulated}</div>
                </div>
                <div className="text-center">
                  <div className="text-red-500 font-bold">{t.insured}</div>
                  <div className="text-gray-400 text-xs">{t.fundsProtected}</div>
                </div>
                <div className="text-center">
                  <div className="text-green-500 font-bold">{t.audited}</div>
                  <div className="text-gray-400 text-xs">{t.annualReviews}</div>
                </div>
              </div>
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
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #22c55e, #ef4444);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #16a34a, #dc2626);
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </motion.div>
  );
};

export default TermsOfService;