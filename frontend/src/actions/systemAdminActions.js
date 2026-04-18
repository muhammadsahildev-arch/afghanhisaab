import axios from 'axios';
import {
  SYSTEM_ADMIN_GET_ALL_USERS_REQUEST,
  SYSTEM_ADMIN_GET_ALL_USERS_SUCCESS,
  SYSTEM_ADMIN_GET_ALL_USERS_FAIL,
  SYSTEM_ADMIN_DELETE_USER_REQUEST,
  SYSTEM_ADMIN_DELETE_USER_SUCCESS,
  SYSTEM_ADMIN_DELETE_USER_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

//const BASE_URI = `http://localhost:5000/api/auth`;
const BASE_URI = `/api`;

// ==================== SYSTEM ADMIN ACTIONS ====================

// Get All Users (System Admin)
export const systemAdminGetAllUsersAction = (page = 1, limit = 12, search = '', status = '', role = '', sortBy = 'createdAt', sortOrder = 'desc') => async (dispatch) => {
  try {
    dispatch({ type: SYSTEM_ADMIN_GET_ALL_USERS_REQUEST });

    const config = {
      withCredentials: true
    };

    const { data } = await axios.get(
      `${BASE_URI}/admin-users?page=${page}&limit=${limit}&search=${search}&status=${status}&role=${role}&sortBy=${sortBy}&sortOrder=${sortOrder}`, 
      config
    );

    dispatch({
      type: SYSTEM_ADMIN_GET_ALL_USERS_SUCCESS,
      payload: {
        users: data.users || [],
        total: data.total || 0,
        page: data.page || page,
        pages: data.pages || 1
      }
    });

    return data;

  } catch (error) {
    dispatch({
      type: SYSTEM_ADMIN_GET_ALL_USERS_FAIL,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

// Delete User (System Admin)
export const systemAdminDeleteUserAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: SYSTEM_ADMIN_DELETE_USER_REQUEST });

    const config = {
      withCredentials: true
    };

    const { data } = await axios.delete(`${BASE_URI}/users/${userId}`, config);

    dispatch({
      type: SYSTEM_ADMIN_DELETE_USER_SUCCESS,
      payload: data
    });

    return data;

  } catch (error) {
    dispatch({
      type: SYSTEM_ADMIN_DELETE_USER_FAIL,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

// Clear Errors
export const clearSystemAdminErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};