import axios from 'axios';
import {
  ALL_ROLES_REQUEST, ALL_ROLES_SUCCESS, ALL_ROLES_FAIL,
  CREATE_ROLE_REQUEST, CREATE_ROLE_SUCCESS, CREATE_ROLE_FAIL,
  DELETE_ROLE_REQUEST, DELETE_ROLE_SUCCESS, DELETE_ROLE_FAIL,
  ALL_PERMISSIONS_REQUEST, ALL_PERMISSIONS_SUCCESS, ALL_PERMISSIONS_FAIL,
  CLEAR_ERRORS
} from "../constants/constants";

//const BASE_URI = `http://localhost:5000/api`;
const BASE_URI = `/api`;

// Get All Roles
export const getAllRolesAction = (search = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_ROLES_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/roles?search=${search}`, config);
    dispatch({ type: ALL_ROLES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_ROLES_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Create Role
export const createRoleAction = (roleData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ROLE_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    const { data } = await axios.post(`${BASE_URI}/roles`, roleData, config);
    dispatch({ type: CREATE_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ROLE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Delete Role
export const deleteRoleAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROLE_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.delete(`${BASE_URI}/roles/${id}`, config);
    dispatch({ type: DELETE_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ROLE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get All Permissions
export const getAllPermissionsAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PERMISSIONS_REQUEST });
    const config = { withCredentials: true };
    const { data } = await axios.get(`${BASE_URI}/permissions`, config);
    dispatch({ type: ALL_PERMISSIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_PERMISSIONS_FAIL, payload: error.response?.data?.message || error.message });
  }
};



// Clear Errors 
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}