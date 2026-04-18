import {
  CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAIL, CREATE_TRANSACTION_RESET,
  ALL_TRANSACTIONS_REQUEST, ALL_TRANSACTIONS_SUCCESS, ALL_TRANSACTIONS_FAIL,
  TRANSACTION_DETAILS_REQUEST, TRANSACTION_DETAILS_SUCCESS, TRANSACTION_DETAILS_FAIL,
  UPDATE_TRANSACTION_REQUEST, UPDATE_TRANSACTION_SUCCESS, UPDATE_TRANSACTION_FAIL, UPDATE_TRANSACTION_RESET,
  DELETE_TRANSACTION_REQUEST, DELETE_TRANSACTION_SUCCESS, DELETE_TRANSACTION_FAIL, DELETE_TRANSACTION_RESET,
  TRANSACTION_STATS_REQUEST, TRANSACTION_STATS_SUCCESS, TRANSACTION_STATS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

export const allTransactionsReducer = (state = { transactions: [], summary: {} }, action) => {
  switch (action.type) {
    case ALL_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload.data,
        summary: action.payload.summary,
        pagination: action.payload.pagination
      }
    case ALL_TRANSACTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const transactionDetailsReducer = (state = { transaction: {} }, action) => {
  switch (action.type) {
    case TRANSACTION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case TRANSACTION_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: action.payload.data
      }
    case TRANSACTION_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const newTransactionReducer = (state = { transaction: {} }, action) => {
  switch (action.type) {
    case CREATE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        transaction: action.payload.data
      }
    case CREATE_TRANSACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_TRANSACTION_RESET:
      return {
        ...state,
        success: false,
        error: null
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const updateTransactionReducer = (state = { transaction: {} }, action) => {
  switch (action.type) {
    case UPDATE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        transaction: action.payload.data
      }
    case UPDATE_TRANSACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_TRANSACTION_RESET:
      return {
        ...state,
        success: false,
        error: null
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const deleteTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message
      }
    case DELETE_TRANSACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_TRANSACTION_RESET:
      return {
        ...state,
        success: false,
        error: null
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const transactionStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case TRANSACTION_STATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case TRANSACTION_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        stats: action.payload.data
      }
    case TRANSACTION_STATS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};