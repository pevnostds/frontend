import axios from "axios";
import { actionTypesLaporan } from "../actionTypes";
import { URL_API_LAPORAN } from "../../utils/constant";

const URL_API = URL_API_LAPORAN;
const token = localStorage.getItem("token");

export const laporanActions = (tanggalAwal) => {
  return async (dispatch) => {
    dispatch({ type: actionTypesLaporan.GET_LAPORAN_REQUEST });
    try {
      const response = await axios.get(
        `${URL_API}/laporan-pasien/${tanggalAwal}`,{
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const { status, message, data } = response.data;
      console.log(response.data);
      dispatch({
        type: actionTypesLaporan.GET_LAPORAN_SUCCESS,
        payload: { status, data, message },
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypesLaporan.GET_LAPORAN_FAILED,
        payload: errorMessage,
      });
    }
  };
};
