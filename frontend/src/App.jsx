import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction, clearErrors } from './actions/authActions';
import Header from './Components/Layout/Header/Header';
import Footer from './Components/Layout/Footer/Footer';
import Login from './Components/Auth/Login';
import ForgotPassword from './Components/Auth/ForgotPassword';
import SignUp from './Components/Auth/SignUp';
import ResetPassword from './Components/Auth/ResetPassword';
import Dashboard from './Components/Dashboard/Dashboard';
import CustomerRegistration from './Components/Dashboard/Customer/CustomerRegistration';
import CustomerRecordCreate from './Components/Dashboard/Customer/CustomerRecordCreate';
import CustomerRecordEdit from './Components/Dashboard/Customer/CustomerRecordEdit';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminUsers from './Components/Admin/AdminUsers';
import UpdatePassword from './Components/Auth/UpdatePassword';
import DailyReportForm from './Components/Dashboard/DailyReport/DailyReportForm';
import DailyRecordsUpdate from './Components/Dashboard/DailyReport/DailyRecordsUpdate';
import DailyRecords from './Components/Dashboard/DailyReport/DailyRecords';
import LedgerForm from './Components/Dashboard/ledger/LedgerForm';
import Ledger from './Components/Dashboard/ledger/Ledger';
import LedgerUpdate from './Components/Dashboard/ledger/LedgerUpdate';
import PaymentApproval from './Components/Admin/PaymentApproval';
import AdminUpdatePassword from './Components/Admin/AdminUpdatePassword';
import Payment from './Components/Dashboard/Payment';
import PWAPrompt from './Components/PWA/PWAPrompt';
import ScrollToTop from './ScrollToTop';

// Helper function to check if user has required permission
const hasPermission = (user, requiredPermission) => {
  if (!user) return false;
  
  // System admin has full access
  if (user.role === 'system_admin') return true;
  
  // Get user permissions from shopData or adminData
  const userPermissions = user?.shopData?.permissions || user?.adminData?.permissions || [];
  
  // If user has "all" permission, grant access to everything
  if (userPermissions.includes('all')) return true;
  
  // Check if user has the specific required permission
  return userPermissions.includes(requiredPermission);
};

// Protected Route Component with permission-based access
const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { isAuthenticatedUser, user, loading } = useSelector((state) => state.loginUser);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticatedUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Customers should not have access to protected routes - redirect to payment
  if (user?.role === 'customer') {
    return <Navigate to="/payment" replace />;
  }
  
  // Check permission-based access
  if (requiredPermission && !hasPermission(user, requiredPermission)) {
    // All non-system-admin roles redirect to /dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticatedUser, user, loading } = useSelector((state) => state.loginUser);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (isAuthenticatedUser) {
    // Check if user role is 'customer' - redirect to payment
    if (user?.role === 'customer') {
      return <Navigate to="/payment" replace />;
    }
    
    // System admin goes to system-admin-dashboard
    if (user?.role === 'system_admin') {
      return <Navigate to="/system-admin-dashboard" replace />;
    }
    
    // Everyone else (non-customer, non-system_admin) goes to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Payment Route Component - Only accessible by customers
const PaymentRoute = ({ children }) => {
  const { isAuthenticatedUser, user, loading } = useSelector((state) => state.loginUser);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticatedUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Only allow customers to access payment page
  if (user?.role !== 'customer') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticatedUser, loading } = useSelector((state) => state.loginUser);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(loadUserAction());
      setUserLoaded(true);
    };

    if (!userLoaded) {
      initializeApp();
    }
  }, [dispatch, userLoaded]);

  // Show loading while checking authentication
  if (!userLoaded || loading) {
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
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        {/* Auth Routes - Redirect if already logged in */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/sign-up" 
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } 
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        {/* System Admin Routes */}
        <Route 
          path="/system-admin-login" 
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          } 
        />
        <Route 
          path="/system-admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/payments" 
          element={
            <ProtectedRoute>
              <PaymentApproval />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <AdminUpdatePassword />
            </ProtectedRoute>
          } 
        />
        
        {/* Dashboard - Accessible by all authenticated users except customers */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Profile Routes - Accessible by all authenticated users except customers */}
      
        <Route 
          path="/update-password" 
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          } 
        />
        
    
        {/* Customer Management Routes - Requires 'customers' permission */}
        <Route 
          path="/customer-registration" 
          element={
            <ProtectedRoute requiredPermission="customers">
              <CustomerRegistration />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/customer-record-create" 
          element={
            <ProtectedRoute requiredPermission="customers">
              <CustomerRecordCreate />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/customer-record-edit/:id" 
          element={
            <ProtectedRoute requiredPermission="customers">
              <CustomerRecordEdit />
            </ProtectedRoute>
          } 
        />
        
        {/* Daily Records Routes - Requires 'backup' permission */}
        <Route 
          path="/daily-records" 
          element={
            <ProtectedRoute requiredPermission="backup">
              <DailyRecords />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/daily-records-create" 
          element={
            <ProtectedRoute requiredPermission="backup">
              <DailyReportForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/daily-records/:id" 
          element={
            <ProtectedRoute requiredPermission="backup">
              <DailyRecordsUpdate />
            </ProtectedRoute>
          } 
        />
        
        {/* Ledger Routes - Requires 'ledger' permission */}
        <Route 
          path="/ledger-create" 
          element={
            <ProtectedRoute requiredPermission="ledger">
              <LedgerForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ledger-record" 
          element={
            <ProtectedRoute requiredPermission="ledger">
              <Ledger />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ledger/:id" 
          element={
            <ProtectedRoute requiredPermission="ledger">
              <LedgerUpdate />
            </ProtectedRoute>
          } 
        />
        
    
        
       
        {/* Payment Route - Only accessible by customers */}
        <Route 
          path="/payment" 
          element={
            <PaymentRoute>
              <Payment />
            </PaymentRoute>
          } 
        />
      </Routes>
      <Footer />
      <PWAPrompt />

    </Router>
  );
}