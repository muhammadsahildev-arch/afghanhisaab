import axios from 'axios';
import {
  LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
  LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS,
  LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL,
  PAYMENT_SUCCESS_REQUEST, PAYMENT_SUCCESS_SUCCESS, PAYMENT_SUCCESS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

const BASE_URI = `http://localhost:5000/api`;
//const BASE_URI = `/api`;

// Login User Action
export const loginUserAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }

    const { data } = await axios.post(`${BASE_URI}/auth/login`, { email, password }, config);

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Register User Action
export const registerUserAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };

    const { data } = await axios.post(`${BASE_URI}/auth/register`, userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Forgot Password Action
export const forgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" }
    }

    const { data } = await axios.post(`${BASE_URI}/auth/forgot-password`, { email }, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Reset Password Action
export const resetPasswordAction = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    }

    const { data } = await axios.put(`${BASE_URI}/auth/reset-password/${token}`, { password }, config);

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Load User Action
export const loadUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      withCredentials: true
    };

    const { data } = await axios.get(`${BASE_URI}/auth/me`, config);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Update Password Action
export const updatePasswordAction = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    const { data } = await axios.put(`${BASE_URI}/auth/update-password`, passwords, config);

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Update Profile Action
export const updateProfileAction = (profileData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };

    const { data } = await axios.put(`${BASE_URI}/auth/profile`, profileData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Payment Success Action (Upgrade to shop_admin)
export const paymentSuccessAction = () => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_SUCCESS_REQUEST });

    const config = {
      withCredentials: true
    };

    const { data } = await axios.post(`${BASE_URI}/auth/payment-success`, {}, config);

    dispatch({
      type: PAYMENT_SUCCESS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: PAYMENT_SUCCESS_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Logout User Action
export const logoutUserAction = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true
    };

    await axios.get(`${BASE_URI}/auth/logout`, config);

    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');

    dispatch({
      type: LOGOUT_USER_SUCCESS,
    });

  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL, 
      payload: error.response?.data?.message || error.message
    });
  }
}

// Clear Errors Action
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}