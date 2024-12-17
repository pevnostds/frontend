import axios from "axios";
import { actionTypesRekam } from "../actionTypes";
import { URL_API_REKAM_MEDIS } from "../../utils/constant";

const URL_API = URL_API_REKAM_MEDIS;
const token = localStorage.getItem("token");

export function dataRekamMedis() {
  return (dispatch) => {
    dispatch({ type: actionTypesRekam.GET_REKAM_REQUEST });
    return axios
      .get(`${URL_API}/data`,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data.map((item) => item.data);
        dispatch({
          type: actionTypesRekam.GET_REKAM_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message;

        console.error("Pesan", errorMessage);
        dispatch({
          type: actionTypesRekam.GET_REKAM_FAILED,
          payload:errorMessage
        });
      });
  };
}

export function dataRekamMedisById(id) {
  return async (dispatch) => {
    dispatch({ type: actionTypesRekam.GET_REKAM_REQUEST });
    try {
      const response = await axios.get(`${URL_API}/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypesRekam.GET_REKAM_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.status || "Terjadi kesalahan saat mengambil data";
      dispatch({
        type: actionTypesRekam.GET_REKAM_FAILED,
        payload: errorMessage,
      });
    }
  };
}

export function dataRekamMedisByUser(id) {
  return async (dispatch) => {
    dispatch({ type: actionTypesRekam.GET_REKAM_ID_REQUEST });
    try {
      const response = await axios.get(`${URL_API}/data/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypesRekam.GET_REKAM_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.message || "Terjadi kesalahan saat mengambil data";
      dispatch({
        type: actionTypesRekam.GET_REKAM_ID_FAILED,
        payload: errorMessage,
      });
    }
  };
}


export const createRekamMedis = (params) => {
  return (dispatch) => {
    dispatch({ type: actionTypesRekam.CREATE_REKAM_REQUEST });
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
          type: actionTypesRekam.CREATE_REKAM_SUCCESS,
          payload:{data,message,status},
        });
        return {status,data,message};
      })
      .catch((error) => {
        const {message,status} = error.response.data;
        console.error("Error", message);
        dispatch({
          type: actionTypesRekam.CREATE_REKAM_FAILED,
          payload:{message,status}
        });
        return {message,status}
      });
  };
};


export const updateRekamMedis = (id, updatedData) => {
  return (dispatch) => {
    dispatch({ type: actionTypesRekam.UPDATE_REKAM_REQUEST });
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

        const {data,status,message} = response.data;

        dispatch({
          type: actionTypesRekam.UPDATE_REKAM_SUCCESS,
          payload: {data,status,message},
        });
      })
      .catch((error) => {
        console.error("Error updating pasien data:", error);
        dispatch({
          type: actionTypesRekam.UPDATE_REKAM_FAILED,
          payload: error.message,
        });
      });
  };
};


export const deleteRekamMedis = (id) => {
  return (dispatch) => {
    dispatch({ type: actionTypesRekam.DELETE_REKAM_REQUEST });

    return axios
      .delete(`${URL_API}/${id}`,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response from API:", response.data);

        dispatch({
          type: actionTypesRekam.DELETE_REKAM_SUCCESS,
          payload: response.data.message,
        });
      })
      .catch((error) => {
        console.error("Error", error);
        dispatch({
          type: actionTypesRekam.DELETE_REKAM_FAILED,
          payload: error.message,
        });
      });
  };
};
