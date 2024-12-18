export const dataActionTypes = {
  GET_PASIENS_SUCCESS: "GET_PASIENS_SUCCESS",
  GET_PASIENS_FAILED: "GET_PASIENS_FAILED",
  GET_PASIENS_REQUEST: "GET_PASIENS_REQUEST",

  CREATE_PASIENS_REQUEST: "CREATE_PASIENS_REQUEST",
  CREATE_PASIENS_SUCCESS: "CREATE_PASIENS_SUCCESS",
  CREATE_PASIENS_FAILED: "CREATE_PASIENS_FAILED",

  UPDATE_PASIENS_REQUEST: "UPDATE_PASIENS_REQUEST",
  UPDATE_PASIENS_SUCCESS: "UPDATE_PASIENS_SUCCESS",
  UPDATE_PASIENS_FAILED: "UPDATE_PASIENS_FAILED",


  DELETE_PASIENS_REQUEST: "DELETE_PASIENS_REQUEST",
  DELETE_PASIENS_SUCCESS: "DELETE_PASIENS_SUCCESS",
  DELETE_PASIENS_FAILED: "DELETE_PASIENS_FAILED",
};


export const authActionTypes = {
  LOGIN_REQUEST:"LOGIN_REQUEST",
  LOGIN_SUCCESS:"LOGIN_SUCCESS",
  LOGIN_FAILED:"LOGIN_FAILED",

  REGISTER_REQUEST:"REGISTER_REQUEST",
  REGISTER_SUCCESS:"REGISTER_SUCCESS",
  REGISTER_FAILED:"REGISTER_FAILED",

  CEK_TOKEN_REQUEST:"CEK_TOKEN_REQUEST",
  CEK_TOKEN_SUCCESS:"CEK_TOKEN_SUCCESS",
  CEK_TOKEN_FAILED:"CEK_TOKEN_FAILED",
}

export const rekamActionTypes = {
  GET_REKAM_SUCCESS: "GET_REKAM_SUCCESS",
  GET_REKAM_FAILED: "GET_REKAM_FAILED",
  GET_REKAM_REQUEST: "GET_REKAM_REQUEST",
  
  GET_REKAM_ID_REQUEST: "GET_REKAM_ID_REQUEST",
  GET_REKAM_ID_SUCCESS: "GET_REKAM_ID_SUCCESS",
  GET_REKAM_ID_FAILED: "GET_REKAM_ID_FAILED",

  CREATE_REKAM_REQUEST: "CREATE_REKAM_REQUEST",
  CREATE_REKAM_SUCCESS: "CREATE_REKAM_SUCCESS",
  CREATE_REKAM_FAILED: "CREATE_REKAM_FAILED",

  UPDATE_REKAM_REQUEST: "UPDATE_REKAM_REQUEST",
  UPDATE_REKAM_SUCCESS: "UPDATE_REKAM_SUCCESS",
  UPDATE_REKAM_FAILED: "UPDATE_REKAM_FAILED",

  DELETE_REKAM_REQUEST: "DELETE_REKAM_REQUEST",
  DELETE_REKAM_SUCCESS: "DELETE_REKAM_SUCCESS",
  DELETE_REKAM_FAILED: "DELETE_REKAM_FAILED",
}

export const laporanActionTypes = {
  GET_LAPORAN_SUCCESS: "GET_LAPORAN_SUCCESS",
  GET_LAPORAN_FAILED: "GET_LAPORAN_FAILED",
  GET_LAPORAN_REQUEST: "GET_LAPORAN_REQUEST",
}