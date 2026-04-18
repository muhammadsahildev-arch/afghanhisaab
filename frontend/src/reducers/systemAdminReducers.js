import {
  SYSTEM_ADMIN_GET_ALL_USERS_REQUEST,
  SYSTEM_ADMIN_GET_ALL_USERS_SUCCESS,
  SYSTEM_ADMIN_GET_ALL_USERS_FAIL,
  SYSTEM_ADMIN_DELETE_USER_REQUEST,
  SYSTEM_ADMIN_DELETE_USER_SUCCESS,
  SYSTEM_ADMIN_DELETE_USER_FAIL,
  SYSTEM_ADMIN_DELETE_USER_RESET,
  CLEAR_ERRORS
} from "../constants/constants";

// System Admin - Get All Users Reducer
export const systemAdminAllUsersReducer = (state = { users: [], loading: false, total: 0, page: 1, pages: 1 }, action) => {
  switch (action.type) {
    case SYSTEM_ADMIN_GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case SYSTEM_ADMIN_GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload?.users || [],
        total: action.payload?.total || 0,
        page: action.payload?.page || 1,
        pages: action.payload?.pages || 1,
        error: null
      }
    case SYSTEM_ADMIN_GET_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        users: []
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

// System Admin - Delete User Reducer
export const systemAdminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM_ADMIN_DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SYSTEM_ADMIN_DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload?.message
      }
    case SYSTEM_ADMIN_DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case SYSTEM_ADMIN_DELETE_USER_RESET:
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