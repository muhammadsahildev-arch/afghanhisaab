import {
  CREATE_SUPPLIER_REQUEST, CREATE_SUPPLIER_SUCCESS, CREATE_SUPPLIER_FAIL, CREATE_SUPPLIER_RESET,
  ALL_SUPPLIERS_REQUEST, ALL_SUPPLIERS_SUCCESS, ALL_SUPPLIERS_FAIL,
  SUPPLIER_DETAILS_REQUEST, SUPPLIER_DETAILS_SUCCESS, SUPPLIER_DETAILS_FAIL,
  UPDATE_SUPPLIER_REQUEST, UPDATE_SUPPLIER_SUCCESS, UPDATE_SUPPLIER_FAIL, UPDATE_SUPPLIER_RESET,
  DELETE_SUPPLIER_REQUEST, DELETE_SUPPLIER_SUCCESS, DELETE_SUPPLIER_FAIL, DELETE_SUPPLIER_RESET,
  CREATE_PURCHASE_ORDER_REQUEST, CREATE_PURCHASE_ORDER_SUCCESS, CREATE_PURCHASE_ORDER_FAIL, CREATE_PURCHASE_ORDER_RESET,
  ALL_PURCHASE_ORDERS_REQUEST, ALL_PURCHASE_ORDERS_SUCCESS, ALL_PURCHASE_ORDERS_FAIL,
  PURCHASE_ORDER_DETAILS_REQUEST, PURCHASE_ORDER_DETAILS_SUCCESS, PURCHASE_ORDER_DETAILS_FAIL,
  RECEIVE_STOCK_REQUEST, RECEIVE_STOCK_SUCCESS, RECEIVE_STOCK_FAIL, RECEIVE_STOCK_RESET,
  UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAIL, UPDATE_ORDER_STATUS_RESET,
  CLEAR_ERRORS
} from "../constants/constants";

// ==================== SUPPLIER REDUCERS ====================
export const allSuppliersReducer = (state = { suppliers: [], stats: {} }, action) => {
  switch (action.type) {
    case ALL_SUPPLIERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_SUPPLIERS_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: action.payload.data || [],
        stats: action.payload.stats || {},
        pagination: action.payload.pagination || {}
      }
    case ALL_SUPPLIERS_FAIL:
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

export const supplierDetailsReducer = (state = { supplier: {} }, action) => {
  switch (action.type) {
    case SUPPLIER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUPPLIER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        supplier: action.payload.data || {}
      }
    case SUPPLIER_DETAILS_FAIL:
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

export const newSupplierReducer = (state = { supplier: {} }, action) => {
  switch (action.type) {
    case CREATE_SUPPLIER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        supplier: action.payload.data || {}
      }
    case CREATE_SUPPLIER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_SUPPLIER_RESET:
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

export const updateSupplierReducer = (state = { supplier: {} }, action) => {
  switch (action.type) {
    case UPDATE_SUPPLIER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        supplier: action.payload.data || {}
      }
    case UPDATE_SUPPLIER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_SUPPLIER_RESET:
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

export const deleteSupplierReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUPPLIER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message
      }
    case DELETE_SUPPLIER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_SUPPLIER_RESET:
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

// ==================== PURCHASE ORDER REDUCERS ====================
export const allPurchaseOrdersReducer = (state = { orders: [], stats: {} }, action) => {
  switch (action.type) {
    case ALL_PURCHASE_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_PURCHASE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.data || [],
        stats: action.payload.stats || {},
        pagination: action.payload.pagination || {}
      }
    case ALL_PURCHASE_ORDERS_FAIL:
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

export const purchaseOrderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case PURCHASE_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PURCHASE_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.data || {}
      }
    case PURCHASE_ORDER_DETAILS_FAIL:
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

export const newPurchaseOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case CREATE_PURCHASE_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload.data || {}
      }
    case CREATE_PURCHASE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_PURCHASE_ORDER_RESET:
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

export const receiveStockReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_STOCK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload.data
      }
    case RECEIVE_STOCK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case RECEIVE_STOCK_RESET:
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

export const updateOrderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload.data
      }
    case UPDATE_ORDER_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_ORDER_STATUS_RESET:
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