import {
  CREATE_SALE_REQUEST, CREATE_SALE_SUCCESS, CREATE_SALE_FAIL, CREATE_SALE_RESET,
  ALL_SALES_REQUEST, ALL_SALES_SUCCESS, ALL_SALES_FAIL,
  SALE_DETAILS_REQUEST, SALE_DETAILS_SUCCESS, SALE_DETAILS_FAIL,
  DAILY_SALES_SUMMARY_REQUEST, DAILY_SALES_SUMMARY_SUCCESS, DAILY_SALES_SUMMARY_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

export const allSalesReducer = (state = { sales: [], stats: {} }, action) => {
  switch (action.type) {
    case ALL_SALES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        sales: action.payload.data,
        stats: action.payload.stats,
        pagination: action.payload.pagination
      }
    case ALL_SALES_FAIL:
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

export const saleDetailsReducer = (state = { sale: {} }, action) => {
  switch (action.type) {
    case SALE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SALE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        sale: action.payload.data
      }
    case SALE_DETAILS_FAIL:
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

export const newSaleReducer = (state = { sale: {} }, action) => {
  switch (action.type) {
    case CREATE_SALE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_SALE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        sale: action.payload.data
      }
    case CREATE_SALE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_SALE_RESET:
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

export const dailySalesSummaryReducer = (state = { summary: {} }, action) => {
  switch (action.type) {
    case DAILY_SALES_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DAILY_SALES_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        summary: action.payload.data
      }
    case DAILY_SALES_SUMMARY_FAIL:
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