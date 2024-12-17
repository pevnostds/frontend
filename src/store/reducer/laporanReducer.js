import { actionTypesLaporan } from "../actionTypes";

const initialState = {
  laporan: [],
  loading: false,
  error: null,
  message: "",
  status: null,
};

export const getLaporanReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesLaporan.GET_LAPORAN_REQUEST:
      return { ...state, loading: true };
    case actionTypesLaporan.GET_LAPORAN_SUCCESS:
      return {
        ...state,
        loading: false,
        laporan: action.payload.data,
        message: action.payload.message,
        status: action.payload.status,
      };
    case actionTypesLaporan.GET_LAPORAN_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
