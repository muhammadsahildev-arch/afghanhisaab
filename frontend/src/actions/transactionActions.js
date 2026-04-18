import axios from 'axios';
import {
  CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAIL,
  ALL_TRANSACTIONS_REQUEST, ALL_TRANSACTIONS_SUCCESS, ALL_TRANSACTIONS_FAIL,
  TRANSACTION_DETAILS_REQUEST, TRANSACTION_DETAILS_SUCCESS, TRANSACTION_DETAILS_FAIL,
  UPDATE_TRANSACTION_REQUEST, UPDATE_TRANSACTION_SUCCESS, UPDATE_TRANSACTION_FAIL,
  DELETE_TRANSACTION_REQUEST, DELETE_TRANSACTION_SUCCESS, DELETE_TRANSACTION_FAIL,
  TRANSACTION_STATS_REQUEST, TRANSACTION_STATS_SUCCESS, TRANSACTION_STATS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

//const BASE_URI = `http://localhost:5000/api`;
const BASE_URI = `/api`;

// Get All Transactions
export const getAllTransactionsAction = (page = 1, limit = 10, search = '', currency = '', status = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_TRANSACTIONS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/customer-transactions?page=${page}&limit=${limit}&search=${search}&currency=${currency}&status=${status}`, config);
    dispatch({ type: ALL_TRANSACTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_TRANSACTIONS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Transaction Details
export const getTransactionDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_DETAILS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/customer-transactions/${id}`, config);
    dispatch({ type: TRANSACTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TRANSACTION_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Create Transaction
export const createTransactionAction = (transactionData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TRANSACTION_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/customer-transactions`, transactionData, config);
    dispatch({ type: CREATE_TRANSACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_TRANSACTION_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Update Transaction
export const updateTransactionAction = (id, transactionData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRANSACTION_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.put(`${BASE_URI}/customer-transactions/${id}`, transactionData, config);
    dispatch({ type: UPDATE_TRANSACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_TRANSACTION_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Delete Transaction
export const deleteTransactionAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRANSACTION_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.delete(`${BASE_URI}/customer-transactions/${id}`, config);
    dispatch({ type: DELETE_TRANSACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_TRANSACTION_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Transaction Stats
export const getTransactionStatsAction = () => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_STATS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/customer-transactions/stats`, config);
    dispatch({ type: TRANSACTION_STATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TRANSACTION_STATS_FAIL, payload: error.response?.data?.message || error.message });
  }
};


// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}