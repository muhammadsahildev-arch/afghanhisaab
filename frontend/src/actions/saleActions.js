import axios from 'axios';
import {
  CREATE_SALE_REQUEST, CREATE_SALE_SUCCESS, CREATE_SALE_FAIL,
  ALL_SALES_REQUEST, ALL_SALES_SUCCESS, ALL_SALES_FAIL,
  SALE_DETAILS_REQUEST, SALE_DETAILS_SUCCESS, SALE_DETAILS_FAIL,
  DAILY_SALES_SUMMARY_REQUEST, DAILY_SALES_SUMMARY_SUCCESS, DAILY_SALES_SUMMARY_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

//const BASE_URI = `http://localhost:5000/api`;
const BASE_URI = `/api`;

// Get All Sales
export const getAllSalesAction = (page = 1, limit = 10, search = '', fromDate = '', toDate = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_SALES_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/sales?page=${page}&limit=${limit}&search=${search}&fromDate=${fromDate}&toDate=${toDate}`, config);
    dispatch({ type: ALL_SALES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_SALES_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Sale Details
export const getSaleDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SALE_DETAILS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/sales/${id}`, config);
    dispatch({ type: SALE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SALE_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Create Sale (POS)
export const createSaleAction = (saleData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SALE_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/sales`, saleData, config);
    dispatch({ type: CREATE_SALE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_SALE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Daily Sales Summary
export const getDailySalesSummaryAction = (date = '') => async (dispatch) => {
  try {
    dispatch({ type: DAILY_SALES_SUMMARY_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/sales/daily-summary?date=${date}`, config);
    dispatch({ type: DAILY_SALES_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DAILY_SALES_SUMMARY_FAIL, payload: error.response?.data?.message || error.message });
  }
};


// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
} 