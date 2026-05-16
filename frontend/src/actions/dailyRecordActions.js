import axios from 'axios';
import {
  CREATE_DAILY_RECORD_REQUEST, CREATE_DAILY_RECORD_SUCCESS, CREATE_DAILY_RECORD_FAIL,
  ALL_DAILY_RECORDS_REQUEST, ALL_DAILY_RECORDS_SUCCESS, ALL_DAILY_RECORDS_FAIL,
  DAILY_RECORD_DETAILS_REQUEST, DAILY_RECORD_DETAILS_SUCCESS, DAILY_RECORD_DETAILS_FAIL,
  UPDATE_DAILY_RECORD_REQUEST, UPDATE_DAILY_RECORD_SUCCESS, UPDATE_DAILY_RECORD_FAIL,
  DELETE_DAILY_RECORD_REQUEST, DELETE_DAILY_RECORD_SUCCESS, DELETE_DAILY_RECORD_FAIL,
  DAILY_RECORD_STATS_REQUEST, DAILY_RECORD_STATS_SUCCESS, DAILY_RECORD_STATS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

//const BASE_URI = `http://localhost:5000/api`;
const BASE_URI = `/api`;

// Get All Daily Records
export const getAllDailyRecordsAction = (page = 1, limit = 10, search = '', fromDate = '', toDate = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_DAILY_RECORDS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/daily-records?page=${page}&limit=${limit}&search=${search}&fromDate=${fromDate}&toDate=${toDate}`, config);
    dispatch({ type: ALL_DAILY_RECORDS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_DAILY_RECORDS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Daily Record Details
export const getDailyRecordDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DAILY_RECORD_DETAILS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/daily-records/${id}`, config);
    dispatch({ type: DAILY_RECORD_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DAILY_RECORD_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Create Daily Record
export const createDailyRecordAction = (recordData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_DAILY_RECORD_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/daily-records`, recordData, config);
    dispatch({ type: CREATE_DAILY_RECORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_DAILY_RECORD_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Update Daily Record
export const updateDailyRecordAction = (id, recordData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DAILY_RECORD_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.put(`${BASE_URI}/daily-records/${id}`, recordData, config);
    dispatch({ type: UPDATE_DAILY_RECORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_DAILY_RECORD_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Delete Daily Record
export const deleteDailyRecordAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DAILY_RECORD_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.delete(`${BASE_URI}/daily-records/${id}`, config);
    dispatch({ type: DELETE_DAILY_RECORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_DAILY_RECORD_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Daily Record Stats
export const getDailyRecordStatsAction = () => async (dispatch) => {
  try {
    dispatch({ type: DAILY_RECORD_STATS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/daily-records/stats`, config);
    dispatch({ type: DAILY_RECORD_STATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DAILY_RECORD_STATS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}