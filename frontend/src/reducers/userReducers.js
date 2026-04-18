import {
  LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_RESET,
  RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
  LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_RESET,
  LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL,
  PAYMENT_SUCCESS_REQUEST, PAYMENT_SUCCESS_SUCCESS, PAYMENT_SUCCESS_FAIL, PAYMENT_SUCCESS_RESET,
  ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_FAIL,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_RESET,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_RESET,
  USER_STATS_REQUEST, USER_STATS_SUCCESS, USER_STATS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

// Login User Reducer
export const loginUserReducer = (state = { user: {}, isAuthenticatedUser: false, loading: false, success: false }, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case PAYMENT_SUCCESS_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticatedUser: false,
        success: false,
        error: null
      }

    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload?.user || {},
        isAuthenticatedUser: true,
        success: true,
        error: null
      }

    case PAYMENT_SUCCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload?.user || {},
        isAuthenticatedUser: true,
        success: true,
        error: null
      }

    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticatedUser: false,
        success: true,
        error: null
      }

    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
    case LOAD_USER_FAIL:
    case PAYMENT_SUCCESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticatedUser: false,
        user: null,
        success: false
      }

    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }

    case PAYMENT_SUCCESS_RESET:
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

// Forgot Password Reducer
export const forgotPasswordReducer = (state = { forgotPassword: {}, loading: false, success: false }, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload?.message || "Password reset instructions sent",
        error: null
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null
      }
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }
    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: null,
        message: null
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

// Update User Password Reducer
export const updateUserPasswordReducer = (state = { user: {}, loading: false, success: false }, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
    case DELETE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload?.user || {},
        error: null
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload?.user || {},
        error: null
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload?.message,
        error: null
      }
    case UPDATE_PASSWORD_FAIL:
    case DELETE_USER_FAIL:
    case UPDATE_USER_FAIL:
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: null
      }
    case UPDATE_USER_RESET:
    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: null
      }
    case DELETE_USER_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: null,
        message: null
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

// Single User Details Reducer
export const singleUserDetailsReducer = (state = { user: {}, loading: false }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload?.user || {},
        error: null
      }
    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: {}
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

// All Users Reducer
export const allUserReducer = (state = { users: [], loading: false, stats: {} }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload?.data || [],
        pagination: action.payload?.pagination,
        error: null
      }
    case ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        users: []
      }
    case USER_STATS_REQUEST:
      return {
        ...state,
        statsLoading: true,
        statsError: null
      }
    case USER_STATS_SUCCESS:
      return {
        ...state,
        statsLoading: false,
        stats: action.payload?.data || {},
        statsError: null
      }
    case USER_STATS_FAIL:
      return {
        ...state,
        statsLoading: false,
        statsError: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        statsError: null
      }
    default:
      return state;
  }
};