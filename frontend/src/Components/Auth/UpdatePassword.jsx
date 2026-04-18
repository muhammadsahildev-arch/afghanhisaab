import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield,
  Key,
  Smartphone,
  Mail,
  Clock,
  RefreshCw,
  Fingerprint,
  UserCheck,
  Ban,
  Info,
  HelpCircle,
  Award,
  Zap,
  Sparkles,
  Bell,
  BellRing,
  X,
  ArrowRight
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePasswordAction, clearErrors } from "../../actions/authActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/constants";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, user } = useSelector((state) => state.updatePassword);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showRequirements, setShowRequirements] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    logoutAllDevices: false
  });
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Language translations
  const translations = {
    en: {
      // Header
      backToDashboard: "Back to Dashboard",
      updatePassword: "Update Password",
      updatePasswordDesc: "Ensure your account is using a strong password to stay secure",
      passwordAge: "Password Age",
      lastChanged: "Last changed",
      
      // Security Tips Section
      securityTips: "Security Tips",
      tip1: "Use a unique password you haven't used elsewhere",
      tip2: "Mix uppercase, lowercase, numbers, and symbols",
      tip3: "Change your password every 90 days",
      tip4: "Enable two-factor authentication for extra security",
      tip5: "Avoid using personal information (name, birthdate)",
      tip6: "Don't share your password with anyone",
      
      // Recent Activity Alert
      recentLogin: "Recent Login",
      recentLoginDesc: "New login from Chrome on Windows • 2 hours ago",
      securityAlert: "If this wasn't you, change your password immediately.",
      
      // Trust Badges
      ssl256: "256-bit SSL",
      encrypted: "Encrypted",
      secure: "Secure",
      
      // Form Labels
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmNewPassword: "Confirm New Password",
      
      // Placeholders
      currentPasswordPlaceholder: "Enter current password",
      newPasswordPlaceholder: "Enter new password",
      confirmPasswordPlaceholder: "Confirm new password",
      
      // Password Strength
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
      veryStrong: "Very Strong",
      
      // Password Requirements
      passwordRequirements: "Password Requirements",
      reqMinChars: "At least 8 characters long",
      reqMinCharsStrong: "At least 12 characters for strong password",
      reqLowercase: "Contains lowercase letter",
      reqUppercase: "Contains uppercase letter",
      reqNumber: "Contains number",
      reqSpecialChar: "Contains special character",
      reqNoRepeats: "No repeated characters (3+ times)",
      
      // Additional Options
      logoutAllDevices: "Log out of all devices",
      logoutAllDevicesDesc: "This will sign you out from all other sessions except this one",
      
      // Pro Tips
      proTips: "Pro Tips",
      tipPassphrase: "Use a passphrase: combine multiple words (e.g., \"Blue-Coffee-Jump-23!\")",
      tipUnique: "Don't use the same password for multiple accounts",
      tipManager: "Consider using a password manager",
      tip2FA: "Enable two-factor authentication for extra security",
      
      // Buttons
      updatingPassword: "Updating Password...",
      updatePasswordBtn: "Update Password",
      
      // Password History
      passwordExpiresIn: "Password expires in",
      days: "days",
      daysAgo: "days ago",
      
      // Success Message
      passwordUpdatedSuccess: "Password Updated Successfully!",
      passwordUpdatedDesc: "Your password has been changed.",
      loggedOutAllDevices: "You have been logged out of all other devices for security.",
      keepPasswordSafe: "Keep your new password safe and don't share it with anyone.",
      redirecting: "Redirecting you to {destination} in a moment...",
      clickHereIfNotRedirected: "Click here if you're not redirected",
      securityReminder: "Remember to enable two-factor authentication for extra security",
      
      // Errors
      currentPasswordRequired: "Current password is required",
      newPasswordRequired: "New password is required",
      passwordMinLength: "Password must be at least 8 characters",
      passwordTooWeak: "Password is too weak",
      passwordSameAsCurrent: "New password must be different from current password",
      confirmPasswordRequired: "Please confirm your password",
      passwordsDoNotMatch: "Passwords do not match",
      
      // Success Toast
      passwordUpdatedToast: "Password updated successfully!",
      
      // Additional
      daysLeft: "{count} days",
      expiresIn: "Expires in:",
      lastChangedLabel: "Password last changed:"
    },
    ur: {
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      updatePassword: "پاس ورڈ اپ ڈیٹ کریں",
      updatePasswordDesc: "یقینی بنائیں کہ آپ کا اکاؤنٹ محفوظ رہنے کے لیے مضبوط پاس ورڈ استعمال کر رہا ہے",
      passwordAge: "پاس ورڈ کی عمر",
      lastChanged: "آخری تبدیلی",
      
      securityTips: "سیکیورٹی نکات",
      tip1: "ایک منفرد پاس ورڈ استعمال کریں جو آپ نے کہیں اور استعمال نہ کیا ہو",
      tip2: "بڑے، چھوٹے حروف، اعداد اور علامتیں مکس کریں",
      tip3: "ہر 90 دن بعد اپنا پاس ورڈ تبدیل کریں",
      tip4: "اضافی تحفظ کے لیے دو عوامل کی توثیق کو فعال کریں",
      tip5: "ذاتی معلومات (نام، تاریخ پیدائش) استعمال کرنے سے گریز کریں",
      tip6: "اپنا پاس ورڈ کسی کے ساتھ شیئر نہ کریں",
      
      recentLogin: "حالیہ لاگ ان",
      recentLoginDesc: "ونڈوز پر Chrome سے نیا لاگ ان • 2 گھنٹے پہلے",
      securityAlert: "اگر یہ آپ نہیں تھے تو فوری طور پر اپنا پاس ورڈ تبدیل کریں۔",
      
      ssl256: "256-bit SSL",
      encrypted: "خفیہ کردہ",
      secure: "محفوظ",
      
      currentPassword: "موجودہ پاس ورڈ",
      newPassword: "نیا پاس ورڈ",
      confirmNewPassword: "نیا پاس ورڈ تصدیق کریں",
      
      currentPasswordPlaceholder: "موجودہ پاس ورڈ درج کریں",
      newPasswordPlaceholder: "نیا پاس ورڈ درج کریں",
      confirmPasswordPlaceholder: "نیا پاس ورڈ تصدیق کریں",
      
      weak: "کمزور",
      medium: "درمیانہ",
      strong: "مضبوط",
      veryStrong: "انتہائی مضبوط",
      
      passwordRequirements: "پاس ورڈ کی ضروریات",
      reqMinChars: "کم از کم 8 حروف",
      reqMinCharsStrong: "مضبوط پاس ورڈ کے لیے کم از کم 12 حروف",
      reqLowercase: "چھوٹے حرف پر مشتمل ہے",
      reqUppercase: "بڑے حرف پر مشتمل ہے",
      reqNumber: "عدد پر مشتمل ہے",
      reqSpecialChar: "خاص علامت پر مشتمل ہے",
      reqNoRepeats: "کوئی بار بار آنے والے حروف نہیں (3+ بار)",
      
      logoutAllDevices: "تمام آلات سے لاگ آؤٹ کریں",
      logoutAllDevicesDesc: "یہ آپ کو اس کے علاوہ تمام دیگر سیشنز سے لاگ آؤٹ کر دے گا",
      
      proTips: "پیشہ ورانہ نکات",
      tipPassphrase: "ایک جملہ استعمال کریں: متعدد الفاظ کو یکجا کریں (مثال: \"Blue-Coffee-Jump-23!\")",
      tipUnique: "ایک ہی پاس ورڈ متعدد اکاؤنٹس کے لیے استعمال نہ کریں",
      tipManager: "پاس ورڈ مینیجر استعمال کرنے پر غور کریں",
      tip2FA: "اضافی تحفظ کے لیے دو عوامل کی توثیق کو فعال کریں",
      
      updatingPassword: "پاس ورڈ اپ ڈیٹ ہو رہا ہے...",
      updatePasswordBtn: "پاس ورڈ اپ ڈیٹ کریں",
      
      passwordExpiresIn: "پاس ورڈ کی میعاد ختم ہوگی",
      days: "دن",
      daysAgo: "دن پہلے",
      
      passwordUpdatedSuccess: "پاس ورڈ کامیابی سے اپ ڈیٹ ہوگیا!",
      passwordUpdatedDesc: "آپ کا پاس ورڈ تبدیل کر دیا گیا ہے۔",
      loggedOutAllDevices: "تحفظ کے لیے آپ کو تمام دیگر آلات سے لاگ آؤٹ کر دیا گیا ہے۔",
      keepPasswordSafe: "اپنا نیا پاس ورڈ محفوظ رکھیں اور کسی کے ساتھ شیئر نہ کریں۔",
      redirecting: "آپ کو {destination} پر ری ڈائریکٹ کیا جا رہا ہے...",
      clickHereIfNotRedirected: "اگر ری ڈائریکٹ نہیں ہوئے تو یہاں کلک کریں",
      securityReminder: "اضافی تحفظ کے لیے دو عوامل کی توثیق کو فعال کرنا یاد رکھیں",
      
      currentPasswordRequired: "موجودہ پاس ورڈ درکار ہے",
      newPasswordRequired: "نیا پاس ورڈ درکار ہے",
      passwordMinLength: "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے",
      passwordTooWeak: "پاس ورڈ بہت کمزور ہے",
      passwordSameAsCurrent: "نیا پاس ورڈ موجودہ پاس ورڈ سے مختلف ہونا چاہیے",
      confirmPasswordRequired: "براہ کرم اپنے پاس ورڈ کی تصدیق کریں",
      passwordsDoNotMatch: "پاس ورڈز مماثل نہیں ہیں",
      
      passwordUpdatedToast: "پاس ورڈ کامیابی سے اپ ڈیٹ ہوگیا!",
      
      daysLeft: "{count} دن باقی",
      expiresIn: "میعاد ختم ہوگی:",
      lastChangedLabel: "پاس ورڈ آخری بار تبدیل کیا گیا:"
    },
    ps: {
      backToDashboard: "ډشبورډ ته راګرځئ",
      updatePassword: "پاسورډ تازه کړئ",
      updatePasswordDesc: "ډاډ ترلاسه کړئ چې ستاسو حساب د خوندي پاتې کیدو لپاره قوي پاسورډ کاروي",
      passwordAge: "د پاسورډ عمر",
      lastChanged: "وروستی بدلون",
      
      securityTips: "د امنیت لارښوونې",
      tip1: "یو ځانګړی پاسورډ وکاروئ چې تاسو بل چیرې نه وي کارولی",
      tip2: "لوی، کوچني توري، شمېرې او نښې سره ګډ کړئ",
      tip3: "هر 90 ورځو کې خپل پاسورډ بدل کړئ",
      tip4: "د اضافي امنیت لپاره دوه فکتوره تصدیق فعال کړئ",
      tip5: "د شخصي معلوماتو (نوم، د زیږون نیټه) کارولو څخه ډډه وکړئ",
      tip6: "خپل پاسورډ له چا سره مه شریکوئ",
      
      recentLogin: "وروستی ننوتل",
      recentLoginDesc: "په وینډوز کې له Chrome څخه نوی ننوتل • 2 ساعته دمخه",
      securityAlert: "که دا تاسو نه وئ، سمدلاسه خپل پاسورډ بدل کړئ.",
      
      ssl256: "256-bit SSL",
      encrypted: "کوډ شوی",
      secure: "خوندي",
      
      currentPassword: "اوسنی پاسورډ",
      newPassword: "نوی پاسورډ",
      confirmNewPassword: "نوی پاسورډ تایید کړئ",
      
      currentPasswordPlaceholder: "اوسنی پاسورډ دننه کړئ",
      newPasswordPlaceholder: "نوی پاسورډ دننه کړئ",
      confirmPasswordPlaceholder: "نوی پاسورډ تایید کړئ",
      
      weak: "کمزوری",
      medium: "منځنی",
      strong: "قوي",
      veryStrong: "ډیر قوي",
      
      passwordRequirements: "د پاسورډ اړتیاوې",
      reqMinChars: "لږ تر لږه 8 توري",
      reqMinCharsStrong: "د قوي پاسورډ لپاره لږ تر لږه 12 توري",
      reqLowercase: "کوچنی توری لري",
      reqUppercase: "لوی توری لري",
      reqNumber: "شمېره لري",
      reqSpecialChar: "ځانګړې نښه لري",
      reqNoRepeats: "تکراري توري نشته (3+ ځله)",
      
      logoutAllDevices: "له ټولو وسیلو څخه ووځئ",
      logoutAllDevicesDesc: "دا به تاسو له دې پرته له نورو ټولو غونډو څخه وباسي",
      
      proTips: "مسلکي لارښوونې",
      tipPassphrase: "یو جمله وکاروئ: ډیری کلمې سره یوځای کړئ (مثال: \"Blue-Coffee-Jump-23!\")",
      tipUnique: "د ډیری حسابونو لپاره یو شان پاسورډ مه کاروئ",
      tipManager: "د پاسورډ مدیر کارولو په اړه غور وکړئ",
      tip2FA: "د اضافي امنیت لپاره دوه فکتوره تصدیق فعال کړئ",
      
      updatingPassword: "پاسورډ تازه کیږي...",
      updatePasswordBtn: "پاسورډ تازه کړئ",
      
      passwordExpiresIn: "پاسورډ پای ته رسیږي",
      days: "ورځې",
      daysAgo: "ورځې دمخه",
      
      passwordUpdatedSuccess: "پاسورډ بریالی شو!",
      passwordUpdatedDesc: "ستاسو پاسورډ بدل شو.",
      loggedOutAllDevices: "د امنیت لپاره تاسو له نورو ټولو وسیلو څخه وتلي یاست.",
      keepPasswordSafe: "خپل نوی پاسورډ خوندي وساتئ او له چا سره یې مه شریکوئ.",
      redirecting: "تاسو {destination} ته لیږدول کیږئ...",
      clickHereIfNotRedirected: "که لیږدول نه شئ دلته کلیک وکړئ",
      securityReminder: "د اضافي امنیت لپاره د دوه فکتوره تصدیق فعالول په یاد ولرئ",
      
      currentPasswordRequired: "اوسنی پاسورډ اړین دی",
      newPasswordRequired: "نوی پاسورډ اړین دی",
      passwordMinLength: "پاسورډ باید لږ تر لږه 8 توري وي",
      passwordTooWeak: "پاسورډ ډیر کمزوری دی",
      passwordSameAsCurrent: "نوی پاسورډ باید له اوسني پاسورډ څخه مختلف وي",
      confirmPasswordRequired: "مهرباني وکړئ خپل پاسورډ تایید کړئ",
      passwordsDoNotMatch: "پاسورډونه سره سمون نه لري",
      
      passwordUpdatedToast: "پاسورډ بریالی شو!",
      
      daysLeft: "{count} ورځې پاتې دي",
      expiresIn: "پای ته رسیږي:",
      lastChangedLabel: "پاسورډ وروستی ځل بدل شو:"
    },
    fa: {
      backToDashboard: "بازگشت به داشبورد",
      updatePassword: "به‌روزرسانی رمز عبور",
      updatePasswordDesc: "اطمینان حاصل کنید که حساب شما برای امن ماندن از رمز عبور قوی استفاده می‌کند",
      passwordAge: "سن رمز عبور",
      lastChanged: "آخرین تغییر",
      
      securityTips: "نکات امنیتی",
      tip1: "از رمز عبور منحصر به فردی استفاده کنید که در جای دیگر استفاده نکرده‌اید",
      tip2: "حروف بزرگ، کوچک، اعداد و نمادها را ترکیب کنید",
      tip3: "هر 90 روز یکبار رمز عبور خود را تغییر دهید",
      tip4: "برای امنیت بیشتر، احراز هویت دو مرحله‌ای را فعال کنید",
      tip5: "از استفاده از اطلاعات شخصی (نام، تاریخ تولد) خودداری کنید",
      tip6: "رمز عبور خود را با کسی به اشتراک نگذارید",
      
      recentLogin: "ورود اخیر",
      recentLoginDesc: "ورود جدید از Chrome در Windows • 2 ساعت پیش",
      securityAlert: "اگر این شما نبودید، فوراً رمز عبور خود را تغییر دهید.",
      
      ssl256: "256-bit SSL",
      encrypted: "رمزگذاری شده",
      secure: "امن",
      
      currentPassword: "رمز عبور فعلی",
      newPassword: "رمز عبور جدید",
      confirmNewPassword: "تأیید رمز عبور جدید",
      
      currentPasswordPlaceholder: "رمز عبور فعلی را وارد کنید",
      newPasswordPlaceholder: "رمز عبور جدید را وارد کنید",
      confirmPasswordPlaceholder: "رمز عبور جدید را تأیید کنید",
      
      weak: "ضعیف",
      medium: "متوسط",
      strong: "قوی",
      veryStrong: "بسیار قوی",
      
      passwordRequirements: "الزامات رمز عبور",
      reqMinChars: "حداقل 8 کاراکتر",
      reqMinCharsStrong: "حداقل 12 کاراکتر برای رمز عبور قوی",
      reqLowercase: "شامل حروف کوچک",
      reqUppercase: "شامل حروف بزرگ",
      reqNumber: "شامل عدد",
      reqSpecialChar: "شامل کاراکتر خاص",
      reqNoRepeats: "بدون کاراکتر تکراری (3+ بار)",
      
      logoutAllDevices: "خروج از همه دستگاه‌ها",
      logoutAllDevicesDesc: "این کار شما را از همه جلسات دیگر به جز این جلسه خارج می‌کند",
      
      proTips: "نکات حرفه‌ای",
      tipPassphrase: "از یک عبارت عبور استفاده کنید: چند کلمه را ترکیب کنید (مثال: \"Blue-Coffee-Jump-23!\")",
      tipUnique: "از یک رمز عبور برای چندین حساب استفاده نکنید",
      tipManager: "استفاده از مدیریت رمز عبور را در نظر بگیرید",
      tip2FA: "برای امنیت بیشتر، احراز هویت دو مرحله‌ای را فعال کنید",
      
      updatingPassword: "در حال به‌روزرسانی رمز عبور...",
      updatePasswordBtn: "به‌روزرسانی رمز عبور",
      
      passwordExpiresIn: "رمز عبور منقضی می‌شود در",
      days: "روز",
      daysAgo: "روز پیش",
      
      passwordUpdatedSuccess: "رمز عبور با موفقیت به‌روز شد!",
      passwordUpdatedDesc: "رمز عبور شما تغییر کرد.",
      loggedOutAllDevices: "برای امنیت، شما از همه دستگاه‌های دیگر خارج شده‌اید.",
      keepPasswordSafe: "رمز عبور جدید خود را ایمن نگه دارید و با کسی به اشتراک نگذارید.",
      redirecting: "در حال انتقال به {destination}...",
      clickHereIfNotRedirected: "اگر انتقال پیدا نکردید اینجا کلیک کنید",
      securityReminder: "برای امنیت بیشتر، فعال کردن احراز هویت دو مرحله‌ای را به یاد داشته باشید",
      
      currentPasswordRequired: "رمز عبور فعلی الزامی است",
      newPasswordRequired: "رمز عبور جدید الزامی است",
      passwordMinLength: "رمز عبور باید حداقل 8 کاراکتر باشد",
      passwordTooWeak: "رمز عبور بسیار ضعیف است",
      passwordSameAsCurrent: "رمز عبور جدید باید با رمز عبور فعلی متفاوت باشد",
      confirmPasswordRequired: "لطفاً رمز عبور خود را تأیید کنید",
      passwordsDoNotMatch: "رمزهای عبور مطابقت ندارند",
      
      passwordUpdatedToast: "رمز عبور با موفقیت به‌روز شد!",
      
      daysLeft: "{count} روز باقی مانده",
      expiresIn: "انقضا در:",
      lastChangedLabel: "آخرین تغییر رمز عبور:"
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

  // Handle API errors
  useEffect(() => {
    if (error) {
      setApiError(error);
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  // Handle success
  useEffect(() => {
    if (success) {
      setIsSuccess(true);
      toast.success(t.passwordUpdatedToast);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        // Reset the update password state before redirect
        dispatch({ type: UPDATE_PASSWORD_RESET });
        
        if (formData.logoutAllDevices) {
          // If logout all devices, redirect to login
          navigate('/login');
        } else {
          navigate('/dashboard');
        }
      }, 3000);
    }
  }, [success, navigate, formData.logoutAllDevices, dispatch, t]);

  // Clean up on unmount - reset update password state
  useEffect(() => {
    return () => {
      dispatch({ type: UPDATE_PASSWORD_RESET });
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
    
    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 15;
    if (!/(.)\1{2,}/.test(password)) strength += 10;
    setPasswordStrength(Math.min(strength, 100));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = t.currentPasswordRequired;
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = t.newPasswordRequired;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = t.passwordMinLength;
    } else if (passwordStrength < 50) {
      newErrors.newPassword = t.passwordTooWeak;
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = t.passwordSameAsCurrent;
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.confirmPasswordRequired;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordsDoNotMatch;
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setApiError('');
      // Dispatch update password action (data sent in English to backend)
      dispatch(updatePasswordAction({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }));
    } else {
      setErrors(newErrors);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return t.weak;
    if (passwordStrength < 70) return t.medium;
    if (passwordStrength < 90) return t.strong;
    return t.veryStrong;
  };

  const passwordRequirements = [
    { text: t.reqMinChars, met: formData.newPassword.length >= 8 },
    { text: t.reqMinCharsStrong, met: formData.newPassword.length >= 12 },
    { text: t.reqLowercase, met: /[a-z]/.test(formData.newPassword) },
    { text: t.reqUppercase, met: /[A-Z]/.test(formData.newPassword) },
    { text: t.reqNumber, met: /\d/.test(formData.newPassword) },
    { text: t.reqSpecialChar, met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.newPassword) },
    { text: t.reqNoRepeats, met: !/(.)\1{2,}/.test(formData.newPassword) }
  ];

  // Security tips
  const securityTips = [
    { icon: Shield, text: t.tip1 },
    { icon: Key, text: t.tip2 },
    { icon: Clock, text: t.tip3 },
    { icon: Fingerprint, text: t.tip4 },
    { icon: Ban, text: t.tip5 },
    { icon: UserCheck, text: t.tip6 }
  ];

  // Password history (mock data)
  const passwordAge = 45; // days
  const lastChanged = '2026-01-08';

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className={`inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mb-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
            <span>{t.backToDashboard}</span>
          </Link>
          
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t.updatePassword}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">
                  Password
                </span>
              </h1>
              <p className="text-gray-600 mt-2">{t.updatePasswordDesc}</p>
            </div>
            
            {/* Password Age Indicator */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
              <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Clock className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">{t.passwordAge}</p>
                  <p className="text-lg font-bold text-gray-900">{passwordAge} {t.days}</p>
                  <p className="text-xs text-gray-400">{t.lastChanged}: {lastChanged}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isSuccess ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Side - Security Tips */}
            <motion.div
              variants={fadeInLeft}
              className="md:col-span-1"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white sticky top-24">
                <h3 className={`text-lg font-bold mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Shield className="w-5 h-5 mr-2 text-green-500" />
                  {t.securityTips}
                </h3>
                
                <div className="space-y-4">
                  {securityTips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                      >
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <p className="text-xs text-gray-300">{tip.text}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent Activity Alert */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                    <div className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <BellRing className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-yellow-500 font-medium">{t.recentLogin}</p>
                        <p className="text-xs text-gray-400 mt-1">{t.recentLoginDesc}</p>
                        <p className="text-xs text-gray-500 mt-1">{t.securityAlert}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-gray-400">{t.ssl256}</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Lock className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-gray-400">{t.encrypted}</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-gray-400">{t.secure}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Update Password Form */}
            <motion.div
              variants={fadeInRight}
              className="md:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                {/* Error Message */}
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-600">{apiError}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Current Password */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.currentPassword} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border ${
                          errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.currentPasswordPlaceholder}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : ''}`}>{errors.currentPassword}</p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.newPassword} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Key className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        onFocus={() => setShowRequirements(true)}
                        className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border ${
                          errors.newPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.newPasswordPlaceholder}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    {/* Password Strength Meter */}
                    {formData.newPassword && (
                      <div className="mt-3">
                        <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="flex space-x-1 flex-1">
                            <div className={`h-2 flex-1 rounded-l-full ${passwordStrength >= 20 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                            <div className={`h-2 flex-1 ${passwordStrength >= 40 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                            <div className={`h-2 flex-1 ${passwordStrength >= 60 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                            <div className={`h-2 flex-1 ${passwordStrength >= 80 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                            <div className={`h-2 flex-1 rounded-r-full ${passwordStrength >= 95 ? getPasswordStrengthColor() : 'bg-gray-200'}`} />
                          </div>
                          <span className={`text-xs font-medium ml-2 ${
                            passwordStrength < 40 ? 'text-red-500' : 
                            passwordStrength < 70 ? 'text-yellow-500' : 
                            'text-green-500'
                          }`}>
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {errors.newPassword && (
                      <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : ''}`}>{errors.newPassword}</p>
                    )}

                    {/* Password Requirements Dropdown */}
                    {showRequirements && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <h4 className="text-sm font-semibold text-gray-900">{t.passwordRequirements}</h4>
                          <button
                            type="button"
                            onClick={() => setShowRequirements(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {passwordRequirements.map((req, index) => (
                            <div key={index} className={`flex items-center space-x-2 text-xs ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                              {req.met ? (
                                <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                              ) : (
                                <div className="w-3 h-3 border border-gray-300 rounded-full flex-shrink-0"></div>
                              )}
                              <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.confirmNewPassword} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder={t.confirmPasswordPlaceholder}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : ''}`}>{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Additional Options */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <label className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <input
                        type="checkbox"
                        name="logoutAllDevices"
                        checked={formData.logoutAllDevices}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{t.logoutAllDevices}</span>
                        <p className="text-xs text-gray-500 mt-1">
                          {t.logoutAllDevicesDesc}
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Password Tips */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h4 className={`text-sm font-semibold text-blue-800 mb-2 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Info className="w-4 h-4 mr-1" />
                      {t.proTips}:
                    </h4>
                    <ul className={`space-y-1 text-xs text-blue-700 ${isRTL ? 'text-right' : ''}`}>
                      <li>• {t.tipPassphrase}</li>
                      <li>• {t.tipUnique}</li>
                      <li>• {t.tipManager}</li>
                      <li>• {t.tip2FA}</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        <span>{t.updatingPassword}</span>
                      </>
                    ) : (
                      <>
                        <Shield size={18} />
                        <span>{t.updatePasswordBtn}</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Password History */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className={`flex items-center justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-600">{t.lastChangedLabel}</span>
                    <span className="font-medium text-gray-900">{lastChanged} ({passwordAge} {t.daysAgo})</span>
                  </div>
                  <div className={`flex items-center justify-between text-sm mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-600">{t.passwordExpiresIn}:</span>
                    <span className="font-medium text-yellow-600">{t.daysLeft.replace('{count}', 90 - passwordAge)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Success Message */
          <motion.div
            variants={scaleIn}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl mx-auto border border-gray-200"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.passwordUpdatedSuccess}
            </h2>
            <p className="text-gray-600 mb-6">
              {t.passwordUpdatedDesc}
              {formData.logoutAllDevices 
                ? ` ${t.loggedOutAllDevices}` 
                : ` ${t.keepPasswordSafe}`}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-2 rounded-full bg-gradient-to-r from-green-500 to-red-500"
              />
            </div>

            <p className="text-sm text-gray-500 mb-6">
              {t.redirecting.replace('{destination}', formData.logoutAllDevices ? 'login' : 'dashboard')}
            </p>

            <Link
              to={formData.logoutAllDevices ? '/login' : '/dashboard'}
              className={`inline-flex items-center justify-center space-x-2 text-green-600 hover:text-green-700 font-semibold ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <span>{t.clickHereIfNotRedirected}</span>
              <ArrowRight size={16} />
            </Link>

            {/* Security Reminder */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className={`flex items-center justify-center space-x-2 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Shield size={16} className="text-green-500" />
                <span>{t.securityReminder}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default UpdatePassword;