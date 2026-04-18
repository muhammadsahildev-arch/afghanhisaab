import axios from 'axios';
import {
  CREATE_WAREHOUSE_REQUEST, CREATE_WAREHOUSE_SUCCESS, CREATE_WAREHOUSE_FAIL,
  ALL_WAREHOUSES_REQUEST, ALL_WAREHOUSES_SUCCESS, ALL_WAREHOUSES_FAIL,
  WAREHOUSE_DETAILS_REQUEST, WAREHOUSE_DETAILS_SUCCESS, WAREHOUSE_DETAILS_FAIL,
  UPDATE_WAREHOUSE_REQUEST, UPDATE_WAREHOUSE_SUCCESS, UPDATE_WAREHOUSE_FAIL,
  DELETE_WAREHOUSE_REQUEST, DELETE_WAREHOUSE_SUCCESS, DELETE_WAREHOUSE_FAIL,
  TRANSFER_STOCK_REQUEST, TRANSFER_STOCK_SUCCESS, TRANSFER_STOCK_FAIL,
  ALL_TRANSFERS_REQUEST, ALL_TRANSFERS_SUCCESS, ALL_TRANSFERS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

//const BASE_URI = `http://localhost:5000/api`;
const BASE_URI = `/api`;

// Get All Warehouses
export const getAllWarehousesAction = (page = 1, limit = 10, search = '', status = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_WAREHOUSES_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/warehouses?page=${page}&limit=${limit}&search=${search}&status=${status}`, config);
    dispatch({ type: ALL_WAREHOUSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_WAREHOUSES_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Warehouse Details
export const getWarehouseDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_DETAILS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/warehouses/${id}`, config);
    dispatch({ type: WAREHOUSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WAREHOUSE_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Create Warehouse
export const createWarehouseAction = (warehouseData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_WAREHOUSE_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/warehouses`, warehouseData, config);
    dispatch({ type: CREATE_WAREHOUSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_WAREHOUSE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Update Warehouse
export const updateWarehouseAction = (id, warehouseData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_WAREHOUSE_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.put(`${BASE_URI}/warehouses/${id}`, warehouseData, config);
    dispatch({ type: UPDATE_WAREHOUSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_WAREHOUSE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Delete Warehouse
export const deleteWarehouseAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_WAREHOUSE_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.delete(`${BASE_URI}/warehouses/${id}`, config);
    dispatch({ type: DELETE_WAREHOUSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_WAREHOUSE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Transfer Stock
export const transferStockAction = (transferData) => async (dispatch) => {
  try {
    dispatch({ type: TRANSFER_STOCK_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/warehouses/transfer`, transferData, config);
    dispatch({ type: TRANSFER_STOCK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TRANSFER_STOCK_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get All Transfers
export const getAllTransfersAction = (page = 1, limit = 10, search = '', status = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_TRANSFERS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/warehouses/transfers?page=${page}&limit=${limit}&search=${search}&status=${status}`, config);
    dispatch({ type: ALL_TRANSFERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_TRANSFERS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}