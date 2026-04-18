import axios from 'axios';
import {
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL,
  ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL,
  ADD_STOCK_REQUEST, ADD_STOCK_SUCCESS, ADD_STOCK_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

//const BASE_URI = `http://localhost:5000/api`;
const BASE_URI = `/api`;


// Get All Products
export const getAllProductsAction = (page = 1, limit = 10, search = '', category = '', status = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/products?page=${page}&limit=${limit}&search=${search}&category=${category}&status=${status}`, config);

    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_PRODUCTS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Product Details
export const getProductDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/products/${id}`, config);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Create Product
export const createProductAction = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/products`, productData, config);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Update Product
export const updateProductAction = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.put(`${BASE_URI}/products/${id}`, productData, config);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Delete Product
export const deleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.delete(`${BASE_URI}/products/${id}`, config);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Add Stock to Product
export const addStockAction = (id, stockData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_STOCK_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/products/${id}/add-stock`, stockData, config);
    dispatch({ type: ADD_STOCK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_STOCK_FAIL, payload: error.response?.data?.message || error.message });
  }
};


// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}