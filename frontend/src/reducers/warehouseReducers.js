import {
  CREATE_WAREHOUSE_REQUEST, CREATE_WAREHOUSE_SUCCESS, CREATE_WAREHOUSE_FAIL, CREATE_WAREHOUSE_RESET,
  ALL_WAREHOUSES_REQUEST, ALL_WAREHOUSES_SUCCESS, ALL_WAREHOUSES_FAIL,
  WAREHOUSE_DETAILS_REQUEST, WAREHOUSE_DETAILS_SUCCESS, WAREHOUSE_DETAILS_FAIL,
  UPDATE_WAREHOUSE_REQUEST, UPDATE_WAREHOUSE_SUCCESS, UPDATE_WAREHOUSE_FAIL, UPDATE_WAREHOUSE_RESET,
  DELETE_WAREHOUSE_REQUEST, DELETE_WAREHOUSE_SUCCESS, DELETE_WAREHOUSE_FAIL, DELETE_WAREHOUSE_RESET,
  TRANSFER_STOCK_REQUEST, TRANSFER_STOCK_SUCCESS, TRANSFER_STOCK_FAIL, TRANSFER_STOCK_RESET,
  ALL_TRANSFERS_REQUEST, ALL_TRANSFERS_SUCCESS, ALL_TRANSFERS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

export const allWarehousesReducer = (state = { warehouses: [], stats: {} }, action) => {
  switch (action.type) {
    case ALL_WAREHOUSES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_WAREHOUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        warehouses: action.payload.data,
        stats: action.payload.stats,
        pagination: action.payload.pagination
      }
    case ALL_WAREHOUSES_FAIL:
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

export const warehouseDetailsReducer = (state = { warehouse: {} }, action) => {
  switch (action.type) {
    case WAREHOUSE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case WAREHOUSE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        warehouse: action.payload.data
      }
    case WAREHOUSE_DETAILS_FAIL:
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

export const newWarehouseReducer = (state = { warehouse: {} }, action) => {
  switch (action.type) {
    case CREATE_WAREHOUSE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        warehouse: action.payload.data
      }
    case CREATE_WAREHOUSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_WAREHOUSE_RESET:
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

export const updateWarehouseReducer = (state = { warehouse: {} }, action) => {
  switch (action.type) {
    case UPDATE_WAREHOUSE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        warehouse: action.payload.data
      }
    case UPDATE_WAREHOUSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_WAREHOUSE_RESET:
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

export const deleteWarehouseReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_WAREHOUSE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message
      }
    case DELETE_WAREHOUSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_WAREHOUSE_RESET:
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

export const transferStockReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSFER_STOCK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case TRANSFER_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload.data
      }
    case TRANSFER_STOCK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case TRANSFER_STOCK_RESET:
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

export const allTransfersReducer = (state = { transfers: [] }, action) => {
  switch (action.type) {
    case ALL_TRANSFERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_TRANSFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        transfers: action.payload.data,
        pagination: action.payload.pagination
      }
    case ALL_TRANSFERS_FAIL:
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