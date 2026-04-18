import { configureStore } from '@reduxjs/toolkit';
import { 
  loginUserReducer, 
  forgotPasswordReducer, 
  updateUserPasswordReducer, 
  singleUserDetailsReducer, 
  allUserReducer 
} from './reducers/userReducers';
import { 
  allProductsReducer, 
  productDetailsReducer, 
  newProductReducer, 
  updateProductReducer, 
  deleteProductReducer,
  addStockReducer 
} from './reducers/productReducers';
import { 
  allWarehousesReducer, 
  warehouseDetailsReducer, 
  newWarehouseReducer, 
  updateWarehouseReducer, 
  deleteWarehouseReducer,
  transferStockReducer,
  allTransfersReducer 
} from './reducers/warehouseReducers';
import { 
  allSuppliersReducer, 
  supplierDetailsReducer, 
  newSupplierReducer, 
  updateSupplierReducer, 
  deleteSupplierReducer,
  allPurchaseOrdersReducer,
  purchaseOrderDetailsReducer,
  newPurchaseOrderReducer,
  receiveStockReducer,
  updateOrderStatusReducer 
} from './reducers/purchaseReducers';
import { 
  allSalesReducer, 
  saleDetailsReducer, 
  newSaleReducer,
  dailySalesSummaryReducer 
} from './reducers/saleReducers';
import { 
  allLedgerEntriesReducer, 
  ledgerEntryDetailsReducer, 
  newLedgerEntryReducer, 
  updateLedgerEntryReducer, 
  deleteLedgerEntryReducer,
  ledgerStatsReducer 
} from './reducers/ledgerReducers';
import { 
  allDailyRecordsReducer, 
  dailyRecordDetailsReducer, 
  newDailyRecordReducer, 
  updateDailyRecordReducer, 
  deleteDailyRecordReducer,
  dailyRecordStatsReducer 
} from './reducers/dailyRecordReducers';
import { 
  allTransactionsReducer, 
  transactionDetailsReducer, 
  newTransactionReducer, 
  updateTransactionReducer, 
  deleteTransactionReducer,
  transactionStatsReducer 
} from './reducers/transactionReducers';
import { 
  allExpensesReducer, 
  expenseDetailsReducer, 
  newExpenseReducer, 
  updateExpenseReducer, 
  deleteExpenseReducer 
} from './reducers/expenseReducers';
import { 
  salesReportReducer, 
  profitLossReportReducer, 
  expenseReportReducer, 
  discountReportReducer 
} from './reducers/reportReducers';
import { 
  allRolesReducer, 
  createRoleReducer, 
  deleteRoleReducer,
  allPermissionsReducer 
} from './reducers/roleReducers';
import { allPaymentProofsReducer, approvePaymentReducer, denyPaymentReducer, myPaymentStatusReducer, pendingPaymentsReducer, submitPaymentProofReducer } from './reducers/paymentReducers';
import { systemAdminAllUsersReducer, systemAdminDeleteUserReducer } from './reducers/systemAdminReducers';
import { createContactUsReducer } from './reducers/contactUsReducers';

const store = configureStore({
  reducer: {
    // Auth & User Management
    loginUser: loginUserReducer,
    forgotPassword: forgotPasswordReducer,
    updatePassword: updateUserPasswordReducer,
    allUsers: allUserReducer,
    getSingleUser: singleUserDetailsReducer,
    
    // Role & Permissions
    allRoles: allRolesReducer,
    createRole: createRoleReducer,
    deleteRole: deleteRoleReducer,
    allPermissions: allPermissionsReducer,
    
    // Products
    allProducts: allProductsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    updateProduct: updateProductReducer,
    deleteProduct: deleteProductReducer,
    addStock: addStockReducer,
    
    // Warehouses
    allWarehouses: allWarehousesReducer,
    warehouseDetails: warehouseDetailsReducer,
    newWarehouse: newWarehouseReducer,
    updateWarehouse: updateWarehouseReducer,
    deleteWarehouse: deleteWarehouseReducer,
    transferStock: transferStockReducer,
    allTransfers: allTransfersReducer,


      // Payment Management
    submitPaymentProof: submitPaymentProofReducer,
    pendingPayments: pendingPaymentsReducer,
    allPaymentProofs: allPaymentProofsReducer,
    approvePayment: approvePaymentReducer,
    denyPayment: denyPaymentReducer,
    myPaymentStatus: myPaymentStatusReducer,
    
    // Purchases & Suppliers
    allSuppliers: allSuppliersReducer,
    supplierDetails: supplierDetailsReducer,
    newSupplier: newSupplierReducer,
    updateSupplier: updateSupplierReducer,
    deleteSupplier: deleteSupplierReducer,
    allPurchaseOrders: allPurchaseOrdersReducer,
    purchaseOrderDetails: purchaseOrderDetailsReducer,
    newPurchaseOrder: newPurchaseOrderReducer,
    receiveStock: receiveStockReducer,
    updateOrderStatus: updateOrderStatusReducer,
    
    // Sales
    allSales: allSalesReducer,
    saleDetails: saleDetailsReducer,
    newSale: newSaleReducer,
    dailySalesSummary: dailySalesSummaryReducer,
    
    // Ledger
    allLedgerEntries: allLedgerEntriesReducer,
    ledgerEntryDetails: ledgerEntryDetailsReducer,
    newLedgerEntry: newLedgerEntryReducer,
    updateLedgerEntry: updateLedgerEntryReducer,
    deleteLedgerEntry: deleteLedgerEntryReducer,
    ledgerStats: ledgerStatsReducer,
    
    // Daily Records
    allDailyRecords: allDailyRecordsReducer,
    dailyRecordDetails: dailyRecordDetailsReducer,
    newDailyRecord: newDailyRecordReducer,
    updateDailyRecord: updateDailyRecordReducer,
    deleteDailyRecord: deleteDailyRecordReducer,
    dailyRecordStats: dailyRecordStatsReducer,
    
    // Customer Transactions
    allTransactions: allTransactionsReducer,
    transactionDetails: transactionDetailsReducer,
    newTransaction: newTransactionReducer,
    updateTransaction: updateTransactionReducer,
    deleteTransaction: deleteTransactionReducer,
    transactionStats: transactionStatsReducer,
    
    // Expenses
    allExpenses: allExpensesReducer,
    expenseDetails: expenseDetailsReducer,
    newExpense: newExpenseReducer,
    updateExpense: updateExpenseReducer,
    deleteExpense: deleteExpenseReducer,
    
    // Reports
    salesReport: salesReportReducer,
    profitLossReport: profitLossReportReducer,
    expenseReport: expenseReportReducer,
    discountReport: discountReportReducer,
    createContactUs:createContactUsReducer,


     // System Admin User Management
    systemAdminAllUsers: systemAdminAllUsersReducer,
    systemAdminDeleteUser: systemAdminDeleteUserReducer,
  }
});

export default store;