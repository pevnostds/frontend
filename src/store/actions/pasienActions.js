import axios from "axios";
import { actionTypes } from "../actionTypes";
import { URL_API_PASIENS } from "../../utils/constant";

const URL_API = URL_API_PASIENS;
const token = localStorage.getItem("token");
// console.log(token);
export function dataPasiens() {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_PASIENS_REQUEST });

    return axios
      .get(`${URL_API}/data`,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const pasiens = response.data.data.map((item) => item.data);
        dispatch({
          type: actionTypes.GET_PASIENS_SUCCESS,
          payload: pasiens,
        });
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message;

        console.error("Pesan", errorMessage);
        dispatch({
          type: actionTypes.GET_PASIENS_FAILED,
          payload:errorMessage
        });
      });
  };
}

export function dataPasienById(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_PASIENS_REQUEST });

    return axios
      .get(`${URL_API}/${id}`,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response from API:", response.data);

        const pasien = response.data.data;

        dispatch({
          type: actionTypes.GET_PASIENS_SUCCESS,
          payload: pasien,
        });
      })
      .catch((error) => {
        console.error("Error fetching pasien data:", error);
        dispatch({
          type: actionTypes.GET_PASIENS_FAILED,
          payload: error.message,
        });
      });
  };
}

export const createPasien = (params) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_PASIENS_REQUEST });
    const token = localStorage.getItem("token");
    return axios
      .post(
        `${URL_API}/`, 
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      )
      .then((response) => {
        console.log("Response from API:", response.data);        
        const {data,message,status} = response.data;
        dispatch({
          type: actionTypes.CREATE_PASIENS_SUCCESS,
          payload:{data,message,status},
        });
        return {status,data,message};
      })
      .catch((error) => {
        const {message,status} = error.response.data;
        console.error("Error", message);
        dispatch({
          type: actionTypes.CREATE_PASIENS_FAILED,
          payload:{message,status}
        });
        return {message,status}
      });
  };
};


export const updatePasien = (id, updatedData) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_PASIENS_REQUEST });
    const token = localStorage.getItem("token");
    return axios
      .put(
        `${URL_API}/${id}`, 
        updatedData, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      )
      .then((response) => {
        console.log("Response from API:", response.data);

        const pasien = response.data.data;

        dispatch({
          type: actionTypes.UPDATE_PASIENS_SUCCESS,
          payload: pasien,
        });
      })
      .catch((error) => {
        console.error("Error updating pasien data:", error);
        dispatch({
          type: actionTypes.UPDATE_PASIENS_FAILED,
          payload: error.message,
        });
      });
  };
};


export const deletePasien = (id) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_PASIENS_REQUEST });

    return axios
      .delete(`${URL_API}/${id}`,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response from API:", response.data);

        dispatch({
          type: actionTypes.DELETE_PASIENS_SUCCESS,
          payload: id,
        });
      })
      .catch((error) => {
        console.error("Error deleting pasien:", error);
        dispatch({
          type: actionTypes.DELETE_PASIENS_FAILED,
          payload: error.message,
        });
      });
  };
};
