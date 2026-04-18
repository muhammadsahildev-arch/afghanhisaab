import {
  CREATE_LEDGER_ENTRY_REQUEST, CREATE_LEDGER_ENTRY_SUCCESS, CREATE_LEDGER_ENTRY_FAIL, CREATE_LEDGER_ENTRY_RESET,
  ALL_LEDGER_ENTRIES_REQUEST, ALL_LEDGER_ENTRIES_SUCCESS, ALL_LEDGER_ENTRIES_FAIL,
  LEDGER_ENTRY_DETAILS_REQUEST, LEDGER_ENTRY_DETAILS_SUCCESS, LEDGER_ENTRY_DETAILS_FAIL,
  UPDATE_LEDGER_ENTRY_REQUEST, UPDATE_LEDGER_ENTRY_SUCCESS, UPDATE_LEDGER_ENTRY_FAIL, UPDATE_LEDGER_ENTRY_RESET,
  DELETE_LEDGER_ENTRY_REQUEST, DELETE_LEDGER_ENTRY_SUCCESS, DELETE_LEDGER_ENTRY_FAIL, DELETE_LEDGER_ENTRY_RESET,
  LEDGER_STATS_REQUEST, LEDGER_STATS_SUCCESS, LEDGER_STATS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

export const allLedgerEntriesReducer = (state = { entries: [], summary: {} }, action) => {
  switch (action.type) {
    case ALL_LEDGER_ENTRIES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_LEDGER_ENTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload.data,
        summary: action.payload.summary,
        pagination: action.payload.pagination
      }
    case ALL_LEDGER_ENTRIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const ledgerEntryDetailsReducer = (state = { entry: {} }, action) => {
  switch (action.type) {
    case LEDGER_ENTRY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LEDGER_ENTRY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        entry: action.payload.data
      }
    case LEDGER_ENTRY_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const newLedgerEntryReducer = (state = { entry: {} }, action) => {
  switch (action.type) {
    case CREATE_LEDGER_ENTRY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_LEDGER_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        entry: action.payload.data
      }
    case CREATE_LEDGER_ENTRY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_LEDGER_ENTRY_RESET:
      return {
        ...state,
        success: false,
        error: null
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const updateLedgerEntryReducer = (state = { entry: {} }, action) => {
  switch (action.type) {
    case UPDATE_LEDGER_ENTRY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_LEDGER_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        entry: action.payload.data
      }
    case UPDATE_LEDGER_ENTRY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_LEDGER_ENTRY_RESET:
      return {
        ...state,
        success: false,
        error: null
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const deleteLedgerEntryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LEDGER_ENTRY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_LEDGER_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message
      }
    case DELETE_LEDGER_ENTRY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_LEDGER_ENTRY_RESET:
      return {
        ...state,
        success: false,
        error: null
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const ledgerStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case LEDGER_STATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LEDGER_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        stats: action.payload.data
      }
    case LEDGER_STATS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};