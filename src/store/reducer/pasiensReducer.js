import { actionTypes } from "../actionTypes";

const initialState = {
  pasiens: [],
  loading: false,
  error: null,
  message: "",
  status: null,
};

export const pasienReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PASIENS_REQUEST:
      return { ...state, loading: true };
    case actionTypes.GET_PASIENS_SUCCESS:
      return { ...state, loading: false, pasiens: action.payload };
    case actionTypes.GET_PASIENS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createPasienReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PASIENS_REQUEST:
      return { ...state, loading: true };
    case actionTypes.CREATE_PASIENS_SUCCESS:
      return {
        ...state,
        loading: false,
        pasiens: action.payload.data,
        message: action.payload.message,
        status: action.payload.status
      };
    case actionTypes.CREATE_PASIENS_FAILED:
      return { ...state, loading: false, error: action.payload,status: action.payload.status};
    default:
      return state;
  }
};

export const updataPasienReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PASIENS_REQUEST:
      return { ...state, loading: true };
    case actionTypes.UPDATE_PASIENS_SUCCESS:
      return { ...state, loading: false, pasiens: action.payload };
    case actionTypes.UPDATE_PASIENS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePasienReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_PASIENS_REQUEST:
      return { ...state, loading: true };
    case actionTypes.DELETE_PASIENS_SUCCESS:
      return {
        ...state,
        pasienList: state.pasienList.filter(
          (pasien) => pasien.id !== action.payload
        ),
      };
    case actionTypes.DELETE_PASIENS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
