import {
  ALL_ROLES_REQUEST, ALL_ROLES_SUCCESS, ALL_ROLES_FAIL,
  CREATE_ROLE_REQUEST, CREATE_ROLE_SUCCESS, CREATE_ROLE_FAIL, CREATE_ROLE_RESET,
  DELETE_ROLE_REQUEST, DELETE_ROLE_SUCCESS, DELETE_ROLE_FAIL, DELETE_ROLE_RESET,
  ALL_PERMISSIONS_REQUEST, ALL_PERMISSIONS_SUCCESS, ALL_PERMISSIONS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

export const allRolesReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case ALL_ROLES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload.data
      }
    case ALL_ROLES_FAIL:
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

export const createRoleReducer = (state = { role: {} }, action) => {
  switch (action.type) {
    case CREATE_ROLE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        role: action.payload.data
      }
    case CREATE_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_ROLE_RESET:
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

export const deleteRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROLE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message
      }
    case DELETE_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_ROLE_RESET:
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

export const allPermissionsReducer = (state = { permissions: [] }, action) => {
  switch (action.type) {
    case ALL_PERMISSIONS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_PERMISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        permissions: action.payload.data
      }
    case ALL_PERMISSIONS_FAIL:
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