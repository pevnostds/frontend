import axios from "axios";
import { actionTypesAuth } from "../actionTypes";
import { URL_API_AUTH } from "../../utils/constant";

const URL_API = URL_API_AUTH;

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: actionTypesAuth.LOGIN_REQUEST });
    try {
      const response = await axios.post(`${URL_API}/login`, {
        email,
        password,
      });
      const {status, message, token } = response.data;
      localStorage.setItem("token", token);
      dispatch({
        type: actionTypesAuth.LOGIN_SUCCESS,
        payload: { status, token, message },
      });
      return { success: true, message };
    } catch (error) {
      const errorMessage = error.response?.data?.errors;
      dispatch({
        type: actionTypesAuth.LOGIN_FAILED,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };
};

export const register = (dataUser) => {
  return async (dispatch) => {
    dispatch({ type: actionTypesAuth.REGISTER_REQUEST });
    try {
      const response = await axios.post(`${URL_API}/register`, {
        ...dataUser,
      });
      const { message, token } = response.data;
      localStorage.setItem("token", token);
      dispatch({
        type: actionTypesAuth.REGISTER_SUCCESS,
        payload: { token, message },
      });
      return { message, success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      dispatch({
        type: actionTypesAuth.REGISTER_FAILED,
        payload: errorMessage,
      });
      return { message: errorMessage, success: false };
    }
  };
};

export const cekToken = (token) => {
  return async (dispatch) => {
    dispatch({ type: actionTypesAuth.CEK_TOKEN_REQUEST });
    try {
      const response = await axios.get(`${URL_API}/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.user;
      dispatch({
        type: actionTypesAuth.CEK_TOKEN_SUCCESS,
        payload: data
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      dispatch({
        type: actionTypesAuth.CEK_TOKEN_FAILED,
        payload: errorMessage,
      });
    }
  };
};
