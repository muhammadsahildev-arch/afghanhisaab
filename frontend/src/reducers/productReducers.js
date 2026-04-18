import {
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_RESET,
  ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET,
  ADD_STOCK_REQUEST, ADD_STOCK_SUCCESS, ADD_STOCK_FAIL, ADD_STOCK_RESET,
  CLEAR_ERRORS
} from "../constants/constants";

export const allProductsReducer = (state = { products: [], stats: {} }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        stats: action.payload.stats,
        pagination: action.payload.pagination
      }
    case ALL_PRODUCTS_FAIL:
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.data
      }
    case PRODUCT_DETAILS_FAIL:
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

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload.data
      }
    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_PRODUCT_RESET:
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

export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload.data
      }
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_PRODUCT_RESET:
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

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message
      }
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_PRODUCT_RESET:
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

export const addStockReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_STOCK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload.data
      }
    case ADD_STOCK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case ADD_STOCK_RESET:
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