import axios from 'axios';
import {
  CREATE_EXPENSE_REQUEST, CREATE_EXPENSE_SUCCESS, CREATE_EXPENSE_FAIL,
  ALL_EXPENSES_REQUEST, ALL_EXPENSES_SUCCESS, ALL_EXPENSES_FAIL,
  EXPENSE_DETAILS_REQUEST, EXPENSE_DETAILS_SUCCESS, EXPENSE_DETAILS_FAIL,
  UPDATE_EXPENSE_REQUEST, UPDATE_EXPENSE_SUCCESS, UPDATE_EXPENSE_FAIL,
  DELETE_EXPENSE_REQUEST, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

const BASE_URI = `http://localhost:5000/api`;
//const BASE_URI = `/api`;

// Get All Expenses
export const getAllExpensesAction = (page = 1, limit = 10, search = '', category = '', fromDate = '', toDate = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_EXPENSES_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/expenses?page=${page}&limit=${limit}&search=${search}&category=${category}&fromDate=${fromDate}&toDate=${toDate}`, config);
    dispatch({ type: ALL_EXPENSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_EXPENSES_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Expense Details
export const getExpenseDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_DETAILS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/expenses/${id}`, config);
    dispatch({ type: EXPENSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXPENSE_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Create Expense
export const createExpenseAction = (expenseData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EXPENSE_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/expenses`, expenseData, config);
    dispatch({ type: CREATE_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_EXPENSE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Update Expense
export const updateExpenseAction = (id, expenseData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EXPENSE_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.put(`${BASE_URI}/expenses/${id}`, expenseData, config);
    dispatch({ type: UPDATE_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_EXPENSE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Delete Expense
export const deleteExpenseAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EXPENSE_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.delete(`${BASE_URI}/expenses/${id}`, config);
    dispatch({ type: DELETE_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_EXPENSE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}