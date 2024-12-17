import { actionTypesAuth } from "../actionTypes";

const initialState = {
  isAuthenticated:false,
  user:null,
  status: null,
  message: "",
  token: "",
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesAuth.LOGIN_REQUEST:
      return { ...state, loading: true };
    case actionTypesAuth.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        status: action.payload.status,
        message: action.payload.message,
        isAuthenticated:true,
      };
    case actionTypesAuth.LOGIN_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cekTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesAuth.CEK_TOKEN_REQUEST:
      return { ...state, loading: true };
    case actionTypesAuth.CEK_TOKEN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case actionTypesAuth.CEK_TOKEN_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesAuth.REGISTER_REQUEST:
      return { ...state, loading: true };
    case actionTypesAuth.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        message: action.payload.message,
      };
    case actionTypesAuth.REGISTER_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
