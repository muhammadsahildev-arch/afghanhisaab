import axios from 'axios';
import {
  CREATE_LEDGER_ENTRY_REQUEST, CREATE_LEDGER_ENTRY_SUCCESS, CREATE_LEDGER_ENTRY_FAIL,
  ALL_LEDGER_ENTRIES_REQUEST, ALL_LEDGER_ENTRIES_SUCCESS, ALL_LEDGER_ENTRIES_FAIL,
  LEDGER_ENTRY_DETAILS_REQUEST, LEDGER_ENTRY_DETAILS_SUCCESS, LEDGER_ENTRY_DETAILS_FAIL,
  UPDATE_LEDGER_ENTRY_REQUEST, UPDATE_LEDGER_ENTRY_SUCCESS, UPDATE_LEDGER_ENTRY_FAIL,
  DELETE_LEDGER_ENTRY_REQUEST, DELETE_LEDGER_ENTRY_SUCCESS, DELETE_LEDGER_ENTRY_FAIL,
  LEDGER_STATS_REQUEST, LEDGER_STATS_SUCCESS, LEDGER_STATS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

const BASE_URI = `http://localhost:5000/api`;
//const BASE_URI = `/api`;

// Get All Ledger Entries
export const getAllLedgerEntriesAction = (page = 1, limit = 10, search = '', status = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_LEDGER_ENTRIES_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/ledger?page=${page}&limit=${limit}&search=${search}&status=${status}`, config);
    dispatch({ type: ALL_LEDGER_ENTRIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_LEDGER_ENTRIES_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Ledger Entry Details
export const getLedgerEntryDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: LEDGER_ENTRY_DETAILS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/ledger/${id}`, config);
    dispatch({ type: LEDGER_ENTRY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LEDGER_ENTRY_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Create Ledger Entry
export const createLedgerEntryAction = (entryData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_LEDGER_ENTRY_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/ledger`, entryData, config);
    dispatch({ type: CREATE_LEDGER_ENTRY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_LEDGER_ENTRY_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Update Ledger Entry
export const updateLedgerEntryAction = (id, entryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LEDGER_ENTRY_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.put(`${BASE_URI}/ledger/${id}`, entryData, config);
    dispatch({ type: UPDATE_LEDGER_ENTRY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_LEDGER_ENTRY_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Delete Ledger Entry
export const deleteLedgerEntryAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LEDGER_ENTRY_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.delete(`${BASE_URI}/ledger/${id}`, config);
    dispatch({ type: DELETE_LEDGER_ENTRY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_LEDGER_ENTRY_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get Ledger Stats
export const getLedgerStatsAction = () => async (dispatch) => {
  try {
    dispatch({ type: LEDGER_STATS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/ledger/stats`, config);
    dispatch({ type: LEDGER_STATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LEDGER_STATS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}