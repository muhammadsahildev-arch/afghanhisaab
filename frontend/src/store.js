import { configureStore } from '@reduxjs/toolkit';
import { 
  loginUserReducer, 
  forgotPasswordReducer, 
  updateUserPasswordReducer, 
  singleUserDetailsReducer, 
  allUserReducer 
} from './reducers/userReducers';



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

import { allPaymentProofsReducer, approvePaymentReducer, denyPaymentReducer, myPaymentStatusReducer, pendingPaymentsReducer, submitPaymentProofReducer } from './reducers/paymentReducers';
import { systemAdminAllUsersReducer, systemAdminDeleteUserReducer } from './reducers/systemAdminReducers';

const store = configureStore({
  reducer: {
    // Auth & User Management
    loginUser: loginUserReducer,
    forgotPassword: forgotPasswordReducer,
    updatePassword: updateUserPasswordReducer,
    allUsers: allUserReducer,
    getSingleUser: singleUserDetailsReducer,
    
   


      // Payment Management
    submitPaymentProof: submitPaymentProofReducer,
    pendingPayments: pendingPaymentsReducer,
    allPaymentProofs: allPaymentProofsReducer,
    approvePayment: approvePaymentReducer,
    denyPayment: denyPaymentReducer,
    myPaymentStatus: myPaymentStatusReducer,
    
   
  
    
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
    
  


     // System Admin User Management
    systemAdminAllUsers: systemAdminAllUsersReducer,
    systemAdminDeleteUser: systemAdminDeleteUserReducer,
  }
});

export default store;