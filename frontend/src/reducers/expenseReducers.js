import {
  CREATE_EXPENSE_REQUEST, CREATE_EXPENSE_SUCCESS, CREATE_EXPENSE_FAIL, CREATE_EXPENSE_RESET,
  ALL_EXPENSES_REQUEST, ALL_EXPENSES_SUCCESS, ALL_EXPENSES_FAIL,
  EXPENSE_DETAILS_REQUEST, EXPENSE_DETAILS_SUCCESS, EXPENSE_DETAILS_FAIL,
  UPDATE_EXPENSE_REQUEST, UPDATE_EXPENSE_SUCCESS, UPDATE_EXPENSE_FAIL, UPDATE_EXPENSE_RESET,
  DELETE_EXPENSE_REQUEST, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_FAIL, DELETE_EXPENSE_RESET,
  CLEAR_ERRORS
} from "../constants/constants";

export const allExpensesReducer = (state = { expenses: [], summary: {} }, action) => {
  switch (action.type) {
    case ALL_EXPENSES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        expenses: action.payload.data,
        summary: action.payload.summary,
        pagination: action.payload.pagination
      }
    case ALL_EXPENSES_FAIL:
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

export const expenseDetailsReducer = (state = { expense: {} }, action) => {
  switch (action.type) {
    case EXPENSE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case EXPENSE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        expense: action.payload.data
      }
    case EXPENSE_DETAILS_FAIL:
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

export const newExpenseReducer = (state = { expense: {} }, action) => {
  switch (action.type) {
    case CREATE_EXPENSE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        expense: action.payload.data
      }
    case CREATE_EXPENSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_EXPENSE_RESET:
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

export const updateExpenseReducer = (state = { expense: {} }, action) => {
  switch (action.type) {
    case UPDATE_EXPENSE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        expense: action.payload.data
      }
    case UPDATE_EXPENSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_EXPENSE_RESET:
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

export const deleteExpenseReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EXPENSE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message
      }
    case DELETE_EXPENSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_EXPENSE_RESET:
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