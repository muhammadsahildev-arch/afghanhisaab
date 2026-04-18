import axios from 'axios';
import {
  ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_FAIL,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
  USER_STATS_REQUEST, USER_STATS_SUCCESS, USER_STATS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

//const BASE_URI = `http://localhost:5000/api`;
const BASE_URI = `/api`;

// Get All Users Action
export const getAllUsersAction = (page = 1, limit = 10, search = '', role = '', status = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });

    const config = {
      withCredentials: true
    };

    const { data } = await axios.get(`${BASE_URI}/users?page=${page}&limit=${limit}&search=${search}&role=${role}&status=${status}`, config);

    dispatch({
      type: ALL_USER_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get User Stats Action
export const getUserStatsAction = () => async (dispatch) => {
  try {
    dispatch({ type: USER_STATS_REQUEST });

    const config = {
      withCredentials: true
    };

    const { data } = await axios.get(`${BASE_URI}/users/stats`, config);

    dispatch({
      type: USER_STATS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: USER_STATS_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Single User Details Action
export const getUserDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      withCredentials: true
    };

    const { data } = await axios.get(`${BASE_URI}/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Create User Action
export const createUserAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };

    const { data } = await axios.post(`${BASE_URI}/users`, userData, config);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Update User Action
export const updateUserAction = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };

    const { data } = await axios.put(`${BASE_URI}/users/${id}`, userData, config);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Delete User Action
export const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const config = {
      withCredentials: true
    };

    const { data } = await axios.delete(`${BASE_URI}/users/${id}`, config);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Toggle User Status Action
export const toggleUserStatusAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      withCredentials: true
    };

    const { data } = await axios.patch(`${BASE_URI}/users/${id}/toggle-status`, {}, config);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}