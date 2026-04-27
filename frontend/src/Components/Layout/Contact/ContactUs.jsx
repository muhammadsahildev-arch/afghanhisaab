import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Loader2 ,
  Clock, 
  Send, 
  User, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe
} from 'lucide-react';
import { createContactUsAction, clearErrors } from "../../../actions/contactUsActions";
import { toast } from "react-toastify";
import { CONTACT_US_RESET } from "../../../constants/contactConstants";

const ContactUs = () => {
  const dispatch = useDispatch();
  
  // Get current language from localStorage (set by Header)
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  const hasRefreshed = useRef(false); // Prevent multiple refreshes

  // Load language only once on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && ['en', 'ur', 'ps', 'fa'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
    setIsInitialized(true);
  }, []);

// Translations for Contact Us page
  const translations = {
    en: {
      heroTitle: "Contact Us",
      heroSubtitle: "Get in touch with our team for any inquiries about currency exchange, rates, or our services. We're here to help 24/7.",
      stats: {
        branches: "Branches",
        happyClients: "Happy Clients",
        currencies: "Currencies",
        years: "Years"
      },
      contactCards: {
        callUs: "Call Us",
        emailUs: "Email Us",
        visitUs: "Visit Us",
        workingHours: "Working Hours"
      },
      form: {
        title: "Send us a Message",
        subtitle: "Fill out the form below and we'll get back to you ASAP.",
        name: "Your Name",
        email: "Email Address",
        message: "Your Message",
        namePlaceholder: "John Doe",
        emailPlaceholder: "john@example.com",
        messagePlaceholder: "Tell us how we can help you...",
        sendButton: "Send Message",
        sending: "Sending...",
        successMessage: "Thank you for contacting us! We will get back to you within 24 hours.",
        errorMessage: "Failed to send message. Please try again later.",
        requiredName: "Please enter your name",
        requiredEmail: "Please enter your email",
        requiredMessage: "Please enter your message"
      },
      branches: {
        title: "Our Branch",
        mainBranch: "Main Branch",
        address: "Address",
        phone: "Phone",
        email: "Email",
        workingHours: "Working Hours",
        branchManager: "Branch Manager",
        getDirections: "Get Directions"
      },
      branchDetails: {
        main: {
          address: "Zahid Bahar Market Ground Floor Shop No 19",
          hours: "Mon-Fri: 9:00 AM - 8:00 PM, Sat: 10:00 AM - 4:00 PM",
          manager: "M Dawood"
        }
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Find answers to common questions about our currency exchange services",
        questions: [
          {
            q: "What currencies do you exchange?",
            a: "We exchange all major currencies including USD, EUR, GBP, AED, SAR, and many more. Contact us for specific currency availability."
          },
          {
            q: "What are your exchange rates?",
            a: "Our rates are competitive and updated in real-time. You can check our live rates on our website or visit any branch."
          },
          {
            q: "Do I need an appointment?",
            a: "While walk-ins are welcome, we recommend booking an appointment for large transactions to ensure personalized service."
          },
          {
            q: "What documents do I need?",
            a: "A valid CNIC/Passport is required for all transactions. For large amounts, additional documentation may be needed as per regulations."
          }
        ]
      },
      emergency: {
        title: "Need Immediate Assistance?",
        subtitle: "For urgent currency exchange needs, our customer support team is available 24/7",
        buttonText: "Call Emergency Support"
      }
    },
    ur: {
      heroTitle: "رابطہ کریں",
      heroSubtitle: "کرنسی کے تبادلے، ریٹس، یا ہماری خدمات کے بارے میں کسی بھی سوال کے لیے ہماری ٹیم سے رابطہ کریں۔ ہم 24/7 مدد کے لیے حاضر ہیں۔",
      stats: {
        branches: "شاخیں",
        happyClients: "خوش گاہک",
        currencies: "کرنسیاں",
        years: "سال"
      },
      contactCards: {
        callUs: "ہمیں کال کریں",
        emailUs: "ہمیں ای میل کریں",
        visitUs: "ہم سے ملیں",
        workingHours: "کام کے اوقات"
      },
      form: {
        title: "ہمیں پیغام بھیجیں",
        subtitle: "نیچے دیے گئے فارم کو پُر کریں اور ہم جلد از جلد آپ سے رابطہ کریں گے۔",
        name: "آپ کا نام",
        email: "ای میل ایڈریس",
        message: "آپ کا پیغام",
        namePlaceholder: "جان ڈو",
        emailPlaceholder: "john@example.com",
        messagePlaceholder: "ہمیں بتائیں کہ ہم آپ کی مدد کیسے کر سکتے ہیں...",
        sendButton: "پیغام بھیجیں",
        sending: "بھیجا جا رہا ہے...",
        successMessage: "ہم سے رابطہ کرنے کا شکریہ! ہم 24 گھنٹوں کے اندر آپ سے رابطہ کریں گے۔",
        errorMessage: "پیغام بھیجنے میں ناکامی۔ براہ کرم بعد میں دوبارہ کوشش کریں۔",
        requiredName: "براہ کرم اپنا نام درج کریں",
        requiredEmail: "براہ کرم اپنا ای میل درج کریں",
        requiredMessage: "براہ کرم اپنا پیغام درج کریں"
      },
      branches: {
        title: "ہماری شاخ",
        mainBranch: "مرکزی شاخ",
        address: "پتہ",
        phone: "فون",
        email: "ای میل",
        workingHours: "کام کے اوقات",
        branchManager: "برانچ مینیجر",
        getDirections: "راستہ حاصل کریں"
      },
      branchDetails: {
        main: {
          address: "زاہد بہار مارکیٹ گراؤنڈ فلور شاپ نمبر 19",
          hours: "پیر تا جمعہ: 9:00 AM - 8:00 PM، ہفتہ: 10:00 AM - 4:00 PM",
          manager: "م داؤد"
        }
      },
      faq: {
        title: "اکثر پوچھے گئے سوالات",
        subtitle: "ہماری کرنسی ایکسچینج خدمات کے بارے میں عام سوالات کے جوابات تلاش کریں",
        questions: [
          {
            q: "آپ کون سی کرنسیاں ایکسچینج کرتے ہیں؟",
            a: "ہم USD، EUR، GBP، AED، SAR اور بہت سی دیگر تمام بڑی کرنسیوں کا تبادلہ کرتے ہیں۔ مخصوص کرنسی کی دستیابی کے لیے ہم سے رابطہ کریں۔"
          },
          {
            q: "آپ کی ایکسچینج ریٹس کیا ہیں؟",
            a: "ہماری شرحیں مسابقتی ہیں اور ریئل ٹائم میں اپ ڈیٹ ہوتی ہیں۔ آپ ہماری ویب سائٹ پر لائیو ریٹس چیک کر سکتے ہیں یا کسی بھی برانچ میں جا سکتے ہیں۔"
          },
          {
            q: "کیا مجھے اپوائنٹمنٹ کی ضرورت ہے؟",
            a: "واک ان کا خیرمقدم ہے، لیکن ہم بڑے لین دین کے لیے ذاتی نوعیت کی خدمت کو یقینی بنانے کے لیے اپوائنٹمنٹ بک کروانے کی تجویز کرتے ہیں۔"
          },
          {
            q: "مجھے کون سے دستاویزات درکار ہیں؟",
            a: "تمام لین دین کے لیے درست CNIC/پاسپورٹ درکار ہے۔ بڑی رقم کے لیے، ضوابط کے مطابق اضافی دستاویزات کی ضرورت ہو سکتی ہے۔"
          }
        ]
      },
      emergency: {
        title: "فوری مدد درکار ہے؟",
        subtitle: "فوری کرنسی ایکسچینج کی ضروریات کے لیے، ہماری کسٹمر سپورٹ ٹیم 24/7 دستیاب ہے",
        buttonText: "ایمرجنسی سپورٹ پر کال کریں"
      }
    },
    ps: {
      heroTitle: "اړیکه ونیسئ",
      heroSubtitle: "د اسعارو د تبادلې، نرخونو، یا زموږ د خدماتو په اړه د هرې پوښتنې لپاره زموږ ټیم سره اړیکه ونیسئ. موږ 24/7 د مرستې لپاره دلته یو.",
      stats: {
        branches: "څانګې",
        happyClients: "خوشحاله پیرودونکي",
        currencies: "اسعار",
        years: "کلونه"
      },
      contactCards: {
        callUs: "زموږ سره اړیکه ونیسئ",
        emailUs: "بریښنالیک واستوئ",
        visitUs: "موږ سره وګورئ",
        workingHours: "د کار ساعتونه"
      },
      form: {
        title: "موږ ته پیغام واستوئ",
        subtitle: "لاندې فورم ډک کړئ او موږ به ژر تر ژره تاسو سره اړیکه ونیسو.",
        name: "ستاسو نوم",
        email: "بریښنالیک آدرس",
        message: "ستاسو پیغام",
        namePlaceholder: "جان ډو",
        emailPlaceholder: "john@example.com",
        messagePlaceholder: "موږ ته ووایاست چې موږ څنګه ستاسو مرسته کولی شو...",
        sendButton: "پیغام واستوئ",
        sending: "لیږل کیږي...",
        successMessage: "زموږ سره د اړیکې کولو څخه مننه! موږ به د 24 ساعتونو په اوږدو کې تاسو سره اړیکه ونیسو.",
        errorMessage: "پیغام لیږلو کې پاتې راغلی. مهرباني وکړئ وروسته بیا هڅه وکړئ.",
        requiredName: "مهرباني وکړئ خپل نوم دننه کړئ",
        requiredEmail: "مهرباني وکړئ خپل بریښنالیک دننه کړئ",
        requiredMessage: "مهرباني وکړئ خپل پیغام دننه کړئ"
      },
      branches: {
        title: "زموږ څانګه",
        mainBranch: "اصلي څانګه",
        address: "پته",
        phone: "تلیفون",
        email: "بریښنالیک",
        workingHours: "د کار ساعتونه",
        branchManager: "د څانګې مدیر",
        getDirections: "لار ترلاسه کړئ"
      },
      branchDetails: {
        main: {
          address: "زااهد بهار مارکيټ ګراونډ فلور شاپ نمبر 19",
          hours: "دوشنبه تر جمعه: 9:00 AM - 8:00 PM، شنبه: 10:00 AM - 4:00 PM",
          manager: "م داوود"
        }
      },
      faq: {
        title: "په مکرر ډول پوښتل شوي پوښتنې",
        subtitle: "زموږ د اسعارو د تبادلې خدماتو په اړه د عامو پوښتنو ځوابونه ومومئ",
        questions: [
          {
            q: "تاسو کوم اسعار تبادله کوئ؟",
            a: "موږ ټول لوی اسعار لکه USD، EUR، GBP، AED، SAR او نور ډیر تبادله کوو. د ځانګړي اسعارو د شتون لپاره زموږ سره اړیکه ونیسئ."
          },
          {
            q: "ستاسو د تبادلې نرخونه څه دي؟",
            a: "زموږ نرخونه سیالي دي او په ریښتیني وخت کې تازه کیږي. تاسو کولی شئ زموږ په ویب پاڼه کې ژوندی نرخونه وګورئ یا کومې څانګې ته مراجعه وکړئ."
          },
          {
            q: "ایا زه اپوائنټمنټ ته اړتیا لرم؟",
            a: "پداسې حال کې چې واک ان ته ښه راغلاست ویل کیږي، موږ د لویو لیږدونو لپاره د اپوائنټمنټ بک کولو سپارښتنه کوو ترڅو شخصي خدمت یقیني شي."
          },
          {
            q: "زه کوم اسنادو ته اړتیا لرم؟",
            a: "د ټولو لیږدونو لپاره د CNIC/پاسپورټ معتبر کاپي اړینه ده. د لویو پیسو لپاره، د مقرراتو له مخې اضافي اسنادو ته اړتیا لیدل کیدی شي."
          }
        ]
      },
      emergency: {
        title: "فوري مرستې ته اړتیا لرئ؟",
        subtitle: "د اسعارو د تبادلې د فوري اړتیاو لپاره، زموږ د پیرودونکو ملاتړ ټیم 24/7 شتون لري",
        buttonText: "بیړني ملاتړ ته زنګ ووهئ"
      }
    },
    fa: {
      heroTitle: "تماس با ما",
      heroSubtitle: "برای هرگونه سوال در مورد تبادل ارز، نرخ‌ها یا خدمات ما با تیم ما تماس بگیرید. ما 24/7 برای کمک در اینجا هستیم.",
      stats: {
        branches: "شعب",
        happyClients: "مشتریان راضی",
        currencies: "ارزها",
        years: "سال"
      },
      contactCards: {
        callUs: "تماس با ما",
        emailUs: "ایمیل به ما",
        visitUs: "بازدید از ما",
        workingHours: "ساعات کاری"
      },
      form: {
        title: "برای ما پیام بفرستید",
        subtitle: "فرم زیر را پر کنید و ما در اسرع وقت با شما تماس خواهیم گرفت.",
        name: "نام شما",
        email: "آدرس ایمیل",
        message: "پیام شما",
        namePlaceholder: "جان دو",
        emailPlaceholder: "john@example.com",
        messagePlaceholder: "به ما بگویید چگونه می‌توانیم به شما کمک کنیم...",
        sendButton: "ارسال پیام",
        sending: "در حال ارسال...",
        successMessage: "از تماس شما متشکریم! ما ظرف 24 ساعت با شما تماس خواهیم گرفت.",
        errorMessage: "ارسال پیام ناموفق بود. لطفاً بعداً دوباره تلاش کنید.",
        requiredName: "لطفاً نام خود را وارد کنید",
        requiredEmail: "لطفاً ایمیل خود را وارد کنید",
        requiredMessage: "لطفاً پیام خود را وارد کنید"
      },
      branches: {
        title: "شعبه ما",
        mainBranch: "شعبه اصلی",
        address: "آدرس",
        phone: "تلفن",
        email: "ایمیل",
        workingHours: "ساعات کاری",
        branchManager: "مدیر شعبه",
        getDirections: "دریافت مسیر"
      },
      branchDetails: {
        main: {
          address: "بازار زاهد بهار، طبقه همکف، شماره فروشگاه 19",
          hours: "دوشنبه تا جمعه: 9:00 صبح - 8:00 شب، شنبه: 10:00 صبح - 4:00 بعد از ظهر",
          manager: "م داوود"
        }
      },
      faq: {
        title: "سوالات متداول",
        subtitle: "پاسخ سوالات رایج در مورد خدمات تبادل ارز ما را پیدا کنید",
        questions: [
          {
            q: "چه ارزهایی را تبادل می‌کنید؟",
            a: "ما تمام ارزهای اصلی از جمله USD، EUR، GBP، AED، SAR و بسیاری دیگر را تبادل می‌کنیم. برای اطلاع از در دسترس بودن ارز خاص با ما تماس بگیرید."
          },
          {
            q: "نرخ‌های تبادل شما چیست؟",
            a: "نرخ‌های ما رقابتی هستند و به صورت لحظه‌ای به‌روزرسانی می‌شوند. شما می‌توانید نرخ‌های زنده را در وب‌سایت ما بررسی کنید یا به هر شعبه مراجعه کنید."
          },
          {
            q: "آیا به نوبت دهی نیاز دارم؟",
            a: "در حالی که مراجعه حضوری بدون نوبت پذیرفته می‌شود، ما برای معاملات بزرگ توصیه می‌کنیم نوبت رزرو کنید تا خدمات شخصی‌سازی شده تضمین شود."
          },
          {
            q: "به چه مدارکی نیاز دارم؟",
            a: "برای همه معاملات، یک کارت ملی/پاسپورت معتبر الزامی است. برای مقادیر زیاد، ممکن است بر اساس مقررات به مدارک اضافی نیاز باشد."
          }
        ]
      },
      emergency: {
        title: "به کمک فوری نیاز دارید؟",
        subtitle: "برای نیازهای فوری تبادل ارز، تیم پشتیبانی مشتریان ما 24/7 در دسترس است",
        buttonText: "تماس با پشتیبانی اضطراری"
      }
    }
  };


  const t = translations[currentLang] || translations.en;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // Redux state with safe default values
  const { loading = false, error = null, success = false } = useSelector((state) => state.createContactUs || {});
  const [activeBranch, setActiveBranch] = useState('main');

  const branches = [
    {
      id: 'main',
      name: t?.branches?.mainBranch || 'Main Branch',
      address: t?.branchDetails?.main?.address || "Zahid Bahar Market Ground Floor Shop No 19",
      phone: '0093702835071',
      email: 'm.dawood.engr@gmail.com',
      hours: t?.branchDetails?.main?.hours || 'Mon-Fri: 9AM-8PM, Sat: 10AM-4PM',
      manager: t?.branchDetails?.main?.manager || 'M Dawood'
    },
  ];

  // Handle API success - FIXED infinite loop by using ref
  useEffect(() => {
    if (success && !hasRefreshed.current) {
      setFormStatus({
        submitted: true,
        success: true,
        message: t?.form?.successMessage || "Thank you for contacting us!"
      });
      
      toast.success(t?.form?.successMessage || "Message sent successfully!");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Mark as refreshed to prevent multiple refreshes
      hasRefreshed.current = true;
      
      // Refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
      // Reset Redux state
      setTimeout(() => {
        dispatch({ type: CONTACT_US_RESET });
      }, 100);
    }
  }, [success, dispatch, t]);

  // Handle API error - FIXED infinite loop
  useEffect(() => {
    let timeoutId;
    
    if (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: error || t?.form?.errorMessage || "Something went wrong"
      });
      
      toast.error(error || t?.form?.errorMessage || "Failed to send message");
      
      // Clear error after 5 seconds
      timeoutId = setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
        dispatch(clearErrors());
      }, 5000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [error, dispatch, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear form status when user starts typing again
    if (formStatus.submitted) {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      toast.error(t?.form?.requiredName || "Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error(t?.form?.requiredEmail || "Please enter your email");
      return;
    }
    if (!formData.message.trim()) {
      toast.error(t?.form?.requiredMessage || "Please enter your message");
      return;
    }
    
    try {
      await dispatch(createContactUsAction(formData));
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t?.contactCards?.callUs || "Call Us",
      details: ['+92 300 1234567', '+92 300 7654321'],
      action: 'tel:+923001234567',
      bgColor: 'from-green-500 to-green-600',
      delay: 0.1
    },
    {
      icon: Mail,
      title: t?.contactCards?.emailUs || "Email Us",
      details: ['info@currencyexchange.com', 'support@currencyexchange.com'],
      action: 'mailto:info@currencyexchange.com',
      bgColor: 'from-red-500 to-red-600',
      delay: 0.2
    },
    {
      icon: MapPin,
      title: t?.contactCards?.visitUs || "Visit Us",
      details: ['Main Branch: Zahid Bahar Market'],
      action: '#',
      bgColor: 'from-green-600 to-green-700',
      delay: 0.3
    },
    {
      icon: Clock,
      title: t?.contactCards?.workingHours || "Working Hours",
      details: ['Mon-Fri: 9AM - 8PM', 'Sat: 10AM - 4PM'],
      action: '#',
      bgColor: 'from-red-600 to-red-700',
      delay: 0.4
    }
  ];

  const faqs = t?.faq?.questions?.map((faq, index) => ({
    question: faq.q,
    answer: faq.a
  })) || [];

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

  const titleText = t?.heroTitle?.split(" ") || ["Contact", "Us"];
  const wavePath = "M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z";

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-green-500" size={40} />
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-white overflow-hidden"
    >
  {/* Hero Section */}
<motion.div 
  variants={fadeInUp}
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

  {/* Decorative gradient bar */}
  <motion.div 
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-red-500 to-green-500 origin-left"
  />
  
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
    <div className="text-center max-w-4xl mx-auto">
      {/* Animated heading with word reveal - Fixed for RTL languages */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        {(currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa') ? (
          // For RTL languages (Urdu, Pashto, Farsi) - show as complete words
          <span style={{ direction: 'rtl', display: 'inline-block' }}>
            {t?.heroTitle}
          </span>
        ) : (
          // For English - split into individual characters for animation
          titleText.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-2">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={letterVariants}
                  className={`inline-block ${word === 'Us' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-red-400' : ''}`}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))
        )}
      </h1>

      <motion.p 
        variants={itemVariants}
        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
        style={(currentLang === 'ur' || currentLang === 'ps' || currentLang === 'fa') ? { direction: 'rtl' } : {}}
      >
        {t?.heroSubtitle}
      </motion.p>
      
      {/* Stats */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
      >
        {[
          { label: t?.stats?.branches || "Branches", value: '1', color: 'green' },
          { label: t?.stats?.happyClients || "Happy Clients", value: '5000+', color: 'red' },
          { label: t?.stats?.currencies || "Currencies", value: '25+', color: 'green' },
          { label: t?.stats?.years || "Years", value: '10+', color: 'red' }
        ].map((stat, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center group"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              className={`text-3xl font-bold text-${stat.color}-500`}
            >
              {stat.value}
            </motion.div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
  
  {/* Animated wave - fixed with static path */}
  <div className="absolute bottom-0 left-0 w-full">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
      <path 
        fill="#ffffff" 
        fillOpacity="1" 
        d={wavePath}
      />
    </svg>
  </div>
</motion.div>

      {/* Contact Info Cards */}
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={index}
                href={info.action}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-black rounded-2xl p-6 overflow-hidden border border-gray-800 hover:border-green-500/30 transition-all duration-300 cursor-pointer"
              >
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${info.bgColor} origin-left`}
                />
                <div className="relative">
                  <motion.div 
                    whileHover={{ rotate: 6, scale: 1.1 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.bgColor} flex items-center justify-center mb-4 transition-all duration-300`}
                  >
                    <Icon size={28} className="text-white" />
                  </motion.div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-green-400 transition-colors">
                    {info.title}
                  </h3>
                  {info.details.map((detail, i) => (
                    <motion.p 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-gray-400 text-sm"
                    >
                      {detail}
                    </motion.p>
                  ))}
                </div>

                {/* Shimmer effect on hover */}
                <motion.div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      {/* Main Contact Section */}
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            variants={fadeInLeft}
            className="bg-black rounded-3xl p-8 border border-gray-800 relative overflow-hidden"
          >
            <div className="relative">
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-white mb-2"
              >
                {t?.form?.title || "Send us a Message"}
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-gray-400 mb-8"
              >
                {t?.form?.subtitle || "Fill out the form below and we'll get back to you ASAP."}
              </motion.p>

              {formStatus.submitted && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
                    formStatus.success ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'
                  }`}
                >
                  {formStatus.success ? 
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1 }}>
                      <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    </motion.div> : 
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                      <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                    </motion.div>
                  }
                  <p className={`text-sm ${formStatus.success ? 'text-green-500' : 'text-red-500'}`}>
                    {formStatus.message}
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-gray-400 text-sm mb-2 group-focus-within:text-green-400 transition-colors">
                      {t?.form?.name || "Your Name"} *
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 group-focus-within:text-green-400 transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-10 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={t?.form?.namePlaceholder || "John Doe"}
                      />
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-gray-400 text-sm mb-2 group-focus-within:text-green-400 transition-colors">
                      {t?.form?.email || "Email Address"} *
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 group-focus-within:text-green-400 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-10 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={t?.form?.emailPlaceholder || "john@example.com"}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Message Field */}
                <motion.div variants={itemVariants} className="group">
                  <label className="block text-gray-400 text-sm mb-2 group-focus-within:text-green-400 transition-colors">
                    {t?.form?.message || "Your Message"} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    disabled={loading}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t?.form?.messagePlaceholder || "Tell us how we can help you..."}
                  ></textarea>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 flex items-center justify-center space-x-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {loading ? (t?.form?.sending || "Sending...") : (t?.form?.sendButton || "Send Message")}
                  </span>
                  {!loading && <Send size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />}
                  {loading && <Loader2 size={18} className="relative z-10 animate-spin" />}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Branch Information */}
          <motion.div variants={fadeInRight} className="space-y-8">
            {/* Branch Selector */}
            <motion.div variants={itemVariants} className="bg-black rounded-3xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4">{t?.branches?.title || "Our Branch"}</h3>
              <div className="flex flex-wrap gap-3">
                {branches.map((branch, index) => (
                  <motion.button
                    key={branch.id}
                    onClick={() => setActiveBranch(branch.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeBranch === branch.id
                        ? 'bg-gradient-to-r from-green-500 to-red-500 text-white'
                        : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {branch.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Active Branch Details */}
            {branches.map((branch) => (
              branch.id === activeBranch && (
                <motion.div 
                  key={branch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black rounded-3xl p-8 border border-gray-800 relative overflow-hidden"
                >
                  <div className="relative">
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-2xl font-bold text-white mb-6"
                    >
                      {branch.name}
                    </motion.h3>
                    
                    <div className="space-y-4">
                      {/* Address */}
                      <div className="flex items-start space-x-3 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                          <MapPin size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{t?.branches?.address || "Address"}</p>
                          <p className="text-white">{branch.address}</p>
                        </div>
                      </div>
                      
                      {/* Phone */}
                      <div className="flex items-start space-x-3 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                          <Phone size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{t?.branches?.phone || "Phone"}</p>
                          <a href={`tel:${branch.phone}`} className="text-white hover:text-green-400 transition-colors">
                            {branch.phone}
                          </a>
                        </div>
                      </div>
                      
                      {/* Email */}
                      <div className="flex items-start space-x-3 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                          <Mail size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{t?.branches?.email || "Email"}</p>
                          <a href={`mailto:${branch.email}`} className="text-white hover:text-green-400 transition-colors">
                            {branch.email}
                          </a>
                        </div>
                      </div>
                      
                      {/* Working Hours */}
                      <div className="flex items-start space-x-3 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                          <Clock size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{t?.branches?.workingHours || "Working Hours"}</p>
                          <p className="text-white">{branch.hours}</p>
                        </div>
                      </div>
                      
                      {/* Branch Manager */}
                      <div className="flex items-start space-x-3 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                          <User size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{t?.branches?.branchManager || "Branch Manager"}</p>
                          <p className="text-white">{branch.manager}</p>
                        </div>
                      </div>
                    </div>

                    {/* Map Button */}
                    <button className="mt-6 w-full bg-gradient-to-r from-gray-900 to-black text-white py-3 rounded-xl font-medium border border-gray-800 hover:border-green-500/30 hover:from-green-500/10 hover:to-red-500/10 transition-all duration-300 flex items-center justify-center space-x-2 group">
                      <Globe size={18} className="text-green-400 group-hover:rotate-12 transition-transform" />
                      <span>{t?.branches?.getDirections || "Get Directions"}</span>
                    </button>
                  </div>
                </motion.div>
              )
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-black py-16 mt-8"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.span variants={itemVariants} className="text-green-500 font-semibold text-sm uppercase tracking-wider mb-2 block">
              FAQ
            </motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t?.faq?.title?.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-2">
                  {word === 'Asked' || word === 'پوچھے' || word === 'پوښتل' || word === 'متداول' ? (
                    <span className="bg-gradient-to-r from-green-400 to-red-400 bg-clip-text text-transparent">{word}</span>
                  ) : word === 'Questions' || word === 'سوالات' || word === 'پوښتنې' || word === 'سوالات' ? (
                    <span className="bg-gradient-to-r from-green-400 to-red-400 bg-clip-text text-transparent">{word}</span>
                  ) : word}
                </span>
              )) || "Frequently Asked Questions"}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto">
              {t?.faq?.subtitle || "Find answers to common questions about our currency exchange services"}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300 group cursor-pointer"
              >
                <h3 className="text-white font-semibold mb-3 group-hover:text-green-400 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Emergency Contact Banner */}
      <motion.div 
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-8"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-600 to-red-600 rounded-3xl p-8 text-center relative overflow-hidden"
        >
          <div className="relative">
            <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t?.emergency?.title || "Need Immediate Assistance?"}
            </motion.h3>
            <motion.p variants={itemVariants} className="text-white/90 mb-6 max-w-2xl mx-auto">
              {t?.emergency?.subtitle || "For urgent currency exchange needs, our customer support team is available 24/7"}
            </motion.p>
            <a href="tel:+923001234567" className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
              <Phone size={20} />
              <span>{t?.emergency?.buttonText || "Call Emergency Support"}</span>
            </a>
          </div>
        </motion.div>
      </motion.div>

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
      `}</style>
    </motion.div>
  );
};

export default ContactUs;