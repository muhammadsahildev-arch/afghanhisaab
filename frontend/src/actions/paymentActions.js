import axios from 'axios';
import {
  SUBMIT_PAYMENT_PROOF_REQUEST,
  SUBMIT_PAYMENT_PROOF_SUCCESS,
  SUBMIT_PAYMENT_PROOF_FAIL,
  GET_PENDING_PAYMENTS_REQUEST,
  GET_PENDING_PAYMENTS_SUCCESS,
  GET_PENDING_PAYMENTS_FAIL,
  GET_ALL_PAYMENT_PROOFS_REQUEST,
  GET_ALL_PAYMENT_PROOFS_SUCCESS,
  GET_ALL_PAYMENT_PROOFS_FAIL,
  APPROVE_PAYMENT_REQUEST,
  APPROVE_PAYMENT_SUCCESS,
  APPROVE_PAYMENT_FAIL,
  DENY_PAYMENT_REQUEST,
  DENY_PAYMENT_SUCCESS,
  DENY_PAYMENT_FAIL,
  GET_MY_PAYMENT_STATUS_REQUEST,
  GET_MY_PAYMENT_STATUS_SUCCESS,
  GET_MY_PAYMENT_STATUS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";
import { toast } from "react-toastify";

const BASE_URI = `http://localhost:5000/api`;
//const BASE_URI = `/api`;

// ==================== PAYMENT PROOF ACTIONS ====================

// Submit Payment Proof (Customer)
export const submitPaymentProofAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_PAYMENT_PROOF_REQUEST });
    
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    };
    
    const { data } = await axios.post(`${BASE_URI}/auth/submit-payment-proof`, formData, config);
    
    toast.success(data.message || 'Payment proof submitted successfully! Admin will review and activate your account within 24-48 hours.');
    dispatch({ type: SUBMIT_PAYMENT_PROOF_SUCCESS, payload: data });
    
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    dispatch({ type: SUBMIT_PAYMENT_PROOF_FAIL, payload: errorMessage });
    throw error;
  }
};

// Get Pending Payments (System Admin)
export const getPendingPaymentsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PENDING_PAYMENTS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/auth/payment-proofs/pending`, config);
    
    dispatch({ type: GET_PENDING_PAYMENTS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: GET_PENDING_PAYMENTS_FAIL, payload: errorMessage });
  }
};

// Get All Payment Proofs with Filters (System Admin)
export const getAllPaymentProofsAction = (page = 1, limit = 10, status = '') => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PAYMENT_PROOFS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(
      `${BASE_URI}/auth/payment-proofs?page=${page}&limit=${limit}&status=${status}`,
      config
    );
    
    dispatch({ type: GET_ALL_PAYMENT_PROOFS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: GET_ALL_PAYMENT_PROOFS_FAIL, payload: errorMessage });
  }
};

// Approve Payment (System Admin)
export const approvePaymentAction = (userId, notes) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_PAYMENT_REQUEST });
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };
    const { data } = await axios.post(
      `${BASE_URI}/auth/payment-proofs/${userId}/approve`,
      { notes },
      config
    );
    
    toast.success(data.message || 'Payment approved successfully! User account activated.');
    dispatch({ type: APPROVE_PAYMENT_SUCCESS, payload: data });
    
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    dispatch({ type: APPROVE_PAYMENT_FAIL, payload: errorMessage });
    throw error;
  }
};

// Deny Payment (System Admin)
export const denyPaymentAction = (userId, notes) => async (dispatch) => {
  try {
    dispatch({ type: DENY_PAYMENT_REQUEST });
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };
    const { data } = await axios.post(
      `${BASE_URI}/auth/payment-proofs/${userId}/deny`,
      { notes },
      config
    );
    
    toast.success(data.message || 'Payment denied successfully! User notified.');
    dispatch({ type: DENY_PAYMENT_SUCCESS, payload: data });
    
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    dispatch({ type: DENY_PAYMENT_FAIL, payload: errorMessage });
    throw error;
  }
};

// Get My Payment Status (Customer)
export const getMyPaymentStatusAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_PAYMENT_STATUS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/auth/my-payment-status`, config);
    
    dispatch({ type: GET_MY_PAYMENT_STATUS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: GET_MY_PAYMENT_STATUS_FAIL, payload: errorMessage });
  }
};

// Clear Errors
export const clearPaymentErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};