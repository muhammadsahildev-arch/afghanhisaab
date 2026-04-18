import { CLEAR_ERRORS, CONTACT_US_FAIL, CONTACT_US_REQUEST, CONTACT_US_RESET, CONTACT_US_SUCCESS } from "../constants/contactConstants";

export const createContactUsReducer = (state = { 
  loading: false,
  success: false,
  error: null,
  sendMessage: {} 
}, action) => {
    switch (action.type) {
        case CONTACT_US_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null
            };
        case CONTACT_US_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                sendMessage: action.payload,
                error: null
            };
        case CONTACT_US_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        case CONTACT_US_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: null,
                sendMessage: {}
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};