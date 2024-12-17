import { actionTypesRekam } from "../actionTypes";

const initialState = {
  data: [],
  dataRekam:[],
  loading: false,
  error: null,
  message: "",
  status: null,
};

export const getRekamMedisReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesRekam.GET_REKAM_REQUEST:
      return { ...state, loading: true };
    case actionTypesRekam.GET_REKAM_SUCCESS:
      return { ...state, loading: false, data:action.payload };
    case actionTypesRekam.GET_REKAM_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getRekamMedisByUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesRekam.GET_REKAM_ID_REQUEST:
      return { ...state, loading: true };
    case actionTypesRekam.GET_REKAM_ID_SUCCESS:
      return { ...state, loading: false, dataRekam:action.payload };
    case actionTypesRekam.GET_REKAM_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createRekamMedisReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesRekam.CREATE_REKAM_REQUEST:
      return { ...state, loading: true };
    case actionTypesRekam.CREATE_REKAM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        message: action.payload.message,
        status: action.payload.status,
      };
    case actionTypesRekam.CREATE_REKAM_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const updateRekamMedisReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesRekam.UPDATE_REKAM_REQUEST:
      return { ...state, loading: true };
    case actionTypesRekam.UPDATE_REKAM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        status: action.payload.status,
        message: action.payload.message,
      };
    case actionTypesRekam.UPDATE_REKAM_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteRekamMedisReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesRekam.DELETE_REKAM_REQUEST:
      return { ...state, loading: true };
    case actionTypesRekam.DELETE_REKAM_SUCCESS:
      return {
        ...state,
        message:action.payload.message,
      };
    case actionTypesRekam.DELETE_REKAM_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
