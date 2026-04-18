import {
  SUBMIT_PAYMENT_PROOF_REQUEST,
  SUBMIT_PAYMENT_PROOF_SUCCESS,
  SUBMIT_PAYMENT_PROOF_FAIL,
  SUBMIT_PAYMENT_PROOF_RESET,
  GET_PENDING_PAYMENTS_REQUEST,
  GET_PENDING_PAYMENTS_SUCCESS,
  GET_PENDING_PAYMENTS_FAIL,
  GET_ALL_PAYMENT_PROOFS_REQUEST,
  GET_ALL_PAYMENT_PROOFS_SUCCESS,
  GET_ALL_PAYMENT_PROOFS_FAIL,
  APPROVE_PAYMENT_REQUEST,
  APPROVE_PAYMENT_SUCCESS,
  APPROVE_PAYMENT_FAIL,
  APPROVE_PAYMENT_RESET,
  DENY_PAYMENT_REQUEST,
  DENY_PAYMENT_SUCCESS,
  DENY_PAYMENT_FAIL,
  DENY_PAYMENT_RESET,
  GET_MY_PAYMENT_STATUS_REQUEST,
  GET_MY_PAYMENT_STATUS_SUCCESS,
  GET_MY_PAYMENT_STATUS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

// Submit Payment Proof Reducer
export const submitPaymentProofReducer = (state = { paymentProof: {} }, action) => {
  switch (action.type) {
    case SUBMIT_PAYMENT_PROOF_REQUEST:
      return {
        ...state,
        loading: true
      };
    case SUBMIT_PAYMENT_PROOF_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        paymentProof: action.payload.paymentProof || action.payload
      };
    case SUBMIT_PAYMENT_PROOF_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SUBMIT_PAYMENT_PROOF_RESET:
      return {
        ...state,
        success: false,
        error: null
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Get Pending Payments Reducer (System Admin)
export const pendingPaymentsReducer = (state = { payments: [] }, action) => {
  switch (action.type) {
    case GET_PENDING_PAYMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_PENDING_PAYMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: action.payload.payments || [],
        count: action.payload.count || 0
      };
    case GET_PENDING_PAYMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Get All Payment Proofs Reducer (System Admin)
export const allPaymentProofsReducer = (state = { payments: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PAYMENT_PROOFS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_PAYMENT_PROOFS_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: action.payload.payments || [],
        total: action.payload.total || 0,
        page: action.payload.page || 1,
        pages: action.payload.pages || 1
      };
    case GET_ALL_PAYMENT_PROOFS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Approve Payment Reducer (System Admin)
export const approvePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case APPROVE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case APPROVE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload
      };
    case APPROVE_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case APPROVE_PAYMENT_RESET:
      return {
        ...state,
        success: false,
        error: null
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Deny Payment Reducer (System Admin)
export const denyPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case DENY_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DENY_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload
      };
    case DENY_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DENY_PAYMENT_RESET:
      return {
        ...state,
        success: false,
        error: null
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Get My Payment Status Reducer (Customer)
export const myPaymentStatusReducer = (state = { paymentStatus: null }, action) => {
  switch (action.type) {
    case GET_MY_PAYMENT_STATUS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_MY_PAYMENT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentStatus: action.payload.paymentStatus,
        paymentProof: action.payload.paymentProof,
        accountStatus: action.payload.accountStatus,
        role: action.payload.role
      };
    case GET_MY_PAYMENT_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};