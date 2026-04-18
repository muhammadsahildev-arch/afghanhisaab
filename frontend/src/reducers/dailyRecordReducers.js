import {
  CREATE_DAILY_RECORD_REQUEST, CREATE_DAILY_RECORD_SUCCESS, CREATE_DAILY_RECORD_FAIL, CREATE_DAILY_RECORD_RESET,
  ALL_DAILY_RECORDS_REQUEST, ALL_DAILY_RECORDS_SUCCESS, ALL_DAILY_RECORDS_FAIL,
  DAILY_RECORD_DETAILS_REQUEST, DAILY_RECORD_DETAILS_SUCCESS, DAILY_RECORD_DETAILS_FAIL,
  UPDATE_DAILY_RECORD_REQUEST, UPDATE_DAILY_RECORD_SUCCESS, UPDATE_DAILY_RECORD_FAIL, UPDATE_DAILY_RECORD_RESET,
  DELETE_DAILY_RECORD_REQUEST, DELETE_DAILY_RECORD_SUCCESS, DELETE_DAILY_RECORD_FAIL, DELETE_DAILY_RECORD_RESET,
  DAILY_RECORD_STATS_REQUEST, DAILY_RECORD_STATS_SUCCESS, DAILY_RECORD_STATS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

export const allDailyRecordsReducer = (state = { records: [], summary: {} }, action) => {
  switch (action.type) {
    case ALL_DAILY_RECORDS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_DAILY_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload.data,
        summary: action.payload.summary,
        pagination: action.payload.pagination
      }
    case ALL_DAILY_RECORDS_FAIL:
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

export const dailyRecordDetailsReducer = (state = { record: {} }, action) => {
  switch (action.type) {
    case DAILY_RECORD_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DAILY_RECORD_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        record: action.payload.data
      }
    case DAILY_RECORD_DETAILS_FAIL:
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

export const newDailyRecordReducer = (state = { record: {} }, action) => {
  switch (action.type) {
    case CREATE_DAILY_RECORD_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_DAILY_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        record: action.payload.data
      }
    case CREATE_DAILY_RECORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_DAILY_RECORD_RESET:
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

export const updateDailyRecordReducer = (state = { record: {} }, action) => {
  switch (action.type) {
    case UPDATE_DAILY_RECORD_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_DAILY_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        record: action.payload.data
      }
    case UPDATE_DAILY_RECORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_DAILY_RECORD_RESET:
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

export const deleteDailyRecordReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DAILY_RECORD_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_DAILY_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message
      }
    case DELETE_DAILY_RECORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_DAILY_RECORD_RESET:
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

export const dailyRecordStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case DAILY_RECORD_STATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DAILY_RECORD_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        stats: action.payload.data
      }
    case DAILY_RECORD_STATS_FAIL:
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