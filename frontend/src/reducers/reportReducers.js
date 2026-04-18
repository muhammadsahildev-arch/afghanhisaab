import {
  SALES_REPORT_REQUEST, SALES_REPORT_SUCCESS, SALES_REPORT_FAIL,
  PROFIT_LOSS_REPORT_REQUEST, PROFIT_LOSS_REPORT_SUCCESS, PROFIT_LOSS_REPORT_FAIL,
  EXPENSE_REPORT_REQUEST, EXPENSE_REPORT_SUCCESS, EXPENSE_REPORT_FAIL,
  DISCOUNT_REPORT_REQUEST, DISCOUNT_REPORT_SUCCESS, DISCOUNT_REPORT_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

export const salesReportReducer = (state = { report: {} }, action) => {
  switch (action.type) {
    case SALES_REPORT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SALES_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        report: action.payload.data
      }
    case SALES_REPORT_FAIL:
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

export const profitLossReportReducer = (state = { report: {} }, action) => {
  switch (action.type) {
    case PROFIT_LOSS_REPORT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PROFIT_LOSS_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        report: action.payload.data
      }
    case PROFIT_LOSS_REPORT_FAIL:
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

export const expenseReportReducer = (state = { report: {} }, action) => {
  switch (action.type) {
    case EXPENSE_REPORT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case EXPENSE_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        report: action.payload.data
      }
    case EXPENSE_REPORT_FAIL:
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

export const discountReportReducer = (state = { report: {} }, action) => {
  switch (action.type) {
    case DISCOUNT_REPORT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DISCOUNT_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        report: action.payload.data
      }
    case DISCOUNT_REPORT_FAIL:
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