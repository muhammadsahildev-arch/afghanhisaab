import { CLEAR_ERRORS, CONTACT_US_FAIL, CONTACT_US_REQUEST, CONTACT_US_RESET, CONTACT_US_SUCCESS } from "../constants/contactConstants";
import axios from 'axios';

//const BASE_URI = `http://localhost:5000/cpi`;
const BASE_URI = `/cpi`;

// Create Contact Action
export const createContactUsAction = (contactData) => async (dispatch) => {
    try {
        dispatch({ type: CONTACT_US_REQUEST });

        const config = { 
            headers: { 
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${BASE_URI}/contact`, contactData, config);

        dispatch({
            type: CONTACT_US_SUCCESS,
            payload: data
        });

        return data;

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        
        dispatch({
            type: CONTACT_US_FAIL,
            payload: errorMessage
        });
        
        throw error;
    }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};

// Reset Contact Us
export const resetContactUs = () => (dispatch) => {
    dispatch({
        type: CONTACT_US_RESET
    });
};