import axios from 'axios';
import {
  SALES_REPORT_REQUEST, SALES_REPORT_SUCCESS, SALES_REPORT_FAIL,
  PROFIT_LOSS_REPORT_REQUEST, PROFIT_LOSS_REPORT_SUCCESS, PROFIT_LOSS_REPORT_FAIL,
  EXPENSE_REPORT_REQUEST, EXPENSE_REPORT_SUCCESS, EXPENSE_REPORT_FAIL,
  DISCOUNT_REPORT_REQUEST, DISCOUNT_REPORT_SUCCESS, DISCOUNT_REPORT_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

//const BASE_URI = `http://localhost:5000/api`;
const BASE_URI = `/api`;

// Get Sales Report
export const getSalesReportAction = (period = 'daily', fromDate = '', toDate = '') => async (dispatch) => {
  try {
    dispatch({ type: SALES_REPORT_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/reports/sales?period=${period}&fromDate=${fromDate}&toDate=${toDate}`, config);
    dispatch({ type: SALES_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SALES_REPORT_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Profit/Loss Report
export const getProfitLossReportAction = (period = 'monthly', fromDate = '', toDate = '') => async (dispatch) => {
  try {
    dispatch({ type: PROFIT_LOSS_REPORT_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/reports/profit-loss?period=${period}&fromDate=${fromDate}&toDate=${toDate}`, config);
    dispatch({ type: PROFIT_LOSS_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PROFIT_LOSS_REPORT_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Expense Report
export const getExpenseReportAction = (period = 'monthly', fromDate = '', toDate = '') => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_REPORT_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/reports/expenses?period=${period}&fromDate=${fromDate}&toDate=${toDate}`, config);
    dispatch({ type: EXPENSE_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXPENSE_REPORT_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Discount Report
export const getDiscountReportAction = (period = 'monthly', fromDate = '', toDate = '') => async (dispatch) => {
  try {
    dispatch({ type: DISCOUNT_REPORT_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/reports/discounts?period=${period}&fromDate=${fromDate}&toDate=${toDate}`, config);
    dispatch({ type: DISCOUNT_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DISCOUNT_REPORT_FAIL, payload: error.response?.data?.message || error.message });
  }
};


// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}