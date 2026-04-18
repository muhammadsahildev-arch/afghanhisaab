import axios from 'axios';
import {
  CREATE_SUPPLIER_REQUEST, CREATE_SUPPLIER_SUCCESS, CREATE_SUPPLIER_FAIL,
  ALL_SUPPLIERS_REQUEST, ALL_SUPPLIERS_SUCCESS, ALL_SUPPLIERS_FAIL,
  SUPPLIER_DETAILS_REQUEST, SUPPLIER_DETAILS_SUCCESS, SUPPLIER_DETAILS_FAIL,
  UPDATE_SUPPLIER_REQUEST, UPDATE_SUPPLIER_SUCCESS, UPDATE_SUPPLIER_FAIL,
  DELETE_SUPPLIER_REQUEST, DELETE_SUPPLIER_SUCCESS, DELETE_SUPPLIER_FAIL,
  CREATE_PURCHASE_ORDER_REQUEST, CREATE_PURCHASE_ORDER_SUCCESS, CREATE_PURCHASE_ORDER_FAIL,
  ALL_PURCHASE_ORDERS_REQUEST, ALL_PURCHASE_ORDERS_SUCCESS, ALL_PURCHASE_ORDERS_FAIL,
  PURCHASE_ORDER_DETAILS_REQUEST, PURCHASE_ORDER_DETAILS_SUCCESS, PURCHASE_ORDER_DETAILS_FAIL,
  RECEIVE_STOCK_REQUEST, RECEIVE_STOCK_SUCCESS, RECEIVE_STOCK_FAIL,
  UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";
import { toast } from "react-toastify";


//const BASE_URI = `http://localhost:5000/api`;
const BASE_URI = `/api`;

// ==================== SUPPLIER ACTIONS ====================

// Get All Suppliers
export const getAllSuppliersAction = (page = 1, limit = 10, search = '', status = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_SUPPLIERS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/purchases/suppliers?page=${page}&limit=${limit}&search=${search}&status=${status}`, config);
    dispatch({ type: ALL_SUPPLIERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_SUPPLIERS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Supplier Details
export const getSupplierDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUPPLIER_DETAILS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/purchases/suppliers/${id}`, config);
    dispatch({ type: SUPPLIER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SUPPLIER_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Create Supplier
export const createSupplierAction = (supplierData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SUPPLIER_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/purchases/suppliers`, supplierData, config);
    dispatch({ type: CREATE_SUPPLIER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_SUPPLIER_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Update Supplier
export const updateSupplierAction = (id, supplierData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SUPPLIER_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.put(`${BASE_URI}/purchases/suppliers/${id}`, supplierData, config);
    dispatch({ type: UPDATE_SUPPLIER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_SUPPLIER_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Delete Supplier
export const deleteSupplierAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SUPPLIER_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.delete(`${BASE_URI}/purchases/suppliers/${id}`, config);
    dispatch({ type: DELETE_SUPPLIER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_SUPPLIER_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// ==================== PURCHASE ORDER ACTIONS ====================

// Get All Purchase Orders
export const getAllPurchaseOrdersAction = (page = 1, limit = 10, search = '', status = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_PURCHASE_ORDERS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/purchases/orders?page=${page}&limit=${limit}&search=${search}&status=${status}`, config);
    
    // Ensure we're sending the data in the correct format
    dispatch({ 
      type: ALL_PURCHASE_ORDERS_SUCCESS, 
      payload: {
        data: data.data || [], // The orders array
        stats: data.stats || {},
        pagination: data.pagination || {}
      } 
    });
  } catch (error) {
    dispatch({ type: ALL_PURCHASE_ORDERS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Purchase Order Details
export const getPurchaseOrderDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PURCHASE_ORDER_DETAILS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/purchases/orders/${id}`, config);
    dispatch({ type: PURCHASE_ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PURCHASE_ORDER_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// In purchaseActions.js - Create Purchase Order
export const createPurchaseOrderAction = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PURCHASE_ORDER_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    
    // Ensure supplierId is sent as string
    const formattedData = {
      ...orderData,
      supplierId: orderData.supplierId.toString(),
      items: orderData.items.map(item => ({
        ...item,
        productId: item.productId.toString(),
        warehouseId: item.warehouseId?.toString() || null
      }))
    };
    
    const { data } = await axios.post(`${BASE_URI}/purchases/orders`, formattedData, config);
    dispatch({ type: CREATE_PURCHASE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PURCHASE_ORDER_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Receive Stock Action - Fixed
export const receiveStockAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: RECEIVE_STOCK_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    // Don't send empty body - just send the request
    const { data } = await axios.post(`${BASE_URI}/purchases/orders/${id}/receive`, {}, config);
    
    toast.success(data.message || 'Stock received successfully');
    dispatch({ type: RECEIVE_STOCK_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    dispatch({ type: RECEIVE_STOCK_FAIL, payload: errorMessage });
  }
};
// In purchaseActions.js - Update Order Status
export const updateOrderStatusAction = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    
    // Send status as string, not object
    const { data } = await axios.put(`${BASE_URI}/purchases/orders/${id}/status`, { status }, config);
    dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_STATUS_FAIL, payload: error.response?.data?.message || error.message });
  }
};
// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};