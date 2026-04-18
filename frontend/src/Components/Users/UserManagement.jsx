import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Search, Edit2, Trash2, Filter, Download, Upload,
  Users as UsersIcon, Shield, Key, Lock, Unlock, CheckCircle, XCircle,
  Eye, EyeOff, Mail, Phone, Calendar, Clock, Award,
  ArrowLeft, X, Save, RefreshCw, UserPlus, UserCheck,
  UserX, Settings, Bell, Globe, Laptop, Smartphone,
  ChevronLeft, ChevronRight, AlertTriangle, Info, AlertCircle, Loader
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  getAllUsersAction, 
  createUserAction,
  updateUserAction,
  deleteUserAction,
  toggleUserStatusAction,
  getUserStatsAction,
  clearErrors
} from "../../actions/userActions";
import { 
  getAllRolesAction,
  createRoleAction,
  deleteRoleAction,
  getAllPermissionsAction
} from "../../actions/roleActions";
import { DELETE_USER_RESET, UPDATE_USER_RESET, CREATE_ROLE_RESET, DELETE_ROLE_RESET } from "../../constants/constants";

// Language Translations
const translations = {
  en: {
    // Header
    backToDashboard: "Back to Dashboard",
    userManagement: "User Management",
    manageUsersDesc: "Manage users, roles, and permissions",
    export: "Export",
    addUser: "Add User",
    
    // Tabs
    users: "Users",
    rolesPermissions: "Roles & Permissions",
    
    // Search
    searchUsers: "Search users by name, email, username...",
    searchRoles: "Search roles...",
    
    // Stats
    totalUsers: "Total Users",
    activeUsers: "Active Users",
    roles: "Roles",
    totalPermissions: "Total Permissions",
    
    // Table Headers
    user: "User",
    contact: "Contact",
    role: "Role",
    status: "Status",
    lastLogin: "Last Login",
    actions: "Actions",
    
    // User Form
    addNewUser: "Add New User",
    editUser: "Edit User",
    username: "Username",
    email: "Email",
    fullName: "Full Name",
    phone: "Phone",
    password: "Password",
    confirmPassword: "Confirm Password",
    newPassword: "New Password",
    leaveBlank: "Leave blank to keep current",
    cancel: "Cancel",
    addUserBtn: "Add User",
    updateUser: "Update User",
    
    // Role Form
    addNewRole: "Add New Role",
    roleName: "Role Name",
    description: "Description",
    permissions: "Permissions",
    addRole: "Add Role",
    
    // Delete Modals
    deleteUser: "Delete User",
    deleteUserConfirm: "Are you sure you want to delete the user",
    deleteRole: "Delete Role",
    deleteRoleConfirm: "Are you sure you want to delete the role",
    thisActionCannotBeUndone: "This action cannot be undone.",
    delete: "Delete",
    deleting: "Deleting...",
    
    // Messages
    userCreated: "User created successfully!",
    userUpdated: "User updated successfully!",
    userDeleted: "User deleted successfully!",
    roleCreated: "Role created successfully!",
    roleDeleted: "Role deleted successfully!",
    exportSuccessful: "Export successful",
    noDataToExport: "No data to export",
    pleaseFillRequiredFields: "Please fill required fields",
    passwordsDoNotMatch: "Passwords do not match",
    pleaseEnterRoleName: "Please enter role name",
    
    // Loading
    loading: "Loading...",
    
    // Pagination
    showing: "Showing",
    to: "to",
    of: "of",
    items: "items",
    page: "Page",
    
    // Role colors
    systemAdmin: "System Admin",
    shopAdmin: "Shop Admin",
    shopManager: "Shop Manager",
    cashier: "Cashier",
    customer: "Customer",
    
    // Status
    active: "Active",
    inactive: "Inactive",
    deactivate: "Deactivate",
    activate: "Activate"
  },
  ur: {
    // Header
    backToDashboard: "ڈیش بورڈ پر واپس",
    userManagement: "صارفین کا نظم",
    manageUsersDesc: "صارفین، کردار اور اجازتوں کا نظم کریں",
    export: "برآمد کریں",
    addUser: "صارف شامل کریں",
    
    // Tabs
    users: "صارفین",
    rolesPermissions: "کردار اور اجازتیں",
    
    // Search
    searchUsers: "صارفین کو نام، ای میل، صارف نام سے تلاش کریں...",
    searchRoles: "کردار تلاش کریں...",
    
    // Stats
    totalUsers: "کل صارفین",
    activeUsers: "فعال صارفین",
    roles: "کردار",
    totalPermissions: "کل اجازتیں",
    
    // Table Headers
    user: "صارف",
    contact: "رابطہ",
    role: "کردار",
    status: "حالت",
    lastLogin: "آخری لاگ ان",
    actions: "اعمال",
    
    // User Form
    addNewUser: "نیا صارف شامل کریں",
    editUser: "صارف ترمیم کریں",
    username: "صارف نام",
    email: "ای میل",
    fullName: "مکمل نام",
    phone: "فون",
    password: "پاس ورڈ",
    confirmPassword: "پاس ورڈ کی تصدیق",
    newPassword: "نیا پاس ورڈ",
    leaveBlank: "موجودہ رکھنے کے لیے خالی چھوڑیں",
    cancel: "منسوخ کریں",
    addUserBtn: "صارف شامل کریں",
    updateUser: "صارف اپ ڈیٹ کریں",
    
    // Role Form
    addNewRole: "نیا کردار شامل کریں",
    roleName: "کردار کا نام",
    description: "تفصیل",
    permissions: "اجازتیں",
    addRole: "کردار شامل کریں",
    
    // Delete Modals
    deleteUser: "صارف حذف کریں",
    deleteUserConfirm: "کیا آپ واقعی صارف کو حذف کرنا چاہتے ہیں",
    deleteRole: "کردار حذف کریں",
    deleteRoleConfirm: "کیا آپ واقعی کردار کو حذف کرنا چاہتے ہیں",
    thisActionCannotBeUndone: "یہ عمل واپس نہیں لیا جا سکتا۔",
    delete: "حذف کریں",
    deleting: "حذف ہو رہا ہے...",
    
    // Messages
    userCreated: "صارف کامیابی سے شامل ہو گیا!",
    userUpdated: "صارف کامیابی سے اپ ڈیٹ ہو گیا!",
    userDeleted: "صارف کامیابی سے حذف ہو گیا!",
    roleCreated: "کردار کامیابی سے شامل ہو گیا!",
    roleDeleted: "کردار کامیابی سے حذف ہو گیا!",
    exportSuccessful: "برآمد کامیاب",
    noDataToExport: "برآمد کرنے کے لیے کوئی ڈیٹا نہیں",
    pleaseFillRequiredFields: "براہ کرم ضروری فیلڈز پُر کریں",
    passwordsDoNotMatch: "پاس ورڈز مماثل نہیں ہیں",
    pleaseEnterRoleName: "براہ کرم کردار کا نام درج کریں",
    
    // Loading
    loading: "لوڈ ہو رہا ہے...",
    
    // Pagination
    showing: "دکھا رہا ہے",
    to: "سے",
    of: "کا",
    items: "آئٹمز",
    page: "صفحہ",
    
    // Role colors
    systemAdmin: "سسٹم ایڈمن",
    shopAdmin: "شاپ ایڈمن",
    shopManager: "شاپ مینیجر",
    cashier: "کیشیئر",
    customer: "کسٹمر",
    
    // Status
    active: "فعال",
    inactive: "غیر فعال",
    deactivate: "غیر فعال کریں",
    activate: "فعال کریں"
  },
  ps: {
    // Header
    backToDashboard: "ډشبورډ ته شاته",
    userManagement: "د کاروونکو مدیریت",
    manageUsersDesc: "کاروونکي، رولونه او اجازې اداره کړئ",
    export: "صادرول",
    addUser: "کارونکی اضافه کړئ",
    
    // Tabs
    users: "کاروونکي",
    rolesPermissions: "رولونه او اجازې",
    
    // Search
    searchUsers: "کاروونکي د نوم، بریښنالیک، کارونکي نوم لخوا وپلټئ...",
    searchRoles: "رولونه وپلټئ...",
    
    // Stats
    totalUsers: "ټول کاروونکي",
    activeUsers: "فعال کاروونکي",
    roles: "رولونه",
    totalPermissions: "ټولې اجازې",
    
    // Table Headers
    user: "کارونکی",
    contact: "اړیکه",
    role: "رول",
    status: "حالت",
    lastLogin: "وروستی ننوتل",
    actions: "کړنې",
    
    // User Form
    addNewUser: "نوی کارونکی اضافه کړئ",
    editUser: "کارونکی ترمیم کړئ",
    username: "کارونکی نوم",
    email: "بریښنالیک",
    fullName: "بشپړ نوم",
    phone: "تلیفون",
    password: "پاسورډ",
    confirmPassword: "پاسورډ تایید کړئ",
    newPassword: "نوی پاسورډ",
    leaveBlank: "د ساتلو لپاره خالي پریږدئ",
    cancel: "لغوه کړئ",
    addUserBtn: "کارونکی اضافه کړئ",
    updateUser: "کارونکی تازه کړئ",
    
    // Role Form
    addNewRole: "نوی رول اضافه کړئ",
    roleName: "رول نوم",
    description: "تشریح",
    permissions: "اجازې",
    addRole: "رول اضافه کړئ",
    
    // Delete Modals
    deleteUser: "کارونکی حذف کړئ",
    deleteUserConfirm: "آیا تاسو واقعیا غواړئ کارونکی حذف کړئ",
    deleteRole: "رول حذف کړئ",
    deleteRoleConfirm: "آیا تاسو واقعیا غواړئ رول حذف کړئ",
    thisActionCannotBeUndone: "دا عمل بیرته نشي اخیستل کیدی.",
    delete: "حذف کړئ",
    deleting: "حذف کیږي...",
    
    // Messages
    userCreated: "کارونکی په بریالیتوب سره اضافه شو!",
    userUpdated: "کارونکی په بریالیتوب سره تازه شو!",
    userDeleted: "کارونکی په بریالیتوب سره حذف شو!",
    roleCreated: "رول په بریالیتوب سره اضافه شو!",
    roleDeleted: "رول په بریالیتوب سره حذف شو!",
    exportSuccessful: "صادرول بریالي",
    noDataToExport: "د صادرولو لپاره معلومات نشته",
    pleaseFillRequiredFields: "مهرباني وکړئ اړین ساحې ډکې کړئ",
    passwordsDoNotMatch: "پاسورډونه سره سمون نه خوري",
    pleaseEnterRoleName: "مهرباني وکړئ د رول نوم دننه کړئ",
    
    // Loading
    loading: "لوډ کیږي...",
    
    // Pagination
    showing: "ښودل کیږي",
    to: "ته",
    of: "د",
    items: "توکي",
    page: "مخ",
    
    // Role colors
    systemAdmin: "سیسټم مدیر",
    shopAdmin: "دوکان مدیر",
    shopManager: "دوکان منتظم",
    cashier: "خزانه دار",
    customer: "پیرودونکی",
    
    // Status
    active: "فعال",
    inactive: "غیر فعال",
    deactivate: "غیر فعال کړئ",
    activate: "فعال کړئ"
  },
  fa: {
    // Header
    backToDashboard: "بازگشت به داشبورد",
    userManagement: "مدیریت کاربران",
    manageUsersDesc: "مدیریت کاربران، نقش‌ها و مجوزها",
    export: "خروجی",
    addUser: "افزودن کاربر",
    
    // Tabs
    users: "کاربران",
    rolesPermissions: "نقش‌ها و مجوزها",
    
    // Search
    searchUsers: "جستجوی کاربران بر اساس نام، ایمیل، نام کاربری...",
    searchRoles: "جستجوی نقش‌ها...",
    
    // Stats
    totalUsers: "کل کاربران",
    activeUsers: "کاربران فعال",
    roles: "نقش‌ها",
    totalPermissions: "کل مجوزها",
    
    // Table Headers
    user: "کاربر",
    contact: "تماس",
    role: "نقش",
    status: "وضعیت",
    lastLogin: "آخرین ورود",
    actions: "عملیات",
    
    // User Form
    addNewUser: "افزودن کاربر جدید",
    editUser: "ویرایش کاربر",
    username: "نام کاربری",
    email: "ایمیل",
    fullName: "نام کامل",
    phone: "تلفن",
    password: "رمز عبور",
    confirmPassword: "تایید رمز عبور",
    newPassword: "رمز عبور جدید",
    leaveBlank: "برای حفظ وضعیت فعلی خالی بگذارید",
    cancel: "لغو",
    addUserBtn: "افزودن کاربر",
    updateUser: "بروزرسانی کاربر",
    
    // Role Form
    addNewRole: "افزودن نقش جدید",
    roleName: "نام نقش",
    description: "توضیحات",
    permissions: "مجوزها",
    addRole: "افزودن نقش",
    
    // Delete Modals
    deleteUser: "حذف کاربر",
    deleteUserConfirm: "آیا مطمئن هستید که می‌خواهید کاربر را حذف کنید؟",
    deleteRole: "حذف نقش",
    deleteRoleConfirm: "آیا مطمئن هستید که می‌خواهید نقش را حذف کنید؟",
    thisActionCannotBeUndone: "این عمل قابل بازگشت نیست.",
    delete: "حذف",
    deleting: "در حال حذف...",
    
    // Messages
    userCreated: "کاربر با موفقیت ایجاد شد!",
    userUpdated: "کاربر با موفقیت بروزرسانی شد!",
    userDeleted: "کاربر با موفقیت حذف شد!",
    roleCreated: "نقش با موفقیت ایجاد شد!",
    roleDeleted: "نقش با موفقیت حذف شد!",
    exportSuccessful: "خروجی موفقیت‌آمیز بود",
    noDataToExport: "داده‌ای برای خروجی وجود ندارد",
    pleaseFillRequiredFields: "لطفاً فیلدهای الزامی را پر کنید",
    passwordsDoNotMatch: "رمزهای عبور مطابقت ندارند",
    pleaseEnterRoleName: "لطفاً نام نقش را وارد کنید",
    
    // Loading
    loading: "در حال بارگذاری...",
    
    // Pagination
    showing: "نمایش",
    to: "تا",
    of: "از",
    items: "آیتم",
    page: "صفحه",
    
    // Role colors
    systemAdmin: "مدیر سیستم",
    shopAdmin: "مدیر فروشگاه",
    shopManager: "سرپرست فروشگاه",
    cashier: "صندوقدار",
    customer: "مشتری",
    
    // Status
    active: "فعال",
    inactive: "غیرفعال",
    deactivate: "غیرفعال کردن",
    activate: "فعال کردن"
  }
};

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Language state
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Get state from Redux
  const { users, loading: usersLoading, error: usersError, stats, pagination } = useSelector((state) => state.allUsers);
  const { loading: createLoading, success: createSuccess, error: createError } = useSelector((state) => state.updatePassword);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector((state) => state.updatePassword);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.updatePassword);
  const { roles, loading: rolesLoading, error: rolesError } = useSelector((state) => state.allRoles);
  const { loading: createRoleLoading, success: createRoleSuccess, error: createRoleError } = useSelector((state) => state.createRole);
  const { loading: deleteRoleLoading, success: deleteRoleSuccess, error: deleteRoleError } = useSelector((state) => state.deleteRole);
  const { permissions } = useSelector((state) => state.allPermissions);
  
  // Form states
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'cashier',
    fullName: '',
    phone: '',
    status: 'active'
  });

  const [roleForm, setRoleForm] = useState({
    name: '',
    description: '',
    permissions: []
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
    dispatch(getAllUsersAction(currentPage, itemsPerPage, searchTerm));
    dispatch(getUserStatsAction());
    dispatch(getAllRolesAction());
    dispatch(getAllPermissionsAction());
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);

  // Handle create user success
  useEffect(() => {
    if (createSuccess) {
      toast.success(t.userCreated);
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(getAllUsersAction(currentPage, itemsPerPage, searchTerm));
      dispatch(getUserStatsAction());
      setShowAddUserModal(false);
      resetUserForm();
    }
  }, [createSuccess, dispatch, currentPage, itemsPerPage, searchTerm, t]);

  // Handle update user success
  useEffect(() => {
    if (updateSuccess) {
      toast.success(t.userUpdated);
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(getAllUsersAction(currentPage, itemsPerPage, searchTerm));
      dispatch(getUserStatsAction());
      setShowEditUserModal(false);
      setSelectedUser(null);
      resetUserForm();
    }
  }, [updateSuccess, dispatch, currentPage, itemsPerPage, searchTerm, t]);

  // Handle delete user success
  useEffect(() => {
    if (deleteSuccess) {
      toast.success(t.userDeleted);
      dispatch({ type: DELETE_USER_RESET });
      dispatch(getAllUsersAction(currentPage, itemsPerPage, searchTerm));
      dispatch(getUserStatsAction());
      setShowDeleteUserModal(false);
      setSelectedUser(null);
    }
  }, [deleteSuccess, dispatch, currentPage, itemsPerPage, searchTerm, t]);

  // Handle create role success
  useEffect(() => {
    if (createRoleSuccess) {
      toast.success(t.roleCreated);
      dispatch({ type: CREATE_ROLE_RESET });
      dispatch(getAllRolesAction());
      setShowRoleModal(false);
      resetRoleForm();
    }
  }, [createRoleSuccess, dispatch, t]);

  // Handle delete role success
  useEffect(() => {
    if (deleteRoleSuccess) {
      toast.success(t.roleDeleted);
      dispatch({ type: DELETE_ROLE_RESET });
      dispatch(getAllRolesAction());
      setShowDeleteRoleModal(false);
      setSelectedRole(null);
    }
  }, [deleteRoleSuccess, dispatch, t]);

  // Handle errors
  useEffect(() => {
    if (usersError) toast.error(usersError);
    if (createError) toast.error(createError);
    if (updateError) toast.error(updateError);
    if (deleteError) toast.error(deleteError);
    if (rolesError) toast.error(rolesError);
    if (createRoleError) toast.error(createRoleError);
    if (deleteRoleError) toast.error(deleteRoleError);
    dispatch(clearErrors());
  }, [usersError, createError, updateError, deleteError, rolesError, createRoleError, deleteRoleError, dispatch]);

  // Reset user form
  const resetUserForm = () => {
    setUserForm({
      username: '', email: '', password: '', confirmPassword: '',
      role: 'cashier', fullName: '', phone: '', status: 'active'
    });
  };

  // Reset role form
  const resetRoleForm = () => {
    setRoleForm({ name: '', description: '', permissions: [] });
  };

  // Get role color
  const getRoleColor = (role) => {
    const roleColors = {
      system_admin: 'bg-purple-100 text-purple-700',
      shop_admin: 'bg-red-100 text-red-700',
      shop_manager: 'bg-blue-100 text-blue-700',
      cashier: 'bg-green-100 text-green-700',
      customer: 'bg-gray-100 text-gray-700'
    };
    return roleColors[role] || 'bg-gray-100 text-gray-700';
  };

  // Get status color
  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  // Get role display name
  const getRoleDisplayName = (role) => {
    const roleNames = {
      system_admin: t.systemAdmin,
      shop_admin: t.shopAdmin,
      shop_manager: t.shopManager,
      cashier: t.cashier,
      customer: t.customer
    };
    return roleNames[role] || role?.replace('_', ' ');
  };

  // Handle add user
  const handleAddUser = () => {
    if (!userForm.username || !userForm.email || !userForm.password) {
      toast.error(t.pleaseFillRequiredFields);
      return;
    }

    if (userForm.password !== userForm.confirmPassword) {
      toast.error(t.passwordsDoNotMatch);
      return;
    }

    const userData = {
      username: userForm.username,
      email: userForm.email,
      password: userForm.password,
      fullName: userForm.fullName,
      phone: userForm.phone,
      role: userForm.role,
      status: userForm.status
    };

    dispatch(createUserAction(userData));
  };

  // Handle edit user
  const handleEditUser = () => {
    if (!selectedUser) return;

    const updateData = {
      username: userForm.username,
      email: userForm.email,
      fullName: userForm.fullName,
      phone: userForm.phone,
      role: userForm.role,
      status: userForm.status
    };

    if (userForm.password) {
      updateData.password = userForm.password;
    }

    dispatch(updateUserAction(selectedUser.id, updateData));
  };

  // Handle delete user - Open modal
  const handleDeleteUserClick = (user) => {
    setSelectedUser(user);
    setShowDeleteUserModal(true);
  };

  // Confirm delete user
  const confirmDeleteUser = () => {
    if (selectedUser) {
      dispatch(deleteUserAction(selectedUser.id));
    }
  };

  // Handle toggle user status
  const handleToggleUserStatus = (id) => {
    dispatch(toggleUserStatusAction(id));
  };

  // Handle add role
  const handleAddRole = () => {
    if (!roleForm.name) {
      toast.error(t.pleaseEnterRoleName);
      return;
    }

    const roleData = {
      name: roleForm.name,
      description: roleForm.description,
      permissions: roleForm.permissions
    };

    dispatch(createRoleAction(roleData));
  };

  // Handle delete role - Open modal
  const handleDeleteRoleClick = (role) => {
    setSelectedRole(role);
    setShowDeleteRoleModal(true);
  };

  // Confirm delete role
  const confirmDeleteRole = () => {
    if (selectedRole) {
      dispatch(deleteRoleAction(selectedRole.id));
    }
  };

  // Handle export
  const handleExport = () => {
    const data = activeTab === 'users' ? users : roles;
    if (!data || data.length === 0) {
      toast.error(t.noDataToExport);
      return;
    }
    
    const headers = activeTab === 'users' 
      ? ['Username', 'Email', 'Full Name', 'Role', 'Status', 'Last Login', 'Created At']
      : ['Role', 'Display Name', 'Description', 'Users', 'Permissions'];
    
    const csvRows = [headers.join(',')];
    
    data.forEach(item => {
      if (activeTab === 'users') {
        const row = [
          item.username,
          item.email,
          `"${(item.fullName || '').replace(/"/g, '""')}"`,
          item.role,
          item.status,
          item.lastLogin || 'N/A',
          item.createdAt?.split('T')[0] || 'N/A'
        ];
        csvRows.push(row.join(','));
      } else {
        const row = [
          item.name,
          item.displayName,
          `"${(item.description || '').replace(/"/g, '""')}"`,
          item.usersCount || 0,
          (item.permissions || []).join('|')
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
    toast.success(t.exportSuccessful);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setUserForm({
      username: user.username,
      email: user.email,
      password: '',
      confirmPassword: '',
      role: user.role,
      fullName: user.fullName,
      phone: user.phone,
      status: user.status
    });
    setShowEditUserModal(true);
  };

  const totalUsers = stats?.total || users?.length || 0;
  const activeUsers = stats?.active || users?.filter(u => u.status === 'active').length || 0;
  const totalRoles = roles?.length || 0;
  const totalPermissions = permissions?.length || 0;

  if ((usersLoading && !users) || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">{t.loading}</p>
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
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-2xl font-bold text-gray-900">{t.userManagement}</h1>
              <p className="text-sm text-gray-500 mt-1">{t.manageUsersDesc}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button onClick={handleExport} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Download size={16} />
              {t.export}
            </button>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg hover:shadow-lg flex items-center gap-2 text-sm"
            >
              <UserPlus size={16} />
              {t.addUser}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b">
            <button
              onClick={() => { setActiveTab('users'); setCurrentPage(1); setSearchTerm(''); }}
              className={`px-6 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'users' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'
              } ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <UsersIcon size={16} />
              {t.users}
            </button>
            <button
              onClick={() => { setActiveTab('roles'); setCurrentPage(1); setSearchTerm(''); }}
              className={`px-6 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'roles' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'
              } ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Shield size={16} />
              {t.rolesPermissions}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
            <input
              type="text"
              placeholder={activeTab === 'users' ? t.searchUsers : t.searchRoles}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500`}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm text-gray-500">{t.totalUsers}</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
              <UsersIcon size={24} className="text-blue-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm text-gray-500">{t.activeUsers}</p>
                <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
              </div>
              <UserCheck size={24} className="text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm text-gray-500">{t.roles}</p>
                <p className="text-2xl font-bold text-gray-900">{totalRoles}</p>
              </div>
              <Shield size={24} className="text-purple-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm text-gray-500">{t.totalPermissions}</p>
                <p className="text-2xl font-bold text-gray-900">{totalPermissions}</p>
              </div>
              <Key size={24} className="text-orange-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.user}</th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.contact}</th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.role}</th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.lastLogin}</th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-right'}`}>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {(users || []).map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.fullName?.charAt(0) || 'U'}
                        </div>
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                          <p className="text-xs text-gray-500">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className={isRTL ? 'text-right' : ''}>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getRoleColor(user.role)}`}>
                        {getRoleDisplayName(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? t.active : t.inactive}
                      </span>
                    </td>
                    <td className={`px-6 py-3 text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{user.lastLogin || '-'}</td>
                    <td className="px-6 py-3 text-right">
                      <div className={`flex items-center gap-2 ${isRTL ? 'justify-end flex-row-reverse' : 'justify-end'}`}>
                        <button 
                          onClick={() => handleToggleUserStatus(user.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title={user.status === 'active' ? t.deactivate : t.activate}
                        >
                          {user.status === 'active' ? <Lock size={16} className="text-orange-600" /> : <Unlock size={16} className="text-green-600" />}
                        </button>
                        <button 
                          onClick={() => openEditModal(user)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Edit2 size={16} className="text-blue-600" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUserClick(user)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          disabled={user.role === 'system_admin' || user.role === 'shop_admin'}
                        >
                          <Trash2 size={16} className={(user.role === 'system_admin' || user.role === 'shop_admin') ? 'text-gray-300' : 'text-red-600'} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Roles Cards */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <button
                onClick={() => setShowRoleModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
              >
                <Plus size={16} />
                {t.addRole}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(roles || []).map((role) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-5">
                    <div className={`flex items-start justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={isRTL ? 'text-right' : ''}>
                        <h3 className="text-lg font-semibold text-gray-900">{role.displayName}</h3>
                        <p className="text-xs text-gray-500 capitalize">{role.name}</p>
                      </div>
                      <Shield size={24} className="text-purple-600 opacity-50" />
                    </div>
                    <p className={`text-sm text-gray-600 mb-3 ${isRTL ? 'text-right' : ''}`}>{role.description}</p>
                    <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <UsersIcon size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{role.usersCount || 0} {t.users.toLowerCase()}</span>
                    </div>
                    <div className="border-t pt-3">
                      <p className={`text-xs font-medium text-gray-500 mb-2 ${isRTL ? 'text-right' : ''}`}>{t.permissions}:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions?.slice(0, 5).map((perm, idx) => {
                          const permInfo = permissions?.find(p => p.id === perm);
                          return (
                            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                              {permInfo?.name || perm}
                            </span>
                          );
                        })}
                        {role.permissions?.length > 5 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            +{role.permissions.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                    {!role.isSystem && (
                      <div className={`mt-4 flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                        <button
                          onClick={() => handleDeleteRoleClick(role)}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
                          title={t.deleteRole}
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {activeTab === 'users' && pagination && pagination.totalPages > 1 && (
          <div className={`flex items-center justify-between mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <p className="text-sm text-gray-600">
              {t.showing} {pagination.page * pagination.limit - pagination.limit + 1} {t.to} {Math.min(pagination.page * pagination.limit, pagination.total)} {t.of} {pagination.total} {t.items}
            </p>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50">
                <ChevronLeft size={18} className={isRTL ? 'rotate-180' : ''} />
              </button>
              <span className="px-4 py-2 border rounded-lg bg-gray-50">{t.page} {currentPage} {t.of} {pagination.totalPages}</span>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))} disabled={currentPage === pagination.totalPages} className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50">
                <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-xl font-bold">{t.addNewUser}</h2>
              <button onClick={() => setShowAddUserModal(false)}><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.username} *</label><input type="text" value={userForm.username} onChange={(e) => setUserForm({...userForm, username: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.email} *</label><input type="email" value={userForm.email} onChange={(e) => setUserForm({...userForm, email: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.fullName}</label><input type="text" value={userForm.fullName} onChange={(e) => setUserForm({...userForm, fullName: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.phone}</label><input type="tel" value={userForm.phone} onChange={(e) => setUserForm({...userForm, phone: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.password} *</label><input type="password" value={userForm.password} onChange={(e) => setUserForm({...userForm, password: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.confirmPassword} *</label><input type="password" value={userForm.confirmPassword} onChange={(e) => setUserForm({...userForm, confirmPassword: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.role}</label>
                  <select value={userForm.role} onChange={(e) => setUserForm({...userForm, role: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`}>
                    <option value="shop_manager">{t.shopManager}</option>
                    <option value="cashier">{t.cashier}</option>
                    {(roles || []).filter(r => !r.isSystem).map(role => (
                      <option key={role.id} value={role.name}>{role.displayName}</option>
                    ))}
                  </select>
                </div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.status}</label><select value={userForm.status} onChange={(e) => setUserForm({...userForm, status: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`}><option value="active">{t.active}</option><option value="inactive">{t.inactive}</option></select></div>
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => setShowAddUserModal(false)} className="px-4 py-2 border rounded">{t.cancel}</button>
              <button onClick={handleAddUser} disabled={createLoading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
                {createLoading ? <RefreshCw size={16} className="animate-spin" /> : t.addUserBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-xl font-bold">{t.editUser}</h2>
              <button onClick={() => setShowEditUserModal(false)}><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.username} *</label><input type="text" value={userForm.username} onChange={(e) => setUserForm({...userForm, username: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.email} *</label><input type="email" value={userForm.email} onChange={(e) => setUserForm({...userForm, email: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.fullName}</label><input type="text" value={userForm.fullName} onChange={(e) => setUserForm({...userForm, fullName: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.phone}</label><input type="tel" value={userForm.phone} onChange={(e) => setUserForm({...userForm, phone: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.newPassword}</label><input type="password" value={userForm.password} onChange={(e) => setUserForm({...userForm, password: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} placeholder={t.leaveBlank} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.confirmPassword}</label><input type="password" value={userForm.confirmPassword} onChange={(e) => setUserForm({...userForm, confirmPassword: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.role}</label>
                  <select value={userForm.role} onChange={(e) => setUserForm({...userForm, role: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`}>
                    <option value="shop_manager">{t.shopManager}</option>
                    <option value="cashier">{t.cashier}</option>
                    {(roles || []).filter(r => !r.isSystem).map(role => (
                      <option key={role.id} value={role.name}>{role.displayName}</option>
                    ))}
                  </select>
                </div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.status}</label><select value={userForm.status} onChange={(e) => setUserForm({...userForm, status: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`}><option value="active">{t.active}</option><option value="inactive">{t.inactive}</option></select></div>
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => setShowEditUserModal(false)} className="px-4 py-2 border rounded">{t.cancel}</button>
              <button onClick={handleEditUser} disabled={updateLoading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
                {updateLoading ? <RefreshCw size={16} className="animate-spin" /> : t.updateUser}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {showDeleteUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteUserModal(false)}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle size={32} className="text-red-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{t.deleteUser}</h3>
                <p className="text-gray-600 text-center mb-6">
                  {t.deleteUserConfirm} <span className="font-semibold">{selectedUser.fullName || selectedUser.username}</span>? {t.thisActionCannotBeUndone}
                </p>
                <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} space-x-3`}>
                  <button
                    onClick={confirmDeleteUser}
                    disabled={deleteLoading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
                  >
                    {deleteLoading ? (
                      <>
                        <RefreshCw size={14} className="animate-spin mr-2" />
                        {t.deleting}
                      </>
                    ) : (
                      t.delete
                    )}
                  </button>
                  <button
                    onClick={() => setShowDeleteUserModal(false)}
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

      {/* Add Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`sticky top-0 bg-white border-b p-4 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-xl font-bold">{t.addNewRole}</h2>
              <button onClick={() => setShowRoleModal(false)}><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.roleName} *</label><input type="text" value={roleForm.name} onChange={(e) => setRoleForm({...roleForm, name: e.target.value})} className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} placeholder="e.g., Supervisor" /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.description}</label><textarea value={roleForm.description} onChange={(e) => setRoleForm({...roleForm, description: e.target.value})} rows="2" className={`w-full p-2 border rounded ${isRTL ? 'text-right' : ''}`} placeholder={t.description} /></div>
                <div className={isRTL ? 'text-right' : ''}><label className="block text-sm font-medium mb-1">{t.permissions}</label><div className="border rounded-lg p-4 max-h-64 overflow-y-auto"><div className="grid grid-cols-2 gap-2">{(permissions || []).map(perm => (<label key={perm.id} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><input type="checkbox" checked={roleForm.permissions.includes(perm.id)} onChange={(e) => {if(e.target.checked) setRoleForm({...roleForm, permissions: [...roleForm.permissions, perm.id]}); else setRoleForm({...roleForm, permissions: roleForm.permissions.filter(p => p !== perm.id)})}} /><span className="text-sm">{perm.icon} {perm.name}</span></label>))}</div></div></div>
              </div>
            </div>
            <div className={`sticky bottom-0 bg-white border-t p-4 flex gap-2 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
              <button onClick={() => setShowRoleModal(false)} className="px-4 py-2 border rounded">{t.cancel}</button>
              <button onClick={handleAddRole} disabled={createRoleLoading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
                {createRoleLoading ? <RefreshCw size={16} className="animate-spin" /> : t.addRole}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Role Confirmation Modal */}
      {showDeleteRoleModal && selectedRole && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteRoleModal(false)}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle size={32} className="text-red-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{t.deleteRole}</h3>
                <p className="text-gray-600 text-center mb-6">
                  {t.deleteRoleConfirm} <span className="font-semibold">{selectedRole.displayName}</span>? {t.thisActionCannotBeUndone}
                </p>
                <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} space-x-3`}>
                  <button
                    onClick={confirmDeleteRole}
                    disabled={deleteRoleLoading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
                  >
                    {deleteRoleLoading ? (
                      <>
                        <RefreshCw size={14} className="animate-spin mr-2" />
                        {t.deleting}
                      </>
                    ) : (
                      t.delete
                    )}
                  </button>
                  <button
                    onClick={() => setShowDeleteRoleModal(false)}
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

export default UserManagement;